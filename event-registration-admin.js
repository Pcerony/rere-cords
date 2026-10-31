function initializeRegistrationAdmin() {
    const form = document.getElementById('registration-admin-login');
    if (!form) return;
    const dashboard = document.getElementById('registration-admin-dashboard');
    const message = document.getElementById('admin-message');
    const records = document.getElementById('registration-records');
    const filter = document.getElementById('registration-filter');
    const previous = document.getElementById('registration-prev');
    const next = document.getElementById('registration-next');
    const config = window.RERE_CORDS_RESERVATION_CONFIG || {};
    const client = config.supabaseUrl && config.publishableKey && window.supabase?.createClient(config.supabaseUrl, config.publishableKey, { auth: { storageKey: 'rerecords-registration-admin-auth' } });
    let page = 0;
    let generation = 0;
    const pageSize = 25;
    const say = (text) => { message.textContent = text; };
    function clear() {
        generation++;
        dashboard.hidden = true;
        form.hidden = false;
        records.replaceChildren();
        page = 0;
    }
    const element = (tag, text, className) => {
        const node = document.createElement(tag);
        if (text !== undefined) node.textContent = text;
        if (className) node.className = className;
        return node;
    };
    function render(record) {
        const article = element('article', undefined, 'registration-record');
        article.append(element('span', record.registration_code, 'record-code'), element('h2', record.work_title), element('p', record.physical_received ? '已核对实体作品' : '待核对实体作品', 'record-status'));
        const list = document.createElement('dl');
        const salon = { yes: '参加', no: '不参加', undecided: '尚未决定' };
        for (const [label, value] of [
            ['姓名', record.participant_name], ['邮箱', record.email], ['作品简介', record.description],
            ['沙龙意向', salon[record.salon] || '未填写'], ['专业／所属', record.major], ['学年', record.academic_year],
            ['出身地／地区', record.origin_region], ['补充说明', record.supplement], ['报名时间', new Date(record.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Tokyo' }) + ' JST']
        ]) { if (value) list.append(element('dt', label), element('dd', value)); }
        if (record.video_url) {
            try {
                const url = new URL(record.video_url);
                if (['https:', 'http:'].includes(url.protocol) && !url.username && !url.password) {
                    const link = element('a', record.video_url);
                    link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
                    const item = document.createElement('dd'); item.append(link);
                    list.append(element('dt', '视频链接'), item);
                }
            } catch { /* Untrusted legacy links must not become executable anchors. */ }
        }
        article.append(list);
        const photos = element('div', undefined, 'record-photos');
        for (const [index, file] of (record.event_registration_files || []).entries()) {
            const button = element('button', `查看图片 ${index + 1}`, 'admin-button secondary');
            button.type = 'button';
            button.addEventListener('click', async () => {
                button.disabled = true;
                try {
                    const { data, error } = await client.storage.from('event-registration-photos').createSignedUrl(file.object_path, 300);
                    if (error || !data?.signedUrl) throw error;
                    const link = element('a', `打开图片 ${index + 1}（5分钟内有效）`);
                    link.href = data.signedUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
                    button.replaceWith(link);
                } catch { say('图片读取失败，请检查权限或重试。'); button.disabled = false; }
            });
            photos.append(button);
        }
        article.append(photos);
        const actions = element('div', undefined, 'admin-toolbar');
        const toggle = element('button', record.physical_received ? '撤销实体核对' : '确认已核对实体作品', 'admin-button');
        toggle.type = 'button';
        toggle.addEventListener('click', async () => {
            if (!window.confirm(`确认${record.physical_received ? '撤销核对' : '已核对实体作品'}：${record.work_title}？`)) return;
            toggle.disabled = true;
            const { error } = await client.rpc('admin_set_event_physical_received', { p_id: record.id, p_received: !record.physical_received });
            if (error) { say('更新未确认，请刷新后重试。'); toggle.disabled = false; }
            else await load();
        });
        actions.append(toggle); article.append(actions);
        return article;
    }
    async function load() {
        const current = ++generation;
        say('正在读取报名资料…');
        previous.disabled = true; next.disabled = true;
        let query = client.from('event_registrations').select('*, event_registration_files(*)', { count: 'exact' }).order('created_at', { ascending: false }).order('id');
        if (filter.value !== 'all') query = query.eq('physical_received', filter.value === 'received');
        try {
            const { data, error, count } = await query.range(page * pageSize, (page + 1) * pageSize - 1);
            if (current !== generation) return;
            if (error) throw error;
            records.replaceChildren(...data.map(render));
            say(data.length ? `共 ${count} 条报名。` : '暂无符合条件的报名。');
            document.getElementById('registration-page').textContent = `第 ${page + 1} / ${Math.max(1, Math.ceil(count / pageSize))} 页`;
            previous.disabled = page === 0;
            next.disabled = (page + 1) * pageSize >= count;
        } catch {
            if (current !== generation) return;
            records.replaceChildren();
            say('读取失败。请确认报名迁移、管理员权限和网络连接后刷新。');
        }
    }
    async function enter(session) {
        clear();
        if (!session) return;
        const current = generation;
        say('正在验证报名管理权限…');
        try {
            const { data, error } = await client.rpc('is_event_registration_admin');
            if (current !== generation) return;
            if (error || data !== true) { say('此账号没有作品报名管理权限。安全用具管理员不会自动获得该权限。'); return; }
            form.hidden = true; dashboard.hidden = false;
            await load();
        } catch { say('无法验证权限，请重新登录。'); }
    }
    if (!client) { say('尚未连接 Supabase。'); form.querySelector('button').disabled = true; return; }
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button'); button.disabled = true;
        try {
            const { data, error } = await client.auth.signInWithPassword({ email: form.elements.email.value.trim(), password: form.elements.password.value });
            if (error) throw error;
            form.elements.password.value = '';
            await enter(data.session);
        } catch { say('登录失败，请检查账号和密码。'); }
        finally { button.disabled = false; }
    });
    client.auth.onAuthStateChange((event) => { if (event === 'SIGNED_OUT') clear(); });
    document.getElementById('registration-signout').addEventListener('click', async () => {
        const { error } = await client.auth.signOut();
        if (error) say('退出失败，请重试。'); else { clear(); say('已退出。'); }
    });
    document.getElementById('registration-refresh').addEventListener('click', load);
    filter.addEventListener('change', () => { page = 0; load(); });
    previous.addEventListener('click', () => { if (page > 0) { page--; load(); } });
    next.addEventListener('click', () => { page++; load(); });
    client.auth.getSession().then(({ data, error }) => { if (error) say('无法读取登录状态。'); else enter(data.session); }).catch(() => say('无法读取登录状态。'));
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initializeRegistrationAdmin, { once: true });
    else initializeRegistrationAdmin();
}
