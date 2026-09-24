'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Image,
    Stack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    GraduationCap,
    Cpu,
    Database,
    ArrowRight,
    ArrowDown,
    CheckCircle2,
    Zap,
} from 'lucide-react';
import { redirectToBrainlifeLogin } from '@/contexts/AuthContext.helpers';

const MotionBox = motion.create(Box);

interface PersonaHeroOption {
    id: string;
    tabLabel: string;
    roleTitle: string;
    tagline: string;
    description: string;
    highlights: string[];
    deliverable: string;
    icon: React.ElementType;
    heroImage: string;
}

const PERSONA_HERO_OPTIONS: PersonaHeroOption[] = [
    {
        id: 'students',
        tabLabel: 'Students & Researchers',
        roleTitle: 'Learning & Data Standardization',
        tagline: 'Skip the setup headaches. Learn and process neuroimaging intuitively.',
        description:
            'Start analyzing real brain scans on day one with automated ezBIDS DICOM curation, open training datasets (HCP, ABCD), and interactive in-browser 3D visualizers.',
        highlights: [
            'Zero-configuration ezBIDS automated scanner mapping',
            'Instant access to landmark open datasets (HCP, ABCD, OpenNeuro)',
            'In-browser 3D tractography & cortical visualizers',
        ],
        deliverable: 'First reproducible conference poster in weeks, not months',
        icon: GraduationCap,
        heroImage: '/img/users/work-at-home.png',
    },
    {
        id: 'engineers',
        tabLabel: 'Developers & Engineers',
        roleTitle: 'HPC & Container Scale',
        tagline: 'Turn your algorithms into global cloud apps with zero ops.',
        description:
            'Package your C++, Python, or Rust neuroimaging algorithms into Docker or Singularity containers and let Brainlife handle multi-cluster HPC execution.',
        highlights: [
            'Automated GitHub-to-App continuous integration & versioning',
            'Distributed Slurm multi-GPU scaling (TACC, SDSC, IU Carbonate)',
            'Strict BIDS input/output schema validation guarantees',
        ],
        deliverable: 'Published, citable cloud app used by hundreds of labs',
        icon: Cpu,
        heroImage: '/img/users/startup.png',
    },
    {
        id: 'data-scientists',
        tabLabel: 'Data Scientists & PIs',
        roleTitle: 'Analytics, Provenance & DOIs',
        tagline: 'Cloud JupyterLab analytics with 100% reproducible data provenance.',
        description:
            'Query multi-subject tract metrics directly from cloud storage, run group statistics in live Python kernels, and mint permanent citable DOIs with verified data lineage.',
        highlights: [
            'Instant cloud JupyterLab kernels (NiBabel, Nilearn, MNE, DIPY)',
            'Immutable provenance graphs tracking every raw file & parameter',
            'Mint permanent citable DOIs with 1-click push-button replication',
        ],
        deliverable: 'High-impact publications & reproducible statistical models',
        icon: Database,
        heroImage: '/img/users/data-analyse.png',
    },
];

