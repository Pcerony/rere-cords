# Submission Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 RERE-CORDS 静态主页已确认的网页问题，改善前端质量与滚动性能，并预留一个默认关闭、未来可指向 Google Apps Script 的“提交作品”入口。

**Architecture:** 继续使用现有的单页 HTML、CSS 和原生 JavaScript，不引入构建工具或服务器。用独立的 `submission-config.js` 保存不含凭据的外部表单配置，由 `app.js` 负责校验配置和更新主页入口；未来接收端由外部 Apps Script 页面独立负责。

**Tech Stack:** HTML5, CSS3, 原生 JavaScript, Node.js 内置 `node:test`, Playwright CLI。

---

## 文件边界

- Create: `submission-config.js` - 只保存提交入口的安全默认配置，不放任何凭据。
- Modify: `index.html` - 增加提交入口、调整脚本加载顺序、修正 Logo 语义、移除未使用的 Lucide 依赖。
- Modify: `app.js` - 补齐翻译、修正语言属性、实现提交入口状态、优化滚动调度和 reduced-motion 行为。
- Modify: `styles.css` - 增加提交入口样式、响应式规则和 reduced-motion 覆盖，并删除确认未使用的旧导航/按钮样式。
- Create: `docs/submission-integration.md` - 运营方未来接入 Apps Script、Drive 和 Sheets 的内部说明，不写入测试地址或未确定的参与规则。
- Create: `tests/static-site.test.mjs` - 使用 Node 内置测试模块验证静态结构、配置默认值、翻译完整性和关键无障碍回归。

### Task 1: 先建立静态回归检查

**Files:**
- Create: `tests/static-site.test.mjs`

- [ ] **Step 1: 写入会失败的测试**

```js
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

    assert.deepEqual(context.window.RERE_CORDS_SUBMISSION_CONFIG, {
        enabled: false,
        formUrl: '',
        fallbackDocumentUrl: ''
    });
});

test('homepage contains one disabled submission entry before the venue', () => {
    const html = read('index.html');
    const submissionIndex = html.indexOf('id="submission"');
    const venueIndex = html.indexOf('id="venue"');

    assert.ok(submissionIndex >= 0, 'homepage must contain #submission');
    assert.ok(venueIndex > submissionIndex, '#submission must appear before #venue');
    assert.match(html, /id="submission-cta"/);
    assert.match(html, /id="submission-fallback"/);
    assert.match(html, /submission-config\.js[^"]*<\/script>[\s\S]*app\.js\?v=14/);
    assert.doesNotMatch(html, /unpkg\.com\/lucide|lucide\.createIcons/);
    assert.match(html, /logo-dark\.png" alt="SoDesLab"/);
    assert.match(html, /logo1\.png" alt="SoDesLab"/);
});

test('every translated homepage key has zh, ja, and en values', () => {
    const html = read('index.html');
    const dictionary = parseTranslations(read('app.js'));
    const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((match) => match[1]);

    for (const key of keys) {
        assert.ok(dictionary[key], `missing translation key: ${key}`);
        for (const language of ['zh', 'ja', 'en']) {
            assert.equal(typeof dictionary[key][language], 'string', `${key}.${language} must be a string`);
        }
    }
});

test('language, timeline, and motion fixes are present', () => {
    const app = read('app.js');
    const css = read('styles.css');

    assert.match(app, /"time-step2"\s*:\s*\{/);
    assert.match(app, /'zh-CN'/);
    assert.match(app, /'en'/);
    assert.match(app, /prefers-reduced-motion/);
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    assert.match(css, /submission-cta/);
});

```

- [ ] **Step 2: 运行测试，确认它们先按预期失败**

Run from the repository root:

```bash
node --test tests/static-site.test.mjs
```

Expected result before production changes: FAIL because `submission-config.js`, `#submission`, the `time-step2` translation, the language mapping, and the reduced-motion rules do not yet exist in the current tree. The failure is the regression signal for the following tasks.

