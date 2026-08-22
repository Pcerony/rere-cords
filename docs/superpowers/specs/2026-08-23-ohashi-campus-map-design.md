# Ohashi Campus Poster Map Design

## Goal

Make the RERE-CORDS poster and record pickup map visually consistent with the homepage and spatially faithful to the Kyushu University Ohashi Campus layout, while keeping the existing six location entries and the interactive 3D presentation.

## Product Decisions

- Use the official Ohashi campus plan in `../../../../references/kyushu_univ_ohashi_campus_map.png` and `../../../../references/ohashi_campus_map_handbook.png` as spatial references.
- Use a 2.5D scene: the site plan is the ground truth, buildings are lightweight extrusions, and landmarks are shallow 3D geometry.
- Keep the six existing poster/pickup locations and their translated descriptions unchanged.
- Anchor each marker to a site-plan building or entrance rather than maintaining independent arbitrary world coordinates.
- Keep the map discoverable from the record-pickup section, but remove the heavy nested-card treatment. The map becomes an editorial tool band with a quiet header, one framed viewport, a compact legend/control rail, a location index, and one selected-location detail block.
- The initial camera is a slightly elevated campus overview. Users can orbit and zoom, select a location from the map or index, focus the scene, and reset to overview.

## Spatial Model

Create a dedicated `campus-map-data.js` file that exposes `window.RERE_CORDS_CAMPUS_MAP` with:

- a normalized campus boundary and reference orientation;
- ground layers for site surface, paths, lawns, the sports field, and water features;
- simplified building footprints and heights for the major numbered buildings, library, gym, and central facilities;
- tree groups and circular landmark geometry;
- marker anchors containing `locationKey`, `buildingId`, and local `offset` values;
- overview and per-location camera targets.

The renderer consumes this data and does not contain a second set of hard-coded layout coordinates. Building height is only a visual cue; plan position and footprint take priority over architectural accuracy.

## Interaction And Accessibility

- Keep location buttons as real buttons with visible active state and keyboard focus.
- Preserve the existing language update hook and all location translations.
- Use an accessible map label and a concise visible legend; use `title`/`aria-label` for icon-only controls.
- Respect reduced motion by disabling camera interpolation and pin bobbing when the media query is active.
- On narrow screens, stack the viewport, location index, and detail block without horizontal overflow.

## Verification

- Static tests confirm the data file is loaded, required campus landmarks and six marker anchors exist, stale arbitrary pin coordinates are removed, and the map markup uses the new editorial structure.
- Run the full Node test suite and JavaScript syntax checks.
- Use the local browser at desktop and mobile widths to verify the official plan relationship, circular lawn, fountain, tree groups, marker alignment, reset/focus interactions, language updates, and absence of runtime errors.
