#!/usr/bin/env node
/**
 * Fetches the data the landing page shows from the brainlife APIs and writes it to
 * public/landing-data/ so the static export never calls the API at page load.
 *
 *   node scripts/fetch-landing-data.mjs            # refresh JSON + media
 *   node scripts/fetch-landing-data.mjs --no-media # JSON only (fast)
 *
 * Outputs
 *   public/landing-data/pubs.json    publications with authors, DOI, tags and media
 *   public/landing-data/apps.json    most-used Apps with maintainers and counts
 *   public/landing-data/people.json  authors of the most recent publications
 *   public/landing-data/media/*.jpg  content-aware 16:9 thumbnails (banners, video posters)
 *
 * Media sources, in order: pub.bannerImage, groups[].videoPlaylist[] (first frame via ffmpeg,
 * if ffmpeg is installed), groups[].viewerLinks[] are counted but not rendered.
 * On any failure the previous files are kept, so a flaky API never breaks a deploy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'landing-data');
const mediaDir = path.join(outDir, 'media');
const API = 'https://brainlife.io/api';
const WANT_MEDIA = !process.argv.includes('--no-media');
const PUB_SITE = 'https://connects.brainlife.io/publications/';

fs.mkdirSync(mediaDir, { recursive: true });

async function getJSON(url) {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}
const enc = (o) => encodeURIComponent(JSON.stringify(o));
const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const name = (u) => (u && (u.fullname || u.username)) || '';
const inst = (u) => (u && u.profile && u.profile.public && u.profile.public.institution) || '';

let sharp = null;
try { sharp = (await import('sharp')).default; } catch { console.warn('sharp not installed: thumbnails will be copied uncropped'); }
let hasFfmpeg = false;
try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); hasFfmpeg = true; } catch { console.warn('ffmpeg not found: video posters skipped'); }

/** Content-aware 16:9 crop: find the non-background bounding box, crop a window centred on it,
 *  or letterbox on a blurred copy when the content is much wider/taller than 16:9. */
async function fitThumb(inputBuffer, outPath, ratio = 16 / 9, W = 960) {
  if (!sharp) { fs.writeFileSync(outPath, inputBuffer); return; }
  const img = sharp(inputBuffer).rotate();
  const meta = await img.metadata();
  const sw = Math.min(320, meta.width), sh = Math.round(meta.height * sw / meta.width);
  const { data } = await img.clone().resize(sw, sh).raw().toBuffer({ resolveWithObject: true });
  const px = (i, j) => { const o = (j * sw + i) * 3; return [data[o], data[o + 1], data[o + 2]]; };
  const corners = [px(0, 0), px(sw - 1, 0), px(0, sh - 1), px(sw - 1, sh - 1)];
  const bg = [0, 1, 2].map(k => corners.map(c => c[k]).sort((a, b) => a - b)[1]);
  let minx = sw, miny = sh, maxx = 0, maxy = 0;
  for (let j = 0; j < sh; j++) for (let i = 0; i < sw; i++) {
    const p = px(i, j); const diff = Math.abs(p[0] - bg[0]) + Math.abs(p[1] - bg[1]) + Math.abs(p[2] - bg[2]);
    if (diff > 60) { if (i < minx) minx = i; if (i > maxx) maxx = i; if (j < miny) miny = j; if (j > maxy) maxy = j; }
  }
  if (maxx <= minx || maxy <= miny) { minx = 0; miny = 0; maxx = sw - 1; maxy = sh - 1; }
  const sc = meta.width / sw;
  const bx = minx * sc, by = miny * sc, bw = (maxx - minx + 1) * sc, bh = (maxy - miny + 1) * sc;
  const bbr = bw / bh, H = Math.round(W / ratio), pad = 1.08;
  if (bbr > ratio * 1.9 || bbr < ratio / 1.9) {
    const back = await sharp(inputBuffer).rotate().resize(W, H, { fit: 'cover' }).blur(18).modulate({ brightness: 0.45 }).toBuffer();
    const s3 = Math.min(W / (bw * pad), H / (bh * pad));
    const fg = await sharp(inputBuffer).rotate().extract({ left: Math.round(bx), top: Math.round(by), width: Math.round(bw), height: Math.round(bh) })
      .resize(Math.round(bw * s3), Math.round(bh * s3)).toBuffer();
    await sharp(back).composite([{ input: fg, gravity: 'centre' }]).jpeg({ quality: 84 }).toFile(outPath);
  } else {
    let cw, ch; if (bbr > ratio) { cw = bw * pad; ch = cw / ratio; } else { ch = bh * pad; cw = ch * ratio; }
    cw = Math.min(cw, meta.width); ch = Math.min(ch, meta.height);
    const cx = bx + bw / 2, cy = by + bh / 2;
    const left = Math.round(Math.max(0, Math.min(meta.width - cw, cx - cw / 2)));
    const top = Math.round(Math.max(0, Math.min(meta.height - ch, cy - ch / 2)));
    await sharp(inputBuffer).rotate().extract({ left, top, width: Math.round(cw), height: Math.round(ch) }).resize(W, H).jpeg({ quality: 84 }).toFile(outPath);
  }
}

async function fetchImage(url) {
  const r = await fetch(url); if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}
function videoFrame(url, seconds = 2) {
  const tmp = path.join(mediaDir, `.frame-${Date.now()}.jpg`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(seconds), '-i', url, '-frames:v', '1', '-q:v', '3', tmp], { stdio: 'ignore', timeout: 60000 });
  const buf = fs.readFileSync(tmp); fs.unlinkSync(tmp); return buf;
}

