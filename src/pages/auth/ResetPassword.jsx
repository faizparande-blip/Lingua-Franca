import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password || !confirmPassword) {
      setErrorMessage('Please enter and confirm your new password.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your entries.');
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await resetPassword(password);

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to update your password. The recovery link may have expired.');
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('[ResetPassword] Error:', err);
      setErrorMessage('An unexpected error occurred while resetting your password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
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
              Create New Password
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-navy/5 rounded-3xl border border-cream-300">
          {isSuccess ? (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-navy">
                  Password Updated Successfully
                </h2>
                <p className="text-xs text-navy/70 mt-2 leading-relaxed">
                  Your new password is now active. You can proceed to sign in to your account.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/login"
                  state={{ message: 'Password updated successfully! Please sign in with your new password.' }}
                  className="btn-navy w-full py-3 text-xs font-bold uppercase tracking-wider block text-center shadow-md shadow-navy/10"
                >
                  Proceed to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="font-serif text-xl font-bold text-navy">
                  Set New Password
                </h2>
                <p className="text-xs text-navy/60 mt-1">
                  Choose a secure password with at least 6 characters.
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
                    htmlFor="reset-password"
                    className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
                  >
                    New Password
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="reset-password"
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
                    htmlFor="reset-confirm-password"
                    className="block text-xs font-bold uppercase tracking-wider text-navy/70 mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-navy/40">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="reset-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
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
                      <span>Saving New Password...</span>
                    </>
                  ) : (
                    <span>Update Password</span>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-cream-300/80 text-center text-xs text-navy/70">
                <Link
                  to="/login"
                  className="font-bold text-navy hover:text-yellow-dark underline transition-colors"
                >
                  Return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
