import React, { useState } from 'react';
import { ArrowUpRight, Flame, Layers, Snowflake } from 'lucide-react';
import { BlueDice } from './BlueDice';

export function CryoHiveWidget() {
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
      href="https://cryo-hive-cryohive-web.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-cyan-400/40 hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.25)] p-5 flex flex-col justify-between transition-all duration-300 group shadow-sm"
    >
      {/* Top light accent */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Corner accent: Blue Cyber Dice */}
      <div className="pointer-events-none absolute top-3 right-3 select-none transition-all">
        <BlueDice size="sm" className="opacity-75 group-hover:opacity-100" />
      </div>

      {/* Interactive Radial Glow (Follows cursor on hover) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.18), transparent 70%)`,
        }}
      />

      {/* Ambient background glow orb */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 blur-2xl transition-all duration-500" />

      {/* Header: Project Badge + Icon */}
      <div className="flex items-center justify-between relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 px-2.5 py-0.5 text-[11px] font-mono font-medium uppercase">
          <Flame className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
          Projeto Principal // Ecossistema
        </span>

        <div className="flex items-center gap-2 pr-6">
          <span className="text-[11px] font-mono text-zinc-500 group-hover:text-cyan-300 transition-colors flex items-center gap-1">
            <span>Acessar App</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Main Content with Snowflake Emblem */}
      <div className="relative z-10 my-1 flex items-center gap-4">
        {/* Snowflake Emblem Box */}
        <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-cyan-500/30 group-hover:border-cyan-400/60 bg-gradient-to-br from-cyan-500/15 via-zinc-950 to-zinc-900 text-cyan-400 shadow-[0_0_20px_-3px_rgba(6,182,212,0.25)] p-2.5 sm:p-3 flex items-center justify-center transition-all duration-500 shadow-inner group-hover:scale-105">
          <Snowflake className="w-full h-full text-cyan-400 group-hover:rotate-180 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent pointer-events-none" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors truncate flex items-center gap-1.5">
              <span>CryoHive</span>
            </h2>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 font-normal shrink-0">
              Live PWA
            </span>
          </div>

          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            Seu segundo cérebro inteligente: organize notas com IA, explore conexões em mapa 3D e atinja hiperfoco com sons árticos no desktop e celular.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-1.5 sm:gap-2 relative z-10 pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-500 overflow-x-auto no-scrollbar">
        <span className="text-zinc-400 font-medium">Stack:</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">React 19</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Supabase</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Three.js 3D</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Gemini AI</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Web Audio</span>
      </div>
    </a>
  );
}
