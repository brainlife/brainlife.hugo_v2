'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { getAssetPath } from '@/lib/basePath';
import { D } from '@/lib/landing/draw';
import { PICK_SCRIPT, PAIRS, HERO_VARIANTS, applyPair, type HeroVariant } from '@/lib/landing/pairs';
import { BRAND_MARK_INNER, BRAND_VIEWBOX } from '@/lib/landing/brandMark';
import pubsData from '@/public/landing-data/pubs.json';
import appsData from '@/public/landing-data/apps.json';
import peopleData from '@/public/landing-data/people.json';
import './landing-v3.css';

type Pub = (typeof pubsData.pubs)[number];
type App = (typeof appsData.apps)[number];
type Art = 'em' | 'lightsheet' | 'oct' | 'tracts' | 'surface' | 'matrix' | 'fmri' | 'meg';

declare global {
  interface Window { __bl?: { pair: (typeof PAIRS)[number]; hero: HeroVariant } }
}

/* ---------- helpers ---------- */
const subscribeNoop = () => () => {};
function pickArt(text: string): Art {
  const t = text.toLowerCase();
  if (/\b(eeg|meg|electrophys)/.test(t)) return 'meg';
  if (/\b(fmri|functional|bold|opto)/.test(t)) return 'fmri';
  if (/\b(tract|diffusion|dwi|dmri|streamline|fascic)/.test(t)) return 'tracts';
  if (/\b(connectom|network|matrix)/.test(t)) return 'matrix';
  if (/\b(lightsheet|light-sheet|microscop|axon)/.test(t)) return 'lightsheet';
  if (/\b(electron|em volume|bossdb|x-ray)/.test(t)) return 'em';
  if (/\b(oct|optical coherence|tracing)/.test(t)) return 'oct';
  return 'surface';
}
function shuffled<T>(a: T[]): T[] { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }
const fmt = (n: number) => n.toLocaleString('en-US');

/** Draws a generative tile into a container once it is mounted. */
function Drawn({ art, w, h, seed, small = true, className }: { art: Art | 'field' | 'lens' | 'ruler'; w: number; h: number; seed: number; small?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (!el) return; el.innerHTML = ''; D[art](el, w, h, seed, small); }, [art, w, h, seed, small]);
  return <div ref={ref} className={className} aria-hidden="true" />;
}

function BrandMark({ className = 'mark' }: { className?: string }) {
  return <svg className={className} viewBox={BRAND_VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: BRAND_MARK_INNER }} />;
}

/* ---------- header + hero ---------- */
function Hero() {
  // chosen before first paint by the inline pick script; null during server render
  const variant = useSyncExternalStore(subscribeNoop, () => (window.__bl && window.__bl.hero) || 'lens', () => null as HeroVariant | null);
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (variant !== 'field' || !bgRef.current) return;
    const el = bgRef.current;
    const draw = () => { el.innerHTML = ''; const c = document.createElement('div'); c.style.cssText = 'position:absolute;inset:0'; el.appendChild(c); D.field(c, el.clientWidth || 1180, el.clientHeight || 600, 2026, false); };
    draw();
    let t: ReturnType<typeof setTimeout>; const onResize = () => { clearTimeout(t); t = setTimeout(draw, 200); };
    window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize);
  }, [variant]);

  const caps: Record<HeroVariant, React.ReactNode> = {
    field: <><b>Across scales</b> · electron microscopy → lightsheet → PS-OCT → MRI</>,
    lens: <><b>Across scales</b> · nm → cm, read inward</>,
    ruler: <><b>Nine orders of magnitude</b> · what each instrument resolves · which viewer opens it</>,
  };
  const layout = variant === 'field' ? 'bleed' : variant === 'ruler' ? 'below' : 'side';

  return (
    <header className="hero">
      <div className="bgart" ref={bgRef} />
      <div className="wrap">
        <div className="site">
          <a className="brand" href={getAssetPath('/')} aria-label="brainlife.io home"><BrandMark /><span>brainlife<i>.io</i></span></a>
          <nav className="nav" aria-label="Primary">
            <a href={EXTERNAL_LINKS.APPS}>Apps</a>
            <a href={EXTERNAL_LINKS.DATASETS}>Datasets</a>
            <a href="https://connects.brainlife.io/research">Publications</a>
            <a href={EXTERNAL_LINKS.DOCS}>Docs</a>
            <a className="btn" href={EXTERNAL_LINKS.PORTAL}>Sign in</a>
          </nav>
        </div>
        <div className={`hero-grid ${layout}`}>
          <div className="copy">
            <div className="ey">Open platform · The University of Texas at Austin</div>
            <h1>Brain data at every scale. One place to analyze, share and publish it.</h1>
            <p className="lede">Electron and light microscopy, PS-OCT, MRI, fMRI, EEG and MEG. Run reproducible analyses on shared supercomputers, look at the results in your browser, publish them with a DOI.</p>
            <div className="cta"><a className="btn p" href={EXTERNAL_LINKS.PORTAL}>Start a project</a><a className="btn" href={EXTERNAL_LINKS.APPS}>Browse Apps and datasets</a></div>
            {variant === 'field' && <div className="cap">{caps.field}</div>}
          </div>
          {variant === 'lens' && <div className="vis stage side"><Drawn art="lens" w={760} h={570} seed={31} small={false} /><div className="cap">{caps.lens}</div></div>}
          {variant === 'ruler' && <div className="vis stage below"><Drawn art="ruler" w={1100} h={330} seed={0} small={false} /><div className="cap">{caps.ruler}</div></div>}
          {variant === null && <div className="vis stage side" style={{ minHeight: 320 }} />}
        </div>
      </div>
      <div className="stripe" />
    </header>
  );
}

