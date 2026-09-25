'use client';

import { redirectToBrainlifeLogin } from '@/contexts/AuthContext.helpers';
import NextLink from 'next/link';
import Navbar from '@/components/Navbar';
import NewProjectModal from '@/components/NewProjectModal';
import HeroVisualStage from './HeroVisualStage';
import HorizontalPipelineSection from './HorizontalPipelineSection';
import ExpandingReelSection from './ExpandingReelSection';
import ProudProductsSection from './ProudProductsSection';
import SponsorsInfrastructureSection from './SponsorsInfrastructureSection';
import TestimonialsSection from './TestimonialsSection';
import EcosystemSection from './EcosystemSection';
import { Radio, Layers, ShieldCheck, Plus, LogIn } from 'lucide-react';
import { Box, Button, Container, Flex, Stack, Text, Heading, Image, Link } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MotionBox = motion.create(Box);

const NSFLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <svg viewBox="0 0 24 24" width="22px" height="22px" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="12" r="10" stroke="currentColor" />
            <polygon points="12,4 19,16 5,16" stroke="currentColor" fill="none" strokeWidth="1.2" />
        </svg>
        <Box textAlign="left" lineHeight="1.1">
            <Text
                fontSize="12px"
                fontWeight="800"
                letterSpacing="0.05em"
                color="white"
                fontFamily="'Inter', sans-serif"
            >
                NSF
            </Text>
            <Text fontSize="8px" color="#94a3b8" fontWeight="500" fontFamily="'Inter', sans-serif">
                National Science
                <br />
                Foundation
            </Text>
        </Box>
    </Flex>
);

const UTAustinLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <Box textAlign="left" lineHeight="1">
            <Text fontSize="12px" fontWeight="800" letterSpacing="0.02em" color="white" fontFamily="Georgia, serif">
                UT Austin
            </Text>
            <Text
                fontSize="7.5px"
                fontWeight="600"
                letterSpacing="0.08em"
                color="#94a3b8"
                textTransform="uppercase"
                fontFamily="'Inter', sans-serif"
            >
                Texas Neuroscience
            </Text>
        </Box>
    </Flex>
);

const IndianaUnivLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <Box textAlign="left" lineHeight="1">
            <Text fontSize="12px" fontWeight="800" letterSpacing="0.02em" color="white" fontFamily="Georgia, serif">
                Indiana University
            </Text>
            <Text
                fontSize="7.5px"
                fontWeight="600"
                letterSpacing="0.08em"
                color="#94a3b8"
                textTransform="uppercase"
                fontFamily="'Inter', sans-serif"
            >
                Bloomington
            </Text>
        </Box>
    </Flex>
);

const NIHLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <svg viewBox="0 0 40 24" width="34px" height="20px" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 4 12 L 20 2 L 36 12 L 20 22 Z" stroke="currentColor" strokeWidth="1.8" />
            <path d="M 14 12 H 26 M 20 6 V 18" stroke="currentColor" strokeWidth="1" opacity={0.5} />
        </svg>
        <Box textAlign="left" lineHeight="1.1">
            <Text
                fontSize="12px"
                fontWeight="800"
                letterSpacing="0.05em"
                color="white"
                fontFamily="'Inter', sans-serif"
            >
                NIH
            </Text>
            <Text fontSize="8px" color="#94a3b8" fontWeight="500" fontFamily="'Inter', sans-serif">
                National Institutes
                <br />
                of Health
            </Text>
        </Box>
    </Flex>
);

const StanfordLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <svg viewBox="0 0 24 28" width="20px" height="24px" fill="currentColor">
            <path
                d="M 12 2 C 18 2 22 4 22 10 C 22 18 16 23 12 26 C 8 23 2 18 2 10 C 2 4 6 2 12 2 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path d="M 12 6 L 8 18 H 16 Z M 12 18 V 20" />
        </svg>
        <Box textAlign="left" lineHeight="1">
            <Text fontSize="12px" fontWeight="700" letterSpacing="-0.02em" color="white" fontFamily="Georgia, serif">
                Stanford
            </Text>
            <Text
                fontSize="9px"
                fontWeight="700"
                letterSpacing="0.12em"
                color="#94a3b8"
                textTransform="uppercase"
                fontFamily="'Inter', sans-serif"
            >
                Medicine
            </Text>
        </Box>
    </Flex>
);

const MITLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <svg viewBox="0 0 32 24" width="28px" height="21px" fill="currentColor">
            <rect x="0" y="4" width="4" height="20" />
            <rect x="7" y="4" width="4" height="12" />
            <rect x="14" y="4" width="4" height="20" />
            <rect x="21" y="4" width="4" height="20" />
            <rect x="28" y="4" width="4" height="20" />
            <rect x="7" y="20" width="11" height="4" />
        </svg>
        <Box textAlign="left" lineHeight="1.1">
            <Text
                fontSize="8px"
                fontWeight="700"
                color="white"
                textTransform="uppercase"
                letterSpacing="0.02em"
                fontFamily="'Inter', sans-serif"
            >
                Massachusetts
                <br />
                Institute of
                <br />
                Technology
            </Text>
        </Box>
    </Flex>
);

const JohnsHopkinsLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <svg viewBox="0 0 24 26" width="20px" height="22px" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
                d="M 12 2 C 17 2 21 4 21 11 C 21 18 16 22 12 24 C 8 22 3 18 3 11 C 3 4 7 2 12 2 Z"
                strokeWidth="1.8"
            />
            <path d="M 6 10 H 18 M 12 6 V 18 M 8 15 H 16" opacity={0.7} />
        </svg>
        <Box textAlign="left" lineHeight="1">
            <Text
                fontSize="11px"
                fontWeight="700"
                letterSpacing="0.05em"
                color="white"
                fontFamily="'Times New Roman', serif"
            >
                JOHNS HOPKINS
            </Text>
            <Text
                fontSize="8px"
                fontWeight="600"
                letterSpacing="0.15em"
                color="#94a3b8"
                textTransform="uppercase"
                fontFamily="'Inter', sans-serif"
            >
                University
            </Text>
        </Box>
    </Flex>
);

const MoffittLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <Box textAlign="left" lineHeight="1">
            <Text
                fontSize="12px"
                fontWeight="800"
                letterSpacing="0.05em"
                color="white"
                fontFamily="'Inter', sans-serif"
            >
                MOFFITT
            </Text>
            <Text
                fontSize="7px"
                fontWeight="700"
                letterSpacing="0.05em"
                color="#94a3b8"
                fontFamily="'Inter', sans-serif"
            >
                CANCER CENTER
            </Text>
        </Box>
        <svg viewBox="0 0 24 24" width="20px" height="20px" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <path d="M 6 12 C 9 9, 15 9, 18 12 C 15 15, 9 15, 6 12" />
        </svg>
    </Flex>
);

const UCSFLogo = () => (
    <Flex
        alignItems="center"
        gap="8px"
        filter="grayscale(100%)"
        opacity={0.35}
        _hover={{ opacity: 0.9 }}
        transition="all 0.25s ease"
    >
        <Box textAlign="left" lineHeight="1">
            <Text
                fontSize="13px"
                fontWeight="900"
                letterSpacing="-0.04em"
                color="white"
                fontFamily="'Inter', sans-serif"
            >
                UCSF
            </Text>
        </Box>
        <Box textAlign="left" lineHeight="1.1" borderLeft="1px solid rgba(255,255,255,0.2)" pl="8px">
            <Text fontSize="8px" fontWeight="500" color="#94a3b8" fontFamily="'Inter', sans-serif">
                University of California
                <br />
                San Francisco
            </Text>
        </Box>
    </Flex>
);

