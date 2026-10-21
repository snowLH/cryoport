import React, { useState } from 'react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { BlueDice } from './BlueDice';

interface EmailWidgetProps {
  email?: string;
  onCopy?: (text: string, label: string) => void;
}

export function EmailWidget({
  email = 'henrysoldan@gmail.com',
  onCopy,
}: EmailWidgetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    if (onCopy) {
      onCopy(email, 'E-mail');
    }
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      onClick={handleCopy}
      className="col-span-1 md:col-span-2 md:row-span-1 h-full w-full relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.15)]"
    >
      {/* Subtle top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

      {/* Cyber Blue Dice Accent */}
      <div className="pointer-events-none absolute top-3.5 right-3.5 opacity-70 group-hover:opacity-100 transition-opacity">
        <BlueDice size="sm" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pr-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-0.5 text-[11px] font-mono font-medium uppercase">
          <Mail className="w-3 h-3 text-emerald-400" />
          Contato Direto
        </span>

        <span className="text-[11px] font-mono text-zinc-500 group-hover:text-emerald-300 transition-colors flex items-center gap-1">
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Clique para copiar</span>
            </>
          )}
        </span>
      </div>

      {/* Email Display */}
      <div className="my-auto py-2 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
            <Mail className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-200 transition-colors font-mono tracking-tight">
              {email}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              Propostas • Projetos • Freelas
            </p>
          </div>
        </div>

        <a
          href={`mailto:${email}`}
          onClick={(e) => e.stopPropagation()}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-zinc-300 hover:text-emerald-200 transition-all"
        >
          <span>Abrir Mail</span>
          <Send className="w-3 h-3" />
        </a>
      </div>

      {/* Footer Info */}
      <div className="text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-2 flex items-center justify-between">
        <span className="text-zinc-500">Tempo de Resposta:</span>
        <span className="text-emerald-300 font-medium">Geralmente em até 24 horas</span>
      </div>
    </div>
  );
}
