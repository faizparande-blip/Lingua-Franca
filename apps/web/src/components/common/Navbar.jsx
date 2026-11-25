import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../../data/navigation';
import { BookIcon, XIcon } from './Icons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close menu on Escape key press and restore focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Auto-close menu when resizing to desktop breakpoint (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Close menu on tap outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md shadow-md py-2 sm:py-2.5 border-b border-cream-300/20'
            : 'bg-navy py-2.5 sm:py-3.5 border-b border-navy-light'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <Link
              to="/"
              onClick={closeMenu}
              className="group flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
              aria-label="Lingua Franca Classes Homepage"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cream flex items-center justify-center border border-yellow shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                <BookIcon className="w-4 h-4 sm:w-5 sm:h-5 text-navy" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-sm sm:text-lg xl:text-xl font-bold tracking-tight sm:tracking-wider text-cream group-hover:text-yellow transition-colors duration-200 leading-tight truncate">
                  LINGUA FRANCA
                </span>
                <span className="text-[8px] sm:text-[10px] xl:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase text-yellow font-sans font-semibold hidden min-[360px]:block">
                  The English Tutorials
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isAnchor = link.path.includes('#');
                if (isAnchor) {
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      className="text-sm xl:text-base font-medium py-1 text-cream/90 hover:text-yellow transition-colors whitespace-nowrap"
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
                      `text-sm xl:text-base font-medium transition-all duration-200 relative py-1 hover:text-yellow whitespace-nowrap ${
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

            {/* Action Area: Book Free Demo + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Book Free Demo Button */}
              <Link
                to="/contact"
                onClick={closeMenu}
                className="btn-yellow px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap text-center"
              >
                <span className="hidden min-[380px]:inline">Book a </span>Free Demo
              </Link>

              {/* Mobile Hamburger Toggle Button */}
              <button
                ref={buttonRef}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-navy-light text-yellow hover:bg-yellow hover:text-navy border border-yellow/60 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-sm shrink-0"
              >
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 stroke-current" />
                ) : (
                  <>
                    <span className="w-4 sm:w-5 h-0.5 bg-yellow rounded-full transition-all" />
                    <span className="w-4 sm:w-5 h-0.5 bg-yellow rounded-full transition-all" />
                    <span className="w-4 sm:w-5 h-0.5 bg-yellow rounded-full transition-all" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-nav-menu"
          ref={menuRef}
          role="region"
          aria-label="Mobile Navigation Drawer"
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen
              ? 'max-h-[calc(100dvh-4rem)] border-b-4 border-yellow py-4 px-4 sm:px-6 bg-navy shadow-2xl overflow-y-auto'
              : 'max-h-0 py-0 px-4 sm:px-6'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-cream-300/20">
              <span className="text-xs uppercase font-bold tracking-widest text-yellow">
                Menu & Navigation
              </span>
              <span className="text-xs text-cream/70 font-medium">Lingua Franca</span>
            </div>

            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label="Mobile links">
              {navLinks.map((link) => {
                const isAnchor = link.path.includes('#');
                if (isAnchor) {
                  return (
                    <a
                      key={link.label}
                      href={link.path}
                      onClick={closeMenu}
                      className="text-sm sm:text-base font-medium py-2.5 px-3.5 rounded-xl text-cream/90 bg-navy-light/60 hover:bg-yellow hover:text-navy active:bg-yellow active:text-navy transition-colors flex items-center justify-between border border-cream-300/10"
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-bold opacity-75">→</span>
                    </a>
                  );
                }
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-sm sm:text-base font-medium py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between border ${
                        isActive
                          ? 'bg-yellow text-navy font-bold border-yellow'
                          : 'text-cream/90 bg-navy-light/60 border-cream-300/10 hover:bg-yellow hover:text-navy active:bg-yellow active:text-navy'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-bold opacity-75">→</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-3.5 mt-3 border-t border-cream-300/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-cream/80">
                <span className="font-semibold text-yellow">Instant Call: </span>
                <a href="tel:+919167217749" className="text-cream font-medium hover:text-yellow underline underline-offset-2">
                  +91 91672 17749
                </a>
              </div>
              <a
                href="https://wa.me/919167217749"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full sm:w-auto text-center px-4 py-2 text-xs sm:text-sm font-bold border border-yellow/60 text-yellow rounded-xl hover:bg-yellow hover:text-navy transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop overlay for outside-tap dismissal */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-dark/70 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
