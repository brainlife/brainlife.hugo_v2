'use client';

import { useEffect } from 'react';
import { PICK_SCRIPT } from '@/lib/landing/pairs';
import { STATS, FUNDING_LINE, LABELS } from '@/lib/landing/content';
import type { PubsFile } from '@/lib/landing/types';
import pubsJson from '@/public/landing-data/pubs.json';
import ReviewBar from './components/ReviewBar';
import Hero from './components/Hero';
import Scales from './components/Scales';
import Publications from './components/Publications';
import Apps from './components/Apps';
import Ecosystem from './components/Ecosystem';
import People from './components/People';
import SiteFooter from './components/SiteFooter';
import './landing-v3.css';

const pubs = pubsJson as PubsFile;

/**
 * Landing page, v3. Page order: hero → stats → scales → publications → Apps → tools ecosystem + infrastructure → people → footer.
 * Copy lives in lib/landing/content.ts; data in public/landing-data (written by scripts/fetch-landing-data.mjs);
 * drawings in lib/landing/draw.ts; logo pairs and the pre-paint pick script in lib/landing/pairs.ts.
 */
/** Adds `.in` to each `.reveal` block as it enters the viewport (CSS fades it up; no-op without JS or under reduced motion). */
function useReveal() {
  useEffect(() => {
    document.querySelector('.lv3')?.classList.add('js');
    const els = Array.from(document.querySelectorAll<HTMLElement>('.lv3 .reveal'));
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function LandingV3Page() {
  useReveal();
  const stats = [...STATS.slice(0, 3), { value: String(pubs.count), label: LABELS.publicationsWithDois }, ...STATS.slice(3)];
  return (
    <div className="lv3">
      {/* Runs as the HTML streams in, before the hero paints: picks the hero variant and the logo pair. */}
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <ReviewBar />
      <Hero />
      <div className="wrap">
        <div className="stats">{stats.map(s => <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}</div>
        <p className="funding">{FUNDING_LINE}</p>
      </div>
      <Scales />
      <Publications />
      <Apps />
      <Ecosystem />
      <People />
      <SiteFooter />
    </div>
  );
}
