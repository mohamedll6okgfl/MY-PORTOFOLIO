import { create } from 'zustand';

export type Section = 'profile' | 'skills' | 'projects' | 'resume' | 'contact';
export type Mode = 'arcade' | 'reader';

interface AppState {
  section: Section;
  mode: Mode;
  muted: boolean;
  visitedSections: Set<Section>;
  debugMode: boolean;
  setSection: (s: Section) => void;
  toggleMode: () => void;
  toggleMute: () => void;
  markVisited: (s: Section) => void;
  enableDebugMode: () => void;
}

const getStoredMode = (): Mode => {
  try {
    const stored = localStorage.getItem('arcade_mode');
    if (stored === 'reader' || stored === 'arcade') return stored;
  } catch {}
  return 'arcade';
};

const getStoredMuted = (): boolean => {
  try {
    const stored = localStorage.getItem('arcade_muted');
    if (stored !== null) return stored === 'true';
  } catch {}
  return true; // default muted per spec §6
};

export const useAppStore = create<AppState>((set) => ({
  section: 'profile',
  mode: getStoredMode(),
  muted: getStoredMuted(),
  visitedSections: new Set<Section>(['profile']),
  debugMode: false,

  setSection: (s: Section) =>
    set((state) => {
      const visited = new Set(state.visitedSections);
      visited.add(s);
      return { section: s, visitedSections: visited };
    }),

  toggleMode: () =>
    set((state) => {
      const next: Mode = state.mode === 'arcade' ? 'reader' : 'arcade';
      try { localStorage.setItem('arcade_mode', next); } catch {}
      return { mode: next };
    }),

  toggleMute: () =>
    set((state) => {
      const next = !state.muted;
      try { localStorage.setItem('arcade_muted', String(next)); } catch {}
      return { muted: next };
    }),

  markVisited: (s: Section) =>
    set((state) => {
      const visited = new Set(state.visitedSections);
      visited.add(s);
      return { visitedSections: visited };
    }),

  enableDebugMode: () => set({ debugMode: true }),
}));
