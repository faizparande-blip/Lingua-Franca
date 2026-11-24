import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Signs in a user using email and password.
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @returns {Promise<{ success: boolean, session?: any, user?: any, error?: string }>}
 */
export async function signIn({ email, password }) {
  try {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Database is not configured. Please check your environment variables.',
      };
    }

    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return {
        success: false,
        error: 'Please enter both your email address and password.',
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      console.warn('[authService] Sign in failed:', error.message);
      let userFriendlyError = error.message;
      if (error.message.includes('Invalid login credentials')) {
        userFriendlyError = 'Invalid email address or password. Please try again.';
      } else if (error.message.includes('Email not confirmed')) {
        userFriendlyError = 'Your email address has not been confirmed yet. Please check your inbox for the verification link.';
      }
      return {
        success: false,
        error: userFriendlyError,
      };
    }

    return {
      success: true,
      session: data.session,
      user: data.user,
    };
  } catch (err) {
    console.error('[authService] Unexpected sign in error:', err);
    return {
      success: false,
      error: 'An unexpected authentication error occurred. Please try again.',
    };
  }
}

/**
 * Registers a new student account using email and password.
 * Full name is stored in user_metadata during registration.
 *
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.fullName
 * @returns {Promise<{ success: boolean, session?: any, user?: any, requiresEmailConfirmation?: boolean, error?: string }>}
 */
export async function signUp({ email, password, fullName }) {
  try {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Database is not configured. Please check your environment variables.',
      };
    }

    const cleanEmail = email?.trim().toLowerCase();
    const cleanName = fullName?.trim();

    if (!cleanEmail || !password || !cleanName) {
      return {
        success: false,
        error: 'Please fill in all required fields (Full Name, Email, and Password).',
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: 'Password must be at least 6 characters in length.',
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
        },
      },
    });

    if (error) {
      console.warn('[authService] Sign up failed:', error.message);
      return {
        success: false,
        error: error.message || 'Unable to create account. Please try again.',
      };
    }

    // Check if email confirmation is required:
    // If Supabase has email confirmation enabled, data.user is created but data.session is null.
    // Also, if user already exists, Supabase might return an empty identities array.
    const isExistingUser = data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0;
    if (isExistingUser) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in or request a password reset.',
      };
    }

    const requiresEmailConfirmation = !data.session;

    return {
      success: true,
      session: data.session,
      user: data.user,
      requiresEmailConfirmation,
    };
  } catch (err) {
    console.error('[authService] Unexpected sign up error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred while registering your account.',
    };
  }
}

/**
 * Sends a password reset recovery email to the registered address.
 *
 * @param {string} email
 * @param {string} [redirectTo]
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function resetPasswordForEmail(email, redirectTo) {
  try {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Database is not configured. Please check your environment variables.',
      };
    }

    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail) {
      return {
        success: false,
        error: 'Please enter your registered email address.',
      };
    }

    const redirectUrl = redirectTo || `${window.location.origin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.warn('[authService] Password reset request failed:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to dispatch recovery email.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[authService] Unexpected password reset error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred while processing your request.',
    };
  }
}

/**
 * Updates the currently authenticated user's password.
 * (Used when user navigates to /reset-password from the email recovery link)
 *
 * @param {string} newPassword
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function updateUserPassword(newPassword) {
  try {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Database is not configured.',
      };
    }

    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        error: 'New password must be at least 6 characters in length.',
      };
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.warn('[authService] Update password failed:', error.message);
      return {
        success: false,
        error: error.message || 'Failed to update your password.',
      };
    }

    return { success: true, user: data.user };
  } catch (err) {
    console.error('[authService] Unexpected update password error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred while resetting your password.',
    };
  }
}

/**
 * Signs out the currently authenticated user.
 */
export async function signOut() {
  try {
    if (!isSupabaseConfigured) return { success: true };
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[authService] Sign out error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error('[authService] Unexpected sign out error:', err);
    return { success: false, error: 'Sign out failed.' };
  }
}

/**
 * Retrieves the current session if one exists.
 */
export async function getSession() {
  try {
    if (!isSupabaseConfigured) return null;
    const { data } = await supabase.auth.getSession();
    return data?.session || null;
  } catch (err) {
    console.error('[authService] Error getting session:', err);
    return null;
  }
}

/**
 * Checks whether an authenticated user is authorized as an administrator.
 * Evaluates:
 * 1. Server-managed app_metadata.role === 'admin' or app_metadata.is_admin === true
 * 2. public.admin_users allowlist table query
 *
 * (Does NOT trust user-editable user_metadata)
 *
 * @param {Object} user
 * @returns {Promise<boolean>}
 */
export async function checkAdminStatus(user) {
  if (!user || !user.email) return false;

  // 1. Check server-managed app_metadata role
  const appRole = user.app_metadata?.role;
  const appIsAdmin = user.app_metadata?.is_admin;
  if (appRole === 'admin' || appIsAdmin === true || appIsAdmin === 'true') {
    return true;
  }

  // 2. Check public.admin_users allowlist table
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', user.email.toLowerCase())
      .maybeSingle();

    if (!error && data && data.email) {
      return true;
    }
  } catch (err) {
    console.warn('[authService] Error checking admin_users table:', err);
  }

  return false;
}

/**
 * Subscribes to auth state changes.
 *
 * @param {Function} callback
 * @returns {Object} Subscription object with unsubscribe() method
 */
export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange(callback);
}
