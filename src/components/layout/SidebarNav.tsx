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
      hoverClass: 'hover:text-cyan-400',
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
      hoverClass: 'hover:text-blue-400',
      renderIcon: () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      label: 'WHATSAPP CHAT',
      url: SOCIAL_LINKS.whatsapp,
      id: 'sidebar-whatsapp-link',
      hoverClass: 'hover:text-emerald-400 hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]',
      renderIcon: () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-emerald-400">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
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
            className={`sidebar-social-link group ${link.hoverClass || ''}`}
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
            <span className="text-[10px] text-gray-500 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
              ▶
            </span>
            {link.renderIcon()}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
