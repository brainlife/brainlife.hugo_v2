'use client';
import { useEffect, useRef } from 'react';
import { DRAWERS } from '@/lib/landing/drawers';
import type { HeroArt } from '@/lib/landing/types';

/**
 * Renders one hero drawing (lib/landing/draw.ts) into a div. Decorative only.
 * Draws lazily: when the element comes within 200px of the viewport, or at once with `eager`.
 */
export default function Drawn({ art, w, h, seed, small = true, className, eager = false }: {
  art: HeroArt; w: number; h: number; seed: number; small?: boolean; className?: string; eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let drawn = false;
    const draw = () => { if (drawn) return; drawn = true; el.innerHTML = ''; DRAWERS[art](el, w, h, seed, small); };
    if (eager || !('IntersectionObserver' in window)) { draw(); return; }
    const io = new IntersectionObserver((entries) => { if (entries.some(e => e.isIntersecting)) { draw(); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [art, w, h, seed, small, eager]);
  return <div ref={ref} className={className} aria-hidden="true" />;
}
