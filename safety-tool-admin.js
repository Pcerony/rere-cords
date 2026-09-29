const EQUIPMENT_NAMES = Object.freeze({
    cutter: '小刀',
    goggles: '护目镜',
    mask: '口罩',
    gloves: '安全手套'
});

const EQUIPMENT_NAMES_JA = Object.freeze({
    cutter: 'カッター',
    goggles: '保護メガネ',
    mask: '防じんマスク',
    gloves: '安全手袋'
});

const EQUIPMENT_NAMES_EN = Object.freeze({
    cutter: 'Cutter',
    goggles: 'Safety goggles',
    mask: 'Dust mask',
    gloves: 'Safety gloves'
});

const STATUS_LABELS = Object.freeze({
    pending: '待处理',
    ready: '已放置并已通知',
    cancelled: '已取消',
    returned: '已归还'
});

const STATUS_ACTIONS = Object.freeze({
    pending: ['ready', 'cancelled'],
    ready: ['cancelled', 'returned'],
    cancelled: [],
    returned: []
});

const ACTION_LABELS = Object.freeze({
    ready: '确认已放置并已通知',
    cancelled: '取消预约',
    returned: '确认已归还'
});

function safeMailText(value) {
    return String(value ?? '').replace(/[\r\n\t]+/g, ' ').trim();
}

function formatMailItems(items = [], names) {
    return items.map(({ equipment_id: id, quantity }) => `- ${names[id] || safeMailText(id)} × ${quantity}`);
}

