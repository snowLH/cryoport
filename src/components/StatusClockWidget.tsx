import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

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
    <div className="col-span-1 md:col-span-1 md:row-span-1 h-full w-full relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-5 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:border-cyan-500/20 group">
      {/* Subtle top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

      {/* Header: Status live badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
            Disponível
          </span>
        </div>

        <Clock className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
      </div>

      {/* Clock Display */}
      <div className="my-auto py-1">
        <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wider group-hover:text-cyan-200 transition-colors">
          {time || '--:--:--'}
        </p>
        <p className="text-[10px] font-mono text-zinc-500 flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span>São Paulo, BR (GMT-3)</span>
        </p>
      </div>

      {/* Footer Label */}
      <div className="text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-1.5 flex items-center justify-between">
        <span>Status</span>
        <span className="text-cyan-300/80">Freelas & Dev</span>
      </div>
    </div>
  );
}
