export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  version?: string;
  badge: string;
  statusLabel?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  accent: 'cyan' | 'indigo' | 'purple' | 'emerald' | 'amber';
}

/**
 * Centralized Projects Registry.
 * Para adicionar um novo projeto ao seu portfólio no futuro,
 * basta adicionar um novo objeto nesta lista!
 */
export const projectsData: ProjectItem[] = [
  {
    id: 'cryohive',
    title: 'CryoHive',
    version: 'Live PWA',
    badge: 'Ecossistema & Segundo Cérebro',
    statusLabel: 'Online',
    description: 'Seu segundo cérebro inteligente: organize notas com IA, explore conexões em mapa 3D e atinja hiperfoco com sons árticos no desktop e celular.',
    tags: ['React 19', 'Supabase', 'Three.js 3D', 'Gemini AI', 'Web Audio'],
    liveUrl: 'https://cryo-hive-cryohive-web.vercel.app',
    githubUrl: 'https://github.com/snowLH',
    featured: true,
    accent: 'cyan',
  },
  {
    id: 'helena',
    title: 'H.E.L.E.N.A.',
    subtitle: 'Heurística de Execução Local e Estruturação Neural Autônoma',
    version: 'Live PWA',
    badge: 'IA & HUD Futurista J.A.R.V.I.S.',
    statusLabel: 'Online / PWA',
    description: 'Assistente de IA estilo J.A.R.V.I.S. com síntese de voz neural holográfica, HUD futurista responsivo, telemetria em tempo real e automação autônoma.',
    tags: ['React 19', 'Neural TTS', 'Web Audio DSP', 'Python', 'PWA'],
    liveUrl: 'https://helena-7j4260dti-snow-lh-s-projects.vercel.app',
    githubUrl: 'https://github.com/snowLH/helena-hud',
    featured: true,
    accent: 'indigo',
  },
];
