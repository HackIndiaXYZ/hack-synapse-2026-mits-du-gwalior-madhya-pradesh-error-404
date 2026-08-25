import React, { useState } from 'react';
import { SourceBadge } from '../common/Badge';
import { 
  FolderGit2, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  MessageSquare, 
  Mic, 
  Image as ImageIcon, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export default function SourcesView({ sources = [], onOpenUploadModal, theme = 'light' }) {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const isLight = theme === 'light';
  const categories = ['ALL', 'Conversations', 'Documents', 'Voice', 'Images'];

  const filteredSources = sources.filter(src => {
    const matchesFilter = filter === 'ALL' || 
      (filter === 'Conversations' && src.type === 'Conversation') ||
      (filter === 'Documents' && (src.type === 'Document' || src.type === 'Meeting notes')) ||
      (filter === 'Voice' && src.type === 'Voice note') ||
      (filter === 'Images' && src.type === 'Images');

    const matchesSearch = src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleAudio = (id) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Top Header */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
        isLight ? 'border-slate-200' : 'border-white/[0.06]'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <FolderGit2 className="w-4 h-4" />
            INDEXED MEMORY STORE
          </div>
          <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Memory Sources
          </h2>
          <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Everything ECHO remembers starts here. Uploaded files are converted into vector nodes.
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Source</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sources..."
            className={`w-full border rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-zinc-900 border-white/[0.08] text-white'
            }`}
          />
        </div>

        {/* Filter tabs */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border shadow-sm overflow-x-auto ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-white/[0.08]'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSources.map((src) => (
          <div 
            key={src.id}
            className={`p-5 space-y-4 rounded-2xl border transition-all group flex flex-col justify-between ${
              isLight ? 'echo-card-bright' : 'echo-card'
            }`}
          >
            <div className="space-y-4">
              {/* Card top */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shadow-sm">
                    {src.type === 'Conversation' && <MessageSquare className="w-5 h-5 text-indigo-600" />}
                    {src.type === 'Meeting notes' && <FileText className="w-5 h-5 text-emerald-600" />}
                    {src.type === 'Document' && <FileText className="w-5 h-5 text-blue-600" />}
                    {src.type === 'Voice note' && <Mic className="w-5 h-5 text-purple-600" />}
                    {src.type === 'Images' && <ImageIcon className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div>
                    <h3 className={`text-xs font-extrabold font-mono truncate max-w-[140px] ${isLight ? 'text-slate-900' : 'text-white'}`} title={src.name}>
                      {src.name}
                    </h3>
                    <span className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>{src.type}</span>
                  </div>
                </div>

                <SourceBadge type={src.type} isLight={isLight} />
              </div>

              {/* Special Interactive Voice Note Player Preview with Animated Equalizer */}
              {src.type === 'Voice note' && (
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleAudio(src.id)}
                      className="p-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-md shadow-purple-500/20"
                    >
                      {playingAudioId === src.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    {/* Dynamic Equalizer Bars */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-purple-900">
                        <span>{playingAudioId === src.id ? 'Playing Voice Memory...' : 'Audio Stream'}</span>
                        <span>{src.duration || '1m 14s'}</span>
                      </div>
                      <div className="flex items-end gap-1 h-5 px-1 bg-purple-100 rounded-md">
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-1' : 'h-1'}`} />
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-2' : 'h-2'}`} />
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-3' : 'h-1.5'}`} />
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-4' : 'h-3'}`} />
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-2' : 'h-1'}`} />
                        <span className={`w-1 bg-purple-600 rounded-full ${playingAudioId === src.id ? 'animate-eq-3' : 'h-2.5'}`} />
                      </div>
                    </div>
                  </div>
                  {src.transcript && (
                    <p className="text-[11px] text-purple-950 font-medium italic line-clamp-2">
                      "{src.transcript}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Metadata Footer */}
            <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono font-bold ${
              isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.06] text-zinc-500'
            }`}>
              <div className="flex items-center gap-2">
                <span>{src.messagesCount} nodes</span>
                <span>·</span>
                <span>{src.dateAdded}</span>
              </div>
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {src.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
