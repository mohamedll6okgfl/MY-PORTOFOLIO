import { SKILLS } from '../../data/content';
import StatBar from '../shared/StatBar';

/**
 * SkillsSection — "Power-Ups" inventory (§4.5).
 * Skills grouped by category, each as a labeled StatBar.
 */
export default function SkillsSection() {
  // Group skills by category
  const categories = SKILLS.reduce<Record<string, typeof SKILLS>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryMeta: Record<string, { icon: string; color: string }> = {
    FRONTEND: { icon: '🖥️', color: 'var(--blue)' },
    TOOLS:    { icon: '⚙️', color: 'var(--magenta)' },
    CRAFT:    { icon: '🛠️', color: 'var(--yellow)' },
  };

  return (
    <div className="section-content">
      <h2 className="section-title">
        &gt; POWER-UPS INVENTORY_
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {Object.entries(categories).map(([category, skills]) => {
          const meta = categoryMeta[category] || { icon: '📦', color: 'var(--blue)' };
          return (
            <div
              key={category}
              style={{
                border: '1px solid var(--bezel-border)',
                background: 'var(--card-bg)',
                padding: 0,
              }}
            >
              {/* Category header */}
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--bezel-border)',
                background: 'rgba(0,163,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{ fontSize: '0.9rem' }} aria-hidden="true">{meta.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  color: meta.color,
                  letterSpacing: '0.12em',
                }}>
                  {category}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.5rem',
                  color: 'var(--slate)',
                  letterSpacing: '0.05em',
                }}>
                  {skills.length} ITEMS
                </span>
              </div>

              {/* Skill bars */}
              <div style={{ padding: '16px' }}>
                {skills.map((skill, i) => (
                  <StatBar
                    key={skill.name}
                    label={skill.name.toUpperCase()}
                    value={skill.level}
                    color={meta.color}
                    delay={i * 80}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
