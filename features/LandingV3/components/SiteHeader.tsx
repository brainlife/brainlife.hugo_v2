import { EXTERNAL_LINKS } from '@/lib/constants';
import { getAssetPath } from '@/lib/basePath';
import { NAV, LABELS } from '@/lib/landing/content';
import BrandMark from './BrandMark';

export default function SiteHeader() {
  return (
    <div className="site">
      <a className="brand" href={getAssetPath('/')} aria-label="brainlife.io home">
        <BrandMark /><span>brainlife<i>.io</i></span>
      </a>
      <nav className="nav" aria-label="Primary">
        {NAV.map(n => <a key={n.label} href={n.href}>{n.label}</a>)}
        <a className="btn" href={EXTERNAL_LINKS.PORTAL}>{LABELS.signIn}</a>
      </nav>
    </div>
  );
}
