import React from 'react';
import Logo from '../common/Logo';
import { 
  LayoutDashboard, 
  Sparkles, 
  GitBranch, 
  FolderGit2, 
  Zap, 
  Users, 
  Settings, 
  ChevronDown,
  Plus,
  Brain
} from 'lucide-react';

export default function Sidebar({ 
  activeView, 
  setActiveView, 
  onOpenCommandPalette, 
  onOpenUploadModal,
  sourcesCount = 12,
  theme = 'light'
}) {
  const isLight = theme === 'light';

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'ask-echo', label: 'Ask ECHO', icon: Sparkles, badge: '⌘K', isHero: true },
    { id: 'brain', label: 'Project Brain', icon: Brain, badge: 'NEW' },
    { id: 'timeline', label: 'Memory Timeline', icon: GitBranch },
    { id: 'sources', label: 'Sources', icon: FolderGit2, count: sourcesCount },
    { id: 'insights', label: 'Insights', icon: Zap, alertDot: true },
    { id: 'team', label: 'Team', icon: Users },
  ];


  return (
    <aside className={`w-64 border-r flex flex-col justify-between shrink-0 select-none h-screen sticky top-0 transition-colors ${
      isLight 
        ? 'bg-white/90 border-slate-200 shadow-sm' 
        : 'bg-[#0d0e12] border-white/[0.07]'
    }`}>
      {/* Top Section */}
      <div className="p-4 space-y-4">
        {/* Branding */}
        <div className="px-2 py-1 flex items-center justify-between">
          <Logo isLight={isLight} />
        </div>

        {/* Workspace Selector */}
        <div className="relative">
          <button className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all shadow-sm ${
            isLight 
              ? 'bg-slate-100/90 hover:bg-slate-200/80 border-slate-200 text-slate-800' 
              : 'bg-zinc-900/80 hover:bg-zinc-800/80 border-white/[0.08] text-zinc-200'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              <span className="font-bold">Project AURA</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
          </button>
        </div>

        {/* Action Button: Add Source */}
        <button
          onClick={onOpenUploadModal}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          <span>Add Source to Memory</span>
        </button>

        {/* Main Navigation */}
        <nav className="space-y-1.5 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'ask-echo' && activeView === 'ask-echo') {
                    onOpenCommandPalette();
                  } else {
                    setActiveView(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? isLight
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-white/[0.08] text-white shadow-sm font-semibold'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${
                    isActive 
                      ? 'text-white' 
                      : isLight ? 'text-slate-500 group-hover:text-indigo-600' : 'text-zinc-500'
                  }`} />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.alertDot && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                  {item.count !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-indigo-700 text-indigo-100 border-indigo-500' 
                        : isLight ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-zinc-900 text-zinc-500 border-white/[0.05]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      isActive 
                        ? 'bg-indigo-700 text-indigo-100 border-indigo-500' 
                        : isLight ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Settings & User Profile */}
      <div className={`p-3 border-t space-y-1.5 ${isLight ? 'border-slate-200' : 'border-white/[0.07]'}`}>
        <button
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeView === 'settings'
              ? isLight ? 'bg-slate-200 text-slate-900' : 'bg-white/[0.08] text-white'
              : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Settings className={`w-4 h-4 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`} />
          <span>Settings</span>
        </button>

        {/* User Avatar & Context */}
        <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${
          isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-900/50 border-white/[0.04]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-700 font-extrabold text-xs">
              J
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-xs font-bold leading-none ${isLight ? 'text-slate-900' : 'text-zinc-200'}`}>Jatin</span>
              <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Product Lead</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Connected to Memory Layer" />
        </div>
      </div>
    </aside>
  );
}
