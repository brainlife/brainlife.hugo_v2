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
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);

interface NumberCardSlide {
    title: string;
    subtitle: string;
    image: string;
    tag?: string;
}

interface StatItem {
    id: string;
    num: string;
    label: string;
    slides: NumberCardSlide[];
}

const STAT_ITEMS: StatItem[] = [
    {
        id: 'researchers',
        num: '2,000+',
        label: 'global researchers',
        slides: [
            {
                title: 'Franco Pestilli, PhD',
                subtitle: 'Founder & Director · UT Austin',
                image: '/img/team/franco-brainlife-tree.jpg',
                tag: 'DIRECTOR',
            },
            {
                title: 'The Brainlife Emblem',
                subtitle: '3D Brain-Tree of Open Neuroscience',
                image: '/img/team/brainlife-tree-sculpture.jpg',
                tag: 'EMBLEM',
            },
            {
                title: 'Dan Levitas',
                subtitle: 'Lead Software Architect',
                image: '/img/team/dan.jpg',
                tag: 'LEAD ARCHITECT',
            },
            {
                title: 'Giulia Berto, PhD',
                subtitle: 'Postdoctoral Fellow · Neuroimaging',
                image: '/img/team/giulia.jpg',
                tag: 'RESEARCH',
            },
            {
                title: 'Bradley Caron, PhD',
                subtitle: 'Computational Neuroscientist',
                image: '/img/team/brad.jpg',
                tag: 'COMPUTATIONAL',
            },
            {
                title: 'Global Research Community',
                subtitle: 'Democratizing Analysis Worldwide',
                image: '/img/about/about-2.jpg',
                tag: 'OPEN NETWORK',
            },
        ],
    },
    {
        id: 'apps',
        num: '400+',
        label: 'open-source apps',
        slides: [
            {
                title: 'ezBIDS Suite',
                subtitle: 'Automated DICOM Curation & BIDS',
                image: '/img/apps/apps.png',
                tag: 'BIDS CURATION',
            },
            {
                title: 'Tractoflow & DSI Studio',
                subtitle: 'Diffusion MRI White Matter Pipelines',
                image: '/img/apps/tractview.png',
                tag: 'TRACTOGRAPHY',
            },
            {
                title: 'FreeSurfer & FSLeyes',
                subtitle: 'Cortical Reconstruction & Visualizers',
                image: '/img/apps/freeview.png',
                tag: 'ANATOMICAL',
            },
            {
                title: 'MNE-Python & MEG Tools',
                subtitle: 'MEG & EEG Source Localization',
                image: '/img/apps/mnepython.png',
                tag: 'ELECTROPHYSIOLOGY',
            },
        ],
    },
    {
        id: 'compute',
        num: '10M+',
        label: 'compute hours',
        slides: [
            {
                title: 'TACC Stampede2 & Frontera',
                subtitle: 'Heterogeneous Slurm HPC Supercomputing',
                image: '/img/stampede2.jpg',
                tag: 'SUPERCOMPUTING',
            },
            {
                title: 'NSF Jetstream-2 Cloud',
                subtitle: 'Interactive On-Demand Cloud Instances',
                image: '/img/clients/ref.jetstream.png',
                tag: 'NSF CLOUD',
            },
            {
                title: 'Open Science Grid (OSG)',
                subtitle: 'Distributed High-Throughput Compute',
                image: '/img/clients/ref.osg.png',
                tag: 'GRID FABRIC',
            },
            {
                title: 'AWS Open Data & S3',
                subtitle: 'Petabyte-Scale Open Neuroimaging Storage',
                image: '/img/clients/ref.aws.png',
                tag: 'CLOUD STORAGE',
            },
        ],
    },
    {
        id: 'institutions',
        num: '400+',
        label: 'global institutions',
        slides: [
            {
                title: 'NIH BRAIN Initiative',
                subtitle: 'National Institutes of Health Grant Awards',
                image: '/img/clients/ref.nih.png',
                tag: 'MAJOR FUNDER',
            },
            {
                title: 'National Science Foundation',
                subtitle: 'Cyberinfrastructure & Neuroscience Grants',
                image: '/img/clients/ref.nsf.png',
                tag: 'FEDERAL SUPPORT',
            },
            {
                title: 'UT Austin & Indiana University',
                subtitle: 'Primary Academic Development Hubs',
                image: '/img/clients/ref.ut.png',
                tag: 'LEAD HUBS',
            },
            {
                title: 'Global Academic Consortia',
                subtitle: '50+ Countries Across 6 Continents',
                image: '/img/clients/ref.iu.png',
                tag: 'GLOBAL NETWORK',
            },
        ],
    },
];

