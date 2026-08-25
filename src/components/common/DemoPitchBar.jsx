import React, { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  X, 
  Trophy,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export default function DemoPitchBar({ 
  activeStep, 
  onRunStep, 
  theme = 'light' 
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isLight = theme === 'light';

  const demoSteps = [
    { id: 0, time: '0:00', title: 'Problem', desc: 'Scattered info across WhatsApp, Voice & PDFs', view: 'overview' },
    { id: 1, time: '0:30', title: 'Upload & OCR', desc: 'Scan Hinglish chat screenshot into vector nodes', view: 'sources', action: 'upload' },
    { id: 2, time: '0:50', title: 'Ask ECHO', desc: 'Hinglish RAG search + forced evidence citations', view: 'ask-echo', query: 'Rahul ne backend deadline ke baare me kya bola?' },
    { id: 3, time: '1:20', title: 'Timeline', desc: 'Reconstruct story evolution across 5 days', view: 'timeline' },
    { id: 4, time: '1:50', title: 'Signals', desc: 'Detect broken promises & project delay risk', view: 'insights' },
    { id: 5, time: '2:40', title: 'Voice & OCR', desc: 'Transcribe Hinglish voice note & screenshots', view: 'sources' },
    { id: 6, time: '2:55', title: 'The Pitch', desc: 'ECHO remembers context, signals & risks', view: 'team' }
  ];

  if (collapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setCollapsed(false)}
          className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black text-xs shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Trophy className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>Launch 3-Min Hackathon Demo</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[660px] z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className={`p-4 rounded-2xl border shadow-2xl transition-all ${
        isLight 
          ? 'bg-slate-900 text-white border-slate-700 shadow-indigo-500/20' 
          : 'bg-[#121318] text-white border-indigo-500/30'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-amber-500 text-slate-950 font-black shadow-sm">
              <Trophy className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              3-MINUTE HACKATHON PITCH CONTROLLER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-400">Hinglish & OCR Demo Ready</span>
            <button 
              onClick={() => setCollapsed(true)} 
              className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Buttons Bar */}
        <div className="grid grid-cols-7 gap-1.5">
          {demoSteps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => onRunStep(step)}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-between transition-all group ${
                  isActive
                    ? 'bg-gradient-to-b from-indigo-600 to-violet-600 text-white ring-2 ring-indigo-400 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                }`}
                title={`${step.time} — ${step.title}: ${step.desc}`}
              >
                <span className="text-[9px] font-mono font-bold opacity-80">{step.time}</span>
                <span className="text-[10px] font-extrabold truncate w-full mt-0.5">{step.title}</span>
                <div className="mt-1">
                  {isActive ? (
                    <Play className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-indigo-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Active Step Banner */}
        <div className="mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-indigo-500 text-white font-mono font-bold text-[10px]">
              STEP {activeStep + 1} OF 7
            </span>
            <span className="font-bold text-white">
              {demoSteps[activeStep]?.title}: <span className="font-medium text-zinc-300">{demoSteps[activeStep]?.desc}</span>
            </span>
          </div>

          <button
            onClick={() => onRunStep(demoSteps[(activeStep + 1) % 7])}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0 ml-2"
          >
            <span>Run Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