export default function UsersHeroSection() {
    const [activePersonaId, setActivePersonaId] = useState<string>('students');

    const activePersona =
        PERSONA_HERO_OPTIONS.find((p) => p.id === activePersonaId) || PERSONA_HERO_OPTIONS[0];

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            position="relative"
            w="100%"
            pt={{ base: '12px', md: '20px' }}
            pb={{ base: '48px', md: '68px', lg: '84px' }}
        >
            <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr', xl: '0.95fr 1.05fr', '2xl': '0.9fr 1.1fr' }}
                gap={{ base: '40px', md: '48px', lg: '48px', xl: '64px' }}
                alignItems="center"
            >
                {/* LEFT COLUMN: EDITORIAL HEADLINE, PERSONA TABS, DYNAMIC VALUES & CTAS */}
                <Box maxW={{ base: '100%', lg: '620px', xl: '660px' }}>
                    {/* Header with giant watermark "Users" directly behind "Built for scientists" */}
                    <Box position="relative" mb={{ base: '20px', md: '26px' }}>
                        <Text
                            fontSize={{ base: '64px', sm: '85px', md: '105px', lg: '120px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Users
                        </Text>
                        <Heading
                            as="h1"
                            fontSize={{ base: '32px', sm: '42px', md: '48px', lg: '54px' }}
                            fontWeight={900}
                            letterSpacing="-0.035em"
                            lineHeight={{ base: '1.14', md: '1.08' }}
                            fontFamily="'Work Sans', sans-serif"
                            color="white"
                            mt={{ base: '-20px', sm: '-28px', md: '-34px' }}
                        >
                            Built for scientists.{' '}
                            <Box as="span" display="block">
                                Engineered for{' '}
                                <Text as="span" color="#2693D8">
                                    your exact workflow.
                                </Text>
                            </Box>
                        </Heading>
                    </Box>

                    {/* INTERACTIVE PERSONA SELECTOR TRACK */}
                    <Box mb="20px">
                        <Text
                            fontSize="11px"
                            fontWeight={700}
                            color="#94a3b8"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            fontFamily="'Work Sans', sans-serif"
                            mb="8px"
                        >
                            Select your focus:
                        </Text>

                        <Flex wrap="wrap" gap="8px">
                            {PERSONA_HERO_OPTIONS.map((persona) => {
                                const isSelected = activePersonaId === persona.id;
                                const TabIcon = persona.icon;

                                return (
                                    <Button
                                        key={persona.id}
                                        onClick={() => setActivePersonaId(persona.id)}
                                        size="sm"
                                        h="36px"
                                        px="14px"
                                        borderRadius="8px"
                                        bg={
                                            isSelected
                                                 ? '#2693D8'
                                                 : '#162032'
                                        }
                                        color={isSelected ? 'white' : 'rgba(255, 255, 255, 0.75)'}
                                        border={
                                            isSelected
                                                ? '1px solid #2693D8'
                                                : '1px solid rgba(255, 255, 255, 0.12)'
                                        }
                                        fontWeight={isSelected ? 700 : 500}
                                        fontSize="13px"
                                        fontFamily="'Work Sans', sans-serif"
                                        leftIcon={
                                            <TabIcon
                                                size={14}
                                                color={isSelected ? 'white' : '#94a3b8'}
                                            />
                                        }
                                        _hover={{
                                            bg: isSelected
                                                ? '#1d74ae'
                                                : 'rgba(255, 255, 255, 0.08)',
                                            color: 'white',
                                        }}
                                        transition="all 0.2s ease"
                                    >
                                        {persona.tabLabel}
                                    </Button>
                                );
                            })}
                        </Flex>
                    </Box>

                    {/* DYNAMIC ROLE SPOTLIGHT CARD (Clean Brainlife Theme) */}
                    <AnimatePresence mode="wait">
                        <MotionBox
                            key={activePersona.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            p="20px 22px"
                            borderRadius="12px"
                            bg="#162032"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            boxShadow="0 8px 24px rgba(0, 0, 0, 0.3)"
                            mb="24px"
                        >
                            <Text
                                fontSize="14.5px"
                                fontWeight={700}
                                color="#2693D8"
                                mb="6px"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                {activePersona.tagline}
                            </Text>

                            <Text
                                fontSize="13.5px"
                                color="#cbd5e1"
                                lineHeight="1.6"
                                mb="14px"
                            >
                                {activePersona.description}
                            </Text>

                            {/* 3 Core Highlights */}
                            <Stack spacing="7px" mb="14px">
                                {activePersona.highlights.map((h, i) => (
                                    <Flex key={i} align="flex-start" gap="8px">
                                        <CheckCircle2
                                            size={14}
                                            color="#2693D8"
                                            style={{ marginTop: '3px', flexShrink: 0 }}
                                        />
                                        <Text fontSize="12.5px" color="rgba(255, 255, 255, 0.9)" lineHeight="1.4">
                                            {h}
                                        </Text>
                                    </Flex>
                                ))}
                            </Stack>

                            {/* Primary Outcome Badge */}
                            <Flex align="center" gap="8px" pt="12px" borderTop="1px solid rgba(255, 255, 255, 0.08)">
                                <Zap size={13} color="#2693D8" />
                                <Text fontSize="12px" color="#94a3b8" fontWeight={500}>
                                    <Text as="span" color="white" fontWeight={700}>
                                        Target Deliverable:
                                    </Text>{' '}
                                    {activePersona.deliverable}
                                </Text>
                            </Flex>
                        </MotionBox>
                    </AnimatePresence>

                    {/* CTAs ROW */}
                    <Flex gap="14px" wrap="wrap" align="center" mb="28px">
                        <Button
                            onClick={redirectToBrainlifeLogin}
                            bg="#2693D8"
                            color="white"
                            px="24px"
                            py="12px"
                            h="44px"
                            borderRadius="8px"
                            fontWeight={700}
                            fontSize="14px"
                            rightIcon={<ArrowRight size={16} />}
                            transition="all 0.2s ease"
                            _hover={{
                                bg: '#1d74ae',
                                boxShadow: '0 0 20px rgba(38, 147, 216, 0.5)',
                                transform: 'translateY(-1px)',
                            }}
                        >
                            Get Started Free
                        </Button>

                        <Button
                            onClick={() => scrollToSection('research-spotlight')}
                            variant="outline"
                            borderColor="rgba(255, 255, 255, 0.25)"
                            bg="transparent"
                            color="white"
                            px="20px"
                            py="12px"
                            h="44px"
                            borderRadius="8px"
                            fontWeight={600}
                            fontSize="14px"
                            rightIcon={<ArrowDown size={14} />}
                            _hover={{
                                bg: 'rgba(255, 255, 255, 0.08)',
                                borderColor: 'white',
                            }}
                        >
                            Explore Research Spotlight
                        </Button>
                    </Flex>

                    {/* Micro Trust Stats Row */}
                    <Box
                        pt="16px"
                        borderTop="1px solid rgba(255, 255, 255, 0.1)"
                        maxW="560px"
                    >
                        <Flex
                            align="center"
                            gap={{ base: '16px', sm: '28px' }}
                            wrap="wrap"
                        >
                            <Box>
                                <Text fontSize="18px" fontWeight={900} color="white" lineHeight="1">
                                    2,000+
                                </Text>
                                <Text fontSize="11px" color="#94a3b8" mt="3px" fontWeight={600}>
                                    Researchers
                                </Text>
                            </Box>
                            <Box w="1px" h="22px" bg="rgba(255, 255, 255, 0.12)" />
                            <Box>
                                <Text fontSize="18px" fontWeight={900} color="white" lineHeight="1">
                                    400+
                                </Text>
                                <Text fontSize="11px" color="#94a3b8" mt="3px" fontWeight={600}>
                                    Cloud Apps
                                </Text>
                            </Box>
                            <Box w="1px" h="22px" bg="rgba(255, 255, 255, 0.12)" />
                            <Box>
                                <Text fontSize="18px" fontWeight={900} color="white" lineHeight="1">
                                    10M+
                                </Text>
                                <Text fontSize="11px" color="#94a3b8" mt="3px" fontWeight={600}>
                                    HPC Hours
                                </Text>
                            </Box>
                            <Box w="1px" h="22px" bg="rgba(255, 255, 255, 0.12)" />
                            <Box>
                                <Text fontSize="18px" fontWeight={900} color="#2693D8" lineHeight="1">
                                    50+
                                </Text>
                                <Text fontSize="11px" color="#94a3b8" mt="3px" fontWeight={600}>
                                    Countries
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>

                {/* RIGHT COLUMN: NATURAL, PROMINENT HERO ILLUSTRATION */}
                <Flex
                    position="relative"
                    justify="center"
                    align="center"
                    w="100%"
                    minH={{ base: '340px', md: '460px', lg: '540px', xl: '600px' }}
                >
                    <AnimatePresence mode="wait">
                        <MotionBox
                            key={activePersona.id}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.97 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            position="relative"
                            zIndex={1}
                            w="100%"
                            maxW={{ base: '100%', sm: '520px', md: '640px', lg: '740px', xl: '860px', '2xl': '940px' }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Image
                                src={activePersona.heroImage}
                                alt={activePersona.roleTitle}
                                w="100%"
                                h="auto"
                                maxH={{ base: '420px', sm: '520px', md: '600px', lg: '680px', xl: '760px' }}
                                objectFit="contain"
                                filter="drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))"
                                fallbackSrc="/img/users/work-at-home.png"
                                transition="transform 0.3s ease"
                                _hover={{ transform: 'translateY(-4px)' }}
                            />
                        </MotionBox>
                    </AnimatePresence>
                </Flex>
            </Grid>
        </Box>
    );
}


