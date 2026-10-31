export const MAX_PHOTOS = 3;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export const MAX_BODY_BYTES = MAX_PHOTOS * MAX_PHOTO_BYTES + 64 * 1024;
const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export class RegistrationError extends Error {
    constructor(field, code = 'INVALID_FIELDS', status = 400) {
        super(field);
        this.field = field;
        this.code = code;
        this.status = status;
    }
}

export function validateRegistration(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new RegistrationError('form');
    const text = (key, max, required = false, multiline = false) => {
        const value = input[key] ?? '';
        if (typeof value !== 'string') throw new RegistrationError(key);
        const normalized = value.trim();
        if ((required && !normalized) || [...normalized].length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalized) || (!multiline && /[\r\n]/.test(normalized))) throw new RegistrationError(key);
        return normalized || null;
    };
    const submissionId = text('submissionId', 36, true);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionId)) throw new RegistrationError('submissionId');
    const name = text('name', 120, true);
    const email = text('email', 254, true).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RegistrationError('email');
    const videoUrl = text('videoUrl', 2048);
    if (videoUrl) {
        let url;
        try { url = new URL(videoUrl); } catch { throw new RegistrationError('videoUrl'); }
        if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new RegistrationError('videoUrl');
    }
    const salon = text('salon', 12);
    if (salon && !['yes', 'no', 'undecided'].includes(salon)) throw new RegistrationError('salon');
    if (input.privacyAccepted !== true) throw new RegistrationError('privacyAccepted');
    return {
        submissionId, name, email,
        title: text('title', 200, true), description: text('description', 200, true, true),
        salon, major: text('major', 120), year: text('year', 60), origin: text('origin', 120),
        supplement: text('supplement', 2000, false, true), videoUrl, privacyAccepted: true
    };
}

export function validatePhotos(photos) {
    if (photos.length > MAX_PHOTOS || photos.some((file) => !PHOTO_TYPES.has(file.type) || !file.size || file.size > MAX_PHOTO_BYTES)) throw new RegistrationError('photos');
}

export async function inspectPhoto(file) {
    validatePhotos([file]);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const starts = (signature) => signature.every((byte, i) => bytes[i] === byte);
    let extension;
    if (file.type === 'image/png' && starts([137,80,78,71,13,10,26,10])) extension = 'png';
    if (file.type === 'image/jpeg' && starts([255,216,255])) extension = 'jpg';
    if (file.type === 'image/webp' && starts([82,73,70,70]) && bytes[8] === 87 && bytes[9] === 69 && bytes[10] === 66 && bytes[11] === 80) extension = 'webp';
    if (!extension) throw new RegistrationError('photos');
    const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), (n) => n.toString(16).padStart(2, '0')).join('');
    return { bytes, extension, digest, type: file.type, size: bytes.length };
}
