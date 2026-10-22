'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Horizontal scroll-snap carousel. Arrows step by one card (measured from the DOM, so phones and
 * desktops agree). Auto-advance is slow, pauses on hover/focus, has a visible pause toggle, and is
 * off entirely when the visitor prefers reduced motion.
 */
export function useCarousel(intervalMs = 7000) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  const step = () => {
    const el = ref.current; const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 320;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '16') || 16;
    return first.getBoundingClientRect().width + gap;
  };
  const by = (dir: number) => ref.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  useEffect(() => {
    const el = ref.current;
    if (!el || !playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let hovered = false;
    const pause = () => { hovered = true; }, resume = () => { hovered = false; };
    el.addEventListener('pointerenter', pause); el.addEventListener('pointerleave', resume);
    el.addEventListener('focusin', pause); el.addEventListener('focusout', resume);
    const id = setInterval(() => {
      if (hovered || document.hidden) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: 'smooth' }); else el.scrollBy({ left: step(), behavior: 'smooth' });
    }, intervalMs);
    return () => {
      clearInterval(id);
      el.removeEventListener('pointerenter', pause); el.removeEventListener('pointerleave', resume);
      el.removeEventListener('focusin', pause); el.removeEventListener('focusout', resume);
    };
  }, [intervalMs, playing]);

  return { ref, by, playing, toggle: () => setPlaying(p => !p) };
}
