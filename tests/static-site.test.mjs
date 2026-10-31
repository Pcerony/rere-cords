import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = (file) => readFileSync(resolve(root, file), 'utf8');

function parseTranslations(source) {
    const match = source.match(/const i18nDict = (\{[\s\S]*?\n    \});/);
    assert.ok(match, 'app.js should expose a JSON-compatible i18n dictionary block');
    const dictionary = JSON.parse(match[1]);
    const finnishMatch = source.match(/const fiTranslations = (\{[\s\S]*?\n    \});/);
    assert.ok(finnishMatch, 'app.js should expose Finnish translations');

    for (const [key, value] of Object.entries(JSON.parse(finnishMatch[1]))) {
        if (dictionary[key]) dictionary[key].fi = value;
    }

    return dictionary;
}

function mergeExtraTranslations(dictionary) {
    const context = { window: {} };
    vm.runInNewContext(read('translations.js'), context);

    for (const [language, translations] of Object.entries(context.window.RERE_CORDS_EXTRA_TRANSLATIONS)) {
        for (const [key, value] of Object.entries(translations)) {
            if (dictionary[key]) dictionary[key][language] = value;
        }
    }

    return dictionary;
}

test('registration dates agree across the homepage, form and production runbook', () => {
    for (const file of ['app.js', 'translations.js', 'index.html', 'event-registration-copy.js', 'event-registration.html', 'scripts/update-registration-translations.mjs']) {
        assert.doesNotMatch(read(file), /10月1日|11月10日|October 1|November 10|10\. marraskuuta|1\. lokakuuta|10월 1일|11월 10일|1 Oktober|10 November|1\/10|10\/11|1er octobre|10 novembre|১ অক্টোবর|১০ নভেম্বর/, file);
    }
    assert.match(read('event-registration-copy.js'), /November 1 – November 20, 2026/);
    assert.match(read('docs/event-registration-setup.md'), /2026-11-01T00:00:00\+09:00/);
    assert.match(read('docs/event-registration-setup.md'), /2026-11-21T00:00:00\+09:00/);
});

test('submission config opens the official online registration route on November 1', () => {
    const context = { window: {} };
    vm.runInNewContext(read('submission-config.js'), context);
    const app = read('app.js');

    const config = context.window.RERE_CORDS_SUBMISSION_CONFIG;
    assert.equal(config.enabled, true);
    assert.equal(config.formUrl, 'https://rerecords.space/event-registration.html');
    assert.equal(config.opensAt, '2026-11-01T00:00:00+09:00');
    assert.equal(config.fallbackDocumentUrl, '');
    assert.doesNotMatch(app, /Date\.now\(\) >= opensAt/);
});

test('homepage provides two prominent shortcuts below the hero and a full-size registration entry', () => {
    const html = read('index.html');
    const shortcuts = html.split('class="homepage-shortcuts"')[1]?.split('</nav>')[0] || '';
    assert.match(shortcuts, /href="safety-tool-reservation.html"/);
    assert.match(shortcuts, /href="event-registration.html"/);
    assert.match(html, /id="submission-cta" class="submission-cta page-shortcut" href="event-registration.html"/);
    assert.match(read('styles.css'), /\.page-shortcut\s*\{[^}]*min-height:\s*5rem/s);
});

test('homepage shortcuts form an edge-to-edge divided band and advisors follow submission', () => {
    const html = read('index.html');
    const css = read('styles.css');
    assert.match(html, /class="homepage-shortcut-grid"/);
    assert.doesNotMatch(html, /class="section-container homepage-shortcut-grid"/);
    assert.match(css, /\.homepage-shortcut-grid\s*\{[^}]*gap:\s*0;/s);
    assert.match(css, /\.homepage-shortcuts \.page-shortcut\s*\{[^}]*min-height:\s*5rem;[^}]*border:\s*0;/s);
    assert.match(css, /background:\s*rgba\(0, 0, 0, 0\.88\)/);
    assert.match(css, /background:\s*rgba\(193, 85, 53, 0\.88\)/);
    assert.ok(html.indexOf('id="advisors"') > html.indexOf('id="submission"'));
    assert.ok(html.indexOf('id="advisors"') < html.indexOf('id="venue"'));
});

