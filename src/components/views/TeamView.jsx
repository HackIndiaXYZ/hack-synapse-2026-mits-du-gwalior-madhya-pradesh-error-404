import React, { useState } from 'react';
import { INITIAL_MEMBERS } from '../../services/memoryStore';
import MemberDrawer from '../modals/MemberDrawer';
import { Users, Clock, AlertOctagon, CheckSquare, ArrowRight } from 'lucide-react';

export default function TeamView({ onNavigate, theme = 'light' }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const isLight = theme === 'light';

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Header */}
      <div className={`border-b pb-6 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
          <Users className="w-4 h-4" />
          TEAM CONTEXT GRAPH
        </div>
        <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Team Memory
        </h2>
        <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
          Understand your team's current focus, commitments, dependencies, and open blockers. Click any member for details.
        </p>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_MEMBERS.map((m) => (
          <div 
            key={m.id}
            onClick={() => setSelectedMember(m)}
            className={`p-6 space-y-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
              isLight ? 'echo-card-interactive-bright' : 'echo-card-interactive'
            }`}
          >
            <div className="space-y-4">
              {/* Member Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${m.color} flex items-center justify-center font-black text-base border shadow-sm`}>
                    {m.avatar}
                  </div>
                  <div>
                    <h3 className={`text-lg font-extrabold group-hover:text-indigo-600 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {m.name}
                    </h3>
                    <p className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{m.role}</p>
                  </div>
                </div>

                <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                  isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-zinc-900 text-zinc-400 border-white/[0.06]'
                }`}>
                  {m.recentMessages.length} messages
                </span>
              </div>

              {/* Focus tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Focus</span>
                <div className="flex flex-wrap gap-1.5">
                  {m.focus.map((f, i) => (
                    <span key={i} className={`px-2.5 py-0.5 rounded-lg border text-xs font-bold ${
                      isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-zinc-900 border-white/[0.06] text-zinc-300'
                    }`}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status summary */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-white/[0.04]'}`}>
                  <span className="text-[10px] font-bold text-slate-400 block">Commitment</span>
                  <span className={`font-extrabold truncate block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {m.commitments[0]?.task || 'None'}
                  </span>
                </div>
                <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/60 border-white/[0.04]'}`}>
                  <span className="text-[10px] font-bold text-slate-400 block">Open Blocker</span>
                  <span className={`font-extrabold truncate block ${m.blockers.length > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                    {m.blockers[0] || 'Clean'}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer trigger */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-indigo-600 group-hover:text-indigo-700">
              <span>View context drawer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Member Drawer */}
      <MemberDrawer
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        onNavigate={onNavigate}
        theme={theme}
      />
    </div>
  );
}
