import { D } from './draw';
import type { Art, HeroArt } from './types';

export type Drawer = (el: HTMLElement, width: number, height: number, seed: number, small: boolean) => void;

/**
 * Typed facade over the untyped registry in draw.ts. Adding a name to the Art union without a
 * drawer fails here at compile time instead of throwing on mount.
 */
export const DRAWERS: Record<Art | HeroArt, Drawer> = {
  em: D.em, lightsheet: D.lightsheet, oct: D.oct, tracts: D.tracts,
  surface: D.surface, matrix: D.matrix, fmri: D.fmri, meg: D.meg,
  field: D.field, lens: D.lens, ruler: D.ruler,
};

/** Stable small integer from a string, so a record keeps the same drawing across shuffles. */
export function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0) % 100000;
}
