'use client';
import { ECOSYSTEM, INFRASTRUCTURE, TOOL_ROLE_LABEL } from '@/lib/landing/content';
import { useCarousel } from './useCarousel';

const CARD_STEP = 276;

export default function Ecosystem() {
  const { ref, by } = useCarousel(CARD_STEP, 6000);
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{ECOSYSTEM.eyebrow}</div><h2>{ECOSYSTEM.title}</h2><p>{ECOSYSTEM.text}</p></div>
      </div>
      <div className="carousel">
        <div className="track" ref={ref} role="list">
          {ECOSYSTEM.tools.map(t => (
            <a className={`tool role-${t.role}`} href={t.href} key={t.name} role="listitem">
              <span className="role">{TOOL_ROLE_LABEL[t.role]}</span>
              <b>{t.name}</b>
              <p>{t.desc}</p>
            </a>
          ))}
          <div className="tool more-tools" role="listitem"><b>{ECOSYSTEM.more}</b></div>
        </div>
        <div className="arrows">
          <button type="button" onClick={() => by(-1)} aria-label="Previous tools">←</button>
          <button type="button" onClick={() => by(1)} aria-label="Next tools">→</button>
        </div>
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
