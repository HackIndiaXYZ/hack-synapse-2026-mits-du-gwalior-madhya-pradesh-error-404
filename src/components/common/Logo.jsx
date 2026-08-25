import React from 'react';

export default function Logo({ compact = false, isLight = true }) {
  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Abstract Wave / Ripple Symbol */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path 
            d="M8.5 8.5C6.567 10.433 6.567 13.567 8.5 15.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.9" 
          />
          <path 
            d="M15.5 8.5C17.433 10.433 17.433 13.567 15.5 15.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.9" 
          />
          <path 
            d="M5.5 5.5C2.5 8.5 2.5 15.5 5.5 18.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.5" 
          />
          <path 
            d="M18.5 5.5C21.5 8.5 21.5 15.5 18.5 18.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.5" 
          />
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col">
          <span className={`font-black text-base tracking-widest uppercase font-sans leading-none ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            ECHO
          </span>
          <span className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${
            isLight ? 'text-indigo-600' : 'text-indigo-400'
          }`}>
            Memory Layer
          </span>
        </div>
      )}
    </div>
  );
}
