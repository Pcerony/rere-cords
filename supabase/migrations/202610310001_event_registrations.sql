begin;

create table public.event_registration_admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);
alter table public.event_registration_admins enable row level security;
revoke all on table public.event_registration_admins from public, anon, authenticated;

create function public.is_event_registration_admin()
returns boolean language sql stable security definer set search_path = '' as $$
    select exists (select 1 from public.event_registration_admins where user_id = auth.uid());
$$;
revoke all on function public.is_event_registration_admin() from public, anon, authenticated;
grant execute on function public.is_event_registration_admin() to authenticated;

create table public.event_registrations (
    id uuid primary key,
    registration_code text not null unique default ('RRC-W-' || upper(replace(gen_random_uuid()::text, '-', ''))),
    participant_name text not null check (char_length(participant_name) between 1 and 120),
    email text not null check (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
    work_title text not null check (char_length(work_title) between 1 and 200),
    description text not null check (char_length(description) between 1 and 200),
    salon text check (salon in ('yes', 'no', 'undecided')),
    major text check (char_length(major) <= 120),
    academic_year text check (char_length(academic_year) <= 60),
    origin_region text check (char_length(origin_region) <= 120),
    supplement text check (char_length(supplement) <= 2000),
    video_url text check (char_length(video_url) <= 2048 and video_url ~* '^https?://'),
    privacy_version text not null default '2026-10-31',
    privacy_accepted_at timestamptz not null default now(),
    payload_digest text not null check (payload_digest ~ '^[0-9a-f]{64}$'),
    physical_received boolean not null default false,
    checked_at timestamptz,
    checked_by uuid references auth.users(id) on delete set null,
    created_at timestamptz not null default now()
);
create index event_registrations_created_idx on public.event_registrations(created_at desc, id);
alter table public.event_registrations enable row level security;
revoke all on table public.event_registrations from public, anon, authenticated;
grant select on public.event_registrations to authenticated;
create policy event_admin_read on public.event_registrations for select to authenticated
    using (public.is_event_registration_admin());

create table public.event_registration_files (
    id uuid primary key default gen_random_uuid(),
    registration_id uuid not null references public.event_registrations(id) on delete cascade,
    object_path text not null unique,
    media_type text not null check (media_type in ('image/jpeg', 'image/png', 'image/webp')),
    byte_size integer not null check (byte_size between 1 and 5242880),
    sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$')
);
alter table public.event_registration_files enable row level security;
revoke all on table public.event_registration_files from public, anon, authenticated;
grant select on public.event_registration_files to authenticated;
create policy event_admin_read_files on public.event_registration_files for select to authenticated
    using (public.is_event_registration_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('event-registration-photos', 'event-registration-photos', false, 5242880,
    array['image/jpeg','image/png','image/webp']);
create policy event_admin_read_photo_objects on storage.objects for select to authenticated
    using (bucket_id = 'event-registration-photos' and public.is_event_registration_admin()
        and exists (select 1 from public.event_registration_files where object_path = storage.objects.name));

create function public.commit_event_registration(p_id uuid, p_payload jsonb, p_files jsonb, p_digest text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
    existing public.event_registrations;
    new_code text;
    file jsonb;
begin
    -- Serialize retries for one receipt; personal data never leaves this service-only function.
    perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_id::text, 0));
    select * into existing from public.event_registrations where id = p_id;
    if found then
        if existing.payload_digest <> p_digest then
            raise exception 'Submission identity conflict' using errcode = '22023';
        end if;
        return jsonb_build_object('code', existing.registration_code, 'inserted', false);
    end if;
    if p_payload->>'privacyAccepted' is distinct from 'true'
       or p_payload->>'submissionId' is distinct from p_id::text
       or jsonb_typeof(p_files) is distinct from 'array'
       or jsonb_array_length(p_files) > 3 then
        raise exception 'Invalid registration' using errcode = '22023';
    end if;
    insert into public.event_registrations
        (id, participant_name, email, work_title, description, salon, major, academic_year, origin_region, supplement, video_url, payload_digest)
    values (p_id, p_payload->>'name', p_payload->>'email', p_payload->>'title', p_payload->>'description',
        p_payload->>'salon', p_payload->>'major', p_payload->>'year', p_payload->>'origin', p_payload->>'supplement', p_payload->>'videoUrl', p_digest)
    returning registration_code into new_code;
    for file in select * from jsonb_array_elements(p_files) loop
        if left(file->>'path', 37) is distinct from (p_id::text || '/') then
            raise exception 'Invalid file path' using errcode = '22023';
        end if;
        insert into public.event_registration_files (registration_id, object_path, media_type, byte_size, sha256)
        values (p_id, file->>'path', file->>'type', (file->>'size')::integer, file->>'digest');
    end loop;
    return jsonb_build_object('code', new_code, 'inserted', true);
end;
$$;
revoke all on function public.commit_event_registration(uuid, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.commit_event_registration(uuid, jsonb, jsonb, text) to service_role;

create function public.admin_set_event_physical_received(p_id uuid, p_received boolean)
returns void language plpgsql security definer set search_path = '' as $$
begin
    if not public.is_event_registration_admin() then
        raise exception 'Administrator access required' using errcode = '42501';
    end if;
    if p_received is null then
        raise exception 'Invalid received status' using errcode = '22023';
    end if;
    update public.event_registrations set physical_received = p_received, checked_at = now(), checked_by = auth.uid()
    where id = p_id;
    if not found then raise exception 'Registration not found' using errcode = 'P0002'; end if;
end;
$$;
revoke all on function public.admin_set_event_physical_received(uuid, boolean) from public, anon, authenticated;
grant execute on function public.admin_set_event_physical_received(uuid, boolean) to authenticated;

commit;
