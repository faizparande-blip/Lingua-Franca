import React from 'react';
import TestimonialsComponent from '../components/Testimonials';
import { MessageIcon } from '../components/common/Icons';
import { Link } from 'react-router-dom';

export default function Testimonials() {
  return (
    <div className="bg-cream pb-24">

      {/* Page Header (Navy 30%) */}
      <section className="py-16 bg-navy text-cream border-b-4 border-yellow text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-yellow bg-white/10 px-3 py-1 rounded-full">
            Voices of Academic Success
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow mt-3 mb-2">
            Student & Parent Experiences
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto">
            "Transforming self-doubt into linguistic poise and academic triumph."
          </p>
        </div>
      </section>

      {/* Testimonials Dynamic Content Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialsComponent />
      </section>

      {/* Action Strip */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="font-serif text-2xl font-bold text-navy">
          Are You a Former or Current Student?
        </h3>
        <p className="text-slate-700 text-base sm:text-lg">
          We would love to feature your academic journey and feedback on our official showcase.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/919167217749?text=Hello%20Ms.%20Ayeshabi%2C%20I%20would%20like%20to%20submit%20my%20testimonial."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy text-sm sm:text-base py-3 px-6 inline-flex items-center gap-2"
          >
            <MessageIcon className="w-4 h-4" />
            <span>Share Feedback via WhatsApp</span>
          </a>
          <Link to="/contact" className="btn-yellow text-sm sm:text-base py-3 px-6 font-bold">
            Book a Free Demo
          </Link>
        </div>
      </section>

    </div>
  );
}
