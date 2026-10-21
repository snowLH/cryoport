import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, Snowflake } from 'lucide-react';
import { SnowParticles } from './components/SnowParticles';
import { BlueDice } from './components/BlueDice';
import { ProfileWidget } from './components/ProfileWidget';
import { CryoHiveWidget } from './components/CryoHiveWidget';
import { SecondProjectWidget } from './components/SecondProjectWidget';
import { EmailWidget } from './components/EmailWidget';
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

  // Real-time Discord presence via Lanyard API
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

  // Item variants: sliding from bottom
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
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/20 selection:text-cyan-200 font-sans antialiased flex flex-col justify-between overflow-x-hidden">
      
      {/* =========================================================================
          BACKGROUND: INTERACTIVE SNOW & CYBER DICE PARTICLES CANVAS
          ========================================================================= */}
      <SnowParticles />

      {/* Aurora Ambient Radial Lights */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-all duration-700">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-blue-500/5 blur-[140px]" />
      </div>

      {/* Floating Copy Notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/10 text-cyan-200 backdrop-blur-md shadow-xl text-xs font-mono"
          >
            <Check className="w-3.5 h-3.5 text-cyan-400" />
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
            <BlueDice size="xs" />
            <span className="tracking-wider uppercase text-zinc-400 font-semibold">
              CRYO // PORTFOLIO
            </span>
            <Snowflake className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className={`w-1.5 h-1.5 rounded-full ${presence.isLive ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
            <span>Lanyard: {presence.isLive ? 'Live' : 'Standby'}</span>
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
            <ProfileWidget presence={presence} />
          </motion.div>

          {/* Row 1: 2. CRYOHIVE WIDGET (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <CryoHiveWidget />
          </motion.div>

          {/* Row 2: 3. H.E.L.E.N.A. AI PROJECT (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <SecondProjectWidget />
          </motion.div>

          {/* Row 3: 4. GITHUB MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title="GitHub"
              handle="@snowLH"
              href="https://github.com/snowLH"
              icon={<GithubLogo className="w-7 h-7" />}
              hoverBorder="hover:border-white/20"
            />
          </motion.div>

          {/* Row 3: 5. DISCORD MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title="Discord"
              handle={`@${presence.username}`}
              href="#"
              isAction={true}
              onActionClick={() => handleCopy(presence.username, 'Discord Tag')}
              icon={<DiscordLogo className="w-7 h-7" />}
              accentColor="text-indigo-400 group-hover:text-indigo-300"
              hoverBorder="hover:border-indigo-500/20"
            />
          </motion.div>

          {/* Row 3: 6. INSTAGRAM MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title="Instagram"
              handle="@henry_bestsw"
              href="https://www.instagram.com/henry_bestsw/"
              icon={<InstagramLogo className="w-7 h-7" />}
              accentColor="text-pink-400 group-hover:text-pink-300"
              hoverBorder="hover:border-pink-500/20"
            />
          </motion.div>

          {/* Row 3: 7. ROBLOX MINI WIDGET (1 coluna, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 md:row-span-1">
            <SocialWidget
              title="Roblox"
              handle="Henry"
              href="https://www.roblox.com/users/148506481/profile"
              icon={<RobloxLogo className="w-7 h-7" />}
              accentColor="text-red-400 group-hover:text-red-300"
              hoverBorder="hover:border-red-500/20"
            />
          </motion.div>

          {/* Row 4: 8. E-MAIL DIRECT CONTACT (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <EmailWidget
              email="henrysoldan@gmail.com"
              onCopy={handleCopy}
            />
          </motion.div>

          {/* Row 4: 9. STATUS & LIVE CLOCK (2 colunas, 1 linha) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 md:row-span-1">
            <StatusClockWidget />
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
            <BlueDice size="xs" />
            <span>Cryo Cyber Aesthetic</span>
          </span>
          <span>•</span>
          <span className="text-zinc-500">React 19 & Tailwind</span>
        </div>
      </footer>

    </div>
  );
}
