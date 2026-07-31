# Digital Submission Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build a local end-to-end prototype that receives digital-work information and files, issues a receipt, and exposes an organizer confirmation view.

**Architecture:** A dependency-light Node.js server uses Busboy for streaming multipart parsing and the filesystem for prototype persistence. Two standalone static pages consume a small JSON API, leaving the existing public email submission route untouched.

**Tech Stack:** Node.js 20+, Busboy, native `node:test`, HTML, CSS, browser JavaScript

---

### Task 1: Define the upload API contract

**Files:**
- Create: `package.json`
- Create: `tests/submission-prototype.test.mjs`

- [x] Write tests that import `createSubmissionServer`, start it on an ephemeral localhost port with a temporary data directory, and submit native `FormData` containing required fields and a PNG fixture blob.
- [x] Assert `POST /api/submissions` returns HTTP 201, a receipt ID, normalized fields, file size, MIME type, and SHA-256 digest.
- [x] Assert the manifest and uploaded bytes exist below the temporary data directory.
- [x] Add rejection tests for missing required fields, no files, unsupported media, more than eight files, and traversal-like filenames.
- [x] Add read tests for `GET /api/submissions`, `GET /api/submissions/:id`, and `GET /api/submissions/:id/files/:fileId`.
- [x] Run `npm test` and confirm failure because the server module does not exist.

### Task 2: Implement validated filesystem receipt storage

**Files:**
- Create: `prototype-server/config.mjs`
- Create: `prototype-server/storage.mjs`
- Create: `prototype-server/server.mjs`
- Modify: `.gitignore`

- [x] Define the accepted work types, MIME types, eight-file limit, 25 MiB per-file limit, 100 MiB total limit, and field length limits in `config.mjs`.
- [x] Implement ID generation, filename normalization, SHA-256 hashing, atomic manifest writing, newest-first receipt listing, safe receipt lookup, safe file lookup, and cleanup in `storage.mjs`.
- [x] Implement localhost HTTP routing, JSON responses, static prototype asset serving, Busboy multipart streaming, validation, and stable error codes in `server.mjs`.
- [x] Export `createSubmissionServer(options)` for tests and start the server only when `server.mjs` is executed directly.
- [x] Ignore `/prototype-data/` so real test submissions are never committed.
- [x] Run `npm test` until all API contract tests pass, then run the existing static site test suite.

### Task 3: Build the participant upload experience

**Files:**
- Create: `submission-prototype.html`
- Create: `submission-prototype.css`
- Create: `submission-prototype.js`
- Modify: `tests/submission-prototype.test.mjs`

- [x] Add failing static contract tests for all required form controls, the drop area, file list, progress element, live status region, and receipt region.
- [x] Build an accessible form with labels, concise prototype limits, work-type options, a drag/drop and picker surface, selected-file removal controls, and one submit action.
- [x] Implement client-side type, count, and size checks using the same limits displayed by the server.
- [x] Submit with `XMLHttpRequest` so upload progress is measurable, disable duplicate submission during transfer, and parse structured server errors.
- [x] Render the returned receipt without trusting HTML from participant fields, including file names, sizes, hashes, timestamp, and a copy-receipt action.
- [x] Run the prototype and existing static tests until green.

### Task 4: Build the organizer receipt confirmation view

**Files:**
- Create: `submission-admin.html`
- Create: `submission-admin.js`
- Modify: `submission-prototype.css`
- Modify: `tests/submission-prototype.test.mjs`

- [x] Add failing static contract tests for the localhost-only warning, refresh action, receipt count, empty state, and receipt list.
- [x] Fetch and render newest-first receipt summaries with participant, work, timestamp, and server receipt ID.
- [x] Render image previews only for image MIME types and safe download links for every stored file.
- [x] Add loading, empty, and API-error states plus a manual refresh command.
- [x] Make the participant success screen link directly to the organizer page with the submitted receipt highlighted.
- [x] Run all automated tests until green.

### Task 5: Document and verify the complete loop

**Files:**
- Create: `docs/submission-prototype.md`
- Modify: `package.json`

- [x] Add `npm run prototype` and document exact start, participant, organizer, storage, cleanup, and shutdown instructions.
- [x] State the prototype-only security boundary and enumerate production requirements without presenting them as already implemented.
- [x] Run `npm install`, `npm test`, `node --check` for all new JavaScript modules, the existing static-site tests, and `git diff --check`.
- [x] Start the server and use a real browser at desktop and mobile widths to upload an image and confirm the same receipt in the organizer view.
- [x] Verify stored bytes, manifest contents, download response, console output, keyboard flow, visible focus, text wrapping, and horizontal overflow.
