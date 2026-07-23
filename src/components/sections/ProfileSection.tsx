import { PLAYER, STATS } from '../../data/content';
import StatBar from '../shared/StatBar';

/**
 * ProfileSection — "Character Select" screen (§4.4).
 * Portrait box + key/value stat rows + attribute bars.
 */
export default function ProfileSection() {
  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; SELECT YOUR CHARACTER_
      </h2>

      <div className="profile-container" style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 24,
        alignItems: 'start',
      }}>
        {/* Portrait Box */}
        <div style={{
          width: 140,
          height: 170,
          border: '2px solid var(--blue)',
          boxShadow: '0 0 15px var(--blue-glow), inset 0 0 15px var(--blue-glow)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,163,255,0.03)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Pixel art avatar */}
          <div style={{
            fontSize: '3.5rem',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            👾
          </div>
          {/* Player class label */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.5rem',
            color: 'var(--magenta)',
            textShadow: '0 0 8px var(--magenta-glow)',
            letterSpacing: '0.1em',
            textAlign: 'center',
            padding: '0 8px',
          }}>
            {PLAYER.role}
          </div>
          {/* Corner brackets */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: 4, left: 4,
            width: 12, height: 12,
            borderTop: '2px solid var(--yellow)',
            borderLeft: '2px solid var(--yellow)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', top: 4, right: 4,
            width: 12, height: 12,
            borderTop: '2px solid var(--yellow)',
            borderRight: '2px solid var(--yellow)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 4, left: 4,
            width: 12, height: 12,
            borderBottom: '2px solid var(--yellow)',
            borderLeft: '2px solid var(--yellow)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 4, right: 4,
            width: 12, height: 12,
            borderBottom: '2px solid var(--yellow)',
            borderRight: '2px solid var(--yellow)',
          }} />
        </div>

        {/* Stats Panel */}
        <div>
          {/* Key/value stat rows */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '6px 16px',
            marginBottom: 24,
            alignItems: 'baseline',
          }}>
            {[
              { key: 'NAME', val: PLAYER.name },
              { key: 'CLASS', val: PLAYER.role },
              { key: 'BASE', val: PLAYER.location },
              { key: 'XP', val: PLAYER.xp },
            ].map(({ key, val }) => (
              <KeyValueRow key={key} label={key} value={val} />
            ))}
          </div>

          <div className="pixel-divider" style={{ marginBottom: 20 }} />

          {/* Attribute Bars */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.6rem',
            color: 'var(--slate)',
            letterSpacing: '0.1em',
            marginBottom: 12,
          }}>
            CORE ATTRIBUTES
          </div>
          {STATS.map((stat, i) => (
            <StatBar
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span className="font-body text-xs font-semibold text-[var(--blue)] tracking-wider">
        {label}
      </span>
      <span className="font-body text-sm text-gray-200 leading-relaxed">
        {value}
      </span>
    </>
  );
}
