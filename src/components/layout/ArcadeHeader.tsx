import { Gamepad2 } from 'lucide-react';
import { PLAYER, SOCIAL_LINKS } from '../../data/content';
import HighScoreCounter from '../shared/HighScoreCounter';
import ModeToggle from './ModeToggle';
import CRTToggle from './CRTToggle';
import MuteToggle from './MuteToggle';
import { useAppStore } from '../../store/appStore';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * ArcadeHeader — Top bar inside the cabinet bezel (§4.1).
 * Left: PlayerBadge | Center: FakeUrlBar | Right: HiScore + GitHub + Toggles
 * Sticky on mobile.
 */
export default function ArcadeHeader() {
  const debugMode = useAppStore((s) => s.debugMode);
  const { playSelect } = useBeeper();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--bezel-border)',
        background: 'var(--bezel)',
        borderRadius: '14px 14px 0 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      {/* Left — Logo & Header Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Gamepad Joystick Icon inside glowing neon frame */}
        <div className="w-8 h-8 rounded bg-sky-950/80 border border-sky-400/60 flex items-center justify-center text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)] shrink-0">
          <Gamepad2 size={18} />
        </div>
        <div className="min-w-0">
          <div className="font-pixel text-xs md:text-sm text-[#38bdf8] drop-shadow-[0_0_6px_#0284c7] tracking-wider truncate">
            MOHAMED ESSAM
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-[10px] text-gray-400 tracking-wider truncate">
              FRONT-END DEVELOPER // 2026
            </span>
            {debugMode && (
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.45rem',
                color: 'var(--magenta)',
                background: 'rgba(255, 0, 85, 0.1)',
                border: '1px solid var(--magenta)',
                padding: '1px 4px',
                letterSpacing: '0.05em',
                animation: 'counter-flicker 1s steps(2) infinite',
                lineHeight: 1,
              }}>
                DEBUG
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center — Fake URL Bar */}
      <div
        className="fake-url-bar"
        aria-hidden="true"
        style={{
          flex: '0 1 280px',
          padding: '6px 14px',
          background: 'rgba(0,163,255,0.04)',
          border: '1px solid var(--bezel-border)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.65rem',
          color: 'var(--slate)',
          letterSpacing: '0.05em',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: 'var(--blue)', marginRight: 6 }}>🔒</span>
        WWW.DEVELOPER.COM/{PLAYER.name.replace(/\s+/g, '-').toLowerCase()}
      </div>

      {/* Right — HiScore + GitHub + Toggles */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <HighScoreCounter />
        <div style={{ width: 1, height: 24, background: 'var(--bezel-border)' }} />

        {/* GitHub Quick-Action Button */}
        <a
          id="header-github-link"
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playSelect()}
          className="github-header-btn"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            padding: '6px 12px',
            background: 'transparent',
            color: '#00E5FF',
            border: '1px solid #00E5FF',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            boxShadow: '0 0 8px rgba(0, 229, 255, 0.3), inset 0 0 8px rgba(0, 229, 255, 0.1)',
            transition: 'box-shadow 0.15s, background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = '0 0 14px rgba(0, 229, 255, 0.6), 0 0 28px rgba(0, 229, 255, 0.3), inset 0 0 14px rgba(0, 229, 255, 0.15)';
            el.style.background = 'rgba(0, 229, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.boxShadow = '0 0 8px rgba(0, 229, 255, 0.3), inset 0 0 8px rgba(0, 229, 255, 0.1)';
            el.style.background = 'transparent';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> GITHUB
        </a>

        <ModeToggle />
        <CRTToggle />
        <MuteToggle />
      </div>
    </header>
  );
}
