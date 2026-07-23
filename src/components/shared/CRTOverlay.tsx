import { useAppStore } from '../../store/appStore';

/**
 * CRTOverlay — Full-screen CRT scanline effect overlay.
 * Rendered when crtEnabled is true and mode is 'arcade'.
 * pointer-events: none so it doesn't block interaction.
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
        background: `repeating-linear-gradient(
          to bottom,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, 0.12) 2px,
          rgba(0, 0, 0, 0.12) 4px
        )`,
        mixBlendMode: 'multiply',
        animation: 'crt-subtle-flicker 4s ease-in-out infinite',
      }}
    />
  );
}
