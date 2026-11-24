import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { navLinks } from '../../data/navigation';
import { BookIcon, XIcon } from './Icons';
import { User, LogOut, LayoutDashboard, ChevronDown, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  // Click outside listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'My Account';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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

          {/* Action Area: Auth / Account + Book Free Demo + Drawer Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Auth Entry Point */}
            {user ? (
              <div className="relative hidden md:block" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-cream transition-all cursor-pointer shadow-sm"
                  aria-expanded={isProfileOpen}
                >
                  <div className="w-6 h-6 rounded-lg bg-yellow text-navy font-bold text-[10px] flex items-center justify-center font-serif">
                    {initials}
                  </div>
                  <span className="text-xs font-semibold max-w-[120px] truncate">
                    {displayName}
                  </span>
                  {isAdmin && (
                    <span className="bg-yellow text-navy text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-yellow transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Card */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-cream-300 py-2 z-50 animate-fade-in font-sans text-navy">
                    <div className="px-4 py-2.5 border-b border-cream-300">
                      <p className="text-xs font-bold text-navy truncate">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-navy/50 truncate font-mono">
                        {user.email}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isAdmin
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-cream text-navy/70 border border-cream-300'
                          }`}
                        >
                          {isAdmin ? <ShieldCheck className="w-3 h-3 text-amber-800" /> : <User className="w-3 h-3" />}
                          {isAdmin ? 'Administrator' : 'Student Account'}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 space-y-0.5">
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-navy hover:bg-cream transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-navy" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cream/30 text-cream text-xs font-bold hover:bg-white/10 hover:text-yellow transition-all whitespace-nowrap shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </Link>
            )}

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

      {/* Dashboard Drawer Menu (Opens for both desktop & mobile on clicking the 3-lines button) */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-[750px] border-b-4 border-yellow py-5 px-6 sm:px-10 bg-navy shadow-2xl' 
            : 'max-h-0 py-0 px-6 sm:px-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* User Account Bar in Drawer */}
          <div className="pb-4 mb-4 border-b border-cream-300/20 flex flex-wrap items-center justify-between gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow text-navy font-serif font-black flex items-center justify-center text-xs shadow-sm">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cream">
                      {displayName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isAdmin
                          ? 'bg-yellow text-navy'
                          : 'bg-white/20 text-cream'
                      }`}
                    >
                      {isAdmin ? 'Administrator' : 'Student'}
                    </span>
                  </div>
                  <span className="text-[11px] text-cream/60 font-mono">
                    {user.email}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-yellow">
                  Lingua Franca Portal
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-xl bg-yellow text-navy text-xs font-bold hover:bg-yellow-dark transition-colors inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Admin Portal</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-cream hover:text-red-300 text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 text-cream hover:bg-white/20 hover:text-yellow text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-white/20"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-yellow text-navy hover:bg-yellow-dark text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
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
