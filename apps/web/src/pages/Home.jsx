import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import CoursesPreview from '../components/home/CoursesPreview';
import ServicesPreview from '../components/home/ServicesPreview';
import { 
  BookIcon, 
  PencilIcon, 
  GraduationCapIcon, 
  ChalkboardIcon, 
  CheckIcon, 
  StarIcon,
  AwardIcon,
  GlobeIcon
} from '../components/common/Icons';

export default function Home() {
  return (
    <div className="bg-cream">
      <Hero />
      <Stats />
      
      {/* Features Section (Reusing content) */}
      <section id="features" className="py-20 bg-white border-b-2 border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow">
              Why Lingua Franca
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Key Pedagogical Features
            </h2>
            <div className="w-16 h-1 bg-yellow mx-auto mt-2 rounded-full" />
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-2">
              Empowering students across international boards with targeted English language instruction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-cream p-6 rounded-2xl border-2 border-cream-300 hover:border-navy transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-white border border-yellow flex items-center justify-center text-navy mb-4">
                <ChalkboardIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy mb-2">Interactive Board Work</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Live composition analysis and real-time sentence restructuring techniques.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border-2 border-cream-300 hover:border-navy transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-white border border-yellow flex items-center justify-center text-navy mb-4">
                <PencilIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy mb-2">Targeted Essay Writing</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Step-by-step guidance on directed writing, discursive essays, and descriptive prose.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border-2 border-cream-300 hover:border-navy transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-white border border-yellow flex items-center justify-center text-navy mb-4">
                <BookIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy mb-2">Bespoke Worksheets</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Custom worksheets tailored specifically to student grade level and board specifications.
              </p>
            </div>

            <div className="bg-cream p-6 rounded-2xl border-2 border-cream-300 hover:border-navy transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-white border border-yellow flex items-center justify-center text-navy mb-4">
                <GraduationCapIcon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy mb-2">18+ Years Pedagogy</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Proven track record in Cambridge Checkpoint, IGCSE, A Levels, and ICSE examinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CoursesPreview />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-cream border-y-2 border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow">
              Learning Atmosphere
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
              Academic Excellence in Focus
            </h2>
            <div className="w-16 h-1 bg-yellow mx-auto mt-2 rounded-full" />
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed pt-2">
              A glimpse into our personalised tutorials, classroom engagement, and curated student worksheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-cream-300 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cream border border-yellow flex items-center justify-center text-navy">
                <BookIcon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">Curated Study Material</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Detailed notes, mark-scheme breakdowns, and exemplary candidate responses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-cream-300 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cream border border-yellow flex items-center justify-center text-navy">
                <GlobeIcon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">Global Classrooms</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Small-group online sessions connecting motivated students across time zones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-cream-300 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cream border border-yellow flex items-center justify-center text-navy">
                <AwardIcon className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-navy">Proven Examination Results</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Consistent top percentile grades in IGCSE First Language English & A Levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesPreview />
    </div>
  );
}
