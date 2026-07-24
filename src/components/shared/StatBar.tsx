import { useEffect, useRef, useState } from 'react';
import {
  Code2, FileCode2, Atom, FileJson, Palette,
  Sparkles, GitBranch, Zap, Layout, Terminal,
  Gauge, ShieldCheck,
} from 'lucide-react';
import type { Skill } from '../../data/content';

// Static icon map — only bundles icons actually used (tree-shake friendly)
const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileCode2, Atom, FileJson, Palette,
  Sparkles, GitBranch, Zap, Layout, Terminal,
  Gauge, ShieldCheck,
};

interface StatBarProps {
  skill?: Skill;
  label?: string;
  iconName?: string;
  isUnlocked?: boolean;
  color?: string;
  delay?: number;
}

/**
 * StatBar — Retro Arcade Skill item component.
 * Clean layout: [Icon + Skill Name] on left, unified [🔓 POTENTIAL UNLOCKED] on right.
 * Full 100% mastery bar fill for all unlocked skills with high contrast.
 */
export default function StatBar({
  skill,
  label,
  iconName,
  isUnlocked = true,
  color,
  delay = 0,
}: StatBarProps) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const skillName = skill?.name || label || '';
  const iconKey = skill?.iconName || iconName || 'Code2';
  const unlocked = skill !== undefined ? skill.isUnlocked : isUnlocked;

  useEffect(() => {
    setFilled(false);
    const timer = setTimeout(() => {
      setFilled(true);
    }, delay + 50);

    return () => clearTimeout(timer);
  }, [delay]);

  const barColor = color || 'var(--blue)';

  // Static icon lookup with fallback to Code2
  const IconComponent = ICON_MAP[iconKey] || Code2;

  return (
    <div ref={ref} className="mb-3.5 w-full">
      {/* Header Row: [Icon + Skill Name] — [🔓 POTENTIAL UNLOCKED] */}
      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">

        {/* LEFT: Icon + Skill Name only */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center p-1 rounded bg-slate-900/90 border border-slate-700/80 shrink-0"
            style={{ color: barColor }}
          >
            <IconComponent size={14} className="shrink-0" />
          </div>
          <span className="font-body text-xs font-semibold text-gray-200 tracking-wider">
            {skillName}
          </span>
        </div>

        {/* RIGHT: Unified POTENTIAL UNLOCKED status badge */}
        <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-pixel text-emerald-400 border border-emerald-500/50 bg-emerald-950/60 px-2 py-0.5 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.3)] shrink-0">
          <span>{unlocked ? '🔓' : '🔒'}</span>
          <span className="tracking-wider">{unlocked ? 'POTENTIAL UNLOCKED' : 'LOCKED'}</span>
        </div>
      </div>

      {/* Full mastery progress bar track */}
      <div className="w-full h-2.5 bg-slate-900 border border-slate-700/60 rounded-sm overflow-hidden p-[1px] relative shadow-inner">
        <div
          className="h-full rounded-sm transition-all duration-1000 ease-out"
          style={{
            width: filled ? '100%' : '0%',
            backgroundColor: barColor,
            boxShadow: `0 0 8px ${barColor}`,
          }}
        />
      </div>
    </div>
  );
}
