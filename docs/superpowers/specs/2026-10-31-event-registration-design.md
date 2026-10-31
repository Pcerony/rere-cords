# Event Registration

Approved direction: physical handoff plus online registration; reuse the existing Supabase project with an independent server endpoint. Video is an optional HTTP(S) link to any provider, not an upload.

## Participant Flow

Attach a prepared slip with author name and email to the physical work, deposit it in the collection box, then scan the QR code to `event-registration.html`. Use the same name/email online. Required: name, email, work title, description (at most 200 Unicode code points). Optional: November 25 salon intention (yes/no/undecided, no default answer), major, year, origin/region, supplementary text, up to three JPEG/PNG/WebP photos (5 MiB each), and one video URL. Privacy acknowledgement covers event administration, not public release of private information. A receipt is an online registration, not confirmation that the physical work has been checked. No participant account or automatic email is required.

## Architecture And Safety

GitHub Pages serves the form. A Supabase Edge Function verifies origin, deadline, bounded request size, fields, photo signatures, and Cloudflare Turnstile before storing private photos and committing metadata through a service-only RPC. Browser code contains no secret. A stable client-generated submission UUID makes retries idempotent; no name/email is returned by the public API. Upload failure rolls back uploaded objects; ambiguous database errors retain objects for retry rather than deleting potentially committed files. No remote video URL is fetched or embedded.

Separate registration, file metadata and administrator tables use RLS and explicit grants. Existing reservation roles are not reused automatically. The registration admin page uses Auth, its own whitelist, paginated reading and short-lived signed photo links. The admin can mark physical handoff as checked, but cannot alter personal data directly.

## Delivery

The public form provides Japanese, English and simplified Chinese, inherits the site's language preference where supported, and has accessible errors/loading/success states. Existing homepage participation copy is updated consistently across its supported languages. The endpoint is fail-closed without secrets, allowed origins, Turnstile. Reuse the published November 1-November 20, 2026 collection period; dates are advisory only; neither homepage navigation nor server submission is date-gated (organizer decision, October 31). No production database migration or remote deployment is performed without available project access. Retention/deletion ownership and live permission tests remain release requirements, documented in the deployment guide.
