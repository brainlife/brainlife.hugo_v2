// Writes the geometric motifs as standalone SVG files, one per family and logo pair, into
// public/brand/motifs/, so the main brainlife.io app (or anything else) can use the same set.
//   npm run brand:motifs
// Source of truth is lib/landing/motifs.ts; this only renders it.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MOTIFS, motifSvg } from '../lib/landing/motifs.ts';
import { PAIRS } from '../lib/landing/pairs.ts';

const slug = (p) => p.name.replace(/[^a-z]/g, '');
const out = join(import.meta.dirname, '..', 'public', 'brand', 'motifs');
mkdirSync(out, { recursive: true });

let n = 0;
for (const pair of PAIRS) {
  for (const kind of MOTIFS) {
    writeFileSync(join(out, `${kind}-${slug(pair)}.svg`), motifSvg(kind, kind, [pair.left, pair.right]));
    n++;
  }
}
writeFileSync(join(out, 'README.md'), `# Motifs

${MOTIFS.length} geometric motifs × ${PAIRS.length} logo pairs, generated from \`lib/landing/motifs.ts\` by
\`npm run brand:motifs\`. Do not edit these files by hand; change the source and re-run.

File name: \`<motif>-<pair>.svg\`, 160×90, dark ground. Motifs: ${MOTIFS.join(', ')}.
Pairs: ${PAIRS.map(slug).join(', ')}.
`);
console.log(`wrote ${n} motifs to public/brand/motifs/`);
