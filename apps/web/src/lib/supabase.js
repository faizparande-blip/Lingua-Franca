import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || '';
const rawSupabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || '';

const isDev = Boolean(
  (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
  (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production')
);

/**
 * Sanitizes and normalizes a Supabase project URL.
 * Handles:
 * - Accidental quotes ('...' or "...")
 * - Dashboard URLs (e.g. https://supabase.com/dashboard/project/<project-ref>)
 * - Trailing slashes and duplicated API paths (/rest/v1, /rest/v1/, etc.)
 * - Strips all pathnames to ensure createClient receives strictly the root origin.
 *
 * @param {string} rawUrl
 * @returns {string} Clean canonical project origin URL (e.g. https://<ref>.supabase.co)
 */
export function sanitizeSupabaseUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';

  let cleaned = rawUrl.trim().replace(/^['"]|['"]$/g, '').trim();
  if (!cleaned) return '';

  // Handle Supabase Dashboard URLs accidentally pasted by users
  const dashboardMatch = cleaned.match(/supabase\.com\/dashboard\/project\/([a-z0-9_-]+)/i);
  if (dashboardMatch && dashboardMatch[1]) {
    return `https://${dashboardMatch[1]}.supabase.co`;
  }

  // Ensure protocol is present
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = `https://${cleaned}`;
  }

  try {
    const parsed = new URL(cleaned);
    // Return strictly protocol + host (origin), stripping any path, query, or hash
    return parsed.origin;
  } catch (err) {
    if (isDev) {
      console.error('[Supabase] Malformed VITE_SUPABASE_URL format:', err.message);
    }
    return '';
  }
}

/**
 * Sanitizes the Supabase anonymous publishable key.
 *
 * @param {string} rawKey
 * @returns {string} Cleaned key string
 */
export function sanitizeSupabaseKey(rawKey) {
  if (!rawKey || typeof rawKey !== 'string') return '';
  return rawKey.trim().replace(/^['"]|['"]$/g, '').trim();
}

const supabaseUrl = sanitizeSupabaseUrl(rawSupabaseUrl);
const supabaseAnonKey = sanitizeSupabaseKey(rawSupabaseAnonKey);

/**
 * Checks whether Supabase environment variables are properly defined and valid.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== '' &&
  supabaseAnonKey !== '' &&
  !supabaseUrl.includes('your-project') &&
  !supabaseUrl.includes('unconfigured') &&
  (supabaseUrl.endsWith('.supabase.co') || supabaseUrl.includes('localhost') || supabaseUrl.includes('127.0.0.1'))
);

/**
 * Safe development diagnostics without leaking credentials.
 */
export function getSupabaseDiagnostics() {
  let urlStatus = 'missing';
  let host = 'none';

  if (supabaseUrl) {
    try {
      const parsed = new URL(supabaseUrl);
      host = parsed.host;
      urlStatus = parsed.pathname === '/' || parsed.pathname === '' ? 'valid_origin' : 'contains_pathname';
    } catch {
      urlStatus = 'invalid_format';
    }
  }

  let keyStatus = 'missing';
  if (supabaseAnonKey) {
    if (supabaseAnonKey.startsWith('sb_publishable_') || supabaseAnonKey.startsWith('sbp_')) {
      keyStatus = 'valid_publishable_format';
    } else if (supabaseAnonKey.startsWith('eyJ')) {
      keyStatus = 'valid_jwt_format';
    } else {
      keyStatus = 'configured';
    }
  }

  return {
    isConfigured: isSupabaseConfigured,
    rawUrlDefined: Boolean(rawSupabaseUrl),
    projectHost: host,
    urlStatus,
    keyStatus,
  };
}

if (isDev) {
  const diag = getSupabaseDiagnostics();
  if (!diag.isConfigured) {
    console.warn(
      '[Supabase] Warning: Supabase client is not fully configured.',
      diag
    );
  } else {
    console.info(
      `[Supabase] Client initialized successfully -> Host: ${diag.projectHost} | Key: ${diag.keyStatus}`
    );
  }
}

/**
 * Supabase client instance initialized with sanitized origin URL and publishable/anon key.
 */
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://unconfigured.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'unconfigured-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      fetch: (url, options) => {
        if (isDev) {
          const urlString = typeof url === 'string' ? url : url?.toString();
          console.info(`[Supabase Fetch] -> ${options?.method || 'GET'} ${urlString}`);
        }
        return fetch(url, options);
      },
    },
  }
);
