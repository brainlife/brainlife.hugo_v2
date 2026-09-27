'use client';

import React from 'react';
import NextLink from 'next/link';
import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Text,
    Link,
    Image,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { ExternalLink, Mail, Heart } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import logo from '@/assets/logo.svg';
import { getAssetPath } from '@/lib/basePath';

const rawLogoSrc = typeof logo === 'string' ? logo : (logo as StaticImageData)?.src || '/logo.svg';
const logoSrc = getAssetPath(rawLogoSrc);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" width="16px" height="16px" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);

const XTwitterIcon = () => (
    <svg viewBox="0 0 24 24" width="16px" height="16px" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const FOOTER_COLUMNS = [
    {
        title: 'Platform',
        links: [
            { label: 'Apps & Pipelines', href: 'https://brainlife.io/apps', isExternal: true },
            { label: 'Public Datasets', href: 'https://brainlife.io/datasets', isExternal: true },
            { label: 'ezBIDS Tool', href: 'https://brainlife.io/ezbids/', isExternal: true },
            { label: 'Brainlife Mobile', href: '/mobile', isExternal: false },
            { label: 'Sign In / Register', href: 'https://brainlife.io/auth', isExternal: true },
        ],
    },
    {
        title: 'Community',
        links: [
            { label: 'About Brainlife', href: '/about', isExternal: false },
            { label: 'Team & Alumni', href: '/about', isExternal: false },
            { label: 'Users & Impact', href: '/users', isExternal: false },
            { label: 'Pestilli Lab', href: 'https://liberalarts.utexas.edu/psychology/faculty/fp4834', isExternal: true },
            { label: 'Publications & Citations', href: 'https://brainlife.io/docs/user/cite/', isExternal: true },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation', href: 'https://brainlife.io/docs/', isExternal: true },
            { label: 'Computational Provenance', href: 'https://brainlife.io/docs/user/provenance/', isExternal: true },
            { label: 'Supported Data Types', href: 'https://brainlife.io/docs/user/datatypes/', isExternal: true },
            { label: 'API & Developer Specs', href: 'https://brainlife.io/docs/technical/', isExternal: true },
            { label: 'System Status', href: 'https://status.brainlife.io', isExternal: true },
        ],
    },
    {
        title: 'Support & Code',
        links: [
            { label: 'GitHub Organization', href: 'https://github.com/brainlife', isExternal: true },
            { label: 'User Community Forum', href: 'https://brainlife.io/docs/user/support/', isExternal: true },
            { label: 'Contact Support', href: 'mailto:support@brainlife.io', isExternal: true },
            { label: 'Privacy Policy', href: 'https://brainlife.io/docs/technical/privacy/', isExternal: true },
            { label: 'Terms of Use', href: 'https://brainlife.io/docs/technical/terms/', isExternal: true },
        ],
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            as="footer"
            bg="linear-gradient(180deg, #0a1120 0%, #060a14 100%)"
            borderTop="1px solid rgba(255, 255, 255, 0.08)"
            color="white"
            position="relative"
            zIndex={10}
            mt="auto"
        >
            {/* Top decorative gradient highlight */}
            <Box
                position="absolute"
                top={0}
                left="10%"
                right="10%"
                h="1px"
                bg="linear-gradient(90deg, transparent, rgba(38, 147, 216, 0.5), rgba(92, 197, 216, 0.5), transparent)"
            />

            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                px={{ base: '20px', md: '36px', lg: '48px' }}
                pt={{ base: '48px', md: '64px' }}
                pb={{ base: '32px', md: '44px' }}
            >
                {/* Main 2-part grid: Left brand column + Right link columns */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1.2fr 2fr' }}
                    gap={{ base: '40px', lg: '64px' }}
                    mb={{ base: '40px', md: '56px' }}
                >
                    {/* Brand Column */}
                    <Box>
                        <Flex
                            as={NextLink}
                            href="/"
                            alignItems="center"
                            gap="10px"
                            display="inline-flex"
                            textDecoration="none"
                            _hover={{ textDecoration: 'none' }}
                            mb="18px"
                        >
                            <Image
                                src={logoSrc}
                                alt="brainlife.io logo"
                                h={{ base: '28px', md: '32px' }}
                                w="auto"
                                objectFit="contain"
                            />
                            <Text
                                fontSize={{ base: '18px', md: '21px' }}
                                fontWeight="800"
                                letterSpacing="-0.02em"
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                brainlife<Text as="span" color="#2693D8">.io</Text>
                            </Text>
                        </Flex>

                        <Text
                            fontSize="13.5px"
                            color="rgba(255, 255, 255, 0.65)"
                            lineHeight="1.65"
                            maxW="420px"
                            mb="20px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Free and open-source cloud computing platform for secure, reproducible
                            neuroimaging research, HPC Slurm execution, and standardized BIDS workflows.
                        </Text>

                        {/* Pestilli Lab & Institution Attribution */}
                        <Box
                            p="14px 18px"
                            borderRadius="10px"
                            bg="rgba(22, 32, 50, 0.6)"
                            border="1px solid rgba(255, 255, 255, 0.07)"
                            maxW="420px"
                            mb="22px"
                        >
                            <Text
                                fontSize="12px"
                                fontWeight="700"
                                color="#5cc5d8"
                                letterSpacing="0.04em"
                                textTransform="uppercase"
                                mb="4px"
                            >
                                Directed by Pestilli Lab
                            </Text>
                            <Text
                                fontSize="12.5px"
                                color="rgba(255, 255, 255, 0.8)"
                                lineHeight="1.5"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                University of Texas at Austin &amp; Indiana University
                            </Text>
                        </Box>

                        {/* Social & Contact Icons */}
                        <HStack spacing="14px">
                            <Link
                                href="https://github.com/brainlife"
                                isExternal
                                aria-label="Brainlife GitHub"
                                p="8px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="rgba(255, 255, 255, 0.75)"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'rgba(38, 147, 216, 0.2)',
                                    color: 'white',
                                    borderColor: 'rgba(38, 147, 216, 0.5)',
                                    transform: 'translateY(-2px)',
                                }}
                            >
                                <GitHubIcon />
                            </Link>
                            <Link
                                href="https://x.com/brainlifeio"
                                isExternal
                                aria-label="Brainlife on X / Twitter"
                                p="8px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="rgba(255, 255, 255, 0.75)"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'rgba(38, 147, 216, 0.2)',
                                    color: 'white',
                                    borderColor: 'rgba(38, 147, 216, 0.5)',
                                    transform: 'translateY(-2px)',
                                }}
                            >
                                <XTwitterIcon />
                            </Link>
                            <Link
                                href="mailto:support@brainlife.io"
                                aria-label="Email Support"
                                p="8px"
                                borderRadius="8px"
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color="rgba(255, 255, 255, 0.75)"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'rgba(38, 147, 216, 0.2)',
                                    color: 'white',
                                    borderColor: 'rgba(38, 147, 216, 0.5)',
                                    transform: 'translateY(-2px)',
                                }}
                            >
                                <Mail size={17} />
                            </Link>
                        </HStack>
                    </Box>

                    {/* Navigation Columns */}
                    <Grid
                        templateColumns={{
                            base: 'repeat(2, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        }}
                        gap={{ base: '28px', sm: '32px', md: '24px' }}
                    >
                        {FOOTER_COLUMNS.map((col) => (
                            <GridItem key={col.title}>
                                <Text
                                    fontSize="12px"
                                    fontWeight="700"
                                    letterSpacing="0.08em"
                                    textTransform="uppercase"
                                    color="#94a3b8"
                                    mb="16px"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    {col.title}
                                </Text>
                                <VStack align="flex-start" spacing="10px">
                                    {col.links.map((link) => {
                                        if (link.isExternal) {
                                            return (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    isExternal
                                                    fontSize="13.5px"
                                                    color="rgba(255, 255, 255, 0.65)"
                                                    fontFamily="'Work Sans', sans-serif"
                                                    display="inline-flex"
                                                    alignItems="center"
                                                    gap="4px"
                                                    transition="all 0.18s ease"
                                                    _hover={{
                                                        color: '#5cc5d8',
                                                        textDecoration: 'none',
                                                        transform: 'translateX(2px)',
                                                    }}
                                                >
                                                    {link.label}
                                                    <ExternalLink size={12} opacity={0.6} />
                                                </Link>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={link.label}
                                                as={NextLink}
                                                href={link.href}
                                                fontSize="13.5px"
                                                color="rgba(255, 255, 255, 0.65)"
                                                fontFamily="'Work Sans', sans-serif"
                                                transition="all 0.18s ease"
                                                _hover={{
                                                    color: '#5cc5d8',
                                                    textDecoration: 'none',
                                                    transform: 'translateX(2px)',
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </VStack>
                            </GridItem>
                        ))}
                    </Grid>
                </Grid>

                {/* Funding & Acknowledgement Ribbon */}
                {/* <Box
                    pt="24px"
                    pb="24px"
                    borderTop="1px solid rgba(255, 255, 255, 0.06)"
                    borderBottom="1px solid rgba(255, 255, 255, 0.06)"
                    mb="24px"
                >
                    <Text
                        fontSize="12px"
                        color="rgba(255, 255, 255, 0.45)"
                        lineHeight="1.6"
                        textAlign={{ base: 'left', md: 'center' }}
                        fontFamily="'Work Sans', sans-serif"
                    >
                        Brainlife is publicly supported by the{' '}
                        <Text as="span" color="rgba(255, 255, 255, 0.75)" fontWeight="600">
                            National Science Foundation (NSF)
                        </Text>
                        ,{' '}
                        <Text as="span" color="rgba(255, 255, 255, 0.75)" fontWeight="600">
                            National Institutes of Health (NIH)
                        </Text>
                        ,{' '}
                        <Text as="span" color="rgba(255, 255, 255, 0.75)" fontWeight="600">
                            Department of Defense (DoD)
                        </Text>
                        , and the{' '}
                        <Text as="span" color="rgba(255, 255, 255, 0.75)" fontWeight="600">
                            Kavli Foundation
                        </Text>
                        . Built with{' '}
                        <Heart
                            size={12}
                            color="#e53e3e"
                            fill="#e53e3e"
                            style={{ display: 'inline', verticalAlign: 'middle' }}
                        />{' '}
                        for open scientific reproducibility.
                    </Text>
                </Box> */}

                {/* Bottom Bar: Copyright & Rights */}
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align={{ base: 'flex-start', sm: 'center' }}
                    gap="12px"
                >
                    <Text
                        fontSize="13px"
                        color="rgba(255, 255, 255, 0.55)"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        © Pestillilab. All rights reserved.
                    </Text>

                    <HStack spacing="20px" fontSize="12.5px" color="rgba(255, 255, 255, 0.5)">
                        <Link
                            href="https://brainlife.io/docs/privacy/"
                            isExternal
                            _hover={{ color: 'white', textDecoration: 'none' }}
                        >
                            Privacy Policy
                        </Link>
                        <Text>•</Text>
                        <Link
                            href="https://brainlife.io/docs/technical/terms/"
                            isExternal
                            _hover={{ color: 'white', textDecoration: 'none' }}
                        >
                            Terms of Service
                        </Link>
                       
                     
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}
