import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), 'utf8');

function parseTranslations(source) {
    const match = source.match(/const i18nDict = (\{[\s\S]*?\n    \});/);
    assert.ok(match, 'app.js should expose a JSON-compatible i18n dictionary block');
    return JSON.parse(match[1]);
}

test('submission config is closed and empty by default', () => {
    const context = { window: {} };
    vm.runInNewContext(read('submission-config.js'), context);

    const config = context.window.RERE_CORDS_SUBMISSION_CONFIG;
    assert.equal(config.enabled, false);
    assert.equal(config.formUrl, '');
    assert.equal(config.fallbackDocumentUrl, '');
});

test('homepage contains one disabled submission entry before the venue', () => {
    const html = read('index.html');
    const submissionIndex = html.indexOf('id="submission"');
    const venueIndex = html.indexOf('id="venue"');

    assert.ok(submissionIndex >= 0, 'homepage must contain #submission');
    assert.ok(venueIndex > submissionIndex, '#submission must appear before #venue');
    assert.match(html, /id="submission-cta"/);
    assert.match(html, /id="submission-fallback"/);
    assert.match(html, /submission-config\.js\?v=1"><\/script>\s*<script src="app\.js\?v=14"><\/script>/);
    assert.doesNotMatch(html, /unpkg\.com\/lucide|lucide\.createIcons/);
    assert.match(html, /logo-dark\.png" alt="SoDesLab"/);
    assert.match(html, /logo1\.png" alt="SoDesLab"/);
});

test('every translated homepage key has zh, ja, en, and fi values', () => {
    const html = read('index.html');
    const dictionary = parseTranslations(read('app.js'));
    const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);

    for (const key of keys) {
        assert.ok(dictionary[key], `missing translation key: ${key}`);
        for (const language of ['zh', 'ja', 'en', 'fi']) {
            assert.equal(typeof dictionary[key][language], 'string', `${key}.${language} must be a string`);
            assert.notEqual(dictionary[key][language].trim(), '', `${key}.${language} must not be empty`);
        }
    }
});

test('homepage exposes Finnish and uses the simplified participant flow', () => {
    const html = read('index.html');
    const app = read('app.js');

    assert.match(html, /data-lang-btn="fi">FI<\/button>/);
    assert.match(app, /fi:\s*'fi'/);
    assert.equal((html.match(/class="timeline-item(?:\s|"|$)/g) || []).length, 2);
    assert.match(html, /class="timeline-optional/);
    assert.match(html, /data-i18n="timeline-optional-badge"/);
    assert.doesNotMatch(html, /data-i18n="(?:time|title|text)-step[245]"/);
    assert.doesNotMatch(html, /data-i18n="title-step2"/);
});

test('homepage contains safety, advisor, and precise submission guidance', () => {
    const html = read('index.html');
    const advisorStart = html.indexOf('id="advisors"');
    const zhangIndex = html.indexOf('張 彦芳', advisorStart);
    const sarantouIndex = html.indexOf('Melanie Sarantou', advisorStart);

    assert.match(html, /id="safety"/);
    assert.match(html, /data-i18n="safety-heat-text"/);
    assert.match(html, /data-i18n="safety-prohibited-text"/);
    assert.ok(advisorStart >= 0, 'homepage must contain #advisors');
    assert.ok(zhangIndex > advisorStart, 'ZHANG Yanfang must appear in #advisors');
    assert.ok(sarantouIndex > zhangIndex, 'Melanie Sarantou must appear after ZHANG Yanfang');
    assert.match(html, /data-i18n="submission-digital-requirements"/);
    assert.match(html, /data-i18n="submission-physical-options"/);
});

test('language, submission, and motion foundations are present', () => {
    const app = read('app.js');
    const css = read('styles.css');

    assert.match(app, /'zh-CN'/);
    assert.match(app, /'en'/);
    assert.match(app, /prefers-reduced-motion/);
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    assert.match(css, /submission-cta/);
});
