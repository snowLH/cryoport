import { Sparkles, Terminal, Cpu, Code2, ArrowUpRight } from 'lucide-react';
import type { DiscordPresenceData } from '../hooks/useDiscordPresence';

interface ProfileWidgetProps {
  presence: DiscordPresenceData;
}

export function ProfileWidget({ presence }: ProfileWidgetProps) {
  return (
    <div className="col-span-1 md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/10 group">
      {/* Subtle top edge shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      {/* Top Header: Avatar + Status + Handle */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Discord Avatar with Live Status Halo */}
            <div className="relative group/avatar">
              <div className="absolute -inset-1 rounded-full bg-cyan-500/20 opacity-70 blur-sm group-hover/avatar:opacity-100 transition duration-300 animate-pulse" />
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full border border-white/10 bg-zinc-950 p-1 overflow-hidden shadow-inner">
                <img
                  src={presence.avatarUrl}
                  alt={presence.username}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Discord Live Status Indicator */}
              <div
                className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-900"
                title={`Discord Status: ${presence.statusLabel}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${presence.statusColor} animate-pulse`} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                  Henry
                </h1>
                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                  @snowLH
                </span>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
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
            className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] px-3 py-1.5 rounded-full font-mono transition-all"
          >
            <span>Dev Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Bio exigida */}
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
          Apaixonado por tecnologia desde os 7 anos. Focado em desenvolvimento web, criação de apps e automação com IA. Transformando ideias em código.
        </p>
      </div>

      {/* Tech pills / Badges */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {[
            { name: 'Full-Stack Dev', icon: Code2, color: 'text-cyan-400' },
            { name: 'Next.js & React', icon: Terminal, color: 'text-sky-400' },
            { name: 'Automação & IA', icon: Cpu, color: 'text-amber-300' },
            { name: 'Tailwind CSS', icon: Sparkles, color: 'text-cyan-300' },
          ].map((item) => (
            <span
              key={item.name}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.02] border border-white/5 text-zinc-300 hover:border-cyan-500/30 hover:text-cyan-200 transition-colors"
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