/* ---------- sections ---------- */
const TILES: { art: Art; title: string; sub: string }[] = [
  { art: 'em', title: 'Electron microscopy', sub: 'nm · Neuroglancer' }, { art: 'lightsheet', title: 'Lightsheet microscopy', sub: 'µm · OME-Zarr' },
  { art: 'oct', title: 'PS-OCT · tract tracing', sub: 'µm–mm · Zarr' }, { art: 'tracts', title: 'White-matter tracts', sub: 'dMRI · TRX' },
  { art: 'surface', title: 'Brain surfaces', sub: 'GIfTI · parcellations' }, { art: 'matrix', title: 'Connectivity matrices', sub: 'connectome · CSV' },
  { art: 'fmri', title: 'Functional maps', sub: 'fMRI · BIDS' }, { art: 'meg', title: 'MEG · EEG', sub: 'FIF · NWB' },
];

function Scales() {
  return (
    <section><div className="wrap">
      <div className="sec-head row"><div><div className="eyebrow">Measurements across scales</div><h2>Every representation of the brain, from synapses to systems.</h2><p>Stylised views of the datatypes that are live on the platform today, in the order of the scale they measure. Upload your own or import from public archives; 139 datatypes keep Apps interoperable.</p></div><a className="more" href={EXTERNAL_LINKS.DATASETS}>Browse public datasets →</a></div>
      <div className="scales">
        <div className="tiles">{TILES.map((t, i) => <div className="tile" key={t.art}><Drawn art={t.art} w={200} h={200} seed={100 + i} className="img" /><div className="t">{t.title}</div><div className="s">{t.sub}</div></div>)}</div>
        <div className="axis"><span className="tk" style={{ left: 0 }}>nm · synapses</span><span className="tk" style={{ left: '25%' }}>µm · cells</span><span className="tk" style={{ left: '50%' }}>mm · circuits</span><span className="tk" style={{ left: '75%' }}>cm · systems</span><span className="tk" style={{ right: 0, textAlign: 'right' }}>whole brain</span></div>
      </div>
      <div className="sources"><span className="lbl">Import from</span><span className="chip">OpenNeuro</span><span className="chip">BossDB</span><span className="chip">DANDI</span><span className="chip">ezBIDS (DICOM → BIDS)</span><span className="chip">Your computer</span><span className="lbl" style={{ marginLeft: 14 }}>Formats</span><span className="chip">BIDS</span><span className="chip">NIfTI</span><span className="chip">OME-Zarr 0.5</span><span className="chip">Neuroglancer precomputed</span><span className="chip">TRX</span><span className="chip">NWB</span><span className="chip">FIF</span></div>
    </div></section>
  );
}

function useCarousel(step: number) {
  const ref = useRef<HTMLDivElement>(null);
  const by = (dir: number) => ref.current?.scrollBy({ left: dir * step, behavior: 'smooth' });
  useEffect(() => {
    const el = ref.current; if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let hover = false; const on = () => { hover = true; }, off = () => { hover = false; };
    el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off); el.addEventListener('focusin', on); el.addEventListener('focusout', off);
    const id = setInterval(() => { if (hover) return; if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) el.scrollTo({ left: 0, behavior: 'smooth' }); else el.scrollBy({ left: step, behavior: 'smooth' }); }, 7000);
    return () => { clearInterval(id); el.removeEventListener('pointerenter', on); el.removeEventListener('pointerleave', off); el.removeEventListener('focusin', on); el.removeEventListener('focusout', off); };
  }, [step]);
  return { ref, by };
}

