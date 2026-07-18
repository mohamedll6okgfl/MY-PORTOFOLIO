import { useCallback, useRef } from 'react';
import { useAppStore } from '../store/appStore';

/**
 * Web Audio API synth engine for 8-bit arcade sound cues.
 * All sounds are synthesized at runtime — zero asset files, zero network weight.
 * AudioContext created lazily on first user interaction (per spec §6 + §10).
 */
export function useBeeper() {
  const ctxRef = useRef<AudioContext | null>(null);
  const muted = useAppStore((s) => s.muted);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'square') => {
      if (muted) return;
      try {
        const ctx = getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration / 1000);
      } catch {
        // Silently fail if audio is blocked
      }
    },
    [muted, getContext]
  );

  /** Nav item hover — single short blip, ~660Hz */
  const playHover = useCallback(() => {
    playTone(660, 80, 'square');
  }, [playTone]);

  /** Nav item / button select — single blip, ~880Hz */
  const playSelect = useCallback(() => {
    playTone(880, 100, 'square');
  }, [playTone]);

  /** CV download / contact submit — two-tone ascending "coin" (523Hz → 784Hz) */
  const playCoin = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getContext();

      // First tone: C5 (523Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523, ctx.currentTime);
      gain1.gain.setValueAtTime(0.1, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.15);

      // Second tone: G5 (784Hz), offset by 80ms
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(784, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.23);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.23);
    } catch {
      // Silently fail
    }
  }, [muted, getContext]);

  return { playHover, playSelect, playCoin };
}
