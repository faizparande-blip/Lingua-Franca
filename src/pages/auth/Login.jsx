import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, AlertCircle, BookOpen, CheckCircle } from 'lucide-react';

export default function Login() {
  const { user, isAdmin, isLoading: authLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState(location.state?.message || '');

  // Redirect destination after login
  const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/');

  // If already logged in, redirect accordingly
  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        const dest = location.state?.from?.pathname || '/';
        navigate(dest, { replace: true });
      }
    }
  }, [user, isAdmin, authLoading, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await login(email.trim(), password);

      if (!result.success) {
        setErrorMessage(result.error || 'Unable to sign in. Please check your credentials.');
        return;
      }

      // Secure role-based redirection
      if (result.isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        const targetPath = location.state?.from?.pathname || '/';
        navigate(targetPath, { replace: true });
      }
    } catch (err) {
      console.error('[Login] Submission error:', err);
      setErrorMessage('An unexpected error occurred during sign-in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Top Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-navy/70 hover:text-navy mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Lingua Franca</span>
        </Link>

        {/* Brand Crest */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-navy text-yellow flex items-center justify-center font-serif font-black text-2xl shadow-lg border-2 border-yellow/40">
            LF
          </div>
          <div>
            <h1 className="font-serif text-3xl font-black text-navy tracking-tight">
              Lingua Franca
            </h1>
            <p className="text-xs uppercase tracking-widest text-navy/60 font-bold mt-1">
              The English Tutorials
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-navy/5 rounded-3xl border border-cream-300">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-xl font-bold text-navy">
              Welcome Back
            </h2>
            <p className="text-xs text-navy/60 mt-1">
              Sign in with your email and password to access your account.
            </p>
          </div>

          {infoMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                {infoMessage}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-xs">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-cream/40 border border-cream-300 rounded-xl text-sm text-navy placeholder-navy/30 focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold uppercase tracking-wider text-navy/70"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-navy/70 hover:text-navy underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-cream/40 border border-cream-300 rounded-xl text-sm text-navy placeholder-navy/30 focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-navy/40 hover:text-navy cursor-pointer transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-navy py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-navy/10 mt-6"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Account</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-cream-300/80 text-center text-xs text-navy/70">
            <span>Don't have an account yet? </span>
            <Link
              to="/signup"
              className="font-bold text-navy hover:text-yellow-dark underline transition-colors"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