function PubCard({ p, i }: { p: Pub; i: number }) {
  const [playing, setPlaying] = useState(false);
  const art = pickArt([p.name, ...(p.tags || []), p.desc].join(' '));
  return (
    <article className="pub">
      <div className="thumb" onClick={() => p.video && setPlaying(true)} role={p.video ? 'button' : undefined} tabIndex={p.video ? 0 : undefined} onKeyDown={(e) => { if (p.video && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setPlaying(true); } }} aria-label={p.video ? `Play clip from ${p.name}` : undefined}>
        {p.video && <span className="vid">Video · {p.videos} {p.videos === 1 ? 'clip' : 'clips'}</span>}
        {p.video && !playing && <div className="play"><i /></div>}
        {p.thumb ? <img src={getAssetPath(p.thumb)} alt="" loading="lazy" /> : <Drawn art={art} w={340} h={191} seed={300 + i} />}
        {!p.thumb && !p.video && <span className="vid" style={{ background: 'rgba(238,243,246,.18)', color: '#eef3f6' }}>No media yet</span>}
        {playing && p.video && <video src={p.video} autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 3 }} />}
      </div>
      <div className="body">
        <b>{p.name}</b>
        {p.desc && <span className="desc">{p.desc.length > 180 ? p.desc.slice(0, 177) + '…' : p.desc}</span>}
        <span className="au">{p.authors.length ? (p.authors.length > 8 ? p.authors.slice(0, 7).join(', ') + ` and ${p.authors.length - 7} more` : p.authors.join(', ')) : 'Authors on the publication page'}{p.institutions.length ? <i> · {p.institutions.slice(0, 2).join(' · ')}</i> : null}</span>
        <div className="meta"><span>{p.date.slice(0, 4)}</span>{p.tags.slice(0, 2).map(t => <span key={t}>{t}</span>)}{p.viewers ? <span>{p.viewers} Neuroglancer views</span> : null}<a className="doi" href={p.url}>{p.doi || 'brainlife publication'}</a></div>
      </div>
    </article>
  );
}

