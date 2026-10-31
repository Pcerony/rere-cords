import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// Optional local PostgreSQL-compatible check; does not connect to a real Supabase project.
// PGLITE_MODULE may point to a temporary installation, keeping website dependencies unchanged.
const { PGlite } = await import(process.env.PGLITE_MODULE || '@electric-sql/pglite');
const db = new PGlite();
try {
    await db.exec(`
        create role anon; create role authenticated; create role service_role bypassrls;
        create schema auth; create schema storage;
        create table auth.users (id uuid primary key);
        create function auth.uid() returns uuid language sql stable as
          $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
        grant usage on schema auth to anon, authenticated, service_role;
        create table storage.buckets (id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
        create table storage.objects (id uuid primary key default gen_random_uuid(), bucket_id text, name text);
        alter table storage.objects enable row level security;
        grant usage on schema storage to authenticated;
        grant select on storage.objects to authenticated;
    `);
    await db.exec(await readFile(new URL('../supabase/migrations/202610310001_event_registrations.sql', import.meta.url), 'utf8'));
    const id = 'be614a6a-d967-4f2e-b63c-d9e18c9f0e46';
    const payload = { submissionId: id, name: 'Example', email: 'example@example.org', title: 'Work', description: 'Record', privacyAccepted: true };
    const digest = 'a'.repeat(64);
    const commit = (submissionId, data, files = [], hash = digest) => db.query('select public.commit_event_registration($1,$2,$3,$4) as receipt', [submissionId, JSON.stringify(data), JSON.stringify(files), hash]);
    await db.exec('set role service_role');
    const photoPath = `${id}/attempt/0.png`;
    const first = (await commit(id, payload, [{ path: photoPath, type: 'image/png', size: 8, digest }])).rows[0].receipt;
    assert.equal(first.inserted, true);
    const retry = (await commit(id, payload)).rows[0].receipt;
    assert.equal(retry.inserted, false);
    assert.equal(retry.code, first.code);
    await assert.rejects(commit(id, payload, [], 'b'.repeat(64)), /identity conflict/);
    const badId = 'ce614a6a-d967-4f2e-b63c-d9e18c9f0e46';
    await assert.rejects(commit(badId, { ...payload, submissionId: badId }, [{ path: 'not/allowed', type: 'image/png', size: 10, digest }]), /file path/);
    await db.exec('reset role');
    await db.query("insert into storage.objects(bucket_id,name) values ('event-registration-photos',$1),('event-registration-photos','orphan.png')", [photoPath]);
    assert.equal((await db.query('select count(*)::int as count from public.event_registrations')).rows[0].count, 1);
    await db.exec('set role anon');
    await assert.rejects(db.query('select * from public.event_registrations'), /permission denied/);
    await assert.rejects(commit(id, payload), /permission denied/);
    await db.exec('reset role; set role authenticated');
    assert.equal((await db.query('select * from public.event_registrations')).rows.length, 0);
    assert.equal((await db.query('select * from storage.objects')).rows.length, 0);
    await assert.rejects(db.query('select public.admin_set_event_physical_received($1,true)', [id]), /Administrator access required/);
    await db.exec(`reset role;
        insert into auth.users values ('00000000-0000-4000-8000-000000000001');
        insert into public.event_registration_admins(user_id) values ('00000000-0000-4000-8000-000000000001');
        set role authenticated;
        set request.jwt.claim.sub = '00000000-0000-4000-8000-000000000001';
    `);
    assert.equal((await db.query('select * from public.event_registrations')).rows.length, 1);
    assert.deepEqual((await db.query('select name from storage.objects')).rows, [{ name: photoPath }]);
    await db.query('select public.admin_set_event_physical_received($1,true)', [id]);
    assert.equal((await db.query('select physical_received from public.event_registrations')).rows[0].physical_received, true);
    await assert.rejects(db.query("update public.event_registrations set email='other@example.org'"), /permission denied/);
    console.log('PASS: migration, service-only writes, retry receipt, conflict rejection, atomic rollback, anonymous denial, non-admin RLS, admin reads and controlled update.');
} finally { await db.close(); }
