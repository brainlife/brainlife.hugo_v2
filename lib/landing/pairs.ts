/**
 * Logo colour pairs. One is picked per page load; the site's accent colours follow it.
 * [name, left hemisphere, right hemisphere, accent on light surfaces, accent on dark surfaces, ink on the dark accent]
 */
export type Pair = { name: string; left: string; right: string; accentLight: string; accentDark: string; accentDarkInk: string };

export const PAIRS: Pair[] = [
  { name: 'blue · teal', left: '#005981', right: '#2ab0a0', accentLight: '#005981', accentDark: '#2ab0a0', accentDarkInk: '#0b1a24' },
  { name: 'red · orange', left: '#a9262c', right: '#e57536', accentLight: '#a9262c', accentDark: '#e57536', accentDarkInk: '#0b1a24' },
  { name: 'orange · yellow', left: '#e57536', right: '#f9c926', accentLight: '#c95a1f', accentDark: '#f9c926', accentDarkInk: '#0b1a24' },
  { name: 'teal · yellow', left: '#2ab0a0', right: '#f9c926', accentLight: '#1c8a7d', accentDark: '#f9c926', accentDarkInk: '#0b1a24' },
  { name: 'light blue · orange', left: '#3b9fd0', right: '#e57536', accentLight: '#c95a1f', accentDark: '#3b9fd0', accentDarkInk: '#0b1a24' },
];

export const HERO_VARIANTS = ['field', 'lens', 'ruler'] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

/** Inline script run before first paint so the chosen pair and hero never flash. */
export const PICK_SCRIPT = `(function(){try{var P=${JSON.stringify(PAIRS)};var H=${JSON.stringify(HERO_VARIANTS)};
var h=(location.hash||'').slice(1);var hero=H.indexOf(h)>=0?h:(Math.random()<0.5?'lens':H[Math.floor(Math.random()*H.length)]);if(hero==='ruler'&&window.innerWidth<760)hero='lens';
var q=new URLSearchParams(location.search).get('pair');var pair=P.find(function(p){return p.name.replace(/[^a-z]/g,'')===String(q||'').replace(/[^a-z]/g,'');})||P[Math.floor(Math.random()*P.length)];
var r=document.documentElement.style;r.setProperty('--lh',pair.left);r.setProperty('--rh',pair.right);r.setProperty('--accent-light',pair.accentLight);r.setProperty('--accent-dark',pair.accentDark);r.setProperty('--accent-dark-ink',pair.accentDarkInk);
window.__bl={pair:pair,hero:hero};}catch(e){}})();`;

export function applyPair(p: Pair) {
  const r = document.documentElement.style;
  r.setProperty('--lh', p.left); r.setProperty('--rh', p.right);
  r.setProperty('--accent-light', p.accentLight); r.setProperty('--accent-dark', p.accentDark); r.setProperty('--accent-dark-ink', p.accentDarkInk);
}