test('homepage contains one active submission entry before the venue', () => {
    const html = read('index.html');
    const submissionIndex = html.indexOf('id="submission"');
    const venueIndex = html.indexOf('id="venue"');

    assert.ok(submissionIndex >= 0, 'homepage must contain #submission');
    assert.ok(venueIndex > submissionIndex, '#submission must appear before #venue');
    assert.match(html, /id="submission-cta"/);
    assert.match(html, /id="submission-fallback"/);
    assert.match(html, /styles\.css\?v=\d+/);
    assert.match(html, /submission-config\.js\?v=5"><\/script>\s*<script src="translations\.js\?v=17"><\/script>\s*<script src="app\.js\?v=39"><\/script>/);
    assert.doesNotMatch(html, /unpkg\.com\/lucide|lucide\.createIcons/);
    assert.match(html, /logo-dark\.png" alt="SoDesLab"/);
    assert.match(html, /logo1\.png" alt="SoDesLab"/);
});

test('public search metadata uses the canonical custom domain and has crawl discovery files', () => {
    const html = read('index.html');
    const robots = read('robots.txt');
    const sitemap = read('sitemap.xml');

    assert.match(html, /rel="canonical" href="https:\/\/rerecords\.space\/"/);
    assert.match(html, /property="og:url" content="https:\/\/rerecords\.space\/"/);
    assert.doesNotMatch(html, /pcerony\.github\.io\/rere-cords/);
    assert.match(robots, /User-agent:\s*\*/);
    assert.match(robots, /Allow:\s*\//);
    assert.match(robots, /Sitemap:\s*https:\/\/rerecords\.space\/sitemap\.xml/);
    assert.match(sitemap, /<loc>https:\/\/rerecords\.space\/<\/loc>/);
});

test('submitting a work is the only participation step', () => {
    const html = read('index.html');
    const app = read('app.js');
    const submissionStart = html.indexOf('id="submission"');
    const submissionEnd = html.indexOf('</section>', submissionStart);
    const submission = html.slice(submissionStart, submissionEnd);

    assert.doesNotMatch(html, /id="apply"/);
    assert.doesNotMatch(html, /data-i18n="(?:title-apply|lead-apply|apply-method-title|apply-method-text)"/);
    assert.match(submission, /data-i18n="apply-period-title"/);
    assert.match(submission, /data-i18n="apply-period-text"/);
    assert.match(app, /无需提前报名|事前の参加申込は不要|No advance registration is required/);
    assert.doesNotMatch(app, /"title-apply"|"lead-apply"|"apply-method-title"|"apply-method-text"/);
});

test('homepage offers a clear physical participant flow before record pickup', () => {
    const html = read('index.html');
    const pathwaysIndex = html.indexOf('id="pathways"');
    const posterIndex = html.indexOf('id="poster"');
    const pathwaysEnd = html.indexOf('</section>', pathwaysIndex);
    const pathways = html.slice(pathwaysIndex, pathwaysEnd);

    assert.ok(pathwaysIndex >= 0, 'homepage must contain #pathways');
    assert.ok(posterIndex > pathwaysIndex, '#pathways must appear before optional record pickup');
    assert.match(pathways, /id="pathway-panel-physical"/);
    assert.doesNotMatch(pathways, /role="tablist"/, 'tablist removed for single physical flow');
    assert.doesNotMatch(pathways, /data-pathway-tab="digital-native"/);
    assert.doesNotMatch(pathways, /<form\b/i, 'pathway display must not register a participant');
});

test('participant pathway structure is clean and shared with physical submission', () => {
    const html = read('index.html');
    const app = read('app.js');

    assert.equal((html.match(/data-pathway-submission=/g) || []).length, 1);
    assert.match(html, /data-pathway-submission="physical"/);
    assert.match(app, /function initParticipantPathways\(\)/);
    assert.match(app, /rere_cords_pathway/);
});

test('concept statistics focus on SDG 12', () => {
    const html = read('index.html');
    const app = read('app.js');

    const conceptStart = html.indexOf('id="concept"');
    const conceptEnd = html.indexOf('</section>', conceptStart);
    const concept = html.slice(conceptStart, conceptEnd);

    assert.equal((concept.match(/class="sdg-block"/g) || []).length, 1);
    assert.match(concept, /SDG 12/);
    assert.match(concept, /data-i18n="stat-target-detail"/);
    assert.match(app, /负责任消费和生产/);
});

test('homepage uses the confirmed 2026 collection period, handoff point, and exhibition room', () => {
    const html = read('index.html');
    const app = read('app.js');
    const config = read('submission-config.js');

    assert.match(app, /2026年11月1日（日）〜2026年11月20日（金）/);
    assert.match(app, /7号館2階MEDIA STUDIO部屋前/);
    assert.match(app, /回収ボックス/);
    assert.match(app, /多次元棟\s*2階\s*スタジオ201/);
    assert.match(config, /event-registration\.html/);
    assert.doesNotMatch(app, /2026年5月1日|7月30日|2026年8月10日/);
    assert.doesNotMatch(html, /2026年5月1日|7月30日|2026年8月10日/);
});

test('timeline ends with the November 22-25 exhibition and optional salon on November 25', () => {
    const html = read('index.html');
    const app = read('app.js');
    const timelineStart = html.indexOf('id="timeline"');
    const timelineEnd = html.indexOf('</section>', timelineStart);
    const timeline = html.slice(timelineStart, timelineEnd);
    const exhibitionIndex = timeline.indexOf('data-i18n="time-step3"');
    const salonIndex = timeline.indexOf('data-i18n="time-salon"');

    assert.ok(exhibitionIndex >= 0 && salonIndex > exhibitionIndex, 'optional salon must follow the exhibition');
    assert.match(app, /2026年11月22日\s*-\s*11月25日/);
    assert.match(app, /2026年11月25日/);
    assert.doesNotMatch(app, /2026年11月15日|2026年11月20日\s*-\s*11月25日/);
    assert.match(html, /"startDate": "2026-11-22T10:00:00\+09:00"/);
    assert.match(html, /"endDate": "2026-11-25T17:00:00\+09:00"/);
});

test('timeline keeps schedule dates readable and aligns the optional salon to the main axis', () => {
    const html = read('index.html');
    const css = read('styles.css');
    const timelineStart = html.indexOf('id="timeline"');
    const timelineEnd = html.indexOf('</section>', timelineStart);
    const timeline = html.slice(timelineStart, timelineEnd);

    assert.match(timeline, /class="timeline-date-group"/);
    assert.match(timeline, /data-i18n="time-step1-making"/);
    assert.match(timeline, /data-i18n="time-step1-submission"/);
    assert.match(timeline, /class="timeline-optional-meta"[\s\S]*?data-i18n="timeline-optional-badge"[\s\S]*?data-i18n="time-salon"/);
    assert.doesNotMatch(timeline, /data-i18n="time-step1"/);
    assert.doesNotMatch(timeline, /timeline-item-last/);
    assert.match(css, /\.timeline-optional\s*\{[^}]*padding-left:\s*55px;/s);
    assert.match(css, /\.timeline-optional-marker\s*\{[^}]*left:\s*15px;/s);
    assert.match(css, /\.timeline-optional-meta\s*\{[^}]*display:\s*grid;/s);
    assert.doesNotMatch(css, /\.timeline-item-last::after/);
});

test('submission requires a physical work, identifying slip and online registration', () => {
    const html = read('index.html');
    const app = read('app.js');
    const submissionStart = html.indexOf('id="submission"');
    const submissionEnd = html.indexOf('</section>', submissionStart);
    const submission = html.slice(submissionStart, submissionEnd);

    assert.match(app, /纸条/);
    assert.match(app, /相同姓名和邮箱/);
    assert.match(app, /视频链接/);
    assert.match(app, /填写线上报名表/);
    assert.match(submission, /id="submission-cta"[^>]+href="event-registration.html"/);
    assert.doesNotMatch(submission, /纯数字作品|数字作品提交/);
});

test('records collected from posters are reserved for project participation', () => {
    const html = read('index.html');
    const app = read('app.js');

    assert.match(html, /data-i18n="method1-purpose-note"/);
    assert.match(app, /The analog records may only be collected for purposes directly related to participation in this project\./);
    assert.match(app, /Any collection for personal use of the analog records is strictly prohibited\./);
    assert.match(app, /实体唱片只可为与参与本项目直接相关的目的领取/);
    assert.match(app, /本プロジェクトへの参加に直接関係する目的に限り/);
    assert.match(app, /ポスター裏面のレコードが不足している場合は/);
    assert.doesNotMatch(app, /ポスター裏面のレコードがすでに取り外されている場合は/);
});

test('record pickup methods include the MEDIA STUDIO collection point', () => {
    const html = read('index.html');
    const app = read('app.js');
    const methodsStart = html.indexOf('class="record-methods reveal-on-scroll"');
    const methodsEnd = html.indexOf('</section>', methodsStart);
    const methods = html.slice(methodsStart, methodsEnd);

    assert.equal((methods.match(/class="record-method-card(?:\s|")/g) || []).length, 3);
    const posterIndex = methods.indexOf('data-i18n="method1-title"');
    const pickupIndex = methods.indexOf('data-i18n="method-pickup-title"');
    const purchaseIndex = methods.indexOf('data-i18n="method2-title"');
    assert.ok(posterIndex >= 0 && pickupIndex > posterIndex && purchaseIndex > pickupIndex);
    assert.match(methods, /record-pickup-box-transparent-v1\.png/);
    assert.match(app, /7号馆2楼 MEDIA STUDIO 房间前/);
    assert.match(app, /7号館2階 MEDIA STUDIO 部屋前/);
});

test('every translated homepage key has all supported language values', () => {
    const html = read('index.html');
    const dictionary = mergeExtraTranslations(parseTranslations(read('app.js')));
    const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);
    const languages = ['en', 'ja', 'zh', 'zh-TW', 'ko', 'id', 'vi', 'th', 'bn', 'ar', 'fr', 'hi', 'fi'];

    for (const key of keys) {
        assert.ok(dictionary[key], `missing translation key: ${key}`);
        for (const language of languages) {
            assert.equal(typeof dictionary[key][language], 'string', `${key}.${language} must be a string`);
            assert.notEqual(dictionary[key][language].trim(), '', `${key}.${language} must not be empty`);
        }
    }
});

test('homepage exposes a complete custom language menu and simplified participant flow', () => {
    const html = read('index.html');
    const app = read('app.js');
    const expectedOptions = {
        en: '🇬🇧', ja: '🇯🇵', zh: '🇨🇳', 'zh-TW': '🇹🇼', ko: '🇰🇷', id: '🇮🇩',
        vi: '🇻🇳', th: '🇹🇭', bn: '🇧🇩', ar: '🇪🇬', fr: '🇫🇷', hi: '🇮🇳', fi: '🇫🇮'
    };

    assert.match(html, /id="language-menu-trigger"[^>]+aria-haspopup="listbox"[^>]+aria-expanded="false"/);
    assert.match(html, /id="language-menu-list"[^>]+role="listbox"/);
    assert.match(html, /<select[^>]+id="language-select"[^>]+hidden/);
    for (const [language, flag] of Object.entries(expectedOptions)) {
        assert.match(html, new RegExp(`<option value="${language}">`));
        assert.match(html, new RegExp(`data-language-option="${language}"[\\s\\S]*?${flag}`));
    }
    assert.match(app, /case 'ArrowDown':/);
    assert.match(app, /case 'ArrowUp':/);
    assert.match(app, /case 'Home':/);
    assert.match(app, /case 'End':/);
    assert.match(app, /case 'Escape':/);
    assert.match(app, /fi:\s*'fi'/);
    assert.equal((html.match(/class="timeline-item(?:\s|"|$)/g) || []).length, 2);
    assert.match(html, /class="timeline-optional/);
    assert.match(html, /data-i18n="timeline-optional-badge"/);
    assert.doesNotMatch(html, /data-i18n="(?:time|title|text)-step[245]"/);
    assert.doesNotMatch(html, /data-i18n="title-step2"/);
    const timelineStart = html.indexOf('id="timeline"');
    const timelineEnd = html.indexOf('</section>', timelineStart);
    assert.doesNotMatch(html.slice(timelineStart, timelineEnd), /入选|评审|颁奖|審査|表彰|Awards?/i);
});

test('homepage contains safety, advisor, and physical submission guidance', () => {
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
    assert.match(html, /src="\.\/素材\/faculty-zhang-yanfang\.jpg"/);
    assert.match(html, /src="\.\/素材\/faculty-melanie-sarantou\.jpg"/);
    assert.match(html, /data-i18n="advisor-zhang-bio"/);
    assert.match(html, /data-i18n="advisor-sarantou-bio"/);
    assert.match(html, /<a class="advisor-name-link" href="https:\/\/www\.sd\.design\.kyushu-u\.ac\.jp\/faculty\/zhang-yanfang\/"[^>]*data-i18n="advisor-zhang-name"/);
    assert.match(html, /<a class="advisor-name-link" href="https:\/\/www\.sd\.design\.kyushu-u\.ac\.jp\/en\/faculty\/sarantou-melanie\/"[^>]*data-i18n="advisor-sarantou-name"/);
    assert.doesNotMatch(html, /advisor-index|class="advisor-link"|data-i18n="advisor-profile-link"/);
    assert.ok(statSync(resolve(root, '素材/faculty-zhang-yanfang.jpg')).size > 0);
    assert.ok(statSync(resolve(root, '素材/faculty-melanie-sarantou.jpg')).size > 0);
    assert.match(html, /data-i18n="submission-physical-options"/);
});

test('language, submission, and motion foundations are present', () => {
    const app = read('app.js');
    const css = read('styles.css');

    assert.match(app, /'zh-CN'/);
    assert.match(app, /'en'/);
    assert.match(app, /return SUPPORTED_LANGUAGES\.includes\(language\) \? language : 'en'/);
    assert.match(app, /document\.documentElement\.setAttribute\('dir', currentLang === 'ar' \? 'rtl' : 'ltr'\)/);
    assert.doesNotMatch(app, /header-hidden|lastScrollY/);
    assert.doesNotMatch(css, /#main-header\.header-hidden/);
    assert.match(css, /#main-header\.is-over-hero/);
    assert.match(app, /prefers-reduced-motion/);
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    assert.match(css, /submission-cta/);
    assert.match(css, /#poster\s*\{[^}]*overflow-x:\s*clip;/s);
    assert.match(css, /@media\s*\(max-width:\s*480px\)[\s\S]*?\.venue-transit-combined\s*\{[^}]*grid-template-columns:\s*1fr;/);
});

test('new language and advisor surfaces reuse the editorial visual system', () => {
    const html = read('index.html');
    const css = read('styles.css');

    assert.match(css, /\.language-menu-trigger\s*\{[^}]*border-radius:\s*0;/s);
    assert.match(css, /\.language-menu-popover\s*\{[^}]*border-radius:\s*0;[^}]*box-shadow:\s*none;/s);
    assert.doesNotMatch(css, /\.language-menu-option\[aria-selected='true'\]::after/);
    assert.match(css, /\.advisors-container\s*\{[^}]*max-width:\s*900px;/s);
    assert.match(css, /\.advisor-bio\s*\{[^}]*color:\s*var\(--color-text-muted\);[^}]*font-size:\s*0\.9rem;/s);
    assert.match(css, /\.advisor-portrait\s*\{[^}]*border-radius:\s*[^;]*%[^;]*\/[^;]*%[^;]*;[^}]*overflow:\s*hidden;/s);
    assert.match(css, /\.advisor-name-link:hover/);
    assert.match(css, /\.language-current-flag,\s*\.language-option-flag\s*\{[^}]*border-radius:\s*50%;[^}]*overflow:\s*hidden;/s);
});

test('new information sections use spacing and internal separators instead of decorative frames', () => {
    const css = read('styles.css');

    assert.match(css, /\.safety-container\s*\{[^}]*max-width:\s*800px;/s);
    assert.doesNotMatch(css, /\.advisor-list\s*\{[^}]*(?:border-top|border-bottom):/s);
    assert.match(css, /\.advisor-profile \+ \.advisor-profile\s*\{[^}]*border-top:/s);
    assert.doesNotMatch(css, /\.submission-panel\s*\{[^}]*(?:border-top|border-bottom|border-left|border-right):/s);
    assert.doesNotMatch(css, /\.submission-route \+ \.submission-route\s*\{[^}]*(?:border-left|border-right):/s);
    assert.match(css, /\.submission-actions\s*\{[^}]*border-top:/s);
    assert.match(css, /\.pathway-facts > div \+ div\s*\{[^}]*border-left:/s);
    assert.doesNotMatch(css, /\.pathway-selector\s*\{[^}]*(?:border-top|border-bottom|border-left|border-right):/s);
    assert.doesNotMatch(css, /\.safety-mandatory > div\s*\{[^}]*(?:border-left|border-right):/s);
    assert.doesNotMatch(css, /\.submission-route \.submission-requirements\s*\{[^}]*(?:border-left|border-right):/s);
    assert.doesNotMatch(css, /\.timeline-optional-content\s*\{[^}]*(?:border-left|border-right):/s);
});

test('processing safety section links to the multilingual tool reservation page', () => {
    const html = read('index.html');
    const css = read('styles.css');
    const sectionStart = html.indexOf('id="safety"');
    const sectionEnd = html.indexOf('</section>', sectionStart);
    const section = html.slice(sectionStart, sectionEnd);
    const translations = mergeExtraTranslations(parseTranslations(read('app.js')));

    assert.match(section, /class="safety-reservation-link" href="safety-tool-reservation\.html"/);
    assert.match(section, /data-i18n="reservation-entry"/);
    assert.match(section, /<svg[^>]*class="safety-reservation-icon"[^>]*aria-hidden="true"/);
    assert.match(section, /<svg[^>]*class="safety-reservation-arrow"[^>]*aria-hidden="true"/);
    assert.match(css, /\.safety-reservation-link\s*\{[^}]*background:\s*#ffffff;[^}]*color:\s*var\(--color-text-main\);[^}]*font-size:\s*1\.2rem;[^}]*min-height:\s*5rem;[^}]*width:\s*100%;[^}]*max-width:\s*640px;/s);
    for (const language of ['zh', 'zh-TW', 'ja', 'en', 'ko', 'id', 'vi', 'th', 'bn', 'ar', 'fr', 'hi', 'fi']) {
        assert.equal(typeof translations['reservation-entry']?.[language], 'string', `reservation-entry.${language} must exist`);
        assert.notEqual(translations['reservation-entry'][language].trim(), '');
    }
});
