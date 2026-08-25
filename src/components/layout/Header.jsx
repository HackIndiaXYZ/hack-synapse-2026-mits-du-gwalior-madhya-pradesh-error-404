import React from 'react';
import { Search, Sparkles, Bell, Layers, Menu, Sun, Moon } from 'lucide-react';

export default function Header({ 
  activeView, 
  onOpenCommandPalette, 
  onToggleMobileMenu,
  theme = 'light',
  onToggleTheme,
  isWhatsAppActive = true,
  onOpenWhatsAppModal
}) {

  const titles = {
    overview: 'Overview',
    'ask-echo': 'Ask ECHO',
    timeline: 'Memory Timeline',
    sources: 'Memory Sources',
    insights: 'Signals & Insights',
    team: 'Team Memory',
    settings: 'Settings'
  };

  const isLight = theme === 'light';

  return (
    <header className={`h-16 border-b sticky top-0 z-30 px-6 flex items-center justify-between transition-colors ${
      isLight 
        ? 'bg-white/85 border-slate-200/80 backdrop-blur-xl shadow-sm' 
        : 'bg-[#09090b]/80 border-white/[0.07] backdrop-blur-md'
    }`}>
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobileMenu}
          className={`md:hidden p-1.5 rounded-lg ${isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Project AURA</span>
          <span className={isLight ? 'text-slate-300' : 'text-zinc-600'}>/</span>
          <h1 className={`text-base font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {titles[activeView] || 'Overview'}
          </h1>
        </div>
      </div>

      {/* Right: Theme Toggle & Quick Search */}
      <div className="flex items-center gap-3">
        {/* Bright / Dark Mode Switch Button */}
        <button
          onClick={onToggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
            isLight
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          }`}
          title="Toggle UI Theme Mode"
        >
          {isLight ? (
            <>
              <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>Bright Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* WhatsApp Auto-Sync Live Indicator */}
        <button
          onClick={onOpenWhatsAppModal}
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all shadow-sm ${
            isWhatsAppActive 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
              : isLight ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200' : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          }`}
          title="Configure WhatsApp Auto-Retrieval Integration"
        >
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isWhatsAppActive ? 'bg-emerald-400' : 'bg-slate-400'} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isWhatsAppActive ? 'bg-emerald-600' : 'bg-slate-500'}`} />
          </span>
          <span>{isWhatsAppActive ? 'WhatsApp Auto-Sync: Active' : 'Connect WhatsApp'}</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className={`hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-xl border text-xs transition-all group ${
            isLight
              ? 'bg-slate-100/80 hover:bg-slate-200/80 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
              : 'bg-zinc-900/90 hover:bg-zinc-800 border-white/[0.08] text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Search team memory...</span>
          </div>
          <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${
            isLight ? 'bg-white text-slate-500 border-slate-300' : 'bg-zinc-800 text-zinc-400 border-white/[0.05]'
          }`}>
            ⌘K
          </kbd>
        </button>


        {/* Status Indicator */}
        <div className={`flex items-center gap-2 pl-3 border-l ${isLight ? 'border-slate-200' : 'border-white/[0.07]'}`}>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
          </span>
          <span className={`text-[11px] font-mono font-semibold hidden lg:inline ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Memory Syncing
          </span>
        </div>
      </div>
    </header>
  );
}
