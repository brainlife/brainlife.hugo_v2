/**
 * Geometric motifs: the fallback picture for any App, dataset or publication that has no media.
 *
 * Each motif is a few SVG primitives in a 160×90 box, keyed to a datatype or App family. Colours are
 * the CSS variables of the logo pair picked for the visit (`--lh`, `--rh`), so the whole set re-tints
 * with the page. The seed (a record id) only decides which colour leads and, for symmetric motifs,
 * whether the drawing is flipped — so a record keeps its picture across visits and shuffles.
 *
 * Pure functions returning markup: rendered on the server, no canvas, no effects. The same code
 * writes the static SVG files in public/brand/motifs/ (scripts/export-motifs.mjs).
 */

export const MOTIFS = [
  'em', 'lightsheet', 'oct', 'tracts', 'surface', 'matrix', 'fmri', 'meg',
  'anat', 'pipeline', 'qa', 'stats', 'table', 'zarr', 'generic',
] as const;
export type Motif = (typeof MOTIFS)[number];

export const MOTIF_LABEL: Record<Motif, string> = {
  em: 'Electron microscopy', lightsheet: 'Lightsheet microscopy', oct: 'PS-OCT', tracts: 'White-matter tracts',
  surface: 'Brain surface', matrix: 'Connectivity matrix', fmri: 'Functional map', meg: 'MEG · EEG',
  anat: 'Anatomical MRI', pipeline: 'Preprocessing', qa: 'Quality assurance', stats: 'Analysis · statistics',
  table: 'Tabular · derived', zarr: 'OME-Zarr volumes', generic: 'Data',
};

export const MOTIF_W = 160;
export const MOTIF_H = 90;

/** Motifs whose meaning survives a 180° turn; the seed may flip these. */
const SYMMETRIC: ReadonlySet<Motif> = new Set(['em', 'matrix', 'table', 'generic', 'tracts', 'zarr', 'lightsheet', 'surface']);

/** Picks a motif for a record from its title, tags and description. First match wins; order matters. */
export function pickMotif(text: string): Motif {
  const t = text.toLowerCase();
  if (/\b(eeg|meg|electrophys|ieeg)/.test(t)) return 'meg';
  if (/\b(fmri|functional|bold|opto|task)/.test(t)) return 'fmri';
  if (/\b(tract|diffusion|dwi|dmri|streamline|fascic|tractograph)/.test(t)) return 'tracts';
  if (/\b(connectom|network|matrix|graph)/.test(t)) return 'matrix';
  if (/\b(lightsheet|light-sheet|microscop|axon)/.test(t)) return 'lightsheet';
  if (/\b(electron|em volume|bossdb|x-ray|synap)/.test(t)) return 'em';
  if (/\b(oct|optical coherence|tracing)/.test(t)) return 'oct';
  if (/\b(zarr|ome|volume|chunk)/.test(t)) return 'zarr';
  if (/\b(surface|gifti|freesurfer|parcel|cortical|cortex)/.test(t)) return 'surface';
  if (/\b(qa|qc|quality|mriqc|report)/.test(t)) return 'qa';
  if (/\b(stat|regression|glm|model|analysis|measure)/.test(t)) return 'stats';
  if (/\b(csv|tsv|tabular|table|behavio|phenotyp)/.test(t)) return 'table';
  if (/\b(preproc|prep|pipeline|convert|bids|denois|correct)/.test(t)) return 'pipeline';
  if (/\b(t1|t2|anat|mri|structural|segment)/.test(t)) return 'anat';
  return 'generic';
}

