'use client';
import { useEffect, useState } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { PUBLICATIONS } from '@/lib/landing/content';
import { pickArt, shuffled } from '@/lib/landing/art';
import type { Publication, PubsFile } from '@/lib/landing/types';
import pubsJson from '@/public/landing-data/pubs.json';
import Drawn from './Drawn';
import { useCarousel } from './useCarousel';

const data = pubsJson as PubsFile;
const CARD_STEP = 356; // card width + gap, px

const hasMedia = (p: Publication) => Boolean(p.thumb || p.video);
const visible = data.pubs.filter(p => p.name && !PUBLICATIONS.hide.test(p.name));
/** Media-rich cards first; stable order for SSR, shuffled on the client. */
const order = (shuffle: boolean) => {
  const f = shuffle ? shuffled : <T,>(x: T[]) => x;
  return [...f(visible.filter(hasMedia)), ...f(visible.filter(p => !hasMedia(p)))].slice(0, PUBLICATIONS.cards);
};

function authorsLine(p: Publication) {
  if (!p.authors.length) return 'Authors on the publication page';
  return p.authors.length > 8 ? `${p.authors.slice(0, 7).join(', ')} and ${p.authors.length - 7} more` : p.authors.join(', ');
}

function PubCard({ p, index }: { p: Publication; index: number }) {
  const [playing, setPlaying] = useState(false);
  const play = () => { if (p.video) setPlaying(true); };
  const art = pickArt([p.name, ...p.tags, p.desc].join(' '));
  return (
    <article className="pub" role="listitem">
      <div className="thumb" onClick={play}
        role={p.video ? 'button' : undefined} tabIndex={p.video ? 0 : undefined}
        onKeyDown={e => { if (p.video && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); play(); } }}
        aria-label={p.video ? `Play clip from ${p.name}` : undefined}>
        {p.video && <span className="vid">Video · {p.videos} {p.videos === 1 ? 'clip' : 'clips'}</span>}
        {p.video && !playing && <div className="play"><i /></div>}
        {p.thumb ? <img src={getAssetPath(p.thumb)} alt="" loading="lazy" /> : <Drawn art={art} w={340} h={191} seed={300 + index} />}
        {!hasMedia(p) && <span className="vid vid-muted">No media yet</span>}
        {playing && p.video && <video className="clip" src={p.video} autoPlay muted loop playsInline />}
      </div>
      <div className="body">
        <b>{p.name}</b>
        {p.desc && <span className="desc">{p.desc.length > 180 ? p.desc.slice(0, 177) + '…' : p.desc}</span>}
        <span className="au">{authorsLine(p)}{p.institutions.length > 0 && <i> · {p.institutions.slice(0, 2).join(' · ')}</i>}</span>
        <div className="meta">
          <span>{p.date.slice(0, 4)}</span>
          {p.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}
          {p.viewers > 0 && <span>{p.viewers} Neuroglancer views</span>}
          <a className="doi" href={p.url}>{p.doi || 'brainlife publication'}</a>
        </div>
      </div>
    </article>
  );
}

export default function Publications() {
  const [pubs, setPubs] = useState<Publication[]>(() => order(false));
  useEffect(() => { const id = requestAnimationFrame(() => setPubs(order(true))); return () => cancelAnimationFrame(id); }, []);
  const { ref, by } = useCarousel(CARD_STEP);
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{PUBLICATIONS.eyebrow}</div><h2>{PUBLICATIONS.title}</h2><p>{PUBLICATIONS.text}</p></div>
        <a className="more" href={PUBLICATIONS.moreHref}>All {data.count} publications →</a>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">{pubs.map((p, i) => <PubCard key={p.id} p={p} index={i} />)}</div>
        <div className="arrows">
          <button type="button" onClick={() => by(-1)} aria-label="Previous publications">←</button>
          <button type="button" onClick={() => by(1)} aria-label="Next publications">→</button>
        </div>
      </div>
    </div></section>
  );
}
