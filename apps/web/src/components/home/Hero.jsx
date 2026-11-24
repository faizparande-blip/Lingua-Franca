import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckIcon, 
  StarIcon, 
  MapPinIcon, 
  ArrowRightIcon,
  GlobeIcon,
  GraduationCapIcon,
  BookIcon
} from '../common/Icons';

export default function Hero() {
  return (
    <section className="relative bg-navy text-cream pt-12 pb-20 border-b-4 border-yellow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/10 border border-yellow/40 text-yellow text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-yellow inline-block animate-pulse" />
              <span>Premium English Tutorials • Mumbai & Global Online</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-yellow leading-[1.05]">
                Lingua Franca
              </h1>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1]">
                The English Tutorials
              </h2>
            </div>

            {/* Sub-tagline */}
            <p className="font-serif text-lg sm:text-xl text-yellow/90 tracking-wide font-medium">
              "Learn English. Explore the World."
            </p>

            {/* Description */}
            <p className="text-cream/80 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Master the global language with bespoke, results-driven English tutorials by Ms. Ayeshabi Saheb. Specialising in Cambridge Checkpoint, IGCSE FLE & ESL, A Levels, and ICSE with over 18 years of academic distinction.
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream bg-navy-light/80 p-3 rounded-xl border border-cream-300/20">
                <CheckIcon className="w-4 h-4 shrink-0" />
                <span className="font-medium">18+ Yrs Excellence</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream bg-navy-light/80 p-3 rounded-xl border border-cream-300/20">
                <CheckIcon className="w-4 h-4 shrink-0" />
                <span className="font-medium">Online & Offline</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cream bg-navy-light/80 p-3 rounded-xl border border-cream-300/20">
                <CheckIcon className="w-4 h-4 shrink-0" />
                <span className="font-medium">1-on-1 Mentorship</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="btn-yellow w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-center flex items-center justify-center gap-2 shadow-md group"
              >
                <span>Book a Free Demo</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-yellow border-2 border-yellow hover:bg-yellow hover:text-navy transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>Explore Programmes</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Interactive Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-cream-300 p-7 text-navy shadow-xl relative">
              
              {/* Central Badge */}
              <div className="w-16 h-16 rounded-2xl bg-cream border-2 border-yellow flex items-center justify-center text-navy mb-4 mx-auto shadow-sm">
                <GlobeIcon className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4" />
                ))}
                <span className="text-xs font-bold text-navy ml-1.5">5.0 Star Tutoring</span>
              </div>

              <div className="text-center space-y-1 mb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy tracking-wider">
                  GLOBAL HORIZONS
                </h3>
                <p className="text-xs uppercase tracking-widest text-yellow-dark font-bold">
                  Cambridge • ICSE • A Levels
                </p>
                <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                  18+ Years of Academic Excellence with Ms. Ayeshabi Saheb
                </p>
              </div>

              <div className="border-t border-cream-300 pt-4 space-y-2.5">
                <div className="flex items-center gap-3 bg-cream p-2.5 rounded-xl text-xs font-medium text-navy">
                  <GraduationCapIcon className="w-5 h-5 shrink-0" />
                  <span>Ms. Ayeshabi Saheb — 18+ Yrs Educator</span>
                </div>
                <div className="flex items-center gap-3 bg-cream p-2.5 rounded-xl text-xs font-medium text-navy">
                  <BookIcon className="w-5 h-5 shrink-0" />
                  <span>Vocabulary & FLE Custom Worksheets</span>
                </div>
                <div className="flex items-center gap-3 bg-cream p-2.5 rounded-xl text-xs font-medium text-navy">
                  <MapPinIcon className="w-5 h-5 shrink-0" />
                  <span>Santacruz West — Online & Offline</span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-yellow-dark transition-colors"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