/** FNV-1a hash → mulberry32, so the sequence is the same in Node and in the browser. */
function rngFrom(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  let s = h >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Ctx { a: string; b: string; r: () => number }

/** Style C: hairline strokes, with `filled` primitives as flat accents. */
function shape(el: string, col: string, filled: boolean): string {
  return filled
    ? el.replace('/>', ` fill="${col}" stroke="none"/>`)
    : el.replace('/>', ` fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`);
}

const f1 = (n: number) => n.toFixed(1);

const DRAW: Record<Motif, (c: Ctx) => string> = {
  em(c) { // honeycomb cluster
    const s = 14, out: string[] = [];
    for (let q = -3; q <= 3; q++) for (let r = -2; r <= 2; r++) {
      const x = 80 + s * 1.5 * q, y = 45 + s * Math.sqrt(3) * (r + q / 2);
      if (Math.hypot(x - 80, y - 45) > 44) continue;
      const pts = Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i; return `${f1(x + s * 0.92 * Math.cos(a))},${f1(y + s * 0.92 * Math.sin(a))}`; }).join(' ');
      const fill = c.r() < 0.25;
      out.push(shape(`<polygon points="${pts}"/>`, fill ? c.b : c.a, fill));
    }
    return out.join('');
  },
  lightsheet(c) { // stacked slabs
    const out: string[] = [];
    for (let i = 0; i < 5; i++) { const y = 18 + i * 13, x = 30 + i * 6; out.push(shape(`<path d="M${x} ${y} l70 0 l-14 9 l-70 0 z"/>`, i % 2 ? c.b : c.a, i === 2)); }
    return out.join('');
  },
  oct(c) { // concentric bands
    const out: string[] = [];
    for (let i = 1; i <= 4; i++) { const r1 = i * 13, r0 = r1 - 7; out.push(shape(`<path d="M${80 - r1} 86 A${r1} ${r1} 0 0 1 ${80 + r1} 86 L${80 + r0} 86 A${r0} ${r0} 0 0 0 ${80 - r0} 86 z"/>`, i % 2 ? c.a : c.b, i !== 3)); }
    return out.join('');
  },
  tracts(c) { // bundle of flat bands
    const out: string[] = [];
    for (let i = 0; i < 5; i++) { const y = 20 + i * 12, dy = (i - 2) * 4; out.push(shape(`<path d="M12 ${y + dy} C60 ${y - 16},100 ${y + 16},148 ${y - dy} l0 6 C100 ${y + 22},60 ${y - 10},12 ${y + dy + 6} z"/>`, i < 3 ? c.a : c.b, i !== 1)); }
    return out.join('');
  },
  surface(c) { // triangulated mesh
    const out: string[] = [], rows = 3, cols = 7;
    const P = (i: number, j: number): [number, number] => [26 + j * 18 + (i % 2 ? 9 : 0), 22 + i * 23 + (j % 2 ? 3 : -3)];
    for (let i = 0; i < rows - 1; i++) for (let j = 0; j < cols - 1; j++) {
      const [x1, y1] = P(i, j), [x2, y2] = P(i, j + 1), [x3, y3] = P(i + 1, j), [x4, y4] = P(i + 1, j + 1);
      const f = (i + j) % 5 === 2;
      out.push(shape(`<path d="M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} z"/>`, f ? c.b : c.a, f));
      out.push(shape(`<path d="M${x2} ${y2} L${x4} ${y4} L${x3} ${y3} z"/>`, c.a, false));
    }
    return out.join('');
  },
  matrix(c) { // symmetric grid of squares
    const out: string[] = [], n = 6, s = 10, x0 = 80 - (n * s) / 2, y0 = 45 - (n * s) / 2;
    const v = Array.from({ length: n * n }, () => c.r());
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const t = i === j ? 1 : v[Math.min(i, j) * n + Math.max(i, j)];
      if (t < 0.35) continue;
      out.push(shape(`<rect x="${x0 + j * s + 1}" y="${y0 + i * s + 1}" width="${s - 2}" height="${s - 2}"/>`, t > 0.75 ? c.b : c.a, t > 0.55));
    }
    return out.join('');
  },
  fmri(c) { // lattice with a cluster
    const out: string[] = [];
    for (let i = 0; i < 5; i++) for (let j = 0; j < 9; j++) {
      const hot = Math.hypot(j - 5.5, i - 1.6) < 1.9;
      out.push(shape(`<circle cx="${32 + j * 12}" cy="${21 + i * 12}" r="${hot ? 4.6 : 2.4}"/>`, hot ? c.b : c.a, hot));
    }
    return out.join('');
  },
  meg(c) { // sensors on two arcs
    const out: string[] = [];
    for (const [R, n, col, r] of [[48, 13, c.a, 3.4], [32, 9, c.b, 2.6]] as [number, number, string, number][]) {
      for (let i = 0; i < n; i++) { const a = Math.PI + (Math.PI * i) / (n - 1); out.push(shape(`<circle cx="${f1(80 + R * Math.cos(a))}" cy="${f1(70 + R * 0.95 * Math.sin(a))}" r="${r}"/>`, col, true)); }
    }
    return out.join('');
  },
  anat(c) { // stack of slices
    const out: string[] = [];
    for (let i = 4; i >= 0; i--) out.push(shape(`<ellipse cx="80" cy="${18 + i * 13.5}" rx="38" ry="7"/>`, i === 2 ? c.b : c.a, i === 2 || i === 4));
    return out.join('');
  },
  pipeline(c) { // steps in a pipeline
    const out: string[] = [];
    for (let i = 0; i < 4; i++) {
      const x = 22 + i * 34;
      if (i) out.push(shape(`<path d="M${x - 10} 45 l10 0"/>`, c.a, false));
      out.push(shape(`<rect x="${x}" y="33" width="24" height="24" rx="6"/>`, i === 2 ? c.b : c.a, i === 2 || i === 0));
    }
    return out.join('');
  },
  qa(c) { // two rulers
    const out: string[] = [];
    for (let i = 0; i <= 20; i++) {
      const x = 20 + i * 6;
      out.push(shape(`<path d="M${x} 36 l0 ${i % 5 ? 6 : 14}"/>`, c.a, false));
      out.push(shape(`<path d="M${x} 66 l0 ${-(i % 10 ? 4 : 10)}"/>`, c.b, false));
    }
    out.push(shape('<path d="M20 36 l120 0"/>', c.a, false), shape('<path d="M20 66 l120 0"/>', c.b, false));
    return out.join('');
  },
  stats(c) { // bars
    return [20, 34, 52, 60, 44, 30, 16].map((h, i) => shape(`<rect x="${30 + i * 15}" y="${75 - h}" width="10" height="${h}"/>`, i === 3 ? c.b : c.a, i === 3)).join('');
  },
  table(c) { // rows of pills
    const out: string[] = [];
    [[22, 40, 18, 30], [36, 18, 40, 16], [18, 44, 20, 28], [30, 22, 34, 24]].forEach((row, i) => {
      let x = 22;
      row.forEach((w, j) => { out.push(shape(`<rect x="${x}" y="${18 + i * 16}" width="${w}" height="9" rx="4.5"/>`, i === 1 && j === 2 ? c.b : c.a, !(i === 2 && j === 1))); x += w + 6; });
    });
    return out.join('');
  },
  zarr(c) { // chunked slab
    const out: string[] = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const x = 36 + j * 22 + i * 10, y = 22 + i * 16; out.push(shape(`<path d="M${x} ${y} l18 0 l6 10 l-18 0 z"/>`, (i + j) % 3 === 1 ? c.b : c.a, !(i === 1 && j === 2))); }
    return out.join('');
  },
  generic(c) { // four discs
    return shape('<circle cx="62" cy="36" r="16"/>', c.a, true) + shape('<circle cx="98" cy="36" r="16"/>', c.b, false)
      + shape('<circle cx="62" cy="64" r="10"/>', c.a, false) + shape('<circle cx="98" cy="64" r="10"/>', c.b, true);
  },
};

/**
 * Inner SVG markup for a motif (put inside `<svg viewBox="0 0 160 90">`).
 * `colors` defaults to the page's logo-pair variables; pass literal colours for a static file.
 */
export function motifMarkup(kind: Motif, seed: string, colors: [string, string] = ['var(--lh)', 'var(--rh)']): string {
  const r = rngFrom(seed);
  const swap = r() < 0.5;
  const flip = SYMMETRIC.has(kind) && r() < 0.4;
  const c: Ctx = { a: swap ? colors[1] : colors[0], b: swap ? colors[0] : colors[1], r };
  const body = DRAW[kind](c);
  return flip ? `<g transform="rotate(180 80 45)">${body}</g>` : body;
}

/** A complete standalone SVG document, for files and for use outside this site. */
export function motifSvg(kind: Motif, seed: string, colors: [string, string], ground = '#0b1f2d'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MOTIF_W} ${MOTIF_H}" role="img" aria-label="${MOTIF_LABEL[kind]}">`
    + `<rect width="${MOTIF_W}" height="${MOTIF_H}" fill="${ground}"/>${motifMarkup(kind, seed, colors)}</svg>\n`;
}
