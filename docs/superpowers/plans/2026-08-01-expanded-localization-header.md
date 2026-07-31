# Expanded Localization and Persistent Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete thirteen-language dropdown and a persistent header that is transparent over the hero and solid over page content.

**Architecture:** Retain the static site and current translation dictionary. Move non-core language dictionaries into a dedicated `translations.js` payload merged before UI initialization, while keeping English, Japanese, Simplified Chinese, and Finnish compatible with the existing code. Use one native selector and one header-state class.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in tests, browser automation.

---

### Task 1: Define the failing contracts

**Files:**
- Modify: `tests/static-site.test.mjs`

- [ ] Assert all active keys provide `en`, `ja`, `zh`, `zh-TW`, `ko`, `id`, `vi`, `th`, `bn`, `ar`, `fr`, `hi`, and `fi`.
- [ ] Assert the native selector contains all language options and the old language-button markup is absent.
- [ ] Assert English is the fallback, Arabic activates RTL, and hidden-header logic is absent.
- [ ] Run `node --test tests/static-site.test.mjs` and confirm failure for the missing feature.

### Task 2: Implement language data and behavior

**Files:**
- Create: `translations.js`
- Modify: `app.js`
- Modify: `index.html`

- [ ] Add complete dictionaries for Traditional Chinese, Korean, Indonesian, Vietnamese, Thai, Bengali, Arabic, French, and Hindi.
- [ ] Merge the extra dictionaries into the existing dictionary before language initialization.
- [ ] Replace buttons with a labeled native selector and bind its change event.
- [ ] Use English as the fallback and set both `lang` and `dir` on the root element.
- [ ] Run the static tests and confirm the localization contracts pass.

### Task 3: Implement the persistent adaptive header

**Files:**
- Modify: `app.js`
- Modify: `index.html`
- Modify: `styles.css`

- [ ] Give the initial header an over-hero class and remove all hide-on-scroll behavior.
- [ ] Toggle only the over-hero class based on the hero boundary using a frame scheduler.
- [ ] Style the over-hero logo and selector in light colors with no filled header background.
- [ ] Keep the solid paper header visible after the hero and ensure mobile sizing does not overflow.

### Task 4: Verify and commit

**Files:**
- Modify if defects are found: `index.html`, `app.js`, `translations.js`, `styles.css`, `tests/static-site.test.mjs`

- [ ] Run `node --test tests/static-site.test.mjs`, `node --check app.js`, `node --check translations.js`, and `git diff --check`.
- [ ] Check desktop and mobile rendering, all language selections, Arabic RTL, header states, horizontal overflow, broken images, and console errors.
- [ ] Commit only intended project files and leave `.superpowers/` and `提交文件/` untouched.

