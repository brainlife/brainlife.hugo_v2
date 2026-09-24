'use client';

import React from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import UsersHeroSection from './components/UsersHeroSection';
import ResearchSpotlightSection from './components/ResearchSpotlightSection';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    Spinner,
} from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { redirectToBrainlifeLogin } from '@/contexts/AuthContext.helpers';

const GlobalUserMap = dynamic(() => import('./components/GlobalUserMap'), {
    ssr: false,
    loading: () => (
        <Box
            h="620px"
            bg="#162032"
            borderRadius="16px"
            border="1px solid rgba(255, 255, 255, 0.1)"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Spinner size="xl" color="#2693D8" thickness="3px" />
        </Box>
    ),
});

export default function UsersPage() {
    return (
        <Box
            minHeight="100vh"
            position="relative"
            color="white"
            bg="#0e1626"
        >
            {/* Top Navigation Header */}
            <Navbar />

            {/* MAIN CONTENT CONTAINER */}
            <Container
                maxW="clamp(100%, 92vw, 1600px)"
                mx="auto"
                position="relative"
                zIndex={2}
                pt={{ base: '80px', md: '95px', lg: '105px' }}
                pb={{ base: '60px', md: '100px' }}
                px={{ base: '20px', md: '5vw', lg: '6vw' }}
            >
                {/* 1. DYNAMIC INTERACTIVE USERS HERO SECTION */}
                <UsersHeroSection />

                {/* 2. REAL-WORLD RESEARCH SPOTLIGHT */}
                <Box id="research-spotlight" scrollMarginTop="100px">
                    <ResearchSpotlightSection />
                </Box>

                {/* 3. GLOBAL USER BASE INTERACTIVE MAP */}
                <Box id="global-map" scrollMarginTop="100px" mb={{ base: '64px', md: '90px' }}>
                    <GlobalUserMap />
                </Box>

                {/* 4. CALL TO ACTION BANNER */}
                <Box
                    borderRadius="16px"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(38, 147, 216, 0.35)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.4)"
                    p={{ base: '40px 20px', md: '56px 40px' }}
                    textAlign="center"
                    overflow="hidden"
                >
                    <Box maxW="720px" mx="auto" position="relative">
                        <Text
                            fontSize={{ base: '48px', sm: '68px', md: '88px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Want to join
                        </Text>
                        <Heading
                            fontSize={{ base: '26px', sm: '32px', md: '40px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mt={{ base: '-14px', sm: '-20px', md: '-26px' }}
                            mb="14px"
                        >
                            the brainlife family?
                        </Heading>
                        <Text
                            fontSize="15px"
                            color="#94a3b8"
                            lineHeight="1.6"
                            fontFamily="'Work Sans', sans-serif"
                            mb="24px"
                        >
                            Join thousands of researchers using Brainlife for reproducible high-performance neuroimaging.
                            Sign in with your academic credentials or explore public datasets right away.
                        </Text>
                        <Flex justify="center" gap="14px" wrap="wrap">
                            <Button
                                onClick={redirectToBrainlifeLogin}
                                bg="#2693D8"
                                color="white"
                                px="28px"
                                py="12px"
                                h="44px"
                                borderRadius="8px"
                                fontWeight={700}
                                fontSize="14px"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: '#1d74ae',
                                    boxShadow: '0 0 20px rgba(38, 147, 216, 0.5)',
                                    transform: 'translateY(-1px)',
                                }}
                            >
                                Open Portal / Sign In
                            </Button>
                            <Button
                                as={NextLink}
                                href="/about"
                                variant="outline"
                                borderColor="rgba(255, 255, 255, 0.25)"
                                color="white"
                                px="24px"
                                py="12px"
                                h="44px"
                                borderRadius="8px"
                                fontWeight={600}
                                fontSize="14px"
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.08)',
                                    borderColor: 'white',
                                }}
                            >
                                Learn More About Brainlife
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

