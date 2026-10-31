import { createRegistrationAdmin } from './event-registration-admin.js?v=2';
import { getProjectAdminAccess, resolveAdminTab } from './project-admin-core.js?v=1';

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

const STATUS_ACTIONS = Object.freeze({
    pending: ['ready', 'cancelled'],
    ready: ['cancelled', 'returned'],
    cancelled: [],
    returned: []
});

const ADMIN_COPY = Object.freeze({
    zh: Object.freeze({
        workspace_title: '项目后台管理', equipment_tab: '安全用具预约', registrations_tab: '作品报名',
        page_title: '安全道具预约管理', internal: '内部管理', page_intro: '先实地放置道具；检查电脑默认邮件应用的发件账户，再打开日英草稿并手动发送。完成后回到这里确认「已放置并已通知」。',
        language: '语言', login_heading: '管理员登录', email: '邮箱', password: '密码', login: '登录', reservations: '预约记录', status: '状态',
        all_statuses: '全部状态', status_pending: '待处理', status_ready: '已放置并已通知', status_cancelled: '已取消', status_returned: '已归还',
        refresh: '刷新', sign_out: '退出登录', back: '返回网站', name: '姓名', student_number: '学号', course: '课程／专业', pickup_date: '领取日期', return_date: '必须归还日期',
        items: '预约道具', notification_draft: '打开日英通知邮件草稿', action_ready: '确认已放置并已通知', action_cancelled: '取消预约', action_returned: '确认已归还',
        empty_filtered: '此状态下没有预约。', empty: '目前没有预约记录。', loading: '正在读取预约…', loaded: '已载入 {{count}} 笔预约。',
        load_error: '读取失败。请确认已执行管理员数据库迁移，并检查网络后重试。', checking_admin: '正在验证管理员权限…',
        no_admin: '此账号尚未获得管理员权限，请联系项目管理员。', bad_email: '参与者邮箱格式无效，无法创建邮件草稿。',
        draft_opened: '已请求默认邮件应用打开预约 {{code}} 的日英草稿。请检查发件账户、收件人和内容并手动发送；发送后再确认「已放置并已通知」。',
        confirm_ready: '确认 {{code}} 的道具已放入领取盒，且日英通知邮件已发送？', confirm_cancel: '确认取消预约 {{code}}？取消后库存会重新开放。',
        confirm_returned: '确认预约 {{code}} 的道具已经归还？', updating: '正在更新预约状态…', update_error: '状态更新失败，记录未确认变更。请刷新后重试。',
        updated: '预约 {{code}} 已更新为「{{status}}」。', not_connected: '管理页面尚未连接 Supabase，请联系网站管理员。', logging_in: '正在登录…',
        login_error: '登录失败，请检查邮箱和密码。', sign_out_error: '退出登录失败，请重试。', session_error: '无法读取登录状态，请刷新页面后重试。'
    }),
    en: Object.freeze({
        workspace_title: 'Project Administration', equipment_tab: 'Safety Tool Reservations', registrations_tab: 'Work Registrations',
        page_title: 'Safety Tool Reservations', internal: 'Admin', page_intro: 'Place the tools in person first. Check the sender account in your default email app, then open and send the Japanese / English draft. Return here afterward to confirm that the tools are placed and the participant has been notified.',
        language: 'Language', login_heading: 'Administrator sign in', email: 'Email', password: 'Password', login: 'Sign in', reservations: 'Reservations', status: 'Status',
        all_statuses: 'All statuses', status_pending: 'Pending', status_ready: 'Placed and notified', status_cancelled: 'Cancelled', status_returned: 'Returned',
        refresh: 'Refresh', sign_out: 'Sign out', back: 'Back to website', name: 'Name', student_number: 'Student number', course: 'Course / major', pickup_date: 'Pickup date', return_date: 'Return by',
        items: 'Reserved equipment', notification_draft: 'Open Japanese / English email draft', action_ready: 'Confirm placed and notified', action_cancelled: 'Cancel reservation', action_returned: 'Confirm returned',
        empty_filtered: 'No reservations with this status.', empty: 'There are no reservations yet.', loading: 'Loading reservations…', loaded: 'Loaded {{count}} reservation(s).',
        load_error: 'Could not load reservations. Confirm the admin database migration has been run, then check your connection and try again.', checking_admin: 'Verifying administrator access…',
        no_admin: 'This account is not an administrator. Contact the project administrator.', bad_email: 'The participant email address is invalid. The draft could not be created.',
        draft_opened: 'Requested the default email app to open the Japanese / English draft for reservation {{code}}. Check the sender account, recipient, and content, then send it manually. After sending, confirm “Placed and notified” here.',
        confirm_ready: 'Confirm the tools for {{code}} are in the pickup box and the Japanese / English notification email has been sent?', confirm_cancel: 'Cancel reservation {{code}}? Its inventory will become available again.',
        confirm_returned: 'Confirm the tools for reservation {{code}} have been returned?', updating: 'Updating reservation status…', update_error: 'Could not update the status. No change was confirmed. Refresh and try again.',
        updated: 'Reservation {{code}} updated to “{{status}}”.', not_connected: 'Supabase is not connected to this admin page. Contact the website administrator.', logging_in: 'Signing in…',
        login_error: 'Sign-in failed. Check your email and password.', sign_out_error: 'Could not sign out. Try again.', session_error: 'Could not read the sign-in status. Refresh the page and try again.'
    })
});

