import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistration, validatePhotos, inspectPhoto, MAX_BODY_BYTES } from '../event-registration-core.js';
import { createRegistrationHandler } from '../supabase/functions/event-registration/handler.js';

const id = 'be614a6a-d967-4f2e-b63c-d9e18c9f0e46';
const valid = () => ({ submissionId: id, name: ' Example ', email: ' ARTIST@example.com ', title: 'A work', description: 'A record transformed.', privacyAccepted: true });
const now = () => Date.parse('2026-10-31T00:00:00Z');
const config = { origins: ['https://rerecords.space'], opensAt: '2026-09-30T15:00:00Z', closesAt: '2026-11-10T15:00:00Z' };

test('normalizes required fields without collecting optional information by default', () => {
    const value = validateRegistration(valid());
    assert.equal(value.name, 'Example');
    assert.equal(value.email, 'artist@example.com');
    assert.equal(value.salon, null);
    assert.equal(value.videoUrl, null);
});
test('description is limited to 200 Unicode code points', () => {
    assert.equal(validateRegistration({ ...valid(), description: '音'.repeat(200) }).description.length, 200);
    assert.equal([...validateRegistration({ ...valid(), description: '🎵'.repeat(200) }).description].length, 200);
    assert.throws(() => validateRegistration({ ...valid(), description: '音'.repeat(201) }), /description/);
});
test('rejects missing required fields, invalid email, consent and salon values', () => {
    for (const key of ['name', 'email', 'title', 'description', 'submissionId']) {
        assert.throws(() => validateRegistration({ ...valid(), [key]: '' }));
    }
    assert.throws(() => validateRegistration({ ...valid(), email: 'a@b' }));
    assert.throws(() => validateRegistration({ ...valid(), privacyAccepted: false }));
    assert.throws(() => validateRegistration({ ...valid(), salon: 'anything' }));
    assert.throws(() => validateRegistration({ ...valid(), major: 'a'.repeat(121) }));
});
test('accepts any HTTP(S) video provider, rejects executable and credential-bearing URLs', () => {
    for (const videoUrl of ['https://drive.google.com/file/d/test', 'https://youtu.be/example', 'https://example.org/video?a=1', 'http://example.org/video']) {
        assert.equal(validateRegistration({ ...valid(), videoUrl }).videoUrl, videoUrl);
    }
    for (const videoUrl of ['javascript:alert(1)', 'data:text/html,test', 'file:///tmp/video', 'https://name:password@example.org', 'not a link']) {
        assert.throws(() => validateRegistration({ ...valid(), videoUrl }), /videoUrl/);
    }
});
test('photos are optional and constrained by count, bytes, MIME and real signature', async () => {
    assert.doesNotThrow(() => validatePhotos([]));
    assert.throws(() => validatePhotos(Array(4).fill({ size: 1, type: 'image/png' })));
    assert.throws(() => validatePhotos([{ size: 5 * 1024 * 1024 + 1, type: 'image/png' }]));
    assert.throws(() => validatePhotos([{ size: 10, type: 'image/svg+xml' }]));
    await assert.rejects(() => inspectPhoto(new Blob(['not a png'], { type: 'image/png' })));
    assert.equal((await inspectPhoto(new Blob([new Uint8Array([137,80,78,71,13,10,26,10])], { type: 'image/png' }))).extension, 'png');
});

function harness(overrides = {}) {
    const calls = { uploads: [], removals: [], commits: [] };
    const dependencies = {
        now, config,
        verifyCaptcha: async () => true,
        repository: { commit: async (record) => { calls.commits.push(record); return { code: 'RRC-W-EXAMPLE', inserted: true }; } },
        storage: { upload: async (path) => { calls.uploads.push(path); }, remove: async (paths) => { calls.removals.push(...paths); } },
        ...overrides
    };
    return { calls, handle: createRegistrationHandler(dependencies) };
}
function request(payload = valid(), photos = [], options = {}) {
    const body = new FormData();
    body.set('payload', JSON.stringify(payload));
    body.set('captchaToken', 'test-token');
    for (const photo of photos) body.append('photos', photo, 'work.png');
    return new Request('https://example.supabase.co/functions/v1/event-registration', { method: 'POST', headers: { origin: config.origins[0], ...options.headers }, body });
}
const png = () => new Blob([new Uint8Array([137,80,78,71,13,10,26,10])], { type: 'image/png' });

