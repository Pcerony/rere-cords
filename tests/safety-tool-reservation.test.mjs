import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildAvailabilityRequest, buildReservationRequest, getMinimumPickupDate, isPublicSupabaseKey, submitReservation, validateReservation } from '../safety-tool-reservation.js';

const page = readFileSync(new URL('../safety-tool-reservation.html', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../safety-tool-reservation.css', import.meta.url), 'utf8');
const script = readFileSync(new URL('../safety-tool-reservation.js', import.meta.url), 'utf8');

test('reservation page defaults to the main website language and removes redundant copy', () => {
    assert.match(page, /<html lang="en"/);
    assert.match(page, /<option value="en" selected>/);
    assert.match(page, /safety-tool-reservation\.css\?v=3/);
    assert.match(page, /safety-tool-reservation\.js\?v=3/);
    assert.doesNotMatch(page, /MEDIA STUDIO<\/span>|请至少提前三天申请|请务必在所选日期前归还|最早领取日期/);
    assert.match(styles, /\.reservation-intro\s*\{[^}]*padding:\s*0;/s);
    assert.match(styles, /\.reservation-intro\s*\{[^}]*border:\s*0;/s);
    assert.match(script, /: 'en';/);
});

const validForm = {
    name: 'Aki Sato',
    studentNumber: 'A12345678',
    course: 'Design',
    email: 'aki@example.jp',
    pickupDate: '2026-10-01',
    returnDate: '2026-10-02',
    items: { cutter: 1, goggles: 2 }
};

test('minimum pickup date is the third calendar day after submission', () => {
    assert.equal(getMinimumPickupDate('2026-09-28'), '2026-10-01');
});

test('valid reservation is accepted when pickup is at least three days away', () => {
    assert.deepEqual(validateReservation(validForm, '2026-09-28'), []);
});

test('reservation validation rejects pickup sooner than three days', () => {
    assert.ok(validateReservation({ ...validForm, pickupDate: '2026-09-30' }, '2026-09-28').includes('pickup_too_soon'));
});

test('reservation validation rejects return date before pickup date', () => {
    assert.ok(validateReservation({ ...validForm, returnDate: '2026-09-30' }, '2026-09-28').includes('return_before_pickup'));
});

test('reservation validation limits the booking horizon and loan duration', () => {
    assert.ok(validateReservation({ ...validForm, pickupDate: '2027-10-02', returnDate: '2027-10-03' }, '2026-09-28').includes('pickup_too_far'));
    assert.ok(validateReservation({ ...validForm, returnDate: '2026-10-16' }, '2026-09-28').includes('loan_too_long'));
});

test('reservation validation requires an equipment type and valid quantities', () => {
    assert.ok(validateReservation({ ...validForm, items: {} }, '2026-09-28').includes('items_required'));
    assert.ok(validateReservation({ ...validForm, items: { cutter: 3 } }, '2026-09-28').includes('invalid_quantity'));
    assert.ok(validateReservation({ ...validForm, items: { unknown: 1 } }, '2026-09-28').includes('invalid_item'));
});

test('reservation validation requires participant details and a valid email', () => {
    assert.ok(validateReservation({ ...validForm, name: ' ' }, '2026-09-28').includes('name_required'));
    assert.ok(validateReservation({ ...validForm, studentNumber: ' ' }, '2026-09-28').includes('student_number_required'));
    assert.ok(validateReservation({ ...validForm, studentNumber: 'A'.repeat(41) }, '2026-09-28').includes('student_number_required'));
    assert.ok(validateReservation({ ...validForm, course: '' }, '2026-09-28').includes('course_required'));
    assert.ok(validateReservation({ ...validForm, email: 'not-an-email' }, '2026-09-28').includes('email_invalid'));
});

test('availability requests send only selected item quantities and the chosen date range', () => {
    assert.deepEqual(buildAvailabilityRequest(validForm), {
        p_pickup_date: '2026-10-01',
        p_return_date: '2026-10-02',
        p_items: { cutter: 1, goggles: 2 }
    });
});

test('reservation RPC payload trims participant details without changing selected quantities', () => {
    assert.deepEqual(buildReservationRequest({ ...validForm, name: ' Aki ', email: ' Aki@Example.jp ' }), {
        p_name: 'Aki',
        p_student_number: 'A12345678',
        p_course: 'Design',
        p_email: 'Aki@Example.jp',
        p_pickup_date: '2026-10-01',
        p_return_date: '2026-10-02',
        p_items: { cutter: 1, goggles: 2 }
    });
});

test('reservation submission returns pending confirmation and never treats an RPC error as success', async () => {
    let invoked = false;
    const client = { rpc: async (name, args) => {
        invoked = name === 'create_equipment_reservation' && args.p_items.cutter === 1;
        return { data: { ok: true, reservation_code: 'RRC-20260928-ABCD1234', status: 'pending' }, error: null };
    } };
    const result = await submitReservation(client, validForm, '2026-09-28');
    assert.equal(invoked, true);
    assert.equal(result.ok, true);
    assert.equal(result.status, 'pending');

    const failed = await submitReservation({ rpc: async () => ({ data: null, error: new Error('offline') }) }, validForm, '2026-09-28');
    assert.equal(failed.ok, false);
    assert.equal(failed.code, 'NETWORK');
});

test('Supabase configuration accepts publishable or anon keys but rejects service-role JWTs', () => {
    const jwt = (role) => `header.${Buffer.from(JSON.stringify({ role })).toString('base64url')}.signature`;
    assert.equal(isPublicSupabaseKey('sb_publishable_project-key'), true);
    assert.equal(isPublicSupabaseKey(jwt('anon')), true);
    assert.equal(isPublicSupabaseKey(jwt('service_role')), false);
    assert.equal(isPublicSupabaseKey('sb_secret_project-key'), false);
});
