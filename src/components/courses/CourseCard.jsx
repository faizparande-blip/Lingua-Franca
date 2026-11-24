import React from 'react';
import { 
  BookIcon, 
  PencilIcon, 
  AwardIcon, 
  GlobeIcon, 
  GraduationCapIcon, 
  FileIcon, 
  CheckIcon, 
  ArrowRightIcon 
} from '../common/Icons';

const ICON_MAP = {
  BookOpen: BookIcon,
  PenTool: PencilIcon,
  Award: AwardIcon,
  Globe: GlobeIcon,
  GraduationCap: GraduationCapIcon,
  FileText: FileIcon,
};

export default function CourseCard({ course, onSelect }) {
  const IconComponent = ICON_MAP[course.icon] || BookIcon;

  return (
    <div className="bg-white rounded-2xl border-2 border-cream-300 hover:border-navy p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-cream border border-yellow flex items-center justify-center text-navy transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-yellow text-navy font-bold">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy mb-3 group-hover:text-navy-light transition-colors duration-200">
          {course.title}
        </h3>

        {/* Short Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {course.shortDescription}
        </p>

        {/* Features Checklist */}
        <div className="space-y-2 mb-8">
          {course.features?.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <CheckIcon className="w-4 h-4 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onSelect ? onSelect(course) : null}
        className="w-full py-2.5 px-4 rounded-xl border-2 border-navy text-navy font-bold text-sm hover:bg-yellow hover:border-yellow transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Learn More & Enquire</span>
        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
