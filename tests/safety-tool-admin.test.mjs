import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { filterReservations, formatReservationItems, getStatusActions, setReservationStatus } from '../safety-tool-admin.js';

const page = readFileSync(new URL('../safety-tool-admin.html', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../safety-tool-admin.css', import.meta.url), 'utf8');

const reservation = {
    id: 'record-1', reservation_code: 'RRC-20260929-ABCDE123', participant_name: 'Example',
    course: 'Media Design', email: 'example@example.org', pickup_date: '2026-10-02',
    return_date: '2026-10-04', status: 'pending',
    reservation_items: [{ equipment_id: 'cutter', quantity: 1 }, { equipment_id: 'gloves', quantity: 2 }]
};

test('admin page shows translated equipment names and quantities', () => {
    assert.deepEqual(formatReservationItems(reservation.reservation_items), ['小刀 × 1', '安全手套 × 2']);
});

test('reservation filters include all or only the selected status', () => {
    assert.equal(filterReservations([reservation], 'all').length, 1);
    assert.equal(filterReservations([reservation, { ...reservation, id: 'record-2', status: 'ready' }], 'pending').length, 1);
    assert.equal(filterReservations([reservation], 'returned').length, 0);
});

test('status actions reflect valid workflow transitions', () => {
    assert.deepEqual(getStatusActions('pending'), ['ready', 'cancelled']);
    assert.deepEqual(getStatusActions('ready'), ['cancelled', 'returned']);
    assert.deepEqual(getStatusActions('cancelled'), []);
    assert.deepEqual(getStatusActions('returned'), []);
});

test('status changes return errors instead of claiming success', async () => {
    const failure = await setReservationStatus({ rpc: async () => ({ error: new Error('offline') }) }, reservation, 'ready');
    assert.equal(failure.ok, false);
    const success = await setReservationStatus({ rpc: async () => ({ data: { ok: true, status: 'ready' }, error: null }) }, reservation, 'ready');
    assert.deepEqual(success, { ok: true, status: 'ready' });
});

test('admin page contains an accessible sign-in and reservation list, without public sign-up', () => {
    for (const phrase of ['viewport', 'admin-login-form', 'admin-dashboard', 'reservation-list', 'aria-live', 'safety-tool-admin.css']) {
        assert.ok(page.includes(phrase), `admin page must include ${phrase}`);
    }
    assert.doesNotMatch(page, /sign.?up|注册/i);
    const script = readFileSync(new URL('../safety-tool-admin.js', import.meta.url), 'utf8');
    assert.doesNotMatch(`${page}\n${script}`, /service_role|sb_secret_/i);
    assert.match(styles, /@media\s*\(max-width:\s*700px\)/);
});
