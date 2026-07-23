import { useEffect, useRef, useState } from 'react';

interface StatBarProps {
  label: string;
  value: number;   // 0–100
  color?: string;   // bar fill color
  delay?: number;   // animation delay in ms
}

/**
 * StatBar — Reusable fill bar with arcade "health/mana bar" aesthetic.
 * Animates fill smoothly from 0% to target value over 1.2 seconds (ease-out).
 * Displays retro pixel skill level badges (NOVICE, EXPERT, MASTER).
 */
export default function StatBar({ label, value, color, delay = 0 }: StatBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset to 0 then animate to target value on mount/nav
    setWidth(0);
    const timer = setTimeout(() => {
      setWidth(value);
    }, delay + 50);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const barColor = color || 'var(--blue)';
  const glowColor = color === 'var(--magenta)' ? 'var(--magenta-glow)' : 'var(--blue-glow)';

  // Retro skill tier badge classification
  const getBadge = (val: number) => {
    if (val >= 85) return { text: 'MASTER', color: 'var(--yellow)', border: 'var(--yellow)' };
    if (val >= 75) return { text: 'EXPERT', color: 'var(--blue)', border: 'var(--blue)' };
    return { text: 'NOVICE', color: 'var(--slate)', border: 'var(--bezel-border)' };
  };

  const badge = getBadge(value);

  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      {/* Label + Badge + value row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="font-body text-xs font-semibold text-gray-300 tracking-wider">
            {label}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.45rem',
              color: badge.color,
              border: `1px solid ${badge.border}`,
              padding: '1px 5px',
              letterSpacing: '0.08em',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 2,
            }}
          >
            {badge.text}
          </span>
        </div>
        <span
          className="font-body text-sm font-bold"
          style={{ color: barColor }}
        >
          {value}%
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        height: 10,
        background: 'rgba(0,163,255,0.06)',
        border: '1px solid var(--bezel-border)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Bar fill */}
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${barColor}, ${barColor}dd)`,
          boxShadow: `0 0 8px ${glowColor}`,
          transition: `width 1.2s cubic-bezier(0, 0, 0.2, 1)`,
          position: 'relative',
        }}>
          {/* Pixel segments inside fill bar */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(0,0,0,0.15) 6px, rgba(0,0,0,0.15) 8px)',
          }} />
        </div>
      </div>
    </div>
  );
}
