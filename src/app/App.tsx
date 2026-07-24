import { useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import CabinetBezel from '../components/layout/CabinetBezel';
import ArcadeHeader from '../components/layout/ArcadeHeader';
import SidebarNav from '../components/layout/SidebarNav';
import ToastLayer from '../components/shared/ToastLayer';
import KonamiOverlay from '../components/shared/KonamiOverlay';
import { useBeeper } from '../hooks/useBeeper';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

// Code-split sections (§10 — performance budget)
const ProfileSection = lazy(() => import('../components/sections/ProfileSection'));
const SkillsSection = lazy(() => import('../components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('../components/sections/ProjectsSection'));
const ResumeSection = lazy(() => import('../components/sections/ResumeSection'));
const ContactSection = lazy(() => import('../components/sections/ContactSection'));

/**
 * Stepped screen-wipe transition (§5):
 * Brightness flash → settle, steps(6), ~350-400ms.
 * Uses a custom cubic-bezier that approximates stepped behavior,
 * plus opacity + filter for the CRT flash effect.
 */
const sectionVariants = {
  initial: {
    opacity: 0,
    filter: 'brightness(2.5)',
  },
  animate: {
    opacity: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.38,
      ease: [0, 1, 0, 1] as [number, number, number, number],
      opacity: { duration: 0.38, ease: 'easeOut' as const },
      filter: { duration: 0.38, ease: 'easeOut' as const },
    },
  },
  exit: {
    opacity: 0,
    filter: 'brightness(0.3)',
    transition: {
      duration: 0.15,
      ease: [0, 1, 0, 1] as [number, number, number, number],
    },
  },
};

/** Loading fallback styled as arcade screen */
function SectionLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 200,
      fontFamily: 'var(--font-display)',
      fontSize: '0.7rem',
      color: 'var(--blue)',
      letterSpacing: '0.15em',
      animation: 'counter-flicker 1s steps(3) infinite',
    }}>
      LOADING...
    </div>
  );
}

export default function App() {
  const section = useAppStore((s) => s.section);
  const mode = useAppStore((s) => s.mode);
  const markVisited = useAppStore((s) => s.markVisited);

  // Enable global keyboard arrow / W/S and wheel navigation between sections
  useKeyboardNavigation();

  // Sync data-mode attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode);
  }, [mode]);

  // Mark section as visited for achievement tracking
  useEffect(() => {
    markVisited(section);
  }, [section, markVisited]);

  const activateKonami = useAppStore((s) => s.activateKonami);
  const { playLevelUp } = useBeeper();

  // Konami code easter egg (§7.8)
  useEffect(() => {
    const code = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA',
    ];
    let pos = 0;

    const handler = (e: KeyboardEvent) => {
      const currentExpected = code[pos];
      const matchesCode = e.code === currentExpected;
      const matchesKey =
        (pos === 8 && (e.key === 'b' || e.key === 'B')) ||
        (pos === 9 && (e.key === 'a' || e.key === 'A'));

      if (matchesCode || matchesKey) {
        pos++;
        if (pos === code.length) {
          pos = 0;
          activateKonami();
          playLevelUp();
          // 10s border neon cycle effect
          document.body.classList.add('konami-overdrive');
          setTimeout(() => {
            document.body.classList.remove('konami-overdrive');
          }, 10000);
        }
      } else {
        pos = 0;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activateKonami, playLevelUp]);

  const renderSection = () => {
    switch (section) {
      case 'profile': return <ProfileSection />;
      case 'skills': return <SkillsSection />;
      case 'projects': return <ProjectsSection />;
      case 'resume': return <ResumeSection />;
      case 'contact': return <ContactSection />;
      default: return <ProfileSection />;
    }
  };

  return (
    <>
      <CabinetBezel>
        <ArcadeHeader />

        {/* Main Grid — Sidebar + Console Screen */}
        <div
          className="main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Sidebar */}
          <aside style={{
            borderRight: '1px solid var(--bezel-border)',
            background: 'rgba(0,163,255,0.02)',
            overflowY: 'auto',
          }}>
            <SidebarNav />
          </aside>

          {/* Console Screen — Section host */}
          <main
            className="console-screen"
            style={{
              padding: '24px 28px',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Suspense fallback={<SectionLoader />}>
                  {renderSection()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </CabinetBezel>

      <KonamiOverlay />
      <ToastLayer />
    </>
  );
}
