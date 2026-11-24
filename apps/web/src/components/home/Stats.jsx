import React from 'react';
import { AwardIcon, LaptopIcon, UsersIcon } from '../common/Icons';

export default function Stats() {
  const stats = [
    {
      id: 1,
      value: '18+',
      label: 'Years of Teaching Excellence',
      description: 'Mentoring thousands of students towards Cambridge and ICSE triumphs.',
      icon: AwardIcon,
    },
    {
      id: 2,
      value: 'Online & Offline',
      label: 'Flexible Session Delivery',
      description: 'Small-group online classes with personalised attention for every student, plus in-person sessions in Mumbai.',
      icon: LaptopIcon,
    },
    {
      id: 3,
      value: '100%',
      label: 'Personalised Learning Focus',
      description: 'Individual worksheets, tailored pace, constructive feedback, and targeted exam strategies.',
      icon: UsersIcon,
    },
  ];

  return (
    <section className="bg-cream py-14 border-b-2 border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-cream-300">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center px-4 sm:px-8 py-4 space-y-2.5 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-yellow flex items-center justify-center text-navy shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                  {stat.value}
                </h3>
                
                <h4 className="font-serif text-base sm:text-lg font-bold text-navy">
                  {stat.label}
                </h4>
                
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-xs">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
