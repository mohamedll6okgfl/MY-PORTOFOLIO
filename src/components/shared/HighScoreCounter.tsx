import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '../../data/content';

/**
 * HighScoreCounter — Counts up from 0 → total on first mount (§4.1).
 * Uses stepped timing (~1.1s), displaying in the header.
 */
export default function HighScoreCounter() {
  const [display, setDisplay] = useState(0);
  const target = PLAYER.highScore;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const totalDuration = 1100; // ~1.1s
    const stepCount = 20;
    const stepDuration = totalDuration / stepCount;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      // Stepped easing — discrete jumps, not smooth interpolation
      const progress = step / stepCount;
      setDisplay(Math.floor(progress * target));

      if (step >= stepCount) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [target]);

  const formatted = display.toString().padStart(6, '0');

  return (
    <div className="high-score-counter" style={{
      fontFamily: 'var(--font-display)',
      fontSize: '0.7rem',
      color: 'var(--yellow)',
      textShadow: '0 0 10px var(--yellow-glow)',
      letterSpacing: '0.15em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
    }}>
      <span style={{ fontSize: '0.55rem', color: 'var(--slate)', textShadow: 'none' }}>HI-SCORE</span>
      <span>{formatted}</span>
    </div>
  );
}
