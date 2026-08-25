import React, { useState } from 'react';
import { SIGNALS_DATA } from '../../services/memoryStore';
import { 
  Zap, 
  AlertTriangle, 
  Clock, 
  GitCommit, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Users, 
  Filter,
  ShieldAlert,
  Link2,
  HelpCircle
} from 'lucide-react';

export default function InsightsView({ onNavigate, theme = 'light' }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const isLight = theme === 'light';

  const categories = ['ALL', 'Risks', 'Commitments', 'Dependencies', 'Decisions', 'Contradictions'];

  const filteredSignals = activeCategory === 'ALL'
    ? SIGNALS_DATA
    : SIGNALS_DATA.filter(s => s.category === activeCategory);

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Risks': return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'Commitments': return <Clock className="w-4 h-4 text-rose-600" />;
      case 'Dependencies': return <Link2 className="w-4 h-4 text-indigo-600" />;
      case 'Decisions': return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'Contradictions': return <HelpCircle className="w-4 h-4 text-purple-600" />;
      default: return <Zap className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        isLight ? 'border-slate-200' : 'border-white/[0.06]'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <Zap className="w-4 h-4" />
            AI PATTERN DETECTION ENGINE
          </div>
          <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Signals & Insights
          </h2>
          <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            ECHO automatically detected these patterns, risks, commitments and contradictions across your team's memory.
          </p>
        </div>

        {/* Category Filters */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border shadow-sm overflow-x-auto ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-white/[0.08]'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((sig) => (
          <div 
            key={sig.id}
            className={`p-5 space-y-4 rounded-2xl border transition-all group border-l-4 ${
              isLight ? 'echo-card-bright' : 'echo-card'
            }`}
            style={{
              borderLeftColor: 
                sig.severity === 'High' ? '#f59e0b' : 
                sig.severity === 'Medium' ? '#f43f5e' : '#6366f1'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 shrink-0 mt-0.5 shadow-sm">
                  {getCategoryIcon(sig.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-black uppercase tracking-wider font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {sig.category}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${
                      sig.severity === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      sig.severity === 'Medium' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    }`}>
                      {sig.severity} Severity
                    </span>
                    <span className={`text-[11px] font-mono font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>· {sig.timestamp}</span>
                  </div>

                  <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {sig.title}
                  </h3>

                  <p className={`text-xs font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
                    {sig.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('timeline')}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold shrink-0 transition-colors flex items-center gap-1 shadow-sm ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-indigo-600' 
                    : 'bg-zinc-900 hover:bg-zinc-800 border-white/[0.08] text-indigo-300'
                }`}
              >
                <span>View Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Context grounding footer */}
            <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-semibold ${
              isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.06] text-zinc-500'
            }`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>People: {sig.relatedPeople.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sources: {sig.relatedSources.join(', ')}</span>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('ask-echo')} 
                className="text-indigo-600 hover:text-indigo-700 font-sans font-extrabold"
              >
                Ask ECHO about this signal →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
