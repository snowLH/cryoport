import React, { useState } from 'react';
import { ArrowUpRight, Flame, Layers } from 'lucide-react';

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
      href="https://github.com/snowLH"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/40 group shadow-sm hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.25)]"
    >
      {/* Top light accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Interactive Radial Glow (Follows cursor on hover) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.18), transparent 70%)`,
        }}
      />

      {/* Ambient background glow orb */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

      {/* Header: Project Badge + Icon */}
      <div className="flex items-center justify-between relative z-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-2.5 py-0.5 text-[11px] font-mono font-medium text-cyan-300 uppercase">
          <Flame className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
          Projeto Principal
        </span>

        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cyan-300 group-hover:scale-105 transition-all">
          <Layers className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Project Description */}
      <div className="relative z-10 my-1">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors flex items-center gap-2">
            CryoHive
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 font-normal">
              v1.0
            </span>
          </h2>

          <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-cyan-300 transition-colors">
            <span>Ver código</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
          Orquestração de inteligência artificial, agentes reativos e interfaces em Glassmorphism de alto desempenho.
        </p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 relative z-10 pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-500">
        <span className="text-zinc-400">Stack:</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Next.js</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Claude AI</span>
        <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">Tailwind</span>
      </div>
    </a>
  );
}
