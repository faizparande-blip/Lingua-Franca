import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { validateEmail, validatePhone } from '../utils/validators.js';

// In-memory cache to prevent accidental double-clicks / rapid duplicate submissions
const recentSubmissions = new Map();
const DUPLICATE_WINDOW_MS = 5000; // 5 seconds window

/**
 * Validates and submits a student/parent enquiry for a Free Demo Class to Supabase.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} data.gradeLevel
 * @param {string} data.preferredCourse
 * @param {string} data.sessionPreference
 * @param {string} [data.notes]
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export async function createEnquiry(data) {
  try {
    // 1. Check database configuration
    if (!isSupabaseConfigured) {
      console.error('[enquiryService] Supabase environment variables are missing.');
      return {
        success: false,
        error: 'Database connection is not configured. Please verify your environment settings.',
      };
    }

    // 2. Validate input payload
    if (!data || typeof data !== 'object') {
      return { success: false, error: 'Invalid form submission data.' };
    }

    const fullName = data.fullName?.trim();
    const email = data.email?.trim().toLowerCase();
    const phone = data.phone?.trim();
    const gradeLevel = data.gradeLevel?.trim();
    const preferredCourse = data.preferredCourse?.trim();
    const sessionPreference = data.sessionPreference?.trim() || 'Online';
    const notes = data.notes?.trim() || null;

    if (!fullName) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!email) {
      return { success: false, error: 'Email address is required.' };
    }
    const emailError = validateEmail(email);
    if (emailError) {
      return { success: false, error: emailError };
    }
    if (!phone) {
      return { success: false, error: 'Phone number is required.' };
    }
    const phoneError = validatePhone(phone);
    if (phoneError) {
      return { success: false, error: phoneError };
    }
    if (!gradeLevel) {
      return { success: false, error: 'Grade level is required.' };
    }
    if (!preferredCourse) {
      return { success: false, error: 'Preferred course is required.' };
    }

    // 3. Prevent duplicate submissions from accidental repeated clicks
    const dedupeKey = `${email}|${preferredCourse}|${phone}`;
    const now = Date.now();
    const lastSubmissionTime = recentSubmissions.get(dedupeKey);

    if (lastSubmissionTime && (now - lastSubmissionTime) < DUPLICATE_WINDOW_MS) {
      return {
        success: false,
        error: 'A submission is already being processed. Please wait a moment.',
      };
    }
    recentSubmissions.set(dedupeKey, now);

    // Clean up stale cache keys periodically
    for (const [key, timestamp] of recentSubmissions.entries()) {
      if (now - timestamp > DUPLICATE_WINDOW_MS * 4) {
        recentSubmissions.delete(key);
      }
    }

    // 4. Map frontend fields to database columns
    const payload = {
      full_name: fullName,
      email: email,
      phone: phone,
      grade_level: gradeLevel,
      preferred_course: preferredCourse,
      session_preference: sessionPreference,
      notes: notes,
      status: 'pending',
    };

    // 5. Insert into Supabase enquiries table.
    // Note: Anonymous users have INSERT permissions under RLS, but NOT SELECT permissions.
    // Therefore, do not chain .select() here, as PostgREST's RETURNING clause would trigger
    // a SELECT RLS policy check and fail with error 42501.
    const { error, status } = await supabase
      .from('enquiries')
      .insert([payload]);

    if (error) {
      console.error('[enquiryService] Supabase insert error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        httpStatus: status,
      });
      // Remove dedupe key so user can retry if it failed
      recentSubmissions.delete(dedupeKey);
      return {
        success: false,
        error: 'Failed to record your enquiry. Please check your details and try again.',
      };
    }

    return {
      success: true,
      data: payload,
    };
  } catch (err) {
    console.error('[enquiryService] Unexpected error:', err);
    return {
      success: false,
      error: 'An unexpected network error occurred. Please try again.',
    };
  }
}

/**
 * Fetch enquiries (authorized staff view).
 */
export async function getEnquiries() {
  if (!isSupabaseConfigured) {
    return { success: false, data: [], error: 'Supabase is not configured.' };
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[enquiryService] Supabase query error:', {
        code: error.code,
        message: error.message,
      });
      return { success: false, data: [], error: 'Could not fetch enquiries.' };
    }

    return { success: true, data: data || [] };
  } catch (err) {
    console.error('[enquiryService] Unexpected error:', err);
    return { success: false, data: [], error: 'Unexpected error fetching enquiries.' };
  }
}
