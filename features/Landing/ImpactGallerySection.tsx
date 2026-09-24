'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Container, Flex, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import tractographyImg from '@/assets/landing/tractography.jpeg';
import microscopyImg from '@/assets/landing/microscopy.png';
import psOctImg from '@/assets/landing/ps-oct.png';
import axialImg from '@/assets/landing/axial.jpeg';
import coronalImg from '@/assets/landing/coronal.jpg';
import sagittalImg from '@/assets/landing/sagittal.jpeg';
import connectomicsImg from '@/assets/landing/tract2.png';
import axonalImg from '@/assets/landing/axonal-architecture.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;

const tractographyImgSrc = getSrc(tractographyImg, '/assets/landing/tractography.jpeg');
const microscopyImgSrc = getSrc(microscopyImg, '/assets/landing/microscopy.png');
const psOctImgSrc = getSrc(psOctImg, '/assets/landing/ps-oct.png');
const axialImgSrc = getSrc(axialImg, '/assets/landing/axial.jpeg');
const coronalImgSrc = getSrc(coronalImg, '/assets/landing/coronal.jpg');
const sagittalImgSrc = getSrc(sagittalImg, '/assets/landing/sagittal.jpeg');
const connectomicsImgSrc = getSrc(connectomicsImg, '/assets/landing/tract2.png');
const axonalImgSrc = getSrc(axonalImg, '/assets/landing/axonal-architecture.png');

const galleryImages = [
    { src: tractographyImgSrc, label: '3D Streamline Tractography' },
    { src: connectomicsImgSrc, label: 'Full Brain Connectome' },
    { src: microscopyImgSrc, label: 'High-Res Axonal Microscopy' },
    { src: psOctImgSrc, label: 'PS-OCT Volumetric Microstructure' },
    { src: axialImgSrc, label: 'Axial T1 Structural Scan' },
    { src: coronalImgSrc, label: 'Coronal fMRI Functional Map' },
    { src: axonalImgSrc, label: 'Axonal Micro-Architecture' },
    { src: sagittalImgSrc, label: 'Sagittal Diffusion Tensor' },
];

const impactCategories = [
    {
        id: 'impact',
        title: 'IMPACT',
        highlight: '500+ HPC Apps',
        stats: [
            '500+ Containerized Slurm HPC Apps',
            '10M+ Streamline Fiber Tracts Generated',
            '500k+ FAIR Neuroimaging Datasets Processed',
            '100% Traceable Provenance Graph Execution',
        ],
    },
    {
        id: 'reach',
        title: 'GLOBAL REACH',
        highlight: '120+ Universities',
        stats: [
            '120+ Leading Global Research Institutions',
            '40+ Countries Worldwide Active',
            '15+ NIH & NSF Grant Funded Projects',
            '300k+ Compute Hours Executed Monthly',
        ],
    },
    {
        id: 'expertise',
        title: 'EXPERTISE',
        highlight: '10+ Years Open Science',
        stats: [
            '20+ Core Neuroscientists & HPC Engineers',
            '10+ Years of Open Science Platform R&D',
            'Multi-Modal BIDS & NIfTI Data Experts',
            '24/7 Real-Time Cloud Telemetry & Sync',
        ],
    },
];