- [ ] **Step 3: 提交测试基线**

```bash
git add tests/static-site.test.mjs
git commit -m "test: cover static submission entry boundary"
```

### Task 2: 增加安全配置并把入口放进主页

**Files:**
- Create: `submission-config.js`
- Modify: `index.html:78-86, 125-137, 432-449, 507-534`

- [ ] **Step 1: 创建默认关闭的配置文件**

Create `submission-config.js` with exactly this public shape:

```js
window.RERE_CORDS_SUBMISSION_CONFIG = {
    enabled: false,
    formUrl: '',
    fallbackDocumentUrl: ''
};
```

The file must contain no Drive ID, Sheet ID, token, email credential, or environment-specific URL.

- [ ] **Step 2: 调整主页脚本依赖**

In `index.html`:

1. Remove the Lucide CDN `<script>` and the inline `lucide.createIcons()` block because the page contains no `data-lucide` icons or other Lucide usage.
2. Add `<script src="submission-config.js?v=1"></script>` immediately before `<script src="app.js?v=14"></script>`.
3. Change the existing stylesheet cache key to `styles.css?v=14` and the app script cache key to `app.js?v=14`.

- [ ] **Step 3: 修正 Logo 的语义名称**

Change both `素材/logo-dark.png` and `素材/logo1.png` image alternatives from `Kyushu University` to `SoDesLab`, and rename their presentational class from `logo-kyushu` to `logo-sodeslab`. Keep `logo3.png` as `DESIS-Q Societal Design Lab` and `logo2.png` as `AiGoki`. Update the same class name in `styles.css` so the visual dimensions remain unchanged.

- [ ] **Step 4: 插入主页提交入口**

Insert the following section between the closing `</section>` for `#apply` and the opening `<!-- Venue Section -->` comment:

```html
<!-- Final Submission Section -->
<section id="submission">
    <div class="section-container">
        <div class="section-header reveal-on-scroll">
            <h2 class="section-title" data-i18n="title-submission">提交作品</h2>
            <p class="section-lead" data-i18n="lead-submission">最终作品提交入口正在准备中；当前报名阶段仍请按照现有报名方法操作。</p>
        </div>

        <div class="submission-panel reveal-on-scroll">
            <div class="submission-routes">
                <div class="submission-route">
                    <span class="submission-route-index">01</span>
                    <div>
                        <h3 data-i18n="submission-digital-title">数字、图片或数据作品</h3>
                        <p data-i18n="submission-digital-text">此类作品后续将通过线上入口提交必要材料，具体安排将在开放前公布。</p>
                    </div>
                </div>
                <div class="submission-route">
                    <span class="submission-route-index">02</span>
                    <div>
                        <h3 data-i18n="submission-physical-title">实物作品</h3>
                        <p data-i18n="submission-physical-text">实物作品后续以线下交付为主，参与表的线上或纸质方式将在开放前说明。</p>
                    </div>
                </div>
            </div>

            <div class="submission-actions">
                <div class="submission-status">
                    <span class="submission-status-label" data-i18n="submission-status-label">状态</span>
                    <span class="submission-status-value" data-i18n="submission-status">提交通道即将开放</span>
                </div>
                <div class="submission-links">
                    <a id="submission-cta" class="submission-cta is-disabled" data-i18n="submission-cta" aria-disabled="true" tabindex="-1">提交入口尚未开放</a>
                    <a id="submission-fallback" class="submission-fallback" data-i18n="submission-fallback" hidden>下载备用参与表</a>
                </div>
            </div>
        </div>
    </div>
</section>
```

The disabled CTA has no `href`, so it cannot navigate or submit anything before configuration is enabled. The fallback link is hidden by both the `hidden` attribute and JavaScript until a valid URL is configured.

- [ ] **Step 5: 运行静态测试，确认结构相关失败减少**

```bash
node --test tests/static-site.test.mjs
```