test('commits a real multipart registration without requiring attachments and returns only a receipt', async () => {
    const { handle, calls } = harness();
    const response = await handle(request());
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { ok: true, code: 'RRC-W-EXAMPLE' });
    assert.equal(calls.commits[0].payload.email, 'artist@example.com');
    assert.equal(calls.uploads.length, 0);
});
test('rejects origin, deadline, invalid fields and captcha before storing files', async () => {
    for (const [overrides, req, status] of [
        [{}, request(valid(), [], { headers: { origin: 'https://attacker.example' } }), 403],
        [{ now: () => Date.parse('2026-12-01') }, request(), 403],
        [{}, request({ ...valid(), description: 'a'.repeat(201) }), 400],
        [{ verifyCaptcha: async () => false }, request(valid(), [png()]), 403],
        [{ config: { origins: [] } }, request(), 503]
    ]) {
        const { handle, calls } = harness(overrides);
        assert.equal((await handle(req)).status, status);
        assert.equal(calls.uploads.length, 0);
        assert.equal(calls.commits.length, 0);
    }
});
test('enforces body limit even without a Content-Length header', async () => {
    const { handle } = harness();
    const req = new Request('https://example.org', { method: 'POST', headers: { origin: config.origins[0], 'content-type': 'multipart/form-data; boundary=x' }, body: 'x'.repeat(MAX_BODY_BYTES + 1) });
    assert.equal((await handle(req)).status, 413);
});
test('rejects oversized metadata before parsing or uploading', async () => {
    const { handle, calls } = harness();
    const response = await handle(request({ ...valid(), unused: 'a'.repeat(20000) }));
    assert.equal(response.status, 400);
    assert.equal(calls.uploads.length, 0);
});
test('browser transport never treats HTTP errors or malformed success as a receipt', async () => {
    const { sendRegistration } = await import('../event-registration.js');
    const snapshot = { payload: valid(), files: [] };
    const success = async () => new Response(JSON.stringify({ ok: true, code: 'RRC-W-EXAMPLE' }), { status: 201 });
    assert.equal(await sendRegistration('https://example.org', snapshot, 'token', 'public', success), 'RRC-W-EXAMPLE');
    for (const [body, status] of [[{ ok: true, code: 'RRC-W-EXAMPLE' }, 503], [{ ok: true, code: '<script>' }, 201], [{ code: 'CAPTCHA_FAILED' }, 403]]) {
        await assert.rejects(() => sendRegistration('https://example.org', snapshot, 'token', 'public', async () => new Response(JSON.stringify(body), { status })));
    }
});
test('cleans up completed uploads when a later upload fails', async () => {
    const removed = [];
    let count = 0;
    const { handle, calls } = harness({ storage: { upload: async () => { if (++count === 2) throw Error('internal secret'); }, remove: async (paths) => removed.push(...paths) } });
    const response = await handle(request(valid(), [png(), png()]));
    assert.equal(response.status, 503);
    assert.equal(removed.length, 1);
    assert.equal(calls.commits.length, 0);
    assert.doesNotMatch(await response.text(), /internal secret/);
});
test('duplicate commits return the same receipt and remove only this attempt files', async () => {
    const { handle, calls } = harness({ repository: { commit: async () => ({ code: 'RRC-W-EXAMPLE', inserted: false }) } });
    const response = await handle(request(valid(), [png()]));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).code, 'RRC-W-EXAMPLE');
    assert.deepEqual(calls.removals, calls.uploads);
});
test('ambiguous commit failure does not delete possibly committed photos or leak internal errors', async () => {
    const { handle, calls } = harness({ repository: { commit: async () => { throw Error('SQL password detail'); } } });
    const response = await handle(request(valid(), [png()]));
    assert.equal(response.status, 503);
    assert.equal(calls.removals.length, 0);
    assert.doesNotMatch(await response.text(), /SQL|password/);
});
test('only successful captcha with correct hostname and action is accepted', async () => {
    const { isValidCaptchaResult } = await import('../supabase/functions/event-registration/handler.js');
    assert.equal(isValidCaptchaResult({ success: true, hostname: 'rerecords.space', action: 'registration' }, config.origins), true);
    assert.equal(isValidCaptchaResult({ success: true, hostname: 'evil.example', action: 'registration' }, config.origins), false);
    assert.equal(isValidCaptchaResult({ success: true, hostname: 'rerecords.space', action: 'other' }, config.origins), false);
});
