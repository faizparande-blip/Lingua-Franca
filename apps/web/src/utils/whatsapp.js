const DEFAULT_PHONE = '919167217749';

/**
 * Encodes a text message and generates a direct wa.me link.
 *
 * @param {string} message
 * @param {string} [phone]
 * @returns {string} WhatsApp direct URL
 */
export function buildWhatsAppLink(message, phone = DEFAULT_PHONE) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

/**
 * Formats a Demo enquiry into the official WhatsApp message format.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} data.gradeLevel
 * @param {string} data.preferredCourse
 * @param {string} data.sessionPreference
 * @param {string} [data.notes]
 * @returns {string} Formatted WhatsApp message
 */
export function formatDemoWhatsAppMessage(data) {
  const notesText = data.notes && data.notes.trim() ? data.notes.trim() : 'None';
  return (
    `*NEW DEMO ENQUIRY – LINGUA FRANCA MUMBAI*\n\n` +
    `Name: ${data.fullName || ''}\n` +
    `Email: ${data.email || ''}\n` +
    `Phone: ${data.phone || ''}\n` +
    `Grade Level: ${data.gradeLevel || ''}\n` +
    `Preferred Course: ${data.preferredCourse || ''}\n` +
    `Session Preference: ${data.sessionPreference || ''}\n` +
    `Additional Notes: ${notesText}\n\n` +
    `Please contact this student regarding their demo session.`
  );
}

/**
 * Formats a Contact message into the official WhatsApp message format.
 *
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} [data.phone]
 * @param {string} data.subject
 * @param {string} data.message
 * @returns {string} Formatted WhatsApp message
 */
export function formatContactWhatsAppMessage(data) {
  const phoneText = data.phone && data.phone.trim() ? data.phone.trim() : 'Not provided';
  return (
    `*NEW CONTACT ENQUIRY – LINGUA FRANCA MUMBAI*\n\n` +
    `Name: ${data.fullName || ''}\n` +
    `Email: ${data.email || ''}\n` +
    `Phone: ${phoneText}\n\n` +
    `Subject: ${data.subject || ''}\n\n` +
    `Message:\n` +
    `${data.message || ''}\n\n` +
    `Please respond to this enquiry.`
  );
}

export function openWhatsApp(message, phone = DEFAULT_PHONE) {
  window.open(buildWhatsAppLink(message, phone), '_blank', 'noopener,noreferrer');
}

export const WHATSAPP_MESSAGES = {
  GENERAL_ENQUIRY: "Hello! I'd like to enquire about language learning and English tutoring at Lingua Franca Mumbai.",
  BOOK_DEMO: "Hello! I'd like to book a free demo class at Lingua Franca Mumbai.",
  COURSE_ENQUIRY: (courseName) => `Hello! I'd like to know more about the ${courseName} course at Lingua Franca Mumbai.`,
};
