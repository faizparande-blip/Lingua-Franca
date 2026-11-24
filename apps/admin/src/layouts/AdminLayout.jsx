import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { 
  LayoutDashboard, 
  Users, 
  Star, 
  LogOut, 
  Menu, 
  X, 
  ExternalLink 
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicWebsiteUrl = import.meta.env.VITE_PUBLIC_WEBSITE_URL || 'https://linguafranca.linkal.in';

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, exact: true },
    { name: 'Demo Enquiries', path: '/enquiries', icon: Users },
    { name: 'Testimonials', path: '/testimonials', icon: Star },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Overview & Analytics';
    if (location.pathname.startsWith('/enquiries')) return 'Demo Enquiries Management';
    if (location.pathname.startsWith('/testimonials')) return 'Testimonial Moderation';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row font-sans text-navy">
      {/* Mobile Header Bar */}
      <header className="lg:hidden bg-navy text-cream px-4 py-3.5 flex items-center justify-between border-b-2 border-yellow sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cream text-navy flex items-center justify-center font-serif font-black text-sm">
            LF
          </div>
          <div>
            <span className="font-serif font-bold text-sm text-yellow block leading-none">Lingua Franca</span>
            <span className="text-[10px] text-cream/70 uppercase tracking-widest">Admin Portal</span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-yellow hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-72 bg-navy text-cream flex flex-col justify-between border-r-2 border-cream-300/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen`}
      >
        <div className="flex flex-col flex-grow">
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow text-navy flex items-center justify-center font-serif font-black text-lg shadow-sm">
                LF
              </div>
              <div>
                <span className="font-serif font-bold text-base text-yellow block leading-none">
                  Lingua Franca
                </span>
                <span className="text-[10px] text-cream/70 uppercase tracking-widest font-semibold">
                  Admin Portal
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-cream/60 hover:text-yellow p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-grow overflow-y-auto">
            <div className="text-[10px] uppercase font-bold tracking-widest text-cream/50 px-3 py-2">
              Management
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-yellow text-navy font-bold shadow-sm'
                      : 'text-cream/80 hover:bg-white/10 hover:text-yellow'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="pt-6 text-[10px] uppercase font-bold tracking-widest text-cream/50 px-3 py-2">
              External Shortcuts
            </div>
            <a
              href={publicWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-cream/80 hover:bg-white/10 hover:text-yellow transition-all"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-yellow" />
                <span>Live Website</span>
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-cream/70">Visit</span>
            </a>
          </nav>
        </div>

        {/* User Profile & Logout Box */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-yellow text-navy flex items-center justify-center font-serif font-black text-xs shrink-0 shadow-sm">
                LF
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-cream truncate block">
                  {user?.user_metadata?.full_name || 'Academy Staff'}
                </span>
                <span className="text-[10px] text-cream/60 truncate block font-mono">
                  {user?.email}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-cream/60 hover:text-red-400 hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="hidden lg:flex bg-white border-b-2 border-cream-300 px-8 py-4 items-center justify-between shadow-xs sticky top-0 z-30">
          <div>
            <h2 className="font-serif text-lg font-bold text-navy">
              {getPageTitle()}
            </h2>
            <p className="text-xs text-navy/50">
              Lingua Franca Official Administration
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={publicWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-6 w-px bg-cream-300" />

            <div className="flex items-center gap-2 text-xs text-navy/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-navy">Live Database Connected</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
