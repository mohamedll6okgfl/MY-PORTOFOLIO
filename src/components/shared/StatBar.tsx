import { useEffect, useRef, useState } from 'react';

interface StatBarProps {
  label: string;
  value: number;   // 0–100
  color?: string;   // bar fill color
  delay?: number;   // animation delay in ms
}

/**
 * StatBar — Reusable fill bar with arcade "health/mana bar" aesthetic (§4.4, §4.5).
 * Animates fill with stepped timing on mount.
 */
export default function StatBar({ label, value, color, delay = 0 }: StatBarProps) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const timer = setTimeout(() => {
      hasAnimated.current = true;
      setWidth(value);
    }, delay + 100);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const barColor = color || 'var(--blue)';
  const glowColor = color === 'var(--magenta)' ? 'var(--magenta-glow)' : 'var(--blue-glow)';

  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      {/* Label + value row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 4,
      }}>
        <span className="font-body text-xs font-semibold text-gray-300 tracking-wider">
          {label}
        </span>
        <span
          className="font-body text-sm font-bold"
          style={{ color: barColor }}
        >
          {value}
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
          transition: `width 800ms steps(12)`,
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
