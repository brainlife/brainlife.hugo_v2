'use client';

import React from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Button,
} from '@chakra-ui/react';

export default function MobileDownloadCtaSection() {
    return (
        <Box py={{ base: '60px', md: '100px' }} position="relative">
            <Container
                maxW="clamp(100%, 94vw, 1400px)"
                mx="auto"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                <Box
                    position="relative"
                    borderRadius="16px"
                    p={{ base: '40px 20px', sm: '52px 32px', md: '64px 40px' }}
                    bg="#162032"
                    border="1px solid rgba(38, 147, 216, 0.35)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.4)"
                    overflow="hidden"
                    textAlign="center"
                >
                    <Box position="relative" maxW="780px" mx="auto">
                        <Text
                            fontSize={{ base: '50px', sm: '72px', md: '95px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Download
                        </Text>
                        <Heading
                            as="h2"
                            fontSize={{ base: '26px', sm: '36px', md: '44px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.03em"
                            lineHeight="1.15"
                            mt={{ base: '-16px', sm: '-22px', md: '-28px' }}
                            mb="16px"
                        >
                            Brainlife Mobile Today
                        </Heading>

                        <Text
                            fontSize={{ base: '15px', md: '17px' }}
                            color="#94a3b8"
                            lineHeight="1.7"
                            fontFamily="'Work Sans', sans-serif"
                            mb="36px"
                        >
                            Download Brainlife Mobile today and experience frictionless monitoring of computational pipelines, datasets, and collaborative research teams.
                        </Text>

                        {/* STORE BUTTONS */}
                        <Flex
                            direction={{ base: 'column', sm: 'row' }}
                            gap="14px"
                            justify="center"
                            align="center"
                            mb="24px"
                        >
                            {/* App Store */}
                            <Button
                                as="a"
                                href="https://apps.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                h="54px"
                                px="24px"
                                borderRadius="10px"
                                bg="#0e1626"
                                border="1px solid rgba(255, 255, 255, 0.15)"
                                color="white"
                                _hover={{
                                    bg: '#1a2333',
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

                            {/* Google Play */}
                            <Button
                                as="a"
                                href="https://play.google.com/store/apps/details?id=com.brainlife.mobile&pcampaignid=web_share"
                                target="_blank"
                                rel="noopener noreferrer"
                                h="54px"
                                px="24px"
                                borderRadius="10px"
                                bg="#0e1626"
                                border="1px solid rgba(255, 255, 255, 0.15)"
                                color="white"
                                _hover={{
                                    bg: '#1a2333',
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

                        <Text fontSize="13px" color="#94a3b8" fontFamily="'Work Sans', sans-serif">
                            Looking for full pipeline execution? Visit the{' '}
                            <Text
                                as="a"
                                href="https://brainlife.io"
                                color="#2693D8"
                                textDecoration="underline"
                                _hover={{ color: '#1d74ae' }}
                            >
                                Brainlife Web Platform
                            </Text>
                        </Text>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
