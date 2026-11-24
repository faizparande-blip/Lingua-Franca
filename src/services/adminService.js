import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

/**
 * Fetches high-level statistics for the Admin Dashboard Overview.
 * Figures are calculated directly from Supabase records.
 */
export async function getDashboardStats() {
  if (!isSupabaseConfigured) {
    return { success: false, error: 'Database is not configured.' };
  }

  try {
    // 1. Fetch Enquiries count and distribution
    const { data: enquiries, error: enquiriesError } = await supabase
      .from('enquiries')
      .select('id, full_name, email, phone, grade_level, preferred_course, status, created_at')
      .order('created_at', { ascending: false });

    if (enquiriesError) throw enquiriesError;

    // 2. Fetch Testimonials count
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('id, is_verified');

    if (testimonialsError) throw testimonialsError;

    const totalEnquiries = enquiries?.length || 0;
    const pendingEnquiries = enquiries?.filter((e) => e.status === 'pending').length || 0;
    const contactedEnquiries = enquiries?.filter((e) => e.status === 'contacted').length || 0;
    const enrolledStudents = enquiries?.filter((e) => e.status === 'enrolled').length || 0;

    const verifiedTestimonials = testimonials?.filter((t) => t.is_verified).length || 0;
    const totalTestimonials = testimonials?.length || 0;

    return {
      success: true,
      stats: {
        totalEnquiries,
        pendingEnquiries,
        contactedEnquiries,
        enrolledStudents,
        verifiedTestimonials,
        totalTestimonials,
      },
      recentEnquiries: (enquiries || []).slice(0, 5),
    };
  } catch (err) {
    console.error('[adminService] Error fetching dashboard stats:', err);
    return {
      success: false,
      error: 'Failed to retrieve dashboard statistics.',
      stats: {
        totalEnquiries: 0,
        pendingEnquiries: 0,
        contactedEnquiries: 0,
        enrolledStudents: 0,
        verifiedTestimonials: 0,
        totalTestimonials: 0,
      },
      recentEnquiries: [],
    };
  }
}

/**
 * Fetches demo enquiries with search, filtering, and ordering.
 */
export async function getAdminEnquiries({ search = '', status = 'all' } = {}) {
  if (!isSupabaseConfigured) return { success: false, data: [] };

  try {
    let query = supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(`full_name.ilike.${term},email.ilike.${term},phone.ilike.${term},preferred_course.ilike.${term}`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (err) {
    console.error('[adminService] Error fetching enquiries:', err);
    return { success: false, data: [], error: 'Could not load enquiries.' };
  }
}

/**
 * Updates the status of an enquiry (pending -> contacted -> enrolled).
 */
export async function updateEnquiryStatus(id, newStatus) {
  if (!isSupabaseConfigured) return { success: false, error: 'Database not configured' };

  const validStatuses = ['pending', 'contacted', 'enrolled'];
  if (!validStatuses.includes(newStatus)) {
    return { success: false, error: 'Invalid status value.' };
  }

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[adminService] Error updating enquiry status:', err);
    return { success: false, error: 'Failed to update status in database.' };
  }
}

/**
 * Deletes an enquiry record.
 */
export async function deleteEnquiry(id) {
  try {
    const { error } = await supabase.from('enquiries').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('[adminService] Error deleting enquiry:', err);
    return { success: false, error: 'Failed to delete enquiry.' };
  }
}

/**
 * Fetches all testimonials (both verified and unverified) for admin management.
 */
export async function getAdminTestimonials() {
  if (!isSupabaseConfigured) return { success: false, data: [] };

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (err) {
    console.error('[adminService] Error fetching admin testimonials:', err);
    return { success: false, data: [], error: 'Could not load testimonials.' };
  }
}

/**
 * Creates a new testimonial record.
 */
export async function createTestimonial({ name, course, rating = 5, text, avatar = null, is_verified = false }) {
  try {
    const payload = {
      name: name?.trim(),
      course: course?.trim(),
      rating: Math.min(Math.max(Number(rating) || 5, 1), 5),
      text: text?.trim(),
      avatar: avatar?.trim() || null,
      is_verified: Boolean(is_verified),
    };

    if (!payload.name || !payload.course || !payload.text) {
      return { success: false, error: 'Name, course, and review text are required.' };
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[adminService] Error creating testimonial:', err);
    return { success: false, error: 'Failed to save testimonial.' };
  }
}

/**
 * Updates an existing testimonial.
 */
export async function updateTestimonial(id, { name, course, rating, text, avatar, is_verified }) {
  try {
    const payload = {};
    if (name !== undefined) payload.name = name.trim();
    if (course !== undefined) payload.course = course.trim();
    if (rating !== undefined) payload.rating = Math.min(Math.max(Number(rating) || 5, 1), 5);
    if (text !== undefined) payload.text = text.trim();
    if (avatar !== undefined) payload.avatar = avatar?.trim() || null;
    if (is_verified !== undefined) payload.is_verified = Boolean(is_verified);

    const { data, error } = await supabase
      .from('testimonials')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[adminService] Error updating testimonial:', err);
    return { success: false, error: 'Failed to update testimonial.' };
  }
}

/**
 * Toggles a testimonial's published verification state.
 */
export async function toggleTestimonialVerification(id, isVerified) {
  return updateTestimonial(id, { is_verified: isVerified });
}

/**
 * Deletes a testimonial.
 */
export async function deleteTestimonial(id) {
  try {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('[adminService] Error deleting testimonial:', err);
    return { success: false, error: 'Failed to delete testimonial.' };
  }
}
