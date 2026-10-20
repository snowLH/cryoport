import { useState, useEffect } from 'react';
import { ExternalLink, Music } from 'lucide-react';
import type { DiscordPresenceData } from '../hooks/useDiscordPresence';

interface SpotifyWidgetProps {
  presence: DiscordPresenceData;
}

const SpotifyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.79-1.963-.334-.02-.59-.307-.57-.64.02-.334.306-.59.64-.57 3.81.222 7.085.586 9.72 2.195.294.18.386.563.207.857zm1.226-2.725c-.226.368-.71.485-1.077.26-2.69-1.653-6.79-2.13-9.972-2.167-.413-.005-.744-.344-.739-.757.005-.413.344-.744.757-.739 3.633.042 8.163.57 11.23 2.457.368.226.486.71.261 1.078zm.13-2.848C14.72 8.94 8.764 8.74 5.312 9.787c-.492.15-1.013-.13-1.163-.623-.15-.492.13-1.013.623-1.163 3.993-1.212 10.59-.982 14.73 1.478.442.262.587.834.324 1.276-.262.442-.834.587-1.276.324z" />
  </svg>
);

export function SpotifyWidget({ presence }: SpotifyWidgetProps) {
  const [progress, setProgress] = useState<number>(0);
  const [currentSeconds, setCurrentSeconds] = useState<string>('0:00');
  const [totalSeconds, setTotalSeconds] = useState<string>('0:00');

  const isListening = presence.listeningToSpotify && presence.spotify;
  const spotify = presence.spotify;

  // Format millisecond to mm:ss
  const formatTime = (ms: number) => {
    if (isNaN(ms) || ms < 0) return '0:00';
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  useEffect(() => {
    if (!isListening || !spotify || !spotify.timestamps) return;

    const updateProgress = () => {
      const now = Date.now();
      const start = spotify.timestamps?.start || now;
      const end = spotify.timestamps?.end || now;
      const totalDuration = end - start;
      const elapsed = Math.max(0, now - start);

      if (totalDuration > 0) {
        const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgress(pct);
        setCurrentSeconds(formatTime(elapsed));
        setTotalSeconds(formatTime(totalDuration));
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [isListening, spotify]);

  // If listening to Spotify live on Discord
  if (isListening && spotify) {
    return (
      <div className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-5 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/20 group">
        {/* Subtle top emerald line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />

        {/* Header: Title + Equalizer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-medium tracking-wider text-emerald-400 uppercase">
              Ouvindo agora no Spotify
            </span>
          </div>

          {/* Equalizer animation */}
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[2px] bg-emerald-400 rounded-full animate-bounce" style={{ height: '10px', animationDuration: '0.8s' }} />
            <span className="w-[2px] bg-emerald-400 rounded-full animate-bounce" style={{ height: '14px', animationDuration: '1.2s' }} />
            <span className="w-[2px] bg-emerald-400 rounded-full animate-bounce" style={{ height: '7px', animationDuration: '0.6s' }} />
            <span className="w-[2px] bg-emerald-400 rounded-full animate-bounce" style={{ height: '12px', animationDuration: '1s' }} />
          </div>
        </div>

        {/* Song info & Cover */}
        <div className="flex items-center gap-3.5 my-1">
          {spotify.album_art_url ? (
            <img
              src={spotify.album_art_url}
              alt={spotify.album || spotify.song}
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shadow-md group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <SpotifyIcon className="w-6 h-6" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
              {spotify.song}
            </h2>
            <p className="text-xs text-zinc-400 truncate">
              {spotify.artist}
            </p>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div>
          <div className="w-full bg-zinc-800/80 h-1 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
            <span>{currentSeconds}</span>
            <span>{totalSeconds}</span>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Fixed Featured Playlist "CENA 0"
  return (
    <a
      href="https://open.spotify.com/user/31pcajmiw7qy7hkm4jhc26gb3mgi"
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-white/5 p-5 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/30 group"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SpotifyIcon className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono font-medium tracking-wider text-zinc-400 uppercase">
            Playlist Favorita
          </span>
        </div>

        <span className="text-xs font-mono text-emerald-400/80 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          <span>Ouvir</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Playlist info */}
      <div className="flex items-center gap-3.5 my-1">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-emerald-950 border border-white/10 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform">
          <Music className="w-6 h-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            CENA 0
          </h2>
          <p className="text-xs text-zinc-400">
            Teto, Matuê & Mais • Playlist Principal
          </p>
        </div>
      </div>

      {/* Footer link line */}
      <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
        <span>spotify.com/snowLH</span>
        <span className="text-emerald-400/70">Tocar no Spotify ↗</span>
      </div>
    </a>
  );
}
