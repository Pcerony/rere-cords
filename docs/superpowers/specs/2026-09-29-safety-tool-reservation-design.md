# Safety Tool Reservation Design

## Goal

Add an embedded-in-the-site reservation experience for borrowing four kinds of safety tools, with date-aware live availability backed by Supabase.

## Existing Context

The website in `01_Website` is a multilingual static site hosted from GitHub Pages. The processing safety section is the `#safety` section in `index.html`. There is an existing local-only upload prototype, but no production backend or reservation service. The website currently supports 13 locales through `app.js` and `translations.js`.

## User Experience

- Add a clear reservation entry point beneath the processing safety guidance and a dedicated reservation page consistent with the existing restrained visual style.
- The reservation form collects participant name, course/program, email, selected equipment, requested quantity per equipment type, pickup date, and required return date.
- The four equipment types are cutter, goggles, mask, and safety gloves. Each type has an initial capacity of two loan sets. Participants may request any subset and choose one or two units per selected type, subject to availability.
- Pickup is at the small box in front of Media Studio, 2F, Building 7. The chosen return date is a firm deadline and is included in confirmation.
- Availability is calculated per equipment type over the requested inclusive date range. The page shows currently available quantities and, when full, the earliest date a requested quantity can be borrowed.
- A successful submission immediately becomes a confirmed reservation. The client receives a clear confirmation; no organizer approval step is implied.
- Before backend configuration is complete, the page clearly reports that reservations are not open rather than accepting requests that cannot be recorded.
- Reuse the site's language selection and localization conventions; provide complete UI copy for all currently supported locales.

## Architecture and Data Flow

- Keep the public site static and use the Supabase JavaScript client from the browser with only the project URL and anon/publishable key. Never expose a service-role key.
- Store inventory and reservations in Supabase. Model reservation state explicitly (`confirmed`, `cancelled`, `returned`) and reservation line items per equipment type and quantity.
- Expose a narrow database RPC for availability and another transactional RPC for reservation creation. The create RPC validates input and dates, serializes conflicting allocations, checks capacity across every day in the requested inclusive interval, and writes the reservation and line items atomically. If any selected item is unavailable, write nothing and return a conflict with availability guidance.
- Enable Realtime updates for availability changes, with a refresh-on-focus/poll fallback so the UI remains correct if a realtime connection is interrupted. The booking RPC remains authoritative; UI counts are advisory until submission succeeds.
- Use Row Level Security. Anonymous visitors may read aggregate availability only and may invoke validated creation/availability RPCs, but may not list or read reservation records or personal details. Organizer-only management of cancellations/returns must not be exposed through the public anon key; defer a secure organizer workflow unless already available.
- Keep Supabase project configuration out of source control. Provide an example config shape and a runbook explaining where to find the project URL and anon key and where to set them for the static deployment.
- Include SQL migrations/setup scripts in the repository and document the required Supabase dashboard steps. Do not attempt to create or modify the user's hosted Supabase project without their explicit configuration and action.

## Validation and Failure Behavior

- Require non-empty name, course/program, valid email, at least one selected equipment type, integer quantities within 1–2, pickup date today or later, and return date on/after pickup date.
- Validate again inside the database; the database is authoritative.
- Distinguish invalid input, unavailable inventory/date conflict, missing backend configuration, network failure, and successful confirmation in the UI.
- Do not claim a reservation is confirmed before the transactional RPC succeeds.
- Do not expose names, emails, or individual reservation dates in public availability responses.

## Testing

- Unit-test client validation and availability/booking response handling.
- Test SQL/database rules for date overlap, exact capacity, simultaneous conflicting requests, cancellation/return state effects, and no partial writes on conflicts.
- Extend static-site tests to verify the safety-section entry point, reservation page assets, locale coverage, and absence of service-role credentials.
- Run the existing `npm test` suite and manually verify desktop/mobile form states once Supabase is configured.

## Decisions and Open Operational Requirement

- Confirmed reservations automatically occupy inventory; there is no pending approval queue.
- Two units of each of four equipment types are the initial stock.
- Borrow periods use date granularity and an inclusive pickup-to-return range.
- Site implementation can be completed before a hosted project is connected, but live availability and successful booking require the owner to finish the guided Supabase setup and add the public project URL/key to deployment configuration.
- Public bookings contain personal data. Configure only the minimum retention/access needed; organizer-side booking edits require a secure authenticated admin path and are outside the public booking UI.
