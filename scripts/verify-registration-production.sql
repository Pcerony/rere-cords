-- Read-only production permission checks. Claims are transaction-local and rolled back.
begin;

do $$
begin
    if (select count(*) from pg_class c join pg_namespace n on n.oid = c.relnamespace
        where n.nspname = 'public' and c.relname in ('event_registrations', 'event_registration_files', 'event_registration_admins') and c.relrowsecurity) <> 3 then
        raise exception 'Registration RLS is missing';
    end if;
    if has_function_privilege('anon', 'public.commit_event_registration(uuid,jsonb,jsonb,text)', 'execute')
       or has_function_privilege('authenticated', 'public.commit_event_registration(uuid,jsonb,jsonb,text)', 'execute') then
        raise exception 'Public role can execute service-only commit';
    end if;
    if not exists (select 1 from storage.buckets where id = 'event-registration-photos' and not public and file_size_limit = 5242880) then
        raise exception 'Photo bucket is missing, public or has the wrong size limit';
    end if;
end;
$$;

set local role anon;
do $$
begin
    begin
        perform 1 from public.event_registrations limit 1;
        raise exception 'Anonymous registration read unexpectedly allowed';
    exception when insufficient_privilege then null;
    end;
    begin
        perform 1 from public.event_registration_files limit 1;
        raise exception 'Anonymous file metadata read unexpectedly allowed';
    exception when insufficient_privilege then null;
    end;
end;
$$;
reset role;

select set_config('request.jwt.claim.sub', '00000000-0000-4000-8000-000000000099', true);
set local role authenticated;
do $$
begin
    if public.is_event_registration_admin() or exists (select 1 from public.event_registrations)
        or exists (select 1 from public.event_registration_files) then
        raise exception 'Unapproved user can read registration data';
    end if;
    begin
        perform public.admin_set_event_physical_received('00000000-0000-4000-8000-000000000099', true);
        raise exception 'Unapproved user can perform admin action';
    exception when insufficient_privilege then null;
    end;
end;
$$;
reset role;

select set_config('request.jwt.claim.sub', (select user_id::text from public.event_registration_admins limit 1), true);
set local role authenticated;
do $$
begin
    if not public.is_event_registration_admin() then
        raise exception 'Approved administrator cannot enter registration dashboard';
    end if;
    perform 1 from public.event_registrations limit 1;
    perform 1 from public.event_registration_files limit 1;
end;
$$;
reset role;

select 'PASS' as permission_checks,
    (select count(*) from public.event_registration_admins) as registration_admins,
    (select count(*) from public.reservations) as equipment_reservations,
    (select count(*) from public.event_registrations) as work_registrations;
rollback;
