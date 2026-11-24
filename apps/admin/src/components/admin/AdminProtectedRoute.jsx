import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loader from '../common/Loader.jsx';
import { AlertIcon } from '../common/Icons.jsx';

export default function AdminProtectedRoute() {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 mx-auto rounded-xl bg-navy flex items-center justify-center text-yellow font-serif font-bold text-xl shadow-md">
            LF
          </div>
          <Loader size="md" text="Verifying Administrator Authorization..." />
        </div>
      </div>
    );
  }

  // If unauthenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but not authorized as admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-md w-full text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-red-600">
            <AlertIcon className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl font-bold text-navy">
            Access Restricted
          </h2>

          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 text-left space-y-1">
            <p className="font-bold">Account Not Authorized as Administrator</p>
            <p>Signed in as: <span className="font-mono font-semibold">{user.email}</span></p>
            <p className="text-[11px] text-red-600 pt-1">
              Your account lacks the server-verified <code>app_metadata</code> role or presence in the <code>admin_users</code> allowlist.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={logout}
              className="btn-navy w-full py-2.5 text-xs font-bold cursor-pointer"
            >
              Sign Out & Switch Account
            </button>
            <a
              href={import.meta.env.VITE_PUBLIC_WEBSITE_URL || 'https://linguafranca.linkal.in'}
              className="btn-outline w-full py-2.5 text-xs font-semibold"
            >
              Back to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
