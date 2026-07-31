import Busboy from 'busboy';
import { createServer } from 'node:http';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

import {
    ACCEPTED_MEDIA_TYPES,
    FIELD_RULES,
    MAX_FILES,
    MAX_FILE_SIZE,
    MAX_TOTAL_SIZE,
    PUBLIC_FILES,
    WORK_TYPES
} from './config.mjs';
import {
    cleanupUpload,
    createReceiptId,
    createStoredFile,
    createUploadWorkspace,
    createUploadWriter,
    finalizeReceipt,
    hashPassthrough,
    listReceipts,
    readReceipt,
    resolveReceiptFile
} from './storage.mjs';

const moduleDir = dirname(fileURLToPath(import.meta.url));
const defaultPublicDir = resolve(moduleDir, '..');
const defaultDataDir = resolve(defaultPublicDir, 'prototype-data');

class HttpError extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

function securityHeaders(contentType) {
    return {
        'cache-control': 'no-store',
        'content-type': contentType,
        'cross-origin-resource-policy': 'same-origin',
        'referrer-policy': 'no-referrer',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'content-security-policy': "default-src 'self'; img-src 'self' blob:; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
    };
}

function sendJson(response, status, value) {
    response.writeHead(status, securityHeaders('application/json; charset=utf-8'));
    response.end(`${JSON.stringify(value)}\n`);
}

function sendError(response, error) {
    const status = error instanceof HttpError ? error.status : 500;
    const code = error instanceof HttpError ? error.code : 'INTERNAL_ERROR';
    const message = error instanceof HttpError
        ? error.message
        : 'The prototype could not complete this request.';
    if (!response.headersSent) sendJson(response, status, { code, message });
}

function normalizeFields(rawFields) {
    const fields = {};
    const errors = [];

    for (const [name, rule] of Object.entries(FIELD_RULES)) {
        const value = String(rawFields[name] || '').trim();
        if (rule.required && value === '') errors.push(`${rule.label} is required.`);
        if (value.length > rule.maxLength) errors.push(`${rule.label} is too long.`);
        fields[name] = value;
    }

    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        errors.push('Email must be a valid address.');
    }
    if (fields.workType && !WORK_TYPES.has(fields.workType)) {
        errors.push('Work type is not supported.');
    }
    if (errors.length > 0) throw new HttpError(400, 'INVALID_FIELDS', errors.join(' '));
    return fields;
}

async function parseSubmission(request, dataDir) {
    let busboy;
    try {
        busboy = Busboy({
            headers: request.headers,
            limits: {
                fields: Object.keys(FIELD_RULES).length,
                fieldSize: 10 * 1024,
                files: MAX_FILES,
                fileSize: MAX_FILE_SIZE,
                parts: 32
            }
        });
    } catch {
        throw new HttpError(400, 'MULTIPART_REQUIRED', 'Use multipart/form-data for submissions.');
    }

    const { tempDir } = await createUploadWorkspace(dataDir);
    const rawFields = {};
    const files = [];
    const writes = [];
    let totalSize = 0;
    let rejection = null;

    const rejectOnce = (error) => {
        if (!rejection) rejection = error;
    };

    busboy.on('field', (name, value, info) => {
        if (info.valueTruncated) {
            rejectOnce(new HttpError(400, 'INVALID_FIELDS', `${name} is too long.`));
            return;
        }
        if (Object.hasOwn(FIELD_RULES, name)) rawFields[name] = value;
    });

    busboy.on('file', (fieldName, stream, info) => {
        if (fieldName !== 'files') {
            stream.resume();
            rejectOnce(new HttpError(400, 'INVALID_FILE_FIELD', 'Files must use the files field.'));
            return;
        }
        if (!ACCEPTED_MEDIA_TYPES.has(info.mimeType)) {
            stream.resume();
            rejectOnce(new HttpError(415, 'UNSUPPORTED_MEDIA_TYPE', `${info.filename || 'File'} is not an accepted file type.`));
            return;
        }

        const names = createStoredFile(info.filename);
        const writer = createUploadWriter(tempDir, names.storedName);
        const digest = hashPassthrough(stream);
        let size = 0;
        let limited = false;

        stream.on('limit', () => {
            limited = true;
            rejectOnce(new HttpError(413, 'FILE_TOO_LARGE', `${names.originalName} exceeds the 25 MiB file limit.`));
        });
        stream.on('data', (chunk) => {
            size += chunk.length;
            totalSize += chunk.length;
            if (totalSize > MAX_TOTAL_SIZE) {
                rejectOnce(new HttpError(413, 'UPLOAD_TOO_LARGE', 'The complete upload exceeds 100 MiB.'));
            }
        });

        const write = new Promise((resolveWrite, rejectWrite) => {
            writer.on('error', rejectWrite);
            writer.on('close', () => {
                if (!limited) {
                    files.push({
                        id: names.fileId,
                        originalName: names.originalName,
                        storedName: names.storedName,
                        mimeType: info.mimeType,
                        size,
                        sha256: digest()
                    });
                }
                resolveWrite();
            });
            stream.on('error', rejectWrite);
        });
        writes.push(write);
        stream.pipe(writer);
    });

    busboy.on('filesLimit', () => {
        rejectOnce(new HttpError(400, 'TOO_MANY_FILES', `Upload no more than ${MAX_FILES} files.`));
    });
    busboy.on('fieldsLimit', () => {
        rejectOnce(new HttpError(400, 'TOO_MANY_FIELDS', 'The submission contains too many fields.'));
    });
    busboy.on('partsLimit', () => {
        rejectOnce(new HttpError(400, 'TOO_MANY_PARTS', 'The submission contains too many parts.'));
    });

    try {
        await new Promise((resolveParse, rejectParse) => {
            request.on('aborted', () => rejectParse(new HttpError(400, 'UPLOAD_ABORTED', 'The upload was interrupted.')));
            request.on('error', rejectParse);
            busboy.on('error', rejectParse);
            busboy.on('finish', resolveParse);
            request.pipe(busboy);
        });
        await Promise.all(writes);

        if (rejection) throw rejection;
        if (files.length === 0) throw new HttpError(400, 'FILES_REQUIRED', 'Add at least one file.');

        const fields = normalizeFields(rawFields);
        const id = createReceiptId();
        const receipt = {
            id,
            status: 'received',
            receivedAt: new Date().toISOString(),
            fields,
            files: files.map((file) => ({
                ...file,
                downloadUrl: `/api/submissions/${id}/files/${file.id}`
            }))
        };
        return await finalizeReceipt(dataDir, tempDir, receipt);
    } catch (error) {
        await cleanupUpload(tempDir);
        throw error;
    }
}

