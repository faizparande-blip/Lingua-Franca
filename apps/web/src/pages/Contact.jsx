import React from 'react';
import useSEO from '../hooks/useSEO';
import DemoForm from '../components/forms/DemoForm';
import { PhoneIcon, MapPinIcon, MessageIcon } from '../components/common/Icons';

export default function Contact() {
  useSEO({
    title: 'Contact Us | Lingua Franca Mumbai',
    description: 'Contact Lingua Franca Mumbai or book a free trial demo with Ms. Ayeshabi Saheb. Reach us via phone, WhatsApp, or at our Santacruz West classroom centre in Mumbai.',
    canonicalPath: '/contact',
  });

  return (
    <div className="bg-cream pb-24">

      {/* Page Header (Navy 30%) */}
      <section className="py-16 bg-navy text-cream border-b-4 border-yellow text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-yellow bg-white/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow mt-3 mb-2">
            Contact Lingua Franca Mumbai
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto">
            "Connect directly with Ms. Ayeshabi Saheb to schedule a consultation or trial demo."
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Contact & Demo Booking Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow font-bold">
                Direct Tutor Access
              </span>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Ms. Ayeshabi Saheb
              </h2>
              <p className="text-slate-600 font-semibold text-sm sm:text-base">
                Founder & Lead Educator • 18+ Years Experience
              </p>
              <p className="text-slate-700 text-base leading-relaxed">
                Whether you need immediate curriculum advice, have queries about upcoming board cycles, or wish to discuss customised sessions for your child, we are readily available.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone Numbers */}
              <div className="bg-white p-5 rounded-2xl border-2 border-cream-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 border border-yellow">
                  <PhoneIcon className="w-5 h-5 text-navy" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Direct Calling Numbers</h4>
                  <p className="text-xs sm:text-sm text-slate-500">Mon – Sat, 9:00 AM – 8:00 PM IST</p>
                  <div className="pt-1 flex flex-col text-sm sm:text-base font-semibold">
                    <a href="tel:+919167217749" className="text-navy hover:text-navy-light">+91 91672 17749 (Primary)</a>
                    <a href="tel:+919833468057" className="text-slate-700 hover:text-navy text-sm font-medium pt-0.5">+91 98334 68057 (Alternate)</a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-white p-5 rounded-2xl border-2 border-cream-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 border border-yellow">
                  <MessageIcon className="w-5 h-5 text-navy" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Instant WhatsApp Enquiry</h4>
                  <a
                    href="https://wa.me/919167217749?text=Hello%20Ms.%20Ayeshabi%2C%20I%20would%20like%20to%20enquire%20about%20English%20Tutorials."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-yellow text-sm py-2.5 px-4 inline-flex items-center gap-2 font-bold"
                  >
                    <span>Start WhatsApp Chat (+91 91672 17749)</span>
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-5 rounded-2xl border-2 border-cream-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 border border-yellow">
                  <MapPinIcon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Classroom Centre</h4>
                  <address className="not-italic text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
                    B/16, 2nd Floor, Anu Apartment,<br />
                    Milan Subway Road, Santacruz West,<br />
                    Mumbai - 400054, Maharashtra, India.
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Demo Form */}
          <div className="lg:col-span-7">
            <DemoForm />
          </div>

        </div>
      </section>

      {/* Classroom Centre Map Location */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-cream-300">
        <div className="bg-white border-2 border-cream-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-navy/60">Visit In Person</span>
              <h3 className="font-serif text-2xl font-bold text-navy mt-0.5">Santacruz West Classroom Centre</h3>
              <p className="text-sm text-slate-700 mt-0.5">B/16, 2nd Floor, Anu Apartment, Milan Subway Road, Santacruz West, Mumbai - 400054</p>
            </div>
            <a
              href="https://maps.google.com/?q=Milan+Subway+Road,+Santacruz+West,+Mumbai+400054"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm py-2.5 px-4 font-bold inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Open in Google Maps</span>
              <span>↗</span>
            </a>
          </div>

          <div className="w-full h-80 rounded-2xl overflow-hidden border border-cream-300">
            <iframe
              title="Lingua Franca Santacruz West Mumbai Location"
              src="https://maps.google.com/maps?q=Milan%20Subway%20Road,%20Santacruz%20West,%20Mumbai%20400054&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
