import { createClient } from 'npm:@supabase/supabase-js@2.117.2';
import { createRegistrationHandler, isValidCaptchaResult } from './handler.js';

const origins = (Deno.env.get('REGISTRATION_ALLOWED_ORIGINS') || '').split(',').map((s) => s.trim()).filter(Boolean);
const secret = Deno.env.get('TURNSTILE_SECRET_KEY') || '';
const url = Deno.env.get('SUPABASE_URL') || '';
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const client = url && serviceKey ? createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
const bucket = 'event-registration-photos';

const handle = createRegistrationHandler({
    config: {
        origins: secret && client ? origins : [],
        opensAt: Deno.env.get('REGISTRATION_OPENS_AT') || '',
        closesAt: Deno.env.get('REGISTRATION_CLOSES_AT') || ''
    },
    verifyCaptcha: async (token: string) => {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST', body: new URLSearchParams({ secret, response: token }), signal: AbortSignal.timeout(10000)
        });
        return response.ok && isValidCaptchaResult(await response.json(), origins);
    },
    storage: {
        upload: async (path: string, bytes: Uint8Array, type: string) => {
            const { error } = await client!.storage.from(bucket).upload(path, bytes, { contentType: type, upsert: false });
            if (error) throw error;
        },
        remove: async (paths: string[]) => {
            const { error } = await client!.storage.from(bucket).remove(paths);
            if (error) throw error;
        }
    },
    repository: {
        commit: async ({ id, payload, files, digest }: { id: string; payload: unknown; files: unknown[]; digest: string }) => {
            const { data, error } = await client!.rpc('commit_event_registration', { p_id: id, p_payload: payload, p_files: files, p_digest: digest });
            if (error) throw error;
            return data;
        }
    }
});
Deno.serve(handle);
