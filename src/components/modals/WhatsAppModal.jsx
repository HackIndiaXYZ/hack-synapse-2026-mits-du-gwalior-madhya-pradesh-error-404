import React, { useState } from 'react';
import { 
  MessageSquare, 
  CheckCircle2, 
  X, 
  QrCode, 
  Link2, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Radio,
  ArrowRight,
  Download,
  Smartphone,
  UserCheck
} from 'lucide-react';

export default function WhatsAppModal({ 
  isOpen, 
  onClose, 
  isAutoSyncActive, 
  onToggleAutoSync, 
  theme = 'light' 
}) {
  const [activeTab, setActiveTab] = useState('EXPORT'); // EXPORT or PERSONAL
  const [copied, setCopied] = useState(false);

  const isLight = theme === 'light';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#121318] border-white/[0.12]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/30 border-emerald-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm font-extrabold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span>Personal WhatsApp Support</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  No Business Account Needed
                </span>
              </h3>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Use your personal WhatsApp account with Chat Export or Linked Device QR Scan
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-lg ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-zinc-500 hover:bg-zinc-800'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex items-center p-1 border-b text-xs font-extrabold ${isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-900 border-white/[0.06]'}`}>
          <button
            onClick={() => setActiveTab('EXPORT')}
            className={`flex-1 py-2 rounded-xl text-center flex items-center justify-center gap-2 transition-all ${
              activeTab === 'EXPORT' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Option 1: Export Chat (Instant 10s)</span>
          </button>
          <button
            onClick={() => setActiveTab('PERSONAL')}
            className={`flex-1 py-2 rounded-xl text-center flex items-center justify-center gap-2 transition-all ${
              activeTab === 'PERSONAL' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Option 2: Personal QR Link</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === 'EXPORT' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/20'}`}>
                <h4 className={`text-xs font-extrabold flex items-center gap-2 ${isLight ? 'text-emerald-950' : 'text-emerald-300'}`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Instant Export Instructions (Works on Personal WhatsApp!)</span>
                </h4>
                <ol className={`text-xs space-y-2.5 font-medium list-decimal list-inside leading-relaxed ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  <li>Open your <strong>Personal WhatsApp group chat</strong> on your phone.</li>
                  <li>Tap the <strong>Group Name</strong> at top → Scroll down & tap <strong>"Export Chat"</strong>.</li>
                  <li>Choose <strong>"Without Media"</strong>.</li>
                  <li>Save the generated <strong>.txt file</strong> to your laptop/phone.</li>
                  <li>Click <strong>"+ Add Source to Memory"</strong> in ECHO and drop the text file!</li>
                </ol>
              </div>

              <div className={`p-4 rounded-xl border text-xs font-semibold text-center ${isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-zinc-900 border-white/[0.06] text-zinc-400'}`}>
                💡 Works on 100% of WhatsApp personal accounts without any special approvals!
              </div>
            </div>
          )}

          {activeTab === 'PERSONAL' && (
            <div className="space-y-5">
              <div className={`p-4 rounded-xl border space-y-3 ${isLight ? 'bg-indigo-50/60 border-indigo-200' : 'bg-indigo-950/30 border-indigo-500/20'}`}>
                <h4 className={`text-xs font-extrabold flex items-center gap-2 ${isLight ? 'text-indigo-950' : 'text-indigo-200'}`}>
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Personal WhatsApp Linked Device (QR Code Scan)</span>
                </h4>
                <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  You don't need a Meta Business Account! ECHO includes a lightweight Personal WhatsApp Bot helper script:
                </p>
                <div className={`p-3 rounded-xl border font-mono text-[11px] font-bold ${isLight ? 'bg-white border-slate-300 text-indigo-900' : 'bg-zinc-950 border-white/[0.08] text-indigo-300'}`}>
                  node scripts/whatsapp-personal-bot.cjs
                </div>
                <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Run this command in terminal → Scan QR code on your phone (WhatsApp → Linked Devices) → Personal group messages stream into ECHO live!
                </p>

              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isAutoSyncActive
                  ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                  : isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-900 border-white/[0.08] text-zinc-300'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isAutoSyncActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                  <div>
                    <h4 className="text-xs font-black">
                      {isAutoSyncActive ? 'Personal WhatsApp Auto-Sync ACTIVE' : 'Auto-Sync Paused'}
                    </h4>
                    <p className="text-[11px] opacity-80 font-medium">
                      Group "Error 404!!!!" is active
                    </p>
                  </div>
                </div>

                <button
                  onClick={onToggleAutoSync}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shadow-md ${
                    isAutoSyncActive 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isAutoSyncActive ? 'Pause Sync' : 'Enable Auto-Sync'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-white/[0.08]'
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free & Personal WhatsApp Compatible</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
