import test from 'node:test';
import assert from 'node:assert/strict';
import { createRegistrationAdmin } from '../event-registration-admin.js';

class Node {
    children = [];
    handlers = {};
    textContent = '';
    value = 'all';
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = nodes; }
    replaceWith(node) { this.replacedWith = node; }
    addEventListener(name, handler) { this.handlers[name] = handler; }
}

function setup(t, client) {
    const nodes = new Map();
    globalThis.document = {
        getElementById: (id) => { if (!nodes.has(id)) nodes.set(id, new Node()); return nodes.get(id); },
        createElement: () => new Node()
    };
    t.after(() => { delete globalThis.document; });
    const panel = createRegistrationAdmin(client);
    return { panel, nodes };
}

test('registration panel does not query without its capability', async (t) => {
    let calls = 0;
    const { panel } = setup(t, { from() { calls++; throw Error('must not query'); } });
    await panel.load();
    assert.equal(calls, 0);
});

test('logout discards an in-flight registration response and clears private content', async (t) => {
    let finish;
    const pending = new Promise(resolve => { finish = resolve; });
    const query = { select: () => query, order: () => query, range: () => pending };
    const { panel, nodes } = setup(t, { from: () => query });
    panel.setAuthorized(true);
    const loading = panel.load();
    panel.clear();
    finish({ data: [{ participant_name: 'Must not render' }], count: 1 });
    await loading;
    assert.equal(nodes.get('registration-admin-message').textContent, '');
    assert.equal(nodes.get('registration-page').textContent, '');
    assert.deepEqual(nodes.get('registration-records').children, []);
    assert.equal(nodes.get('registration-admin-dashboard').hidden, true);
});

test('logout discards signed image URLs that arrive afterward', async (t) => {
    let finish;
    const pending = new Promise(resolve => { finish = resolve; });
    const record = { registration_code: 'TEST', work_title: 'Synthetic', created_at: '2026-11-01', event_registration_files: [{ object_path: 'test.png' }] };
    const query = { select: () => query, order: () => query, range: async () => ({ data: [record], count: 1 }) };
    const client = { from: () => query, storage: { from: () => ({ createSignedUrl: () => pending }) } };
    const { panel, nodes } = setup(t, client);
    panel.setAuthorized(true);
    await panel.load();
    const article = nodes.get('registration-records').children[0];
    const imageButton = article.children.find(node => node.className === 'record-photos').children[0];
    const loading = imageButton.handlers.click();
    panel.clear();
    finish({ data: { signedUrl: 'https://example.org/private' } });
    await loading;
    assert.equal(imageButton.replacedWith, undefined);
    assert.deepEqual(nodes.get('registration-records').children, []);
});
