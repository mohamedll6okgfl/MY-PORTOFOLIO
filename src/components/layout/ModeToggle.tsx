import { useAppStore } from '../../store/appStore';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * ModeToggle — Arcade ⇄ Reader mode switch (§4.2).
 * Instant palette swap, no crossfade.
 * Sets data-mode attribute on <html> for CSS cascade.
 */
export default function ModeToggle() {
  const mode = useAppStore((s) => s.mode);
  const toggleMode = useAppStore((s) => s.toggleMode);
  const { playSelect } = useBeeper();

  const handleToggle = () => {
    playSelect();
    toggleMode();
    // Set data-mode on <html> for CSS cascade
    document.documentElement.setAttribute('data-mode', mode === 'arcade' ? 'reader' : 'arcade');
  };

  return (
    <button
      className="mode-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${mode === 'arcade' ? 'reader' : 'arcade'} mode`}
      title={`Switch to ${mode === 'arcade' ? 'Reader' : 'Arcade'} mode`}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.6rem',
        padding: '6px 12px',
        background: mode === 'arcade' ? 'transparent' : 'var(--white)',
        color: mode === 'arcade' ? 'var(--blue)' : 'var(--bg)',
        border: `1px solid ${mode === 'arcade' ? 'var(--blue)' : 'var(--bezel-border)'}`,
        letterSpacing: '0.05em',
        transition: 'none', // instant swap per spec
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
      }}
    >
      {mode === 'arcade' ? '📖' : '🕹️'}
      <span>{mode === 'arcade' ? 'READER' : 'ARCADE'}</span>
    </button>
  );
}
