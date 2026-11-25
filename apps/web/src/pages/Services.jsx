import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { services } from '../data/services';
import { Link } from 'react-router-dom';
import { 
  LayersIcon, 
  FileIcon, 
  ZapIcon, 
  CalendarIcon, 
  TrendingIcon, 
  BookIcon, 
  BarChartIcon, 
  MessageIcon, 
  ChevronDownIcon, 
  CheckIcon, 
  LaptopIcon, 
  MapPinIcon, 
  ArrowRightIcon 
} from '../components/common/Icons';

const ICON_MAP = {
  Layers: LayersIcon,
  FileText: FileIcon,
  Zap: ZapIcon,
  Calendar: CalendarIcon,
  TrendingUp: TrendingIcon,
  BookOpen: BookIcon,
  BarChart2: BarChartIcon,
  MessageCircle: MessageIcon,
};

const FAQS = [
  {
    q: 'What age groups and grades do you mentor?',
    a: 'We teach students from Primary Checkpoint levels (ages 8–10) up through Lower Secondary, IGCSE (Grades 9 & 10), A Levels / IB (Grades 11 & 12), as well as ICSE board cohorts.',
  },
  {
    q: 'Are lessons available online, offline, or hybrid?',
    a: 'Both modes are available! We offer small-group online classes with personalised attention for every student globally, as well as offline face-to-face sessions at our centre in Santacruz West, Mumbai.',
  },
  {
    q: 'What makes your Cambridge IGCSE English preparation unique?',
    a: 'Our preparation focuses on specific examiner marking criteria for both First Language English (FLE 0500) and ESL (0510/0511). We break down directed writing, text analysis, summary tasks, and composition structures with regular past-paper marking and feedback.',
  },
  {
    q: 'Do you provide study materials and worksheets?',
    a: 'Yes, every enrolled student receives bespoke, syllabus-aligned worksheets, vocabulary enhancement guides, and model exemplar responses tailored to their specific curriculum and weak areas.',
  },
  {
    q: 'How can parents monitor academic progress?',
    a: 'We maintain regular progress tracking with transparent feedback sessions after every module and periodic assessment, keeping parents fully apprised of improvements and exam preparedness.',
  },
  {
    q: 'How do I schedule a trial or demo session?',
    a: 'You can easily request a free demo session by submitting our demo booking form or contacting Ms. Ayeshabi directly via WhatsApp (+91 9167217749) or phone.',
  },
];

export default function Services() {
  useSEO({
    title: 'Our Services | Lingua Franca Classes',
    description: 'Comprehensive English language training services, exam preparation camps, past paper drills, and personalized academic mentoring at Lingua Franca Classes.',
    canonicalPath: '/services',
  });

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-cream pb-24">
      {/* Page Header (Navy 30%) */}
      <section className="relative py-20 bg-navy text-cream border-b-4 border-yellow text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
            Pedagogical Excellence
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow mt-3 mb-4">
            Our Services
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-cream/90 max-w-2xl mx-auto">
            "A structured, multi-dimensional methodology built around each student's potential."
          </p>
        </div>
      </section>

      {/* Main 8 Services Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow">
            Core Service Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Comprehensive Learning Support
          </h2>
          <div className="w-16 h-1 bg-yellow mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] || BookIcon;
            return (
              <div
                key={service.id}
                className="bg-white p-7 rounded-2xl border-2 border-cream-300 hover:border-navy transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cream border border-yellow flex items-center justify-center text-navy mb-5 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-navy mb-2.5 group-hover:text-yellow-dark transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Online vs Offline Learning Infrastructure */}
      <section className="py-16 bg-navy text-cream border-y-4 border-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
              Flexible Formats
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mt-2">
              Online & Offline Instruction Modes
            </h2>
            <p className="text-cream/90 text-base sm:text-lg mt-2 leading-relaxed">
              Choose the learning environment that best accommodates your child's schedule and geographical location.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Online Card */}
            <div className="bg-navy-light border-2 border-cream-300/30 rounded-3xl p-8 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center border-2 border-yellow text-navy">
                  <LaptopIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream">Virtual Online Sessions</h3>
                  <p className="text-xs text-yellow font-bold uppercase tracking-wider">Across India & International</p>
                </div>
              </div>

              <div className="space-y-3 text-cream/90 text-sm sm:text-base">
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span className="text-cream font-medium">Small-group online classes with personalised attention for every student.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>Real-time digital whiteboard and live interactive markup of student compositions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>Cloud repository for instantaneous sharing of past papers, rubrics, and notes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>High flexibility for students balancing school obligations and extracurriculars.</span>
                </div>
              </div>
            </div>

            {/* Offline Card */}
            <div className="bg-navy-light border-2 border-cream-300/30 rounded-3xl p-8 relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center border-2 border-yellow text-navy">
                  <MapPinIcon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream">In-Person Tutorials</h3>
                  <p className="text-xs text-yellow font-bold uppercase tracking-wider">Santacruz West, Mumbai</p>
                </div>
              </div>

              <div className="space-y-3 text-cream/90 text-sm sm:text-base">
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>Intimate physical learning environment with focused personal attention from Ms. Ayeshabi.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>Handwritten exam practice simulations replicating genuine board examination conditions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 shrink-0 mt-1 text-yellow" />
                  <span>Convenient location: B/16, 2nd Floor, Anu Apartment, Milan Subway Road, Santacruz West.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-yellow mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-cream-300 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-cream/40 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-navy">
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-cream-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="btn-yellow inline-flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-bold shadow-md"
          >
            <span>Have More Questions? Book a Demo Session</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
