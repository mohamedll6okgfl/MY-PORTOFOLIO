import { PLAYER } from '../../data/content';
import HighScoreCounter from '../shared/HighScoreCounter';
import ModeToggle from './ModeToggle';
import MuteToggle from './MuteToggle';
import { useAppStore } from '../../store/appStore';

/**
 * ArcadeHeader — Top bar inside the cabinet bezel (§4.1).
 * Left: PlayerBadge | Center: FakeUrlBar | Right: HiScore + Toggles
 * Sticky on mobile.
 */
export default function ArcadeHeader() {
  const debugMode = useAppStore((s) => s.debugMode);

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
      {/* Left — Player Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 0,
      }}>
        {/* Pixel avatar glyph */}
        <div style={{
          width: 32,
          height: 32,
          background: 'var(--blue)',
          border: '2px solid var(--yellow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          flexShrink: 0,
        }}>
          👾
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            color: 'var(--slate)',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            ARCADE NAVIGATOR
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              color: 'var(--yellow)',
              textShadow: '0 0 10px var(--yellow-glow)',
              letterSpacing: '0.08em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {PLAYER.name} EDITION
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

      {/* Right — HiScore + Toggles */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        <HighScoreCounter />
        <div style={{ width: 1, height: 24, background: 'var(--bezel-border)' }} />
        <ModeToggle />
        <MuteToggle />
      </div>
    </header>
  );
}
