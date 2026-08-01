# Homepage Flow, Finnish, Submission, and Safety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a four-language homepage with a simplified required participant path, an optional salon, precise submission routes, official faculty advisor information, and prominent PVC processing safety guidance.

**Architecture:** Keep the static HTML/CSS/JavaScript architecture and configuration-driven submission link. Express all visible copy through the existing `data-i18n` dictionary, add semantic HTML sections for safety and advisors, and use static contract tests plus browser inspection to guard behavior and layout.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in test runner, local browser verification.

---

### Task 1: Lock the revised homepage contract

**Files:**
- Modify: `tests/static-site.test.mjs`

- [ ] **Step 1: Write failing tests for Finnish and the revised content**

Extend the translation completeness assertion to `['zh', 'ja', 'en', 'fi']`. Assert that the page contains the `FI` button, `#safety`, `#advisors`, a two-step primary timeline, an optional salon, both official advisor names in the correct order, and physical/digital submission routes. Assert that legacy online evaluation and award keys are absent from homepage markup.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/static-site.test.mjs`

Expected: FAIL because Finnish, safety, advisors, and the revised flow do not exist yet.

- [ ] **Step 3: Commit the failing contract test**

Run:

```bash
git add tests/static-site.test.mjs
git commit -m "test: define multilingual homepage flow"
```

### Task 2: Implement semantic homepage content

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Finnish language entry and metadata**

Add the `FI` language button and Finnish Open Graph locale. Increment static asset query versions when their contents change.

- [ ] **Step 2: Replace the participant timeline**

Use two `.timeline-item` elements with numbered markers. Insert one `.timeline-optional` element between them with an optional badge and no numeric marker. Remove online evaluation, awards, and the 2027 item.

- [ ] **Step 3: Add safety and advisor sections**

Place `#safety` directly after participation requirements and `#advisors` after the timeline. Use semantic headings and concise hazard groups. Keep all visible strings linked to `data-i18n` keys.

- [ ] **Step 4: Rewrite submission markup**

Make the physical and digital requirements explicit in both the requirements summary and reserved submission section. Keep the existing CTA and fallback IDs intact.

### Task 3: Complete four-language copy and language behavior

**Files:**
- Modify: `app.js`

- [ ] **Step 1: Add Finnish to every active translation key**

Provide Finnish for all `data-i18n` keys in `index.html`, including new safety, advisor, optional salon, and submission strings. Remove obsolete online evaluation, award, and 2027 timeline entries.

- [ ] **Step 2: Update participant-facing dates and rules in every language**

Use August 10 through November 10 for rolling distribution, making, and submission; around November 15 for the optional salon; and November 20 through 25 for the exhibition. Remove judging and award language throughout the dictionary.

- [ ] **Step 3: Register the Finnish document language**

Add `fi: 'fi'` to `LANGUAGE_CODES` and retain Japanese as the fallback.

- [ ] **Step 4: Run tests until content contracts pass**

Run: `node --test tests/static-site.test.mjs`

Expected: Content assertions pass; any style-specific assertions may still fail until Task 4.

### Task 4: Style the hierarchy and long Finnish copy

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Style the optional timeline branch**

Add stable dimensions and responsive positioning for `.timeline-optional`, `.timeline-optional-marker`, and `.timeline-optional-badge`. Ensure it remains visually subordinate to numbered required stages.

- [ ] **Step 2: Style safety as a prominent information band**

Create a responsive grid for hazard groups, a clear mandatory-rules block, and strong but palette-consistent contrast. Avoid nested cards and preserve readable line lengths.

- [ ] **Step 3: Style advisor information**

Use an unframed two-column typographic layout that collapses cleanly on narrow screens.

- [ ] **Step 4: Harden language switcher wrapping**

Ensure the four language controls fit without overlap at narrow viewport widths and preserve minimum tap targets.

- [ ] **Step 5: Run the complete static test suite**

Run: `node --test tests/static-site.test.mjs`

Expected: all tests pass.

### Task 5: Verify runtime behavior and visual quality

**Files:**
- Modify if defects are found: `index.html`, `app.js`, `styles.css`, `tests/static-site.test.mjs`

- [ ] **Step 1: Parse-check JavaScript**

Run: `node --check app.js && node --check submission-config.js`

Expected: both commands exit 0 with no output.

- [ ] **Step 2: Start a local server**

Run: `python3 -m http.server 50804`

Expected: the homepage is available at `http://localhost:50804/`.

- [ ] **Step 3: Inspect desktop and mobile layouts**

Check 1440x900 and 390x844. Switch through Chinese, Japanese, English, and Finnish; inspect the timeline, safety, advisors, submission routes, footer, focus states, text wrapping, and horizontal overflow.

- [ ] **Step 4: Fix any observed defects test-first**

For each behavioral defect, add a focused assertion to `tests/static-site.test.mjs`, run it to see the expected failure, apply the minimum production fix, and rerun the suite.

- [ ] **Step 5: Run final verification**

Run:

```bash
node --test tests/static-site.test.mjs
node --check app.js
git diff --check
git status --short
```

Expected: tests pass, JavaScript parses, no whitespace errors are reported, and only intended files plus the untouched `提交文件/` directory appear.

- [ ] **Step 6: Commit the implementation**

Run:

```bash
git add index.html app.js styles.css tests/static-site.test.mjs docs/superpowers/specs/2026-08-01-homepage-flow-finnish-safety-design.md docs/superpowers/plans/2026-08-01-homepage-flow-finnish-safety.md
git commit -m "feat: simplify multilingual participant flow"
```
