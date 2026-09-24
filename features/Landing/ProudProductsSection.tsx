'use client';

import React from 'react';
import { Box, Container, Flex, Heading, Text, Image, Badge, SimpleGrid, Link } from '@chakra-ui/react';
import type { ResponsiveValue } from '@chakra-ui/react';
import type { StaticImageData } from 'next/image';
import {
    ArrowUpRight,
    ExternalLink,
    Bot,
    Menu,
    LayoutDashboard,
    Folder,
    Database,
    LayoutGrid,
    GitBranch,
    Shield,
    Rocket,
    FlaskConical,
    Plus,
    PlusCircle,
    Share2,
    History,
    Send,
    ChevronRight,
    User,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ezBidsImg from '@/assets/landing/Ezbids.png';
import ezGovImg from '@/assets/landing/ezgov.png';
import dicompareImg from '@/assets/landing/dicompare.png';

const getSrc = (img: StaticImageData | string | { src?: string } | undefined, fallback: string) =>
    (typeof img === 'string' ? img : (img as StaticImageData)?.src || fallback);

const ezBidsImgSrc = getSrc(ezBidsImg, '/assets/landing/Ezbids.png');
const ezGovImgSrc = getSrc(ezGovImg, '/assets/landing/ezgov.png');
const dicompareImgSrc = getSrc(dicompareImg, '/assets/landing/dicompare.png');

const MotionBox = motion.create(Box);

const proudProducts = [
    {
        id: 'ezbids',
        title: 'ezBIDS: Automated BIDS Converter',
        category: 'BIDS STANDARDIZATION & VALIDATION',
        description:
            'Convert raw DICOM & NIfTI datasets into standardized BIDS format directly in your web browser with automated AI-assisted validation.',
        image: ezBidsImgSrc,
        badges: ['BIDS Standard', 'Zero Install', 'Automated QA'],
        url: 'https://brainlife.io/ezbids/',
        actionLabel: 'LAUNCH WEB APP',
    },
    {
        id: 'ezgov',
        title: 'ezGov: FAIR Data Governance',
        category: 'COMPLIANCE & ACCESS CONTROL',
        description:
            'Manage dataset access permissions, data sharing agreements, IRB compliance metadata, and FAIR data publishing workflows.',
        image: ezGovImgSrc,
        badges: ['FAIR Compliance', 'Access Control', 'IRB Metadata'],
        url: 'https://brainlife.io/',
        actionLabel: 'LAUNCH WEB APP',
    },
    {
        id: 'dicompare',
        title: 'DICOMpare: Multi-Subject Header Diff',
        category: 'PROTOCOL QA & DRIFT INSPECTION',
        description:
            'Inspect multi-subject DICOM headers side-by-side to detect acquisition protocol drift, missing sequence parameters, and vendor variations.',
        image: dicompareImgSrc,
        badges: ['DICOM Inspection', 'Protocol Diff', 'Multi-Subject QA'],
        url: 'https://brainlife.io/',
        actionLabel: 'LAUNCH WEB APP',
    },
    {
        id: 'skai',
        title: 'SKAI: AI Copilot for Neuroscience',
        category: 'NATURAL LANGUAGE & SLURM HPC',
        description:
            'Converse, query open datasets, validate inputs, auto-generate Slurm pipelines, and dispatch 500+ apps on distributed GPU clusters.',
        image: '',
        badges: ['AI Copilot', 'Natural Language', 'Slurm Automation'],
        url: 'https://brainlife.io/',
        actionLabel: 'TRY AI ASSISTANT',
    },
];

/**
 * Anakle-style word-by-word mask reveal:
 * Each word is clipped by an overflow:hidden wrapper and translates up from 110% to 0%.
 */
interface MaskWordRevealProps {
    text: string;
    fontSize?: ResponsiveValue<string | number>;
    color?: string;
    fontWeight?: ResponsiveValue<string | number>;
    lineHeight?: ResponsiveValue<string | number>;
    letterSpacing?: ResponsiveValue<string | number>;
    delay?: number;
    stagger?: number;
    fontFamily?: string;
    justify?: 'flex-start' | 'center' | 'flex-end';
    highlightWords?: string[];
    highlightGradient?: string;
}

const MaskWordReveal: React.FC<MaskWordRevealProps> = ({
    text,
    fontSize,
    color = 'white',
    fontWeight = 400,
    lineHeight = 1.4,
    letterSpacing,
    delay = 0,
    stagger = 0.025,
    fontFamily = "'Work Sans', sans-serif",
    justify = 'flex-start',
    highlightWords = [],
    highlightGradient = 'linear(to-r, #5cc5d8, #38bdf8)',
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-8% 0px' });
    const words = text.split(' ');

    return (
        <Box
            ref={ref}
            display="flex"
            flexWrap="wrap"
            justifyContent={justify}
            columnGap="0.28em"
            rowGap="0.1em"
            fontSize={fontSize}
            color={color}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
            fontFamily={fontFamily}
        >
            {words.map((word, i) => {
                const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
                const isHighlighted = highlightWords.includes(cleanWord);

                return (
                    <span
                        key={i}
                        style={{
                            display: 'inline-block',
                            overflow: 'hidden',
                            verticalAlign: 'bottom',
                        }}
                    >
                        <motion.span
                            style={{
                                display: 'inline-block',
                                willChange: 'transform',
                            }}
                            initial={{ y: '115%', opacity: 0 }}
                            animate={isInView ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.4, 1, 0.4, 1],
                                delay: delay + i * stagger,
                            }}
                        >
                            {isHighlighted ? (
                                <Text as="span" bgGradient={highlightGradient} bgClip="text">
                                    {word}
                                </Text>
                            ) : (
                                word
                            )}
                        </motion.span>
                    </span>
                );
            })}
        </Box>
    );
};