export default function ImpactGallerySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState('impact');

    useEffect(() => {
        const section = sectionRef.current;
        const strip = stripRef.current;
        if (!section || !strip) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Parallax vertical translation of the tilted gallery strip as the user scrolls
                gsap.fromTo(
                    strip,
                    { yPercent: 15 },
                    {
                        yPercent: -45,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.2,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }, sectionRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <Box
            ref={sectionRef}
            py={{ base: '80px', md: '140px' }}
            bg="transparent"
            position="relative"
            overflow="hidden"
            borderTop="1px solid rgba(255, 255, 255, 0.08)"
        >
            {/* Lizard Global-Style Tilted Vertical Image Gallery Strip (Scrolling in Background) */}
            <Box
                position="absolute"
                top="-20%"
                right={{ base: '-10%', md: '5%', lg: '12%' }}
                w={{ base: '260px', sm: '320px', md: '420px', lg: '460px' }}
                h="180%"
                pointerEvents="none"
                zIndex={1}
                opacity={0.35}
                style={{
                    transform: 'rotate(-7deg)',
                    transformOrigin: 'center center',
                }}
            >
                <Box
                    ref={stripRef}
                    display="flex"
                    flexDirection="column"
                    gap="24px"
                    willChange="transform"
                >
                    {galleryImages.concat(galleryImages).map((img, i) => (
                        <Box
                            key={`${img.label}-${i}`}
                            w="100%"
                            h={{ base: '220px', md: '280px' }}
                            borderRadius="24px"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.2)"
                            boxShadow="0 25px 60px rgba(0, 0, 0, 0.8)"
                            position="relative"
                            bg="#090e18"
                        >
                            <Box
                                bgImage={`url(${img.src})`}
                                bgSize="cover"
                                bgPosition="center"
                                w="100%"
                                h="100%"
                            />
                            <Box
                                position="absolute"
                                inset={0}
                                bg="linear-gradient(to top, rgba(9, 14, 24, 0.9) 0%, transparent 60%)"
                            />
                            <Text
                                position="absolute"
                                bottom="14px"
                                left="16px"
                                fontSize="11px"
                                fontWeight="800"
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                letterSpacing="0.05em"
                                textTransform="uppercase"
                            >
                                {img.label}
                            </Text>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Foreground Content Container */}
            <Container maxW="1280px" position="relative" zIndex={10} px={{ base: '16px', md: '24px' }}>
                <Box maxW={{ base: '100%', lg: '680px' }}>
                    {/* Badge */}
                    <Box
                        display="inline-flex"
                        alignItems="center"
                        gap="6px"
                        px="14px"
                        py="5px"
                        borderRadius="full"
                        bg="rgba(92, 197, 216, 0.12)"
                        border="1px solid rgba(92, 197, 216, 0.35)"
                        color="#5cc5d8"
                        fontSize="11px"
                        fontWeight="800"
                        letterSpacing="0.1em"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                        mb="20px"
                    >
                        <Sparkles size={13} />
                        Track Record &amp; Global Impact
                    </Box>

                    {/* Main Headline */}
                    <Heading
                        as="h2"
                        fontSize={{ base: '32px', sm: '48px', md: '64px' }}
                        fontWeight={900}
                        color="white"
                        letterSpacing="-0.04em"
                        fontFamily="'Work Sans', sans-serif"
                        lineHeight="1.05"
                        mb="24px"
                    >
                        100% Reproducible research platform
                    </Heading>

                    <Text
                        fontSize={{ base: '18px', md: '24px' }}
                        color="rgba(255, 255, 255, 0.75)"
                        fontWeight={400}
                        lineHeight="1.4"
                        fontFamily="'Work Sans', sans-serif"
                        mb={{ base: '40px', md: '64px' }}
                    >
                        Consistent excellence across every dataset, HPC pipeline, and publication. We let our track record speak for itself.
                    </Text>

                    {/* Accordion / List of Impact Categories (Lizard Global Style) */}
                    <Flex direction="column" gap="16px" w="100%">
                        {impactCategories.map((cat) => {
                            const isExpanded = activeCategory === cat.id;

                            return (
                                <Box
                                    key={cat.id}
                                    borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                                    pb="20px"
                                    pt="12px"
                                    transition="all 0.3s ease"
                                >
                                    {/* Category Header Row */}
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        cursor="pointer"
                                        onClick={() => setActiveCategory(isExpanded ? '' : cat.id)}
                                        role="group"
                                    >
                                        <Flex align="center" gap="14px">
                                            <Box
                                                color={isExpanded ? '#5cc5d8' : 'rgba(255,255,255,0.4)'}
                                                transition="all 0.3s ease"
                                                transform={isExpanded ? 'translateX(4px)' : 'translateX(0)'}
                                            >
                                                <ChevronRight size={28} />
                                            </Box>
                                            <Heading
                                                as="h3"
                                                fontSize={{ base: '24px', sm: '32px', md: '44px' }}
                                                fontWeight={900}
                                                color={isExpanded ? 'white' : 'rgba(255, 255, 255, 0.6)'}
                                                letterSpacing="-0.03em"
                                                fontFamily="'Work Sans', sans-serif"
                                                textTransform="uppercase"
                                                _groupHover={{ color: 'white' }}
                                                transition="color 0.2s ease"
                                            >
                                                {cat.title}
                                            </Heading>
                                        </Flex>

                                        <Heading
                                            as="h3"
                                            fontSize={{ base: '20px', sm: '28px', md: '36px' }}
                                            fontWeight={800}
                                            color="#5cc5d8"
                                            fontFamily="'Work Sans', sans-serif"
                                            letterSpacing="-0.02em"
                                        >
                                            {cat.highlight}
                                        </Heading>
                                    </Flex>

                                    {/* Expanded Stats List */}
                                    {isExpanded && (
                                        <Box pt="20px" pl={{ base: '20px', md: '42px' }}>
                                            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="12px">
                                                {cat.stats.map((stat, idx) => (
                                                    <Flex key={idx} align="center" gap="10px">
                                                        <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
                                                        <Text fontSize={{ base: '13px', md: '15px' }} color="rgba(255, 255, 255, 0.85)" fontFamily="'Work Sans', sans-serif">
                                                            {stat}
                                                        </Text>
                                                    </Flex>
                                                ))}
                                            </SimpleGrid>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
