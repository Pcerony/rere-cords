create table if not exists public.reservation_admins (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.reservation_admins enable row level security;
revoke all on table public.reservation_admins from public, anon, authenticated;

create or replace function public.is_reservation_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.reservation_admins admin
        where admin.user_id = auth.uid()
    );
$$;

revoke all on function public.is_reservation_admin() from public, anon, authenticated;
grant execute on function public.is_reservation_admin() to authenticated;

grant select on table public.reservations, public.reservation_items, public.equipment_inventory to authenticated;

drop policy if exists reservation_admins_read_reservations on public.reservations;
create policy reservation_admins_read_reservations
    on public.reservations for select to authenticated
    using (public.is_reservation_admin());

drop policy if exists reservation_admins_read_reservation_items on public.reservation_items;
create policy reservation_admins_read_reservation_items
    on public.reservation_items for select to authenticated
    using (public.is_reservation_admin());

drop policy if exists reservation_admins_read_equipment_inventory on public.equipment_inventory;
create policy reservation_admins_read_equipment_inventory
    on public.equipment_inventory for select to authenticated
    using (public.is_reservation_admin());

create or replace function public.admin_set_reservation_status(
    p_reservation_id uuid,
    p_status text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_previous_status text;
begin
    if not public.is_reservation_admin() then
        raise exception 'Administrator access required' using errcode = '42501';
    end if;

    if p_status is null or p_status not in ('ready', 'cancelled', 'returned') then
        raise exception 'Invalid reservation status' using errcode = '22023';
    end if;

    select reservation.status
      into v_previous_status
      from public.reservations reservation
     where reservation.id = p_reservation_id
     for update;

    if not found then
        raise exception 'Reservation not found' using errcode = 'P0002';
    end if;

    if not (
        (v_previous_status = 'pending' and p_status in ('ready', 'cancelled'))
        or (v_previous_status = 'ready' and p_status in ('cancelled', 'returned'))
    ) then
        raise exception 'Invalid reservation status transition' using errcode = '22023';
    end if;

    update public.reservations
       set status = p_status,
           updated_at = now()
     where id = p_reservation_id;

    return jsonb_build_object('ok', true, 'status', p_status);
end;
$$;

revoke all on function public.admin_set_reservation_status(uuid, text) from public, anon, authenticated;
grant execute on function public.admin_set_reservation_status(uuid, text) to authenticated;