Expected result: the config and homepage structure assertions pass; translation, language, and reduced-motion assertions remain failing until Task 3 and Task 4 are complete.

### Task 3: 完成翻译系统和提交入口状态逻辑

**Files:**
- Modify: `app.js:1-10, 207-236, 452-500, 503-531`

- [ ] **Step 1: 补齐入口和时间线第二步的三语字典**

Add these entries to `i18nDict` near the existing `apply` and timeline entries:

```js
"title-submission": {
    "zh": "提交作品",
    "ja": "作品提出",
    "en": "Submit Your Work"
},
"lead-submission": {
    "zh": "最终作品提交入口正在准备中；当前报名阶段仍请按照现有报名方法操作。",
    "ja": "最終作品の提出窓口を準備中です。応募段階では、これまでの応募方法をご利用ください。",
    "en": "The final submission portal is being prepared. For the application stage, please continue using the current application process."
},
"submission-digital-title": {
    "zh": "数字、图片或数据作品",
    "ja": "画像・データ作品",
    "en": "Image or Data-Based Work"
},
"submission-digital-text": {
    "zh": "此类作品后续将通过线上入口提交必要材料，具体安排将在开放前公布。",
    "ja": "この形式の作品は、今後オンライン窓口から必要な資料を提出する予定です。詳細は公開前にご案内します。",
    "en": "This type of work will use the online portal for the required materials. Details will be announced before the portal opens."
},
"submission-physical-title": {
    "zh": "实物作品",
    "ja": "実物作品",
    "en": "Physical Work"
},
"submission-physical-text": {
    "zh": "实物作品后续以线下交付为主，参与表的线上或纸质方式将在开放前说明。",
    "ja": "実物作品は今後、原則として対面で提出します。参加票のオンライン提出または紙提出については、公開前にご案内します。",
    "en": "Physical work will primarily be delivered offline. The online or paper route for the participation form will be explained before the portal opens."
},
"submission-status-label": {
    "zh": "状态",
    "ja": "ステータス",
    "en": "Status"
},
"submission-status": {
    "zh": "提交通道即将开放",
    "ja": "提出窓口は準備中です",
    "en": "Submission portal coming soon"
},
"submission-cta": {
    "zh": "提交入口尚未开放",
    "ja": "提出入口はまだ開いていません",
    "en": "Submission portal is not open yet"
},
"submission-fallback": {
    "zh": "下载备用参与表",
    "ja": "予備の参加票をダウンロード",
    "en": "Download fallback form"
},
"time-step2": {
    "zh": "2026年11月1日 - 11月10日",
    "ja": "11月1日 - 11月10日",
    "en": "November 1 - November 10, 2026"
}
```

- [ ] **Step 2: 规范语言值并修正根节点 `lang`**

Replace the current local-storage initialization and `updateLanguage` header with this logic:

```js
const LANGUAGE_CODES = {
    zh: 'zh-CN',
    ja: 'ja',
    en: 'en'
};
const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_CODES);

function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : 'ja';
}

let currentLang = normalizeLanguage(localStorage.getItem('rere_cords_lang'));

function updateLanguage(language) {
    currentLang = normalizeLanguage(language);
    localStorage.setItem('rere_cords_lang', currentLang);
    document.documentElement.setAttribute('lang', LANGUAGE_CODES[currentLang]);
```

Keep the existing controlled `innerHTML` translation behavior for dictionary values that intentionally contain `<strong>`, `<span>`, or email links, and use `currentLang` for all subsequent lookups. The language button click handler must pass its `data-lang-btn` value through `normalizeLanguage` via `updateLanguage`.

- [ ] **Step 3: 实现外部地址校验和提交入口初始化**

Add the following functions before the language button binding:

```js
function isValidExternalUrl(value) {
    if (typeof value !== 'string' || value.trim() === '') return false;

    try {
        const url = new URL(value.trim());
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function initSubmissionEntry() {
    const cta = document.getElementById('submission-cta');
    const fallback = document.getElementById('submission-fallback');
    if (!cta) return;

    const config = window.RERE_CORDS_SUBMISSION_CONFIG || {};
    const formUrl = isValidExternalUrl(config.formUrl) ? config.formUrl.trim() : '';
    const fallbackUrl = isValidExternalUrl(config.fallbackDocumentUrl)
        ? config.fallbackDocumentUrl.trim()
        : '';
    const enabled = config.enabled === true && formUrl !== '';

    cta.classList.toggle('is-disabled', !enabled);
    cta.setAttribute('aria-disabled', String(!enabled));

    if (enabled) {
        cta.href = formUrl;
        cta.target = '_blank';
        cta.rel = 'noopener';
        cta.removeAttribute('tabindex');
    } else {
        cta.removeAttribute('href');
        cta.removeAttribute('target');
        cta.removeAttribute('rel');
        cta.setAttribute('tabindex', '-1');
    }

    if (fallback) {
        fallback.hidden = fallbackUrl === '';
        if (fallbackUrl !== '') {
            fallback.href = fallbackUrl;
            fallback.target = '_blank';
            fallback.rel = 'noopener';
        } else {
            fallback.removeAttribute('href');
            fallback.removeAttribute('target');
            fallback.removeAttribute('rel');
        }
    }

    cta.addEventListener('click', (event) => {
        if (cta.getAttribute('aria-disabled') === 'true') event.preventDefault();
    });
}
```

Call `initSubmissionEntry()` immediately after the initial `updateLanguage(currentLang)` call. With the default config, no fetch, iframe, or form request is created.

- [ ] **Step 4: 运行 Node 测试**

```bash
node --test tests/static-site.test.mjs
```

Expected result: all static assertions pass, including the three-language check and `time-step2` coverage.

### Task 4: 优化滚动、动效和现有交互

**Files:**
- Modify: `app.js:1-10, 520-660`
- Modify: `styles.css:40-75, 813-902, end of file`

- [ ] **Step 1: 添加统一的 `requestAnimationFrame` 调度器**

Add this helper inside the DOM-ready callback before the scroll behaviors:

```js
function createFrameScheduler(callback) {
    let framePending = false;

    return () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(() => {
            framePending = false;
            callback();
        });
    };
}
```

Use a scheduled handler for both the header scroll behavior and the poster scroll/resize behavior. Keep `{ passive: true }` on every scroll listener. The callbacks may read layout once per animation frame, but must not register a new listener during scrolling.

- [ ] **Step 2: 让 reduced motion 在 JS 和 CSS 两侧都生效**

In `app.js`, define:

```js
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
```

When the query matches, immediately add `.visible` to every reveal item and skip creating the `IntersectionObserver`. When the query matches inside `initPosterScrollAnimation`, set no scroll/resize listeners and leave the poster in its static CSS state. If `IntersectionObserver` is unavailable, add `.visible` to all reveal items instead of leaving content hidden.

At the end of `styles.css`, add:

```css
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    .reveal-on-scroll,
    .reveal-on-scroll.visible,
    .timeline-item,
    .timeline-item.visible {
        opacity: 1;
        transform: none;
        transition: none;
    }

    .poster-frame,
    .poster-img,
    .poster-vinyl,
    .lightbox-modal,
    .lightbox-content {
        transition: none;
    }

    .poster-vinyl {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
    }

    .poster-interactive-wrapper:hover .poster-frame,
    .poster-interactive-wrapper:hover .poster-vinyl {
        transform: none;
    }
}
```

- [ ] **Step 3: 保持灯箱交互可用并减少重复查询**

Cache the existing poster/lightbox nodes once inside `initPosterLightbox`, keep Escape and backdrop closing, and ensure the lightbox state still toggles `aria-hidden` and body overflow exactly as before. Do not change the current poster source or add a new image dependency.

- [ ] **Step 4: 运行语法检查和静态测试**

