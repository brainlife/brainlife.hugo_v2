'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Flex,
    Text,
    Image,
    HStack,
    IconButton,
    Button,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

interface TimelineSlide {
    year: string;
    tag: string;
    title: string;
    description: string;
    image: string;
}

const TIMELINE_SLIDES: TimelineSlide[] = [
    {
        year: '2017',
        tag: 'GENESIS · NIH BRAIN AWARD',
        title: 'Indiana University & NIH BRAIN Support',
        description:
            'Founded at Indiana University by Dr. Franco Pestilli with initial NIH BRAIN Initiative grant support. Brainlife set out to solve computational reproducibility by bridging supercomputing clusters with open web workflows.',
        image: '/img/team/franco-brainlife-tree.jpg',
    },
    {
        year: '2018',
        tag: 'SUPERCOMPUTING · SLURM HPC',
        title: 'Heterogeneous Multi-Cluster Slurm',
        description:
            'Integrated heterogeneous multi-cluster execution across NSF supercomputing facilities (IU Carbonate, Big Red II, and TACC Stampede2), executing millions of compute hours for neuroscience researchers.',
        image: '/img/stampede2.jpg',
    },
    {
        year: '2019',
        tag: 'EZBIDS · STANDARDIZATION',
        title: 'Automated DICOM Curation Launch',
        description:
            'Launched ezBIDS to eliminate data curation bottlenecks. Automatically converts raw clinical DICOM datasets into validated BIDS standards directly in the cloud without command-line complexity.',
        image: '/img/apps/apps.png',
    },
    {
        year: '2021',
        tag: 'EXPANSION · APP MARKETPLACE',
        title: 'UT Austin Expansion & 200+ Apps',
        description:
            'Expanded platform headquarters to the University of Texas at Austin Psychology & Neuroscience. Scaled the open ecosystem to over 200+ containerized Docker and Singularity neuroimaging pipelines.',
        image: '/img/team/brainlife-tree-sculpture.jpg',
    },
    {
        year: '2023',
        tag: 'JUPYTER · PROVENANCE DOIS',
        title: 'Cloud JupyterLab & Permanent DOIs',
        description:
            'Introduced cloud-hosted JupyterLab kernels with direct dataset access, automated provenance DAGs, and mintable permanent DOIs for peer-reviewed reproducible neuroscience publications.',
        image: '/img/about/about-2.jpg',
    },
    {
        year: '2025+',
        tag: 'GLOBAL SCALE · MULTI-MODAL',
        title: 'Empowering 2,000+ Global Scientists',
        description:
            'Empowering over 2,000+ researchers across 400+ institutions worldwide. Executing millions of compute hours across MRI, MEG, EEG, and foundation brain models with zero software installation barriers.',
        image: '/img/team/lab-culture-1.jpg',
    },
];

