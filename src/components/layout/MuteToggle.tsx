import { useAppStore } from '../../store/appStore';

/**
 * MuteToggle — Audio mute/unmute button (§6).
 * Always visible in header with clear icon state.
 */
export default function MuteToggle() {
  const muted = useAppStore((s) => s.muted);
  const toggleMute = useAppStore((s) => s.toggleMute);

  return (
    <button
      className="mute-toggle"
      onClick={toggleMute}
      aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
      title={muted ? 'Unmute' : 'Mute'}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        padding: '6px 10px',
        background: 'transparent',
        color: muted ? 'var(--slate)' : 'var(--yellow)',
        border: `1px solid ${muted ? 'var(--bezel-border)' : 'var(--yellow)'}`,
        letterSpacing: '0.05em',
        transition: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        textShadow: muted ? 'none' : '0 0 10px var(--yellow-glow)',
      }}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
