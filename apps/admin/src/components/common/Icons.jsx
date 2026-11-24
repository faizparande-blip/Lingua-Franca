import React from 'react';

export function BookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6.5C14 5 17 4.5 20 5v13c-3-.5-6 0-8 1.5" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 6.5v13" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="14" y="3" width="3" height="5" rx="0.5" fill="#F5B82E"/>
    </svg>
  );
}

export function PencilIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 5l4 4" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 22l1.5-5.5" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GraduationCapIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L1 9l11 6 11-6-11-6z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 12v5c0 2 3.5 4 7 4s7-2 7-4v-5" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="9" r="1.5" fill="#F5B82E"/>
      <path d="M22 9v7" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ChalkboardIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M8 20h8" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 17v3" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 8h6" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 11h4" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function LettersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="3" y="16" fontFamily="serif" fontSize="14" fontWeight="bold" fill="#0F2A5C">A</text>
      <text x="13" y="18" fontFamily="serif" fontSize="10" fontWeight="bold" fill="#F5B82E">b</text>
    </svg>
  );
}

export function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F5B82E" opacity="0.2"/>
    </svg>
  );
}

export function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-6" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PhoneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="5" r="2" fill="#F5B82E"/>
    </svg>
  );
}

export function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#0F2A5C" strokeWidth="1.5"/>
      <circle cx="12" cy="10" r="3" fill="#F5B82E"/>
    </svg>
  );
}

export function MessageIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10h8" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 13h5" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function AwardIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="6" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="8" r="2.5" fill="#F5B82E"/>
    </svg>
  );
}

export function LaptopIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M2 20h20" stroke="#0F2A5C" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 16h6" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function UsersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function LayersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 17l10 5 10-5" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function FileIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="#0F2A5C" strokeWidth="1.5"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="#F5B82E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ZapIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#0F2A5C" strokeWidth="1.5" fill="#F5B82E" fillOpacity="0.3" strokeLinejoin="round"/>
    </svg>
  );
}

export function CalendarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#0F2A5C" strokeWidth="1.5"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="#F5B82E" strokeWidth="1.5"/>
    </svg>
  );
}

export function TrendingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="#0F2A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BarChartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="20" x2="12" y2="10" stroke="#0F2A5C" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18" y1="20" x2="18" y2="4" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6" y1="20" x2="6" y2="16" stroke="#0F2A5C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function CompassIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#0F2A5C" strokeWidth="1.5"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke="#0F2A5C" strokeWidth="1" fill="#F5B82E" fillOpacity="0.4"/>
    </svg>
  );
}

export function HeartIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round" fill="#F5B82E" fillOpacity="0.2"/>
    </svg>
  );
}

export function TargetIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#0F2A5C" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="6" stroke="#F5B82E" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2" fill="#0F2A5C"/>
    </svg>
  );
}

export function GlobeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#0F2A5C" strokeWidth="1.5"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="#0F2A5C" strokeWidth="1.5"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="#F5B82E" strokeWidth="1.5"/>
    </svg>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronDownIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="#0F2A5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronLeftIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MenuIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ArrowUpIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function SendIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

export function AlertIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 9v4" stroke="#F5B82E" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="17" r="1" fill="#F5B82E"/>
    </svg>
  );
}

export function SparklesIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" stroke="#F5B82E" strokeWidth="1.5" fill="#F5B82E" fillOpacity="0.4"/>
    </svg>
  );
}

export function PlaneIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.9-.2-1.7.3-2 1.1-.3.9 0 1.9.8 2.4l4.9 3.3-3.5 3.5-2.5-.5c-.4-.1-.8.1-1.1.4-.3.3-.3.8-.2 1.2l1 2 2 1c.4.1.9.1 1.2-.2.3-.3.5-.7.4-1.1l-.5-2.5 3.5-3.5 3.3 4.9c.5.8 1.5 1.1 2.4.8.8-.3 1.3-1.1 1.1-2z" stroke="#0F2A5C" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}
