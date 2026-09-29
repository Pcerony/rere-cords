create table if not exists public.equipment_inventory (
    equipment_id text primary key check (equipment_id in ('cutter', 'goggles', 'mask', 'gloves')),
    display_name text not null,
    total_units integer not null check (total_units between 0 and 50),
    updated_at timestamptz not null default now()
);

insert into public.equipment_inventory (equipment_id, display_name, total_units)
values
    ('cutter', 'Cutter', 2),
    ('goggles', 'Safety goggles', 2),
    ('mask', 'Dust mask', 2),
    ('gloves', 'Safety gloves', 2)
on conflict (equipment_id) do nothing;

create table if not exists public.reservations (
    id uuid primary key default pg_catalog.gen_random_uuid(),
    reservation_code text not null unique default (
        'RRC-' || to_char((now() at time zone 'Asia/Tokyo')::date, 'YYYYMMDD') || '-' || upper(substr(replace(pg_catalog.gen_random_uuid()::text, '-', ''), 1, 8))
    ),
    participant_name text not null check (char_length(participant_name) between 1 and 120),
    course text not null check (char_length(course) between 1 and 160),
    email text not null check (char_length(email) between 3 and 254),
    pickup_date date not null,
    return_date date not null,
    status text not null default 'pending' check (status in ('pending', 'ready', 'cancelled', 'returned')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (return_date >= pickup_date),
    constraint reservations_max_booking_horizon check (
        pickup_date <= (created_at at time zone 'Asia/Tokyo')::date + 365
    ),
    constraint reservations_max_loan_duration check (return_date <= pickup_date + 13)
);

create table if not exists public.reservation_items (
    reservation_id uuid not null references public.reservations(id) on delete cascade,
    equipment_id text not null references public.equipment_inventory(equipment_id),
    quantity integer not null check (quantity between 1 and 2),
    primary key (reservation_id, equipment_id)
);

create index if not exists reservations_active_dates_idx
    on public.reservations (pickup_date, return_date)
    where status in ('pending', 'ready');

alter table public.equipment_inventory enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_items enable row level security;

revoke all on table public.equipment_inventory from anon, authenticated;
revoke all on table public.reservations from anon, authenticated;
revoke all on table public.reservation_items from anon, authenticated;
revoke create on schema public from public, anon, authenticated;
grant usage on schema public to anon, authenticated;

create or replace function public._minimum_available_quantity(
    p_equipment_id text,
    p_from date,
    p_through date
)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
    with relevant_days as (
        select p_from as day
        union
        select r.pickup_date
        from public.reservations r
        where r.status in ('pending', 'ready')
          and r.pickup_date > p_from
          and r.pickup_date <= p_through
          and r.return_date >= p_from
    ),
    daily_usage as (
        select d.day, coalesce(sum(ri.quantity), 0)::integer as used
        from relevant_days d
        left join public.reservations r
          on r.status in ('pending', 'ready')
         and r.pickup_date <= d.day
         and r.return_date >= d.day
        left join public.reservation_items ri
          on ri.reservation_id = r.id
         and ri.equipment_id = p_equipment_id
        group by d.day
    )
    select min(i.total_units - u.used)::integer
    from public.equipment_inventory i
    cross join daily_usage u
    where i.equipment_id = p_equipment_id;
$$;

create or replace function public.get_equipment_availability(
    p_pickup_date date,
    p_return_date date,
    p_items jsonb default '{}'::jsonb
)
returns table (
    equipment_id text,
    total_units integer,
    available_units integer,
    earliest_available_date date
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
    v_min_pickup date := (now() at time zone 'Asia/Tokyo')::date + 3;
    v_item record;
    v_requested integer;
begin
    if p_pickup_date is null or p_return_date is null or p_return_date < p_pickup_date then
        raise exception using errcode = '22023', message = 'INVALID_DATE_RANGE';
    end if;
    if p_pickup_date < v_min_pickup then
        raise exception using errcode = '22023', message = 'PICKUP_TOO_SOON';
    end if;
    if p_pickup_date > (now() at time zone 'Asia/Tokyo')::date + 365 then
        raise exception using errcode = '22023', message = 'PICKUP_TOO_FAR';
    end if;
    if p_return_date > p_pickup_date + 13 then
        raise exception using errcode = '22023', message = 'LOAN_TOO_LONG';
    end if;
    if p_items is null or jsonb_typeof(p_items) <> 'object' then
        raise exception using errcode = '22023', message = 'INVALID_ITEMS';
    end if;
    for v_item in select key, value from jsonb_each(p_items) loop
        if v_item.key not in ('cutter', 'goggles', 'mask', 'gloves') or v_item.value::text !~ '^[12]$' then
            raise exception using errcode = '22023', message = 'INVALID_ITEMS';
        end if;
    end loop;

    return query
    select inventory.equipment_id,
           inventory.total_units,
           public._minimum_available_quantity(inventory.equipment_id, p_pickup_date, p_return_date),
           (
               select dates.candidate::date
               from pg_catalog.generate_series(
                   p_pickup_date::timestamp,
                   (p_pickup_date + 365)::timestamp,
                   interval '1 day'
               ) as dates(candidate)
               where public._minimum_available_quantity(
                   inventory.equipment_id,
                   dates.candidate::date,
                   dates.candidate::date + (p_return_date - p_pickup_date)
               ) >= coalesce((p_items ->> inventory.equipment_id)::integer, 1)
               order by dates.candidate
               limit 1
           )
    from public.equipment_inventory inventory
    order by inventory.equipment_id;
end;
$$;

create or replace function public.create_equipment_reservation(
    p_name text,
    p_course text,
    p_email text,
    p_pickup_date date,
    p_return_date date,
    p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_min_pickup date := (now() at time zone 'Asia/Tokyo')::date + 3;
    v_item record;
    v_available integer;
    v_earliest date;
    v_conflicts jsonb := '[]'::jsonb;
    v_reservation_id uuid;
    v_reservation_code text;
begin
    if char_length(btrim(coalesce(p_name, ''))) not between 1 and 120
       or char_length(btrim(coalesce(p_course, ''))) not between 1 and 160
       or char_length(btrim(coalesce(p_email, ''))) not between 3 and 254
       or btrim(p_email) !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
        raise exception using errcode = '22023', message = 'INVALID_PARTICIPANT_DETAILS';
    end if;
    if p_pickup_date is null or p_return_date is null or p_return_date < p_pickup_date then
        raise exception using errcode = '22023', message = 'INVALID_DATE_RANGE';
    end if;
    if p_pickup_date < v_min_pickup then
        raise exception using errcode = '22023', message = 'PICKUP_TOO_SOON';
    end if;
    if p_pickup_date > (now() at time zone 'Asia/Tokyo')::date + 365 then
        raise exception using errcode = '22023', message = 'PICKUP_TOO_FAR';
    end if;
    if p_return_date > p_pickup_date + 13 then
        raise exception using errcode = '22023', message = 'LOAN_TOO_LONG';
    end if;
    if p_items is null or jsonb_typeof(p_items) <> 'object' or p_items = '{}'::jsonb then
        raise exception using errcode = '22023', message = 'ITEMS_REQUIRED';
    end if;
    for v_item in select key, value from jsonb_each(p_items) loop
        if v_item.key not in ('cutter', 'goggles', 'mask', 'gloves') or v_item.value::text !~ '^[12]$' then
            raise exception using errcode = '22023', message = 'INVALID_ITEMS';
        end if;
    end loop;

    perform pg_catalog.pg_advisory_xact_lock(20260929, 1);

    for v_item in select key, value from jsonb_each(p_items) order by key loop
        v_available := public._minimum_available_quantity(v_item.key, p_pickup_date, p_return_date);
        if v_available < v_item.value::text::integer then
            select dates.candidate::date into v_earliest
            from pg_catalog.generate_series(
                p_pickup_date::timestamp,
                (p_pickup_date + 365)::timestamp,
                interval '1 day'
            ) as dates(candidate)
            where public._minimum_available_quantity(
                v_item.key,
                dates.candidate::date,
                dates.candidate::date + (p_return_date - p_pickup_date)
            ) >= v_item.value::text::integer
            order by dates.candidate
            limit 1;

            v_conflicts := v_conflicts || jsonb_build_array(jsonb_build_object(
                'equipment_id', v_item.key,
                'available_units', v_available,
                'earliest_available_date', v_earliest
            ));
        end if;
    end loop;

    if jsonb_array_length(v_conflicts) > 0 then
        return jsonb_build_object('ok', false, 'code', 'UNAVAILABLE', 'conflicts', v_conflicts);
    end if;

    insert into public.reservations (participant_name, course, email, pickup_date, return_date)
    values (btrim(p_name), btrim(p_course), lower(btrim(p_email)), p_pickup_date, p_return_date)
    returning id, reservation_code into v_reservation_id, v_reservation_code;

    insert into public.reservation_items (reservation_id, equipment_id, quantity)
    select v_reservation_id, item.key, item.value::text::integer
    from jsonb_each(p_items) as item;

    return jsonb_build_object(
        'ok', true,
        'reservation_id', v_reservation_id,
        'reservation_code', v_reservation_code,
        'status', 'pending'
    );
end;
$$;

create or replace function public.broadcast_equipment_inventory_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform realtime.send(
        jsonb_build_object('event', 'inventory_changed'),
        'inventory_changed',
        'rerecords-equipment-inventory',
        false
    );
    return null;
exception when others then
    raise warning 'Equipment inventory broadcast failed: %', sqlerrm;
    return null;
end;
$$;

drop trigger if exists reservation_inventory_changed on public.reservations;
create trigger reservation_inventory_changed
after insert or update or delete on public.reservations
for each statement execute function public.broadcast_equipment_inventory_change();

drop trigger if exists equipment_inventory_changed on public.equipment_inventory;
create trigger equipment_inventory_changed
after insert or update or delete on public.equipment_inventory
for each statement execute function public.broadcast_equipment_inventory_change();

revoke all on function public._minimum_available_quantity(text, date, date) from public, anon, authenticated;
revoke all on function public.get_equipment_availability(date, date, jsonb) from public, anon, authenticated;
revoke all on function public.create_equipment_reservation(text, text, text, date, date, jsonb) from public, anon, authenticated;
grant execute on function public.get_equipment_availability(date, date, jsonb) to anon, authenticated;
grant execute on function public.create_equipment_reservation(text, text, text, date, date, jsonb) to anon, authenticated;
