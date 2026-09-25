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
    Button,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Activity,
    ShieldCheck,
    Bell,
    Zap,
    CheckCircle2,
} from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);

const HERO_FEATURES = [
    {
        icon: <Activity size={22} color="#2693D8" />,
        title: 'Real-Time Metrics',
        description: 'Track compute hours, Slurm job states, and cluster health live.',
    },
    {
        icon: <ShieldCheck size={22} color="#2693D8" />,
        title: 'Secure Access',
        description: 'Biometric authentication & end-to-end encrypted OAuth tokens.',
    },
    {
        icon: <Bell size={22} color="#2693D8" />,
        title: 'Instant Alerts',
        description: 'Push notifications the moment pipelines finish or require action.',
    },
    {
        icon: <Zap size={22} color="#2693D8" />,
        title: 'Cloud HPC Sync',
        description: 'Seamless multi-cluster orchestration right from your pocket.',
    },
];

export default function MobileHeroSection() {
    return (
        <Box
            position="relative"
            pt={{ base: '120px', md: '160px', lg: '180px' }}
            pb={{ base: '60px', md: '100px' }}
            overflow="hidden"
        >
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                position="relative"
                zIndex={1}
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* 2-COLUMN HERO ROW: TEXT & CTA + 3D PHONE MOCKUP */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }}
                    gap={{ base: '48px', lg: '64px' }}
                    alignItems="center"
                    mb={{ base: '56px', md: '80px' }}
                >
                    {/* LEFT COLUMN: HERO COPY */}
                    <Box textAlign={{ base: 'center', lg: 'left' }}>
                        {/* Header with giant watermark "Mobile" and bold title */}
                        <Box position="relative" mb={{ base: '22px', md: '28px' }}>
                            <Text
                                fontSize={{ base: '70px', sm: '95px', md: '120px', lg: '140px' }}
                                fontWeight={900}
                                color="rgba(255, 255, 255, 0.08)"
                                letterSpacing="-0.04em"
                                lineHeight="0.85"
                                fontFamily="'Work Sans', sans-serif"
                                userSelect="none"
                                pointerEvents="none"
                            >
                                Mobile
                            </Text>
                            <Heading
                                as="h1"
                                fontSize={{ base: '32px', sm: '44px', md: '54px', lg: '62px' }}
                                fontWeight={900}
                                lineHeight={{ base: '1.15', md: '1.1' }}
                                letterSpacing="-0.035em"
                                fontFamily="'Work Sans', sans-serif"
                                color="white"
                                mt={{ base: '-20px', sm: '-28px', md: '-38px' }}
                            >
                                Your Neuroimaging Lab,{' '}
                                <Text
                                    as="span"
                                    color="#2693D8"
                                >
                                    in Your Pocket.
                                </Text>
                            </Heading>
                        </Box>

                        <Text
                            fontSize={{ base: '16px', sm: '17.5px', md: '19px' }}
                            color="#94a3b8"
                            lineHeight="1.7"
                            fontFamily="'Work Sans', sans-serif"
                            maxW="640px"
                            mx={{ base: 'auto', lg: '0' }}
                            mb="36px"
                        >
                            Begin your journey toward seamless neuroscience research. Monitor Slurm &amp; Kubernetes supercomputing pipelines, receive instant job completion notifications, and manage datasets anywhere.
                        </Text>

                        {/* App Store & Google Play Store Badges */}
                        <Flex
                            direction={{ base: 'column', sm: 'row' }}
                            gap="14px"
                            justify={{ base: 'center', lg: 'flex-start' }}
                            align="center"
                            mb="32px"
                        >
                            {/* App Store Button */}
                            <Button
                                as="a"
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                h="54px"
                                px="22px"
                                borderRadius="10px"
                                bg="#162032"
                                border="1px solid rgba(255, 255, 255, 0.15)"
                                color="white"
                                _hover={{
                                    bg: '#1e2d44',
                                    borderColor: '#2693D8',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(38, 147, 216, 0.25)',
                                }}
                                transition="all 0.2s ease"
                            >
                                <Flex alignItems="center" gap="12px">
                                    <svg viewBox="0 0 384 512" width="22px" height="22px" fill="currentColor">
                                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                                    </svg>
                                    <Box textAlign="left">
                                        <Text fontSize="10px" color="#94a3b8" lineHeight="1" textTransform="uppercase" letterSpacing="0.05em">
                                            Download on the
                                         </Text>
                                        <Text fontSize="15px" fontWeight={700} lineHeight="1.2" fontFamily="'Work Sans', sans-serif">
                                            App Store
                                        </Text>
                                    </Box>
                                </Flex>
                            </Button>

                            {/* Google Play Button */}
                            <Button
                                as="a"
                                href="https://play.google.com/store/apps/details?id=com.brainlife.mobile&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                                h="54px"
                                px="22px"
                                borderRadius="10px"
                                bg="#162032"
                                border="1px solid rgba(255, 255, 255, 0.15)"
                                color="white"
                                _hover={{
                                    bg: '#1e2d44',
                                    borderColor: '#2693D8',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 24px rgba(38, 147, 216, 0.25)',
                                }}
                                transition="all 0.2s ease"
                            >
                                <Flex alignItems="center" gap="12px">
                                    <svg viewBox="0 0 512 512" width="20px" height="20px" fill="currentColor">
                                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                                    </svg>
                                    <Box textAlign="left">
                                        <Text fontSize="10px" color="#94a3b8" lineHeight="1" textTransform="uppercase" letterSpacing="0.05em">
                                            GET IT ON
                                        </Text>
                                        <Text fontSize="15px" fontWeight={700} lineHeight="1.2" fontFamily="'Work Sans', sans-serif">
                                            Google Play
                                        </Text>
                                    </Box>
                                </Flex>
                            </Button>
                        </Flex>

                        {/* Trust Checkmarks */}
                        <HStack
                            spacing={{ base: '16px', sm: '24px' }}
                            justify={{ base: 'center', lg: 'flex-start' }}
                            wrap="wrap"
                        >
                            <HStack spacing="6px">
                                <CheckCircle2 size={15} color="#2693D8" />
                                <Text fontSize="13px" color="#cbd5e1">
                                    Free for registered researchers
                                </Text>
                            </HStack>
                            <HStack spacing="6px">
                                <CheckCircle2 size={15} color="#2693D8" />
                                <Text fontSize="13px" color="#cbd5e1">
                                    Multi-cluster Slurm sync
                                </Text>
                            </HStack>
                        </HStack>
                    </Box>

                    {/* RIGHT COLUMN: 3D FLOATING PHONE MOCKUP (NATURAL, CRISP) */}
                    <Flex justify="center" position="relative">
                        <MotionBox
                            position="relative"
                            zIndex={1}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            maxW={{ base: '260px', sm: '320px', md: '360px' }}
                        >
                            <Image
                                src={getAssetPath('/img/brainlifemobile/hero_phone.png')}
                                alt="Brainlife Mobile App on iPhone mockup"
                                w="100%"
                                h="auto"
                                objectFit="contain"
                                filter="drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7))"
                            />
                        </MotionBox>
                    </Flex>
                </Grid>

                {/* 4 FEATURE METRIC TILES (Solid Brainlife Theme) */}
                <Grid
                    templateColumns={{
                        base: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    }}
                    gap="20px"
                >
                    {HERO_FEATURES.map((feat, idx) => (
                        <Box
                            key={idx}
                            p="24px"
                            borderRadius="14px"
                            bg="#162032"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            boxShadow="0 10px 25px rgba(0, 0, 0, 0.35)"
                            transition="all 0.2s ease"
                            _hover={{
                                borderColor: 'rgba(38, 147, 216, 0.4)',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <Box
                                w="44px"
                                h="44px"
                                borderRadius="10px"
                                bg="rgba(38, 147, 216, 0.12)"
                                border="1px solid rgba(38, 147, 216, 0.25)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mb="16px"
                            >
                                {feat.icon}
                            </Box>
                            <Heading
                                as="h3"
                                fontSize="16px"
                                fontWeight={700}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                mb="8px"
                            >
                                {feat.title}
                            </Heading>
                            <Text
                                fontSize="13.5px"
                                color="#94a3b8"
                                lineHeight="1.6"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                {feat.description}
                            </Text>
                        </Box>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