export default function LandingPage() {
    const { scrollY } = useScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

    const handleNewProject = () => {
        setIsNewProjectModalOpen(true);
    };

    // Initialize Lenis Inertia Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            lenis.destroy();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    // Light washes and radial glows move upward at ~10% of scroll speed
    const glowY = useTransform(scrollY, [0, 2000], [0, -200]);

    return (
        <Box
            ref={containerRef}
            onMouseMove={handleMouseMove}
            minHeight="100vh"
            overflow="hidden"
            position="relative"
            color="white"
            background="linear-gradient(to bottom, #1d2433 0%, #1d2433 20%, #131a26 40%, #121827 60%, #0b0e17 80%, #070a0f 100%)"
        >
            {/* Global mouse-following spotlight glow */}
            <Box
                position="absolute"
                inset={0}
                pointerEvents="none"
                zIndex={1}
                background="radial-gradient(1000px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(58, 111, 124, 0.08) 0%, rgba(72, 108, 152, 0.04) 40%, transparent 70%)"
            />
            {/* Top-Left Glow */}
            <MotionBox
                position="absolute"
                inset={0}
                pointerEvents="none"
                zIndex={0}
                style={{ y: glowY }}
                background="radial-gradient(circle at 12% 12%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 25%, transparent 55%)"
            />

            {/* Noise Texture Overlay */}
            <Box
                position="absolute"
                inset={0}
                pointerEvents="none"
                zIndex={1}
                opacity={0.015}
                mixBlendMode="overlay"
                backgroundImage='url("data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E")'
            />

            {/* Top Header Navbar */}
            <Navbar />

            {/* HERO */}
            <Container
                maxW="clamp(100%, 92vw, 1600px)"
                mx="auto"
                w="100%"
                position="relative"
                zIndex={2}
                pt={{ base: '90px', md: '110px', lg: '130px' }}
                pb={{ base: '40px', md: '60px', lg: '80px' }}
                px={{ base: '20px', md: '5vw', lg: '6vw' }}
            >
                <Flex
                    direction={{ base: 'column', lg: 'row' }}
                    gap={{ base: '48px', lg: '24px', xl: '40px' }}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Left Column */}
                    <Box flex={{ base: '1', lg: '0 0 45%', xl: '0 0 42%' }} minWidth={0} zIndex={5}>
                        {/* Overline & Android App Pill */}
                        <Flex align="center" gap="12px" mb="12px" wrap="wrap">
                            <Text
                                fontSize={{ base: '11px', md: '12px' }}
                                fontWeight={700}
                                letterSpacing="0.14em"
                                color="#5cc5d8"
                                textTransform="uppercase"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Open Neuroinformatics &amp; HPC Platform
                            </Text>

                            <Link
                                as={NextLink}
                                href="/mobile"
                                display="inline-flex"
                                alignItems="center"
                                gap="6px"
                                bg="rgba(92, 197, 216, 0.1)"
                                border="1px solid rgba(92, 197, 216, 0.3)"
                                borderRadius="full"
                                px="10px"
                                py="2px"
                                fontSize="11px"
                                fontWeight={600}
                                color="#5cc5d8"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'rgba(92, 197, 216, 0.22)',
                                    borderColor: '#5cc5d8',
                                    transform: 'translateY(-1px)',
                                    textDecoration: 'none',
                                }}
                            >
                                <span>📱 Android App</span>
                                <span style={{ opacity: 0.7 }}>&rarr;</span>
                            </Link>
                        </Flex>

                        {/* Stacked Faded Watermark & Main Headline */}
                        <Box position="relative">
                            <Text
                                fontSize={{ base: '50px', sm: '70px', md: '90px', lg: '110px' }}
                                fontWeight={900}
                                color="rgba(255, 255, 255, 0.08)"
                                letterSpacing="-0.04em"
                                lineHeight="0.85"
                                fontFamily="'Work Sans', sans-serif"
                                userSelect="none"
                                pointerEvents="none"
                            >
                                Platform
                            </Text>
                            <Heading
                                as="h1"
                                fontSize={{ base: '34px', sm: '44px', md: '52px', lg: '58px', xl: '64px' }}
                                lineHeight={1.08}
                                fontWeight={900}
                                letterSpacing="-0.035em"
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                mt={{ base: '-16px', sm: '-22px', md: '-28px', lg: '-34px' }}
                                mb="20px"
                            >
                                Cloud Computing &amp;
                                <br />
                                Publishing for
                                <br />
                                <Text as="span" bgGradient="linear(to-r, #5cc5d8, #7ee0ef, #5cc5d8)" bgClip="text">
                                    Neuroimaging Data
                                </Text>
                            </Heading>
                        </Box>

                        {/* Subtitle */}
                        <Text
                            fontSize={{ base: '15px', md: '17px', lg: '18px' }}
                            lineHeight={1.55}
                            color="rgba(248, 250, 252, 0.78)"
                            fontWeight={400}
                            fontFamily="'Work Sans', sans-serif"
                            maxW="500px"
                            mb="36px"
                        >
                            An open-source ecosystem to process, analyze, and publish reproducible multi-modal MRI, MEG,
                            and EEG data on high-performance computing clusters.
                        </Text>

                        {/* Action Buttons */}
                        <Stack direction="row" spacing="16px" align="center" mb="48px" flexWrap="wrap">
                            <Button
                                onClick={handleNewProject}
                                px="24px"
                                py="10px"
                                h="44px"
                                borderRadius="8px"
                                bg="#3a6f7c"
                                color="white"
                                fontSize="14px"
                                fontWeight={600}
                                transition="all 0.2s ease"
                                fontFamily="'Work Sans', sans-serif"
                                leftIcon={<Plus size={16} />}
                                _hover={{
                                    bg: '#2d5762',
                                    boxShadow: '0 0 25px rgba(92, 197, 216, 0.4)',
                                    transform: 'translateY(-1px)',
                                }}
                            >
                                New Project
                            </Button>

                            <Button
                                onClick={redirectToBrainlifeLogin}
                                px="24px"
                                py="10px"
                                h="44px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.08)"
                                color="white"
                                border="1px solid rgba(255, 255, 255, 0.18)"
                                backdropFilter="blur(10px)"
                                fontSize="14px"
                                fontWeight={600}
                                transition="all 0.2s ease"
                                fontFamily="'Work Sans', sans-serif"
                                leftIcon={<LogIn size={16} />}
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.16)',
                                    borderColor: 'rgba(255, 255, 255, 0.35)',
                                    transform: 'translateY(-1px)',
                                }}
                            >
                                Login
                            </Button>
                        </Stack>

                        <NewProjectModal
                            isOpen={isNewProjectModalOpen}
                            onClose={() => setIsNewProjectModalOpen(false)}
                        />

                        {/* 3 Feature Badges */}
                        <Flex gap={{ base: '20px', sm: '28px', md: '36px' }} wrap="wrap">
                            <Flex align="flex-start" gap="10px">
                                <Radio size={18} color="#5cc5d8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Text
                                    fontSize="12px"
                                    color="rgba(255, 255, 255, 0.7)"
                                    lineHeight="1.35"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    Open &amp; Transparent
                                    <br />
                                    BIDS standard datasets
                                </Text>
                            </Flex>
                            <Flex align="flex-start" gap="10px">
                                <Layers size={18} color="#5cc5d8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Text
                                    fontSize="12px"
                                    color="rgba(255, 255, 255, 0.7)"
                                    lineHeight="1.35"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    100% Reproducible
                                    <br />
                                    Containerized Slurm HPC
                                </Text>
                            </Flex>
                            <Flex align="flex-start" gap="10px">
                                <ShieldCheck size={18} color="#5cc5d8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <Text
                                    fontSize="12px"
                                    color="rgba(255, 255, 255, 0.7)"
                                    lineHeight="1.35"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    Collaborative Science
                                    <br />
                                    Published with DOIs
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>

                    {/* Right Column - Visual Stage */}
                    <Box flex={{ base: '1', lg: '0 0 55%', xl: '0 0 58%' }} minWidth={0} position="relative" w="100%">
                        <HeroVisualStage />
                    </Box>
                </Flex>
            </Container>

            {/* expanding showreel section */}
            <ExpandingReelSection />

            {/* pinned horizontal pipeline track */}
            <HorizontalPipelineSection />

            {/* products we are proud of */}
            <ProudProductsSection />

            {/* ecosystem & interoperability */}
            <EcosystemSection />

            {/* publicly funded sponsors & infrastructure wall */}
            <SponsorsInfrastructureSection />

            {/* testimonials showcase */}
            <TestimonialsSection />
        </Box>
    );
}
