import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { RESERVATION_COPY } from '../safety-tool-reservation.js';

const html = readFileSync(new URL('../safety-tool-reservation.html', import.meta.url), 'utf8');
const config = readFileSync(new URL('../safety-tool-reservation-config.js', import.meta.url), 'utf8');

test('reservation page contains the required accessible participant form', () => {
    for (const id of ['name', 'student-number', 'course', 'email', 'pickup-date', 'return-date']) {
        assert.match(html, new RegExp(`id="${id}"`));
    }
    for (const equipment of ['cutter', 'goggles', 'mask', 'gloves']) {
        assert.match(html, new RegExp(`data-equipment="${equipment}"`));
    }
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /MEDIA STUDIO/);
    assert.match(html, /7号馆|Building 7/);
    assert.match(html, /safety-tool-reservation\.js/);
    assert.match(html, /id="student-number"[^>]*required/);
    assert.match(html, /data-copy="student_number"/);
});

test('reservation page keeps booking closed until both public settings are present', () => {
    assert.match(config, /supabaseUrl:\s*''/);
    assert.match(config, /publishableKey:\s*''/);
    assert.doesNotMatch(config, /service.role|secret|sb_secret/i);
    assert.match(html, /supabase-js@2\.117\.2\/dist\/umd\/supabase\.js/);
});

test('reservation interface copy covers every site locale', () => {
    const locales = ['zh', 'zh-TW', 'ja', 'en', 'ko', 'id', 'vi', 'th', 'bn', 'ar', 'fr', 'hi', 'fi'];
    const requiredKeys = [...new Set([
        ...[...html.matchAll(/data-copy="([^"]+)"/g)].map((match) => match[1]),
        'pending', 'config_missing', 'invalid', 'reservation_code', 'student_number_required'
    ])];
    for (const locale of locales) {
        assert.ok(RESERVATION_COPY[locale], `missing locale ${locale}`);
        for (const key of requiredKeys) {
            assert.equal(typeof RESERVATION_COPY[locale][key], 'string', `missing ${locale}.${key}`);
            assert.notEqual(RESERVATION_COPY[locale][key].trim(), '');
        }
    }
});
