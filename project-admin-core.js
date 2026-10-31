export async function getProjectAdminAccess(client) {
    const check = async (name) => {
        try {
            const { data, error } = await client.rpc(name);
            return !error && data === true;
        } catch { return false; }
    };
    const [equipment, registrations] = await Promise.all([check('is_reservation_admin'), check('is_event_registration_admin')]);
    return { equipment, registrations };
}

export function resolveAdminTab(requested, access) {
    if (requested === 'registrations' && access.registrations) return 'registrations';
    if (access.equipment) return 'equipment';
    return access.registrations ? 'registrations' : null;
}
