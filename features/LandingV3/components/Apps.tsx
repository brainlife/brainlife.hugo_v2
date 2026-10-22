'use client';
import { useEffect, useState } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { APPS, LABELS } from '@/lib/landing/content';
import { pickArt, shuffled, formatCount } from '@/lib/landing/art';
import { seedFrom } from '@/lib/landing/drawers';
import type { AppRecord, AppsFile } from '@/lib/landing/types';
import appsJson from '@/public/landing-data/apps.json';
import Drawn from './Drawn';
import CarouselArrows from './CarouselArrows';
import { useCarousel } from './useCarousel';

const data = appsJson as AppsFile;

/** Top-border colour by App family, so the carousel shares the palette of the tiles. */
const FAMILY_COLOR: [RegExp, string][] = [
  [/microscop|zarr|lightsheet/, 'c-red'], [/\bem\b|bossdb|x-ray/, 'c-blue'],
  [/fmri|qa|network|connectom/, 'c-orange'], [/anatomy|diffusion|tract|track/, 'c-yellow'],
];
const familyColor = (a: AppRecord) => {
  const t = `${a.tags.join(' ')} ${a.name}`.toLowerCase();
  return FAMILY_COLOR.find(([re]) => re.test(t))?.[1] ?? 'c-blue';
};

function AppCard({ a }: { a: AppRecord }) {
  return (
    <div className={`app ${familyColor(a)}`} role="listitem">
      <div className="athumb">
        {a.thumb ? <img src={getAssetPath(a.thumb)} alt="" loading="lazy" decoding="async" /> : <Drawn art={pickArt(`${a.tags.join(' ')} ${a.name} ${a.desc}`)} w={300} h={150} seed={seedFrom(a.id)} />}
      </div>
      <span className="tag">{a.tags.slice(0, 2).join(' · ') || LABELS.appFallbackTag}</span>
      <b>{a.name}</b>
      <p>{a.desc || LABELS.appFallbackDesc}</p>
      {a.maintainers.length > 0 && <span className="who">{LABELS.maintainedBy} <b>{a.maintainers.map(m => m.name).join(', ')}</b></span>}
      <a className="repo" href={`https://github.com/${a.repo}`}>{a.repo}</a>
      {a.runs > 0 && <span className="runs">{formatCount(a.runs)} {LABELS.runs} · {formatCount(a.users)} {LABELS.users}</span>}
    </div>
  );
}

export default function Apps() {
  const [apps, setApps] = useState<AppRecord[]>(() => data.apps.slice(0, APPS.cards));
  useEffect(() => { const id = requestAnimationFrame(() => setApps(shuffled(data.apps).slice(0, APPS.cards))); return () => cancelAnimationFrame(id); }, []);
  const { ref, by, playing, toggle } = useCarousel();
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{APPS.eyebrow}</div><h2>{APPS.title}</h2><p>{APPS.text}</p></div>
        <a className="more" href={APPS.more.href}>{APPS.more.label}</a>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">{apps.map(a => <AppCard key={a.id} a={a} />)}</div>
        <CarouselArrows by={by} playing={playing} toggle={toggle} what="Apps" />
      </div>
    </div></section>
  );
}
