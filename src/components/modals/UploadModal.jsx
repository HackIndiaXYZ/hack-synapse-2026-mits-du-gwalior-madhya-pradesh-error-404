import React, { useState } from 'react';
import { processFileIngestion } from '../../services/ingestionEngine';
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  Layers, 
  Loader2,
  FileCode,
  ArrowRight
} from 'lucide-react';

export default function UploadModal({ isOpen, onClose, onAddSource, theme = 'light' }) {
  const [activeTab, setActiveTab] = useState('FILE'); // FILE or PASTE
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [customFilename, setCustomFilename] = useState('my_team_chat.txt');
  const [step, setStep] = useState('IDLE');
  const [ocrProgressText, setOcrProgressText] = useState('');
  const [ingestedResult, setIngestedResult] = useState(null);

  const isLight = theme === 'light';

  if (!isOpen) return null;

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    startPipeline(selectedFile);
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!pastedText.trim()) return;
    startPipeline(pastedText.trim(), customFilename);
  };

  const startPipeline = async (fileOrText, filename = 'upload.txt') => {
    setStep('UPLOADING');
    const isImage = typeof fileOrText === 'object' && (fileOrText.type?.includes('image') || fileOrText.name?.endsWith('.png') || fileOrText.name?.endsWith('.jpg'));

    setTimeout(() => {
      setStep('READING');
      if (isImage) {
        setOcrProgressText('Scanning Hinglish screenshot pixels with Tesseract OCR...');
      } else {
        setOcrProgressText('Reading file lines & speaker timestamps...');
      }
      setTimeout(() => {
        setStep('UNDERSTANDING');
        setOcrProgressText('Building 384-dimensional vector embeddings...');
        setTimeout(async () => {
          setStep('REMEMBERING');
          const result = await processFileIngestion(fileOrText, filename, (progressObj) => {
            if (progressObj?.status) setOcrProgressText(progressObj.status);
          });
          setIngestedResult(result);
          setTimeout(() => {
            setStep('SUCCESS');
            onAddSource(result.source, result.chunks);
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const handleReset = () => {
    setFile(null);
    setPastedText('');
    setStep('IDLE');
    setIngestedResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#121318] border-white/[0.12]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/50 border-white/[0.08]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Add Source to ECHO Memory
              </h3>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Ingest conversations, PDFs, screenshots, or pasted text into vector storage
              </p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className={`p-1.5 rounded-lg ${isLight ? 'text-slate-500 hover:bg-slate-200' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        {step === 'IDLE' && (
          <div className={`flex items-center p-1 border-b text-xs font-extrabold ${isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-zinc-900 border-white/[0.06]'}`}>
            <button
              onClick={() => setActiveTab('FILE')}
              className={`flex-1 py-2 rounded-xl text-center flex items-center justify-center gap-2 transition-all ${
                activeTab === 'FILE' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload File / Image</span>
            </button>
            <button
              onClick={() => setActiveTab('PASTE')}
              className={`flex-1 py-2 rounded-xl text-center flex items-center justify-center gap-2 transition-all ${
                activeTab === 'PASTE' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-zinc-400'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Paste Text / Raw Chat</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {step === 'IDLE' && activeTab === 'FILE' && (
            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
              }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center space-y-4 transition-colors cursor-pointer group ${
                isLight 
                  ? 'border-slate-300 hover:border-indigo-500 bg-slate-50/50' 
                  : 'border-white/[0.12] hover:border-indigo-500/50 bg-zinc-950/50'
              }`}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.txt,.png,.jpg,.mp3';
                input.onchange = (e) => {
                  if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                };
                input.click();
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-sm">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Drop files or chat screenshots here
                </p>
                <p className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                  or click to browse your computer
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 font-semibold">
                <span>Supported: TXT, PDF, PNG, JPG, MP3</span>
              </div>
            </div>
          )}

          {step === 'IDLE' && activeTab === 'PASTE' && (
            <form onSubmit={handlePasteSubmit} className="space-y-4">
              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Filename / Label
                </label>
                <input 
                  type="text"
                  value={customFilename}
                  onChange={(e) => setCustomFilename(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2 text-xs font-mono font-bold focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-950 border-white/[0.08] text-white'
                  }`}
                  placeholder="e.g. rahul_sprint_notes.txt"
                />
              </div>

              <div>
                <label className={`text-xs font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Paste Raw Conversation / Text
                </label>
                <textarea
                  rows={5}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste WhatsApp messages, Slack chat, or text notes here...\n\nExample:\nRahul [10:00 AM]: We deployed the auth backend fix today."
                  className={`w-full border rounded-xl p-3 text-xs font-mono focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-950 border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={!pastedText.trim()}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Ingest into ECHO Memory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step !== 'IDLE' && step !== 'SUCCESS' && (
            <div className="py-8 space-y-6 text-center">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-600 animate-spin" />
                <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Ingesting "{file?.name || customFilename}"
                </h4>
                <p className="text-xs font-mono font-bold text-indigo-600">
                  {ocrProgressText || 'Building 384-dimensional vector embeddings...'}
                </p>
              </div>

              {/* Step Pipeline Progress */}
              <div className="max-w-xs mx-auto space-y-2 text-xs font-mono font-bold">
                <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl ${step === 'UPLOADING' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-400'}`}>
                  <span>1. Uploading</span>
                  {step === 'UPLOADING' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '✓'}
                </div>
                <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl ${step === 'READING' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-400'}`}>
                  <span>2. Reading Text & OCR</span>
                  {step === 'READING' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : step === 'UPLOADING' ? '' : '✓'}
                </div>
                <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl ${step === 'UNDERSTANDING' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-400'}`}>
                  <span>3. Semantic Chunking</span>
                  {step === 'UNDERSTANDING' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (step === 'REMEMBERING' || step === 'SUCCESS') ? '✓' : ''}
                </div>
                <div className={`flex items-center justify-between px-3.5 py-2 rounded-xl ${step === 'REMEMBERING' ? 'bg-indigo-100 text-indigo-800' : 'text-slate-400'}`}>
                  <span>4. Vector Embeddings</span>
                  {step === 'REMEMBERING' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : ''}
                </div>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Added to ECHO's Memory!</h4>
                <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  "{file?.name || customFilename}" generated <strong>{ingestedResult?.chunks?.length || 2} vector chunks</strong>.
                </p>
                <p className="text-xs text-indigo-600 font-bold">
                  Now immediately searchable in Ask ECHO & timeline!
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/20 transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