/**
 * Anakle-style horizontal curtain mask wipe for images
 */
interface MaskImageRevealProps {
    src: string;
    alt: string;
    delay?: number;
}

const MaskImageReveal: React.FC<MaskImageRevealProps> = ({ src, alt, delay = 0 }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <Box ref={ref} position="relative" w="100%" h="100%" overflow="hidden" bg="#080c14">
            <motion.div
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initial={{ clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 }}
                animate={
                    isInView
                        ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
                        : { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08 }
                }
                transition={{
                    clipPath: { duration: 0.85, ease: [0.25, 1, 0.35, 1], delay },
                    scale: { duration: 1.1, ease: [0.25, 1, 0.35, 1], delay },
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="top left"
                    transition="transform 0.5s ease"
                    _groupHover={{ scale: 1.03 }}
                />
            </motion.div>
        </Box>
    );
};

const SkaiHummingbird = ({ size = '44px', color = 'white' }: { size?: string | number; color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 391.9 310.3"
        fill={color}
        stroke={color}
        style={{ width: size, height: 'auto', display: 'block' }}
    >
        <path d="m253.3 271.9 6.8 13.7-.7.6-18.3-27.4c-3.1-4.3-5.2-9.6-9.3-13.2s-8.8-6.2-13.4-9l-5-3-7.8-4.8-11.7-7.2-19.4-12L162 202l-7.8-5c-1.2-.7-4-1.8-4.7-3l-5.4-10-5.3-12-5-11.7-6.8-16.1-4.4-8.8-5.6-9.8-8.2-11.4-4.5-5.3c-6.4-7.3-13.2-12.4-23-13.2l-27.7-2.3-7.3-.7-6.3-.5-7.8-.7-31-2.4a2 2 0 0 1-1.2-.8l7.2-.3 13.7-.5 12.6-.6 14.9-.6 14.3-.5 17-.6c5-.2 9.7-.4 13.8-3.4l5.3-3.8c4.8-4.6 9.7-8.5 15.9-11.1a48 48 0 0 1 53.8 11.7l6.6 7.7 6.8 9.8 7.2 10 3.5 4 .6.8c.2.1-.6.8-.8.7l-9-6c-5.7-4.9-10.2-10-14.8-15.7q-5.7-7.2-13.4-12.4a42 42 0 0 0-40.4-2 32 32 0 0 0-7.5 5.1l-3.8 3.4c-6 5.2-11.9 6.1-9.9 7.1l5.2 2.6 5.6 4.3 6.8 6.8c6.5 6.5 11.4 14 15.8 22l3.2 5.5 2.3 4.6 7.8 17.9 2.5 5.5 8 18.5c5 11.8 2.5 8.9 12.8 15.2l22.7 14 5 3.2 13.8 8.5 9.8 6.2 12.7 8 9.9 6.2 5.1 10.1 4.5 9.3z" />
        <path d="m258.5 75.7-3.3 3.8-5.2 5.8-8.6 9.7-6.8 7.5-6.2 7-13.9 15.3-16 17.8c-1.7 1.8-4.6 3.7-5.6 6l-7.3 16.2-5.2 11-3.5 7.7c-.3.5-1.6 1.9-1.5 1.4l.6-3 6-21 5.3-16.8 11.6-12.5 4.9-5.5 4.3-4.8 3.6-4 8.7-9.6 6.5-7.2 3.5-4 4.4-4.7 8-9.1 3.3-3.6 7.6-8.5 8.2-9q1.9-2.1 4-3.2l8.3-3.8 6-2.7 12.1-5.6 7-3.3 8.7-4 5.9-2.7 10.8-5.2 8.2-3.8 6.7-3 9.7-4.7 6.3-3 8.5-4 5.1-2.3 10.1-4.8 7.9-3.7 4-1.8c.2 0 .8.6.7.8l-4.7 9L378 27l-3.8 7-9.6 18-4.3 8.2-5 9.3a7 7 0 0 1-2.7 2.8l-9.7 4.8-11.8 6-10 4.8-18.8 9.3-22 10.7-3.6 1.6c-.4.2-1.2 1.4-1.3 2-.4 3.8-4.2 7.2-8.3 6.4a7.3 7.3 0 0 1-5.5-10c1.4-3.5 6-5 9.4-3.5.6.3 1.9 1.6 2.5 1.3l3-1.4L291 97l11-5.5 13.7-7 13.6-7 6.4-3.4 13.3-6.9 4-7.5 13-24.2 3.2-6 5.4-10.6 2.3-4.5-6.4 2.7-20.6 9.7-9 4.2-6.3 3-7.8 3.6-16 7.4-10 4.5-10.8 5.1-12.1 5.6-8.4 3.9c-2.4 1-4.2 4-6 6zm11 38c1-.3 2-2.6 1.6-3.4a5 5 0 0 0-2.4-2.1c-1-.4-3 .6-3.3 1.5-.4.8 0 2.6.6 3.4q.8 1.1 3.6.5m-72.1 74.8 5-6.3 6-7.2 8.8-11.2 5.4-6.7c1.1-1.4 2.2-2 3.8-2.8l17.7-8.7 7.8-3.8 17.2-8.4L282 127l4.6-2.3 4.7-2.2 19.1-9.4 4.3-2.2 8.5-4.1 8.4-4.1 20.3-10 17.3-8.5.5-3.3c.6-3.9 4.5-5.8 7.8-5.5 3.6.3 6.5 3.1 6.7 7 .3 4.7-3.1 8.5-8 8-3.4-.3-4.3-2.6-6-1.5L348 100l-22.5 11.3-24.2 12-31 15.4-24.1 12L233 157l-5.3 2.8-5.2 5.7-7 8.4-5.6 6.5-7.2 8.4-3 4.4c-1 1.4-2.6 2-4 .8-1-1-1-2.8.3-4zM379.2 85c.7-1 .7-3.3 0-4-.9-1-3-1.5-4-.9-2.2 1.4-2.2 3.7-1 5.1s3.4 2 5-.2" />
        <path d="m274.2 174 8.5-3.8 14.1-6.5 18.5-8.4 5.3-2.3 7.1-3.1a7 7 0 0 0 3.5-3.6l7-13.1 3.9-7 3.3-6.4-12.2 5.5-7.8 3.6-7.1 3.3-17.9 8-17.4 7.2-12.5 5c-.3.2-.7-.8-.5-1l9-4.6 14-7.6 13.3-6.7 22.6-11.3 7-3.3 19.1-9.5 3.7-1.4-.4 1.6-6.5 12-5.9 10.8-2.6 4.8-4 7.5-2.5 4.4c-.7 1.3-1.8 4.6-3.3 5.3l-8.4 3.9-7.7 3.3-13.6 5.8-12.7 5.6-9.6 4.2-10.6 4.2-11.4 1.8c-.7 0-1.7 1.7-2 2.3-1.3 2.2-4.3 3-6.6 2.3s-4.2-2.6-4.5-5.3c-.5-4 2-7 6-7.1 4.8-.2 4.8 3.5 7.2 3.2l8.2-1.2c2-.3 4.3-1.4 6.4-2.4m-19.2 6.7a2.4 2.4 0 1 0-4.8 0 2.4 2.4 0 0 0 4.8 0m6 83.5c-3.9-.8-5.3-4.6-4.3-8 .7-2.3 3.2-3.7 5.2-3.8 2.4-.2 4.8.7 6.2 2.8s.6 5.3-.3 7.3c-.3.7.5 2.3.9 3l4.6 8.6 2.6 4.8 5.8 10.3c.7 1.2 3 3 4.2 3.8l2.9 1.6-4.7-13.3-6.6-19.3-4.7-13.2-7.6-22-5.2-15.1-9.4-5.5-9.6-6-10.1-6.4-8.3-5.3.3-1 5.1 2.4 10.1 4.7 6.7 3.1 10.5 5 9.4 4.4 7.9 22.9 2.2 6.4 3.8 11 6.1 18 8.1 24 7.3 21-1.4-.5-5-4-7.7-6.2c-2.6-2-6.6-4.2-8-7l-7.7-14.5-6.5-12.7c-.3-.6-2.2-1-3-1.2Zm3.9-5.7a2.3 2.3 0 1 0-4.7 0 2.3 2.3 0 0 0 4.7 0" />
        <circle cx="121.4" cy="91.5" r="5.2" />
    </svg>
);

/**
 * High-fidelity preview mockup for the SKAI AI Copilot Card
 * Matches the official Brainlife SKAI navigation sidebar and conversational interface
 */
function SkaiCardMockup() {
    return (
        <Box
            w="100%"
            h="100%"
            bg="#0b0f19"
            display="flex"
            flexDirection="row"
            position="relative"
            overflow="hidden"
            userSelect="none"
        >
            {/* Left Sidebar */}
            <Box
                w="32%"
                minW="88px"
                maxW="115px"
                h="100%"
                bg="#161e2e"
                borderRight="1px solid rgba(255, 255, 255, 0.07)"
                p="6px 7px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flexShrink={0}
                overflow="hidden"
            >
                <Box>
                    {/* Brand Header */}
                    <Flex align="center" justify="space-between" mb="6px">
                        <Flex align="center" gap="3px">
                            <Box w="8px" h="8px" borderRadius="full" bg="linear-gradient(135deg, #ec4899, #38bdf8, #22c55e)" />
                            <Text fontSize="7px" fontWeight="800" letterSpacing="0.06em" color="white" fontFamily="'Work Sans', sans-serif">
                                BRAINLIFE
                            </Text>
                        </Flex>
                        <Menu size={7} color="#94a3b8" />
                    </Flex>

                    {/* ME Section */}
                    <Text fontSize="5.5px" fontWeight="800" color="#64748b" letterSpacing="0.08em" mb="2px">
                        ME
                    </Text>
                    <Flex direction="column" gap="1.5px" mb="4px">
                        <Flex align="center" gap="4px" px="3px" py="1px" color="#cbd5e1">
                            <LayoutDashboard size={6.5} />
                            <Text fontSize="6px">Dashboard</Text>
                        </Flex>
                        <Flex align="center" gap="4px" px="3px" py="1px" color="#cbd5e1">
                            <Folder size={6.5} />
                            <Text fontSize="6px">My Projects</Text>
                        </Flex>
                        <Flex align="center" justify="space-between" px="3px" py="1px" color="#cbd5e1">
                            <Flex align="center" gap="4px">
                                <Database size={6.5} />
                                <Text fontSize="6px">My Resources</Text>
                            </Flex>
                            <Plus size={5.5} color="#64748b" />
                        </Flex>
                        <Flex align="center" justify="space-between" px="3px" py="1px" color="#cbd5e1">
                            <Flex align="center" gap="4px">
                                <LayoutGrid size={6.5} />
                                <Text fontSize="6px">My Apps</Text>
                            </Flex>
                            <Plus size={5.5} color="#64748b" />
                        </Flex>
                        <Flex align="center" gap="4px" px="3px" py="1px" color="#cbd5e1">
                            <GitBranch size={6.5} />
                            <Text fontSize="6px">My Datatypes</Text>
                        </Flex>
                        <Flex align="center" gap="4px" px="3px" py="1px" color="#cbd5e1">
                            <Shield size={6.5} />
                            <Text fontSize="6px">Admin</Text>
                        </Flex>
                    </Flex>

                    {/* EXPLORE Section */}
                    <Text fontSize="5.5px" fontWeight="800" color="#64748b" letterSpacing="0.08em" mb="2px">
                        EXPLORE
                    </Text>
                    <Flex direction="column" gap="1.5px">
                        {/* SKAI ACTIVE PILL */}
                        <Flex
                            align="center"
                            gap="4px"
                            px="4px"
                            py="2px"
                            bg="rgba(255, 255, 255, 0.14)"
                            borderRadius="4px"
                            color="white"
                            fontWeight="700"
                        >
                            <Rocket size={6.5} color="#5cc5d8" />
                            <Text fontSize="6.5px" color="white" fontWeight="700">SKAI</Text>
                        </Flex>
                        <Flex align="center" gap="4px" px="3px" py="1px" color="#94a3b8">
                            <FlaskConical size={6.5} />
                            <Text fontSize="6px">Research</Text>
                        </Flex>
                        <Flex align="center" justify="space-between" px="3px" py="1px" color="#94a3b8">
                            <Flex align="center" gap="4px">
                                <Database size={6.5} />
                                <Text fontSize="6px">Public Datasets</Text>
                            </Flex>
                            <ChevronRight size={5.5} color="#64748b" />
                        </Flex>
                    </Flex>
                </Box>

                {/* Sidebar Bottom */}
                <Box pt="3px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                    <Flex align="center" gap="3px" px="2px" py="1px" color="#94a3b8" mb="1px">
                        <Plus size={5.5} />
                        <Text fontSize="5.5px">New project</Text>
                    </Flex>
                    <Flex align="center" gap="3px" px="2px" py="1px">
                        <Box w="7px" h="7px" borderRadius="full" bg="#38bdf8" display="flex" alignItems="center" justifyContent="center">
                            <User size={4.5} color="#090d16" />
                        </Box>
                        <Text fontSize="5.5px" color="white" fontWeight="600" isTruncated>Patrick Filima</Text>
                    </Flex>
                </Box>
            </Box>

            {/* Main Chat / Assistant Canvas */}
            <Flex flex="1" direction="column" justify="space-between" p="8px 10px" position="relative" bg="#080c14">
                {/* Ambient glow in center */}
                <Box
                    position="absolute"
                    top="40%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w="130px"
                    h="130px"
                    bg="radial-gradient(circle, rgba(92, 197, 216, 0.12) 0%, transparent 70%)"
                    filter="blur(22px)"
                    pointerEvents="none"
                />

                {/* Top Action Icons */}
                <Flex justify="flex-end" align="center" gap="6px">
                    <Share2 size={8} color="#94a3b8" />
                    <History size={8} color="#94a3b8" />
                    <Box w="10px" h="10px" borderRadius="full" bg="#f59e0b" border="1px solid rgba(255,255,255,0.2)" />
                </Flex>

                {/* Center Hummingbird & Title */}
                <Flex direction="column" align="center" justify="center" my="auto" gap="5px">
                    <SkaiHummingbird size="42px" color="white" />
                    <Text fontSize="12px" color="white" fontWeight="400" letterSpacing="-0.01em" fontFamily="'Work Sans', sans-serif">
                        Explore <Text as="span" fontStyle="italic" fontWeight="600" color="#f1f5f9">skai</Text>
                    </Text>
                </Flex>

                {/* Bottom Pill Input Bar */}
                <Flex
                    align="center"
                    justify="space-between"
                    bg="#101522"
                    border="1px solid rgba(255, 255, 255, 0.14)"
                    borderRadius="full"
                    px="9px"
                    py="4px"
                    mx="4px"
                    boxShadow="0 4px 14px rgba(0,0,0,0.6)"
                >
                    <Text fontSize="7px" color="#64748b" fontFamily="'Work Sans', sans-serif">
                        Type your message here...
                    </Text>
                    <Flex align="center" gap="5px">
                        <Send size={7.5} color="#94a3b8" />
                        <PlusCircle size={7.5} color="#94a3b8" />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}

export default function ProudProductsSection() {
    return (
        <Box
            py={{ base: '60px', md: '100px' }}
            bg="transparent"
            position="relative"
            overflow="hidden"
            borderTop="1px solid rgba(255, 255, 255, 0.06)"
        >
            {/* Background Ambient Glow */}
            <Box
                position="absolute"
                top="30%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="1000px"
                h="600px"
                bg="radial-gradient(circle, rgba(92, 197, 216, 0.08) 0%, rgba(0, 112, 243, 0.04) 50%, transparent 80%)"
                filter="blur(100px)"
                pointerEvents="none"
            />

            <Container maxW="clamp(100%, 94vw, 1640px)" position="relative" zIndex={2} px={{ base: '16px', md: '24px' }}>
                {/* Header Title with Stacked Faded Watermark */}
                <Box
                    textAlign="center"
                    mb={{ base: '36px', md: '52px' }}
                    position="relative"
                >
                    <Text
                        fontSize={{ base: '55px', sm: '80px', md: '110px' }}
                        fontWeight={900}
                        color="rgba(255, 255, 255, 0.08)"
                        letterSpacing="-0.04em"
                        lineHeight="0.85"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        pointerEvents="none"
                    >
                        Products
                    </Text>

                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '36px', md: '46px' }}
                        fontWeight={900}
                        letterSpacing="-0.03em"
                        fontFamily="'Work Sans', sans-serif"
                        color="white"
                        lineHeight="1.1"
                        mt={{ base: '-16px', sm: '-24px', md: '-32px' }}
                        mb="16px"
                        w="100%"
                    >
                        <MaskWordReveal
                            text="Specialized Tools & AI for Neuroinformatics"
                            fontSize={{ base: '26px', sm: '36px', md: '46px' }}
                            fontWeight={900}
                            letterSpacing="-0.03em"
                            justify="center"
                            highlightWords={['Neuroinformatics', 'AI']}
                            delay={0.1}
                        />
                    </Heading>

                    <Box maxW="740px" mx="auto">
                        <MaskWordReveal
                            text="A specialized suite of zero-install, browser-native applications and agentic AI copilots engineered for automated BIDS standardization, scan protocol QA, and FAIR compliance."
                            fontSize={{ base: '14px', md: '16px' }}
                            color="rgba(255, 255, 255, 0.65)"
                            fontWeight={400}
                            justify="center"
                            delay={0.25}
                            stagger={0.015}
                        />
                    </Box>
                </Box>

                {/* 4-Column Single Row Showcase Grid */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    spacing={{ base: '18px', md: '20px', lg: '18px', xl: '24px' }}
                >
                    {proudProducts.map((product, index) => (
                        <MotionBox
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                                delay: index * 0.08,
                            }}
                        >
                            <Link
                                href={product.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                _hover={{ textDecoration: 'none' }}
                                display="block"
                                h="100%"
                            >
                                <Box
                                    bg="rgba(15, 23, 42, 0.75)"
                                    border="1px solid rgba(255, 255, 255, 0.1)"
                                    borderRadius="24px"
                                    overflow="hidden"
                                    backdropFilter="blur(20px)"
                                    boxShadow="0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                                    transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                                    role="group"
                                    _hover={{
                                        borderColor: 'rgba(92, 197, 216, 0.5)',
                                        transform: 'translateY(-6px)',
                                        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 30px rgba(92, 197, 216, 0.2)',
                                    }}
                                    display="flex"
                                    flexDirection="column"
                                    h="100%"
                                >
                                    {/* Top Product Preview Image Container */}
                                    <Box
                                        pt={{ base: '12px', md: '14px' }}
                                        px={{ base: '12px', md: '14px' }}
                                        pb="0"
                                        w="100%"
                                    >
                                        <Box
                                            h={{ base: '160px', sm: '170px', md: '160px', lg: '165px', xl: '185px' }}
                                            w="100%"
                                            position="relative"
                                            overflow="hidden"
                                            borderRadius="16px"
                                            border="1px solid rgba(255, 255, 255, 0.14)"
                                            bg="#080c14"
                                            boxShadow="0 10px 30px rgba(0, 0, 0, 0.45)"
                                        >
                                            {product.id === 'skai' ? (
                                                <SkaiCardMockup />
                                            ) : (
                                                <MaskImageReveal
                                                    src={product.image}
                                                    alt={product.title}
                                                    delay={0.15 + (index % 4) * 0.08}
                                                />
                                            )}

                                            <Box
                                                position="absolute"
                                                inset={0}
                                                pointerEvents="none"
                                                bg="linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.1) 60%, transparent 100%)"
                                            />

                                            <Badge
                                                position="absolute"
                                                top="10px"
                                                right="10px"
                                                bg="rgba(15, 23, 42, 0.9)"
                                                color="#5cc5d8"
                                                border="1px solid rgba(92, 197, 216, 0.4)"
                                                backdropFilter="blur(12px)"
                                                px="8px"
                                                py="3px"
                                                borderRadius="full"
                                                fontSize="9px"
                                                fontWeight="800"
                                                display="flex"
                                                alignItems="center"
                                                gap="4px"
                                                zIndex={3}
                                            >
                                                {product.id === 'skai' ? <Bot size={10} /> : <ExternalLink size={10} />}
                                                {product.actionLabel}
                                            </Badge>
                                        </Box>
                                    </Box>

                                    {/* Card Details Body with Staggered Mask Reveal */}
                                    <Box
                                        p={{ base: '16px', md: '18px', lg: '18px', xl: '20px' }}
                                        flex="1"
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="space-between"
                                    >
                                        <Box>
                                            <Box mb="6px">
                                                <MaskWordReveal
                                                    text={product.category}
                                                    fontSize="10.5px"
                                                    fontWeight="700"
                                                    color="#5cc5d8"
                                                    letterSpacing="0.04em"
                                                    delay={0.2}
                                                />
                                            </Box>

                                            <Heading
                                                as="h3"
                                                fontSize={{ base: '16px', sm: '17px', lg: '17.5px', xl: '19px' }}
                                                fontWeight={800}
                                                color="white"
                                                fontFamily="'Work Sans', sans-serif"
                                                letterSpacing="-0.02em"
                                                mb="8px"
                                                display="flex"
                                                alignItems="flex-start"
                                                justifyContent="space-between"
                                                gap="6px"
                                                _groupHover={{ color: '#5cc5d8' }}
                                                transition="color 0.2s ease"
                                            >
                                                <Box flex="1">
                                                    <MaskWordReveal
                                                        text={product.title}
                                                        fontSize={{ base: '16px', sm: '17px', lg: '17.5px', xl: '19px' }}
                                                        fontWeight={800}
                                                        letterSpacing="-0.02em"
                                                        delay={0.25}
                                                    />
                                                </Box>
                                                <Flex
                                                    w="28px"
                                                    h="28px"
                                                    borderRadius="full"
                                                    bg="rgba(255, 255, 255, 0.06)"
                                                    align="center"
                                                    justify="center"
                                                    flexShrink={0}
                                                    mt="2px"
                                                    _groupHover={{ bg: '#5cc5d8', color: '#0f172a' }}
                                                    transition="all 0.25s ease"
                                                >
                                                    <ArrowUpRight size={14} />
                                                </Flex>
                                            </Heading>

                                            <Box mb="14px">
                                                <MaskWordReveal
                                                    text={product.description}
                                                    fontSize={{ base: '12px', lg: '12.5px', xl: '13px' }}
                                                    color="rgba(255, 255, 255, 0.7)"
                                                    lineHeight="1.5"
                                                    delay={0.35}
                                                    stagger={0.015}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Badges List */}
                                        <Flex gap="5px" wrap="wrap">
                                            {product.badges.map((badge) => (
                                                <Badge
                                                    key={badge}
                                                    bg="rgba(255, 255, 255, 0.05)"
                                                    color="rgba(255, 255, 255, 0.8)"
                                                    border="1px solid rgba(255, 255, 255, 0.1)"
                                                    fontSize="9px"
                                                    fontWeight="700"
                                                    borderRadius="6px"
                                                    px="6px"
                                                    py="2px"
                                                    fontFamily="'Work Sans', sans-serif"
                                                >
                                                    {badge}
                                                </Badge>
                                            ))}
                                        </Flex>
                                    </Box>
                                </Box>
                            </Link>
                        </MotionBox>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
