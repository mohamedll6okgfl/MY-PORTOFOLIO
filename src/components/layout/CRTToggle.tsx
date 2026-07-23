import { useAppStore } from '../../store/appStore';

/**
 * CRTToggle — Toggle button for the CRT scanline overlay effect.
 * Styled to match the MuteToggle and ModeToggle arcade header buttons.
 */
export default function CRTToggle() {
  const crtEnabled = useAppStore((s) => s.crtEnabled);
  const toggleCRT = useAppStore((s) => s.toggleCRT);
  const mode = useAppStore((s) => s.mode);

  // Only show in arcade mode
  if (mode !== 'arcade') return null;

  return (
    <button
      className="crt-toggle"
      onClick={toggleCRT}
      aria-label={crtEnabled ? 'Disable CRT effect' : 'Enable CRT effect'}
      title={crtEnabled ? 'CRT: ON' : 'CRT: OFF'}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.55rem',
        padding: '6px 10px',
        background: crtEnabled ? 'rgba(0, 163, 255, 0.1)' : 'transparent',
        color: crtEnabled ? 'var(--blue)' : 'var(--slate)',
        border: `1px solid ${crtEnabled ? 'var(--blue)' : 'var(--bezel-border)'}`,
        letterSpacing: '0.05em',
        transition: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        whiteSpace: 'nowrap',
        textShadow: crtEnabled ? '0 0 8px var(--blue-glow)' : 'none',
        boxShadow: crtEnabled ? '0 0 8px var(--blue-glow)' : 'none',
      }}
    >
      📺 CRT
    </button>
  );
}
