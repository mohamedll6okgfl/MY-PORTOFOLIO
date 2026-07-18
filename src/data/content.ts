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
    title: 'ARCADE PORTFOLIO',
    tagline: 'This very site — retro cabinet UI built with React & Framer Motion',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '100 VIBE',
  },
  {
    title: 'CREATIVE LANDING',
    tagline: 'Animated marketing landing page with scroll-driven effects',
    tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '★ FEATURED',
  },
  {
    title: 'FOOD LOVER',
    tagline: 'Restaurant discovery app with filtering and map integration',
    tech: ['React', 'CSS Modules', 'REST API'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '4.8 RATING',
  },
  {
    title: 'FLOWBOARD',
    tagline: 'Kanban task manager with drag-and-drop and local persistence',
    tech: ['React', 'TypeScript', 'Zustand'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '★ 120',
  },
  {
    title: 'TYPING GAME',
    tagline: 'Real-time WPM typing speed trainer with dynamic word sets',
    tech: ['JavaScript', 'HTML', 'CSS', 'Web Audio'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '142 WPM',
  },
  {
    title: 'CSS GALLERY',
    tagline: 'Showcase of advanced pure-CSS animations and visual experiments',
    tech: ['HTML', 'CSS', 'CSS Animations'],
    demoUrl: '#',
    sourceUrl: '#',
    scoreLabel: '★ PURE CSS',
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
