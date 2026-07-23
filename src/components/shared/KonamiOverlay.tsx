import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

/**
 * KonamiOverlay — Retro modal that appears when the Konami code is entered.
 * Shows "CHEAT CODE ACTIVATED" message with neon cycling border effect.
 * Auto-dismisses after 10 seconds (managed by appStore.activateKonami).
 */
export default function KonamiOverlay() {
  const konamiActive = useAppStore((s) => s.konamiActive);

  return (
    <AnimatePresence>
      {konamiActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            pointerEvents: 'auto',
          }}
          onClick={() => useAppStore.setState({ konamiActive: false })}
        >
          <motion.div
            initial={{ scale: 0.5, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0, 1, 0, 1] }}
            className="konami-modal"
            style={{
              padding: '32px 40px',
              background: 'var(--bezel)',
              border: '3px solid',
              borderImageSlice: 1,
              borderImageSource: 'linear-gradient(135deg, var(--blue), var(--magenta), var(--yellow), var(--blue))',
              boxShadow: '0 0 40px var(--blue-glow), 0 0 80px var(--magenta-glow), 0 0 120px var(--yellow-glow)',
              textAlign: 'center',
              maxWidth: 460,
              animation: 'konami-border-cycle 2s linear infinite',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cheat code icon */}
            <div style={{
              fontSize: '3rem',
              marginBottom: 16,
              animation: 'counter-flicker 0.8s steps(3) infinite',
            }}>
              🎮
            </div>

            {/* Title */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--yellow)',
              textShadow: '0 0 20px var(--yellow-glow), 0 0 40px var(--yellow-glow)',
              letterSpacing: '0.12em',
              marginBottom: 12,
              animation: 'counter-flicker 1.5s steps(4) infinite',
            }}>
              CHEAT CODE ACTIVATED!
            </div>

            {/* Description */}
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--blue)',
              textShadow: '0 0 12px var(--blue-glow)',
              letterSpacing: '0.06em',
              lineHeight: 1.6,
              marginBottom: 8,
            }}>
              ALL SKILLS OVERCLOCKED TO 9999 XP!
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              color: 'var(--magenta)',
              textShadow: '0 0 12px var(--magenta-glow)',
              letterSpacing: '0.1em',
              animation: 'counter-flicker 2s steps(5) infinite',
            }}>
              OVERDRIVE MODE ENABLED
            </div>

            {/* Dismiss hint */}
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              color: 'var(--slate)',
              marginTop: 20,
              opacity: 0.6,
            }}>
              Click anywhere to dismiss
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
