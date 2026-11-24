import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Fetches verified student and parent testimonials from Supabase.
 * Only returns records where is_verified = true, ordered by newest first.
 * Never exposes unverified submissions.
 *
 * @returns {Promise<{ success: boolean, data: Array<any>, error?: string }>}
 */
export async function getTestimonials() {
  try {
    if (!isSupabaseConfigured) {
      console.warn('[testimonialService] Supabase is not configured. Returning empty list.');
      return {
        success: false,
        data: [],
        error: 'Database is not configured. Please set your Supabase environment variables.',
      };
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('id, name, course, rating, text, avatar, is_verified, created_at')
      .eq('is_verified', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[testimonialService] Supabase query error:', error.message || error);
      return {
        success: false,
        data: [],
        error: 'Could not retrieve verified testimonials at this time.',
      };
    }

    // Clean and validate returned records
    const cleanData = (data || []).filter((item) => item.is_verified === true);

    return {
      success: true,
      data: cleanData,
    };
  } catch (err) {
    console.error('[testimonialService] Unexpected error fetching testimonials:', err);
    return {
      success: false,
      data: [],
      error: 'An unexpected network error occurred while loading testimonials.',
    };
  }
}
