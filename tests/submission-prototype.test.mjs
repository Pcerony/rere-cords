import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, readFile, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createSubmissionServer } from '../prototype-server/server.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const readSiteFile = (file) => readFileSync(resolve(root, file), 'utf8');

async function startPrototype(t) {
    const dataDir = await mkdtemp(join(tmpdir(), 'rere-cords-submission-'));
    const server = createSubmissionServer({ dataDir, publicDir: root });

    await new Promise((resolveListen, rejectListen) => {
        server.once('error', rejectListen);
        server.listen(0, '127.0.0.1', resolveListen);
    });

    t.after(async () => {
        await new Promise((resolveClose) => server.close(resolveClose));
    });

    const address = server.address();
    return { baseUrl: `http://127.0.0.1:${address.port}`, dataDir };
}

function validSubmission(overrides = {}) {
    const form = new FormData();
    const fields = {
        creatorName: 'Aiko Tanaka',
        email: 'aiko@example.com',
        affiliation: 'Kyushu University',
        workTitle: 'Second Groove',
        workType: 'image',
        description: 'A study in material memory.',
        ...overrides
    };

    for (const [key, value] of Object.entries(fields)) form.set(key, value);
    form.append('files', new File([
        Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    ], 'study.png', { type: 'image/png' }));
    return form;
}

async function submit(baseUrl, form) {
    return fetch(`${baseUrl}/api/submissions`, { method: 'POST', body: form });
}

test('stores a valid multipart submission and returns a server receipt', async (t) => {
    const { baseUrl, dataDir } = await startPrototype(t);
    const response = await submit(baseUrl, validSubmission());
    const receipt = await response.json();

    assert.equal(response.status, 201);
    assert.match(receipt.id, /^RRC-\d{8}-[A-Z0-9]{8}$/);
    assert.equal(receipt.status, 'received');
    assert.equal(receipt.fields.creatorName, 'Aiko Tanaka');
    assert.equal(receipt.fields.workTitle, 'Second Groove');
    assert.equal(receipt.files.length, 1);
    assert.equal(receipt.files[0].originalName, 'study.png');
    assert.equal(receipt.files[0].mimeType, 'image/png');
    assert.equal(receipt.files[0].size, 8);
    assert.match(receipt.files[0].sha256, /^[a-f0-9]{64}$/);

    const manifest = JSON.parse(await readFile(join(dataDir, receipt.id, 'manifest.json'), 'utf8'));
    assert.deepEqual(manifest, receipt);
    assert.equal((await stat(join(dataDir, receipt.id, receipt.files[0].storedName))).size, 8);
});

test('rejects a submission that omits a required field without creating a receipt', async (t) => {
    const { baseUrl, dataDir } = await startPrototype(t);
    const form = validSubmission();
    form.delete('workTitle');

    const response = await submit(baseUrl, form);
    const error = await response.json();

    assert.equal(response.status, 400);
    assert.equal(error.code, 'INVALID_FIELDS');
    assert.match(error.message, /work title/i);
    assert.deepEqual(await readdir(dataDir), []);
});

test('rejects a submission without files', async (t) => {
    const { baseUrl } = await startPrototype(t);
    const form = validSubmission();
    form.delete('files');

    const response = await submit(baseUrl, form);
    const error = await response.json();

    assert.equal(response.status, 400);
    assert.equal(error.code, 'FILES_REQUIRED');
});

test('rejects unsupported upload media', async (t) => {
    const { baseUrl, dataDir } = await startPrototype(t);
    const form = validSubmission();
    form.delete('files');
    form.append('files', new File(['binary'], 'program.exe', {
        type: 'application/x-msdownload'
    }));

    const response = await submit(baseUrl, form);
    const error = await response.json();

    assert.equal(response.status, 415);
    assert.equal(error.code, 'UNSUPPORTED_MEDIA_TYPE');
    assert.deepEqual(await readdir(dataDir), []);
});

test('rejects more than eight uploaded files', async (t) => {
    const { baseUrl } = await startPrototype(t);
    const form = validSubmission();
    form.delete('files');
    for (let index = 0; index < 9; index += 1) {
        form.append('files', new File([`file-${index}`], `file-${index}.txt`, {
            type: 'text/plain'
        }));
    }

    const response = await submit(baseUrl, form);
    const error = await response.json();

    assert.equal(response.status, 400);
    assert.equal(error.code, 'TOO_MANY_FILES');
});

test('normalizes traversal-like client filenames before storage', async (t) => {
    const { baseUrl, dataDir } = await startPrototype(t);
    const form = validSubmission();
    form.delete('files');
    form.append('files', new File(['notes'], 'notes.txt', { type: 'text/plain' }), '../../notes.txt');

    const response = await submit(baseUrl, form);
    const receipt = await response.json();
    const storedName = receipt.files[0].storedName;

    assert.equal(response.status, 201);
    assert.doesNotMatch(storedName, /\.\.|[\\/]/);
    assert.equal(await readFile(join(dataDir, receipt.id, storedName), 'utf8'), 'notes');
});

