import { MOTIF_H, MOTIF_W, motifMarkup, type Motif } from '@/lib/landing/motifs';

/**
 * One geometric motif (lib/landing/motifs.ts), rendered on the server as inline SVG.
 * Colours are the page's `--lh` / `--rh` variables, so it follows the logo pair.
 * `square` crops the 16:9 drawing to its centre for square tiles.
 */
export default function MotifArt({ kind, seed, square = false, className }: {
  kind: Motif; seed: string; square?: boolean; className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${MOTIF_W} ${MOTIF_H}`}
      preserveAspectRatio={square ? 'xMidYMid slice' : 'xMidYMid meet'}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: motifMarkup(kind, seed) }}
    />
  );
}
