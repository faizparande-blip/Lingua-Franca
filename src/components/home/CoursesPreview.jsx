import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import CourseCard from '../courses/CourseCard';

export default function CoursesPreview() {
  const navigate = useNavigate();

  const handleSelectCourse = () => {
    navigate('/contact');
  };

  return (
    <section className="py-20 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-navy bg-yellow/30 px-3 py-1 rounded-full border border-yellow">
            Academic Programmes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-navy">
            World-Class English Curricula
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
            Structured programmes crafted to elevate communicative mastery, creative expression, and board exam success.
          </p>
        </div>

        {/* 6-Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={handleSelectCourse}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link to="/courses" className="btn-navy text-sm font-bold">
            Explore Course Details & Curriculum
          </Link>
        </div>
      </div>
    </section>
  );
}
