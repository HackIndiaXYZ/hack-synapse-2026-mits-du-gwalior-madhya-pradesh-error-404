import React, { useState } from 'react';
import { Sparkles, MessageSquare, AlertTriangle, Users, FileText, Zap } from 'lucide-react';

export default function MemoryGraphVisualizer({ theme = 'light' }) {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 'rahul', label: 'Rahul (Backend)', type: 'person', x: 20, y: 35, color: '#6366f1', status: 'Blocked by Auth' },
    { id: 'aman', label: 'Aman (Frontend)', type: 'person', x: 75, y: 30, color: '#06b6d4', status: 'Waiting on API' },
    { id: 'priya', label: 'Priya (ML)', type: 'person', x: 25, y: 80, color: '#8b5cf6', status: 'Vector Index Ready' },
    { id: 'jatin', label: 'Jatin (Product)', type: 'person', x: 80, y: 80, color: '#10b981', status: 'Preparing Demo' },
    { id: 'chat', label: 'team_chat.txt', type: 'source', x: 48, y: 50, color: '#ec4899', status: '486 Messages' },
    { id: 'auth_blocker', label: '⚠ Auth Blocker', type: 'signal', x: 50, y: 20, color: '#f59e0b', status: 'Critical Path Risk' }
  ];

  const connections = [
    { from: 'rahul', to: 'chat' },
    { from: 'aman', to: 'chat' },
    { from: 'priya', to: 'chat' },
    { from: 'jatin', to: 'chat' },
    { from: 'rahul', to: 'auth_blocker' },
    { from: 'aman', to: 'rahul' }
  ];

  const isLight = theme === 'light';

  return (
    <div className={`relative p-5 rounded-2xl border ${
      isLight 
        ? 'bg-gradient-to-br from-white/95 via-indigo-50/30 to-purple-50/30 border-slate-200/80 shadow-lg shadow-indigo-500/5' 
        : 'bg-[#121318] border-white/[0.08]'
    } overflow-hidden`}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-white'}`}>
              LIVE MEMORY GRAPH VISUALIZER
            </h4>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
              Interactive neural connections across people, sources & signals
            </p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
          6 Connected Nodes
        </span>
      </div>

      {/* Interactive Visual Canvas Area */}
      <div className="relative h-56 w-full border rounded-xl overflow-hidden bg-slate-900/90 shadow-inner flex items-center justify-center">
        {/* SVG Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((c, idx) => {
            const fromNode = nodes.find(n => n.id === c.from);
            const toNode = nodes.find(n => n.id === c.to);
            if (!fromNode || !toNode) return null;
            
            const isHighlighted = activeNode && (activeNode.id === c.from || activeNode.id === c.to);

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isHighlighted ? '#818cf8' : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth={isHighlighted ? '2.5' : '1.5'}
                strokeDasharray={c.from === 'rahul' && c.to === 'auth_blocker' ? '4 4' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(node)}
              onMouseEnter={() => setActiveNode(node)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-20`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {/* Pulse Ring */}
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-lg transition-transform ${
                  isSelected ? 'scale-125 ring-4 ring-indigo-500/30' : 'group-hover:scale-110'
                }`}
                style={{ 
                  backgroundColor: `${node.color}25`, 
                  borderColor: node.color,
                  color: node.color 
                }}
              >
                {node.type === 'person' && <Users className="w-4 h-4" />}
                {node.type === 'source' && <MessageSquare className="w-4 h-4" />}
                {node.type === 'signal' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              </div>

              {/* Node Label */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 shadow-md">
                {node.label}
              </div>
            </div>
          );
        })}

        {/* Active Node Detail Overlay Banner */}
        {activeNode && (
          <div className="absolute bottom-2 left-2 right-2 p-2.5 rounded-lg bg-slate-950/95 border border-indigo-500/40 text-xs text-white flex items-center justify-between shadow-xl animate-in slide-in-from-bottom-2 duration-150 z-30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeNode.color }} />
              <span className="font-bold">{activeNode.label}</span>
              <span className="text-zinc-400">· {activeNode.status}</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded">
              Active Context Node
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
