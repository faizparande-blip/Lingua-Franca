import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { courses } from '../data/courses';
import CourseCard from '../components/courses/CourseCard';
import DemoForm from '../components/forms/DemoForm';
import { 
  XIcon, 
  CheckIcon, 
  MessageIcon, 
  ArrowRightIcon 
} from '../components/common/Icons';

export default function Courses() {
  useSEO({
    title: 'Courses | Lingua Franca Mumbai',
    description: 'Discover English speaking and language learning courses in Mumbai with Lingua Franca Mumbai. Comprehensive training across Cambridge Checkpoints, IGCSE, A Levels, and ICSE.',
    canonicalPath: '/courses',
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleLearnMore = (course) => {
    setSelectedCourse(course);
  };

  const handleOpenDemo = (course) => {
    setSelectedCourse(course);
    setShowDemoModal(true);
  };

  return (
    <div className="bg-cream pb-24">
      {/* Page Header (Navy 30%) */}
      <section className="relative py-20 bg-navy text-cream border-b-4 border-yellow text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
            Language Learning in Mumbai
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow mt-3 mb-4">
            Language & English Courses in Mumbai
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto">
            "Targeted syllabus training from Cambridge Checkpoint through A Levels & ICSE."
          </p>
        </div>
      </section>

      {/* Courses Grid (Cream 70%) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={() => handleLearnMore(course)}
            />
          ))}
        </div>
      </section>

      {/* Curriculum Consultation Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-cream-300 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow/30 text-navy text-xs font-bold border border-yellow">
              <span>Need Guidance?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
              Unsure which programme fits your child's syllabus?
            </h3>
            <p className="text-slate-700 text-base sm:text-lg max-w-2xl leading-relaxed">
              Speak directly with Ms. Ayeshabi Saheb. We evaluate the student's current proficiency and suggest the precise curriculum module to maximise grades.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
            <button
              onClick={() => handleOpenDemo(null)}
              className="btn-yellow w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold shadow-sm cursor-pointer"
            >
              Book a Free Demo
            </button>
            <a
              href="https://wa.me/919167217749?text=Hello%20Ms.%20Ayeshabi%2C%20I%20would%20like%20course%20guidance%20for%20my%20child."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-bold text-center flex items-center justify-center gap-2"
            >
              <MessageIcon className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && !showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-2 border-cream-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-xl space-y-6">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-navy hover:bg-cream transition-colors cursor-pointer"
              aria-label="Close"
            >
              <XIcon className="w-6 h-6 stroke-navy" />
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-navy font-bold px-3 py-1 rounded-full bg-yellow">
                {selectedCourse.level}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy mt-3">
                {selectedCourse.title}
              </h3>
            </div>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              {selectedCourse.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Syllabus Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCourse.features?.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm sm:text-base text-slate-700 font-medium">
                    <CheckIcon className="w-4 h-4 shrink-0 text-yellow-dark" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cream-300 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDemoModal(true)}
                className="btn-yellow flex-1 py-3 px-5 text-sm sm:text-base font-bold shadow-sm cursor-pointer"
              >
                Book Free Demo for this Course
              </button>
              <a
                href={`https://wa.me/919167217749?text=${encodeURIComponent(
                  `Hello Ms. Ayeshabi, I would like to know more about the ${selectedCourse.title} course.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-3 px-5 text-sm sm:text-base font-bold flex items-center justify-center gap-2"
              >
                <MessageIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Demo Booking Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative max-w-xl w-full my-8">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-white border-2 border-navy text-navy hover:bg-yellow transition-colors cursor-pointer"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5 stroke-navy" />
            </button>
            <DemoForm preselectedCourse={selectedCourse?.title} />
          </div>
        </div>
      )}
    </div>
  );
}
