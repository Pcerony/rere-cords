# Language Menu and Advisor Profiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a polished, accessible flag language menu and official portrait-based faculty profiles on the homepage.

**Architecture:** Keep the site dependency-free. HTML defines the listbox and profile content, `app.js` synchronizes language state and keyboard behavior, `styles.css` owns responsive presentation, and the existing translation dictionaries provide all localized copy.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner

---

### Task 1: Define the behavior with static tests

**Files:**
- Modify: `tests/static-site.test.mjs`

- [ ] Add assertions for the custom menu trigger, listbox, 13 flag-bearing options, keyboard event handling, two local portrait paths, biography translation keys, official links, and advisor ordering.
- [ ] Run `node --test tests/static-site.test.mjs` and confirm the new assertions fail because the custom menu and profiles do not exist yet.
- [ ] Commit the red tests as a standalone rollback point.

### Task 2: Add official portrait assets and profile markup

**Files:**
- Create: `素材/faculty-zhang-yanfang.jpg`
- Create: `素材/faculty-melanie-sarantou.jpg`
- Modify: `index.html`
- Modify: `styles.css`

- [ ] Download the portraits from each advisor's official Kyushu University Strategic Design profile.
- [ ] Replace the two text-only advisor entries with responsive profile rows containing local images, translated names, roles and biographies, plus official-profile links.
- [ ] Add stable image dimensions, object-fit rules, separators, focus styles, and mobile stacking without decorative nested cards.

### Task 3: Implement the custom language menu

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`

- [ ] Add the trigger, current-language flag/name, listbox, and one button option per supported language while retaining the hidden synchronized select.
- [ ] Add open/close, selection synchronization, outside click, Escape, Arrow Up/Down, Home, End, and focus-management behavior.
- [ ] Style the trigger for transparent and solid header states and style the menu as a viewport-constrained light surface.

### Task 4: Complete translations without churning existing copy

**Files:**
- Modify: `app.js`
- Modify: `translations.js`
- Modify: `scripts/generate-translations.mjs`

- [ ] Add English, Japanese, Simplified Chinese and Finnish biography/link source strings.
- [ ] Make the generator reuse existing generated strings and request only missing keys.
- [ ] Generate the remaining supported languages and rerun the full static test suite.

### Task 5: Verify and commit

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`
- Modify: `translations.js`
- Modify: `scripts/generate-translations.mjs`
- Modify: `tests/static-site.test.mjs`

- [ ] Run `node --check app.js`, `node --check translations.js`, and `node --test tests/static-site.test.mjs`.
- [ ] Serve the site locally and verify desktop and 320px mobile layouts, menu interaction, no horizontal overflow, no console errors, and successful local portrait loading.
- [ ] Review `git diff --check` and commit only the intended files.
