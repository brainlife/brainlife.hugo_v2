#!/usr/bin/env node
/** Checks public/landing-data/*.json against the shapes in lib/landing/types.ts, so a bad API change fails the build loudly. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'landing-data');
const errors = [];
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const expect = (cond, msg) => { if (!cond) errors.push(msg); };
const isStr = (v) => typeof v === 'string';

const pubs = read('pubs.json');
expect(Array.isArray(pubs.pubs) && pubs.pubs.length > 0, 'pubs.json: no publications');
expect(Number.isInteger(pubs.count) && pubs.count >= pubs.pubs.length, 'pubs.json: count must be the API total (>= records shown)');
expect(new Set(pubs.pubs.map(p => p.id)).size === pubs.pubs.length, 'pubs.json: duplicate ids');
for (const p of pubs.pubs) {
  expect(isStr(p.id) && isStr(p.name) && isStr(p.url), `pub ${p.id}: id/name/url`);
  expect(Array.isArray(p.authors) && Array.isArray(p.tags) && Array.isArray(p.institutions), `pub ${p.id}: arrays`);
  expect(p.thumb === null || (isStr(p.thumb) && fs.existsSync(path.join(dir, '..', p.thumb))), `pub ${p.id}: thumb file missing (${p.thumb})`);
  expect(p.video === null || /^https:\/\//.test(p.video), `pub ${p.id}: video must be https`);
}
const withMedia = pubs.pubs.filter(p => p.thumb || p.video).length;
expect(withMedia >= 1, 'pubs.json: no publication has media; the carousel would be all placeholders');

const apps = read('apps.json');
expect(Array.isArray(apps.apps) && apps.apps.length >= 6, 'apps.json: fewer than 6 apps');
for (const a of apps.apps) {
  expect(isStr(a.id) && isStr(a.name) && /^[\w.-]+\/[\w.-]+$/.test(a.repo), `app ${a.id}: id/name/repo`);
  expect(Array.isArray(a.maintainers), `app ${a.id}: maintainers`);
  expect(a.thumb === null || fs.existsSync(path.join(dir, '..', a.thumb)), `app ${a.id}: thumb file missing`);
}
// Accent colours must stay readable as small text on the light ground.
const pairsSrc = fs.readFileSync(path.join(dir, '..', '..', 'lib', 'landing', 'pairs.ts'), 'utf8');
const lum = (hex) => { const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
for (const m of pairsSrc.matchAll(/name: '([^']+)'[^\n]*accentLight: '(#[0-9a-f]{6})'/g)) {
  const ratio = contrast(m[2], '#f7f8f6');
  expect(ratio >= 4.5, `pair "${m[1]}": accentLight ${m[2]} is ${ratio.toFixed(2)}:1 on the light ground (need 4.5:1)`);
}

const people = read('people.json');
expect(Array.isArray(people.people) && people.people.length > 0, 'people.json: empty');

if (errors.length) { console.error('landing data invalid:\n - ' + errors.join('\n - ')); process.exit(1); }
console.log(`landing data ok: ${pubs.pubs.length} publications (${withMedia} with media), ${apps.apps.length} apps, ${people.people.length} people`);
