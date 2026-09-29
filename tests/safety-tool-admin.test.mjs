import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildNotificationMailto, filterReservations, formatReservationItems, getAdminCopy, getStatusActions, setReservationStatus } from '../safety-tool-admin.js';

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
    assert.deepEqual(formatReservationItems(reservation.reservation_items, 'en'), ['Cutter × 1', 'Safety gloves × 2']);
});

test('admin interface provides complete Chinese and English copy', () => {
    const english = getAdminCopy('en');
    assert.equal(english.page_title, 'Safety Tool Reservations');
    assert.equal(english.status_ready, 'Placed and notified');
    assert.equal(english.notification_draft, 'Open Japanese / English email draft');
    assert.equal(getAdminCopy('unknown').page_title, '安全道具预约管理');
});

test('notification draft opens the participant email with Japanese and English reservation details', () => {
    const mailto = buildNotificationMailto({
        ...reservation,
        participant_name: '山田',
        reservation_items: [
            ...reservation.reservation_items,
            { equipment_id: 'goggles', quantity: 1 },
            { equipment_id: 'mask', quantity: 2 }
        ]
    });
    assert.match(mailto, /^mailto:example@example\.org\?/);
    const params = new URLSearchParams(mailto.split('?')[1]);
    assert.equal(params.get('subject'), '安全用具の準備ができました / Safety tools are ready [RRC-20260929-ABCDE123]');
    const body = params.get('body');
    for (const text of [
        '山田', '予約番号：RRC-20260929-ABCDE123', 'カッター × 1', '保護メガネ × 1', '防じんマスク × 2', '安全手袋 × 2',
        '受取日：2026-10-02', '返却期限：2026-10-04', '7号館2階 MEDIA STUDIO 前の小さなボックス',
        'Dear 山田,', 'Reservation: RRC-20260929-ABCDE123', 'Cutter × 1', 'Safety goggles × 1', 'Dust mask × 2', 'Safety gloves × 2',
        'Pickup date: 2026-10-02', 'Return by: 2026-10-04', 'Small box in front of MEDIA STUDIO, Building 7, 2F'
    ]) {
        assert.ok(body.includes(text), `email draft must include ${text}`);
    }
});

test('notification draft rejects an invalid recipient and strips header breaks from names', () => {
    const invalid = buildNotificationMailto({ ...reservation, email: 'bad\r\nBcc:attacker@example.org' });
    assert.equal(invalid, null);
    const mailto = buildNotificationMailto({ ...reservation, participant_name: 'Aki\r\nBcc:attacker@example.org' });
    const body = new URLSearchParams(mailto.split('?')[1]).get('body');
    assert.doesNotMatch(body, /\r\nBcc:/);
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
    assert.match(page, /safety-tool-admin\.js\?v=3/);
    assert.match(page, /id="admin-language"/);
    assert.match(page, /value="en">English/);
    assert.match(script, /打开日英通知邮件草稿/);
    assert.match(script, /确认已放置并已通知/);
});
