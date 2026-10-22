'use client';
import { useEffect, useRef } from 'react';

/**
 * Horizontal scroll-snap carousel: arrow handlers plus a slow auto-advance that pauses on
 * hover/focus and is disabled entirely when the visitor prefers reduced motion.
 */
export function useCarousel(step: number, intervalMs = 7000) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (dir: number) => ref.current?.scrollBy({ left: dir * step, behavior: 'smooth' });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener('pointerenter', pause); el.addEventListener('pointerleave', resume);
    el.addEventListener('focusin', pause); el.addEventListener('focusout', resume);
    const id = setInterval(() => {
      if (paused) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' }); else el.scrollBy({ left: step, behavior: 'smooth' });
    }, intervalMs);
    return () => {
      clearInterval(id);
      el.removeEventListener('pointerenter', pause); el.removeEventListener('pointerleave', resume);
      el.removeEventListener('focusin', pause); el.removeEventListener('focusout', resume);
    };
  }, [step, intervalMs]);

  return { ref, by };
}
