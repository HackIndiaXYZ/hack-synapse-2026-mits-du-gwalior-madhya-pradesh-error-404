import React, { useState } from 'react';
import { StatusBadge, SourceBadge } from '../common/Badge';
import MemoryGraphVisualizer from '../common/MemoryGraphVisualizer';
import { 
  AlertTriangle, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  FolderGit2, 
  Users, 
  GitCommit,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Link2,
  Zap,
  Flame
} from 'lucide-react';

export default function OverviewView({ 
  onNavigate, 
  sourcesCount = 12,
  theme = 'light',
  customChunks = []
}) {
  const [whyOpen, setWhyOpen] = useState(false);
  const isLight = theme === 'light';


  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-12">
      {/* Top Greeting Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        isLight ? 'border-slate-200' : 'border-white/[0.06]'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            LIVE MEMORY GRAPH
          </div>
          <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Good morning, Jatin.
          </h2>
          <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Project AURA · Team memory overview & context signals
          </p>
        </div>

        <button
          onClick={() => onNavigate('ask-echo')}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] group"
        >
          <Sparkles className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
          <span>Ask ECHO Memory</span>
          <kbd className="px-1.5 py-0.5 rounded bg-indigo-800 text-[10px] font-mono text-indigo-200 border border-indigo-400/30 ml-1">⌘K</kbd>
        </button>
      </div>

      {/* Grid: Prominent Project Health Section + Interactive Memory Graph Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Project Health Hero Card */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          isLight 
            ? 'bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border-amber-300 shadow-xl shadow-amber-500/5' 
            : 'echo-card bg-gradient-to-r from-[#121318] via-[#161720] to-[#121318] border-amber-500/20'
        } relative overflow-hidden flex flex-col justify-between`}>
          {/* Subtle background glow */}
          <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-xs uppercase tracking-wider font-extrabold ${isLight ? 'text-amber-800' : 'text-zinc-400'}`}>
                  PROJECT HEALTH
                </span>
                <StatusBadge status="AT RISK" isLight={isLight} />
              </div>
              <span className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${isLight ? 'text-slate-600' : 'text-zinc-500'}`}>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                Detected 18 minutes ago
              </span>
            </div>

            <h3 className={`text-2xl font-black tracking-tight leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
              "Backend authentication is blocking frontend integration."
            </h3>

            {/* Interactive "Why?" Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setWhyOpen(!whyOpen)}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-700 hover:text-amber-600 transition-colors py-1 group"
              >
                <span>Why is Project AURA at risk?</span>
                {whyOpen ? (
                  <ChevronDown className="w-4 h-4 text-amber-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>

              {whyOpen && (
                <div className={`mt-3 p-4 rounded-xl border space-y-3 text-xs ${
                  isLight 
                    ? 'bg-amber-50/80 border-amber-200 text-slate-800 shadow-sm' 
                    : 'bg-zinc-950/80 border-amber-500/20 text-zinc-300'
                } animate-in slide-in-from-top-2 duration-150`}>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">1</span>
                    <span>Authentication has remained unresolved across <strong>3 conversations</strong> over the last 48 hours.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">2</span>
                    <span>Frontend integration (Aman) strictly depends on the backend API endpoints (Rahul).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">3</span>
                    <span>A previous API completion commitment (expected Tuesday) has not been met.</span>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold text-slate-500">Grounding: team_chat.txt & rahul_voice_note.mp3</span>
                    <button 
                      onClick={() => onNavigate('timeline')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    >
                      View in Timeline <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: COOL MEMORY GRAPH VISUALIZER */}
        <MemoryGraphVisualizer theme={theme} />
      </div>

      {/* Key Signals Metrics */}
      <div>
        <h4 className={`text-xs font-extrabold uppercase tracking-wider mb-3 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
          Key Memory Metrics
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={isLight ? 'echo-card-bright p-5' : 'echo-card p-4'}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Messages remembered</span>
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-3xl font-black font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>486</span>
              <p className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Indexed & embedded</p>
            </div>
          </div>

          <div className={isLight ? 'echo-card-bright p-5' : 'echo-card p-4'}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Sources connected</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-3xl font-black font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>{sourcesCount}</span>
              <p className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Chats, Notes & Voice</p>
            </div>
          </div>

          <div className={isLight ? 'echo-card-bright p-5' : 'echo-card p-4'}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Team members</span>
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-3xl font-black font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>4</span>
              <p className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Active context nodes</p>
            </div>
          </div>

          <div className={isLight ? 'echo-card-bright p-5' : 'echo-card p-4'}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Open threads</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <GitCommit className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-3xl font-black font-mono tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>3</span>
              <p className={`text-[11px] font-semibold mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Require alignment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Memory Feed & Active Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Memory Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              Recent Memory Feed
            </h4>
            <button 
              onClick={() => onNavigate('timeline')} 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              Full Timeline <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={isLight ? 'echo-card-bright p-6 space-y-6' : 'echo-card p-5 space-y-6'}>
            {/* TODAY section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-mono font-extrabold uppercase tracking-wider border border-indigo-200">
                  TODAY
                </span>
                <div className={`h-px flex-1 ${isLight ? 'bg-slate-200' : 'bg-white/[0.06]'}`} />
              </div>

              {/* Render Custom Uploaded Chunks first */}
              {customChunks.map((c, i) => (
                <div key={i} className={`flex items-start gap-3.5 p-3.5 rounded-xl transition-colors ${
                  isLight ? 'bg-indigo-50/70 border border-indigo-200' : 'bg-indigo-950/30 border border-indigo-500/20'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border border-indigo-400 text-white flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-sm">
                    {(c.speaker || 'U')[0]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        New source ingested: {c.sourceName || 'Uploaded File'}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-indigo-600">Just now</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-mono font-semibold ${isLight ? 'text-indigo-950' : 'text-indigo-200'}`}>
                      "{c.content}"
                    </p>
                    <div className="pt-1 flex items-center gap-2">
                      <SourceBadge type={c.sourceType || 'Conversation'} isLight={isLight} />
                      <span className="text-[10px] text-indigo-600 font-mono font-bold">{c.sourceName || 'upload.txt'}</span>
                    </div>
                  </div>
                </div>
              ))}


              {/* Feed item 1 */}
              <div className={`flex items-start gap-3.5 p-3.5 rounded-xl transition-colors ${
                isLight ? 'hover:bg-slate-50 border border-transparent hover:border-slate-200' : 'hover:bg-white/[0.03]'
              }`}>
                <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-sm">
                  R
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Rahul mentioned authentication is still unresolved</span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500">2:14 PM</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-zinc-400'}`}>
                    "Still working through the JWT validation logic in backend auth middleware."
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <SourceBadge type="Conversation" isLight={isLight} />
                    <span className="text-[10px] text-slate-500 font-mono font-semibold">team_chat.txt</span>
                  </div>
                </div>
              </div>

              {/* Feed item 2 */}
              <div className={`flex items-start gap-3.5 p-3.5 rounded-xl transition-colors ${
                isLight ? 'hover:bg-slate-50 border border-transparent hover:border-slate-200' : 'hover:bg-white/[0.03]'
              }`}>
                <div className="w-8 h-8 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 shadow-sm">
                  A
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Aman asked about backend API availability</span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500">11:42 AM</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-zinc-400'}`}>
                    "Frontend integration is blocked waiting on the backend API endpoints."
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <SourceBadge type="Conversation" isLight={isLight} />
                    <span className="text-[10px] text-slate-500 font-mono font-semibold">team_chat.txt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Active Signals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              Active Signals
            </h4>
            <button 
              onClick={() => onNavigate('insights')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              All Signals →
            </button>
          </div>

          <div className="space-y-3">
            <div 
              onClick={() => onNavigate('insights')}
              className={`p-4 rounded-xl border-l-4 border-l-amber-500 space-y-2 cursor-pointer transition-all ${
                isLight ? 'bg-amber-50/60 hover:bg-amber-50 border border-amber-200 shadow-sm' : 'echo-card-interactive'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-700 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  Backend Dependency
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">Risk</span>
              </div>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                Frontend integration is waiting on the API endpoints to complete auth.
              </p>
              <div className="text-[11px] text-slate-500 font-mono font-semibold pt-1 border-t border-amber-200/50">
                <span>Rahul → Aman</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('insights')}
              className={`p-4 rounded-xl border-l-4 border-l-rose-500 space-y-2 cursor-pointer transition-all ${
                isLight ? 'bg-rose-50/60 hover:bg-rose-50 border border-rose-200 shadow-sm' : 'echo-card-interactive'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-rose-700 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-600" />
                  Missed Commitment
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500">Commitment</span>
              </div>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                API completion was expected yesterday (Tuesday) by Rahul.
              </p>
              <div className="text-[11px] text-slate-500 font-mono font-semibold pt-1 border-t border-rose-200/50">
                <span>Rahul (Backend)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
