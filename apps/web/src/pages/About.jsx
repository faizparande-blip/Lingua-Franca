import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AwardIcon, 
  CompassIcon, 
  BookIcon, 
  HeartIcon, 
  TargetIcon, 
  ArrowRightIcon, 
  CheckIcon, 
  PhoneIcon, 
  MessageIcon 
} from '../components/common/Icons';

export default function About() {
  return (
    <div className="bg-cream pb-20">
      
      {/* Page Header (Navy 30%) */}
      <section className="relative py-20 bg-navy text-cream border-b-4 border-yellow text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
            The Story of Lingua Franca
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow mt-3 mb-4">
            About Our Academy
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto">
            "Passion for the English Language. Dedication to Academic Distinction."
          </p>
        </div>
      </section>

      {/* Main Narrative Section (Cream 70%) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow/20 border border-yellow text-navy text-xs font-bold uppercase tracking-wider">
              <span>Who We Are</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
              A Legacy of Empowering Articulate Minds
            </h2>

            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                Founded on the belief that English is more than an academic requirement—it is the ultimate bridge to international expression and thought—<strong className="text-navy">Lingua Franca – The English Tutorials</strong> has been a benchmark of excellence for students in Mumbai and across the world for over 18 years.
              </p>
              <p>
                We specialise in guiding students through the world's most rigorous international curricula, including <span className="font-semibold text-navy">Cambridge Checkpoints, IGCSE First Language English, IGCSE English as a Second Language, A Levels</span>, as well as the national <span className="font-semibold text-navy">ICSE</span> curriculum.
              </p>
              <p>
                Our pedagogy replaces rote learning with conceptual mastery, vocabulary expansion, critical reading, and refined compositional expression.
              </p>
            </div>
          </div>

          {/* Key Accolade Card */}
          <div className="lg:col-span-5 bg-white border-2 border-cream-300 rounded-3xl p-8 relative shadow-sm">
            <div className="space-y-6">
              <div className="border-b border-cream-300 pb-4">
                <span className="text-xs uppercase tracking-widest text-navy bg-yellow/30 px-2 py-0.5 rounded font-bold">Institutional Highlights</span>
                <h3 className="font-serif text-2xl font-bold text-navy mt-2">Teaching Credentials</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream border border-yellow flex items-center justify-center shrink-0">
                    <AwardIcon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-navy">18+ Years of Dedication</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Continuous teaching excellence and proven examination success.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream border border-yellow flex items-center justify-center shrink-0">
                    <CompassIcon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Dual Mode Infrastructure</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Interactive virtual classroom or in-person sessions in Santacruz West, Mumbai.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream border border-yellow flex items-center justify-center shrink-0">
                    <BookIcon className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg font-bold text-navy">Comprehensive Syllabus Mastery</h4>
                    <p className="text-sm text-slate-600 mt-0.5">Aligned with latest Cambridge International & ICSE Board frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Meet Ms. Ayeshabi Saheb Section */}
      <section className="py-16 bg-navy text-cream border-y-4 border-yellow relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lead Educator Portrait/Visual Column */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Circular frame */}
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-yellow p-2 bg-navy-light flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-navy flex flex-col items-center justify-center border-2 border-cream-300/30">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-yellow">AS</span>
                    <span className="text-[10px] tracking-widest text-cream/70 uppercase mt-1">Lead Educator</span>
                  </div>
                </div>
                
                {/* Experience Badge */}
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full bg-yellow text-navy font-bold text-xs tracking-wider uppercase shadow-md">
                  18+ Years Experience
                </div>
              </div>

              <div className="mt-8 space-y-1">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream">Ms. Ayeshabi Saheb</h3>
                <p className="text-yellow text-sm font-semibold">Founder & Head English Educator</p>
                <p className="text-cream/80 text-sm">Lingua Franca – The English Tutorials</p>
              </div>

              {/* Direct Contact CTAs */}
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <a
                  href="tel:+919167217749"
                  className="px-4 py-2.5 rounded-xl bg-navy-light border border-yellow text-yellow text-sm font-bold hover:bg-yellow hover:text-navy transition-all flex items-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>Call 9167217749</span>
                </a>
                <a
                  href="https://wa.me/919167217749"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-yellow px-4 py-2.5 text-sm font-bold flex items-center gap-2"
                >
                  <MessageIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Educator Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
                Meet Your Mentor
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream leading-tight">
                Dedicated Guidance from Ms. Ayeshabi Saheb
              </h2>
              
              <div className="space-y-4 text-cream/90 text-base sm:text-lg leading-relaxed">
                <p>
                  With more than <strong className="text-cream">18 years of classroom and one-on-one tutorial experience</strong>, Ms. Ayeshabi Saheb has earned a stellar reputation for her deep subject expertise, methodical lesson delivery, and exceptional rapport with students.
                </p>
                <p>
                  Her pedagogical philosophy centres around active engagement: no two students learn at the same pace or possess the exact same compositional style. Whether mentoring a student preparing for the rigorous analytical demands of Cambridge IGCSE First Language English, developing fluency for ESL candidates, or guiding young learners through Primary Checkpoints, Ms. Ayeshabi tailors every lesson to the student's unique intellectual goals.
                </p>
                <p>
                  Under her stewardship, students not only achieve outstanding academic results and board grades, but also cultivate authentic self-confidence in spoken debate, creative prose, and analytical writing.
                </p>
              </div>

              {/* Strengths checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-cream font-medium">
                  <CheckIcon className="w-4 h-4 shrink-0 text-yellow" />
                  <span>Cambridge & ICSE Syllabus Mastery</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-cream font-medium">
                  <CheckIcon className="w-4 h-4 shrink-0 text-yellow" />
                  <span>Analytical Essay Architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-cream font-medium">
                  <CheckIcon className="w-4 h-4 shrink-0 text-yellow" />
                  <span>Vocabulary Expansion Methods</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-cream font-medium">
                  <CheckIcon className="w-4 h-4 shrink-0 text-yellow" />
                  <span>Constructive, Detailed Feedback</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white border-2 border-cream-300 rounded-3xl p-8 relative shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-cream border border-yellow flex items-center justify-center text-navy mb-6">
              <TargetIcon className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy mb-3">Our Mission</h3>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              To deliver world-class, customised English language and literature education that equips each learner with the analytical clarity, stylistic finesse, and academic prowess required to excel in Cambridge, ICSE, and higher international studies.
            </p>
          </div>

          <div className="bg-white border-2 border-cream-300 rounded-3xl p-8 relative shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-cream border border-yellow flex items-center justify-center text-navy mb-6">
              <HeartIcon className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-navy mb-3">Our Teaching Philosophy</h3>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              We hold that true command of English is unlocked when students are encouraged to express authentic thoughts with precision. Through interactive discussions, targeted worksheets, and compassionate mentorship, we transform apprehension into effortless eloquence.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="btn-yellow inline-flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold shadow-md"
          >
            <span>Book a Consultation with Ms. Ayeshabi</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
