import React, { useState } from 'react';
import { courses } from '../../data/courses';
import { SendIcon, CheckIcon, AlertIcon, MessageIcon } from '../common/Icons';
import { validateForm, validateRequired, validateEmail, validatePhone } from '../../utils/validators';
import { createEnquiry } from '../../services/enquiryService';
import { buildWhatsAppLink, formatDemoWhatsAppMessage } from '../../utils/whatsapp';

export default function DemoForm({ preselectedCourse = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gradeLevel: 'IGCSE',
    preferredCourse: preselectedCourse || courses[0]?.title || '',
    sessionPreference: 'Online',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validationRules = {
    fullName: [(v) => validateRequired(v, 'Full Name')],
    email: [(v) => validateRequired(v, 'Email'), (v) => validateEmail(v)],
    phone: [(v) => validateRequired(v, 'Phone Number'), (v) => validatePhone(v)],
    gradeLevel: [(v) => validateRequired(v, 'Grade / Level')],
    preferredCourse: [(v) => validateRequired(v, 'Preferred Course')],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateForm(formData, validationRules);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Open a blank tab synchronously to avoid browser popup blockers
    let whatsappTab = null;
    try {
      whatsappTab = window.open('about:blank', '_blank');
    } catch (popupErr) {
      console.warn('[DemoForm] Popup blocked or window.open not permitted:', popupErr);
    }

    setIsSubmitting(true);
    try {
      const response = await createEnquiry(formData);
      if (response.success) {
        // Construct the full formatted WhatsApp message
        const whatsappUrl = buildWhatsAppLink(formatDemoWhatsAppMessage(formData));

        if (whatsappTab && !whatsappTab.closed) {
          whatsappTab.location.href = whatsappUrl;
        } else {
          // Fallback if popup tab was blocked
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }

        setIsSuccess(true);
      } else {
        if (whatsappTab && !whatsappTab.closed) {
          whatsappTab.close();
        }
        setServerError(response.error || 'Something went wrong. Please try again or reach out on WhatsApp.');
      }
    } catch (err) {
      if (whatsappTab && !whatsappTab.closed) {
        whatsappTab.close();
      }
      setServerError('An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      gradeLevel: 'IGCSE',
      preferredCourse: courses[0]?.title || '',
      sessionPreference: 'Online',
      notes: '',
    });
    setIsSuccess(false);
    setErrors({});
  };

  if (isSuccess) {
    return (
      <div className="bg-white border-2 border-cream-300 rounded-2xl p-8 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 mx-auto rounded-full bg-cream border-2 border-yellow flex items-center justify-center text-navy">
          <CheckIcon className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-2xl font-bold text-navy">Demo Session Requested!</h3>
        
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Your demo session request has been successfully submitted! Thank you, <span className="text-navy font-bold">{formData.fullName}</span>. Ms. Ayeshabi Saheb and our team will get in touch with you shortly to schedule your free demo session.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <a
            href={buildWhatsAppLink(formatDemoWhatsAppMessage(formData))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-yellow w-full sm:w-auto px-6 py-2.5 text-xs font-bold shadow-sm"
          >
            Connect on WhatsApp Now
          </a>
          <button
            onClick={resetForm}
            className="btn-outline w-full sm:w-auto px-6 py-2.5 text-xs font-semibold cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-cream-300 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
      <div className="border-b border-cream-300 pb-4">
        <h3 className="font-serif text-2xl font-bold text-navy flex items-center gap-2">
          <span>Book a Free Demo Class</span>
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Experience our personalised teaching approach with Ms. Ayeshabi Saheb.
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertIcon className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Student / Parent Full Name <span className="text-yellow-dark">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="e.g. Aryan Malhotra"
          className={`w-full px-4 py-2.5 rounded-xl bg-cream border-2 ${
            errors.fullName ? 'border-red-400' : 'border-cream-300 focus:border-navy'
          } text-navy text-sm placeholder-slate-400 transition-colors`}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>}
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Email Address <span className="text-yellow-dark">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className={`w-full px-4 py-2.5 rounded-xl bg-cream border-2 ${
              errors.email ? 'border-red-400' : 'border-cream-300 focus:border-navy'
            } text-navy text-sm placeholder-slate-400 transition-colors`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Phone / WhatsApp <span className="text-yellow-dark">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit number"
            className={`w-full px-4 py-2.5 rounded-xl bg-cream border-2 ${
              errors.phone ? 'border-red-400' : 'border-cream-300 focus:border-navy'
            } text-navy text-sm placeholder-slate-400 transition-colors`}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
        </div>
      </div>

      {/* Grade Level & Preferred Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Current Grade / Level <span className="text-yellow-dark">*</span>
          </label>
          <select
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-cream border-2 border-cream-300 focus:border-navy text-navy text-sm transition-colors"
          >
            <option value="Primary (Grade 3-5)">Primary (Grade 3-5)</option>
            <option value="Lower Secondary (Grade 6-8)">Lower Secondary (Grade 6-8)</option>
            <option value="IGCSE (Grade 9-10)">IGCSE (Grade 9-10)</option>
            <option value="A Levels / IB (Grade 11-12)">A Levels / IB (Grade 11-12)</option>
            <option value="ICSE (Grade 8-10)">ICSE (Grade 8-10)</option>
            <option value="Other / General Communication">Other / General Communication</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
            Target Course <span className="text-yellow-dark">*</span>
          </label>
          <select
            name="preferredCourse"
            value={formData.preferredCourse}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-cream border-2 border-cream-300 focus:border-navy text-navy text-sm transition-colors"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Session Preference */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-2">
          Session Preference
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Online', 'Offline (Mumbai)', 'Flexible'].map((type) => (
            <label
              key={type}
              className={`flex items-center justify-center py-2 px-3 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all duration-200 ${
                formData.sessionPreference === type
                  ? 'border-yellow bg-yellow text-navy'
                  : 'border-cream-300 bg-cream text-slate-700 hover:border-navy'
              }`}
            >
              <input
                type="radio"
                name="sessionPreference"
                value={type}
                checked={formData.sessionPreference === type}
                onChange={handleChange}
                className="hidden"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
          Student's Current Needs / Goals (Optional)
        </label>
        <textarea
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleChange}
          placeholder="e.g. preparing for IGCSE FLE exam next term, wants to improve essay writing structure..."
          className="w-full px-4 py-2.5 rounded-xl bg-cream border-2 border-cream-300 focus:border-navy text-navy text-sm placeholder-slate-400 transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-yellow w-full py-3.5 px-6 font-bold text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
            <span>Processing Request...</span>
          </>
        ) : (
          <>
            <MessageIcon className="w-4 h-4" />
            <span>Send Enquiry on WhatsApp</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center leading-normal mt-2.5">
        Your details will be shared with Lingua Franca via WhatsApp to process your enquiry.
      </p>
    </form>
  );
}
