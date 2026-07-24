import { UserCheck, Zap, Gamepad2, Scroll, Radio } from 'lucide-react';
import { useAppStore, type Section } from '../../store/appStore';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../data/content';
import { useBeeper } from '../../hooks/useBeeper';

// Icon map for navigation menu items (per prompt specs)
const NAV_ICON_MAP: Record<string, React.ElementType> = {
  profile: UserCheck,
  skills: Zap,
  projects: Gamepad2,
  resume: Scroll,
  contact: Radio,
};

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
    {
      label: 'GITHUB',
      url: SOCIAL_LINKS.github,
      id: 'sidebar-github-link',
      renderIcon: () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      label: 'LINKEDIN',
      url: SOCIAL_LINKS.linkedin,
      id: 'sidebar-linkedin-link',
      renderIcon: () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
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
        const IconComp = NAV_ICON_MAP[item.id] || Gamepad2;
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
            <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }} aria-hidden="true">
              <IconComp size={15} />
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
            {link.renderIcon()}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
