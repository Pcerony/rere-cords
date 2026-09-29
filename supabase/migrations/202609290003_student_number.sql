alter table public.reservations
    add column student_number text
    constraint reservations_student_number_length
    check (student_number is null or char_length(student_number) between 1 and 40);

alter function public.create_equipment_reservation(text, text, text, date, date, jsonb)
    rename to _create_equipment_reservation_without_student_number;

revoke all on function public._create_equipment_reservation_without_student_number(text, text, text, date, date, jsonb)
    from public, anon, authenticated;

create function public.create_equipment_reservation(
    p_name text,
    p_student_number text,
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
    v_result jsonb;
begin
    if char_length(btrim(coalesce(p_student_number, ''))) not between 1 and 40 then
        raise exception using errcode = '22023', message = 'INVALID_STUDENT_NUMBER';
    end if;

    v_result := public._create_equipment_reservation_without_student_number(
        p_name,
        p_course,
        p_email,
        p_pickup_date,
        p_return_date,
        p_items
    );

    if v_result ->> 'ok' = 'true' then
        update public.reservations
           set student_number = btrim(p_student_number)
         where id = (v_result ->> 'reservation_id')::uuid;
    end if;

    return v_result;
end;
$$;

revoke all on function public.create_equipment_reservation(text, text, text, text, date, date, jsonb)
    from public, anon, authenticated;
grant execute on function public.create_equipment_reservation(text, text, text, text, date, date, jsonb)
    to anon, authenticated;
