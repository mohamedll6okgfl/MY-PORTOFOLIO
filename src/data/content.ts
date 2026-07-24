/* ═══════════════════════════════════════════════════════════
   Content Data — Mohamed Essam's real portfolio data.
   ═══════════════════════════════════════════════════════════ */

export type Player = {
  name: string;
  role: string;
  location: string;
  xp: string;
  highScore: number;
};

export interface Skill {
  name: string;
  rank: 'MASTER' | 'EXPERT' | 'NOVICE';
  category: 'FRONTEND' | 'TOOLS' | 'CRAFT';
  iconName: string;
  isUnlocked: boolean;
}

export type Project = {
  title: string;
  tagline: string;
  tech: string[];
  demoUrl: string;
  sourceUrl: string;
  scoreLabel: string;
};

// ── Player Profile ──
export const PLAYER: Player = {
  name: 'MOHAMED ESSAM',
  role: 'FRONT-END DEVELOPER',
  location: 'CAIRO, EGYPT',
  xp: '1 YEAR',
  highScore: 128500,
};

// ── Core Attribute Skill Items (Profile Section) ──
export const STATS: Skill[] = [
  { name: 'HTML / CSS', rank: 'MASTER', category: 'FRONTEND', iconName: 'Code2', isUnlocked: true },
  { name: 'JAVASCRIPT', rank: 'MASTER', category: 'FRONTEND', iconName: 'FileCode2', isUnlocked: true },
  { name: 'REACT', rank: 'EXPERT', category: 'FRONTEND', iconName: 'Atom', isUnlocked: true },
  { name: 'TYPESCRIPT', rank: 'EXPERT', category: 'FRONTEND', iconName: 'FileJson', isUnlocked: true },
  { name: 'UI / UX DESIGN', rank: 'EXPERT', category: 'CRAFT', iconName: 'Palette', isUnlocked: true },
];

// ── Skills Inventory (Power-Ups Section) ──
export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5 & CSS3', rank: 'MASTER', category: 'FRONTEND', iconName: 'Code2', isUnlocked: true },
  { name: 'JavaScript (ES6+)', rank: 'MASTER', category: 'FRONTEND', iconName: 'FileCode2', isUnlocked: true },
  { name: 'React', rank: 'EXPERT', category: 'FRONTEND', iconName: 'Atom', isUnlocked: true },
  { name: 'TypeScript', rank: 'EXPERT', category: 'FRONTEND', iconName: 'FileJson', isUnlocked: true },
  { name: 'Tailwind CSS', rank: 'MASTER', category: 'FRONTEND', iconName: 'Palette', isUnlocked: true },
  { name: 'Framer Motion', rank: 'EXPERT', category: 'FRONTEND', iconName: 'Sparkles', isUnlocked: true },
  // Tools
  { name: 'Git & GitHub', rank: 'EXPERT', category: 'TOOLS', iconName: 'GitBranch', isUnlocked: true },
  { name: 'Vite / Webpack', rank: 'EXPERT', category: 'TOOLS', iconName: 'Zap', isUnlocked: true },
  { name: 'Figma', rank: 'EXPERT', category: 'TOOLS', iconName: 'Layout', isUnlocked: true },
  { name: 'VS Code', rank: 'MASTER', category: 'TOOLS', iconName: 'Terminal', isUnlocked: true },
  // Craft
  { name: 'Responsive Design', rank: 'MASTER', category: 'CRAFT', iconName: 'Layout', isUnlocked: true },
  { name: 'CSS Animations', rank: 'MASTER', category: 'CRAFT', iconName: 'Sparkles', isUnlocked: true },
  { name: 'Performance Tuning', rank: 'EXPERT', category: 'CRAFT', iconName: 'Gauge', isUnlocked: true },
  { name: 'Accessibility (a11y)', rank: 'EXPERT', category: 'CRAFT', iconName: 'ShieldCheck', isUnlocked: true },
];

// ── Project Cartridges (Levels Section) ──
export const PROJECTS: Project[] = [
  {
    title: 'TYPING TEST GAME',
    tagline: 'Real-time WPM typing speed trainer featuring dynamic word sets, accuracy metrics, and instant feedback.',
    tech: ['JAVASCRIPT', 'HTML5', 'CSS3', 'WEB AUDIO'],
    demoUrl: 'https://typing-game-test.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/typing-game-test',
    scoreLabel: '142 WPM',
  },
  {
    title: 'URBAN THREADS',
    tagline: 'Modern e-commerce clothing storefront with interactive product filtering, cart management, and slick UI.',
    tech: ['REACT', 'TAILWIND CSS', 'JAVASCRIPT', 'REST API'],
    demoUrl: 'https://clothing-store-green-nu.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/clothing-store',
    scoreLabel: '★ FEATURED',
  },
  {
    title: 'UNI PLANNER',
    tagline: 'Academic task management & study scheduler designed to track university workflows and daily progress.',
    tech: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'ZUSTAND'],
    demoUrl: 'https://uni-study-p.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/uni-study-p',
    scoreLabel: '100% PRODUCTIVE',
  },
  {
    title: 'FLOWBOARD',
    tagline: 'Interactive Kanban task manager supporting drag-and-drop board organization and local persistence.',
    tech: ['REACT', 'TYPESCRIPT', 'TAILWIND CSS', 'ZUSTAND'],
    demoUrl: 'https://flowboard-ashen.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/flowboard',
    scoreLabel: '★ TOP CHOICE',
  },
  {
    title: 'DEV BASIC PORTFOLIO',
    tagline: 'Clean React personal portfolio template showcasing modular component architecture and fluid layouts.',
    tech: ['REACT', 'JAVASCRIPT', 'CSS MODULES'],
    demoUrl: 'https://my-react-app-4tiu.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/my-react-app',
    scoreLabel: 'PURE REACT',
  },
  {
    title: 'LEON TEMPLATE 1',
    tagline: 'Pixel-perfect, high-performance landing page layout crafted with modern semantic HTML and responsive CSS.',
    tech: ['HTML5', 'CSS3', 'FLEXBOX', 'RESPONSIVE'],
    demoUrl: 'https://template-1-leon.vercel.app/',
    sourceUrl: 'https://github.com/mohamedll6okgfl/template-1-leon',
    scoreLabel: '100 LCP',
  },
];

// ── Nav Items Config ──
export const NAV_ITEMS = [
  { id: 'profile' as const, label: 'PROFILE', icon: '👤' },
  { id: 'skills' as const, label: 'POWER-UPS', icon: '⚡' },
  { id: 'projects' as const, label: 'LEVELS', icon: '🎮' },
  { id: 'resume' as const, label: 'REWARD.PDF', icon: '📄' },
  { id: 'contact' as const, label: 'MULTIPLAYER', icon: '🌐' },
] as const;

// ── Social Links (Single Source of Truth) ──
export const SOCIAL_LINKS = {
  github: 'https://github.com/mohamedll6okgfl',
  linkedin: 'https://www.linkedin.com/in/mohamed-essam-abdelhaliem-ba4b14356',
};