export function getAdminCopy(locale = 'zh') {
    return ADMIN_COPY[locale] || ADMIN_COPY.zh;
}

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

export function formatReservationItems(items = [], locale = 'zh') {
    const names = locale === 'en' ? EQUIPMENT_NAMES_EN : EQUIPMENT_NAMES;
    return items.map(({ equipment_id: id, quantity }) => `${names[id] || id} × ${quantity}`);
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
    const languageSelect = document.getElementById('admin-language');
    const workspace = document.getElementById('project-admin-dashboard');
    const workspaceMessage = document.getElementById('project-admin-message');
    const equipmentTab = document.getElementById('equipment-tab');
    const registrationsTab = document.getElementById('registrations-tab');
    const registrationDashboard = document.getElementById('registration-admin-dashboard');
    const registrationAdmin = createRegistrationAdmin(client);
    let access = { equipment: false, registrations: false };
    let generation = 0;
    let activeTab = null;
    let currentUserId = null;
    let locale = localStorage.getItem('rere_cords_admin_lang') || (localStorage.getItem('rere_cords_lang') === 'en' ? 'en' : 'zh');
    let reservations = [];
    let refreshTimer;

    function translate(key, values = {}) {
        return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{{${name}}}`, value), getAdminCopy(locale)[key] || key);
    }

    function setMessage(target, key, state = '', values = {}) {
        target.dataset.messageKey = key;
        target.dataset.messageValues = JSON.stringify(values);
        target.textContent = translate(key, values);
        if (state) target.dataset.state = state;
        else delete target.dataset.state;
    }

    function applyLanguage() {
        const copy = getAdminCopy(locale);
        document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
        document.title = `${copy.workspace_title} | RERE-CORDS`;
        document.querySelectorAll('[data-admin-copy]').forEach((element) => {
            element.textContent = copy[element.dataset.adminCopy];
        });
        document.getElementById('admin-language').setAttribute('aria-label', copy.language);
        document.getElementById('admin-refresh').setAttribute('aria-label', copy.refresh);
        for (const option of filter.options) option.textContent = copy[option.dataset.adminCopy];
        for (const message of [loginMessage, dashboardMessage, workspaceMessage]) {
            if (message.dataset.messageKey) {
                setMessage(message, message.dataset.messageKey, message.dataset.state, JSON.parse(message.dataset.messageValues || '{}'));
            }
        }
        languageSelect.value = locale;
        renderReservations();
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
        header.append(node('span', `admin-status admin-status-${reservation.status}`, translate(`status_${reservation.status}`)));
        article.append(header);

        const details = node('dl', 'admin-details');
        appendDetail(details, translate('name'), reservation.participant_name);
        appendDetail(details, translate('student_number'), reservation.student_number || '—');
        appendDetail(details, translate('course'), reservation.course);
        const emailDetail = node('div', 'admin-detail');
        emailDetail.append(node('dt', '', translate('email')), node('dd', ''));
        const emailValue = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservation.email)
            ? node('a', '', reservation.email)
            : document.createTextNode(reservation.email);
        if (emailValue instanceof HTMLAnchorElement) emailValue.href = `mailto:${reservation.email}`;
        emailDetail.querySelector('dd').append(emailValue);
        details.append(emailDetail);
        appendDetail(details, translate('pickup_date'), reservation.pickup_date);
        appendDetail(details, translate('return_date'), reservation.return_date);
        article.append(details);

        const itemSection = node('div', 'admin-items');
        itemSection.append(node('h4', '', translate('items')));
        const items = node('ul', '');
        for (const item of formatReservationItems(reservation.reservation_items, locale)) items.append(node('li', '', item));
        itemSection.append(items);
        article.append(itemSection);

        const actions = getStatusActions(reservation.status);
        if (actions.length) {
            const actionBar = node('div', 'admin-actions');
            if (reservation.status === 'pending') {
                const draftButton = node('button', 'admin-action admin-action-secondary', translate('notification_draft'));
                draftButton.type = 'button';
                draftButton.addEventListener('click', () => {
                    const mailto = buildNotificationMailto(reservation);
                    if (!mailto) {
                        setMessage(dashboardMessage, 'bad_email', 'error');
                        return;
                    }
                    setMessage(dashboardMessage, 'draft_opened', '', { code: reservation.reservation_code });
                    window.location.href = mailto;
                });
                actionBar.append(draftButton);
            }
            for (const status of actions) {
                const button = node('button', status === 'cancelled' ? 'admin-action admin-action-secondary' : 'admin-action', translate(`action_${status}`));
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
        if (!visible.length) list.append(node('p', 'admin-empty', translate(reservations.length ? 'empty_filtered' : 'empty')));
    }

    async function loadReservations() {
        if (!client || !access.equipment) return;
        const current = generation;
        setMessage(dashboardMessage, 'loading');
        try {
            const { data, error } = await client
                .from('reservations')
                .select('id,reservation_code,participant_name,student_number,course,email,pickup_date,return_date,status,created_at,reservation_items(equipment_id,quantity)')
                .order('created_at', { ascending: false });
            if (current !== generation) return;
            if (error) throw error;
            reservations = data || [];
            renderReservations();
            setMessage(dashboardMessage, 'loaded', '', { count: reservations.length });
        } catch {
            if (current !== generation) return;
            setMessage(dashboardMessage, 'load_error', 'error');
        }
    }

    function selectTab(requested, focus = false) {
        activeTab = resolveAdminTab(requested, access);
        dashboard.hidden = activeTab !== 'equipment';
        registrationDashboard.hidden = activeTab !== 'registrations';
        for (const [tab, name] of [[equipmentTab, 'equipment'], [registrationsTab, 'registrations']]) {
            tab.disabled = !access[name];
            tab.setAttribute('aria-selected', String(activeTab === name));
            tab.tabIndex = activeTab === name ? 0 : -1;
            if (focus && activeTab === name) tab.focus();
        }
        if (activeTab) history.replaceState(null, '', `${location.pathname}${location.search}#${activeTab}`);
        if (activeTab === 'equipment') loadReservations();
        if (activeTab === 'registrations') registrationAdmin.load();
    }

    async function enterDashboard(session) {
        const current = ++generation;
        currentUserId = session?.user?.id || null;
        access = { equipment: false, registrations: false };
        activeTab = null;
        workspace.hidden = true;
        dashboard.hidden = true;
        registrationAdmin.clear();
        reservations = [];
        list.replaceChildren();
        dashboardMessage.textContent = '';
        delete dashboardMessage.dataset.messageKey;
        delete dashboardMessage.dataset.messageValues;
        delete dashboardMessage.dataset.state;
        workspaceMessage.textContent = '';
        delete workspaceMessage.dataset.messageKey;
        delete workspaceMessage.dataset.messageValues;
        delete workspaceMessage.dataset.state;
        if (refreshTimer) window.clearInterval(refreshTimer);
        refreshTimer = undefined;
        loginSection.hidden = false;
        if (!session) return;
        setMessage(loginMessage, 'checking_admin');
        const checked = await getProjectAdminAccess(client);
        if (current !== generation) return;
        access = checked;
        if (!access.equipment && !access.registrations) {
            setMessage(loginMessage, 'no_admin', 'error');
            return;
        }
        loginMessage.textContent = '';
        delete loginMessage.dataset.messageKey;
        delete loginMessage.dataset.messageValues;
        delete loginMessage.dataset.state;
        loginSection.hidden = true;
        workspace.hidden = false;
        registrationAdmin.setAuthorized(access.registrations);
        selectTab(location.hash.slice(1));
        refreshTimer = window.setInterval(() => {
            if (activeTab === 'equipment') loadReservations();
        }, 30000);
    }

    equipmentTab.addEventListener('click', () => selectTab('equipment'));
    registrationsTab.addEventListener('click', () => selectTab('registrations'));
    for (const tab of [equipmentTab, registrationsTab]) tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const requested = event.key === 'Home' ? 'equipment' : event.key === 'End' ? 'registrations' : activeTab === 'equipment' ? 'registrations' : 'equipment';
        selectTab(requested, true);
    });

    async function updateStatus(reservation, status, button) {
        if (!access.equipment) return;
        const current = generation;
        const prompt = translate(status === 'ready' ? 'confirm_ready' : status === 'cancelled' ? 'confirm_cancel' : 'confirm_returned', { code: reservation.reservation_code });
        if (!window.confirm(prompt)) return;
        button.disabled = true;
        setMessage(dashboardMessage, 'updating');
        const result = await setReservationStatus(client, reservation, status);
        if (current !== generation) return;
        if (!result.ok) {
            button.disabled = false;
            setMessage(dashboardMessage, 'update_error', 'error');
            return;
        }
        setMessage(dashboardMessage, 'updated', 'success', { code: reservation.reservation_code, status: translate(`status_${status}`) });
        await loadReservations();
    }

    if (!client) {
        setMessage(loginMessage, 'not_connected', 'error');
        loginButton.disabled = true;
    }

    client?.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') enterDashboard(null);
        if (event === 'SIGNED_IN' && session?.user?.id !== currentUserId) {
            const current = generation;
            window.setTimeout(() => { if (current === generation) enterDashboard(session); }, 0);
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!client) return;
        loginButton.disabled = true;
        setMessage(loginMessage, 'logging_in');
        const form = new FormData(loginForm);
        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: String(form.get('email') || '').trim(),
                password: String(form.get('password') || '')
            });
            if (error) throw error;
            loginForm.elements.password.value = '';
            await enterDashboard(data.session);
        } catch {
            setMessage(loginMessage, 'login_error', 'error');
        } finally {
            loginButton.disabled = false;
        }
    });

    document.getElementById('admin-sign-out').addEventListener('click', async () => {
        try {
            const { error } = await client.auth.signOut();
            if (error) throw error;
            await enterDashboard(null);
        } catch { setMessage(workspaceMessage, 'sign_out_error', 'error'); }
    });

    document.getElementById('admin-refresh').addEventListener('click', loadReservations);
    filter.addEventListener('change', renderReservations);
    languageSelect.addEventListener('change', () => {
        locale = languageSelect.value === 'en' ? 'en' : 'zh';
        localStorage.setItem('rere_cords_admin_lang', locale);
        applyLanguage();
    });
    window.addEventListener('focus', () => {
        if (!workspace.hidden && activeTab === 'equipment') loadReservations();
    });

    const initialGeneration = generation;
    client?.auth.getSession()
        .then(({ data, error }) => {
            if (initialGeneration !== generation) return;
            if (error) setMessage(loginMessage, 'session_error', 'error');
            else enterDashboard(data.session);
        })
        .catch(() => setMessage(loginMessage, 'session_error', 'error'));

    applyLanguage();
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeAdminPage, { once: true });
}
