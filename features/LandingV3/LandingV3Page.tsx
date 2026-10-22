'use client';

import { PICK_SCRIPT } from '@/lib/landing/pairs';
import { STATS, FUNDING_LINE } from '@/lib/landing/content';
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
export default function LandingV3Page() {
  return (
    <div className="lv3">
      {/* Runs as the HTML streams in, before the hero paints: picks the hero variant and the logo pair. */}
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <ReviewBar />
      <Hero />
      <div className="wrap"><div className="stats">
        {STATS.slice(0, 3).map(s => <span key={s.label}><b>{s.value}</b> {s.label}</span>)}
        <span><b>{pubs.count}</b> publications with DOIs</span>
        {STATS.slice(3).map(s => <span key={s.label}><b>{s.value}</b> {s.label}</span>)}
        <span>{FUNDING_LINE}</span>
      </div></div>
      <Scales />
      <Publications />
      <Apps />
      <Ecosystem />
      <People />
      <SiteFooter />
    </div>
  );
}