async function publications() {
  const list = await getJSON(`${API}/warehouse/pub?limit=500&sort=-create_date&populate=groups.apps&deref_contacts=true`);
  const pubs = [];
  for (const p of list.pubs.filter(p => !p.removed)) {
    const groups = p.groups || [];
    const videos = [...new Set(groups.flatMap(g => (g.videoPlaylist || []).map(v => v.url)).filter(Boolean))];
    const viewers = groups.flatMap(g => g.viewerLinks || []).length;
    const slug = p.slug || p._id;
    const id = slugify(p.doi || slug);
    const rec = {
      id, slug, name: p.name, doi: p.doi || '', date: (p.create_date || '').slice(0, 10), tags: p.tags || [],
      desc: (p.desc || '').replace(/\s+/g, ' ').trim().slice(0, 300),
      authors: (p.authors || []).map(name).filter(Boolean),
      institutions: [...new Set((p.authors || []).map(inst).filter(Boolean))].slice(0, 4),
      url: PUB_SITE + encodeURIComponent(slug),
      video: videos[0] || null, videos: videos.length, viewers,
      banner: p.bannerImage || null, thumb: null,
    };
    if (WANT_MEDIA) {
      const out = path.join(mediaDir, `${id}.jpg`);
      try {
        if (rec.banner) { await fitThumb(await fetchImage(rec.banner), out); rec.thumb = `/landing-data/media/${id}.jpg`; }
        else if (rec.video && hasFfmpeg) { await fitThumb(videoFrame(rec.video), out); rec.thumb = `/landing-data/media/${id}.jpg`; }
      } catch (e) { console.warn(`media skipped for ${p.name}: ${e.message}`); if (fs.existsSync(out)) rec.thumb = `/landing-data/media/${id}.jpg`; }
    } else if (fs.existsSync(path.join(mediaDir, `${id}.jpg`))) rec.thumb = `/landing-data/media/${id}.jpg`;
    pubs.push(rec);
  }
  return pubs;
}

async function apps() {
  const list = await getJSON(`${API}/warehouse/app?find=${enc({ removed: false, projects: { $size: 0 } })}&sort=-stats.requested&limit=120&select=name desc github tags stats admins avatar`);
  // one card per GitHub repo, keep the most-requested variant
  const byRepo = new Map();
  for (const a of list.apps) { const k = a.github; if (!k) continue; if (!byRepo.has(k) || (a.stats?.requested || 0) > (byRepo.get(k).stats?.requested || 0)) byRepo.set(k, a); }
  const picked = [...byRepo.values()].slice(0, 16);
  const subs = [...new Set(picked.flatMap(a => (a.admins || []).map(Number)).filter(n => !Number.isNaN(n)))];
  let profiles = [];
  try { profiles = (await getJSON(`${API}/auth/profile/list?find=${enc({ sub: { $in: subs } })}&limit=200`)).profiles || []; } catch (e) { console.warn('profiles unavailable: ' + e.message); }
  const who = new Map(profiles.map(pr => [String(pr.sub), { name: name(pr), institution: inst(pr) }]));
  const out = [];
  for (const a of picked) {
    const id = slugify(a.github);
    const rec = {
      id, name: a.name.replace(/\s*-\s*(deprecated|old).*$/i, ''), repo: a.github, tags: a.tags || [], desc: (a.desc || '').replace(/\s+/g, ' ').trim().slice(0, 200),
      runs: a.stats?.requested || 0, users: a.stats?.users || 0,
      maintainers: (a.admins || []).map(s => who.get(String(s))).filter(Boolean),
      avatar: a.avatar || null, thumb: null,
    };
    if (WANT_MEDIA && rec.avatar) {
      const outPath = path.join(mediaDir, `app-${id}.jpg`);
      try { await fitThumb(await fetchImage(rec.avatar), outPath, 2, 720); rec.thumb = `/landing-data/media/app-${id}.jpg`; }
      catch (e) { console.warn(`avatar skipped for ${a.name}: ${e.message}`); }
    } else if (fs.existsSync(path.join(mediaDir, `app-${id}.jpg`))) rec.thumb = `/landing-data/media/app-${id}.jpg`;
    out.push(rec);
  }
  return out;
}

function people(pubs) {
  const seen = new Map();
  for (const p of pubs.slice(0, 15)) for (const a of p.authors) if (!seen.has(a)) seen.set(a, { name: a, pub: p.name });
  return [...seen.values()].slice(0, 24);
}

try {
  const pubs = await publications();
  const appList = await apps();
  fs.writeFileSync(path.join(outDir, 'pubs.json'), JSON.stringify({ fetched: new Date().toISOString(), count: pubs.length, pubs }, null, 1));
  fs.writeFileSync(path.join(outDir, 'apps.json'), JSON.stringify({ fetched: new Date().toISOString(), apps: appList }, null, 1));
  fs.writeFileSync(path.join(outDir, 'people.json'), JSON.stringify({ fetched: new Date().toISOString(), people: people(pubs) }, null, 1));
  console.log(`landing data: ${pubs.length} publications (${pubs.filter(p => p.thumb).length} with thumbnails), ${appList.length} apps`);
} catch (e) {
  console.error('landing data refresh failed, keeping previous files:', e.message);
  process.exitCode = fs.existsSync(path.join(outDir, 'pubs.json')) ? 0 : 1;
}
