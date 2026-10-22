import type { Art } from './types';

/** Picks a stylised fallback drawing for a record with no media, from its title, tags and description. */
export function pickArt(text: string): Art {
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

/** Fisher–Yates shuffle, returns a copy. */
export function shuffled<T>(items: T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const formatCount = (n: number) => n.toLocaleString('en-US');
