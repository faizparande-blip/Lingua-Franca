import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Lock, Mail, User, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, MailCheck } from 'lucide-react';

export default function SignUp() {
  const { user, isAdmin, isLoading: authLoading, register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // If already logged in, redirect
  useEffect(() => {
    if (!authLoading && user) {
      navigate(isAdmin ? '/admin' : '/', { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please complete all fields to register.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter your password.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await register({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
      });

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to create account.');
        return;
      }

      // Check if email confirmation is required
      if (result.requiresEmailConfirmation) {
        setRegisteredEmail(email.trim());
        setConfirmationSent(true);
      } else {
        // Auto-confirmed / direct session
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('[SignUp] Registration error:', err);
      setErrorMessage('An unexpected error occurred while creating your account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If email confirmation is required, show confirmation prompt screen
  if (confirmationSent) {
    return (
      <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-white py-10 px-6 sm:px-10 shadow-xl shadow-navy/5 rounded-3xl border border-cream-300 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
              <MailCheck className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-navy">
                Verify Your Email
              </h2>
              <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                Thank you for registering with Lingua Franca. We have sent a verification link to:
              </p>
              <p className="text-sm font-bold text-navy mt-1 font-mono">
                {registeredEmail}
              </p>
            </div>

            <div className="p-4 bg-cream/50 rounded-2xl border border-cream-300 text-xs text-navy/80 text-left space-y-1.5 leading-relaxed">
              <p className="font-semibold text-navy">Next Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-navy/70">
                <li>Check your inbox (and spam/junk folder).</li>
                <li>Click the confirmation link to activate your account.</li>
                <li>Return here to sign in with your password.</li>
              </ol>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="btn-navy w-full py-3 text-xs font-bold uppercase tracking-wider text-center"
              >
                Proceed to Sign In
              </Link>
              <Link
                to="/"
                className="btn-outline w-full py-2.5 text-xs font-semibold text-center"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Student Registration
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-navy/5 rounded-3xl border border-cream-300">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-xl font-bold text-navy">
              Create an Account
            </h2>
            <p className="text-xs text-navy/60 mt-1">
              Join Lingua Franca to access your learning journey and academy resources.
            </p>
          </div>

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
                htmlFor="signup-name"
                className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full pl-10 pr-4 py-3 bg-cream/40 border border-cream-300 rounded-xl text-sm text-navy placeholder-navy/30 focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="signup-email"
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
              <label
                htmlFor="signup-password"
                className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-11 py-3 bg-cream/40 border border-cream-300 rounded-xl text-sm text-navy placeholder-navy/30 focus:bg-white focus:border-navy focus:ring-1 focus:ring-navy transition-all"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-navy/40 hover:text-navy cursor-pointer transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Student Account</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-cream-300/80 text-center text-xs text-navy/70">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-bold text-navy hover:text-yellow-dark underline transition-colors"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
