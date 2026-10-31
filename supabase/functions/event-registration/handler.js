import { validateRegistration, validatePhotos, inspectPhoto, MAX_BODY_BYTES, RegistrationError } from '../../../event-registration-core.js';

export function isValidCaptchaResult(result, origins) {
    return result?.success === true && result.action === 'registration' && origins.some((origin) => new URL(origin).hostname === result.hostname);
}

async function boundedForm(request) {
    if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES) throw new RegistrationError('photos', 'TOO_LARGE', 413);
    if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) throw new RegistrationError('form');
    const reader = request.body?.getReader();
    if (!reader) throw new RegistrationError('form');
    let length = 0;
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.length;
        if (length > MAX_BODY_BYTES) {
            await reader.cancel();
            throw new RegistrationError('photos', 'TOO_LARGE', 413);
        }
        chunks.push(value);
    }
    try {
        return await new Response(new Blob(chunks), { headers: { 'content-type': request.headers.get('content-type') } }).formData();
    } catch { throw new RegistrationError('form'); }
}

export function createRegistrationHandler({ config, now = Date.now, verifyCaptcha, storage, repository }) {
    return async (request) => {
        const origin = request.headers.get('origin');
        const allowed = config.origins?.includes(origin);
        const headers = { 'content-type': 'application/json', 'cache-control': 'no-store', vary: 'Origin' };
        if (allowed) Object.assign(headers, { 'access-control-allow-origin': origin, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type, apikey, x-client-info' });
        const reply = (status, value) => new Response(JSON.stringify(value), { status, headers });
        if (!config.origins?.length || !Number.isFinite(Date.parse(config.opensAt)) || !Number.isFinite(Date.parse(config.closesAt))) return reply(503, { code: 'NOT_CONFIGURED' });
        if (!allowed) return reply(403, { code: 'FORBIDDEN' });
        if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
        if (request.method !== 'POST') return reply(405, { code: 'METHOD_NOT_ALLOWED' });
        if (now() < Date.parse(config.opensAt) || now() >= Date.parse(config.closesAt)) return reply(403, { code: 'CLOSED' });
        const uploaded = [];
        let committing = false;
        const cleanup = async () => {
            if (uploaded.length) {
                try { await storage.remove(uploaded); } catch { /* Orphan cleanup is documented in the operations guide. */ }
            }
        };
        try {
            const form = await boundedForm(request);
            const encoded = form.get('payload');
            if (typeof encoded !== 'string' || encoded.length > 16384) throw new RegistrationError('form');
            let raw;
            try { raw = JSON.parse(encoded); } catch { throw new RegistrationError('form'); }
            const payload = validateRegistration(raw);
            const photos = form.getAll('photos');
            if (photos.some((photo) => typeof photo === 'string')) throw new RegistrationError('photos');
            validatePhotos(photos);
            const token = form.get('captchaToken');
            if (typeof token !== 'string' || !token || token.length > 2048 || !await verifyCaptcha(token)) return reply(403, { code: 'CAPTCHA_FAILED' });
            const inspected = [];
            for (const photo of photos) inspected.push(await inspectPhoto(photo));
            const canonical = JSON.stringify({ payload, photos: inspected.map(({ digest, type, size }) => ({ digest, type, size })) });
            const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical))), (n) => n.toString(16).padStart(2, '0')).join('');
            const attempt = crypto.randomUUID();
            const files = [];
            for (const [index, photo] of inspected.entries()) {
                const path = `${payload.submissionId}/${attempt}/${index}.${photo.extension}`;
                await storage.upload(path, photo.bytes, photo.type);
                uploaded.push(path);
                files.push({ path, type: photo.type, size: photo.size, digest: photo.digest });
            }
            committing = true;
            const result = await repository.commit({ id: payload.submissionId, payload, files, digest });
            if (!result.inserted) await cleanup();
            return reply(result.inserted ? 201 : 200, { ok: true, code: result.code });
        } catch (error) {
            // A lost RPC response may still represent a successful commit: never delete its files here.
            if (!committing) await cleanup();
            if (error instanceof RegistrationError) return reply(error.status, { code: error.code, field: error.field });
            return reply(503, { code: 'SUBMISSION_FAILED' });
        }
    };
}