function InteractiveStatCard({ item }: { item: StatItem }) {
    const [isHovered, setIsHovered] = useState(false);
    const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlideIdx((prev) => (prev === 0 ? item.slides.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentSlideIdx((prev) => (prev === item.slides.length - 1 ? 0 : prev + 1));
    };

    const activeSlide = item.slides[currentSlideIdx] || item.slides[0];

    return (
        <Box
            position="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
            cursor="pointer"
            userSelect="none"
            minH={{ base: '140px', md: '160px' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    // DEFAULT STATE: GIANT STAT NUMBER
                    <MotionBox
                        key="number-view"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.2 }}
                        textAlign="center"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        h="100%"
                    >
                        <Text
                            fontSize={{ base: '48px', sm: '58px', md: '72px', lg: '84px' }}
                            fontWeight={900}
                            color="#2693D8"
                            lineHeight="1"
                            letterSpacing="-0.04em"
                            fontFamily="'Work Sans', sans-serif"
                            transition="all 0.2s ease"
                            _hover={{
                                transform: 'scale(1.03)',
                            }}
                        >
                            {item.num}
                        </Text>
                        <Text
                            fontSize={{ base: '13px', md: '14.5px' }}
                            fontWeight={600}
                            color="rgba(255, 255, 255, 0.72)"
                            letterSpacing="0.04em"
                            textTransform="lowercase"
                            mt="8px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            {item.label}
                        </Text>
                    </MotionBox>
                ) : (
                    // HOVER STATE: INTERACTIVE FLOATING PHOTO CARD WITH PREV/NEXT
                    <MotionBox
                        key="card-view"
                        initial={{ opacity: 0, scale: 0.88, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 4 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        w={{ base: '200px', sm: '220px', md: '240px' }}
                        h={{ base: '130px', sm: '140px', md: '150px' }}
                        borderRadius="14px"
                        overflow="hidden"
                        position="relative"
                        bg="#162032"
                        border="1px solid rgba(38, 147, 216, 0.4)"
                        boxShadow="0 15px 35px rgba(0, 0, 0, 0.6)"
                    >
                        {/* Slide Background Image */}
                        <Image
                            src={getAssetPath(activeSlide.image)}
                            alt={activeSlide.title}
                            w="100%"
                            h="100%"
                            objectFit={item.id === 'institutions' ? 'contain' : 'cover'}
                            p={item.id === 'institutions' ? '16px' : '0'}
                            bg={item.id === 'institutions' ? '#080c16' : 'transparent'}
                            transition="opacity 0.25s ease"
                        />

                        {/* Dark Gradient Overlay for Crisp Text Readability */}
                        <Box
                            position="absolute"
                            inset={0}
                            bg="linear-gradient(to top, rgba(5, 8, 15, 0.92) 0%, rgba(5, 8, 15, 0.45) 55%, rgba(0, 0, 0, 0.15) 100%)"
                            pointerEvents="none"
                        />

                        {/* Top Micro Tag */}
                        {activeSlide.tag && (
                            <Box position="absolute" top="8px" left="10px" zIndex={2}>
                                <Text
                                    fontSize="8.5px"
                                    fontWeight={800}
                                    color="#2693D8"
                                    letterSpacing="0.12em"
                                    textTransform="uppercase"
                                    bg="rgba(0, 0, 0, 0.7)"
                                    px="6px"
                                    py="1.5px"
                                    borderRadius="4px"
                                    border="1px solid rgba(38, 147, 216, 0.35)"
                                >
                                    {activeSlide.tag}
                                </Text>
                            </Box>
                        )}

                        {/* Bottom Left Title & Subtitle */}
                        <Box
                            position="absolute"
                            bottom="8px"
                            left="10px"
                            right="64px"
                            zIndex={2}
                            textAlign="left"
                        >
                            <Text
                                fontSize="12px"
                                fontWeight={800}
                                color="white"
                                lineHeight="1.2"
                                fontFamily="'Work Sans', sans-serif"
                                noOfLines={1}
                            >
                                {activeSlide.title}
                            </Text>
                            <Text
                                fontSize="10px"
                                color="rgba(255, 255, 255, 0.75)"
                                lineHeight="1.2"
                                mt="2px"
                                fontFamily="'Work Sans', sans-serif"
                                noOfLines={1}
                            >
                                {activeSlide.subtitle}
                            </Text>
                        </Box>

                        {/* Bottom Right Prev / Next Navigation Controls */}
                        {item.slides.length > 1 && (
                            <HStack
                                position="absolute"
                                bottom="8px"
                                right="8px"
                                spacing="4px"
                                zIndex={3}
                            >
                                <IconButton
                                    aria-label="Previous image"
                                    icon={<ChevronLeft size={13} />}
                                    size="xs"
                                    minW="20px"
                                    h="20px"
                                    borderRadius="full"
                                    bg="rgba(255, 255, 255, 0.2)"
                                    color="white"
                                    _hover={{ bg: '#2693D8', color: 'white' }}
                                    onClick={handlePrev}
                                />
                                <IconButton
                                    aria-label="Next image"
                                    icon={<ChevronRight size={13} />}
                                    size="xs"
                                    minW="20px"
                                    h="20px"
                                    borderRadius="full"
                                    bg="rgba(255, 255, 255, 0.2)"
                                    color="white"
                                    _hover={{ bg: '#2693D8', color: 'white' }}
                                    onClick={handleNext}
                                />
                            </HStack>
                        )}
                    </MotionBox>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default function AboutUsStorySection() {
    return (
        <Box
            position="relative"
            w="100%"
            py={{ base: '48px', md: '72px', lg: '96px' }}
            overflow="hidden"
        >
            {/* GIANT WATERMARK (Floating Background Typography) */}
            <Box
                position="absolute"
                top={{ base: '4%', md: '6%' }}
                left={{ base: '4%', md: '6%' }}
                pointerEvents="none"
                userSelect="none"
                zIndex={0}
            >
                <Text
                    fontSize={{ base: '60px', sm: '90px', md: '130px', lg: '160px' }}
                    fontWeight={900}
                    color="rgba(255, 255, 255, 0.04)"
                    letterSpacing="-0.04em"
                    lineHeight="0.85"
                    fontFamily="'Work Sans', sans-serif"
                >
                    About Us
                </Text>
            </Box>

            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                position="relative"
                zIndex={1}
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* SECTION HEADLINE */}
                <Box mb={{ base: '36px', md: '56px' }} maxW="880px">
                    <Text
                        fontSize="12px"
                        fontWeight={800}
                        letterSpacing="0.14em"
                        textTransform="uppercase"
                        color="#2693D8"
                        fontFamily="'Work Sans', sans-serif"
                        mb="8px"
                    >
                        OUR MISSION &amp; PHILOSOPHY
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '28px', sm: '36px', md: '44px', lg: '50px' }}
                        fontWeight={900}
                        lineHeight={{ base: '1.2', md: '1.14' }}
                        letterSpacing="-0.03em"
                        fontFamily="'Work Sans', sans-serif"
                        color="white"
                    >
                        Accelerating{' '}
                        <Text as="span" color="#2693D8">
                            open neuroscience
                        </Text>{' '}
                        for forward-thinking research
                    </Heading>
                </Box>

                {/* 2-COLUMN INTRO ROW: TEXT + 3-IMAGE ASYMMETRIC COLLAGE */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                    gap={{ base: '48px', lg: '64px' }}
                    alignItems="center"
                    mb={{ base: '64px', md: '80px' }}
                >
                    {/* LEFT COLUMN: EDITORIAL MANIFESTO */}
                    <Flex direction="column" gap="20px">
                        <Text
                            fontSize={{ base: '15px', md: '16.5px' }}
                            color="rgba(255, 255, 255, 0.9)"
                            lineHeight="1.75"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Brainlife is your full-stack cloud computing partner — your technical infrastructure, data orchestrator, and open-science ecosystem. We challenge computational silos by transforming complex neuroimaging pipelines into seamless, reproducible workflows.
                        </Text>

                        <Text
                            fontSize={{ base: '14.5px', md: '15.5px' }}
                            color="rgba(255, 255, 255, 0.72)"
                            lineHeight="1.75"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Our international cross-functional team of neuroscientists, computer engineers, and open-source contributors is dedicated to turning algorithmic innovation into action and creating cutting-edge containerized software tools.
                        </Text>

                        <Text
                            fontSize={{ base: '14.5px', md: '15.5px' }}
                            color="rgba(255, 255, 255, 0.72)"
                            lineHeight="1.75"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Our goal-oriented culture enables researchers not only to excel within their specific neuroimaging domains (dMRI, MEG, EEG, fMRI), but to closely collaborate across global institutions to achieve optimal, reproducible discoveries.
                        </Text>

                        <Text
                            fontSize={{ base: '14.5px', md: '15.5px' }}
                            color="rgba(255, 255, 255, 0.72)"
                            lineHeight="1.75"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Being an indispensable part of the open-science community, each of us is committed to establishing the best working environment, transparent provenance standards, and dynamic peer collaboration within a flat, mission-driven organization.
                        </Text>
                    </Flex>

                    {/* RIGHT COLUMN: ASYMMETRIC 3-PHOTO COLLAGE */}
                    <Box
                        position="relative"
                        w="100%"
                        h={{ base: '440px', sm: '500px', md: '540px' }}
                    >
                        {/* PHOTO 1 (Top Right - Whiteboard / Sprint Discussion) */}
                        <MotionBox
                            position="absolute"
                            top="0"
                            right="0"
                            w={{ base: '46%', sm: '44%' }}
                            h={{ base: '170px', sm: '210px', md: '230px' }}
                            borderRadius="16px"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            boxShadow="0 20px 40px rgba(0, 0, 0, 0.7)"
                            zIndex={2}
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={getAssetPath('/img/about/about-3.jpg')}
                                alt="Brainlife sprint and whiteboard discussion"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </MotionBox>

                        {/* PHOTO 2 (Center Left - Founder & Brainlife 3D Emblem) */}
                        <MotionBox
                            position="absolute"
                            top={{ base: '32px', sm: '44px' }}
                            left="0"
                            w={{ base: '60%', sm: '58%' }}
                            h={{ base: '220px', sm: '270px', md: '300px' }}
                            borderRadius="18px"
                            overflow="hidden"
                            border="1px solid rgba(38, 147, 216, 0.35)"
                            boxShadow="0 20px 45px rgba(0, 0, 0, 0.7)"
                            zIndex={3}
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={getAssetPath('/img/team/franco-brainlife-tree.jpg')}
                                alt="Dr. Franco Pestilli holding the Brainlife 3D brain-tree emblem"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </MotionBox>

                        {/* PHOTO 3 (Bottom Right - Pair Programming & Collaboration) */}
                        <MotionBox
                            position="absolute"
                            bottom="0"
                            right={{ base: '4%', sm: '8%' }}
                            w={{ base: '52%', sm: '48%' }}
                            h={{ base: '180px', sm: '220px', md: '240px' }}
                            borderRadius="16px"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.15)"
                            boxShadow="0 20px 45px rgba(0, 0, 0, 0.75)"
                            zIndex={4}
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={getAssetPath('/img/about/about-2.jpg')}
                                alt="Collaborative pair working on neuroimaging pipelines"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </MotionBox>
                    </Box>
                </Grid>

                {/* NUMBERS ROW (Interactive Hover Preview Cards with Slide Controls) */}
                <Box
                    pt={{ base: '36px', md: '48px' }}
                    borderTop="1px solid rgba(255, 255, 255, 0.1)"
                >
                    <Grid
                        templateColumns={{
                            base: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)',
                        }}
                        gap={{ base: '32px 16px', md: '40px 24px' }}
                        alignItems="center"
                    >
                        {STAT_ITEMS.map((item) => (
                            <InteractiveStatCard key={item.id} item={item} />
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
