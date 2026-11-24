export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : 'Please enter a valid email address.';
}

export function validatePhone(phone) {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (!cleaned) return 'Phone number is required.';
  if (!/^\d{10,15}$/.test(cleaned)) return 'Please enter a valid phone number (10-15 digits).';
  return null;
}

export function validateRequired(value, fieldName = 'This field') {
  if (!value || !value.toString().trim()) return `${fieldName} is required.`;
  return null;
}

export function validateMinLength(value, min, fieldName = 'This field') {
  if (!value || value.trim().length < min) return `${fieldName} must be at least ${min} characters.`;
  return null;
}

export function validateForm(formData, rules) {
  const errors = {};
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const error = rule(formData[field]);
      if (error) { errors[field] = error; break; }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors };
}


