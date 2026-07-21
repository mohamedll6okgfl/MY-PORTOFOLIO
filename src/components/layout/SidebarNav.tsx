import { useAppStore, type Section } from '../../store/appStore';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../data/content';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * SidebarNav — Game-select menu with 5 items (§4.3).
 * Active item gets filled highlight + "▶" cursor glyph.
 * Collapses to horizontal scrolling strip on mobile.
 * Includes persistent SOCIAL LINKS footer.
 */
export default function SidebarNav() {
  const section = useAppStore((s) => s.section);
  const setSection = useAppStore((s) => s.setSection);
  const { playHover, playSelect } = useBeeper();

  const socialLinks = [
    { label: 'GITHUB', url: SOCIAL_LINKS.github, id: 'sidebar-github-link' },
    { label: 'LINKEDIN', url: SOCIAL_LINKS.linkedin, id: 'sidebar-linkedin-link' },
  ];

  return (
    <nav
      className="sidebar-nav"
      aria-label="Portfolio sections"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '8px 0',
        height: '100%',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = section === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              playSelect();
              setSection(item.id as Section);
            }}
            onMouseEnter={playHover}
            onFocus={playHover}
            aria-current={isActive ? 'page' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 16px',
              background: isActive
                ? 'rgba(0, 163, 255, 0.12)'
                : 'transparent',
              border: 'none',
              borderLeft: isActive
                ? '3px solid var(--blue)'
                : '3px solid transparent',
              borderRight: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              color: isActive ? 'var(--yellow)' : 'var(--slate)',
              letterSpacing: '0.1em',
              textAlign: 'left',
              transition: 'background 0.08s, color 0.08s',
              width: '100%',
              textShadow: isActive ? '0 0 10px var(--yellow-glow)' : 'none',
              position: 'relative',
            }}
          >
            {/* Active cursor glyph — §4.3 */}
            <span
              style={{
                width: 14,
                fontSize: '0.6rem',
                color: isActive ? 'var(--yellow)' : 'transparent',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              ▶
            </span>

            {/* Icon */}
            <span style={{ fontSize: '0.85rem', flexShrink: 0 }} aria-hidden="true">
              {item.icon}
            </span>

            {/* Label */}
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* ── SOCIAL LINKS Footer ── */}
      <div
        className="sidebar-social-links"
        style={{
          marginTop: 'auto',
          padding: '12px 16px',
          borderTop: '1px solid var(--bezel-border)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.5rem',
            color: 'var(--slate)',
            letterSpacing: '0.15em',
            marginBottom: 8,
            opacity: 0.6,
          }}
        >
          SOCIAL LINKS
        </div>
        {socialLinks.map((link) => (
          <a
            key={link.id}
            id={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSelect()}
            onMouseEnter={playHover}
            className="sidebar-social-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 0',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              color: 'var(--slate)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              transition: 'color 0.12s, text-shadow 0.12s',
            }}
          >
            <span
              className="sidebar-social-glyph"
              aria-hidden="true"
              style={{
                fontSize: '0.5rem',
                transition: 'transform 0.12s',
                display: 'inline-block',
              }}
            >
              ▶
            </span>
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
