// BACKEND-READY SERVICE LAYER
import { courses } from '../data/courses';

export async function getCourses() {
  // TODO: Replace with Supabase select from 'courses' table
  await new Promise(r => setTimeout(r, 300));
  return { success: true, data: courses, mock: true };
}

export async function getCourseBySlug(slug) {
  // TODO: Replace with Supabase select with filter
  const course = courses.find(c => c.slug === slug);
  return { success: !!course, data: course || null, mock: true };
}


