# Digital Submission Prototype Design

## Status

Approved for prototype implementation. The project owner explicitly delegated provisional field, validation, and workflow decisions so an end-to-end prototype can be evaluated before final submission policy is fixed.

## Goal

Build a locally runnable digital-work submission prototype that proves the complete receipt loop: a participant submits structured work information and files, receives a server-issued receipt, and an organizer can independently confirm the stored record and open the received files.

## Architecture

The existing public homepage remains unchanged and continues to use its current email route. The prototype is a separate participant page and organizer receipt page served by a small Node.js HTTP service. The server accepts multipart uploads, validates fields and files, writes each accepted submission into its own directory, and exposes read-only receipt APIs and file downloads.

The server binds to `127.0.0.1` by default. It is a local evaluation tool, not a production upload service. Public deployment requires authentication, durable remote storage, malware scanning, rate limiting, retention policy, privacy text, and an operator-approved field schema.

## Participant Flow

1. Open `/submission-prototype.html`.
2. Enter creator name, email, affiliation, work title, work type, and a short description.
3. Add one to eight files by picker or drag and drop.
4. Review the selected file list and remove mistakes before sending.
5. Submit once. The page displays upload progress and prevents duplicate clicks.
6. On success, display the receipt ID, server timestamp, received field summary, and the exact files stored by the server.
7. Preserve the receipt on screen so it can be copied or printed.

## Prototype Data Contract

Required fields are `creatorName`, `email`, `workTitle`, `workType`, `description`, and at least one file. `affiliation` is optional. `workType` is one of `image`, `data`, `interactive`, `video`, `mixed`, or `other`.

The prototype accepts JPEG, PNG, WebP, GIF, PDF, MP4, WebM, plain text, CSV, JSON, and ZIP. It accepts at most eight files, at most 25 MiB per file, and at most 100 MiB total. These are evaluation defaults rather than final event policy.

Each accepted submission receives an ID shaped like `RRC-YYYYMMDD-<random>`. The server stores:

- `manifest.json` with normalized fields, receipt time, status, client filenames, stored filenames, MIME types, byte sizes, and SHA-256 digests.
- One sanitized stored file for every accepted upload.

## Organizer Confirmation

`/submission-admin.html` loads `/api/submissions` and shows newest receipts first. Each receipt expands to show participant information, description, file metadata, image previews, and download links. A manual refresh action lets the organizer verify a just-completed upload independently of the participant success screen.

The organizer page is intentionally unauthenticated only because the prototype binds to localhost. It must not be exposed to a public network.

## Error Handling

The API returns JSON errors with a stable `code` and human-readable `message`. Validation failures use HTTP 400, unsupported media uses 415, size violations use 413, missing receipts use 404, and unexpected failures use 500. Incomplete submission directories are removed when parsing or validation fails.

The participant page keeps the entered text and selected files after a recoverable failure and announces status changes through an ARIA live region.

## Visual Direction

Both pages reuse the RERE-CORDS paper, ink, sage, and terracotta palette with restrained editorial typography. The upload surface is a functional tool rather than a marketing page: compact header, clear field grouping, one bordered drop area, visible limits, file rows, progress, and receipt details. The organizer view prioritizes scanning and verification over decoration.

## Verification

Automated tests cover valid multipart receipt storage, required-field rejection, media rejection, receipt listing, file retrieval, and static page contracts. Browser verification covers desktop and mobile layout, drag/drop and file-picker behavior, a real image upload, the participant receipt, the organizer receipt, file preview/download, console errors, and horizontal overflow.
