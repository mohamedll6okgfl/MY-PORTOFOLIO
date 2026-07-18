import { useAppStore, type Section } from '../../store/appStore';
import { NAV_ITEMS } from '../../data/content';
import { useBeeper } from '../../hooks/useBeeper';

/**
 * SidebarNav — Game-select menu with 5 items (§4.3).
 * Active item gets filled highlight + "▶" cursor glyph.
 * Collapses to horizontal scrolling strip on mobile.
 */
export default function SidebarNav() {
  const section = useAppStore((s) => s.section);
  const setSection = useAppStore((s) => s.setSection);
  const { playHover, playSelect } = useBeeper();

  return (
    <nav
      className="sidebar-nav"
      aria-label="Portfolio sections"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '8px 0',
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
    </nav>
  );
}
