import type { Project } from '../../data/content';
import { useBeeper } from '../../hooks/useBeeper';

interface ProjectCartridgeProps {
  project: Project;
}

/**
 * ProjectCartridge — Arcade cartridge card for projects (§4.6).
 * Hover: scale(1.04) + lift, stepped timing ~150ms.
 * Button press: physical sink.
 */
export default function ProjectCartridge({ project }: ProjectCartridgeProps) {
  const { playHover, playSelect } = useBeeper();

  return (
    <article
      onMouseEnter={playHover}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--bezel-border)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 150ms steps(4), box-shadow 150ms steps(4)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseOver={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'scale(1.04) translateY(-4px)';
        el.style.boxShadow = '0 8px 24px rgba(0,163,255,0.15), 0 0 15px var(--blue-glow)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = 'scale(1) translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Cartridge top label strip */}
      <div style={{
        padding: '8px 14px',
        background: 'rgba(0,163,255,0.08)',
        borderBottom: '1px solid var(--bezel-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          color: 'var(--slate)',
          letterSpacing: '0.1em',
        }}>
          CARTRIDGE
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.55rem',
          color: 'var(--magenta)',
          textShadow: '0 0 8px var(--magenta-glow)',
          letterSpacing: '0.08em',
        }}>
          HI-SCORE: {project.scoreLabel}
        </span>
      </div>

      {/* Content body */}
      <div style={{ padding: '16px 14px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          color: 'var(--yellow)',
          textShadow: '0 0 15px var(--yellow-glow)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          {project.title}
        </h3>

        {/* Tagline */}
        <p
          className="font-body text-sm text-slate-300 leading-relaxed"
          style={{
            margin: 0,
          }}
        >
          {project.tagline}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-body text-xs"
              style={{
                padding: '3px 8px',
                color: 'var(--blue)',
                border: '1px solid var(--bezel-border)',
                background: 'rgba(0,163,255,0.05)',
                letterSpacing: '0.05em',
              }}
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="arcade-btn"
            onClick={playSelect}
            style={{ flex: 1, fontSize: '0.6rem', padding: '8px 12px', justifyContent: 'center', textDecoration: 'none' }}
          >
            LAUNCH DEMO
          </a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="arcade-btn arcade-btn--secondary"
            onClick={playSelect}
            style={{ flex: 1, fontSize: '0.6rem', padding: '8px 12px', justifyContent: 'center', textDecoration: 'none' }}
          >
            VIEW SOURCE
          </a>
        </div>
      </div>
    </article>
  );
}
