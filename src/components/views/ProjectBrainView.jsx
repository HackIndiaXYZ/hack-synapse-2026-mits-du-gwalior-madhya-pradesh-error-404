import React from 'react';
import { 
  Brain, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ShieldAlert, 
  HelpCircle,
  Sparkles,
  Layers,
  GitCommit
} from 'lucide-react';

export default function ProjectBrainView({ onNavigate, theme = 'light' }) {
  const isLight = theme === 'light';

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Header */}
      <div className={`border-b pb-6 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
          <Brain className="w-4 h-4 text-indigo-600" />
          PROJECT BRAIN ENGINE
        </div>
        <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Project Brain & Intelligence Summary
        </h2>
        <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
          ECHO continuously synthesizes team conversation history into live status buckets, delay risks, and contradictions.
        </p>
      </div>

      {/* Project Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Completed */}
        <div className={`p-5 rounded-2xl border space-y-3 ${
          isLight ? 'bg-emerald-50/60 border-emerald-200 shadow-sm' : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <div className="flex items-center justify-between text-emerald-700 font-extrabold text-xs">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Completed Tasks
            </span>
            <span className="font-mono">2 Done</span>
          </div>
          <ul className="space-y-1.5 text-xs font-semibold text-emerald-950">
            <li className="flex items-center gap-1.5">✓ UI design system</li>
            <li className="flex items-center gap-1.5">✓ Supabase schema</li>
          </ul>
        </div>

        {/* In Progress */}
        <div className={`p-5 rounded-2xl border space-y-3 ${
          isLight ? 'bg-indigo-50/60 border-indigo-200 shadow-sm' : 'bg-indigo-500/10 border-indigo-500/30'
        }`}>
          <div className="flex items-center justify-between text-indigo-700 font-extrabold text-xs">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-indigo-600" />
              In Progress
            </span>
            <span className="font-mono">2 Active</span>
          </div>
          <ul className="space-y-1.5 text-xs font-semibold text-indigo-950">
            <li className="flex items-center gap-1.5">◐ Backend API endpoints</li>
            <li className="flex items-center gap-1.5">◐ Token validation</li>
          </ul>
        </div>

        {/* Blocked */}
        <div className={`p-5 rounded-2xl border space-y-3 ${
          isLight ? 'bg-amber-50/80 border-amber-300 shadow-sm' : 'bg-amber-500/10 border-amber-500/30'
        }`}>
          <div className="flex items-center justify-between text-amber-800 font-extrabold text-xs">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Blocked
            </span>
            <span className="font-mono">1 Blocker</span>
          </div>
          <ul className="space-y-1.5 text-xs font-extrabold text-amber-950">
            <li className="flex items-center gap-1.5">⚠ Authentication</li>
          </ul>
        </div>

        {/* Upcoming */}
        <div className={`p-5 rounded-2xl border space-y-3 ${
          isLight ? 'bg-slate-100 border-slate-200 shadow-sm' : 'bg-zinc-900 border-white/[0.08]'
        }`}>
          <div className="flex items-center justify-between text-slate-700 font-extrabold text-xs">
            <span className="flex items-center gap-1.5">
              <ArrowRight className="w-4 h-4 text-slate-500" />
              Upcoming
            </span>
            <span className="font-mono">2 Planned</span>
          </div>
          <ul className="space-y-1.5 text-xs font-semibold text-slate-800">
            <li className="flex items-center gap-1.5">→ Frontend integration</li>
            <li className="flex items-center gap-1.5">→ Saturday Demo</li>
          </ul>
        </div>
      </div>

      {/* Killer Feature Cards: Broken Promise Detector & Contradiction Detector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Broken Promise & Delay Detector */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
          isLight ? 'echo-card-bright border-rose-200' : 'echo-card border-rose-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 border border-rose-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider">
                AUTOMATIC DELAY DETECTOR
              </span>
              <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Missed Commitment Chain
              </h3>
            </div>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 text-xs font-mono font-semibold ${
            isLight ? 'bg-rose-50/50 border-rose-200 text-slate-800' : 'bg-zinc-950/70 border-white/[0.04] text-zinc-300'
          }`}>
            <div className="flex justify-between"><span>Mon 7:42 PM: Rahul: "I'll finish API tomorrow"</span><span className="text-indigo-600 font-bold">Commitment</span></div>
            <div className="flex justify-between"><span>Tue 10:20 AM: Rahul: "Backend 70% done"</span><span className="text-indigo-600 font-bold">Progress</span></div>
            <div className="flex justify-between"><span>Wed 11:18 AM: Rahul: "Blocked by auth"</span><span className="text-amber-600 font-bold">Blocker</span></div>
            <div className="flex justify-between"><span>Thu 2:10 PM: Aman: "Frontend waiting"</span><span className="text-rose-600 font-bold">Impact</span></div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-700">⚠ Risk: Demo readiness threatened</span>
            <button 
              onClick={() => onNavigate('timeline')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              Inspect Timeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Contradiction Detector */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-lg ${
          isLight ? 'echo-card-bright border-purple-200' : 'echo-card border-purple-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700 border border-purple-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-wider">
                CONTRADICTION CLASSIFIER
              </span>
              <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Conflicting Status Statements
              </h3>
            </div>
          </div>

          <p className={`text-xs font-semibold leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
            Rahul reported status as <strong>"70% done"</strong> on Tuesday morning, but subsequently reported a total <strong>authentication blocker</strong> on Wednesday morning.
          </p>

          <div className={`p-3.5 rounded-xl border text-xs font-mono font-semibold ${
            isLight ? 'bg-purple-50/60 border-purple-200 text-purple-950' : 'bg-purple-950/20 border-purple-500/20 text-purple-200'
          }`}>
            Confidence Score: 0.92 · Flagged for sprint retrospective review
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-700">✓ Detected across 2 source files</span>
            <button 
              onClick={() => onNavigate('insights')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View Signals <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
