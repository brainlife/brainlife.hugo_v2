'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Flex,
    Grid,
    Heading,
    Text,
    Image,
    Badge,
    HStack,
    Button,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Layers, Search, Eye, Share2, Shield, Sparkles } from 'lucide-react';

const MotionBox = motion.create(Box);

interface ProjectTab {
    id: string;
    title: string;
    tag: string;
    description: string;
    image: string;
    icon: React.ReactNode;
}

const PROJECT_TABS: ProjectTab[] = [
    {
        id: 'datasets',
        title: 'BIDS Datasets & Sessions',
        tag: 'DATA BROWSER',
        description:
            'Explore participant directories, clinical demographics, scan acquisitions (T1w, dMRI, fMRI, MEG), and derivative outputs directly from your phone.',
        image: '/img/brainlifemobile/version1/projects_v1.png',
        icon: <Layers size={15} />,
    },
    {
        id: 'pipelines',
        title: 'App Execution History',
        tag: 'PIPELINE TRACKING',
        description:
            'Review containerized execution trees, Docker/Singularity image versions, runtime stdout logs, and computational resource quotas.',
        image: '/img/brainlifemobile/version1/pipelines_v1.png',
        icon: <FolderGit2 size={15} />,
    },
    {
        id: 'qc',
        title: 'Quality Control Visualizer',
        tag: 'NEUROIMAGING QC',
        description:
            'Rapidly inspect 2D slice previews, fiber density maps, and cortical mesh surface reconstructions on the go.',
        image: '/img/brainlifemobile/version1/qc_v1.png',
        icon: <Eye size={15} />,
    },
    {
        id: 'sharing',
        title: 'Team Access & Permissions',
        tag: 'COLLABORATION',
        description:
            'Grant read/write access to international collaborators, add institutional affiliations, and review team contributions.',
        image: '/img/brainlifemobile/version1/sharing_v1.png',
        icon: <Share2 size={15} />,
    },
];

export default function MobileProjectsShowcase() {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const activeTab = PROJECT_TABS[activeTabIdx];

    return (
        <Box
            py={{ base: '60px', md: '110px' }}
            position="relative"
        >
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* SECTION HEADER */}
                <Box textAlign="center" maxW="840px" mx="auto" mb={{ base: '44px', md: '64px' }} position="relative">
                    <Text
                        fontSize={{ base: '55px', sm: '75px', md: '95px' }}
                        fontWeight={900}
                        color="rgba(255, 255, 255, 0.08)"
                        letterSpacing="-0.04em"
                        lineHeight="0.85"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        pointerEvents="none"
                    >
                        Projects
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '34px', md: '42px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.03em"
                        mt={{ base: '-16px', sm: '-22px', md: '-28px' }}
                        mb="14px"
                    >
                        Datasets &amp; Pipelines
                    </Heading>
                    <Text
                        fontSize={{ base: '15px', md: '17px' }}
                        color="#94a3b8"
                        lineHeight="1.7"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        Browse, organize, and monitor all your research cohorts. Track processing status, inspect metadata, and manage data sharing with international colleagues.
                    </Text>
                </Box>

                {/* SEGMENTED TAB SELECTOR */}
                <Flex justify="center" mb={{ base: '36px', md: '56px' }}>
                    <Box
                        p="4px"
                        borderRadius="full"
                        bg="#162032"
                        border="1px solid rgba(255, 255, 255, 0.1)"
                        overflowX="auto"
                        maxW="100%"
                        sx={{
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                        }}
                    >
                        <HStack spacing="4px" minW="max-content">
                            {PROJECT_TABS.map((tab, idx) => {
                                const isSelected = activeTabIdx === idx;
                                return (
                                    <Box
                                        key={tab.id}
                                        position="relative"
                                        onClick={() => setActiveTabIdx(idx)}
                                        cursor="pointer"
                                        px={{ base: '14px', md: '20px' }}
                                        py="9px"
                                        borderRadius="full"
                                        userSelect="none"
                                    >
                                        {isSelected && (
                                            <MotionBox
                                                layoutId="activeProjectPill"
                                                position="absolute"
                                                inset={0}
                                                borderRadius="full"
                                                bg="#2693D8"
                                                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                                zIndex={1}
                                            />
                                        )}
                                        <Flex
                                            alignItems="center"
                                            gap="8px"
                                            position="relative"
                                            zIndex={2}
                                            color={isSelected ? 'white' : 'rgba(255, 255, 255, 0.7)'}
                                        >
                                            <Box color={isSelected ? 'white' : '#94a3b8'}>
                                                {tab.icon}
                                            </Box>
                                            <Text
                                                fontSize="13.5px"
                                                fontWeight={isSelected ? 700 : 500}
                                                fontFamily="'Work Sans', sans-serif"
                                            >
                                                {tab.title}
                                            </Text>
                                        </Flex>
                                    </Box>
                                );
                            })}
                        </HStack>
                    </Box>
                </Flex>

                {/* 2-COLUMN DISPLAY: ACTIVE TAB INFO & PHONE MOCKUP */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                    gap={{ base: '44px', lg: '64px' }}
                    alignItems="center"
                    maxW="1100px"
                    mx="auto"
                >
                    {/* LEFT: TEXT & BADGES */}
                    <Box>
                        <Badge
                            bg="rgba(38, 147, 216, 0.12)"
                            color="#2693D8"
                            border="1px solid rgba(38, 147, 216, 0.3)"
                            px="12px"
                            py="4px"
                            borderRadius="6px"
                            fontSize="11px"
                            fontWeight={700}
                            letterSpacing="0.08em"
                            mb="14px"
                        >
                            {activeTab.tag}
                        </Badge>
                        <Heading
                            as="h3"
                            fontSize={{ base: '24px', sm: '30px', md: '34px' }}
                            fontWeight={800}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mb="16px"
                        >
                            {activeTab.title}
                        </Heading>
                        <Text
                            fontSize="15.5px"
                            color="#cbd5e1"
                            lineHeight="1.75"
                            fontFamily="'Work Sans', sans-serif"
                            mb="28px"
                        >
                            {activeTab.description}
                        </Text>

                        {/* Quick Interactive Features */}
                        <HStack spacing="12px" wrap="wrap">
                            <Badge
                                px="12px"
                                py="6px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.06)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="#cbd5e1"
                                fontSize="12px"
                            >
                                ✓ Instant Search &amp; Filter
                            </Badge>
                            <Badge
                                px="12px"
                                py="6px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.06)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="#cbd5e1"
                                fontSize="12px"
                            >
                                ✓ Permanent DOIs
                            </Badge>
                            <Badge
                                px="12px"
                                py="6px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.06)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="#cbd5e1"
                                fontSize="12px"
                            >
                                ✓ Cloud File Exports
                            </Badge>
                        </HStack>
                    </Box>

                    {/* RIGHT: ANIMATED DEVICE PREVIEW (NATURAL, CRISP) */}
                    <Flex justify="center" align="center" position="relative" w="100%">
                        <AnimatePresence mode="wait">
                            <MotionBox
                                key={activeTab.id}
                                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                position="relative"
                                zIndex={1}
                                w="100%"
                                maxW={{ base: '280px', sm: '340px', md: '380px' }}
                                whileHover={{ y: -6, scale: 1.01 }}
                            >
                                <Image
                                    src={activeTab.image}
                                    alt={activeTab.title}
                                    w="100%"
                                    h="auto"
                                    objectFit="contain"
                                    filter="drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7))"
                                />
                            </MotionBox>
                        </AnimatePresence>
                    </Flex>
                </Grid>
            </Container>
        </Box>
    );
}
