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
    VStack,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle, Share2, Sparkles, Clock } from 'lucide-react';

const MotionBox = motion.create(Box);

const NOTIFICATION_POINTS = [
    {
        title: 'Job Completion Alerts',
        desc: 'Instant notifications the second diffusion tractography, FreeSurfer cortical segmentation, or BIDS apps complete.',
    },
    {
        title: 'Resource & Walltime Warnings',
        desc: 'Real-time alerts if Slurm jobs exceed memory limits or approaching walltime cutoffs on supercomputers.',
    },
    {
        title: 'Collaborator Data Sharing',
        desc: 'Know immediately when a co-author shares a processed derivative or requests review on a shared dataset.',
    },
    {
        title: 'Critical Action Reminders',
        desc: 'Prompt reminders to publish DOIs, resolve BIDS curation warnings, or accept project invitations.',
    },
];

export default function MobileNotificationSection() {
    return (
        <Box
            py={{ base: '60px', md: '100px' }}
            position="relative"
            overflow="hidden"
        >
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                    gap={{ base: '44px', lg: '56px', xl: '72px' }}
                    alignItems="center"
                >
                    {/* LEFT COLUMN: INTERACTIVE NOTIFICATION HIGHLIGHTS */}
                    <Box order={{ base: 2, lg: 1 }}>
                        <Box position="relative" mb="18px">
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
                                Live
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
                                Alerts &amp; Notifications
                            </Heading>
                            <Text
                                fontSize={{ base: '15px', md: '16.5px' }}
                                color="#94a3b8"
                                lineHeight="1.7"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Never wonder if your 12-hour compute run finished. Brainlife Mobile sends real-time push alerts straight to your device so you can inspect outputs and keep research moving.
                            </Text>
                        </Box>

                        {/* LIST OF NOTIFICATION FEATURES */}
                        <VStack spacing="14px" align="stretch">
                            {NOTIFICATION_POINTS.map((pt, idx) => (
                                <HStack
                                    key={idx}
                                    align="flex-start"
                                    spacing="14px"
                                    p="14px 18px"
                                    borderRadius="12px"
                                    bg="#162032"
                                    border="1px solid rgba(255, 255, 255, 0.08)"
                                    boxShadow="0 6px 16px rgba(0, 0, 0, 0.25)"
                                    transition="all 0.2s ease"
                                    _hover={{
                                        borderColor: 'rgba(38, 147, 216, 0.4)',
                                        transform: 'translateX(4px)',
                                    }}
                                >
                                    <Box
                                        w="24px"
                                        h="24px"
                                        borderRadius="full"
                                        bg="rgba(38, 147, 216, 0.15)"
                                        border="1px solid rgba(38, 147, 216, 0.35)"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                        mt="2px"
                                    >
                                        <CheckCircle size={13} color="#2693D8" />
                                    </Box>
                                    <Box>
                                        <Text
                                            fontSize="15px"
                                            fontWeight={700}
                                            color="white"
                                            fontFamily="'Work Sans', sans-serif"
                                        >
                                            {pt.title}
                                        </Text>
                                        <Text
                                            fontSize="13px"
                                            color="#94a3b8"
                                            lineHeight="1.5"
                                            mt="2px"
                                            fontFamily="'Work Sans', sans-serif"
                                        >
                                            {pt.desc}
                                        </Text>
                                    </Box>
                                </HStack>
                            ))}
                        </VStack>
                    </Box>

                    {/* RIGHT COLUMN: RESEARCHER IN LAB (NATURAL, CRISP) */}
                    <Flex justify="center" align="center" position="relative" order={{ base: 1, lg: 2 }} w="100%" h="100%">
                        <MotionBox
                            position="relative"
                            zIndex={1}
                            w="100%"
                            maxW={{ base: '100%', sm: '380px', md: '440px', lg: '480px' }}
                            maxH={{ base: '420px', sm: '480px', md: '520px', lg: '540px' }}
                            borderRadius={{ base: '16px', md: '20px' }}
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            boxShadow="0 20px 45px rgba(0, 0, 0, 0.7)"
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
                                src="/img/brainlifemobile/notification_researcher.png"
                                alt="Brainlife Mobile Real-Time Notifications in Lab"
                                w="100%"
                                h="100%"
                                maxH={{ base: '420px', sm: '480px', md: '520px', lg: '540px' }}
                                objectFit="cover"
                            />
                        </MotionBox>
                    </Flex>
                </Grid>
            </Container>
        </Box>
    );
}
