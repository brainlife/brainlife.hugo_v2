'use client';

import React from 'react';
import { Box, Button, Container, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { Bell, Activity, CheckCircle2, Shield, ArrowUpRight, Smartphone } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import logo from '@/assets/logo.svg';
import mobileHandImg from '@/assets/landing/brainlife_mobile_hand.png';
import { getAssetPath } from '@/lib/basePath';

const rawLogoSrc = typeof logo === 'string' ? logo : (logo as StaticImageData)?.src || '/logo.svg';
const logoSrc = getAssetPath(rawLogoSrc);
const rawMobileHandImgSrc = typeof mobileHandImg === 'string' ? mobileHandImg : (mobileHandImg as StaticImageData)?.src || '/assets/landing/brainlife_mobile_hand.png';
const mobileHandImgSrc = getAssetPath(rawMobileHandImgSrc);


const MotionBox = motion.create(Box);

// Google Play Store official icon SVG
const GooglePlayIcon = () => (
    <svg viewBox="0 0 512 512" width="24px" height="24px" style={{ flexShrink: 0 }}>
        <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9z" />
        <path fill="#EA4335" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256-256L47 0z" />
        <path fill="#FBBC04" d="M325.3 277.7l60.1 59.9L104.6 499l220.7-221.3z" />
        <path fill="#34A853" d="M481.5 228.6l-96.1-55.2-60.1 60.9 60.1 60.9 96.1-55.2c16.6-9.6 16.6-25.2 0-34.8z" />
    </svg>
);

// High-tech stylized QR code SVG with center logo
const AppQRCode = () => (
    <Box
        p="12px"
        bg="white"
        borderRadius="14px"
        boxShadow="0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(92, 197, 216, 0.3)"
        position="relative"
        w="110px"
        h="110px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
    >
        <svg viewBox="0 0 100 100" width="86px" height="86px" fill="#0f172a">
            {/* Top-Left Position Detection Pattern */}
            <rect x="0" y="0" width="28" height="28" rx="4" fill="#0f172a" />
            <rect x="4" y="4" width="20" height="20" rx="2" fill="white" />
            <rect x="8" y="8" width="12" height="12" rx="2" fill="#3a6f7c" />

            {/* Top-Right Position Detection Pattern */}
            <rect x="72" y="0" width="28" height="28" rx="4" fill="#0f172a" />
            <rect x="76" y="4" width="20" height="20" rx="2" fill="white" />
            <rect x="80" y="8" width="12" height="12" rx="2" fill="#3a6f7c" />

            {/* Bottom-Left Position Detection Pattern */}
            <rect x="0" y="72" width="28" height="28" rx="4" fill="#0f172a" />
            <rect x="4" y="76" width="20" height="20" rx="2" fill="white" />
            <rect x="8" y="80" width="12" height="12" rx="2" fill="#3a6f7c" />

            {/* Timing Pattern & Data Blocks */}
            <rect x="34" y="4" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="4" width="6" height="6" fill="#0f172a" />
            <rect x="58" y="4" width="6" height="6" fill="#0f172a" />

            <rect x="4" y="34" width="6" height="6" fill="#0f172a" />
            <rect x="4" y="46" width="6" height="6" fill="#0f172a" />
            <rect x="4" y="58" width="6" height="6" fill="#0f172a" />

            <rect x="34" y="16" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="16" width="6" height="6" fill="#0f172a" />
            <rect x="58" y="16" width="6" height="6" fill="#0f172a" />

            <rect x="34" y="34" width="8" height="8" fill="#0f172a" />
            <rect x="58" y="34" width="8" height="8" fill="#0f172a" />
            <rect x="46" y="46" width="8" height="8" fill="#3a6f7c" />
            <rect x="34" y="58" width="8" height="8" fill="#0f172a" />
            <rect x="58" y="58" width="8" height="8" fill="#0f172a" />

            <rect x="76" y="34" width="6" height="6" fill="#0f172a" />
            <rect x="88" y="34" width="6" height="6" fill="#0f172a" />
            <rect x="76" y="46" width="6" height="6" fill="#0f172a" />
            <rect x="88" y="46" width="6" height="6" fill="#0f172a" />
            <rect x="76" y="58" width="6" height="6" fill="#0f172a" />
            <rect x="88" y="58" width="6" height="6" fill="#0f172a" />

            <rect x="34" y="76" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="76" width="6" height="6" fill="#0f172a" />
            <rect x="58" y="76" width="6" height="6" fill="#0f172a" />
            <rect x="76" y="76" width="6" height="6" fill="#0f172a" />
            <rect x="88" y="76" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="88" width="6" height="6" fill="#0f172a" />
            <rect x="58" y="88" width="6" height="6" fill="#0f172a" />
            <rect x="76" y="88" width="6" height="6" fill="#0f172a" />
            <rect x="88" y="88" width="6" height="6" fill="#0f172a" />
        </svg>

        {/* Center Brainlife Badge inside QR */}
        <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="24px"
            h="24px"
            bg="#0f172a"
            borderRadius="6px"
            p="3px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px solid white"
        >
            <Image src={logoSrc} alt="Brainlife logo" w="100%" h="100%" objectFit="contain" />
        </Box>
    </Box>
);

export default function MobileAppSection() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

    const googlePlayUrl = 'https://play.google.com/store/apps/details?id=com.brainlife.mobile&pcampaignid=web_share';

    return (
        <Box
            id="mobile"
            ref={containerRef}
            position="relative"
            zIndex={2}
            py={{ base: '60px', md: '90px', lg: '110px' }}
            px={{ base: '20px', md: '5vw', lg: '6vw' }}
        >
            <Container maxW="clamp(100%, 92vw, 1600px)" mx="auto" p={0}>
                <Box
                    position="relative"
                    borderRadius={{ base: '24px', md: '32px' }}
                    overflow="hidden"
                    bg="linear-gradient(135deg, rgba(19, 26, 38, 0.95) 0%, rgba(11, 14, 23, 0.98) 100%)"
                    border="1px solid rgba(92, 197, 216, 0.25)"
                    boxShadow="0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(58, 111, 124, 0.2)"
                    backdropFilter="blur(24px)"
                    p={{ base: '32px 24px', md: '48px 44px', lg: '64px 60px' }}
                >
                    {/* Background Ambient Radial Teal Glow */}
                    <Box
                        position="absolute"
                        top="-20%"
                        right="-10%"
                        w="550px"
                        h="550px"
                        bg="radial-gradient(circle, rgba(58, 111, 124, 0.25) 0%, rgba(92, 197, 216, 0.08) 45%, transparent 70%)"
                        filter="blur(70px)"
                        pointerEvents="none"
                    />

                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        alignItems="center"
                        justifyContent="space-between"
                        gap={{ base: '44px', lg: '50px' }}
                    >
                        {/* Left Info Column */}
                        <Box flex="1" maxW={{ base: '100%', lg: '620px' }}>
                            {/* Section Pill Tag */}
                            <Flex
                                display="inline-flex"
                                align="center"
                                gap="8px"
                                bg="rgba(92, 197, 216, 0.12)"
                                border="1px solid rgba(92, 197, 216, 0.35)"
                                borderRadius="full"
                                px="14px"
                                py="5px"
                                mb="20px"
                            >
                                <Smartphone size={14} color="#5cc5d8" />
                                <Text
                                    fontSize="12px"
                                    fontWeight={700}
                                    color="#5cc5d8"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    Brainlife Mobile &bull; Android
                                </Text>
                            </Flex>

                            {/* Headline */}
                            <Heading
                                as="h2"
                                fontSize={{ base: '28px', sm: '36px', md: '42px', lg: '46px' }}
                                lineHeight={1.12}
                                fontWeight={800}
                                letterSpacing="-0.03em"
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                mb="18px"
                            >
                                Monitor HPC Neuroimaging{' '}
                                <Text as="span" bgGradient="linear(to-r, #5cc5d8, #7ee0ef, #5cc5d8)" bgClip="text">
                                    Anywhere, Anytime.
                                </Text>
                            </Heading>

                            {/* Description */}
                            <Text
                                fontSize={{ base: '14px', md: '16px' }}
                                lineHeight={1.6}
                                color="rgba(248, 250, 252, 0.78)"
                                fontFamily="'Work Sans', sans-serif"
                                mb="32px"
                            >
                                Keep full oversight of your data processing pipelines, receive instant push alerts on
                                job completions or errors, and inspect multimodal datasets directly from your Android
                                device.
                            </Text>

                            {/* Key Highlights Grid */}
                            <Flex wrap="wrap" gap={{ base: '16px', sm: '24px' }} mb="36px">
                                <Flex align="center" gap="10px">
                                    <CheckCircle2 size={18} color="#5cc5d8" style={{ flexShrink: 0 }} />
                                    <Text fontSize="13px" fontWeight={600} color="white">
                                        Real-time Pipeline Tracking
                                    </Text>
                                </Flex>
                                <Flex align="center" gap="10px">
                                    <Bell size={18} color="#5cc5d8" style={{ flexShrink: 0 }} />
                                    <Text fontSize="13px" fontWeight={600} color="white">
                                        Instant Slurm Notifications
                                    </Text>
                                </Flex>
                                <Flex align="center" gap="10px">
                                    <Activity size={18} color="#5cc5d8" style={{ flexShrink: 0 }} />
                                    <Text fontSize="13px" fontWeight={600} color="white">
                                        Cluster Resource Diagnostics
                                    </Text>
                                </Flex>
                                <Flex align="center" gap="10px">
                                    <Shield size={18} color="#5cc5d8" style={{ flexShrink: 0 }} />
                                    <Text fontSize="13px" fontWeight={600} color="white">
                                        Secure OAuth SSO
                                    </Text>
                                </Flex>
                            </Flex>

                            {/* Download Action Row with Google Play Button & QR Code */}
                            <Flex
                                direction={{ base: 'column', sm: 'row' }}
                                align={{ base: 'flex-start', sm: 'center' }}
                                gap="20px"
                                p="16px 20px"
                                bg="rgba(15, 23, 42, 0.65)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                borderRadius="18px"
                            >
                                <AppQRCode />

                                <Box>
                                    <Text
                                        fontSize="12px"
                                        fontWeight={700}
                                        color="#5cc5d8"
                                        textTransform="uppercase"
                                        letterSpacing="0.08em"
                                        mb="4px"
                                    >
                                        Direct Android Download
                                    </Text>
                                    <Text fontSize="13px" color="rgba(255, 255, 255, 0.7)" mb="12px" lineHeight="1.35">
                                        Scan the QR code with your phone or tap below to get the official app on Google
                                        Play.
                                    </Text>

                                    <Button
                                        as="a"
                                        href={googlePlayUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        bg="#0f172a"
                                        border="1.5px solid rgba(92, 197, 216, 0.4)"
                                        color="white"
                                        px="20px"
                                        py="10px"
                                        h="46px"
                                        borderRadius="10px"
                                        fontSize="14px"
                                        fontWeight={600}
                                        display="inline-flex"
                                        alignItems="center"
                                        gap="12px"
                                        transition="all 0.25s ease"
                                        _hover={{
                                            bg: '#1e293b',
                                            borderColor: '#5cc5d8',
                                            boxShadow: '0 0 25px rgba(92, 197, 216, 0.35)',
                                            transform: 'translateY(-2px)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <GooglePlayIcon />
                                        <Box textAlign="left" lineHeight="1.1">
                                            <Text
                                                fontSize="9px"
                                                textTransform="uppercase"
                                                color="rgba(255,255,255,0.6)"
                                                fontWeight={600}
                                                letterSpacing="0.05em"
                                            >
                                                GET IT ON
                                            </Text>
                                            <Text fontSize="14px" fontWeight={700} color="white">
                                                Google Play
                                            </Text>
                                        </Box>
                                        <ArrowUpRight size={16} color="#5cc5d8" style={{ marginLeft: '4px' }} />
                                    </Button>
                                </Box>
                            </Flex>
                        </Box>

                        {/* Right Column: Hand-held Mobile App Visual */}
                        <Box
                            flex="0 0 auto"
                            w={{ base: '100%', sm: '320px', md: '360px', lg: '400px' }}
                            position="relative"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {/* Ambient Glow behind the Phone */}
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                w={{ base: '260px', md: '320px' }}
                                h={{ base: '420px', md: '520px' }}
                                bg="radial-gradient(ellipse at center, rgba(92, 197, 216, 0.3) 0%, rgba(58, 111, 124, 0.15) 50%, transparent 70%)"
                                filter="blur(45px)"
                                pointerEvents="none"
                                zIndex={0}
                            />

                            <MotionBox
                                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                                position="relative"
                                zIndex={1}
                                display="flex"
                                justifyContent="center"
                            >
                                <Image
                                    src={mobileHandImgSrc}
                                    alt="Brainlife Mobile App on Android"
                                    maxW={{ base: '260px', sm: '290px', md: '330px', lg: '360px' }}
                                    maxH={{ base: '520px', md: '600px' }}
                                    w="auto"
                                    h="auto"
                                    objectFit="contain"
                                    filter="drop-shadow(0 25px 50px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 30px rgba(92, 197, 216, 0.25))"
                                />
                            </MotionBox>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
