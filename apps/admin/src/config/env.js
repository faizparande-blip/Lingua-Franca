/**
 * Centralized Environment & URL Configuration for Lingua Franca Admin Dashboard
 */

// Centralized public website URL with guaranteed production fallback
const rawPublicUrl = import.meta.env.VITE_PUBLIC_WEBSITE_URL || 'https://linguafranca.linkal.in/';

export const PUBLIC_WEBSITE_URL = rawPublicUrl.endsWith('/')
  ? rawPublicUrl
  : `${rawPublicUrl}/`;

export default {
  PUBLIC_WEBSITE_URL,
};
