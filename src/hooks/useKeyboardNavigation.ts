import { useEffect, useRef } from 'react';
import { useAppStore, type Section } from '../store/appStore';
import { useBeeper } from './useBeeper';

const SECTIONS: Section[] = ['profile', 'skills', 'projects', 'resume', 'contact'];

/**
 * Custom hook for global keyboard (ArrowUp/ArrowDown, W/S) and debounced wheel navigation.
 * Ignores keydown/wheel events when user is typing in form inputs or textareas.
 */
export function useKeyboardNavigation() {
  const section = useAppStore((s) => s.section);
  const setSection = useAppStore((s) => s.setSection);
  const { playSelect } = useBeeper();
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Ignore keyboard navigation if user is typing in inputs
      const activeElement = document.activeElement;
      const isTyping =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        (activeElement as HTMLElement)?.isContentEditable;

      if (isTyping) return;

      const currentIndex = SECTIONS.indexOf(section);

      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % SECTIONS.length;
        setSection(SECTIONS[nextIndex]);
        playSelect();
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
        setSection(SECTIONS[prevIndex]);
        playSelect();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const activeElement = document.activeElement;
      const isTyping =
        activeElement?.tagName === 'INPUT' ||
        activeElement?.tagName === 'TEXTAREA' ||
        (activeElement as HTMLElement)?.isContentEditable;

      if (isTyping) return;

      // Debounce / cooldown check (350ms) to prevent rapid multi-section skips on scroll
      const now = Date.now();
      if (now - lastWheelTime.current < 350) return;

      // Check if scrolling inside a scrollable sub-container that hasn't hit boundary
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const isScrollable = el.scrollHeight > el.clientHeight;
        const overflowY = window.getComputedStyle(el).overflowY;
        const canOverflow = overflowY === 'auto' || overflowY === 'scroll';

        if (isScrollable && canOverflow) {
          if (e.deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 4) {
            // Container can still scroll down
            return;
          }
          if (e.deltaY < 0 && el.scrollTop > 4) {
            // Container can still scroll up
            return;
          }
        }
        el = el.parentElement;
      }

      if (Math.abs(e.deltaY) < 10) return;

      const currentIndex = SECTIONS.indexOf(section);

      if (e.deltaY > 0) {
        lastWheelTime.current = now;
        const nextIndex = (currentIndex + 1) % SECTIONS.length;
        setSection(SECTIONS[nextIndex]);
        playSelect();
      } else if (e.deltaY < 0) {
        lastWheelTime.current = now;
        const prevIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
        setSection(SECTIONS[prevIndex]);
        playSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [section, setSection, playSelect]);
}
