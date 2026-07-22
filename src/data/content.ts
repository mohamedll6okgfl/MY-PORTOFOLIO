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

export type Stat = {
  label: string;
  value: number; // 0–100
};

export type Skill = {
  name: string;
  level: number; // 0–100
  category: string;
};

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

// ── Core Attribute Bars (Profile Section) ──
export const STATS: Stat[] = [
  { label: 'HTML / CSS', value: 92 },
  { label: 'JAVASCRIPT', value: 85 },
  { label: 'REACT', value: 80 },
  { label: 'TYPESCRIPT', value: 72 },
  { label: 'UI / UX DESIGN', value: 78 },
];

// ── Skills Inventory (Power-Ups Section) ──
export const SKILLS: Skill[] = [
  // Frontend
  { name: 'HTML5 & CSS3', level: 92, category: 'FRONTEND' },
  { name: 'JavaScript (ES6+)', level: 85, category: 'FRONTEND' },
  { name: 'React', level: 80, category: 'FRONTEND' },
  { name: 'TypeScript', level: 72, category: 'FRONTEND' },
  { name: 'Tailwind CSS', level: 85, category: 'FRONTEND' },
  { name: 'Framer Motion', level: 70, category: 'FRONTEND' },
  // Tools
  { name: 'Git & GitHub', level: 82, category: 'TOOLS' },
  { name: 'Vite / Webpack', level: 75, category: 'TOOLS' },
  { name: 'Figma', level: 78, category: 'TOOLS' },
  { name: 'VS Code', level: 90, category: 'TOOLS' },
  // Craft
  { name: 'Responsive Design', level: 90, category: 'CRAFT' },
  { name: 'CSS Animations', level: 85, category: 'CRAFT' },
  { name: 'Performance Tuning', level: 72, category: 'CRAFT' },
  { name: 'Accessibility (a11y)', level: 75, category: 'CRAFT' },
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
