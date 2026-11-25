import React from 'react';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { CompassIcon, ArrowRightIcon } from '../components/common/Icons';

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | Lingua Franca Classes',
    description: 'The requested page could not be found on Lingua Franca Classes.',
    canonicalPath: '/404',
  });

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-cream px-4">
      <div className="text-center space-y-6 max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-white border-2 border-yellow flex items-center justify-center text-navy shadow-sm">
          <CompassIcon className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow font-bold">
            Error 404
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-navy mt-3 mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
            The destination you are navigating to does not exist or has been relocated within the Lingua Franca portal.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-yellow w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold shadow-sm flex items-center justify-center gap-2"
          >
            <span>Return to Home</span>
          </Link>
          <Link
            to="/courses"
            className="btn-outline w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2"
          >
            <span>Explore Courses</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
