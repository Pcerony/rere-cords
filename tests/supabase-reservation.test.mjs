import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const migration = readFileSync(new URL('../supabase/migrations/202609290001_safety_tool_reservations.sql', import.meta.url), 'utf8');
const adminMigration = readFileSync(new URL('../supabase/migrations/202609290002_safety_tool_admin.sql', import.meta.url), 'utf8');
const studentNumberMigration = readFileSync(new URL('../supabase/migrations/202609290003_student_number.sql', import.meta.url), 'utf8');

test('migration seeds two units for each of the four equipment types', () => {
    for (const equipment of ['cutter', 'goggles', 'mask', 'gloves']) {
        assert.match(migration, new RegExp(`\\('${equipment}',\\s*'[^']+',\\s*2\\)`));
    }
});

test('migration constrains reservation states, dates, and quantities', () => {
    for (const status of ['pending', 'ready', 'cancelled', 'returned']) assert.match(migration, new RegExp(`'${status}'`));
    assert.match(migration, /Asia\/Tokyo/);
    assert.match(migration, /Asia\/Tokyo/);
    assert.match(migration, /::date\s*\+\s*3/);
    assert.match(migration, /pickup_date\s*<=\s*\(created_at at time zone 'Asia\/Tokyo'\)::date \+ 365/);
    assert.match(migration, /return_date\s*<=\s*pickup_date \+ 13/);
    assert.match(migration, /return_date\s*>=\s*pickup_date/);
    assert.match(migration, /quantity\s+BETWEEN\s+1\s+AND\s+2/i);
    assert.match(migration, /r\.return_date\s*>=\s*d\.day/);
});

test('migration serializes booking transactions and provides narrow RPCs', () => {
    assert.match(migration, /pg_advisory_xact_lock/);
    assert.match(migration, /create_equipment_reservation/);
    assert.match(migration, /get_equipment_availability/);
    assert.match(migration, /SECURITY DEFINER/i);
});

test('student number migration preserves old reservations and validates new submissions', () => {
    assert.match(studentNumberMigration, /add column student_number text/i);
    assert.match(studentNumberMigration, /create function public\.create_equipment_reservation/i);
    assert.match(studentNumberMigration, /p_student_number text/i);
    assert.match(studentNumberMigration, /char_length\(btrim\(coalesce\(p_student_number, ''\)\)\) not between 1 and 40/i);
    assert.match(studentNumberMigration, /update public\.reservations\s+set student_number/is);
    assert.match(studentNumberMigration, /revoke all on function public\.create_equipment_reservation\(text, text, text, text, date, date, jsonb\)\s+from public, anon, authenticated/i);
    assert.match(studentNumberMigration, /grant execute on function public\.create_equipment_reservation\(text, text, text, text, date, date, jsonb\)\s+to anon, authenticated/i);
});

test('anonymous users cannot read personal reservation tables', () => {
    assert.match(migration, /ENABLE ROW LEVEL SECURITY/i);
    assert.match(migration, /REVOKE\s+ALL\s+ON\s+TABLE\s+public\.reservations\s+FROM\s+anon/i);
    assert.match(migration, /REVOKE\s+ALL\s+ON\s+TABLE\s+public\.reservation_items\s+FROM\s+anon/i);
});

test('admin migration protects reservation data and status changes with an admin allowlist', () => {
    assert.match(adminMigration, /create table if not exists public\.reservation_admins/i);
    assert.match(adminMigration, /enable row level security/i);
    assert.match(adminMigration, /revoke all on table public\.reservation_admins from public, anon, authenticated/i);
    assert.match(adminMigration, /create or replace function public\.is_reservation_admin\(\)/i);
    for (const table of ['reservations', 'reservation_items', 'equipment_inventory']) {
        assert.match(adminMigration, new RegExp(`create policy[^;]+on public\\.${table}[^;]+is_reservation_admin`, 'i'));
    }
    assert.match(adminMigration, /create or replace function public\.admin_set_reservation_status/i);
    assert.match(adminMigration, /auth\.uid\(\)/i);
    for (const status of ['ready', 'cancelled', 'returned']) assert.match(adminMigration, new RegExp(`'${status}'`));
    assert.match(adminMigration, /revoke all on function public\.admin_set_reservation_status\(uuid, text\) from public, anon/i);
    assert.match(adminMigration, /grant execute on function public\.admin_set_reservation_status\(uuid, text\) to authenticated/i);
});

test('realtime inventory notification contains no participant data', () => {
    const triggerFunction = migration.match(/create or replace function public\.broadcast_equipment_inventory_change\([\s\S]*?\n\$\$;/i)?.[0] || '';
    assert.match(triggerFunction, /inventory_changed/);
    assert.doesNotMatch(triggerFunction, /email|participant_name/i);
});

test('Pages deployment injects the public Supabase settings without committing project values', () => {
    const workflow = readFileSync(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8');
    assert.match(workflow, /SUPABASE_URL:\s*\$\{\{\s*vars\.SUPABASE_URL\s*\|\|\s*secrets\.SUPABASE_URL\s*\}\}/);
    assert.match(workflow, /SUPABASE_PUBLISHABLE_KEY:\s*\$\{\{\s*vars\.SUPABASE_PUBLISHABLE_KEY\s*\|\|\s*secrets\.SUPABASE_PUBLISHABLE_KEY\s*\}\}/);
    assert.match(workflow, /- name: Install dependencies\s+run: npm ci/);
    assert.match(workflow, /- name: Validate public Supabase key/);
    assert.match(workflow, /if \(!key\)/);
    assert.match(workflow, /payload\.role === 'anon'/);
    assert.match(workflow, /safety-tool-reservation-config\.js/);
    assert.match(workflow, /--exclude='supabase\/'/);
    assert.match(workflow, /actions\/deploy-pages/);
});

test('Chinese setup guide explains project setup, deployment variables, and manual organizer notification', () => {
    const guide = readFileSync(new URL('../docs/supabase-setup.md', import.meta.url), 'utf8');
    for (const phrase of ['创建项目', 'SQL Editor', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY', 'GitHub Pages', 'pending', 'ready', 'service_role', '邮件']) {
        assert.ok(guide.includes(phrase), `setup guide must include ${phrase}`);
    }
});

test('Chinese setup guide explains secure administrator setup and the dedicated manager page', () => {
    const guide = readFileSync(new URL('../docs/supabase-setup.md', import.meta.url), 'utf8');
    for (const phrase of ['Authentication → Users', '关闭公开注册', 'reservation_admins', 'Auth 用户 UUID', 'safety-tool-admin.html', '确认已放置并已通知']) {
        assert.ok(guide.includes(phrase), `setup guide must include ${phrase}`);
    }
});

test('Chinese setup guide explains the student number migration before new bookings', () => {
    const guide = readFileSync(new URL('../docs/supabase-setup.md', import.meta.url), 'utf8');
    assert.match(guide, /202609290003_student_number\.sql/);
    assert.match(guide, /旧预约会保留/);
});
