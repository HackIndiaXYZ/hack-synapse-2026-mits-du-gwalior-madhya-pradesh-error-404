import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../../services/memoryStore';
import { 
  GitBranch, 
  Clock, 
  AlertTriangle, 
  Filter, 
  User, 
  MessageSquare, 
  ExternalLink,
  Info
} from 'lucide-react';

export default function TimelineView({ onNavigate, theme = 'light', customChunks = [] }) {
  const [personFilter, setPersonFilter] = useState('ALL');
  const isLight = theme === 'light';

  // Format custom chunks into timeline events
  const customEvents = customChunks.map((c, i) => ({
    id: `custom-t-${i}`,
    date: 'TODAY',
    time: c.timestamp || 'Just now',
    person: c.speaker || 'Team Member',
    avatar: (c.speaker || 'T')[0],
    role: 'Uploaded Context Node',
    source: c.sourceName || 'custom_upload.txt',
    sourceType: 'Uploaded File',
    content: c.content,
    highlight: `Ingested memory chunk from ${c.sourceName || 'uploaded file'}`
  }));

  const allEvents = [...customEvents, ...TIMELINE_EVENTS];

  const filteredEvents = personFilter === 'ALL' 
    ? allEvents 
    : allEvents.filter(e => e.type === 'ECHO_OBSERVATION' || e.person === personFilter);


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Header & Subtitle */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 ${
        isLight ? 'border-slate-200' : 'border-white/[0.06]'
      }`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <GitBranch className="w-4 h-4" />
            STORY RECONSTRUCTION PIPELINE
          </div>
          <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Memory Timeline
          </h2>
          <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            See how the story evolved across conversations, decisions, and commitments.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono font-bold flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <div className={`flex items-center gap-1 p-1 rounded-xl border shadow-sm ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-white/[0.08]'
          }`}>
            {['ALL', 'Rahul', 'Aman'].map((person) => (
              <button
                key={person}
                onClick={() => setPersonFilter(person)}
                className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-colors ${
                  personFilter === person
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {person}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Interactive Story Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-indigo-500/30">
        {filteredEvents.map((item, idx) => {
          if (item.type === 'ECHO_OBSERVATION') {
            return (
              <div 
                key={item.id}
                className={`relative p-4.5 rounded-2xl border ${
                  item.isWarning 
                    ? isLight 
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : isLight
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm'
                      : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
                } space-y-1 my-4 animate-in fade-in duration-200`}
              >
                {/* Center marker dot */}
                <div className={`absolute -left-[1.875rem] sm:-left-[2.125rem] top-5 w-4 h-4 rounded-full border-2 ${
                  item.isWarning ? 'bg-amber-500 border-white shadow-md' : 'bg-indigo-600 border-white shadow-md'
                } flex items-center justify-center`} />

                <div className="flex items-center gap-2">
                  {item.isWarning ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <Info className="w-4 h-4 text-indigo-600" />}
                  <span className="text-xs font-black uppercase tracking-wider">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          }

          return (
            <div 
              key={item.id}
              className={`relative p-5 space-y-3 rounded-2xl border transition-all group ${
                isLight ? 'echo-card-bright' : 'echo-card'
              }`}
            >
              {/* Timeline Node Ring */}
              <div className="absolute -left-[1.875rem] sm:-left-[2.125rem] top-6 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 group-hover:scale-125 group-hover:bg-indigo-600 transition-all shadow-md" />

              {/* Event Header */}
              <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-white/[0.06]'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {item.avatar}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.person}</span>
                      <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>· {item.role}</span>
                    </div>
                    <span className={`text-[11px] font-mono font-semibold ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                      {item.date} · {item.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${
                    isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-zinc-900 text-zinc-300 border-white/[0.08]'
                  }`}>
                    {item.source}
                  </span>
                  <button 
                    onClick={() => onNavigate('sources')}
                    className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-900"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quote Content */}
              <div className={`p-3.5 rounded-xl border text-xs sm:text-sm font-mono font-semibold leading-relaxed ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-zinc-950/70 border-white/[0.04] text-zinc-200'
              }`}>
                "{item.content}"
              </div>

              {/* ECHO Highlight tag */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {item.highlight}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">Event ID: {item.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
