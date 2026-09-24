'use client';

import React from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Stack,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Globe,
    Cpu,
    Database,
    ShieldCheck,
    Users,
    Layers,
    BookOpen,
    Sparkles,
    CheckCircle2,
    Building2,
} from 'lucide-react';

const MotionBox = motion.create(Box);

const CONSORTIA_DATASETS = [
    {
        name: 'Human Connectome Project (HCP)',
        modality: 'Diffusion MRI & fMRI',
        description: 'Microstructural connectivity and multi-shell tractography across 1,200 healthy young adults.',
        badge: 'High-Res DWI',
    },
    {
        name: 'ABCD Study Cohort',
        modality: 'Longitudinal Neurodevelopment',
        description: 'Over 11,000 adolescent brain scans mapped across cognitive and genetic phenotypic metrics.',
        badge: '11,000+ Subjects',
    },
    {
        name: 'OpenNeuro Multi-Modal Archive',
        modality: 'fMRI, EEG, MEG & PET',
        description: 'Instant import of hundreds of peer-reviewed BIDS datasets from open science repositories worldwide.',
        badge: 'Open Science',
    },
    {
        name: 'OASIS & ADNI Biomarkers',
        modality: 'Clinical & Dementia Imaging',
        description: 'Structural atrophy and connectome degeneration metrics in aging and Alzheimer’s disease.',
        badge: 'Clinical Pathology',
    },
];

