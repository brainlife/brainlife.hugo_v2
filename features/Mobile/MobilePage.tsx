'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import MobileHeroSection from './components/MobileHeroSection';
import MobileAboutSection from './components/MobileAboutSection';
import MobileResearchHubSection from './components/MobileResearchHubSection';
import MobileNotificationSection from './components/MobileNotificationSection';
import MobileProjectsShowcase from './components/MobileProjectsShowcase';
import MobileHowItWorksSection from './components/MobileHowItWorksSection';
import MobileFaqSection from './components/MobileFaqSection';
import MobileDownloadCtaSection from './components/MobileDownloadCtaSection';

export default function MobilePage() {
    return (
        <Box
            minHeight="100vh"
            position="relative"
            color="white"
            bg="#0e1626"
            overflowX="clip"
        >
            {/* STICKY HEADER NAVBAR */}
            <Navbar />

            {/* HERO SECTION WITH 3D PHONE MOCKUP */}
            <MobileHeroSection />

            {/* ABOUT US / WHY BRAINLIFE MOBILE (EXACT REFERENCE DESIGN) */}
            <MobileAboutSection />

            {/* RESEARCH HUB & BIDS BROWSER */}
            <MobileResearchHubSection />

            {/* REAL-TIME NOTIFICATIONS */}
            <MobileNotificationSection />

            {/* PROJECTS & DATASET MANAGEMENT SHOWCASE */}
            <MobileProjectsShowcase />

            {/* HOW IT WORKS 4-STEP GUIDE */}
            <MobileHowItWorksSection />

            {/* FREQUENTLY ASKED QUESTIONS */}
            <MobileFaqSection />

            {/* DOWNLOAD CTA BANNER */}
            <MobileDownloadCtaSection />
        </Box>
    );
}
