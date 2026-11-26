import React from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../../data/navigation';
import { courses } from '../../data/courses';
import { BookIcon, PhoneIcon, MapPinIcon, MessageIcon, ChevronRightIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-navy border-t-4 border-yellow text-cream text-sm relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center border border-yellow shrink-0">
                <BookIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-cream tracking-wide">LINGUA FRANCA</h3>
                <p className="text-[10px] tracking-[0.2em] text-yellow uppercase font-semibold">Mumbai</p>
              </div>
            </div>
            
            <p className="text-cream/85 leading-relaxed text-sm sm:text-base">
              Luxury, international English language education led by Ms. Ayeshabi Saheb. 18+ years of teaching excellence spanning Cambridge Checkpoints, IGCSE, A Levels, and ICSE.
            </p>

            <div className="pt-2">
              <p className="font-serif italic text-yellow text-sm sm:text-base font-medium">"Learn English. Explore the World."</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base text-yellow font-bold mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isAnchor = link.path.includes('#');
                return (
                  <li key={link.label}>
                    {isAnchor ? (
                      <a
                        href={link.path}
                        className="text-cream/85 hover:text-yellow flex items-center gap-1.5 transition-colors text-sm sm:text-base"
                      >
                        <ChevronRightIcon className="w-3.5 h-3.5 text-yellow" />
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-cream/85 hover:text-yellow flex items-center gap-1.5 transition-colors text-sm sm:text-base"
                      >
                        <ChevronRightIcon className="w-3.5 h-3.5 text-yellow" />
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h4 className="font-serif text-base text-yellow font-bold mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
              Our Programmes
            </h4>
            <ul className="space-y-2">
              {courses.slice(0, 6).map((course) => (
                <li key={course.id}>
                  <Link
                    to="/courses"
                    className="text-cream/85 hover:text-yellow flex items-center justify-between transition-colors group text-sm sm:text-base gap-2"
                  >
                    <span className="truncate">{course.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-navy-light text-yellow font-semibold border border-yellow/30 shrink-0">
                      {course.level}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Academy Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-base text-yellow font-bold mb-4 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow inline-block" />
              Contact Details
            </h4>

            <div className="space-y-3 text-sm sm:text-base text-cream/85">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 shrink-0 mt-0.5 text-yellow" />
                <span>
                  B/16, 2nd Floor, Anu Apartment, Milan Subway Road, Santacruz West, Mumbai - 400054, India.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 shrink-0 text-yellow" />
                <div className="flex flex-col">
                  <a href="tel:+919167217749" className="hover:text-yellow transition-colors font-medium">
                    +91 91672 17749
                  </a>
                  <a href="tel:+919833468057" className="hover:text-yellow transition-colors text-cream/70 text-xs sm:text-sm">
                    +91 98334 68057
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919167217749?text=Hello%20Ms.%20Ayeshabi%2C%20I%20would%20like%20to%20enquire%20about%20English%20Tutorials%20at%20Lingua%20Franca%20Mumbai."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-yellow text-navy px-4 py-2.5 inline-flex items-center gap-2 text-sm font-bold shadow-sm"
                >
                  <MessageIcon className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream-300/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-cream/75">
          <p>© {new Date().getFullYear()} Lingua Franca Mumbai. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-yellow">Online & Offline Sessions Available</span>
            <span>•</span>
            <span>Santacruz West, Mumbai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
