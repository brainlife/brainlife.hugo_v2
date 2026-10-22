'use client';
import { ECOSYSTEM, INFRASTRUCTURE, TOOL_ROLE_LABEL } from '@/lib/landing/content';
import CarouselArrows from './CarouselArrows';
import { useCarousel } from './useCarousel';

export default function Ecosystem() {
  const { ref, by, playing, toggle } = useCarousel(6000);
  return (
    <section className="band"><div className="wrap reveal">
      <div className="sec-head row">
        <div><div className="eyebrow">{ECOSYSTEM.eyebrow}</div><h2>{ECOSYSTEM.title}</h2><p>{ECOSYSTEM.text}</p></div>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">
          {ECOSYSTEM.tools.map(t => (
            <div role="listitem" key={t.name} className="tool-item">
              <a className={`tool role-${t.role}`} href={t.href}>
                <span className="role">{TOOL_ROLE_LABEL[t.role]}</span>
                <b>{t.name}</b>
                <p>{t.desc}</p>
              </a>
            </div>
          ))}
          <div role="listitem" className="tool-item"><div className="tool more-tools"><b>{ECOSYSTEM.more}</b></div></div>
        </div>
        <CarouselArrows by={by} playing={playing} toggle={toggle} what="tools" />
      </div>

      <div className="infra">
        <div className="eyebrow">{INFRASTRUCTURE.eyebrow}</div>
        <h3>{INFRASTRUCTURE.title}</h3>
        <div className="infra-groups">
          {INFRASTRUCTURE.groups.map(g => (
            <div className="infra-group" key={g.label}>
              <span className="lbl">{g.label}</span>
              {g.items.map(i => <span className="chip" key={i}>{i}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div></section>
  );
}
