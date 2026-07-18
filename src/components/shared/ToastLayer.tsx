import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

/**
 * ToastLayer — Achievement notification system (§7.7).
 * Fires "ACHIEVEMENT UNLOCKED: EXPLORED ALL LEVELS" when all 5 sections visited.
 * Shows only once, persisted via localStorage.
 */
export default function ToastLayer() {
  const [visible, setVisible] = useState(false);
  const visitedSections = useAppStore((s) => s.visitedSections);

  useEffect(() => {
    // Check if all 5 sections have been visited
    const allSections = ['profile', 'skills', 'projects', 'resume', 'contact'];
    const allVisited = allSections.every((s) => visitedSections.has(s as any));

    if (!allVisited) return;

    // Check if already shown
    try {
      if (localStorage.getItem('arcade_achievement_shown') === 'true') return;
    } catch {}

    // Show toast after a small delay
    const timer = setTimeout(() => {
      setVisible(true);
      try { localStorage.setItem('arcade_achievement_shown', 'true'); } catch {}

      // Auto-dismiss after 5 seconds
      setTimeout(() => setVisible(false), 5000);
    }, 600);

    return () => clearTimeout(timer);
  }, [visitedSections]);

  return (
    <div
      className="toast-layer"
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 10000,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0, 1, 0, 1] }}
            style={{
              padding: '14px 20px',
              background: 'var(--bezel)',
              border: '2px solid var(--yellow)',
              boxShadow: '0 0 20px var(--yellow-glow), 4px 4px 0 var(--blue)',
              pointerEvents: 'auto',
              maxWidth: 340,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              color: 'var(--magenta)',
              letterSpacing: '0.15em',
              marginBottom: 4,
            }}>
              🏆 ACHIEVEMENT UNLOCKED
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              color: 'var(--yellow)',
              textShadow: '0 0 10px var(--yellow-glow)',
              letterSpacing: '0.08em',
            }}>
              EXPLORED ALL LEVELS
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              color: 'var(--slate)',
              marginTop: 6,
            }}>
              You've visited every section. Respect.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
