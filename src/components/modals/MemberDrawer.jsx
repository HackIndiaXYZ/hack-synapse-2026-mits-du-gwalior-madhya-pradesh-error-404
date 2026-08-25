import React from 'react';
import { 
  X, 
  User, 
  Target, 
  CheckSquare, 
  AlertOctagon, 
  Clock, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function MemberDrawer({ member, isOpen, onClose, onNavigate, theme = 'light' }) {
  if (!isOpen || !member) return null;
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-md border-l h-full shadow-2xl overflow-y-auto flex flex-col justify-between p-6 space-y-6 animate-in slide-in-from-right duration-200 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#121318] border-white/[0.12]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-wider">
              TEAM CONTEXT NODE
            </span>
            <button 
              onClick={onClose}
              className={`p-1.5 rounded-lg ${isLight ? 'text-slate-500 hover:bg-slate-100' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Member Profile info */}
          <div className={`flex items-center gap-4 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
            <div className={`w-12 h-12 rounded-2xl ${member.color} flex items-center justify-center text-lg font-black shadow-sm`}>
              {member.avatar}
            </div>
            <div>
              <h3 className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>{member.name}</h3>
              <p className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{member.role}</p>
            </div>
          </div>

          {/* Current Focus */}
          <div className="space-y-2">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              <Target className="w-4 h-4 text-indigo-600" />
              Current Focus
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {member.focus.map((item, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-extrabold text-indigo-700 shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Commitments */}
          <div className="space-y-2">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              Recent Commitments
            </h4>
            <div className="space-y-2">
              {member.commitments.map((c, idx) => (
                <div key={idx} className={`p-3.5 rounded-xl border space-y-1 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/80 border-white/[0.06]'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.task}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      c.status === 'OVERDUE' ? 'bg-rose-100 text-rose-700 border border-rose-300' :
                      c.status === 'BLOCKED' ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                      'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-slate-500">
                    Due: {c.dueDate} · Impact: {c.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Blockers */}
          <div className="space-y-2">
            <h4 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
              <AlertOctagon className="w-4 h-4 text-amber-600" />
              Open Blockers
            </h4>
            {member.blockers.length > 0 ? (
              member.blockers.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 shadow-sm">
                  {b}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic font-medium">No open blockers logged.</p>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
          <button
            onClick={() => {
              onClose();
              onNavigate('ask-echo');
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask ECHO about {member.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
