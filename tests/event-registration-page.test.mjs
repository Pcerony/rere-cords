import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('participant form exposes required fields, optional photos/video and an accessible receipt', () => {
    const html = read('event-registration.html');
    for (const name of ['name', 'email', 'title', 'description']) assert.match(html, new RegExp(`name="${name}"[^>]*required`));
    for (const name of ['salon', 'major', 'year', 'origin', 'supplement', 'videoUrl', 'photos']) assert.match(html, new RegExp(`name="${name}"`));
    assert.match(html, /accept="image\/jpeg,image\/png,image\/webp"/);
    assert.doesNotMatch(html, /accept="video|type="password"/);
    assert.match(html, /id="registration-message"[^>]*role="alert"/);
    assert.match(html, /id="registration-receipt"[^>]*hidden/);
    assert.match(html, /autocomplete="name"/);
    assert.match(html, /event-registration-config\.js\?v=2/);
});
test('public configuration is disabled by default and never includes a secret', () => {
    const config = read('event-registration-config.js');
    assert.match(config, /enabled: false/);
    assert.doesNotMatch(config, /service_role|secret|sb_secret_/);
    const client = read('event-registration.js');
    assert.match(client, /validateRegistration/);
    assert.match(client, /crypto\.randomUUID/);
    assert.match(client, /pendingSnapshot/);
    assert.match(client, /textContent/);
    assert.doesNotMatch(client, /innerHTML/);
});
test('registration admin checks its own role, reads pages and signs private photo URLs', () => {
    const html = read('event-registration-admin.html');
    const script = read('event-registration-admin.js');
    assert.match(html, /autocomplete="current-password"/);
    assert.doesNotMatch(html, /signUp|注册/);
    assert.match(script, /is_event_registration_admin/);
    assert.match(script, /\.range\(/);
    assert.match(script, /createSignedUrl\([^\n]*300/);
    assert.match(script, /admin_set_event_physical_received/);
    assert.doesNotMatch(script, /innerHTML|service_role/);
});
test('registration translations cover all copy keys in Japanese, Chinese and English', async () => {
    const { REGISTRATION_COPY } = await import('../event-registration-copy.js');
    const keys = Object.keys(REGISTRATION_COPY.ja).sort();
    for (const lang of ['zh', 'en']) assert.deepEqual(Object.keys(REGISTRATION_COPY[lang]).sort(), keys);
    const html = read('event-registration.html');
    for (const [, key] of html.matchAll(/data-copy="([^"]+)"/g)) assert.ok(REGISTRATION_COPY.ja[key], key);
});
test('privacy notice states the confirmed February 28, 2027 retention deadline in every form language', async () => {
    const { REGISTRATION_COPY } = await import('../event-registration-copy.js');
    assert.match(REGISTRATION_COPY.ja.privacy, /2027年2月28日/);
    assert.match(REGISTRATION_COPY.zh.privacy, /2027年2月28日/);
    assert.match(REGISTRATION_COPY.en.privacy, /February 28, 2027/);
});
