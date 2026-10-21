import { useState, useEffect } from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { BlueDice } from './BlueDice';

export function StatusClockWidget() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-1 md:col-span-2 md:row-span-1 h-full w-full relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-sm">
      {/* Subtle top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Cyber Blue Dice Accent */}
      <div className="pointer-events-none absolute top-3.5 right-3.5 opacity-70 group-hover:opacity-100 transition-opacity">
        <BlueDice size="sm" />
      </div>

      {/* Header: Status live badge & Location */}
      <div className="flex items-center justify-between pr-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
            Disponível para Projetos
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-500">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Horário Local</span>
        </div>
      </div>

      {/* Middle: Big Digital Clock & Timezone */}
      <div className="my-auto py-2 flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <p className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wider group-hover:text-cyan-200 transition-colors">
            {time || '--:--:--'}
          </p>
          <p className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>São Paulo, Brasil • GMT-3</span>
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-mono text-zinc-400">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>Full-Stack & IA</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-2 flex items-center justify-between">
        <span className="text-zinc-500">Status de Trabalho:</span>
        <span className="text-cyan-300 font-medium">Aberto para Freelance & Colaborações</span>
      </div>
    </div>
  );
}
