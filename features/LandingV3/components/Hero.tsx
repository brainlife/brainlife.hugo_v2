'use client';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { D } from '@/lib/landing/draw';
import { HERO } from '@/lib/landing/content';
import type { HeroVariant } from '@/lib/landing/pairs';
import Drawn from './Drawn';
import SiteHeader from './SiteHeader';

const noSubscribe = () => () => {};
/** The hero variant is chosen by the inline pick script before first paint; null during SSR. */
const useHeroVariant = () =>
  useSyncExternalStore(noSubscribe, () => (window.__bl && window.__bl.hero) || 'lens', () => null as HeroVariant | null);

function Caption({ v }: { v: HeroVariant }) {
  const [strong, rest] = HERO.captions[v];
  return <div className="cap"><b>{strong}</b> · {rest}</div>;
}

export default function Hero() {
  const variant = useHeroVariant();
  const bgRef = useRef<HTMLDivElement>(null);

  // The field variant paints the whole hero background and must follow the hero's size.
  useEffect(() => {
    const el = bgRef.current;
    if (variant !== 'field' || !el) return;
    const draw = () => {
      el.innerHTML = '';
      const layer = document.createElement('div');
      layer.style.cssText = 'position:absolute;inset:0';
      el.appendChild(layer);
      D.field(layer, el.clientWidth || 1180, el.clientHeight || 600, 2026, false);
    };
    draw();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(t); t = setTimeout(draw, 200); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [variant]);

  const layout = variant === 'field' ? 'bleed' : variant === 'ruler' ? 'below' : 'side';

  return (
    <header className="hero">
      <div className="bgart" ref={bgRef} />
      <div className="wrap">
        <SiteHeader />
        <div className={`hero-grid ${layout}`}>
          <div className="copy">
            <div className="ey">{HERO.eyebrow}</div>
            <h1>{HERO.headline}</h1>
            <p className="lede">{HERO.lede}</p>
            <div className="cta">
              <a className="btn p" href={HERO.primary.href}>{HERO.primary.label}</a>
              <a className="btn" href={HERO.secondary.href}>{HERO.secondary.label}</a>
            </div>
            {variant === 'field' && <Caption v="field" />}
          </div>
          {variant === 'lens' && <div className="vis stage side"><Drawn art="lens" w={760} h={570} seed={31} small={false} /><Caption v="lens" /></div>}
          {variant === 'ruler' && <div className="vis stage below"><Drawn art="ruler" w={1100} h={330} seed={0} small={false} /><Caption v="ruler" /></div>}
          {variant === null && <div className="vis stage side" style={{ minHeight: 320 }} />}
        </div>
      </div>
      <div className="stripe" />
    </header>
  );
}
