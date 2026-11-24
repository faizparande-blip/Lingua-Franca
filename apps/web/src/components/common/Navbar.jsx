import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navigation';
import { BookIcon, XIcon } from './Icons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-md py-2.5 border-b border-cream-300/20'
          : 'bg-navy py-3.5 border-b border-navy-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cream flex items-center justify-center border border-yellow shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
              <BookIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg xl:text-xl font-bold tracking-wider text-cream group-hover:text-yellow transition-colors duration-200 leading-tight">
                LINGUA FRANCA
              </span>
              <span className="text-[9px] sm:text-[10px] xl:text-xs tracking-[0.2em] uppercase text-yellow font-sans font-semibold">
                The English Tutorials
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navLinks.map((link) => {
              const isAnchor = link.path.includes('#');
              if (isAnchor) {
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    className="text-xs xl:text-sm font-medium py-1 text-cream/90 hover:text-yellow transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs xl:text-sm font-medium transition-all duration-200 relative py-1 hover:text-yellow whitespace-nowrap ${
                      isActive ? 'text-yellow font-semibold' : 'text-cream/90'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Action Area: Book Free Demo + Drawer Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Book Free Demo Button (always visible) */}
            <Link
              to="/contact"
              className="btn-yellow px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap"
            >
              Book a Free Demo
            </Link>

            {/* Dashboard 3-Lines Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation dashboard"
              className="w-10 h-10 rounded-xl bg-navy-light text-yellow hover:bg-yellow hover:text-navy border-2 border-yellow/60 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-sm shrink-0"
              title="Dashboard Menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-5 h-5 stroke-current" />
              ) : (
                <>
                  <span className="w-5 h-0.5 bg-yellow rounded-full transition-transform" />
                  <span className="w-5 h-0.5 bg-yellow rounded-full transition-transform" />
                  <span className="w-5 h-0.5 bg-yellow rounded-full transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Drawer Menu */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-[650px] border-b-4 border-yellow py-5 px-6 sm:px-10 bg-navy shadow-2xl' 
            : 'max-h-0 py-0 px-6 sm:px-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-cream-300/20">
            <span className="text-xs uppercase font-bold tracking-widest text-yellow">
              Quick Navigation Dashboard
            </span>
            <span className="text-xs text-cream/60">Lingua Franca Portal</span>
          </div>

          <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {navLinks.map((link) => {
              const isAnchor = link.path.includes('#');
              if (isAnchor) {
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-medium py-2 px-3.5 rounded-xl text-cream/90 bg-navy-light/60 hover:bg-yellow hover:text-navy transition-colors flex items-center justify-between border border-cream-300/10"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-bold">→</span>
                  </a>
                );
              }
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium py-2 px-3.5 rounded-xl transition-colors flex items-center justify-between border ${
                      isActive
                        ? 'bg-yellow text-navy font-bold border-yellow'
                        : 'text-cream/90 bg-navy-light/60 border-cream-300/10 hover:bg-yellow hover:text-navy'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-bold">→</span>
                </NavLink>
              );
            })}
          </nav>
          
          <div className="pt-4 mt-3 border-t border-cream-300/20 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-cream/80">
              <span className="font-semibold text-yellow">Need Instant Help?</span> Call: <a href="tel:+919167217749" className="text-cream hover:text-yellow">+91 91672 17749</a>
            </div>
            <a
              href="https://wa.me/919167217749"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-bold border border-yellow/60 text-yellow rounded-xl hover:bg-yellow hover:text-navy transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
