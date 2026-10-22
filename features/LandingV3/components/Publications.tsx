'use client';
import { useEffect, useState } from 'react';
import { getAssetPath } from '@/lib/basePath';
import { PUBLICATIONS, LABELS } from '@/lib/landing/content';
import { shuffled } from '@/lib/landing/art';
import { pickMotif } from '@/lib/landing/motifs';
import type { Publication, PubsFile } from '@/lib/landing/types';
import pubsJson from '@/public/landing-data/pubs.json';
import MotifArt from './MotifArt';
import CarouselArrows from './CarouselArrows';
import { useCarousel } from './useCarousel';

const data = pubsJson as PubsFile;

const hasMedia = (p: Publication) => Boolean(p.thumb || p.video);
const visible = data.pubs.filter(p => p.name && !PUBLICATIONS.hide.test(p.name));
/** Media-rich cards first; stable order for the server render, shuffled on the client. */
const order = (shuffle: boolean) => {
  const f = shuffle ? shuffled : <T,>(x: T[]) => x;
  return [...f(visible.filter(hasMedia)), ...f(visible.filter(p => !hasMedia(p)))].slice(0, PUBLICATIONS.cards);
};

function authorsLine(p: Publication) {
  if (!p.authors.length) return LABELS.authorsOnPage;
  return p.authors.length > 8 ? `${p.authors.slice(0, 7).join(', ')} ${LABELS.andMore(p.authors.length - 7)}` : p.authors.join(', ');
}

function PubCard({ p }: { p: Publication }) {
  const [playing, setPlaying] = useState(false);
  const toggle = () => { if (p.video) setPlaying(v => !v); };
  return (
    <article className="pub" role="listitem">
      <div className="thumb" onClick={toggle}
        role={p.video ? 'button' : undefined} tabIndex={p.video ? 0 : undefined}
        onKeyDown={e => { if (p.video && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(); } }}
        aria-label={p.video ? `${playing ? 'Stop' : 'Play'} clip from ${p.name}` : undefined} aria-pressed={p.video ? playing : undefined}>
        {p.video && <span className="vid">{LABELS.video} · {p.videos} {p.videos === 1 ? LABELS.clip : LABELS.clips}</span>}
        {p.video && !playing && <div className="play"><i /></div>}
        {p.thumb ? <img src={getAssetPath(p.thumb)} alt="" loading="lazy" decoding="async" /> : <MotifArt kind={pickMotif([p.name, ...p.tags, p.desc].join(' '))} seed={p.id} />}
        {!hasMedia(p) && <span className="vid vid-muted">{LABELS.noMedia}</span>}
        {playing && p.video && <video className="clip" src={p.video} autoPlay muted loop playsInline />}
      </div>
      <div className="body">
        <b>{p.name}</b>
        {p.desc && <span className="desc">{p.desc.length > 180 ? p.desc.slice(0, 177) + '…' : p.desc}</span>}
        <span className="au">{authorsLine(p)}{p.institutions.length > 0 && <i> · {p.institutions.slice(0, 2).join(' · ')}</i>}</span>
        <div className="meta">
          <span>{p.date.slice(0, 4)}</span>
          {p.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}
          {p.viewers > 0 && <span>{p.viewers} {LABELS.neuroglancerViews}</span>}
          <a className="doi" href={p.url}>{p.doi || LABELS.publicationFallback}</a>
        </div>
      </div>
    </article>
  );
}

export default function Publications() {
  const [pubs, setPubs] = useState<Publication[]>(() => order(false));
  useEffect(() => { const id = requestAnimationFrame(() => setPubs(order(true))); return () => cancelAnimationFrame(id); }, []);
  const { ref, by, playing, toggle } = useCarousel();
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{PUBLICATIONS.eyebrow}</div><h2>{PUBLICATIONS.title}</h2><p>{PUBLICATIONS.text}</p></div>
        <a className="more" href={PUBLICATIONS.moreHref}>All {data.count} publications →</a>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">{pubs.map(p => <PubCard key={p.id} p={p} />)}</div>
        <CarouselArrows by={by} playing={playing} toggle={toggle} what="publications" />
      </div>
    </div></section>
  );
}
