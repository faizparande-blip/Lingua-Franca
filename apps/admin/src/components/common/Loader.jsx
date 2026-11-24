import React from 'react';

export default function Loader({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className={`${sizeClasses[size] || sizeClasses.md} border-navy border-t-yellow rounded-full animate-spin`} />
      {text && <p className="text-sm text-navy tracking-wider uppercase font-sans font-bold">{text}</p>}
    </div>
  );
}
