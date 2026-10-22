'use client';
import { useEffect, useState } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { APPS } from '@/lib/landing/content';
import { pickArt, shuffled, formatCount } from '@/lib/landing/art';
import type { AppRecord, AppsFile } from '@/lib/landing/types';
import appsJson from '@/public/landing-data/apps.json';
import Drawn from './Drawn';
import { useCarousel } from './useCarousel';

const data = appsJson as AppsFile;
const CARD_STEP = 316;

/** Top-border colour by App family, so the carousel reads with the same palette as the tiles. */
const FAMILY_COLOR: [RegExp, string][] = [
  [/microscop|zarr|lightsheet/, 'c-red'], [/\bem\b|bossdb|x-ray/, 'c-blue'],
  [/fmri|qa|network|connectom/, 'c-orange'], [/anatomy|diffusion|tract|track/, 'c-yellow'],
];
const familyColor = (a: AppRecord) => {
  const t = `${a.tags.join(' ')} ${a.name}`.toLowerCase();
  return FAMILY_COLOR.find(([re]) => re.test(t))?.[1] ?? 'c-blue';
};

function AppCard({ a, index }: { a: AppRecord; index: number }) {
  return (
    <div className={`app ${familyColor(a)}`} role="listitem">
      <div className="athumb">
        {a.thumb ? <img src={getAssetPath(a.thumb)} alt="" /> : <Drawn art={pickArt(`${a.tags.join(' ')} ${a.name} ${a.desc}`)} w={300} h={150} seed={500 + index} />}
      </div>
      <span className="tag">{a.tags.slice(0, 2).join(' · ') || 'App'}</span>
      <b>{a.name}</b>
      <p>{a.desc || 'See the repository for details.'}</p>
      {a.maintainers.length > 0 && <span className="who">Maintained by <b>{a.maintainers.map(m => m.name).join(', ')}</b></span>}
      <a className="repo" href={`https://github.com/${a.repo}`}>{a.repo}</a>
      {a.runs > 0 && <span className="runs">{formatCount(a.runs)} runs · {formatCount(a.users)} users</span>}
    </div>
  );
}

export default function Apps() {
  const [apps, setApps] = useState<AppRecord[]>(() => data.apps.slice(0, APPS.cards));
  useEffect(() => { const id = requestAnimationFrame(() => setApps(shuffled(data.apps).slice(0, APPS.cards))); return () => cancelAnimationFrame(id); }, []);
  const { ref, by } = useCarousel(CARD_STEP);
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{APPS.eyebrow}</div><h2>{APPS.title}</h2><p>{APPS.text}</p></div>
        <a className="more" href={APPS.more.href}>{APPS.more.label}</a>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">{apps.map((a, i) => <AppCard key={a.id} a={a} index={i} />)}</div>
        <div className="arrows">
          <button type="button" onClick={() => by(-1)} aria-label="Previous Apps">←</button>
          <button type="button" onClick={() => by(1)} aria-label="Next Apps">→</button>
        </div>
      </div>
    </div></section>
  );
}
