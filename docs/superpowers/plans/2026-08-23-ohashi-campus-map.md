# Ohashi Campus Poster Map Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the campus map as an accurate 2.5D site-plan scene with correctly anchored poster locations and a restrained editorial UI.

**Architecture:** Keep the existing static homepage and global Three.js runtime. Move campus geometry and marker anchors into `campus-map-data.js`, keep location copy in `app.js`, and let one renderer read the data file for all scene positions. Replace the current map card stack with a viewport, compact controls, location index, and detail surface that reuses the existing translation hook.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Three.js r128, Node built-in test runner, local static server.

---

### Task 1: Lock the map contract with failing tests

**Files:**
- Create: `tests/campus-map.test.mjs`
- Modify: none

- [ ] **Step 1: Write the failing static contract tests**

Add tests that read `index.html`, `app.js`, `styles.css`, and `campus-map-data.js` and assert:

```js
test('homepage loads the dedicated campus layout data before app logic', () => {
    const html = read('index.html');
    assert.match(html, /campus-map-data\.js\?v=1"><\/script>\s*<script src="submission-config\.js/);
});

test('campus layout contains the official spatial landmarks and six anchored locations', () => {
    const data = read('campus-map-data.js');
    for (const landmark of ['central-lawn', 'fountain-court', 'sports-field', 'tree-groups']) {
        assert.match(data, new RegExp(`id: ['"]${landmark}['"]`));
    }
    for (const location of ['bldg-1', 'bldg-2', 'bldg-5', 'bldg-7-1f', 'library', 'bldg-7-hub']) {
        assert.match(data, new RegExp(`locationKey: ['"]${location}['"]`));
    }
});

