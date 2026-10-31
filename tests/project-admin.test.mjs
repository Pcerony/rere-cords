import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getProjectAdminAccess, resolveAdminTab } from '../project-admin-core.js';

test('each admin capability is checked independently and fails closed', async () => {
    for (const equipment of [false, true]) for (const registrations of [false, true]) {
        const client = { rpc: async (name) => ({ data: name === 'is_reservation_admin' ? equipment : registrations }) };
        assert.deepEqual(await getProjectAdminAccess(client), { equipment, registrations });
    }
    assert.deepEqual(await getProjectAdminAccess({ rpc: async () => { throw Error('offline'); } }), { equipment: false, registrations: false });
    assert.deepEqual(await getProjectAdminAccess({ rpc: async () => ({ data: true, error: Error('denied') }) }), { equipment: false, registrations: false });
    assert.deepEqual(await getProjectAdminAccess({ rpc: async (name) => {
        if (name === 'is_reservation_admin') throw Error('equipment unavailable');
        return { data: true };
    } }), { equipment: false, registrations: true });
});

test('tab selection cannot grant a missing capability', () => {
    assert.equal(resolveAdminTab('registrations', { equipment: true, registrations: true }), 'registrations');
    assert.equal(resolveAdminTab('registrations', { equipment: true, registrations: false }), 'equipment');
    assert.equal(resolveAdminTab('equipment', { equipment: false, registrations: true }), 'registrations');
    assert.equal(resolveAdminTab('anything', { equipment: false, registrations: false }), null);
});

test('one page owns sign-in and both admin panels; old registration link redirects', () => {
    const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    const html = read('safety-tool-admin.html');
    assert.match(html, /role="tablist"/);
    assert.match(html, /id="registration-admin-dashboard"/);
    assert.equal((html.match(/type="password"/g) || []).length, 1);
    assert.match(read('event-registration-admin.html'), /safety-tool-admin.html#registrations/);
    const panel = read('event-registration-admin.js');
    assert.doesNotMatch(panel, /createClient|signInWithPassword|onAuthStateChange|getSession/);
});
