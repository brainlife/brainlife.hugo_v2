'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { PAIRS, HERO_VARIANTS, applyPair } from '@/lib/landing/pairs';
import { PREVIEW } from '@/lib/landing/content';

/** Set at build time by the preview workflow; makes the bar visible to every visitor of a staging deploy. */
const IS_PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === '1';

const noSubscribe = () => () => {};

/** Review controls: re-roll the logo pair, step to the next hero, leave feedback. Shown with ?review=1, or always on a preview build. */
export default function ReviewBar() {
  const on = useSyncExternalStore(noSubscribe, () => IS_PREVIEW || new URLSearchParams(location.search).has('review'), () => IS_PREVIEW);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!on) return;
    const id = requestAnimationFrame(() => setLabel(`${window.__bl?.hero} · ${window.__bl?.pair?.name}`));
    return () => cancelAnimationFrame(id);
  }, [on]);
  if (!on) return null;
  return (
    <div className="review"><div className="wrap">
      <span className="lbl">{IS_PREVIEW ? PREVIEW.label : 'Review'}</span><span className="cur">{label}</span>
      <button type="button" onClick={() => { const q = PAIRS[Math.floor(Math.random() * PAIRS.length)]; applyPair(q); setLabel(`${window.__bl?.hero} · ${q.name}`); }}>Shuffle logo pair</button>
      <button type="button" onClick={() => { const i = HERO_VARIANTS.indexOf(window.__bl?.hero ?? 'lens'); location.hash = HERO_VARIANTS[(i + 1) % HERO_VARIANTS.length]; location.reload(); }}>Next hero</button>
      <a className="fb" href={PREVIEW.feedbackHref.replace('%7Bstate%7D', encodeURIComponent(`${label} · ${typeof location !== 'undefined' ? location.href : ''}`))} target="_blank" rel="noreferrer">{PREVIEW.feedbackLabel} →</a>
    </div></div>
  );
}