```bash
node --check app.js
node --check submission-config.js
node --test tests/static-site.test.mjs
```

Expected result: all commands exit with code 0.

### Task 5: 完成提交入口样式并清理死代码

**Files:**
- Modify: `styles.css:125-245, 420-435, 975-1014, 1408-1445, 1589-1601, end of file`

- [ ] **Step 1: 添加入口的桌面和移动样式**

Add a section block after the existing apply styles:

```css
/* --------------------------------------------------------------------------
   7.6 Final Submission Entry
   -------------------------------------------------------------------------- */
#submission {
    background-color: #ffffff;
}

.submission-panel {
    border-top: 1px solid var(--color-border-dark);
    border-bottom: 1px solid var(--color-border);
}

.submission-routes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.submission-route {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1.25rem;
    padding: 2rem 2.25rem;
}

.submission-route + .submission-route {
    border-left: 1px solid var(--color-border);
}

.submission-route-index {
    color: var(--color-secondary);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    padding-top: 0.25rem;
}

.submission-route h3 {
    color: var(--color-text-main);
    font-family: var(--font-header);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.65rem;
}

.submission-route p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    line-height: 1.7;
}

.submission-actions {
    align-items: center;
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    padding: 1.25rem 2.25rem;
}

.submission-status {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.submission-status-label {
    color: var(--color-text-muted);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.submission-status-value {
    color: var(--color-secondary);
    font-family: var(--font-header);
    font-size: 1.05rem;
}

.submission-links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: flex-end;
}

.submission-cta,
.submission-fallback {
    border-bottom: 1px solid currentColor;
    color: var(--color-secondary);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.9rem;
    line-height: 1.4;
    padding-bottom: 0.15rem;
    text-decoration: none;
}

.submission-cta.is-disabled {
    color: var(--color-text-muted);
    cursor: not-allowed;
    opacity: 0.65;
}

.submission-cta:not(.is-disabled):hover,
.submission-fallback:hover {
    color: var(--color-text-main);
}

.submission-cta:focus-visible,
.submission-fallback:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: 4px;
}

@media (max-width: 768px) {
    .submission-routes {
        grid-template-columns: 1fr;
    }

    .submission-route {
        padding: 1.5rem;
    }

    .submission-route + .submission-route {
        border-left: 0;
        border-top: 1px solid var(--color-border);
    }

    .submission-actions {
        align-items: flex-start;
        flex-direction: column;
        padding: 1.25rem 1.5rem;
    }

    .submission-links {
        justify-content: flex-start;
    }
}
```

- [ ] **Step 2: 删除确认未使用的旧 CSS 和外部图标依赖残留**

After confirming with `rg` that these selectors do not occur in `index.html`, remove their complete CSS blocks and their mobile overrides: `.partner-logos`, `.header-partner-logo`, `#nav-menu`, `.nav-link`, `.mobile-nav-toggle`, `.btn`, `.btn-primary`, `.concept-item`, and `.concept-meta`. Keep all classes used by the actual page, including `.hero-partner-logos`, `.record-methods`, `.apply-grid`, `.venue-grid`, and `.footer-partner-logos`.

- [ ] **Step 3: 更新 CSS 中 Logo 类名并检查差异**

Replace `.logo-kyushu` with `.logo-sodeslab` in every selector, then run:

```bash
rg -n "logo-kyushu|logo-sodeslab|partner-logos|header-partner-logo|nav-menu|mobile-nav-toggle|lucide" index.html app.js styles.css
git diff --check
```

Expected result: `logo-sodeslab` appears in the intended Logo rules, old unused selectors and Lucide references do not appear in the active page files, and `git diff --check` is clean.

### Task 6: 写入后续接入说明

**Files:**
- Create: `docs/submission-integration.md`

- [ ] **Step 1: 写入不含真实地址的运营方说明**

Create the document with these concrete sections:

