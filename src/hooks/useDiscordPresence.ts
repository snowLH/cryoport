import { useLanyard } from 'use-lanyard';
import type { Types } from 'use-lanyard';

// Discord Snowflake ID do usuário Henry (@snowLH)
// Substitua pelo seu ID numérico do Discord (ex: "708709292850380800")
export const DEFAULT_DISCORD_ID = "708709292850380800";

export interface SpotifyData {
  track_id: string | null;
  song: string;
  artist: string;
  album: string | null;
  album_art_url: string | null;
  timestamps: {
    start: number;
    end: number;
  } | null;
}

export interface DiscordPresenceData {
  username: string;
  globalName: string;
  avatarUrl: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  statusColor: string;
  statusLabel: string;
  listeningToSpotify: boolean;
  spotify: SpotifyData | null;
  isLive: boolean;
}

export function useDiscordPresence(discordId: string = DEFAULT_DISCORD_ID): DiscordPresenceData {
  // Chamada do hook oficial use-lanyard
  const rawPresence = useLanyard(discordId as `${bigint}`);
  const presence = rawPresence as Types.Presence | undefined;

  // Status mapping
  const statusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    idle: 'bg-amber-500',
    dnd: 'bg-rose-500',
    offline: 'bg-zinc-600',
  };

  const statusLabels: Record<string, string> = {
    online: 'Online',
    idle: 'Ausente',
    dnd: 'Não Perturbar',
    offline: 'Offline',
  };

  if (presence && presence.discord_user) {
    const user = presence.discord_user;
    const avatarUrl = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || '0') % 5}.png`;

    const status = presence.discord_status || 'offline';
    const isSpotify = Boolean(presence.listening_to_spotify && presence.spotify);

    return {
      username: user.username || 'snow_lh',
      globalName: user.global_name || 'Henry',
      avatarUrl,
      status,
      statusColor: statusColors[status] || 'bg-zinc-600',
      statusLabel: statusLabels[status] || 'Offline',
      listeningToSpotify: isSpotify,
      spotify: isSpotify && presence.spotify
        ? {
            track_id: presence.spotify.track_id,
            song: presence.spotify.song,
            artist: presence.spotify.artist || 'Artista Desconhecido',
            album: presence.spotify.album,
            album_art_url: presence.spotify.album_art_url,
            timestamps: presence.spotify.timestamps,
          }
        : null,
      isLive: true,
    };
  }

  // Fallback estético quando o Lanyard estiver conectando ou sem presença ativa
  return {
    username: 'snow_lh',
    globalName: 'Henry',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80',
    status: 'online',
    statusColor: 'bg-emerald-500',
    statusLabel: 'Online',
    listeningToSpotify: false,
    spotify: null,
    isLive: false,
  };
}
