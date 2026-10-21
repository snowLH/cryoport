import { Sparkles, Terminal, Cpu, Code2, ArrowUpRight } from 'lucide-react';
import type { DiscordPresenceData } from '../hooks/useDiscordPresence';
import avatarImg from '../assets/avatar.png';
import { BlueDice } from './BlueDice';

interface ProfileWidgetProps {
  presence: DiscordPresenceData;
  isHalloween?: boolean;
}

export function ProfileWidget({ presence, isHalloween = true }: ProfileWidgetProps) {
  // Use uploaded high-res square avatar, fallback to Discord avatar if needed
  const displayAvatar = avatarImg || presence.avatarUrl;

  return (
    <div className={`col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border ${isHalloween ? 'border-orange-500/30 hover:border-orange-500/60 shadow-[0_0_25px_-5px_rgba(249,115,22,0.15)] hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.3)]' : 'border-white/5 hover:border-cyan-500/30 shadow-[0_0_25px_-5px_rgba(6,182,212,0.1)] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.2)]'} p-6 md:p-8 flex flex-col justify-between transition-all duration-300 group`}>
      {/* Subtle top edge shimmer */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent ${
          isHalloween ? 'via-orange-500/50' : 'via-cyan-400/40'
        } to-transparent`}
      />

      {/* Spooky corner spiderweb or Cyber Blue Dice in Normal Mode */}
      {isHalloween ? (
        <span className="pointer-events-none absolute top-3 right-3 text-2xl select-none opacity-40 group-hover:opacity-75 transition-opacity">
          🕸️
        </span>
      ) : (
        <div className="absolute top-3.5 right-3.5 opacity-70 group-hover:opacity-100 transition-opacity">
          <BlueDice size="sm" />
        </div>
      )}

      {/* Top Header: Avatar + Status + Handle */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Enlarged Avatar with Status Halo & Resting Pumpkin / Blue Dice */}
            <div className="relative group/avatar shrink-0">
              {/* Resting Pumpkin in Halloween or Cyber Blue Dice in Normal Mode */}
              {isHalloween ? (
                <span className="absolute -top-3.5 -right-1 text-2xl select-none filter drop-shadow-[0_0_8px_rgba(249,115,22,0.9)] animate-bounce z-20">
                  🎃
                </span>
              ) : (
                <div className="absolute -top-3.5 -right-1.5 z-20">
                  <BlueDice size="sm" />
                </div>
              )}

              {/* Glowing Aura Halo */}
              <div
                className={`absolute -inset-1.5 rounded-full ${
                  isHalloween
                    ? 'bg-gradient-to-tr from-orange-600 via-amber-500 to-purple-600 opacity-80 blur-md group-hover/avatar:opacity-100'
                    : 'bg-gradient-to-tr from-cyan-500/40 via-sky-400/30 to-blue-600/40 opacity-70 blur-md group-hover/avatar:opacity-100'
                } transition duration-300 animate-pulse`}
              />

              {/* Main Avatar Circle (Enlarged) */}
              <div className={`relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full ${
                isHalloween ? 'border-2 border-orange-500/60 ring-2 ring-orange-500/20' : 'border-2 border-cyan-400/40 ring-2 ring-cyan-500/20'
              } bg-zinc-950 p-1 overflow-hidden shadow-2xl`}>
                <img
                  src={displayAvatar}
                  alt={presence.username}
                  className="w-full h-full rounded-full object-cover group-hover/avatar:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Discord Live Status Indicator */}
              <div
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center border-2 border-zinc-900 z-10"
                title={`Discord Status: ${presence.statusLabel}`}
              >
                <div className={`w-3 h-3 rounded-full ${presence.statusColor} animate-pulse`} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors flex items-center gap-1.5">
                  <span>Henry</span>
                  {isHalloween ? (
                    <span className="text-xl">🎃</span>
                  ) : (
                    <BlueDice size="xs" className="opacity-80" />
                  )}
                </h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-mono ${
                    isHalloween
                      ? 'bg-orange-500/15 border border-orange-500/40 text-orange-300 font-semibold'
                      : 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-300'
                  }`}
                >
                  @snowLH
                </span>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
                <Sparkles className={`w-3.5 h-3.5 ${isHalloween ? 'text-orange-400' : 'text-cyan-400'}`} />
                Discord: <span className="text-zinc-300 font-mono">@{presence.username}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 font-mono text-xs">{presence.statusLabel}</span>
              </p>
            </div>
          </div>

          <a
            href="https://github.com/snowLH"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:flex items-center gap-1.5 text-xs ${
              isHalloween
                ? 'text-orange-300 hover:text-white border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5 hover:bg-orange-500/10'
                : 'text-cyan-300 hover:text-white border-cyan-500/20 hover:border-cyan-400/50 bg-cyan-500/5 hover:bg-cyan-500/10'
            } border px-3 py-1.5 rounded-full font-mono transition-all`}
          >
            <span>Dev Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Bio */}
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
          Apaixonado por tecnologia desde os 7 anos. Focado em desenvolvimento web, criação de apps e automação com IA. Transformando ideias em código.
        </p>
      </div>

      {/* Tech pills / Badges */}
      <div className={`pt-4 border-t ${isHalloween ? 'border-orange-500/20' : 'border-white/5'}`}>
        <div className="flex flex-wrap gap-2">
          {[
            { name: isHalloween ? '🎃 Full-Stack Dev' : 'Full-Stack Dev', icon: Code2, color: isHalloween ? 'text-orange-400' : 'text-cyan-400' },
            { name: isHalloween ? '🎃 Next.js & React' : 'Next.js & React', icon: Terminal, color: isHalloween ? 'text-amber-300' : 'text-sky-400' },
            { name: isHalloween ? '🎃 Automação & IA' : 'Automação & IA', icon: Cpu, color: isHalloween ? 'text-purple-400' : 'text-cyan-300' },
            { name: isHalloween ? '🎃 Tailwind CSS' : 'Tailwind CSS', icon: Sparkles, color: isHalloween ? 'text-orange-300' : 'text-sky-300' },
          ].map((item) => (
            <span
              key={item.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.02] border ${
                isHalloween
                  ? 'border-orange-500/20 text-orange-200 hover:border-orange-500/50 hover:bg-orange-500/10'
                  : 'border-white/5 text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-200'
              } transition-colors`}
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
