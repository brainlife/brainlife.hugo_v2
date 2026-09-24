import MobilePage from '@/features/Mobile/MobilePage';
import ChakraProvider from '@/components/ChakraProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brainlife Mobile — Neuroimaging Research on the Go',
    description:
        'Access your neuroimaging data, monitor supercomputing pipelines in real-time, and stay connected with your lab from iOS and Android devices.',
};

export default function MobilePageRoute() {
    return (
        <ChakraProvider>
            <MobilePage />
        </ChakraProvider>
    );
}
