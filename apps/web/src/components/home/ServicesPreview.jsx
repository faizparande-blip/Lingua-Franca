import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { 
  LayersIcon, 
  FileIcon, 
  ZapIcon, 
  CalendarIcon, 
  TrendingIcon, 
  BookIcon, 
  BarChartIcon, 
  MessageIcon, 
  ArrowRightIcon 
} from '../common/Icons';

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

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-navy text-cream border-t-4 border-yellow relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-yellow bg-white/10 px-3 py-1 rounded-full">
            Our Pedagogical Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
            Tailored Educational Services
          </h2>
          <div className="w-16 h-1 bg-yellow mx-auto mt-2 rounded-full" />
          <p className="text-cream/80 text-sm sm:text-base leading-relaxed pt-2">
            Every learner benefits from our multi-dimensional system of customised resources, continual evaluation, and stimulating lessons.
          </p>
        </div>

        {/* 8-Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = ICON_MAP[service.icon] || BookIcon;
            return (
              <div
                key={service.id}
                className="bg-white text-navy p-6 rounded-2xl border-2 border-cream-300 hover:border-yellow transition-all duration-300 hover:-translate-y-1 shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cream border border-yellow flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy mb-2 group-hover:text-yellow-dark transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action strip */}
        <div className="mt-14 p-8 rounded-3xl bg-navy-light border-2 border-yellow/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-1">
              Ready to experience our teaching methodology?
            </h3>
            <p className="text-cream/80 text-xs sm:text-sm">
              Schedule an obligation-free 30-minute demo session with Ms. Ayeshabi Saheb.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-yellow shrink-0 px-6 py-3 text-sm font-bold shadow-md flex items-center gap-2"
          >
            <span>Book a Free Demo</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
