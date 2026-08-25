import React from 'react';
import { AlertTriangle, Clock, GitCommit, ShieldAlert, FileText, MessageSquare, Mic, Image as ImageIcon } from 'lucide-react';

export function StatusBadge({ status, isLight = true }) {
  if (status === 'AT RISK' || status === 'AT_RISK') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300 shadow-sm shadow-amber-500/10">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        AT RISK
      </span>
    );
  }
  if (status === 'OVERDUE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
        <AlertTriangle className="w-3 h-3 text-rose-500" />
        OVERDUE
      </span>
    );
  }
  if (status === 'BLOCKED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3 h-3 text-amber-500" />
        BLOCKED
      </span>
    );
  }
  if (status === 'IN_PROGRESS') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200">
        <GitCommit className="w-3 h-3 text-indigo-500" />
        IN PROGRESS
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
      DONE ✓
    </span>
  );
}

export function SourceBadge({ type, isLight = true }) {
  const iconMap = {
    Conversation: <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />,
    "Meeting notes": <FileText className="w-3.5 h-3.5 text-emerald-600" />,
    Document: <FileText className="w-3.5 h-3.5 text-blue-600" />,
    "Voice note": <Mic className="w-3.5 h-3.5 text-purple-600" />,
    Images: <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${
      isLight 
        ? 'bg-slate-100/90 text-slate-700 border-slate-200 shadow-sm' 
        : 'bg-zinc-900 text-zinc-300 border-zinc-800'
    }`}>
      {iconMap[type] || <MessageSquare className="w-3.5 h-3.5 text-slate-500" />}
      <span>{type}</span>
    </span>
  );
}
