import { PROJECTS } from '../../data/content';
import ProjectCartridge from '../shared/ProjectCartridge';

/**
 * ProjectsSection — "Levels" grid (§4.6).
 * Grid of cartridge cards with empty state.
 */
export default function ProjectsSection() {
  if (PROJECTS.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; SELECT LEVEL_
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {PROJECTS.map((project) => (
          <ProjectCartridge key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

/**
 * On-brand empty state (§4.6) — "INSERT COIN TO CONTINUE"
 * Not a blank grid, but an actual arcade screen.
 */
function EmptyState() {
  return (
    <div className="section-content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 300,
      textAlign: 'center',
      gap: 16,
    }}>
      <div style={{
        fontSize: '3rem',
        animation: 'counter-flicker 1.5s steps(3) infinite',
      }}>
        🪙
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        color: 'var(--yellow)',
        textShadow: '0 0 20px var(--yellow-glow)',
        letterSpacing: '0.15em',
        animation: 'counter-flicker 2s steps(4) infinite',
      }}>
        INSERT COIN TO CONTINUE
      </div>
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        color: 'var(--slate)',
        maxWidth: 300,
      }}>
        Projects are being loaded into the cartridge slot. Check back soon.
      </div>
    </div>
  );
}