export default function CommunityImpactSection() {
    return (
        <Box mb={{ base: '64px', md: '100px' }}>
            {/* Section Header */}
            <Box position="relative" textAlign="center" maxW="840px" mx="auto" mb={{ base: '32px', md: '44px' }}>
                {/* Subtle Background Watermark Text */}
                <Text
                    position="absolute"
                    top={{ base: '-20px', md: '-32px', lg: '-42px' }}
                    left="50%"
                    transform="translateX(-50%)"
                    fontSize={{ base: '55px', sm: '85px', md: '115px', lg: '135px' }}
                    fontWeight={900}
                    color="rgba(255, 255, 255, 0.04)"
                    letterSpacing="-0.04em"
                    lineHeight="0.85"
                    userSelect="none"
                    pointerEvents="none"
                    zIndex={0}
                    fontFamily="'Work Sans', sans-serif"
                    whiteSpace="nowrap"
                >
                    Impact
                </Text>

                <Box position="relative" zIndex={1}>
                    <Text
                        fontSize="12px"
                        fontWeight={700}
                        color="#5cc5d8"
                        letterSpacing="0.12em"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                        mb="8px"
                    >
                        Global Scientific Impact
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '32px', md: '40px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.02em"
                        mb="14px"
                    >
                        Accelerating Discovery Across 400+ Institutions
                    </Heading>
                    <Text fontSize="15px" color="rgba(248, 250, 252, 0.8)" lineHeight="1.65">
                        Brainlife bridges open datasets, high-performance computing centers, and global laboratories
                        into an interconnected open-science ecosystem.
                    </Text>
                </Box>
            </Box>

            {/* Empirical Metric Cards */}
            <Grid
                templateColumns={{
                    base: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={{ base: '12px', md: '18px' }}
                mb="36px"
            >
                <Box
                    p={{ base: '18px 14px', md: '24px 20px' }}
                    borderRadius="18px"
                    bg="rgba(15, 23, 42, 0.65)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(16px)"
                    position="relative"
                >
                    <Flex alignItems="center" gap="10px" mb="8px">
                        <Users size={18} color="#5cc5d8" />
                        <Text fontSize="11px" fontWeight={800} color="#5cc5d8" letterSpacing="0.08em" textTransform="uppercase">
                            RESEARCHERS
                        </Text>
                    </Flex>
                    <Text fontSize={{ base: '28px', md: '36px' }} fontWeight={900} color="white" lineHeight="1.1">
                        1,200+
                    </Text>
                    <Text fontSize="12px" color="rgba(255, 255, 255, 0.6)" mt="4px">
                        Investigators and students actively analyzing datasets.
                    </Text>
                </Box>

                <Box
                    p={{ base: '18px 14px', md: '24px 20px' }}
                    borderRadius="18px"
                    bg="rgba(15, 23, 42, 0.65)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(16px)"
                    position="relative"
                >
                    <Flex alignItems="center" gap="10px" mb="8px">
                        <Building2 size={18} color="#38bdf8" />
                        <Text fontSize="11px" fontWeight={800} color="#38bdf8" letterSpacing="0.08em" textTransform="uppercase">
                            INSTITUTIONS
                        </Text>
                    </Flex>
                    <Text fontSize={{ base: '28px', md: '36px' }} fontWeight={900} color="white" lineHeight="1.1">
                        400+
                    </Text>
                    <Text fontSize="12px" color="rgba(255, 255, 255, 0.6)" mt="4px">
                        Universities and medical research centers worldwide.
                    </Text>
                </Box>

                <Box
                    p={{ base: '18px 14px', md: '24px 20px' }}
                    borderRadius="18px"
                    bg="rgba(15, 23, 42, 0.65)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(16px)"
                    position="relative"
                >
                    <Flex alignItems="center" gap="10px" mb="8px">
                        <Cpu size={18} color="#818cf8" />
                        <Text fontSize="11px" fontWeight={800} color="#818cf8" letterSpacing="0.08em" textTransform="uppercase">
                            OPEN APPS
                        </Text>
                    </Flex>
                    <Text fontSize={{ base: '28px', md: '36px' }} fontWeight={900} color="white" lineHeight="1.1">
                        400+
                    </Text>
                    <Text fontSize="12px" color="rgba(255, 255, 255, 0.6)" mt="4px">
                        Containerized, version-controlled neuroimaging algorithms.
                    </Text>
                </Box>

                <Box
                    p={{ base: '18px 14px', md: '24px 20px' }}
                    borderRadius="18px"
                    bg="rgba(15, 23, 42, 0.65)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(16px)"
                    position="relative"
                >
                    <Flex alignItems="center" gap="10px" mb="8px">
                        <ShieldCheck size={18} color="#34d399" />
                        <Text fontSize="11px" fontWeight={800} color="#34d399" letterSpacing="0.08em" textTransform="uppercase">
                            REPRODUCIBILITY
                        </Text>
                    </Flex>
                    <Text fontSize={{ base: '28px', md: '36px' }} fontWeight={900} color="white" lineHeight="1.1">
                        100%
                    </Text>
                    <Text fontSize="12px" color="rgba(255, 255, 255, 0.6)" mt="4px">
                        Deterministic data provenance with mintable DOIs.
                    </Text>
                </Box>
            </Grid>

            {/* Open Science Consortia Grid */}
            <Box
                borderRadius="24px"
                bg="linear-gradient(150deg, rgba(17, 24, 39, 0.85) 0%, rgba(10, 14, 26, 0.95) 100%)"
                border="1px solid rgba(255, 255, 255, 0.08)"
                p={{ base: '20px 16px', md: '32px 28px' }}
            >
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    alignItems={{ base: 'flex-start', sm: 'center' }}
                    gap="12px"
                    mb="22px"
                    pb="16px"
                    borderBottom="1px solid rgba(255, 255, 255, 0.08)"
                >
                    <Box>
                        <Heading as="h3" fontSize={{ base: '18px', md: '20px' }} fontWeight={800} color="white">
                            Integrated Open Consortia &amp; Benchmark Cohorts
                        </Heading>
                        <Text fontSize="13px" color="rgba(255, 255, 255, 0.6)" mt="2px">
                            Instant access to landmark neuroimaging datasets without requiring local storage infrastructure.
                        </Text>
                    </Box>
                    <Badge bg="rgba(92, 197, 216, 0.15)" color="#5cc5d8" border="1px solid rgba(92, 197, 216, 0.3)" px="10px" py="3px" borderRadius="full" fontSize="10px">
                        ZERO-DOWNLOAD ACCESS
                    </Badge>
                </Flex>

                <Grid
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                    }}
                    gap="16px"
                >
                    {CONSORTIA_DATASETS.map((ds, idx) => (
                        <Box
                            key={idx}
                            p="16px 18px"
                            borderRadius="14px"
                            bg="rgba(0, 0, 0, 0.3)"
                            border="1px solid rgba(255, 255, 255, 0.06)"
                            transition="all 0.2s ease"
                            _hover={{
                                borderColor: 'rgba(92, 197, 216, 0.3)',
                                bg: 'rgba(92, 197, 216, 0.04)',
                            }}
                        >
                            <Flex justify="space-between" alignItems="center" mb="6px">
                                <Text fontSize="14px" fontWeight={800} color="white">
                                    {ds.name}
                                </Text>
                                <Badge bg="rgba(255, 255, 255, 0.06)" color="#cbd5e1" fontSize="9.5px">
                                    {ds.badge}
                                </Badge>
                            </Flex>
                            <Text fontSize="11.5px" fontWeight={600} color="#5cc5d8" mb="4px">
                                {ds.modality}
                            </Text>
                            <Text fontSize="12px" color="rgba(255, 255, 255, 0.7)" lineHeight="1.45">
                                {ds.description}
                            </Text>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
