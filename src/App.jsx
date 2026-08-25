import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CommandPalette from './components/layout/CommandPalette';
import UploadModal from './components/modals/UploadModal';
import WhatsAppModal from './components/modals/WhatsAppModal';
import DemoPitchBar from './components/common/DemoPitchBar';


import OverviewView from './components/views/OverviewView';
import AskEchoView from './components/views/AskEchoView';
import TimelineView from './components/views/TimelineView';
import SourcesView from './components/views/SourcesView';
import InsightsView from './components/views/InsightsView';
import TeamView from './components/views/TeamView';
import SettingsView from './components/views/SettingsView';
import ProjectBrainView from './components/views/ProjectBrainView';

import { INITIAL_SOURCES } from './services/memoryStore';
import { syncLiveWhatsAppMessages } from './services/liveSyncService';


export default function App() {
  const [activeView, setActiveView] = useState('overview');
  const [sources, setSources] = useState(INITIAL_SOURCES);
  const [customChunks, setCustomChunks] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isWhatsAppActive, setIsWhatsAppActive] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [askEchoInitialQuery, setAskEchoInitialQuery] = useState('');
  const [demoStep, setDemoStep] = useState(0);


  // Sync theme class on <body> tag
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Live WhatsApp Auto-Sync Polling Interval (Every 2.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      syncLiveWhatsAppMessages((newChunks) => {
        setCustomChunks(prev => {
          // Avoid duplicate chunks by checking IDs
          const existingIds = new Set(prev.map(c => c.content));
          const filteredNew = newChunks.filter(c => !existingIds.has(c.content));
          if (filteredNew.length === 0) return prev;
          return [...filteredNew, ...prev];
        });
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddSource = (newSource, chunks = []) => {
    setSources(prev => [newSource, ...prev]);
    if (chunks.length > 0) {
      setCustomChunks(prev => [...prev, ...chunks]);
    }
  };

  const handleSearchQueryFromPalette = (query) => {
    setAskEchoInitialQuery(query);
    setActiveView('ask-echo');
  };

  const handleSelectActionFromPalette = (actionId) => {
    if (actionId === 'add-source') {
      setIsUploadModalOpen(true);
    } else {
      setActiveView(actionId);
    }
  };


  const handleRunDemoStep = (stepObj) => {
    setDemoStep(stepObj.id);
    if (stepObj.action === 'upload') {
      setActiveView('sources');
      setIsUploadModalOpen(true);
    } else if (stepObj.query) {
      setAskEchoInitialQuery(stepObj.query);
      setActiveView(stepObj.view);
    } else {
      setActiveView(stepObj.view);
    }
  };


  return (
    <div className={`min-h-screen flex flex-col md:flex-row antialiased font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-[#f8fafc] text-[#0f172a]' : 'bg-[#09090b] text-[#f4f4f5]'
    }`}>
      {/* Desktop Persistent Left Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          sourcesCount={sources.length}
          theme={theme}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden flex"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`w-64 h-full ${theme === 'light' ? 'bg-white' : 'bg-[#0d0e12]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              activeView={activeView}
              setActiveView={(view) => {
                setActiveView(view);
                setIsMobileMenuOpen(false);
              }}
              onOpenCommandPalette={() => {
                setIsCommandPaletteOpen(true);
                setIsMobileMenuOpen(false);
              }}
              onOpenUploadModal={() => {
                setIsUploadModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              sourcesCount={sources.length}
              theme={theme}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header
          activeView={activeView}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isWhatsAppActive={isWhatsAppActive}
          onOpenWhatsAppModal={() => setIsWhatsAppModalOpen(true)}
        />


        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'overview' && (
            <OverviewView 
              onNavigate={setActiveView} 
              sourcesCount={sources.length} 
              theme={theme}
              customChunks={customChunks}
            />
          )}

          {activeView === 'ask-echo' && (
            <AskEchoView 
              onNavigate={setActiveView} 
              initialQuery={askEchoInitialQuery} 
              theme={theme}
              customChunks={customChunks}
            />
          )}

          {activeView === 'brain' && (
            <ProjectBrainView 
              onNavigate={setActiveView} 
              theme={theme}
            />
          )}

          {activeView === 'timeline' && (
            <TimelineView 
              onNavigate={setActiveView} 
              theme={theme}
              customChunks={customChunks}
            />
          )}


          {activeView === 'sources' && (
            <SourcesView 
              sources={sources} 
              onOpenUploadModal={() => setIsUploadModalOpen(true)} 
              theme={theme}
            />
          )}

          {activeView === 'insights' && (
            <InsightsView 
              onNavigate={setActiveView} 
              theme={theme}
            />
          )}

          {activeView === 'team' && (
            <TeamView 
              onNavigate={setActiveView} 
              theme={theme}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView theme={theme} />
          )}
        </main>
      </div>

      {/* 3-Minute Hackathon Demo Pitch Bar */}
      {/* Modals & Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={setIsCommandPaletteOpen}
        onSelectAction={handleSelectActionFromPalette}
        onSearchQuery={handleSearchQueryFromPalette}
        theme={theme}
      />

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddSource={handleAddSource}
        theme={theme}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        isAutoSyncActive={isWhatsAppActive}
        onToggleAutoSync={() => setIsWhatsAppActive(prev => !prev)}
        theme={theme}
      />

      {/* Floating Hackathon Pitch Bar */}
      <DemoPitchBar
        activeStep={demoStep}
        onRunStep={handleRunDemoStep}
        theme={theme}
      />
    </div>
  );
}
