import React, { useState } from 'react';
import { executeRagPipeline } from '../../services/ragEngine';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  User,
  RotateCcw
} from 'lucide-react';

export default function AskEchoView({ onNavigate, initialQuery = '', theme = 'light', customChunks = [] }) {
  const [query, setQuery] = useState(initialQuery || "What did Rahul say about the backend deadline?");
  const [activeResult, setActiveResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    handleSearch(initialQuery || "What did Rahul say about the backend deadline?");
  }, [initialQuery, customChunks]);


  const handleSearch = async (targetQuery) => {
    const q = targetQuery || query;
    if (!q.trim()) return;
    setQuery(q);
    setIsLoading(true);

    const res = await executeRagPipeline(q, customChunks);
    setActiveResult(res);
    setIsLoading(false);
  };


  const isLight = theme === 'light';

  const suggestedQueries = [
    "What is blocking the backend?",
    "What did Rahul commit to?",
    "When was authentication first mentioned?",
    "What changed this week?"
  ];

  const handleChipClick = (chipText) => {
    setQuery(chipText);
    handleSearch(chipText);
  };


  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-200 pb-16">
      {/* Centered Hero Header & Search Box */}
      <div className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>Central Memory Intelligence Hub</span>
        </div>

        <div className="space-y-2">
          <h2 className={`text-4xl sm:text-5xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Ask your team's memory.
          </h2>
          <p className={`text-sm sm:text-base font-medium max-w-lg mx-auto ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Search across conversations, meetings, PDFs, and voice notes with grounded context.
          </p>
        </div>

        {/* Hero Search Box Container with Vibrant Rainbow Gradient Ring */}
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
            className={`p-2 rounded-2xl flex items-center shadow-2xl transition-all ${
              isLight 
                ? 'bg-white border-2 border-indigo-500/40 shadow-indigo-500/10 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-500/20' 
                : 'hero-search-container'
            }`}
          >
            <div className="pl-3 pr-2 text-indigo-600">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to remember?"
              className={`w-full bg-transparent px-2 py-3 text-lg font-medium placeholder-slate-400 focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            />
            <div className="flex items-center gap-2 pr-2">
              <kbd className={`hidden sm:inline-block px-2.5 py-1 rounded-md text-xs font-mono border ${
                isLight ? 'bg-slate-100 text-slate-500 border-slate-300' : 'bg-zinc-900 text-zinc-400 border-white/[0.08]'
              }`}>
                ⌘K
              </kbd>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Ask ECHO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Suggested Queries Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>Suggested:</span>
            {suggestedQueries.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all text-left shadow-sm ${
                  isLight 
                    ? 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600' 
                    : 'bg-zinc-900/80 hover:bg-zinc-800 border border-white/[0.08] text-zinc-300'
                }`}
              >
                "{chip}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH RESULT EXPERIENCE */}
      {activeResult && !isLoading && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
          {/* Answer Card */}
          <div className={`p-6 rounded-2xl border space-y-4 shadow-xl ${
            isLight 
              ? 'bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 border-indigo-200/80 shadow-indigo-500/5' 
              : 'echo-card border-indigo-500/20 bg-gradient-to-br from-[#121318] via-[#15161f] to-[#121318]'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase font-black tracking-wider text-indigo-700">
                  SYNTHESIZED ANSWER
                </span>
              </div>
              <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                Grounding: 3 evidence nodes
              </span>
            </div>

            <h3 className={`text-xl font-bold leading-relaxed ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {activeResult.answer.split(' ').map((word, i) => {
                const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                const isHighlight = activeResult.highlights.some(h => 
                  cleanWord.toLowerCase() === h.toLowerCase()
                );
                return isHighlight ? (
                  <mark key={i} className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-md font-black border border-indigo-300 mx-0.5">
                    {word}{' '}
                  </mark>
                ) : (
                  word + ' '
                );
              })}
            </h3>
          </div>

          {/* EVIDENCE SECTION: "From your memory" */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>From your memory</span>
              </h3>
              <span className={`text-[11px] font-mono font-bold ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                Project AURA graph connections
              </span>
            </div>

            {/* Connected Evidence Cards with Graph Line */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-indigo-500/30">
              {activeResult.evidence.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-5 space-y-3 rounded-2xl border transition-all group ${
                    isLight ? 'echo-card-bright' : 'echo-card'
                  }`}
                >
                  {/* Node Connector Ring */}
                  <div className="absolute -left-[1.875rem] top-6 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 transition-transform shadow-md" />

                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 font-extrabold text-xs flex items-center justify-center shadow-sm">
                        {item.avatar}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.speaker}</span>
                          <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>· {item.role}</span>
                        </div>
                        <span className={`text-[11px] font-mono font-semibold flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                          <Clock className="w-3 h-3 text-slate-400" />
                          {item.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${
                        isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-zinc-900 text-zinc-300 border-white/[0.08]'
                      }`}>
                        {item.sourceType}
                      </span>
                      <button 
                        onClick={() => onNavigate('sources')}
                        className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                        title="Open source file"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quoted Message */}
                  <div className={`p-3.5 rounded-xl border text-xs font-mono font-semibold leading-relaxed ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-zinc-950/70 border-white/[0.04] text-zinc-200'
                  }`}>
                    "{item.message}"
                  </div>

                  {/* Footer Source Action */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono font-semibold">
                    <span>Source file: {item.source}</span>
                    <button 
                      onClick={() => onNavigate('sources')}
                      className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Open source <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ECHO INSIGHT CARD */}
          {activeResult.insight && (
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isLight 
                ? 'bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-white border-amber-300 shadow-md' 
                : 'echo-card border-amber-500/30'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {activeResult.insight.title}
                    </h4>
                    <p className={`text-xs font-medium mt-0.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                      "{activeResult.insight.description}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('timeline')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1 shadow-md shadow-amber-500/20"
                >
                  <span>View timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
