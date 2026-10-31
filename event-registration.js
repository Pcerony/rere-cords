import { validateRegistration, validatePhotos, RegistrationError } from './event-registration-core.js';
import { REGISTRATION_COPY } from './event-registration-copy.js?v=2';

export function captchaFailureMessage(locale, code) {
    const safeCode = /^\d{6}$/.test(String(code)) ? String(code) : 'LOAD_ERROR';
    return (REGISTRATION_COPY[locale] || REGISTRATION_COPY.en).captchaUnavailable.replace('{code}', safeCode);
}

export async function sendRegistration(endpoint, snapshot, captchaToken, publishableKey, fetcher = fetch) {
    const body = new FormData();
    body.set('payload', JSON.stringify(snapshot.payload));
    body.set('captchaToken', captchaToken);
    for (const file of snapshot.files) body.append('photos', file, file.name);
    const response = await fetcher(endpoint, { method: 'POST', headers: { apikey: publishableKey }, body, signal: AbortSignal.timeout(90000) });
    const result = await response.json();
    if (!response.ok || result.ok !== true || typeof result.code !== 'string' || !/^RRC-W-[A-Z0-9-]+$/.test(result.code)) {
        const error = new Error('Submission not confirmed');
        error.code = result.code;
        error.field = result.field;
        error.definite = ['INVALID_FIELDS', 'TOO_LARGE', 'CAPTCHA_FAILED', 'CLOSED', 'FORBIDDEN', 'NOT_CONFIGURED'].includes(result.code);
        throw error;
    }
    return result.code;
}

