import LandingV3Page from '@/features/LandingV3/LandingV3Page';
import type { Metadata } from 'next';
import { getAssetPath } from '@/lib/basePath';

const title = 'brainlife.io · Brain data across scales';
const description = 'Open platform to analyze, share and publish brain data across scales: electron and light microscopy, PS-OCT, MRI, fMRI, EEG and MEG. Reproducible Apps on shared supercomputers, results in the browser, publications with DOIs.';

export const metadata: Metadata = {
    title,
    description,
    openGraph: { title, description, images: [getAssetPath('/og-image.png')] },
};

export default function Home() {
    return <LandingV3Page />;
}
