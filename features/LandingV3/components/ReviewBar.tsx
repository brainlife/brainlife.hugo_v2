'use client';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { PAIRS, HERO_VARIANTS, applyPair } from '@/lib/landing/pairs';

const noSubscribe = () => () => {};

/** Team-only controls, shown with ?review=1: re-roll the logo pair, step to the next hero. */
export default function ReviewBar() {
  const on = useSyncExternalStore(noSubscribe, () => new URLSearchParams(location.search).has('review'), () => false);
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!on) return;
    const id = requestAnimationFrame(() => setLabel(`${window.__bl?.hero} · ${window.__bl?.pair?.name}`));
    return () => cancelAnimationFrame(id);
  }, [on]);
  if (!on) return null;
  return (
    <div className="review"><div className="wrap">
      <span className="lbl">Review</span><span className="cur">{label}</span>
      <button type="button" onClick={() => { const q = PAIRS[Math.floor(Math.random() * PAIRS.length)]; applyPair(q); setLabel(`${window.__bl?.hero} · ${q.name}`); }}>Shuffle logo pair</button>
      <button type="button" onClick={() => { const i = HERO_VARIANTS.indexOf(window.__bl?.hero ?? 'lens'); location.hash = HERO_VARIANTS[(i + 1) % HERO_VARIANTS.length]; location.reload(); }}>Next hero</button>
    </div></div>
  );
}
