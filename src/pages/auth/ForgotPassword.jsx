import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await forgotPassword(email.trim());

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to dispatch password recovery link.');
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('[ForgotPassword] Request error:', err);
      setErrorMessage('An unexpected error occurred while processing your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Top Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-navy/70 hover:text-navy mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
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
              Account Recovery
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-navy/5 rounded-3xl border border-cream-300">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-xl font-bold text-navy">
              Reset Your Password
            </h2>
            <p className="text-xs text-navy/60 mt-1">
              Enter your email address and we'll send you a secure link to create a new password.
            </p>
          </div>

          {isSuccess ? (
            <div className="space-y-5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-navy">
                  Recovery Email Dispatched
                </h3>
                <p className="text-xs text-navy/70 mt-1.5 leading-relaxed">
                  If an account exists for <span className="font-bold text-navy font-mono">{email}</span>, you will receive an email shortly with instructions to reset your password.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="btn-navy w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center"
                >
                  Return to Sign In
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  className="btn-outline w-full py-2 text-xs font-semibold"
                >
                  Request Another Link
                </button>
              </div>
            </div>
          ) : (
            <>
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
                    htmlFor="forgot-email"
                    className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
                  >
                    Registered Email Address
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="forgot-email"
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-navy py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-navy/10 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                      <span>Sending Recovery Email...</span>
                    </>
                  ) : (
                    <span>Send Password Reset Link</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-cream-300/80 text-center text-xs text-navy/70">
                <Link
                  to="/login"
                  className="font-bold text-navy hover:text-yellow-dark underline transition-colors"
                >
                  Remember your password? Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