function Publications() {
  const all = pubsData.pubs.filter(p => p.name && !/^(test|demo|pilot)\b/i.test(p.name));
  const ordered = [...all.filter(p => p.thumb || p.video), ...all.filter(p => !(p.thumb || p.video))];
  const [pubs, setPubs] = useState<Pub[]>(() => ordered.slice(0, 12));
  useEffect(() => { // shuffle on the client after hydration, media-rich cards first
    const id = requestAnimationFrame(() => setPubs([...shuffled(all.filter(p => p.thumb || p.video)), ...shuffled(all.filter(p => !(p.thumb || p.video)))].slice(0, 12)));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { ref, by } = useCarousel(356);
  return (
    <section><div className="wrap">
      <div className="sec-head row"><div><div className="eyebrow">From the publications</div><h2>Science published on brainlife, with the people who made it.</h2><p>Every card is a record from the publication registry: title, DOI, authors and institutions, and the clips and banner images the authors attached. The order shuffles on each visit.</p></div><a className="more" href="https://connects.brainlife.io/research">All {pubsData.count} publications →</a></div>
      <div className="carousel"><div className="track" ref={ref} role="list">{pubs.map((p, i) => <PubCard key={p.id} p={p} i={i} />)}</div><div className="arrows"><button type="button" onClick={() => by(-1)} aria-label="Previous publications">←</button><button type="button" onClick={() => by(1)} aria-label="Next publications">→</button></div></div>
    </div></section>
  );
}

const APP_COLOR: Record<string, string> = { anatomy: 'c-yellow', fmri: 'c-orange', diffusion: 'c-yellow', tract: 'c-yellow', track: 'c-yellow', network: 'c-orange', qa: 'c-orange', microscop: 'c-red', em: 'c-blue', zarr: 'c-blue' };
function appColor(a: App) { const t = (a.tags.join(' ') + ' ' + a.name).toLowerCase(); for (const k in APP_COLOR) if (t.includes(k)) return APP_COLOR[k]; return 'c-blue'; }

function Apps() {
  const [apps, setApps] = useState<App[]>(() => appsData.apps.slice(0, 12));
  useEffect(() => { const id = requestAnimationFrame(() => setApps(shuffled(appsData.apps).slice(0, 12))); return () => cancelAnimationFrame(id); }, []);
  const { ref, by } = useCarousel(316);
  return (
    <section><div className="wrap">
      <div className="sec-head row"><div><div className="eyebrow">Apps</div><h2>400+ Apps, run on shared supercomputers.</h2><p>Any GitHub repository becomes a containerized App. Jobs run on TACC, Jetstream2 and ACCESS, and every output opens in NiiVue or Neuroglancer. Each card names what the App does and who maintains it.</p></div><a className="more" href={EXTERNAL_LINKS.APPS}>Browse all Apps →</a></div>
      <div className="carousel"><div className="track" ref={ref} role="list">
        {apps.map((a, i) => (
          <div className={`app ${appColor(a)}`} key={a.id} role="listitem">
            <div className="athumb">{a.thumb ? <img src={getAssetPath(a.thumb)} alt="" /> : <Drawn art={pickArt(a.tags.join(' ') + ' ' + a.name + ' ' + a.desc)} w={300} h={150} seed={500 + i} />}</div>
            <span className="tag">{a.tags.slice(0, 2).join(' · ') || 'App'}</span>
            <b>{a.name}</b>
            <p>{a.desc || 'See the repository for details.'}</p>
            {a.maintainers.length > 0 && <span className="who">Maintained by <b>{a.maintainers.map(m => m.name).join(', ')}</b></span>}
            <a className="repo" href={`https://github.com/${a.repo}`}>{a.repo}</a>
            {a.runs > 0 && <span className="runs">{fmt(a.runs)} runs · {fmt(a.users)} users</span>}
          </div>
        ))}
      </div><div className="arrows"><button type="button" onClick={() => by(-1)} aria-label="Previous Apps">←</button><button type="button" onClick={() => by(1)} aria-label="Next Apps">→</button></div></div>
    </div></section>
  );
}

function People() {
  return (
    <section><div className="wrap">
      <div className="sec-head"><div className="eyebrow">People</div><h2>Built by the people who publish on it.</h2><p>Authors of the most recent publications, pulled from the publication registry so this never goes stale.</p></div>
      <div className="people">{peopleData.people.map(p => <span key={p.name}><a href="https://connects.brainlife.io/research">{p.name}</a></span>)}</div>
    </div></section>
  );
}

function SiteFooter() {
  return (
    <footer><div className="wrap"><span className="fbrand"><BrandMark className="mark light" />brainlife.io · Pestilli Lab, The University of Texas at Austin</span><span>Code MIT · content CC BY 4.0 · <a href={EXTERNAL_LINKS.GITHUB}>GitHub</a> · <a href={EXTERNAL_LINKS.CONTACT}>Contact</a></span></div></footer>
  );
}

/** Review controls, shown only with ?review=1 so the team can step through heroes and pairs. */
function Review() {
  const on = useSyncExternalStore(subscribeNoop, () => !!new URLSearchParams(location.search).get('review'), () => false);
  const [label, setLabel] = useState('');
  useEffect(() => { if (!on) return; const id = requestAnimationFrame(() => setLabel(`${window.__bl?.hero} · ${window.__bl?.pair?.name}`)); return () => cancelAnimationFrame(id); }, [on]);
  if (!on) return null;
  return <div className="review"><div className="wrap"><span className="lbl">Review</span><span className="cur">{label}</span>
    <button type="button" onClick={() => { const q = PAIRS[Math.floor(Math.random() * PAIRS.length)]; applyPair(q); setLabel(`${window.__bl?.hero} · ${q.name}`); }}>Shuffle logo pair</button>
    <button type="button" onClick={() => { const i = HERO_VARIANTS.indexOf(window.__bl!.hero); location.hash = HERO_VARIANTS[(i + 1) % HERO_VARIANTS.length]; location.reload(); }}>Next hero</button>
  </div></div>;
}

export default function LandingV3Page() {
  return (
    <div className="lv3">
      {/* runs as the HTML streams in, before the hero paints: picks the hero variant and the logo pair */}
      <script dangerouslySetInnerHTML={{ __html: PICK_SCRIPT }} />
      <Review />
      <Hero />
      <div className="wrap"><div className="stats"><span><b>400+</b> Apps</span><span><b>5,000+</b> users</span><span><b>300+</b> public datasets</span><span><b>{pubsData.count}</b> publications with DOIs</span><span><b>nm → cm</b> scales</span><span>Free for researchers · funded by NIH, NSF, DoD, Kavli, Wellcome</span></div></div>
      <Scales />
      <Publications />
      <Apps />
      <People />
      <SiteFooter />
    </div>
  );
}