function initializeRegistration() {
    const form = document.getElementById('registration-form');
    if (!form) return;
    const config = window.RERE_CORDS_REGISTRATION_CONFIG || {};
    const connection = window.RERE_CORDS_RESERVATION_CONFIG || {};
    const language = document.getElementById('registration-language');
    const fields = document.getElementById('registration-fields');
    const submit = document.getElementById('registration-submit');
    const message = document.getElementById('registration-message');
    const description = document.getElementById('registration-description');
    const counter = document.getElementById('description-count');
    const photosInput = document.getElementById('registration-photos');
    const previews = document.getElementById('photo-previews');
    let locale = 'ja';
    try {
        const saved = localStorage.getItem('rere_cords_lang');
        locale = REGISTRATION_COPY[saved] ? saved : saved?.startsWith('zh') ? 'zh' : 'ja';
    } catch { /* Storage can be unavailable in private browsers. */ }
    let pendingSnapshot = null;
    let captchaId;
    let captchaToken = '';
    let captchaErrorCode = '';
    let busy = false;
    let messageKey = '';
    let imageUrls = [];
    let endpoint = '';
    try {
        const base = new URL(connection.supabaseUrl);
        if (base.protocol === 'https:' || (base.hostname === '127.0.0.1' && base.protocol === 'http:')) endpoint = `${base.origin}/functions/v1/event-registration`;
    } catch { /* An absent public configuration must never enable submission. */ }
    const connected = config.enabled === true && endpoint && connection.publishableKey && config.turnstileSiteKey;
    const copy = () => REGISTRATION_COPY[locale];
    function show(key, focus = false) {
        messageKey = key;
        message.textContent = key === 'captchaUnavailable' ? captchaFailureMessage(locale, captchaErrorCode) : copy()[key] || '';
        if (focus) message.focus();
    }
    function updateButton() {
        submit.textContent = copy()[busy ? 'submitting' : pendingSnapshot ? 'retry' : 'submit'];
        submit.disabled = busy || !connected || !captchaToken;
    }
    function translate() {
        document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
        document.title = `${copy().pageTitle} | RERE-CORDS`;
        language.value = locale;
        for (const node of document.querySelectorAll('[data-copy]')) node.textContent = copy()[node.dataset.copy] || '';
        if (messageKey) show(messageKey);
        updateButton();
    }
    function resetCaptcha() {
        captchaToken = '';
        if (captchaId !== undefined) window.turnstile?.reset(captchaId);
        updateButton();
    }
    language.addEventListener('change', () => {
        locale = language.value;
        try { localStorage.setItem('rere_cords_lang', locale); } catch { /* Optional preference. */ }
        translate();
    });
    description.addEventListener('input', () => {
        const count = [...description.value.trim()].length;
        counter.textContent = `${count} / 200`;
        counter.classList.toggle('over-limit', count > 200);
        description.setCustomValidity(count > 200 ? copy().descriptionHint : '');
    });
    photosInput.addEventListener('change', () => {
        for (const url of imageUrls) URL.revokeObjectURL(url);
        imageUrls = [];
        previews.replaceChildren();
        const files = [...photosInput.files];
        try { validatePhotos(files); } catch {
            photosInput.value = '';
            show('photoError', true);
            return;
        }
        show('');
        for (const file of files) {
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const caption = document.createElement('figcaption');
            image.src = URL.createObjectURL(file);
            imageUrls.push(image.src);
            image.alt = file.name;
            caption.textContent = file.name;
            figure.append(image, caption);
            previews.append(figure);
        }
    });
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (busy || !connected) return;
        if (!captchaToken) { show('captcha', true); return; }
        for (const node of form.querySelectorAll('[aria-invalid]')) node.removeAttribute('aria-invalid');
        if (!pendingSnapshot) {
            try {
                const data = Object.fromEntries(new FormData(form));
                data.submissionId = crypto.randomUUID();
                data.privacyAccepted = form.elements.privacyAccepted.checked;
                const files = [...photosInput.files];
                validatePhotos(files);
                pendingSnapshot = { payload: validateRegistration(data), files, uncertain: false };
            } catch (error) {
                if (error instanceof RegistrationError) {
                    message.textContent = copy().invalid + (copy()[error.field] || error.field);
                    const node = form.elements.namedItem(error.field);
                    node?.setAttribute('aria-invalid', 'true');
                    node?.focus();
                }
                return;
            }
        }
        busy = true;
        fields.disabled = true;
        show('');
        updateButton();
        try {
            const code = await sendRegistration(endpoint, pendingSnapshot, captchaToken, connection.publishableKey);
            document.getElementById('receipt-code').textContent = code;
            form.hidden = true;
            const receipt = document.getElementById('registration-receipt');
            receipt.hidden = false;
            receipt.focus();
            pendingSnapshot = null;
            for (const url of imageUrls) URL.revokeObjectURL(url);
            imageUrls = [];
        } catch (error) {
            // A rejected retry does not resolve whether an earlier, timed-out attempt committed.
            if (!error.definite) pendingSnapshot.uncertain = true;
            if (error.definite && !pendingSnapshot.uncertain) {
                pendingSnapshot = null;
                fields.disabled = false;
            }
            show(error.code === 'CLOSED' ? 'closed' : error.code === 'CAPTCHA_FAILED' ? 'captcha' : error.code === 'NOT_CONFIGURED' ? 'notConfigured' : 'failed', true);
            if (error.field && form.elements.namedItem(error.field)) {
                form.elements.namedItem(error.field).setAttribute('aria-invalid', 'true');
            }
        } finally {
            busy = false;
            resetCaptcha();
        }
    });
    translate();
    if (!connected) { show('notConfigured'); return; }
    show('captcha');
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
        captchaId = window.turnstile.render('#registration-captcha', {
            sitekey: config.turnstileSiteKey, action: 'registration', language: locale === 'zh' ? 'zh-cn' : locale,
            callback: (token) => { captchaToken = token; if (['captcha', 'captchaUnavailable'].includes(messageKey)) show(''); updateButton(); },
            'expired-callback': () => { captchaToken = ''; updateButton(); },
            'error-callback': (code) => { captchaToken = ''; captchaErrorCode = code; show('captchaUnavailable'); updateButton(); }
        });
    };
    script.onerror = () => { captchaErrorCode = ''; show('captchaUnavailable'); };
    document.head.append(script);
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeRegistration, { once: true });
    else initializeRegistration();
}
