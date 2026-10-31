import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('registration data and admins are separate from equipment reservations and RLS protected', () => {
    const sql = read('supabase/migrations/202610310001_event_registrations.sql');
    for (const table of ['event_registrations', 'event_registration_files', 'event_registration_admins']) {
        assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`, 'i'));
        assert.match(sql, new RegExp(`revoke all on (?:table )?public\\.${table} from public, anon, authenticated`, 'i'));
    }
    assert.doesNotMatch(sql, /is_reservation_admin|alter table public\.reservations/i);
    assert.match(sql, /grant execute on function public\.commit_event_registration\(uuid, jsonb, jsonb, text\) to service_role/i);
    assert.match(sql, /pg_advisory_xact_lock/);
    assert.match(sql, /char_length\(description\) between 1 and 200/);
    assert.match(sql, /payload_digest <> p_digest/);
});
test('photos use a private bucket and only whitelisted registration admins may read linked objects', () => {
    const sql = read('supabase/migrations/202610310001_event_registrations.sql');
    assert.match(sql, /'event-registration-photos', 'event-registration-photos', false/);
    assert.match(sql, /on storage\.objects for select to authenticated/);
    assert.match(sql, /is_event_registration_admin\(\)/);
    assert.match(sql, /object_path = storage\.objects\.name/);
    assert.doesNotMatch(sql, /for (?:insert|update|delete) to (?:anon|authenticated)/i);
    assert.match(sql, /set search_path = ''/);
});
test('public endpoint uses server-only secrets and verifies captcha on the server', () => {
    const entry = read('supabase/functions/event-registration/index.ts');
    assert.match(entry, /TURNSTILE_SECRET_KEY/);
    assert.match(entry, /siteverify/);
    assert.match(entry, /isValidCaptchaResult/);
    assert.match(entry, /REGISTRATION_ALLOWED_ORIGINS/);
    assert.match(entry, /Deno\.env\.get\('SUPABASE_SERVICE_ROLE_KEY'\)/);
    assert.match(read('supabase/config.toml'), /\[functions\.event-registration\]\s*verify_jwt = false/);
});
test('deployment and git ignore local Supabase state and environment secrets', () => {
    const workflow = read('.github/workflows/deploy-pages.yml');
    assert.match(workflow, /--exclude='\.env\*'/);
    assert.match(workflow, /--exclude='\.supabase\/'/);
    assert.match(read('.gitignore'), /supabase\/\.temp\//);
});
