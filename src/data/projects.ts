export interface ProjectItem {
  id: string;
  title: string;
  version?: string;
  badge: string;
  spookyBadge?: string;
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
    spookyBadge: '🎃 Ecossistema & Segundo Cérebro',
    statusLabel: 'Online',
    description: 'Seu segundo cérebro inteligente: organize notas com IA, explore conexões em mapa 3D e atinja hiperfoco com sons árticos no desktop e celular.',
    tags: ['React 19', 'Supabase', 'Three.js 3D', 'Gemini AI', 'Web Audio'],
    liveUrl: 'https://cryo-hive-cryohive-web.vercel.app',
    githubUrl: 'https://github.com/snowLH',
    featured: true,
    accent: 'cyan',
  },
  {
    id: 'cryo-ai',
    title: 'Cryo AI // Core Intelligence',
    version: 'v0.1-alpha',
    badge: 'IA Proprietária em Desenvolvimento',
    spookyBadge: '🎃 IA em Desenvolvimento',
    statusLabel: 'Em Breve',
    description: 'Inteligência artificial proprietária focada em automação autônoma, contexto contínuo, agentes neurais e processamento multimodal de alta velocidade.',
    tags: ['Python', 'LLM & Neural Core', 'TypeScript', 'Em Desenvolvimento', 'Em Breve'],
    githubUrl: 'https://github.com/snowLH',
    featured: true,
    accent: 'indigo',
  },
];
