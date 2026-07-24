import { useAppStore } from '../../store/appStore';

/**
 * CRTOverlay — Full-screen subtle CRT scanline overlay.
 * Ultra-low opacity so content remains 100% crisp and readable.
 */
export default function CRTOverlay() {
  const crtEnabled = useAppStore((s) => s.crtEnabled);
  const mode = useAppStore((s) => s.mode);

  if (!crtEnabled || mode !== 'arcade') return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0.03,
        background: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.2) 2px,
          rgba(0, 0, 0, 0.2) 4px
        )`,
      }}
    />
  );
}
