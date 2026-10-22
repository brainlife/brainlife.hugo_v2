import { D } from './draw';
import type { HeroArt } from './types';

export type Drawer = (el: HTMLElement, width: number, height: number, seed: number, small: boolean) => void;

/**
 * Typed facade over the untyped registry in draw.ts. Adding a hero variant without a drawer
 * fails here at compile time instead of throwing on mount.
 */
export const DRAWERS: Record<HeroArt, Drawer> = { field: D.field, lens: D.lens, ruler: D.ruler };

