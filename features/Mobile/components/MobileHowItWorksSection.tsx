'use client';

import React from 'react';
import {
    Box,
    Container,
    Grid,
    Heading,
    Text,
    Flex,
    Badge,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { UserPlus, FolderOpen, PlayCircle, Share2, ArrowRight } from 'lucide-react';

const STEPS = [
    {
        number: '01',
        title: 'Sign In & Authenticate',
        description:
            'Log in with your existing Brainlife, Google, GitHub, or institutional InCommon / OrcID credentials.',
        icon: <UserPlus size={24} color="#2693D8" />,
    },
    {
        number: '02',
        title: 'Access Active Projects',
        description:
            'Browse your neuroimaging datasets, BIDS hierarchies, participant sessions, and computational quotas.',
        icon: <FolderOpen size={24} color="#2693D8" />,
    },
    {
        number: '03',
        title: 'Monitor Live Pipelines',
        description:
            'Track high-performance Slurm cluster tasks, inspect stdout/stderr logs, and receive completion alerts.',
        icon: <PlayCircle size={24} color="#2693D8" />,
    },
    {
        number: '04',
        title: 'Collaborate & Share',
        description:
            'Share derivatives with co-authors, review analysis trees, and mint permanent publication DOIs.',
        icon: <Share2 size={24} color="#2693D8" />,
    },
];

export default function MobileHowItWorksSection() {
    return (
        <Box py={{ base: '60px', md: '100px' }} position="relative">
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
                        How
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
                        It Works
                    </Heading>
                    <Text
                        fontSize={{ base: '15px', md: '17px' }}
                        color="#94a3b8"
                        lineHeight="1.7"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        A step-by-step guide to bringing your neuroimaging research into the palm of your hand.
                    </Text>
                </Box>

                {/* 4-STEP GRID */}
                <Grid
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                    gap="24px"
                >
                    {STEPS.map((step, idx) => (
                        <Box
                            key={idx}
                            p={{ base: '24px', md: '28px' }}
                            borderRadius="16px"
                            bg="#162032"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            boxShadow="0 10px 25px rgba(0, 0, 0, 0.35)"
                            position="relative"
                            overflow="hidden"
                            transition="all 0.2s ease"
                            _hover={{
                                borderColor: 'rgba(38, 147, 216, 0.45)',
                                transform: 'translateY(-4px)',
                                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            {/* Top Step Number Watermark */}
                            <Text
                                position="absolute"
                                top="12px"
                                right="18px"
                                fontSize="36px"
                                fontWeight={900}
                                color="rgba(255, 255, 255, 0.06)"
                                fontFamily="'Work Sans', sans-serif"
                                userSelect="none"
                            >
                                {step.number}
                            </Text>

                            <Box
                                w="48px"
                                h="48px"
                                borderRadius="12px"
                                bg="rgba(38, 147, 216, 0.12)"
                                border="1px solid rgba(38, 147, 216, 0.25)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mb="20px"
                            >
                                {step.icon}
                            </Box>

                            <Heading
                                as="h3"
                                fontSize="17px"
                                fontWeight={700}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                mb="10px"
                            >
                                {step.title}
                            </Heading>

                            <Text
                                fontSize="13.5px"
                                color="#94a3b8"
                                lineHeight="1.65"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                {step.description}
                            </Text>
                        </Box>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
