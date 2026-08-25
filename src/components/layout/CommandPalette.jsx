import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  GitBranch, 
  FolderGit2, 
  Zap, 
  Users, 
  Plus, 
  Settings, 
  X, 
  ArrowRight 
} from 'lucide-react';

export default function CommandPalette({ 
  isOpen, 
  onClose, 
  onSelectAction, 
  onSearchQuery 
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      }

      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'ask-echo', title: 'Ask ECHO AI Memory', icon: Sparkles, category: 'AI Intelligence', hint: 'Search & synthesize' },
    { id: 'add-source', title: 'Add Source to Memory', icon: Plus, category: 'Actions', hint: 'Upload PDF, Chat, Audio' },
    { id: 'timeline', title: 'Open Memory Timeline', icon: GitBranch, category: 'Navigation', hint: 'Story evolution' },
    { id: 'insights', title: 'View Signals & Insights', icon: Zap, category: 'Navigation', hint: 'Risks & Blockers' },
    { id: 'sources', title: 'Browse Memory Sources', icon: FolderGit2, category: 'Navigation', hint: '12 sources indexed' },
    { id: 'team', title: 'Go to Team Context', icon: Users, category: 'Navigation', hint: 'Rahul, Aman, Priya' },
    { id: 'settings', title: 'Workspace Settings', icon: Settings, category: 'System', hint: 'AI Preferences & Auth' }
  ];

  const filteredActions = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearchQuery(query);
    onClose(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#121318] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <form onSubmit={handleCustomSubmit} className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-zinc-900/50">
          <Search className="w-4 h-4 text-indigo-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or ask ECHO anything..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          />
          {query && (
            <button 
              type="submit" 
              className="px-2.5 py-1 rounded bg-indigo-600 text-white text-xs font-medium flex items-center gap-1 hover:bg-indigo-500"
            >
              Ask <ArrowRight className="w-3 h-3" />
            </button>
          )}
          <button 
            type="button" 
            onClick={() => onClose(false)}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </form>

        {/* Action List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
            {query ? 'Search Results & Commands' : 'Suggested Actions'}
          </div>

          {filteredActions.length === 0 ? (
            <button
              onClick={handleCustomSubmit}
              className="w-full text-left px-3 py-3 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-white">Ask ECHO memory: <span className="italic font-medium text-indigo-200">"{query}"</span></span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onSelectAction(action.id);
                    onClose(false);
                    setQuery('');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-zinc-900 border border-white/[0.06] text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold text-white">{action.title}</span>
                      <span className="text-[10px] text-zinc-500">{action.hint}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-zinc-500 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-white/[0.05]">
                    {action.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 py-2 bg-zinc-950/80 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-[10px]">↑↓</kbd> navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-[10px]">↵</kbd> select</span>
            <span><kbd className="px-1 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-[10px]">esc</kbd> close</span>
          </div>
          <span className="text-indigo-400 font-sans">ECHO ⌘K</span>
        </div>
      </div>
    </div>
  );
}