async function serveStatic(response, publicDir, route) {
    const asset = PUBLIC_FILES.get(route);
    if (!asset) return false;
    try {
        const body = await readFile(join(publicDir, asset.file));
        response.writeHead(200, securityHeaders(asset.type));
        response.end(body);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') return false;
        throw error;
    }
}

function contentDisposition(filename) {
    const ascii = filename.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
    return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

export function createSubmissionServer(options = {}) {
    const dataDir = resolve(options.dataDir || defaultDataDir);
    const publicDir = resolve(options.publicDir || defaultPublicDir);

    return createServer(async (request, response) => {
        try {
            const url = new URL(request.url || '/', 'http://localhost');
            const route = decodeURIComponent(url.pathname);

            if (request.method === 'GET' && route === '/') {
                response.writeHead(302, { location: '/submission-prototype.html' });
                response.end();
                return;
            }
            if (request.method === 'GET' && route === '/api/health') {
                sendJson(response, 200, { status: 'ok', storage: 'local-prototype' });
                return;
            }
            if (request.method === 'POST' && route === '/api/submissions') {
                const receipt = await parseSubmission(request, dataDir);
                sendJson(response, 201, receipt);
                return;
            }
            if (request.method === 'GET' && route === '/api/submissions') {
                const submissions = await listReceipts(dataDir);
                sendJson(response, 200, { count: submissions.length, submissions });
                return;
            }

            const receiptMatch = route.match(/^\/api\/submissions\/(RRC-\d{8}-[A-Z0-9]{8})$/);
            if (request.method === 'GET' && receiptMatch) {
                const receipt = await readReceipt(dataDir, receiptMatch[1]);
                if (!receipt) throw new HttpError(404, 'RECEIPT_NOT_FOUND', 'Receipt not found.');
                sendJson(response, 200, receipt);
                return;
            }

            const fileMatch = route.match(/^\/api\/submissions\/(RRC-\d{8}-[A-Z0-9]{8})\/files\/([a-f0-9]{12})$/);
            if (request.method === 'GET' && fileMatch) {
                const result = await resolveReceiptFile(dataDir, fileMatch[1], fileMatch[2]);
                if (!result) throw new HttpError(404, 'FILE_NOT_FOUND', 'Stored file not found.');
                response.writeHead(200, {
                    ...securityHeaders(result.file.mimeType),
                    'content-disposition': contentDisposition(result.file.originalName),
                    'content-length': result.file.size
                });
                result.stream().pipe(response);
                return;
            }

            if (request.method === 'GET' && await serveStatic(response, publicDir, route)) return;
            throw new HttpError(404, 'NOT_FOUND', 'Prototype route not found.');
        } catch (error) {
            sendError(response, error);
        }
    });
}

const executedDirectly = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (executedDirectly) {
    const port = Number.parseInt(process.env.PORT || '4174', 10);
    const host = process.env.HOST || '127.0.0.1';
    const server = createSubmissionServer();
    server.listen(port, host, () => {
        console.log(`RERE-CORDS submission prototype: http://${host}:${port}/`);
        console.log(`Organizer receipt view: http://${host}:${port}/submission-admin.html`);
        console.log(`Local receipt storage: ${defaultDataDir}`);
    });
}
