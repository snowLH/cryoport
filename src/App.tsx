import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Cpu,
  Code2,
  Terminal,
  Music,
  Activity,
  Clock,
  ArrowUpRight,
  Snowflake,
  Mail,
  MapPin,
  Layers,
  Flame,
  Play,
  Pause,
} from 'lucide-react';

// Custom precision SVG icons for brand consistency without external dependencies
const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.79-1.963-.334-.02-.59-.307-.57-.64.02-.334.306-.59.64-.57 3.81.222 7.085.586 9.72 2.195.294.18.386.563.207.857zm1.226-2.725c-.226.368-.71.485-1.077.26-2.69-1.653-6.79-2.13-9.972-2.167-.413-.005-.744-.344-.739-.757.005-.413.344-.744.757-.739 3.633.042 8.163.57 11.23 2.457.368.226.486.71.261 1.078zm.13-2.848C14.72 8.94 8.764 8.74 5.312 9.787c-.492.15-1.013-.13-1.163-.623-.15-.492.13-1.013.623-1.163 3.993-1.212 10.59-.982 14.73 1.478.442.262.587.834.324 1.276-.262.442-.834.587-1.276.324z" />
  </svg>
);

const DiscordIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ClaudeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 4.5l-3.2 4.6 2.5 5.9-5.1-2.2-4.1 4.7 1.4-6.3-5-2.4 6.2-.8 2.1-5.7 2.7 5.7 2.5-3.5z" />
  </svg>
);