test('lists receipts and returns stored receipt and file bytes', async (t) => {
    const { baseUrl } = await startPrototype(t);
    const createdResponse = await submit(baseUrl, validSubmission());
    const created = await createdResponse.json();

    const listResponse = await fetch(`${baseUrl}/api/submissions`);
    const list = await listResponse.json();
    const receiptResponse = await fetch(`${baseUrl}/api/submissions/${created.id}`);
    const receipt = await receiptResponse.json();
    const fileResponse = await fetch(`${baseUrl}${created.files[0].downloadUrl}`);

    assert.equal(listResponse.status, 200);
    assert.equal(list.count, 1);
    assert.equal(list.submissions[0].id, created.id);
    assert.deepEqual(receipt, created);
    assert.equal(fileResponse.status, 200);
    assert.equal(fileResponse.headers.get('content-type'), 'image/png');
    assert.deepEqual(new Uint8Array(await fileResponse.arrayBuffer()), Uint8Array.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a
    ]));
});

test('serves only prototype pages from the public directory', async (t) => {
    const { baseUrl } = await startPrototype(t);

    assert.equal((await fetch(`${baseUrl}/submission-prototype.html`)).status, 200);
    assert.equal((await fetch(`${baseUrl}/submission-admin.html`)).status, 200);
    assert.equal((await fetch(`${baseUrl}/package.json`)).status, 404);
});

test('participant page exposes an accessible upload and receipt workflow', () => {
    assert.ok(existsSync(resolve(root, 'submission-prototype.html')), 'participant prototype page must exist');
    const html = readSiteFile('submission-prototype.html');

    assert.match(html, /<form[^>]+id="submission-form"/);
    for (const field of ['creatorName', 'email', 'affiliation', 'workTitle', 'workType', 'description', 'files']) {
        assert.match(html, new RegExp(`(?:name|id)="${field}"`));
    }
    assert.match(html, /id="file-dropzone"[^>]+tabindex="0"/);
    assert.match(html, /id="selected-files"/);
    assert.match(html, /<progress[^>]+id="upload-progress"/);
    assert.match(html, /id="submission-status"[^>]+aria-live="polite"/);
    assert.match(html, /id="submission-receipt"[^>]+hidden/);
    assert.match(html, /id="copy-receipt"/);
    assert.match(html, /submission-prototype\.js/);
});

test('participant script validates files and renders the server receipt safely', () => {
    assert.ok(existsSync(resolve(root, 'submission-prototype.js')), 'participant prototype script must exist');
    const script = readSiteFile('submission-prototype.js');

    assert.match(script, /MAX_FILES\s*=\s*8/);
    assert.match(script, /MAX_FILE_SIZE\s*=\s*25\s*\*\s*1024\s*\*\s*1024/);
    assert.match(script, /XMLHttpRequest/);
    assert.match(script, /xhr\.upload\.addEventListener\(['"]progress['"]/);
    assert.match(script, /textContent/);
    assert.match(script, /submission-admin\.html\?receipt=/);
});

test('organizer page provides a localhost receipt confirmation surface', () => {
    assert.ok(existsSync(resolve(root, 'submission-admin.html')), 'organizer prototype page must exist');
    assert.ok(existsSync(resolve(root, 'submission-admin.js')), 'organizer prototype script must exist');
    const html = readSiteFile('submission-admin.html');
    const script = readSiteFile('submission-admin.js');

    assert.match(html, /本地原型|Local prototype/);
    assert.match(html, /id="refresh-submissions"/);
    assert.match(html, /id="submission-count"/);
    assert.match(html, /id="admin-status"[^>]+aria-live="polite"/);
    assert.match(html, /id="submission-list"/);
    assert.match(html, /id="submission-empty"/);
    assert.match(script, /fetch\(['"]\/api\/submissions['"]\)/);
    assert.match(script, /document\.createElement/);
    assert.match(script, /image\//);
});

test('prototype styles include visible focus and narrow-screen layout rules', () => {
    assert.ok(existsSync(resolve(root, 'submission-prototype.css')), 'prototype stylesheet must exist');
    const css = readSiteFile('submission-prototype.css');

    assert.match(css, /:focus-visible/);
    assert.match(css, /@media\s*\(max-width:\s*720px\)/);
    assert.match(css, /\.prototype-shell/);
    assert.match(css, /\.file-row/);
    assert.match(css, /\.receipt-card/);
    assert.match(css, /prefers-reduced-motion/);
});

test('receipt explanation does not overlap the server receipt while scrolling', () => {
    const css = readSiteFile('submission-prototype.css');
    assert.doesNotMatch(css, /\.receipt-intro\s*\{[^}]*position:\s*sticky/s);
});

test('file drop button does not contain a second interactive control', () => {
    const html = readSiteFile('submission-prototype.html');
    const dropzoneStart = html.indexOf('id="file-dropzone"');
    const dropzoneEnd = html.indexOf('</div>', dropzoneStart);
    const dropzone = html.slice(dropzoneStart, dropzoneEnd);

    assert.doesNotMatch(dropzone, /<input/);
    assert.match(html.slice(dropzoneEnd), /<input id="files"[^>]+type="file"/);
});
