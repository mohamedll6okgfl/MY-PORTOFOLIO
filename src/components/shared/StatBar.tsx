import { useEffect, useRef, useState } from 'react';

interface StatBarProps {
  label: string;
  value: number;   // 0–100
  color?: string;   // bar fill color
  delay?: number;   // animation delay in ms
}

/**
 * StatBar — Reusable fill bar with high-contrast Retro Arcade styling.
 * Track: bg-slate-900 border border-slate-700/80 shadow-inner
 * Fill: Vibrant neon color with glowing box-shadow and pixel segment accents.
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

  // Retro skill tier badge classification
  const getBadge = (val: number) => {
    if (val >= 85) return { text: 'MASTER', color: 'var(--yellow)', border: 'var(--yellow)' };
    if (val >= 75) return { text: 'EXPERT', color: 'var(--blue)', border: 'var(--blue)' };
    return { text: 'NOVICE', color: 'var(--slate)', border: 'var(--bezel-border)' };
  };

  const badge = getBadge(value);

  return (
    <div ref={ref} className="mb-3.5 w-full">
      {/* Label + Badge + value row */}
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-body text-xs font-semibold text-gray-200 tracking-wider">
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
              background: 'rgba(0,0,0,0.4)',
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

      {/* CONTAINER (Track) */}
      <div className="w-full h-3.5 bg-slate-900 border border-slate-700/80 rounded-sm overflow-hidden p-[1px] relative shadow-inner">
        {/* FILLED PROGRESS BAR */}
        <div
          className="h-full rounded-sm relative transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 12px ${barColor}`,
          }}
        >
          {/* Pixel segments overlay inside fill bar */}
          <div
            className="absolute inset-0"
            style={{
              background: 'repeating-linear-gradient(to right, transparent 0px, transparent 6px, rgba(0,0,0,0.2) 6px, rgba(0,0,0,0.2) 8px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