export default function App() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);

  const tracks = [
    { title: "Roller Mobster", artist: "Carpenter Brut", duration: "3:34", type: "Synthwave / Cyber" },
    { title: "Cena 0", artist: "Teto & Matuê", duration: "2:48", type: "Trap / Vibe" },
  ];

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Framer motion variants with explicit typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Heatmap dummy commit activity
  const heatmapData = [
    [1, 2, 3, 0, 2, 3, 1],
    [0, 1, 3, 2, 1, 0, 3],
    [2, 3, 2, 3, 3, 2, 1],
    [3, 2, 1, 3, 2, 3, 2],
    [1, 0, 2, 3, 1, 2, 3],
    [2, 3, 3, 1, 2, 3, 0],
    [3, 1, 2, 3, 3, 1, 2],
    [2, 3, 1, 2, 3, 3, 3],
    [3, 2, 3, 1, 0, 2, 1],
    [1, 3, 2, 3, 2, 3, 3],
    [2, 1, 3, 2, 3, 1, 2],
    [3, 3, 2, 3, 1, 2, 3],
    [2, 3, 3, 2, 3, 3, 2],
    [3, 2, 1, 3, 2, 3, 3],
  ];

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-200">
      {/* =========================================================================
          BACKGROUND AURORA & FROST GLOW LAYERS
          ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Radial Aurora Orb 1 (Top Left - Cyan Glow) */}
        <div className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-cyan-500/12 blur-[140px] animate-aurora" />

        {/* Radial Aurora Orb 2 (Center Right - Deep Icy Blue Glow) */}
        <div
          className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-blue-600/10 blur-[160px] animate-aurora"
          style={{ animationDelay: '-5s' }}
        />

        {/* Radial Aurora Orb 3 (Bottom Center - Electric Frost Glow) */}
        <div
          className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-sky-400/8 blur-[150px] animate-aurora"
          style={{ animationDelay: '-8s' }}
        />

        {/* Subtle Cryo Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

        {/* Floating Frost Particles / Micro Star Dust */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* Floating Copy Notification Toast */}
      <AnimatePresence>
        {copiedText && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.3)] text-xs md:text-sm font-medium text-cyan-200"
          >
            <Check className="w-4 h-4 text-cyan-400" />
            <span>{copiedText} copiado com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MAIN CONTAINER
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-16">
        
        {/* Top Header / System Status Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md px-5 py-3 text-xs text-zinc-400"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            <span className="font-mono uppercase tracking-wider text-zinc-300">CRYO OS // v2.4</span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="hidden sm:inline text-zinc-400">DISPONÍVEL PARA PROJETOS</span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <div className="flex items-center gap-1.5 text-cyan-300/80">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime || '00:00:00'} (BRT)</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sky-400/70 border-l border-white/10 pl-4">
              <Snowflake className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '12s' }} />
              <span>CRYO CORE -4°C</span>
            </div>
          </div>
        </motion.header>

        {/* =========================================================================
            BENTO GRID (Responsive: 1 col on mobile -> 3/4 cols on desktop)
            ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >

          {/* -----------------------------------------------------------------------
              1. MAIN CARD: SOBRE MIM (Spans 2 columns on desktop)
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group flex flex-col justify-between"
          >
            {/* Subtle light shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            <div>
              {/* Header inside About Card: Avatar + Nickname & Status */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  {/* Avatar with Frost Halo Ring */}
                  <div className="relative group/avatar">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-70 blur-sm group-hover/avatar:opacity-100 transition duration-300 animate-pulse" />
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-cyan-400/40 bg-zinc-950 p-1 overflow-hidden shadow-inner">
                      {/* Stylized Avatar Placeholder with Initials and Frost Icon */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-cyan-950/80 flex flex-col items-center justify-center text-cyan-200">
                        <span className="font-mono font-bold text-xl md:text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                          HL
                        </span>
                        <span className="text-[10px] text-cyan-400/80 font-mono -mt-0.5">snowLH</span>
                      </div>
                    </div>
                    {/* Live Online Badge */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-zinc-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors">
                        Henry
                      </h1>
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[11px] font-mono text-cyan-300">
                        @snowLH
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      Desenvolvedor Web & Automação com IA
                    </p>
                  </div>
                </div>

                {/* Location indicator */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-full font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Brasil</span>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                Apaixonado por tecnologia desde os 7 anos. Focado em desenvolvimento web, criação de apps e automação com IA (<span className="text-cyan-300 font-medium">Claude</span>). Transformando ideias em código.
              </p>
            </div>

            {/* Tech Badges / Pills */}
            <div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                {[
                  { name: 'Claude AI', icon: ClaudeIcon, color: 'text-amber-300' },
                  { name: 'React', icon: Code2, color: 'text-cyan-400' },
                  { name: 'TypeScript', icon: Terminal, color: 'text-sky-400' },
                  { name: 'Tailwind CSS', icon: Sparkles, color: 'text-cyan-300' },
                  { name: 'Automações & APIs', icon: Cpu, color: 'text-blue-400' },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                  >
                    <tech.icon className={`w-3.5 h-3.5 ${tech.color}`} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* -----------------------------------------------------------------------
              2. FEATURED PROJECT: CRYOHIVE (Glow Cyan/Azul Especial - Spans 2 cols)
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 relative overflow-hidden rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-zinc-900/90 via-cyan-950/20 to-zinc-900/90 p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_-5px_rgba(6,182,212,0.22)] transition-all duration-300 hover:shadow-[0_0_55px_-5px_rgba(6,182,212,0.38)] hover:border-cyan-400/70 group flex flex-col justify-between"
          >
            {/* Top Glowing Frost Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />
            
            {/* Ambient Background Radial Glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full bg-cyan-500/20 blur-3xl group-hover:bg-cyan-500/30 transition-all duration-500" />

            <div>
              {/* Badge + Top Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 px-3 py-1 text-xs font-mono font-semibold tracking-wide text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Flame className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/40 animate-pulse" />
                  Projeto em Destaque
                </span>

                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4 text-cyan-300" />
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mb-3">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 group-hover:text-cyan-200 transition-colors">
                  CryoHive
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 font-normal">
                    v1.0
                  </span>
                </h2>
                <p className="text-xs font-mono text-cyan-400/80 mt-1 uppercase tracking-wider">
                  Neural Intelligence Hub & Automation Engine
                </p>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Meu ecossistema principal: uma arquitetura de alta performance focada em orquestração de agentes de IA, automações em tempo real e interfaces ultrarrápidas com temática Glassmorphism.
              </p>
            </div>

            {/* Actions & Tech Stack Preview */}
            <div className="pt-4 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">Stack:</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">Claude API</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">Next.js</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">Tailwind</span>
              </div>

              <a
                href="https://github.com/snowLH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 hover:text-white text-xs font-mono font-medium transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <span>Explorar CryoHive</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* -----------------------------------------------------------------------
              3. SPOTIFY WIDGET (Estilo Now Playing & Playlists)
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] group flex flex-col justify-between"
          >
            {/* Top Light Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />

            <div>
              {/* Header Widget */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <SpotifyIcon className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        Ouvindo agora
                      </span>
                      {/* Animated Sound Wave Equalizer */}
                      <div className="flex items-end gap-[3px] h-3.5">
                        <motion.span
                          animate={{ height: isPlaying ? ['4px', '14px', '6px', '12px', '4px'] : '4px' }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          className="w-[2px] bg-emerald-400 rounded-full"
                        />
                        <motion.span
                          animate={{ height: isPlaying ? ['10px', '4px', '14px', '8px', '10px'] : '4px' }}
                          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                          className="w-[2px] bg-emerald-400 rounded-full"
                        />
                        <motion.span
                          animate={{ height: isPlaying ? ['6px', '14px', '4px', '12px', '6px'] : '4px' }}
                          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                          className="w-[2px] bg-emerald-400 rounded-full"
                        />
                        <motion.span
                          animate={{ height: isPlaying ? ['12px', '6px', '14px', '4px', '12px'] : '4px' }}
                          transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
                          className="w-[2px] bg-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono">Spotify Live Feed</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/30 text-zinc-300 hover:text-emerald-300 transition-colors"
                  title={isPlaying ? "Pausar equalizador" : "Tocar equalizador"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Highlighted Playlists / Tracks */}
              <div className="space-y-2 mb-4">
                {tracks.map((track, idx) => {
                  const isActive = activeTrackIndex === idx;
                  return (
                    <div
                      key={track.title}
                      onClick={() => setActiveTrackIndex(idx)}
                      className={`cursor-pointer rounded-2xl p-3 border transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.06)]'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                          isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-zinc-400'
                        }`}>
                          {isActive ? <Music className="w-4 h-4 text-emerald-400" /> : idx + 1}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                            {track.title}
                          </p>
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                            <span>{track.artist}</span>
                            <span>•</span>
                            <span className="text-[10px] font-mono text-zinc-500">{track.type}</span>
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: isPlaying ? ['20%', '85%', '40%', '65%'] : '65%' }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>1:48</span>
                  <span>{tracks[activeTrackIndex].duration}</span>
                </div>
              </div>
            </div>

            {/* Profile Link Button */}
            <a
              href="https://open.spotify.com/user/31pcajmiw7qy7hkm4jhc26gb3mgi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/30 text-xs font-mono font-medium text-zinc-300 hover:text-emerald-300 transition-all"
            >
              <SpotifyIcon className="w-4 h-4 fill-current" />
              <span>Acessar Perfil no Spotify</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </motion.div>

          {/* -----------------------------------------------------------------------
              4. GITHUB WIDGET (Métricas e Layout de Contribuições)
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] group flex flex-col justify-between"
          >
            {/* Top Light Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                      GitHub
                      <span className="text-xs font-mono font-normal text-zinc-400">@snowLH</span>
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">github.com/snowLH</p>
                  </div>
                </div>

                <a
                  href="https://github.com/snowLH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/30 text-zinc-300 hover:text-cyan-300 transition-all"
                  title="Abrir perfil no GitHub"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Fictitious Metrics Cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="block text-xl font-mono font-bold text-cyan-300">32+</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Repositórios</span>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="block text-xl font-mono font-bold text-white">1,420+</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Contribuições</span>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <span className="block text-xl font-mono font-bold text-sky-400">42 d</span>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Streak Ativo</span>
                </div>
              </div>

              {/* Dummy Heatmap Graph (Mini commit calendar) */}
              <div className="rounded-2xl border border-white/5 bg-black/30 p-3.5 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Atividade de Código Recente
                  </span>
                  <span className="text-[10px] text-zinc-500">Últimos meses</span>
                </div>

                {/* Heatmap Grid */}
                <div className="flex gap-1.5 justify-between overflow-x-auto py-1">
                  {heatmapData.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1.5">
                      {week.map((level, dIdx) => {
                        const bgColors = [
                          'bg-zinc-800/40', // 0: no commits
                          'bg-cyan-900/60', // 1: low
                          'bg-cyan-600/80', // 2: medium
                          'bg-cyan-400',    // 3: high (glowing)
                        ];
                        return (
                          <div
                            key={dIdx}
                            className={`w-2.5 h-2.5 rounded-[3px] ${bgColors[level]} transition-colors hover:scale-125`}
                            title={`Nível de atividade: ${level}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-1.5 mt-2.5 text-[10px] font-mono text-zinc-500">
                  <span>Menos</span>
                  <span className="w-2 h-2 rounded-[2px] bg-zinc-800/50" />
                  <span className="w-2 h-2 rounded-[2px] bg-cyan-900/60" />
                  <span className="w-2 h-2 rounded-[2px] bg-cyan-600/80" />
                  <span className="w-2 h-2 rounded-[2px] bg-cyan-400" />
                  <span>Mais</span>
                </div>
              </div>
            </div>

            {/* Direct Link */}
            <a
              href="https://github.com/snowLH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-xs font-mono font-medium text-zinc-300 hover:text-cyan-300 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Ver Perfil @snowLH no GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </motion.div>

          {/* -----------------------------------------------------------------------
              5. 1x1 SQUARE WIDGET: DISCORD
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-zinc-900/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.12)] group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <DiscordIcon className="w-5 h-5 fill-current" />
              </div>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            <div className="my-3">
              <h4 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                Discord
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">@snowlh</p>
            </div>

            <button
              onClick={() => handleCopy('@snowlh', 'Discord')}
              className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-500/30 text-xs font-mono text-zinc-300 hover:text-indigo-200 transition-all cursor-pointer"
            >
              <span>Copiar Tag</span>
              <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-300" />
            </button>
          </motion.div>

          {/* -----------------------------------------------------------------------
              6. 1x1 SQUARE WIDGET: INSTAGRAM
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/40 hover:bg-zinc-900/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.12)] group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-pink-300 transition-colors" />
            </div>

            <div className="my-3">
              <h4 className="text-base font-bold text-white group-hover:text-pink-200 transition-colors">
                Instagram
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">@snowLH</p>
            </div>

            <a
              href="https://instagram.com/snowLH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-pink-500/15 border border-white/10 hover:border-pink-500/30 text-xs font-mono text-zinc-300 hover:text-pink-200 transition-all"
            >
              <span>Abrir Perfil</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-pink-300" />
            </a>
          </motion.div>

          {/* -----------------------------------------------------------------------
              7. 1x1 SQUARE WIDGET: EMAIL / CONTATO
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-zinc-900/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Direto
              </span>
            </div>

            <div className="my-3">
              <h4 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors">
                E-mail
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5 truncate" title="henry@snowlh.dev">
                henry@snowlh.dev
              </p>
            </div>

            <button
              onClick={() => handleCopy('henry@snowlh.dev', 'E-mail')}
              className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-zinc-300 hover:text-cyan-200 transition-all cursor-pointer"
            >
              <span>Copiar E-mail</span>
              <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-300" />
            </button>
          </motion.div>

          {/* -----------------------------------------------------------------------
              8. 1x1 SQUARE WIDGET: CRYO PROTOCOL STATUS
              ----------------------------------------------------------------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/40 hover:bg-zinc-900/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)] group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                <Snowflake className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full bg-sky-500/5">
                ATIVO
              </span>
            </div>

            <div className="my-3">
              <h4 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                Cryo Status
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">Estabilidade: 99.9%</p>
            </div>

            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300">
              <span className="text-zinc-400">Temp:</span>
              <span className="text-sky-300 font-bold">-4.0 °C</span>
            </div>
          </motion.div>

        </motion.div>

        {/* =========================================================================
            FOOTER / WATERMARK
            ========================================================================= */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 pt-8 border-t border-white/5 text-center text-xs text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <span>© {new Date().getFullYear()} Henry (@snowLH) • Todos os direitos reservados.</span>
          </div>

          <div className="text-zinc-600 flex items-center gap-2">
            <span>Construído com React, Framer Motion & Tailwind CSS</span>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
