import { MOTIF_H, MOTIF_W, motifMarkup, type Motif } from '@/lib/landing/motifs';

/**
 * One geometric motif (lib/landing/motifs.ts), rendered on the server as inline SVG.
 * Colours are the page's `--lh` / `--rh` variables, so it follows the logo pair.
 * The motif is drawn at a constant size (`--motif-w` in landing-v3.css), centred in its box,
 * whatever the box's size or aspect — an icon on a ground, not a picture filling a frame.
 */
export default function MotifArt({ kind, seed }: { kind: Motif; seed: string }) {
  return (
    <svg
      className="motif"
      viewBox={`0 0 ${MOTIF_W} ${MOTIF_H}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: motifMarkup(kind, seed) }}
    />
  );
}
