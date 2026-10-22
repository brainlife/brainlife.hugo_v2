import { LABELS } from '@/lib/landing/content';

/** Previous/next buttons plus the auto-advance toggle shared by all carousels. */
export default function CarouselArrows({ by, playing, toggle, what }: { by: (d: number) => void; playing: boolean; toggle: () => void; what: string }) {
  return (
    <div className="arrows">
      <button type="button" onClick={toggle} aria-pressed={!playing} aria-label={playing ? LABELS.pause : LABELS.play} className="pausebtn">{playing ? '❚❚' : '▶'}</button>
      <button type="button" onClick={() => by(-1)} aria-label={`Previous ${what}`}>←</button>
      <button type="button" onClick={() => by(1)} aria-label={`Next ${what}`}>→</button>
    </div>
  );
}
