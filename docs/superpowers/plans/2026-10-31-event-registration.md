# Event Registration Implementation Plan

> Execute inline in this session using executing-plans; no delegation requested.

**Goal:** Receive and manage physical-work registrations without changing safety-equipment reservations.

**Architecture:** Static form -> bounded multipart Edge Function -> private Storage and service-only transactional RPC. Independent Auth/RLS admin access.

**Tech Stack:** Native HTML/CSS/ES modules, Node tests, Supabase PostgreSQL/Auth/Storage/Edge Functions, Turnstile.

## Verification Record

Production release completed on 2026-10-31 after explicit approval for the migration, Turnstile integration and administrator access. `npm test`: 105/105 passing. Deno checks the Edge entry successfully. PGlite verifies migration, rollback, service-only commit, idempotency, anonymous denial, non-admin RLS, independent admin writes and linked-object-only reads. Initial browser QA used intercepted captcha/API/Auth responses for uncertain retries and admin UI. Subsequent real production browser submission returned a receipt; its private photo was downloaded and verified byte-for-byte. Production SQL RLS checks, anonymous HTTP denial and invalid captcha denial passed; existing equipment reservations remained unchanged. No administrator password was entered on the user's behalf. Actual release details, synthetic test record, retention responsibilities and baseline migration-history warning are recorded in `docs/event-registration-setup.md`. Local preview remains intentionally unconfigured/fail-closed; the production build is enabled.

## Tasks

- [x] Add `tests/event-registration.test.mjs`: shared field/link/file validation, multipart submission handling, idempotent retries, origin/size/deadline/captcha denial, cleanup on upload failure and safe failure responses. Run `node --test tests/event-registration.test.mjs` to observe missing-module failure, then implement `event-registration-core.js` and `supabase/functions/event-registration/handler.js` and rerun.
- [x] Add `tests/event-registration-schema.test.mjs`: table/RLS/grant contracts, private bucket, isolated admin role, service-only commit RPC; observe absent migration then add `supabase/migrations/202610310001_event_registrations.sql` and function entry/config. Review transaction and concurrency boundaries.
- [x] Add accessible participant and admin page contract tests, observe failure, implement `event-registration.html`, `.css`, `.js`, `event-registration-copy.js`, `event-registration-config.js`, and `event-registration-admin.html/js`. Verify client validation, retry UUID reuse and authenticated reads.
- [x] Update homepage entry and all participation instructions; add revised contract tests before changing `app.js`, `index.html`, `submission-config.js`, `translations.js` and deployment workflow. Preserve the existing reservation tests. Reconcile the pre-existing setup-document assertion without reverting the user's new documentation.
- [x] Add `docs/event-registration-setup.md` with migration, secrets, Turnstile, admin grants, dates, retention and manual live permission/rollback checks. Run `npm test`, JS syntax checks, desktop/mobile browser flows and screenshots. Start a local preview and report separately what is implemented and what requires production configuration.
