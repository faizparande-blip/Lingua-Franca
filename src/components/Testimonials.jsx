import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../services/testimonialService';
import { StarIcon, AlertIcon, ChevronLeftIcon, ChevronRightIcon } from './common/Icons';
import Loader from './common/Loader';

export default function TestimonialsComponent() {
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function loadTestimonials() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTestimonials();
      if (response.success) {
        setTestimonialsList(response.data || []);
      } else {
        setError(response.error || 'Failed to load reviews.');
        setTestimonialsList([]);
      }
    } catch (err) {
      console.error('[Testimonials] Load error:', err);
      setError('An unexpected error occurred while loading reviews.');
      setTestimonialsList([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  const total = testimonialsList.length;
  // Carousel step navigation (advance 1 or page)
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, total - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <Loader size="md" text="Loading Verified Student Reviews..." />
      ) : error ? (
        <div className="bg-white rounded-2xl border-2 border-red-200 p-8 text-center space-y-3 max-w-2xl mx-auto shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-2">
            <AlertIcon className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-red-700">
            Unable to Load Reviews
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            {error}
          </p>
          <button
            onClick={loadTestimonials}
            className="btn-outline text-xs px-4 py-2 font-bold cursor-pointer mt-2"
          >
            Retry
          </button>
        </div>
      ) : testimonialsList.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-cream-300 p-8 text-center space-y-3 max-w-2xl mx-auto shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-cream border border-yellow flex items-center justify-center text-navy mb-2">
            <StarIcon className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-navy">
            No Verified Reviews Yet
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            We are currently curating and verifying authentic feedback from our students. Are you an alumnus? We would love to feature your academic journey!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Testimonials Responsive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-cream-300 hover:border-navy p-7 flex flex-col justify-between shadow-sm transition-all duration-200"
              >
                <div>
                  {/* Rating Stars & Verified Badge */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(Math.min(Math.max(item.rating || 5, 1), 5))].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4" />
                    ))}
                    <span className="text-[10px] tracking-wider uppercase text-navy font-bold ml-2 px-2 py-0.5 rounded bg-cream border border-cream-300">
                      Verified Student
                    </span>
                  </div>

                  <p className="font-serif italic text-slate-800 text-sm sm:text-base leading-relaxed mb-6">
                    "{item.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy text-yellow flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    {item.avatar || (item.name ? item.name.charAt(0).toUpperCase() : 'S')}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-navy">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel / Navigation Controls (active when multiple reviews exist) */}
          {total > 3 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full border-2 border-cream-300 bg-white text-navy hover:border-navy hover:bg-cream transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-slate-500">
                Viewing {total} verified student experiences
              </span>
              <button
                onClick={handleNext}
                className="p-2 rounded-full border-2 border-cream-300 bg-white text-navy hover:border-navy hover:bg-cream transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
