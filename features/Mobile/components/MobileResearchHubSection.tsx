'use client';

import React from 'react';
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
    VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Database, RefreshCw, Cpu, Layers } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);

const HUB_HIGHLIGHTS = [
    {
        icon: <LayoutDashboard size={20} color="#2693D8" />,
        title: 'Unified Dashboard',
        description: 'Single-view overview of all active neuroimaging projects and compute quotas.',
    },
    {
        icon: <Database size={20} color="#2693D8" />,
        title: 'BIDS Dataset Browser',
        description: 'Inspect participant sessions, anatomical scans, and diffusion b-values seamlessly.',
    },
    {
        icon: <RefreshCw size={20} color="#2693D8" />,
        title: 'Quick Pipeline Restart',
        description: 'Restart failed Slurm jobs or re-trigger QC validation with one tap.',
    },
    {
        icon: <Cpu size={20} color="#2693D8" />,
        title: 'Compute Node Allocation',
        description: 'Monitor GPU/CPU utilization across IU Carbonate, TACC, and Cloud nodes.',
    },
];

export default function MobileResearchHubSection() {
    return (
        <Box
            py={{ base: '60px', md: '100px' }}
            position="relative"
        >
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* SECTION HEADER */}
                <Box textAlign="center" maxW="840px" mx="auto" mb={{ base: '48px', md: '72px' }} position="relative">
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
                        Research
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
                        Hub &amp; BIDS Browser
                    </Heading>
                    <Text
                        fontSize={{ base: '15px', md: '17px' }}
                        color="#94a3b8"
                        lineHeight="1.7"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        Access all your neuroimaging projects and datasets from a clean, high-density interface designed specifically for computational neuroscientists on the move.
                    </Text>
                </Box>

                {/* 2-COLUMN SHOWCASE: DEVICE FRAME + HIGHLIGHT CARDS */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1.2fr 1fr' }}
                    gap={{ base: '44px', lg: '56px', xl: '72px' }}
                    alignItems="center"
                >
                    {/* LEFT: 3-PHONE SCREENSHOT MOCKUP (NATURAL, CRISP) */}
                    <Flex justify="center" align="center" position="relative" w="100%">
                        <MotionBox
                            position="relative"
                            zIndex={1}
                            w="100%"
                            maxW={{ base: '100%', sm: '520px', md: '620px', lg: '700px', xl: '780px' }}
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            whileHover={{ y: -8, scale: 1.01 }}
                        >
                            <Image
                                src={getAssetPath('/img/brainlifemobile/homepage_phones.png')}
                                alt="Brainlife Mobile Research Hub Multi-Screen Interface"
                                w="100%"
                                h="auto"
                                objectFit="contain"
                                filter="drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7))"
                            />
                        </MotionBox>
                    </Flex>

                    {/* RIGHT: FEATURE GRID */}
                    <VStack spacing="16px" align="stretch">
                        {HUB_HIGHLIGHTS.map((item, idx) => (
                            <Box
                                key={idx}
                                p={{ base: '18px 20px', md: '22px 24px' }}
                                borderRadius="14px"
                                bg="#162032"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                boxShadow="0 10px 25px rgba(0, 0, 0, 0.35)"
                                transition="all 0.2s ease"
                                _hover={{
                                    borderColor: 'rgba(38, 147, 216, 0.4)',
                                    transform: 'translateX(4px)',
                                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
                                }}
                            >
                                <Flex gap="16px" alignItems="flex-start">
                                    <Box
                                        w="40px"
                                        h="40px"
                                        borderRadius="10px"
                                        bg="rgba(38, 147, 216, 0.12)"
                                        border="1px solid rgba(38, 147, 216, 0.25)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                        mt="2px"
                                    >
                                        {item.icon}
                                    </Box>
                                    <Box>
                                        <Heading
                                            as="h3"
                                            fontSize="16px"
                                            fontWeight={700}
                                            color="white"
                                            fontFamily="'Work Sans', sans-serif"
                                            mb="6px"
                                        >
                                            {item.title}
                                        </Heading>
                                        <Text
                                            fontSize="13.5px"
                                            color="#94a3b8"
                                            lineHeight="1.6"
                                            fontFamily="'Work Sans', sans-serif"
                                        >
                                            {item.description}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        ))}
                    </VStack>
                </Grid>
            </Container>
        </Box>
    );
}
