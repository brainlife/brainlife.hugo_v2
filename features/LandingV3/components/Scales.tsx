import { SCALES, TILES, LABELS } from '@/lib/landing/content';
import MotifArt from './MotifArt';

const AXIS_POS = ['0', '25%', '50%', '75%'];

export default function Scales() {
  return (
    <section><div className="wrap">
      <div className="sec-head row">
        <div><div className="eyebrow">{SCALES.eyebrow}</div><h2>{SCALES.title}</h2><p>{SCALES.text}</p></div>
        <a className="more" href={SCALES.more.href}>{SCALES.more.label}</a>
      </div>
      <div className="scales">
        <div className="tiles">
          {TILES.map(t => (
            <div className="tile" key={t.art}>
              <div className="img"><MotifArt kind={t.art} seed={t.art} /></div>
              <div className="t">{t.title}</div><div className="s">{t.sub}</div>
            </div>
          ))}
        </div>
        <div className="axis">
          {SCALES.axis.slice(0, 4).map((label, i) => <span className="tk" key={label} style={{ left: AXIS_POS[i] }}>{label}</span>)}
          <span className="tk" style={{ right: 0, textAlign: 'right' }}>{SCALES.axis[4]}</span>
        </div>
      </div>
      <div className="sources">
        <span className="lbl">{LABELS.importFrom}</span>{SCALES.importFrom.map(s => <span className="chip" key={s}>{s}</span>)}
        <span className="lbl" style={{ marginLeft: 14 }}>{LABELS.formats}</span>{SCALES.formats.map(s => <span className="chip" key={s}>{s}</span>)}
      </div>
    </div></section>
  );
}
