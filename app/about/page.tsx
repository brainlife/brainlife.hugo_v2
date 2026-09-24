import TeamPage from '@/features/Team/TeamPage';
import ChakraProvider from '@/components/ChakraProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Brainlife.io — Mission, Story & Team',
    description:
        'Brainlife.io is a free, open-source cloud computing platform for reproducible neuroscience. Learn about our mission, platform history, leadership, and global community.',
};

export default function AboutPageRoute() {
    return (
        <ChakraProvider>
            <TeamPage />
        </ChakraProvider>
    );
}