```markdown
# RERE-CORDS 提交入口接入说明

## 当前状态

主页入口默认关闭。`submission-config.js` 中的 `enabled` 必须保持为 `false`，直到外部接收页面完成测试。

## 配置合同

```js
window.RERE_CORDS_SUBMISSION_CONFIG = {
    enabled: false,
    formUrl: '',
    fallbackDocumentUrl: ''
};
```

`formUrl` 用于未来的 Apps Script Web App 或其他外部接收页面；`fallbackDocumentUrl` 用于未来的纸质参与表或备用说明文档。两个地址都只能使用 `http` 或 `https`，不能写入令牌或 Drive 权限信息。

## 正式开放前的顺序

1. 创建专用 Drive 文件夹和结果 Sheets，并记录运营方可识别的名称。
2. 部署 Apps Script Web App，确认访问权限、表单校验、文件归档和 Sheets 记录都能完成一条测试提交。
3. 在独立测试副本中填入测试地址，将 `enabled` 改为 `true`，确认主页按钮能打开接收页面。
4. 确认测试数据和测试文件已删除或标记为测试后，再把同一配置更新到正式站点。
5. 若接收端出现异常，立即将 `enabled` 改回 `false`；主页会恢复为不可提交状态。

## 责任边界

静态主页不直接访问 Drive 或 Sheets，也不保存 Google 凭据。参与表字段、文件格式、容量、数量、截止时间和审核流程必须在后续需求确认后，分别写入接收端说明和参与者页面。

## 官方参考

- [Apps Script Web Apps](https://developers.google.com/apps-script/guides/web)
- [HTML Service communication](https://developers.google.com/apps-script/guides/html/communication)
```

- [ ] **Step 2: 检查内部文档没有虚假配置**

```bash
rg -n "localhost|script.google.com|drive.google.com|AIza|token|secret" docs/submission-integration.md submission-config.js
```

Expected result: no test URL or credential is present.

### Task 7: 浏览器验证和最终清理

**Files:**
- Modify: `index.html`
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `submission-config.js`
- Modify: `docs/submission-integration.md`
- Test: `tests/static-site.test.mjs`

- [ ] **Step 1: 运行完整静态检查**

```bash
node --check app.js
node --check submission-config.js
node --test tests/static-site.test.mjs
git diff --check
```

Expected result: all commands pass with exit code 0.

- [ ] **Step 2: 启动静态服务器并进行桌面/移动浏览器检查**

Use a local server on an available port:

```bash
python3 -m http.server 4173
```

With Playwright, inspect `http://127.0.0.1:4173/` at desktop `1440x1000` and mobile `390x844`. Verify:

1. `#submission` appears between `#apply` and `#venue`.
2. The default CTA has no `href`, `aria-disabled="true"`, and does not navigate when clicked.
3. `#submission-fallback` is hidden.
4. Chinese, Japanese, and English switches update the new section, `time-step2`, and `document.documentElement.lang` to `zh-CN`, `ja`, and `en`.
5. `prefers-reduced-motion: reduce` makes reveal content immediately visible and does not leave the poster animation listening to scroll.
6. No horizontal overflow, overlap, clipped CTA text, or missing local image appears at either viewport.
7. Poster lightbox still opens, closes by backdrop and Escape, and restores body scrolling.

- [ ] **Step 3: 检查工作区并清理本次设计预览临时资源**

Stop the brainstorming companion server and remove only the generated session directory `.superpowers/brainstorm/42536-1785475916/`. Do not touch the user-owned untracked directory `提交文件/`. Then run:

```bash
git status --short
git diff --stat
```

Expected result: only the planned source, test, and documentation files are changed or committed; `提交文件/` remains unmodified and untracked.

- [ ] **Step 4: 提交可运行实现**

```bash
git add index.html app.js styles.css submission-config.js docs/submission-integration.md tests/static-site.test.mjs
git commit -m "feat: reserve final submission entry"
```

The commit must not include `提交文件/` or the `.superpowers` preview artifacts.
