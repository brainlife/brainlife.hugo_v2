import LandingPage from '@/features/Landing/LandingPage';
import ChakraProvider from '@/components/ChakraProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brainlife.io — Open, Cloud-based Neuroimaging Analysis Platform',
    description: 'A free and open-source cloud platform for secure, reproducible neuroimaging research and high-performance computing.',
};

export default function Home() {
    return (
        <ChakraProvider>
            <LandingPage />
        </ChakraProvider>
    );
}