export function buildNotificationMailto(reservation) {
    const email = safeMailText(reservation.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

    const name = safeMailText(reservation.participant_name);
    const code = safeMailText(reservation.reservation_code);
    const japaneseItems = formatMailItems(reservation.reservation_items, EQUIPMENT_NAMES_JA);
    const englishItems = formatMailItems(reservation.reservation_items, EQUIPMENT_NAMES_EN);
    const subject = `安全用具の準備ができました / Safety tools are ready [${code}]`;
    const body = [
        `${name} 様`,
        '',
        'RERE-CORDSの安全用具をご予約いただき、ありがとうございます。',
        'ご予約の用具を、7号館2階 MEDIA STUDIO 前の小さなボックスに設置しました。',
        '',
        `予約番号：${code}`,
        '用具：',
        ...japaneseItems,
        `受取日：${safeMailText(reservation.pickup_date)}`,
        `返却期限：${safeMailText(reservation.return_date)}`,
        '受取場所：7号館2階 MEDIA STUDIO 前の小さなボックス',
        'このメールを受信後にお受け取りください。必ず返却期限までにご返却ください。',
        '',
        '--- English ---',
        `Dear ${name},`,
        '',
        'Thank you for reserving safety tools from RERE-CORDS.',
        'Your reserved tools have been placed in the small box in front of MEDIA STUDIO, Building 7, 2F.',
        '',
        `Reservation: ${code}`,
        'Equipment:',
        ...englishItems,
        `Pickup date: ${safeMailText(reservation.pickup_date)}`,
        `Return by: ${safeMailText(reservation.return_date)}`,
        'Pickup location: Small box in front of MEDIA STUDIO, Building 7, 2F',
        'Please pick up the tools after receiving this email and return them by the date above.'
    ].join('\r\n');

    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formatReservationItems(items = []) {
    return items.map(({ equipment_id: id, quantity }) => `${EQUIPMENT_NAMES[id] || id} × ${quantity}`);
}

export function filterReservations(reservations, status = 'all') {
    return status === 'all' ? [...reservations] : reservations.filter((reservation) => reservation.status === status);
}

export function getStatusActions(status) {
    return [...(STATUS_ACTIONS[status] || [])];
}

export async function setReservationStatus(client, reservation, status) {
    if (!getStatusActions(reservation.status).includes(status)) return { ok: false, error: new Error('Invalid status transition') };
    try {
        const { data, error } = await client.rpc('admin_set_reservation_status', {
            p_reservation_id: reservation.id,
            p_status: status
        });
        if (error || data?.ok !== true || data.status !== status) return { ok: false, error: error || new Error('Unexpected status response') };
        return { ok: true, status };
    } catch (error) {
        return { ok: false, error };
    }
}

function initializeAdminPage() {
    const loginForm = document.getElementById('admin-login-form');
    if (!loginForm) return;

    const config = window.RERE_CORDS_RESERVATION_CONFIG || {};
    const client = window.supabase?.createClient && config.supabaseUrl && config.publishableKey
        ? window.supabase.createClient(config.supabaseUrl, config.publishableKey)
        : null;
    const loginSection = document.getElementById('admin-login-section');
    const dashboard = document.getElementById('admin-dashboard');
    const loginMessage = document.getElementById('admin-login-message');
    const dashboardMessage = document.getElementById('admin-dashboard-message');
    const loginButton = document.getElementById('admin-login-submit');
    const list = document.getElementById('reservation-list');
    const filter = document.getElementById('reservation-filter');
    let reservations = [];
    let refreshTimer;

    function setMessage(target, message, state = '') {
        target.textContent = message;
        if (state) target.dataset.state = state;
        else delete target.dataset.state;
    }

    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function appendDetail(details, label, value) {
        const wrapper = node('div', 'admin-detail');
        wrapper.append(node('dt', '', label), node('dd', '', value));
        details.append(wrapper);
    }

    function renderReservation(reservation) {
        const article = node('article', 'admin-reservation');
        const header = node('div', 'admin-reservation-heading');
        header.append(node('h3', '', reservation.reservation_code));
        header.append(node('span', `admin-status admin-status-${reservation.status}`, STATUS_LABELS[reservation.status] || reservation.status));
        article.append(header);

        const details = node('dl', 'admin-details');
        appendDetail(details, '姓名', reservation.participant_name);
        appendDetail(details, '课程／专业', reservation.course);
        const emailDetail = node('div', 'admin-detail');
        emailDetail.append(node('dt', '', '邮箱'), node('dd', ''));
        const emailValue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservation.email)
            ? node('a', '', reservation.email)
            : document.createTextNode(reservation.email);
        if (emailValue instanceof HTMLAnchorElement) emailValue.href = `mailto:${reservation.email}`;
        emailDetail.querySelector('dd').append(emailValue);
        details.append(emailDetail);
        appendDetail(details, '领取日期', reservation.pickup_date);
        appendDetail(details, '必须归还日期', reservation.return_date);
        article.append(details);

        const itemSection = node('div', 'admin-items');
        itemSection.append(node('h4', '', '预约道具'));
        const items = node('ul', '');
        for (const item of formatReservationItems(reservation.reservation_items)) items.append(node('li', '', item));
        itemSection.append(items);
        article.append(itemSection);

        const actions = getStatusActions(reservation.status);
        if (actions.length) {
            const actionBar = node('div', 'admin-actions');
            if (reservation.status === 'pending') {
                const draftButton = node('button', 'admin-action admin-action-secondary', '打开日英通知邮件草稿');
                draftButton.type = 'button';
                draftButton.addEventListener('click', () => {
                    const mailto = buildNotificationMailto(reservation);
                    if (!mailto) {
                        setMessage(dashboardMessage, '参与者邮箱格式无效，无法创建邮件草稿。', 'error');
                        return;
                    }
                    setMessage(dashboardMessage, `已请求默认邮件应用打开预约 ${reservation.reservation_code} 的日英草稿。请检查发件账户、收件人和内容并手动发送；发送后再确认「已放置并已通知」。`);
                    window.location.href = mailto;
                });
                actionBar.append(draftButton);
            }
            for (const status of actions) {
                const button = node('button', status === 'cancelled' ? 'admin-action admin-action-secondary' : 'admin-action', ACTION_LABELS[status]);
                button.type = 'button';
                button.addEventListener('click', () => updateStatus(reservation, status, button));
                actionBar.append(button);
            }
            article.append(actionBar);
        }
        return article;
    }

    function renderReservations() {
        list.replaceChildren();
        const visible = filterReservations(reservations, filter.value);
        for (const reservation of visible) list.append(renderReservation(reservation));
        if (!visible.length) list.append(node('p', 'admin-empty', reservations.length ? '此状态下没有预约。' : '目前没有预约记录。'));
    }

    async function loadReservations() {
        if (!client) return;
        setMessage(dashboardMessage, '正在读取预约…');
        try {
            const { data, error } = await client
                .from('reservations')
                .select('id,reservation_code,participant_name,course,email,pickup_date,return_date,status,created_at,reservation_items(equipment_id,quantity)')
                .order('created_at', { ascending: false });
            if (error) throw error;
            reservations = data || [];
            renderReservations();
            setMessage(dashboardMessage, `已载入 ${reservations.length} 笔预约。`);
        } catch {
            setMessage(dashboardMessage, '读取失败。请确认已执行管理员数据库迁移，并检查网络后重试。', 'error');
        }
    }

    async function enterDashboard(session) {
        if (!session) {
            loginSection.hidden = false;
            dashboard.hidden = true;
            reservations = [];
            list.replaceChildren();
            if (refreshTimer) window.clearInterval(refreshTimer);
            refreshTimer = undefined;
            return;
        }
        loginSection.hidden = true;
        dashboard.hidden = false;
        setMessage(dashboardMessage, '正在验证管理员权限…');
        try {
            const { data: isAdmin, error } = await client.rpc('is_reservation_admin');
            if (error || isAdmin !== true) throw error || new Error('Not an administrator');
        } catch {
            await client.auth.signOut();
            await enterDashboard(null);
            setMessage(loginMessage, '此账号尚未获得管理员权限，请联系项目管理员。', 'error');
            return;
        }
        await loadReservations();
        if (!refreshTimer) refreshTimer = window.setInterval(loadReservations, 30000);
    }

    async function updateStatus(reservation, status, button) {
        const prompt = status === 'ready'
            ? `确认 ${reservation.reservation_code} 的道具已放入领取盒，且日英通知邮件已发送？`
            : status === 'cancelled'
                ? `确认取消预约 ${reservation.reservation_code}？取消后库存会重新开放。`
                : `确认预约 ${reservation.reservation_code} 的道具已经归还？`;
        if (!window.confirm(prompt)) return;
        button.disabled = true;
        setMessage(dashboardMessage, '正在更新预约状态…');
        const result = await setReservationStatus(client, reservation, status);
        if (!result.ok) {
            button.disabled = false;
            setMessage(dashboardMessage, '状态更新失败，记录未确认变更。请刷新后重试。', 'error');
            return;
        }
        setMessage(dashboardMessage, `预约 ${reservation.reservation_code} 已更新为「${STATUS_LABELS[status]}」。`, 'success');
        await loadReservations();
    }

    if (!client) {
        setMessage(loginMessage, '管理页面尚未连接 Supabase，请联系网站管理员。', 'error');
        loginButton.disabled = true;
    }

    client?.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') window.setTimeout(() => enterDashboard(null), 0);
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!client) return;
        loginButton.disabled = true;
        setMessage(loginMessage, '正在登录…');
        const form = new FormData(loginForm);
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: String(form.get('email') || '').trim(),
                password: String(form.get('password') || '')
            });
            if (error) throw error;
            await enterDashboard(data.session);
        } catch {
            setMessage(loginMessage, '登录失败，请检查邮箱和密码。', 'error');
        } finally {
            loginButton.disabled = false;
        }
    });

    document.getElementById('admin-sign-out').addEventListener('click', async () => {
        const { error } = await client.auth.signOut();
        if (error) setMessage(dashboardMessage, '退出登录失败，请重试。', 'error');
        else await enterDashboard(null);
    });

    document.getElementById('admin-refresh').addEventListener('click', loadReservations);
    filter.addEventListener('change', renderReservations);
    window.addEventListener('focus', () => {
        if (!dashboard.hidden) loadReservations();
    });

    client?.auth.getSession()
        .then(({ data, error }) => {
            if (error) setMessage(loginMessage, '无法读取登录状态，请刷新页面后重试。', 'error');
            else enterDashboard(data.session);
        })
        .catch(() => setMessage(loginMessage, '无法读取登录状态，请刷新页面后重试。', 'error'));
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeAdminPage, { once: true });
}