test('map renderer consumes layout anchors instead of arbitrary location coordinates', () => {
    const app = read('app.js');
    assert.match(app, /RERE_CORDS_CAMPUS_MAP/);
    assert.match(app, /createCampusLayout/);
    assert.doesNotMatch(app, /createPin3D\([\s\S]*?-36, 16\.5, 8/);
});

test('map markup uses the editorial viewport and location index structure', () => {
    const html = read('index.html');
    assert.match(html, /class="campus-map-tool"/);
    assert.match(html, /id="map-location-index"/);
    assert.match(html, /aria-label="Campus map"/);
    assert.doesNotMatch(html, /class="map-detail-panel"/);
});
```

- [ ] **Step 2: Run the new tests and confirm they fail for the missing contract**

Run: `node --test tests/campus-map.test.mjs`

Expected: FAIL because `campus-map-data.js`, the new map structure, and the renderer contract do not exist yet.

### Task 2: Add the official-plan layout data

**Files:**
- Create: `campus-map-data.js`
- Modify: `index.html:770-773`
- Test: `tests/campus-map.test.mjs`

- [ ] **Step 1: Define one normalized campus coordinate system**

Expose `window.RERE_CORDS_CAMPUS_MAP` with `bounds`, `ground`, `buildings`, `landmarks`, `trees`, `markers`, and `views`. Keep the map's north/entry relationship consistent with the supplied official plan. Use polygon point arrays for irregular footprints and rectangle helpers only for simple masses.

- [ ] **Step 2: Encode the visible spatial landmarks**

Include the large western sports field, the central courtyard, the circular lawn, the fountain court, the main paths, and the tree groups. Include the major building footprints needed to make buildings 1, 2, 5, 7, 8, the library, gym, administration/workshop, and adjacent masses read in the correct relationship.

- [ ] **Step 3: Encode marker anchors separately from location copy**

Each marker entry must have the shape:

```js
{
    locationKey: 'bldg-7-hub',
    buildingId: 'bldg-7',
    offset: { x: 0.32, z: 0.45 },
    floor: 2,
    tone: 'hub'
}
```

Use the building footprint plus the local offset to compute the marker's world position. The six entries must correspond to the existing location keys and no new location copy is introduced.

- [ ] **Step 4: Load the data file before the application**

Add `<script src="campus-map-data.js?v=1"></script>` immediately before `submission-config.js` in `index.html`.

- [ ] **Step 5: Run the static contract tests**

Run: `node --test tests/campus-map.test.mjs`

Expected: the data and markup-loading assertions pass; renderer assertions remain red until Task 3.

### Task 3: Rebuild the 2.5D Three.js scene from the plan

**Files:**
- Modify: `app.js:1473-2047`
- Test: `tests/campus-map.test.mjs`

- [ ] **Step 1: Replace hard-coded scene coordinates with layout helpers**

Implement small renderer-local helpers named `createCampusLayout`, `createPlanShape`, `createExtrudedBuilding`, `createTreeGroup`, `createLandmark`, and `createAnchoredMarker`. Each helper receives layout data and returns a Three.js object; no building or marker call contains a second hand-authored campus coordinate set.

- [ ] **Step 2: Render the plan layers in a readable order**

Render the site surface first, then paths/green zones/field, then landmarks and tree groups, then buildings and marker pins. Keep the white-model palette but introduce restrained sage green for lawn, muted blue-grey for water, warm grey for paths, and a terracotta accent for the exhibition venue. Use low-poly or shallow extrusions rather than large opaque boxes.

- [ ] **Step 3: Anchor markers to building footprints**

Resolve each `RERE_CORDS_CAMPUS_MAP.markers` entry through its `buildingId`, calculate its footprint center plus local offset, and place a compact vertical marker on the plan. The marker should have a ground shadow and a readable tone but no large free-floating vinyl discs that obscure the model.

- [ ] **Step 4: Preserve focus, reset, and language behavior**

Keep `focusLocation`, `updateMapDetailPanel`, `window.updateMapLanguageDetails`, the location buttons, and raycast selection. Derive camera targets from `views` and use the reduced-motion media query to disable interpolation and pin bobbing when required.

- [ ] **Step 5: Run syntax and contract verification**

Run:

```bash
node --check app.js
node --check campus-map-data.js
node --test tests/campus-map.test.mjs
```

Expected: all commands exit 0 and the map renderer assertions pass.

### Task 4: Rework the map UI to match the editorial site

**Files:**
- Modify: `index.html:304-381`
- Modify: `styles.css:2617-3040`
- Test: `tests/campus-map.test.mjs`

- [ ] **Step 1: Replace nested card markup with one framed map tool**

Use a `.campus-map-tool` containing `.campus-map-stage`, a compact `.map-toolbar`, `.map-location-index`, and `.map-detail-surface`. Keep the existing translated headings and detail IDs so language switching remains backward compatible.

- [ ] **Step 2: Apply the existing editorial tokens**

Remove the heavy pill-card treatment, oversized badges, emoji hints, and stacked bordered panels. Use the existing `--color-bg-base`, `--color-text-main`, `--color-text-muted`, `--color-border`, `--color-primary`, and `--color-secondary` tokens. Keep controls rectangular, quiet, and icon-led where the action is familiar.

- [ ] **Step 3: Make desktop and mobile layouts stable**

On desktop, use a wide stage with the location index and detail surface below it. On narrow screens, stack the stage, horizontally scroll the index, and keep the detail surface below without forcing page-wide overflow. Keep the viewport height stable at each breakpoint.

- [ ] **Step 4: Run the full static suite**

Run: `npm test`

Expected: all existing homepage tests and the new campus map tests pass.

### Task 5: Browser verification and visual calibration

**Files:**
- Modify: `output/playwright/` only for accepted screenshots
- Modify: `app.js`, `campus-map-data.js`, or `styles.css` if visual verification finds a real defect

- [ ] **Step 1: Start or reuse the local static server**

Run: `node scripts/static-server.mjs` from `01_Website` and open `http://127.0.0.1:4173/`.

- [ ] **Step 2: Verify the overview at desktop size**

Check that the sports field, central circular lawn, fountain court, tree groups, and building masses are visibly in the same relationship as the official campus map. Capture `output/playwright/campus-map-desktop.png`.

- [ ] **Step 3: Verify interaction and language updates**

Click all six location buttons, reset the view, click a visible marker, switch language, and confirm the detail surface updates without console errors.

- [ ] **Step 4: Verify the mobile layout**

Set a narrow viewport, check no horizontal overflow, confirm the stage remains usable, and capture `output/playwright/campus-map-mobile.png`.

- [ ] **Step 5: Run the final verification commands**

Run:

```bash
npm test
node --check app.js
node --check campus-map-data.js
```

Expected: all tests pass, both syntax checks exit 0, and browser logs contain no map runtime errors.
