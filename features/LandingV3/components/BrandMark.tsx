import { BRAND_MARK_INNER, BRAND_VIEWBOX } from '@/lib/landing/brandMark';

/**
 * The brain-tree mark. Hemisphere colours come from the CSS variables --lh / --rh, which the
 * pick script sets from the logo pair of the day (lib/landing/pairs.ts). `light` hides the white
 * gyral outline for use on pale backgrounds.
 */
export default function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <svg className={light ? 'mark light' : 'mark'} viewBox={BRAND_VIEWBOX} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: BRAND_MARK_INNER }} />
  );
}
