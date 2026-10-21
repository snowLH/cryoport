import React, { useState } from 'react';
import { ArrowUpRight, Bot, Sparkles, Terminal } from 'lucide-react';

interface SecondProjectWidgetProps {
  isHalloween?: boolean;
}

export function SecondProjectWidget({ isHalloween = true }: SecondProjectWidgetProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <a
      href="https://github.com/snowLH"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border ${
        isHalloween ? 'border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_0_35px_-5px_rgba(168,85,247,0.25)]' : 'border-white/5 hover:border-indigo-400/40 hover:shadow-[0_0_35px_-5px_rgba(99,102,241,0.25)]'
      } p-5 flex flex-col justify-between transition-all duration-300 group shadow-sm`}
    >
      {/* Top light accent */}
      <div className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent ${
        isHalloween ? 'via-purple-500/40' : 'via-indigo-400/30'
      } to-transparent`} />

      {/* Spooky corner pumpkin */}
      {isHalloween && (
        <span className="pointer-events-none absolute top-3 right-3 text-lg select-none opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
          🎃
        </span>
      )}

      {/* Interactive Radial Glow (Follows cursor on hover) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHalloween
            ? `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.22), transparent 70%)`
            : `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.18), transparent 70%)`,
        }}
      />

      {/* Ambient background glow orb */}
      <div className={`pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full ${
        isHalloween ? 'bg-purple-600/10 group-hover:bg-purple-600/20' : 'bg-indigo-500/10 group-hover:bg-indigo-500/20'
      } blur-2xl transition-all duration-500`} />

      {/* Header: Project Badge + Icon */}
      <div className="flex items-center justify-between relative z-10">
        <span className={`inline-flex items-center gap-1.5 rounded-full ${
          isHalloween ? 'bg-purple-500/15 border border-purple-400/40 text-purple-300' : 'bg-indigo-500/10 border border-indigo-400/30 text-indigo-300'
        } px-2.5 py-0.5 text-[11px] font-mono font-medium uppercase`}>
          <Bot className={`w-3 h-3 ${isHalloween ? 'text-purple-400' : 'text-indigo-400'}`} />
          {isHalloween ? '🎃 Aegis // Spooky Bot & IA' : 'Bot & Automação IA'}
        </span>

        <div className="flex items-center gap-2 pr-6">
          <span className={`text-[11px] font-mono ${isHalloween ? 'text-purple-300/70 group-hover:text-purple-300' : 'text-zinc-500 group-hover:text-indigo-300'} transition-colors flex items-center gap-1`}>
            <span>Ver código</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-purple-300 group-hover:scale-105 transition-all">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 my-1 flex items-center gap-4">
        {/* Terminal/Bot Icon Block */}
        <div className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border ${
          isHalloween ? 'border-purple-500/30 group-hover:border-purple-500/60 bg-gradient-to-br from-purple-950/60 to-zinc-950 text-purple-300' : 'border-white/10 bg-gradient-to-br from-indigo-950/50 to-zinc-950 text-indigo-400'
        } p-3 flex flex-col items-center justify-center transition-colors shadow-inner`}>
          <Terminal className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-[9px] font-mono mt-1 opacity-80">AI AGENT</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-purple-200 transition-colors truncate flex items-center gap-1.5">
              <span>Aegis // Neural Bot</span>
              {isHalloween && <span className="text-sm">🎃</span>}
            </h2>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              isHalloween ? 'bg-purple-500/10 text-purple-300 border border-purple-400/30' : 'bg-indigo-500/10 text-indigo-300 border border-indigo-400/20'
            } font-normal shrink-0`}>
              Active
            </span>
          </div>

          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            Bot com agentes inteligentes no Discord, processamento de linguagem natural, moderação e automações em nuvem.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className={`flex items-center gap-2 relative z-10 pt-2 border-t ${isHalloween ? 'border-purple-500/15' : 'border-white/5'} text-[11px] font-mono text-zinc-500 overflow-x-auto no-scrollbar`}>
        <span className={isHalloween ? 'text-purple-400/80 font-medium' : 'text-zinc-400'}>Stack:</span>
        <span className={`px-2 py-0.5 rounded ${isHalloween ? 'bg-purple-500/5 text-purple-200 border border-purple-500/20' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>TypeScript</span>
        <span className={`px-2 py-0.5 rounded ${isHalloween ? 'bg-purple-500/5 text-purple-200 border border-purple-500/20' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>Discord.js</span>
        <span className={`px-2 py-0.5 rounded ${isHalloween ? 'bg-purple-500/5 text-purple-200 border border-purple-500/20' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>LangChain</span>
        <span className={`px-2 py-0.5 rounded ${isHalloween ? 'bg-purple-500/5 text-purple-200 border border-purple-500/20' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>Docker</span>
      </div>
    </a>
  );
}
