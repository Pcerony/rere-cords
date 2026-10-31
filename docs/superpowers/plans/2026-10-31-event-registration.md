# Event Registration Implementation Plan

> Execute inline in this session using executing-plans; no delegation requested.

**Goal:** Receive and manage physical-work registrations without changing safety-equipment reservations.

**Architecture:** Static form -> bounded multipart Edge Function -> private Storage and service-only transactional RPC. Independent Auth/RLS admin access.

**Tech Stack:** Native HTML/CSS/ES modules, Node tests, Supabase PostgreSQL/Auth/Storage/Edge Functions, Turnstile.

## Verification Record

Local implementation complete on `feature/event-registration`, not committed or deployed. `npm test`: 102/102 passing. Deno checks the Edge entry successfully. PGlite verifies migration, rollback, service-only commit, idempotency, anonymous denial, non-admin RLS, independent admin writes and linked-object-only reads. Browser QA uses intercepted captcha/API/Auth responses, validates 503 -> captcha failure -> success with the same UUID, safely rendered participant text, admin physical matching, sign-out cleanup and desktop/mobile layouts. Static preview remains unconfigured/fail-closed. Production migration, actual Storage/Auth tests, Turnstile secrets, dates, retention ownership and enablement remain release requirements in `docs/event-registration-setup.md`.

## Tasks

- [x] Add `tests/event-registration.test.mjs`: shared field/link/file validation, multipart submission handling, idempotent retries, origin/size/deadline/captcha denial, cleanup on upload failure and safe failure responses. Run `node --test tests/event-registration.test.mjs` to observe missing-module failure, then implement `event-registration-core.js` and `supabase/functions/event-registration/handler.js` and rerun.
- [x] Add `tests/event-registration-schema.test.mjs`: table/RLS/grant contracts, private bucket, isolated admin role, service-only commit RPC; observe absent migration then add `supabase/migrations/202610310001_event_registrations.sql` and function entry/config. Review transaction and concurrency boundaries.
- [x] Add accessible participant and admin page contract tests, observe failure, implement `event-registration.html`, `.css`, `.js`, `event-registration-copy.js`, `event-registration-config.js`, and `event-registration-admin.html/js`. Verify client validation, retry UUID reuse and authenticated reads.
- [x] Update homepage entry and all participation instructions; add revised contract tests before changing `app.js`, `index.html`, `submission-config.js`, `translations.js` and deployment workflow. Preserve the existing reservation tests. Reconcile the pre-existing setup-document assertion without reverting the user's new documentation.
- [x] Add `docs/event-registration-setup.md` with migration, secrets, Turnstile, admin grants, dates, retention and manual live permission/rollback checks. Run `npm test`, JS syntax checks, desktop/mobile browser flows and screenshots. Start a local preview and report separately what is implemented and what requires production configuration.
