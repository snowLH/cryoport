import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, Snowflake, Mail } from 'lucide-react';
import { SnowParticles } from './components/SnowParticles';
import { BlueDice } from './components/BlueDice';
import { ProfileWidget } from './components/ProfileWidget';
import { SpotifyWidget } from './components/SpotifyWidget';
import { CryoHiveWidget } from './components/CryoHiveWidget';
import { SecondProjectWidget } from './components/SecondProjectWidget';
import { StatusClockWidget } from './components/StatusClockWidget';
import {
  SocialWidget,
  GithubLogo,
  InstagramLogo,
  RobloxLogo,
  DiscordLogo,
} from './components/SocialWidget';
import { useDiscordPresence } from './hooks/useDiscordPresence';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Halloween mode state with localStorage persistence (defaults to true for spooky season!)
  const [isHalloween, setIsHalloween] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('cryo_halloween_mode');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleHalloween = () => {
    setIsHalloween((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('cryo_halloween_mode', String(next));
      } catch {}
      return next;
    });
  };
  
  // Real-time Discord & Spotify presence via Lanyard API
  const presence = useDiscordPresence();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${label} copiado!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Framer motion container with stagger effect
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

  // Item variants: sliding from bottom (y: 20, opacity: 0)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={`relative min-h-screen bg-[#050505] text-white ${isHalloween ? 'selection:bg-orange-500/20 selection:text-orange-200' : 'selection:bg-cyan-500/20 selection:text-cyan-200'} font-sans antialiased flex flex-col justify-between overflow-x-hidden`}>
      
      {/* =========================================================================
          BACKGROUND: INTERACTIVE SPOOKY / SNOW PARTICLES CANVAS
          ========================================================================= */}
      <SnowParticles isHalloween={isHalloween} />

      {/* Aurora Ambient Radial Lights */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-all duration-700">
        {isHalloween ? (
          <>
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-600/15 blur-[130px]" />
            <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px]" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-amber-600/10 blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-blue-500/5 blur-[140px]" />
          </>
        )}
      </div>

      {/* Floating Copy Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border ${isHalloween ? 'border-orange-500/30 text-orange-200' : 'border-white/10 text-cyan-200'} backdrop-blur-md shadow-xl text-xs font-mono`}
          >
            <Check className={`w-3.5 h-3.5 ${isHalloween ? 'text-orange-400' : 'text-cyan-400'}`} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MAIN BENTO GRID CONTAINER
          ========================================================================= */}
      <main className="relative z-10 mx-auto max-w-5xl w-full px-4 py-10 md:py-16 my-auto">
        
        {/* Top Header Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500 px-1"
        >
          <div className="flex items-center gap-2">
            {isHalloween ? (
              <>
                <span className="text-base animate-bounce">🎃</span>
                <span className="tracking-wider uppercase text-orange-400 font-semibold">
                  CRYO // HALLOWEEN EDITION
                </span>
                <span className="text-xs">🦇</span>
              </>
            ) : (
              <>
                <BlueDice size="xs" />
                <span className="tracking-wider uppercase text-zinc-400 font-semibold">
                  CRYO // PORTFOLIO
                </span>
                <Snowflake className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Halloween / Normal Theme Toggle Button */}
            <button
              onClick={toggleHalloween}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all text-xs font-mono cursor-pointer ${
                isHalloween
                  ? 'bg-orange-500/10 border-orange-500/30 text-orange-300 hover:bg-orange-500/20'
                  : 'bg-white/5 border-white/10 text-cyan-300 hover:bg-white/10'
              }`}
              title="Clique para alternar entre o tema Halloween e o tema Normal"
            >
              <span>{isHalloween ? '🎃 Tema Halloween' : '❄️ Tema Normal'}</span>
              <span className="text-[10px] text-zinc-500">(trocar)</span>
            </button>

            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className={`w-1.5 h-1.5 rounded-full ${presence.isLive ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
              <span>Lanyard: {presence.isLive ? 'Live' : 'Standby'}</span>
            </div>
          </div>
        </motion.div>

        {/* CSS Grid (grid-cols-1 md:grid-cols-4, gap-4, auto-rows-[180px]) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[180px]"
        >
          {/* Row 1 & 2: 1. PROFILE WIDGET (2 colunas, 2 linhas) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-2">
            <ProfileWidget presence={presence} isHalloween={isHalloween} />
          </motion.div>

          {/* Row 1: 2. CRYOHIVE WIDGET (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <CryoHiveWidget isHalloween={isHalloween} />
          </motion.div>

          {/* Row 2: 3. AEGIS AI PROJECT (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <SecondProjectWidget isHalloween={isHalloween} />
          </motion.div>

          {/* Row 3: 4. SPOTIFY / LANYARD SYNC WIDGET (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <SpotifyWidget presence={presence} isHalloween={isHalloween} />
          </motion.div>

          {/* Row 3: 5. GITHUB MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title={isHalloween ? "GitHub 🎃" : "GitHub"}
              handle="@snowLH"
              href="https://github.com/snowLH"
              icon={<GithubLogo className="w-7 h-7" />}
              hoverBorder={isHalloween ? "hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:border-white/20"}
              isHalloween={isHalloween}
            />
          </motion.div>

          {/* Row 3: 6. DISCORD MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title={isHalloween ? "Discord 🎃" : "Discord"}
              handle={`@${presence.username}`}
              href="#"
              isAction={true}
              onActionClick={() => handleCopy(presence.username, 'Discord Tag')}
              icon={<DiscordLogo className="w-7 h-7" />}
              accentColor={isHalloween ? "text-orange-400 group-hover:text-orange-300" : "text-indigo-400 group-hover:text-indigo-300"}
              hoverBorder={isHalloween ? "hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:border-indigo-500/20"}
              isHalloween={isHalloween}
            />
          </motion.div>

          {/* Row 4: 7. E-MAIL MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title={isHalloween ? "E-mail 🎃" : "E-mail"}
              handle="henrysoldan@gmail.com"
              href="#"
              isAction={true}
              onActionClick={() => handleCopy('henrysoldan@gmail.com', 'E-mail')}
              icon={<Mail className="w-7 h-7" />}
              accentColor={isHalloween ? "text-amber-400 group-hover:text-amber-300" : "text-emerald-400 group-hover:text-emerald-300"}
              hoverBorder={isHalloween ? "hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:border-emerald-500/20"}
              isHalloween={isHalloween}
            />
          </motion.div>

          {/* Row 4: 8. INSTAGRAM MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title={isHalloween ? "Instagram 🎃" : "Instagram"}
              handle="@henry_bestsw"
              href="https://www.instagram.com/henry_bestsw/"
              icon={<InstagramLogo className="w-7 h-7" />}
              accentColor={isHalloween ? "text-orange-400 group-hover:text-pink-300" : "text-pink-400 group-hover:text-pink-300"}
              hoverBorder={isHalloween ? "hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:border-pink-500/20"}
              isHalloween={isHalloween}
            />
          </motion.div>

          {/* Row 4: 9. ROBLOX MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title={isHalloween ? "Roblox 🎃" : "Roblox"}
              handle="Henry"
              href="https://www.roblox.com/users/148506481/profile"
              icon={<RobloxLogo className="w-7 h-7" />}
              accentColor={isHalloween ? "text-amber-500 group-hover:text-amber-400" : "text-red-400 group-hover:text-red-300"}
              hoverBorder={isHalloween ? "hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.25)]" : "hover:border-red-500/20"}
              isHalloween={isHalloween}
            />
          </motion.div>

          {/* Row 4: 10. STATUS & CLOCK WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <StatusClockWidget isHalloween={isHalloween} />
          </motion.div>

        </motion.div>
      </main>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-mono text-zinc-600 border-t border-white/5">
        <div className="flex items-center justify-center gap-2">
          <span>Henry (@snowLH)</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            {isHalloween ? (
              <span>🎃 Spooky Cryo Edition</span>
            ) : (
              <>
                <BlueDice size="xs" />
                <span>Cryo Cyber Aesthetic</span>
              </>
            )}
          </span>
          <span>•</span>
          <span className="text-zinc-500">React 19 & Tailwind</span>
        </div>
      </footer>

    </div>
  );
}
