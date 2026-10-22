'use client';
import { useEffect, useRef } from 'react';
import { D } from '@/lib/landing/draw';
import type { Art, HeroArt } from '@/lib/landing/types';

/** Renders one generative drawing (see lib/landing/draw.ts) into a div once mounted. Decorative only. */
export default function Drawn({ art, w, h, seed, small = true, className }: {
  art: Art | HeroArt; w: number; h: number; seed: number; small?: boolean; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '';
    D[art](el, w, h, seed, small);
  }, [art, w, h, seed, small]);
  return <div ref={ref} className={className} aria-hidden="true" />;
}
