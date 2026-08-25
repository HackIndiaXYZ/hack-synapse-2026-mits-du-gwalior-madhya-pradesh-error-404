import React, { useState } from 'react';
import { 
  Settings, 
  Layers, 
  Users, 
  FolderGit2, 
  Sparkles, 
  Bell, 
  Palette, 
  Check 
} from 'lucide-react';

export default function SettingsView({ theme = 'light' }) {
  const [activeTab, setActiveTab] = useState('workspace');
  const [saved, setSaved] = useState(false);
  const isLight = theme === 'light';

  const tabs = [
    { id: 'workspace', label: 'Workspace', icon: Layers },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'sources', label: 'Connected Sources', icon: FolderGit2 },
    { id: 'ai', label: 'AI Preferences', icon: Sparkles },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200 pb-16">
      {/* Header */}
      <div className={`border-b pb-6 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
          <Settings className="w-4 h-4" />
          SYSTEM CONFIGURATION
        </div>
        <h2 className={`text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          Settings
        </h2>
        <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
          Manage workspace settings, team access, connected sources, and AI memory preferences.
        </p>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Subnav */}
        <div className="space-y-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <div className={`md:col-span-3 p-6 space-y-6 rounded-2xl border ${
          isLight ? 'echo-card-bright' : 'echo-card'
        }`}>
          {activeTab === 'workspace' && (
            <div className="space-y-6">
              <div className={`space-y-1 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>Workspace Details</h3>
                <p className="text-xs font-medium text-slate-500">Configure your active team workspace identifier.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Workspace Name</label>
                  <input 
                    type="text" 
                    defaultValue="Project AURA" 
                    className={`w-full border rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-950 border-white/[0.08] text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Memory Retention Policy</label>
                  <select className={`w-full border rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-950 border-white/[0.08] text-white'
                  }`}>
                    <option>Infinite (Keep all indexed conversations)</option>
                    <option>1 Year rolling memory</option>
                    <option>90 Days rolling memory</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className={`space-y-1 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                <h3 className={`text-lg font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>AI Model & Reasoning Preferences</h3>
                <p className="text-xs font-medium text-slate-500">Control embedding synthesis and signal detection thresholds.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-xs font-bold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Reasoning Model Provider</label>
                  <select className={`w-full border rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-indigo-500 ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-950 border-white/[0.08] text-white'
                  }`}>
                    <option>ECHO Hybrid Intelligence (Gemini 1.5 Pro + Local Vector Embeddings)</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>GPT-4o</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'workspace' && activeTab !== 'ai' && (
            <div className="space-y-6">
              <div className={`space-y-1 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                <h3 className={`text-lg font-extrabold capitalize ${isLight ? 'text-slate-900' : 'text-white'}`}>{activeTab} Settings</h3>
                <p className="text-xs font-medium text-slate-500">Configure parameters for {activeTab}.</p>
              </div>

              <div className={`p-4 rounded-xl border text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-zinc-950/60 border-white/[0.04] text-zinc-400'
              }`}>
                All parameters in <span className="text-indigo-600 font-extrabold">{activeTab}</span> are synced with Project AURA memory store.
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className={`pt-4 border-t flex items-center justify-end ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
