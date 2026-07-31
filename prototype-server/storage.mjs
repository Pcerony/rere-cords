import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { access, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const RECEIPT_ID_PATTERN = /^RRC-\d{8}-[A-Z0-9]{8}$/;
const FILE_ID_PATTERN = /^[a-f0-9]{12}$/;

export function createReceiptId(now = new Date()) {
    const date = now.toISOString().slice(0, 10).replaceAll('-', '');
    const random = randomBytes(5).toString('hex').slice(0, 8).toUpperCase();
    return `RRC-${date}-${random}`;
}

export function sanitizeClientFilename(filename) {
    const leaf = basename(String(filename || 'file')).normalize('NFKC');
    const cleaned = leaf
        .replace(/[\u0000-\u001f\u007f]/g, '')
        .replace(/[^\p{L}\p{N}._ -]+/gu, '-')
        .replace(/\.{2,}/g, '.')
        .replace(/^\.+/, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 140);
    return cleaned || 'file';
}

export function createStoredFile(originalName) {
    const fileId = randomUUID().replaceAll('-', '').slice(0, 12);
    const safeName = sanitizeClientFilename(originalName);
    return {
        fileId,
        originalName: safeName,
        storedName: `${fileId}-${safeName}`
    };
}

export function hashPassthrough(stream) {
    const hash = createHash('sha256');
    stream.on('data', (chunk) => hash.update(chunk));
    return () => hash.digest('hex');
}

export async function createUploadWorkspace(dataDir) {
    await mkdir(dataDir, { recursive: true });
    const tempName = `.upload-${randomUUID()}`;
    const tempDir = join(dataDir, tempName);
    await mkdir(tempDir, { recursive: false });
    return { tempDir, tempName };
}

export function createUploadWriter(tempDir, storedName) {
    return createWriteStream(join(tempDir, storedName), { flags: 'wx' });
}

export async function finalizeReceipt(dataDir, tempDir, receipt) {
    const manifestPath = join(tempDir, 'manifest.json');
    const temporaryManifest = join(tempDir, '.manifest.json.tmp');
    await writeFile(temporaryManifest, `${JSON.stringify(receipt, null, 2)}\n`, {
        encoding: 'utf8',
        flag: 'wx'
    });
    await rename(temporaryManifest, manifestPath);

    const receiptDir = join(dataDir, receipt.id);
    await rename(tempDir, receiptDir);
    return receipt;
}

export async function cleanupUpload(tempDir) {
    await rm(tempDir, { recursive: true, force: true });
}

export async function readReceipt(dataDir, receiptId) {
    if (!RECEIPT_ID_PATTERN.test(receiptId)) return null;
    try {
        return JSON.parse(await readFile(join(dataDir, receiptId, 'manifest.json'), 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT' || error instanceof SyntaxError) return null;
        throw error;
    }
}

export async function listReceipts(dataDir) {
    await mkdir(dataDir, { recursive: true });
    const entries = await readdir(dataDir, { withFileTypes: true });
    const receipts = await Promise.all(entries
        .filter((entry) => entry.isDirectory() && RECEIPT_ID_PATTERN.test(entry.name))
        .map((entry) => readReceipt(dataDir, entry.name)));

    return receipts
        .filter(Boolean)
        .sort((left, right) => right.receivedAt.localeCompare(left.receivedAt));
}

export async function resolveReceiptFile(dataDir, receiptId, fileId) {
    if (!FILE_ID_PATTERN.test(fileId)) return null;
    const receipt = await readReceipt(dataDir, receiptId);
    const file = receipt?.files.find((candidate) => candidate.id === fileId);
    if (!file) return null;

    const path = join(dataDir, receiptId, file.storedName);
    try {
        await access(path);
        return { receipt, file, path, stream: () => createReadStream(path) };
    } catch (error) {
        if (error.code === 'ENOENT') return null;
        throw error;
    }
}