export default function TimelineJourneySection() {
    const [activeIdx, setActiveIdx] = useState(4); // Default to 2023 milestone (matching reference)

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? TIMELINE_SLIDES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIdx((prev) => (prev === TIMELINE_SLIDES.length - 1 ? 0 : prev + 1));
    };

    // Keyboard arrow navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentSlide = TIMELINE_SLIDES[activeIdx];

    return (
        <Container
            maxW="clamp(100%, 94vw, 1600px)"
            mx="auto"
            position="relative"
            zIndex={2}
            px={{ base: '16px', md: '32px', lg: '48px' }}
            my={{ base: '48px', md: '80px', lg: '100px' }}
        >
            {/* ROUNDED DARK TIMELINE CONTAINER */}
            <Box
                position="relative"
                borderRadius={{ base: '20px', md: '28px' }}
                bg="#162032"
                border="1px solid rgba(255, 255, 255, 0.1)"
                boxShadow="0 20px 50px rgba(0, 0, 0, 0.5)"
                pt={{ base: '36px', md: '48px', lg: '56px' }}
                pb={{ base: '36px', md: '48px', lg: '56px' }}
                px={{ base: '20px', sm: '32px', md: '44px', lg: '64px' }}
                overflow="hidden"
            >
                {/* TOP BRAINLIFE BADGE EMBLEM */}
                <Flex direction="column" justify="center" align="center" mb={{ base: '28px', md: '40px' }}>
                    <HStack spacing="12px" align="center" mb="6px">
                        <Image
                            src={getAssetPath('/logo.svg')}
                            alt="Brainlife Logo"
                            w={{ base: '38px', md: '44px' }}
                            h={{ base: '38px', md: '44px' }}
                            objectFit="contain"
                        />
                        <Text
                            fontSize={{ base: '22px', md: '26px' }}
                            fontWeight={900}
                            letterSpacing="-0.03em"
                            fontFamily="'Work Sans', sans-serif"
                            color="white"
                        >
                            brainlife<Text as="span" color="#2693D8">.io</Text>
                        </Text>
                    </HStack>

                    <Text
                        fontSize="11px"
                        fontWeight={800}
                        color="#94a3b8"
                        letterSpacing="0.16em"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        ORIGIN STORY &amp; MILESTONES · EST. 2017
                    </Text>
                </Flex>

                {/* MAIN CAROUSEL CONTENT BLOCK (2-Column Slide) */}
                <Box
                    minH={{ base: '380px', sm: '340px', md: '340px', lg: '360px' }}
                    display="flex"
                    alignItems="center"
                    mb={{ base: '28px', md: '40px' }}
                    position="relative"
                >
                    <AnimatePresence mode="wait">
                        <MotionFlex
                            key={currentSlide.year}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            direction={{ base: 'column', md: 'row' }}
                            alignItems="center"
                            gap={{ base: '24px', md: '40px', lg: '64px' }}
                            w="100%"
                            position="relative"
                        >
                            {/* LEFT COLUMN: HERO PHOTO CARD */}
                            <Box
                                flex={{ base: '1', md: '0 0 46%', lg: '0 0 48%' }}
                                w="100%"
                                maxW={{ base: '100%', md: '540px' }}
                                h={{ base: '220px', sm: '260px', md: '300px', lg: '320px' }}
                                borderRadius="16px"
                                overflow="hidden"
                                position="relative"
                                border="1px solid rgba(255, 255, 255, 0.12)"
                                bg="#0e1626"
                            >
                                <Image
                                    src={getAssetPath(currentSlide.image)}
                                    alt={currentSlide.title}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </Box>

                            {/* RIGHT COLUMN: GIANT WATERMARK YEAR + EDITORIAL STORY */}
                            <Box
                                flex="1"
                                position="relative"
                                w="100%"
                                minH={{ base: 'auto', md: '260px' }}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                            >
                                {/* Giant Background Year Number */}
                                <Text
                                    fontSize={{ base: '80px', sm: '120px', md: '150px', lg: '180px' }}
                                    fontWeight={900}
                                    color="rgba(255, 255, 255, 0.05)"
                                    letterSpacing="-0.04em"
                                    lineHeight="0.85"
                                    fontFamily="'Work Sans', sans-serif"
                                    position={{ base: 'relative', md: 'absolute' }}
                                    top={{ base: '0', md: '-20px' }}
                                    right={{ base: 'auto', md: '0' }}
                                    userSelect="none"
                                    zIndex={0}
                                    mb={{ base: '-20px', md: '0' }}
                                >
                                    {currentSlide.year}
                                </Text>

                                {/* Foreground Story Content */}
                                <Box position="relative" zIndex={2} maxW="520px">
                                    {/* Tag */}
                                    <Text
                                        fontSize="11px"
                                        fontWeight={800}
                                        color="#2693D8"
                                        letterSpacing="0.14em"
                                        textTransform="uppercase"
                                        fontFamily="'Work Sans', sans-serif"
                                        mb="8px"
                                    >
                                        {currentSlide.tag}
                                    </Text>

                                    {/* Title */}
                                    <Text
                                        fontSize={{ base: '20px', sm: '22px', md: '24px' }}
                                        fontWeight={800}
                                        color="white"
                                        fontFamily="'Work Sans', sans-serif"
                                        lineHeight="1.25"
                                        mb="12px"
                                    >
                                        {currentSlide.title}
                                    </Text>

                                    {/* Description */}
                                    <Text
                                        fontSize={{ base: '14px', sm: '15px', md: '16px' }}
                                        color="#cbd5e1"
                                        lineHeight="1.65"
                                        fontFamily="'Work Sans', sans-serif"
                                        fontWeight={400}
                                    >
                                        {currentSlide.description}
                                    </Text>
                                </Box>
                            </Box>
                        </MotionFlex>
                    </AnimatePresence>
                </Box>

                {/* BOTTOM YEAR PILLS NAVIGATION & ARROWS */}
                <Flex
                    justify="center"
                    alignItems="center"
                    gap={{ base: '8px', md: '12px' }}
                    pt={{ base: '12px', md: '20px' }}
                    borderTop="1px solid rgba(255, 255, 255, 0.08)"
                    wrap="wrap"
                >
                    {/* Left Arrow */}
                    <IconButton
                        aria-label="Previous milestone"
                        icon={<ChevronLeft size={20} />}
                        size="md"
                        variant="ghost"
                        color="white"
                        borderRadius="full"
                        bg="rgba(255, 255, 255, 0.06)"
                        border="1px solid rgba(255, 255, 255, 0.12)"
                        _hover={{ bg: 'rgba(38, 147, 216, 0.15)', borderColor: '#2693D8', color: '#2693D8' }}
                        onClick={handlePrev}
                    />

                    {/* Desktop Year Pills */}
                    <HStack spacing={{ base: '6px', md: '8px' }} wrap="wrap" justify="center">
                        {TIMELINE_SLIDES.map((slide, idx) => {
                            const isCurrent = idx === activeIdx;
                            return (
                                <Button
                                    key={slide.year}
                                    onClick={() => setActiveIdx(idx)}
                                    size="sm"
                                    h="36px"
                                    px={{ base: '14px', md: '20px' }}
                                    borderRadius="full"
                                    fontSize={{ base: '13px', md: '14px' }}
                                    fontWeight={isCurrent ? 700 : 600}
                                    fontFamily="'Work Sans', sans-serif"
                                    bg={isCurrent ? '#2693D8' : 'transparent'}
                                    border={
                                        isCurrent
                                            ? '1px solid #2693D8'
                                            : '1px solid rgba(255, 255, 255, 0.12)'
                                    }
                                    color={isCurrent ? 'white' : '#94a3b8'}
                                    boxShadow={
                                        isCurrent
                                            ? '0 2px 8px rgba(38, 147, 216, 0.35)'
                                            : 'none'
                                    }
                                    transition="all 0.2s ease"
                                    _hover={{
                                        bg: isCurrent
                                            ? '#1d74ae'
                                            : 'rgba(255, 255, 255, 0.08)',
                                        borderColor: isCurrent
                                            ? '#1d74ae'
                                            : 'rgba(255, 255, 255, 0.3)',
                                        color: 'white',
                                    }}
                                >
                                    {slide.year}
                                </Button>
                            );
                        })}
                    </HStack>

                    {/* Right Arrow */}
                    <IconButton
                        aria-label="Next milestone"
                        icon={<ChevronRight size={20} />}
                        size="md"
                        variant="ghost"
                        color="white"
                        borderRadius="full"
                        bg="rgba(255, 255, 255, 0.06)"
                        border="1px solid rgba(255, 255, 255, 0.12)"
                        _hover={{ bg: 'rgba(38, 147, 216, 0.15)', borderColor: '#2693D8', color: '#2693D8' }}
                        onClick={handleNext}
                    />
                </Flex>
            </Box>
        </Container>
    );
}
