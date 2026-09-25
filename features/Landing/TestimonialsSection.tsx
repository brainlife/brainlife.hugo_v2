'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Image,
    IconButton,
    Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    image: string;
    tag: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 'steven',
        name: 'Steven Meisler',
        role: 'PhD Student',
        content:
            'brainlife.io is an incredible infrastructure that is advancing open and collaborative science while making it easily accessible and intuitive. It is exciting to think of the possibilities when the scientific community can gather around a tool like this!',
        image: '/img/testimonials/steven.png',
        tag: 'Open & Collaborative Science',
    },
    {
        id: 'yaroslav',
        name: 'Yaroslav Halchenko',
        role: 'Research Associate Professor @ Dartmouth College',
        content:
            'I have worked on software for data management, computation execution, archival, standards and do know first hands the difficulty of creating harmonious and visually appealing platform, such as BrainLife.io. It is truly indistinguishable from magic in what it does!',
        image: '/img/testimonials/yarik.webp',
        tag: 'Harmonious Platform Architecture',
    },
    {
        id: 'psychopy',
        name: 'psychopy.org',
        role: 'Nottingham, UK',
        content:
            "Just discovered the very cool BrainLife.io project by @furranko Amazing the things they've built into this website for sharing, analyzing and visualizing neuroimaging data. So many beautiful tools.",
        image: '/img/testimonials/psychopy.png',
        tag: 'Neuroimaging Tools & Visualizer',
    },
];

// Repeating the set 4 times creates an infinite cyclic buffer that completely eliminates the end-of-track gap
const REPEATED_TESTIMONIALS = [
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS,
];

export default function TestimonialsSection() {
    // Start in the second batch so there are always cards both behind and ahead
    const [virtualIndex, setVirtualIndex] = useState(TESTIMONIALS.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const realIndex = virtualIndex % TESTIMONIALS.length;
    const activeItem = TESTIMONIALS[realIndex];

    const nextSlide = () => {
        setIsTransitioning(true);
        setVirtualIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setVirtualIndex((prev) => prev - 1);
    };

    // Auto-advance dynamically every 4.5s; pauses when hovering cards
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setVirtualIndex((prev) => prev + 1);
        }, 4500);
        return () => clearInterval(interval);
    }, [isHovered, virtualIndex]);

    // Re-enable smooth transitions after seamless instantaneous snap
    useEffect(() => {
        if (!isTransitioning) {
            const raf = requestAnimationFrame(() => {
                setIsTransitioning(true);
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [isTransitioning]);

    return (
        <Box
            as="section"
            py={{ base: '70px', md: '110px', lg: '140px' }}
            position="relative"
            zIndex={20}
            w="100%"
            overflow="hidden"
            bg="linear-gradient(180deg, rgba(8, 12, 22, 0.4) 0%, rgba(18, 24, 42, 0.9) 50%, rgba(8, 12, 22, 0.4) 100%)"
            borderTop="1px solid rgba(255, 255, 255, 0.06)"
        >
            {/* Ambient Background Glows */}
            <Box
                position="absolute"
                top="20%"
                left="15%"
                w="600px"
                h="600px"
                bg="radial-gradient(circle, rgba(92, 197, 216, 0.08) 0%, rgba(36, 235, 163, 0.04) 40%, transparent 70%)"
                filter="blur(90px)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="10%"
                w="700px"
                h="700px"
                bg="radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 75%)"
                filter="blur(110px)"
                pointerEvents="none"
            />

            <Container maxW="clamp(100%, 92vw, 1600px)" mx="auto" px={{ base: '16px', md: '5vw' }}>
                {/* SECTION HEADER */}
                <Box mb={{ base: '40px', md: '64px' }} maxW="1200px" position="relative">
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
                        Community
                    </Text>

                    <Heading
                        as="h2"
                        fontSize={{ base: '30px', sm: '44px', md: '58px', lg: '70px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.035em"
                        lineHeight={1.08}
                        mt={{ base: '-16px', sm: '-24px', md: '-32px' }}
                        mb={{ base: '16px', md: '24px' }}
                    >
                        Don&apos;t take our word for it
                    </Heading>

                    <Text
                        fontSize={{ base: '16px', sm: '18px', md: '22px', lg: '24px' }}
                        color="rgba(255, 255, 255, 0.78)"
                        lineHeight="1.55"
                        fontFamily="'Work Sans', sans-serif"
                        maxW="980px"
                    >
                        Hear directly from neuroscientists, researchers, and developers about their experience using brainlife.io to process, publish, and share reproducible computational neuroscience workflows.
                    </Text>
                </Box>

                {/* TESTIMONIAL CAROUSEL STAGE */}
                <Box position="relative" mt={{ base: '32px', md: '56px' }}>
                    <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        align={{ base: 'flex-start', lg: 'center' }}
                        position="relative"
                        minH={{ base: 'auto', lg: '480px' }}
                    >
                        {/* LEFT COLUMN: ACTIVE TESTIMONIAL INFO (FLOATING CARD OVERLAY) */}
                        <Box
                            w={{ base: '100%', lg: '380px', xl: '420px' }}
                            flexShrink={0}
                            position={{ base: 'relative', lg: 'absolute' }}
                            left={{ base: '0', lg: '0' }}
                            zIndex={10}
                            mb={{ base: '28px', lg: '0' }}
                            pointerEvents="auto"
                        >
                            <MotionBox
                                key={activeItem.id}
                                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.98 }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                bg={{
                                    base: 'rgba(10, 14, 24, 0.88)',
                                    lg: realIndex > 0 ? 'rgba(8, 12, 22, 0.92)' : 'transparent',
                                }}
                                backdropFilter={{
                                    base: 'blur(20px)',
                                    lg: realIndex > 0 ? 'blur(24px)' : 'none',
                                }}
                                border={{
                                    base: '1px solid rgba(255, 255, 255, 0.1)',
                                    lg: realIndex > 0 ? '1px solid rgba(255, 255, 255, 0.14)' : 'none',
                                }}
                                borderRadius="24px"
                                p={{ base: '24px', md: '32px' }}
                                boxShadow={{
                                    base: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                    lg: realIndex > 0 ? '0 25px 60px rgba(0, 0, 0, 0.8)' : 'none',
                                }}
                            >
                                <Heading
                                    as="h3"
                                    fontSize={{ base: '26px', sm: '32px', md: '38px', lg: '42px' }}
                                    fontWeight={900}
                                    color="white"
                                    fontFamily="'Work Sans', sans-serif"
                                    letterSpacing="-0.025em"
                                    lineHeight={1.15}
                                    mb="8px"
                                    textShadow="0 2px 10px rgba(0, 0, 0, 0.8)"
                                >
                                    {activeItem.name}
                                </Heading>

                                <Text
                                    fontSize={{ base: '14px', md: '16px', lg: '17px' }}
                                    color="#f87171"
                                    fontWeight={600}
                                    fontFamily="'Work Sans', sans-serif"
                                    mb="20px"
                                    textShadow="0 2px 6px rgba(0, 0, 0, 0.8)"
                                >
                                    {activeItem.role}
                                </Text>

                                {/* QUOTE EXCERPT ON LEFT PANEL */}
                                <Text
                                    fontSize={{ base: '14px', md: '15px' }}
                                    color="rgba(255, 255, 255, 0.78)"
                                    lineHeight="1.65"
                                    fontFamily="'Work Sans', sans-serif"
                                    mb="28px"
                                    textShadow="0 2px 6px rgba(0, 0, 0, 0.8)"
                                >
                                    &ldquo;{activeItem.content}&rdquo;
                                </Text>

                                {/* PILL PAGINATION BARS & INTEGRATED ARROW CONTROLS */}
                                <Flex align="center" justify="space-between" mt="12px" pt="4px">
                                    <Flex align="center" gap="8px" position="relative">
                                        {TESTIMONIALS.map((item, idx) => {
                                            const isPillActive = realIndex === idx;
                                            return (
                                                <Box
                                                    key={item.id}
                                                    as="button"
                                                    onClick={() => {
                                                        setIsTransitioning(true);
                                                        setVirtualIndex(TESTIMONIALS.length + idx);
                                                    }}
                                                    aria-label={`Go to slide ${idx + 1}`}
                                                    w={{ base: '32px', md: '42px' }}
                                                    h="5px"
                                                    borderRadius="full"
                                                    bg={isPillActive ? 'transparent' : 'rgba(255, 255, 255, 0.22)'}
                                                    position="relative"
                                                    overflow="hidden"
                                                    cursor="pointer"
                                                    transition="all 0.3s ease"
                                                    _hover={{
                                                        bg: isPillActive ? 'transparent' : 'rgba(255, 255, 255, 0.45)',
                                                    }}
                                                >
                                                    {isPillActive && (
                                                        <MotionBox
                                                            layoutId="activeTestimonialPill"
                                                            position="absolute"
                                                            inset={0}
                                                            borderRadius="full"
                                                            bg="#24eba3"
                                                            boxShadow="0 0 12px rgba(36, 235, 163, 0.8)"
                                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                        />
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Flex>

                                    {/* PREV / NEXT CONTROLS */}
                                    <Flex align="center" gap="8px">
                                        <IconButton
                                            aria-label="Previous testimonial"
                                            icon={<ChevronLeft size={18} />}
                                            onClick={prevSlide}
                                            size="sm"
                                            borderRadius="full"
                                            bg="rgba(255, 255, 255, 0.08)"
                                            color="white"
                                            border="1px solid rgba(255, 255, 255, 0.16)"
                                            _hover={{
                                                bg: 'rgba(36, 235, 163, 0.2)',
                                                borderColor: '#24eba3',
                                                transform: 'scale(1.08)',
                                            }}
                                            _active={{ transform: 'scale(0.95)' }}
                                            transition="all 0.2s ease"
                                        />
                                        <IconButton
                                            aria-label="Next testimonial"
                                            icon={<ChevronRight size={18} />}
                                            onClick={nextSlide}
                                            size="sm"
                                            borderRadius="full"
                                            bg="rgba(255, 255, 255, 0.08)"
                                            color="white"
                                            border="1px solid rgba(255, 255, 255, 0.16)"
                                            _hover={{
                                                bg: 'rgba(36, 235, 163, 0.2)',
                                                borderColor: '#24eba3',
                                                transform: 'scale(1.08)',
                                            }}
                                            _active={{ transform: 'scale(0.95)' }}
                                            transition="all 0.2s ease"
                                        />
                                    </Flex>
                                </Flex>
                            </MotionBox>
                        </Box>

                        {/* RIGHT COLUMN: SLIDING TESTIMONIAL CARDS CAROUSEL */}
                        <Box
                            w="100%"
                            pl={{ base: '0', lg: '400px', xl: '440px' }}
                            overflow="visible"
                            position="relative"
                            zIndex={5}
                        >
                            <MotionFlex
                                animate={{
                                    x: `calc(-${virtualIndex} * (clamp(280px, 50vw, 720px) + 28px))`,
                                }}
                                transition={
                                    isTransitioning
                                        ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                                        : { duration: 0 }
                                }
                                onAnimationComplete={() => {
                                    // Seamless infinite modulo wrap without any visible flash
                                    if (virtualIndex >= 2 * TESTIMONIALS.length) {
                                        setIsTransitioning(false);
                                        setVirtualIndex((prev) => prev - TESTIMONIALS.length);
                                    } else if (virtualIndex < TESTIMONIALS.length) {
                                        setIsTransitioning(false);
                                        setVirtualIndex((prev) => prev + TESTIMONIALS.length);
                                    }
                                }}
                                gap={{ base: '16px', md: '28px' }}
                                align="center"
                                w="max-content"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                {REPEATED_TESTIMONIALS.map((item, idx) => {
                                    const isActive = virtualIndex === idx;
                                    const isPrev = idx < virtualIndex;

                                    return (
                                        <Box
                                            key={`${item.id}-${idx}`}
                                            onClick={() => {
                                                if (!isActive) {
                                                    setIsTransitioning(true);
                                                    setVirtualIndex(idx);
                                                }
                                            }}
                                            cursor="pointer"
                                            w="clamp(280px, 50vw, 720px)"
                                            aspectRatio={{ base: '16/11', md: '16/9' }}
                                            borderRadius={{ base: '20px', md: '28px' }}
                                            overflow="hidden"
                                            position="relative"
                                            bg="linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(10, 15, 30, 0.95) 100%)"
                                            backdropFilter="blur(20px)"
                                            border={
                                                isActive
                                                    ? '2px solid rgba(36, 235, 163, 0.6)'
                                                    : '1px solid rgba(255, 255, 255, 0.12)'
                                            }
                                            boxShadow={
                                                isActive
                                                    ? '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(36, 235, 163, 0.2)'
                                                    : '0 15px 40px rgba(0, 0, 0, 0.5)'
                                            }
                                            transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                                            transform={isActive ? 'scale(1)' : 'scale(0.96)'}
                                            opacity={isActive ? 1 : isPrev ? 0.35 : 0.65}
                                            _hover={{
                                                opacity: 1,
                                                transform: isActive ? 'scale(1.015)' : 'scale(0.98)',
                                                borderColor: 'rgba(36, 235, 163, 0.7)',
                                            }}
                                            p={{ base: '24px', sm: '32px', md: '40px' }}
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="space-between"
                                            role="group"
                                        >
                                            {/* BACKGROUND AMBIENT GLOW */}
                                            <Box
                                                position="absolute"
                                                top="-20%"
                                                right="-10%"
                                                w="250px"
                                                h="250px"
                                                bg="radial-gradient(circle, rgba(92, 197, 216, 0.15) 0%, transparent 70%)"
                                                filter="blur(40px)"
                                                pointerEvents="none"
                                            />

                                            {/* CARD HEADER: QUOTE ICON & TAG BADGE */}
                                            <Flex justify="space-between" align="center" position="relative" zIndex={2}>
                                                <Text
                                                    fontSize={{ base: '44px', md: '56px' }}
                                                    fontWeight={900}
                                                    lineHeight="1"
                                                    color="#5cc5d8"
                                                    fontFamily="Georgia, serif"
                                                    userSelect="none"
                                                >
                                                    “
                                                </Text>
                                                <Badge
                                                    bg="rgba(255, 255, 255, 0.08)"
                                                    color="rgba(255, 255, 255, 0.8)"
                                                    border="1px solid rgba(255, 255, 255, 0.14)"
                                                    px="12px"
                                                    py="4px"
                                                    borderRadius="full"
                                                    fontSize="11px"
                                                    fontWeight={600}
                                                    fontFamily="'Work Sans', sans-serif"
                                                >
                                                    {item.tag}
                                                </Badge>
                                            </Flex>

                                            {/* CARD BODY: QUOTE TEXT */}
                                            <Box position="relative" zIndex={2} my={{ base: '16px', md: '20px' }}>
                                                <Text
                                                    fontSize={{ base: '14.5px', sm: '16px', md: '17.5px' }}
                                                    color="rgba(255, 255, 255, 0.9)"
                                                    lineHeight="1.7"
                                                    fontFamily="'Work Sans', sans-serif"
                                                    fontWeight={400}
                                                >
                                                    {item.content}
                                                </Text>
                                            </Box>

                                            {/* CARD FOOTER: AUTHOR ROW */}
                                            <Flex
                                                align="center"
                                                gap="16px"
                                                position="relative"
                                                zIndex={2}
                                                pt="16px"
                                                borderTop="1px solid rgba(255, 255, 255, 0.08)"
                                            >
                                                <Box
                                                    w="52px"
                                                    h="52px"
                                                    borderRadius="full"
                                                    overflow="hidden"
                                                    flexShrink={0}
                                                    bg="#080c14"
                                                    border="2px solid rgba(92, 197, 216, 0.5)"
                                                    boxShadow="0 4px 14px rgba(0, 0, 0, 0.6)"
                                                >
                                                    <Image
                                                        src={getAssetPath(item.image)}
                                                        alt={item.name}
                                                        w="100%"
                                                        h="100%"
                                                        objectFit="cover"
                                                    />
                                                </Box>

                                                <Box minW={0}>
                                                    <Text
                                                        fontSize={{ base: '16px', md: '18px' }}
                                                        fontWeight={800}
                                                        color="white"
                                                        fontFamily="'Work Sans', sans-serif"
                                                        letterSpacing="-0.01em"
                                                        lineHeight="1.2"
                                                        mb="3px"
                                                    >
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        fontSize="13px"
                                                        fontWeight={600}
                                                        color="#f87171"
                                                        fontFamily="'Work Sans', sans-serif"
                                                        lineHeight="1.35"
                                                    >
                                                        {item.role}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Box>
                                    );
                                })}
                            </MotionFlex>
                        </Box>
                    </Flex>
                </Box>
            </Container>

            {/* ACCESSIBILITY / SEO MARKUP */}
            <Box className="sr-only" aria-hidden="true" display="none">
                <Heading as="h2">Community Testimonials</Heading>
                <ul>
                    {TESTIMONIALS.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name}</h3>
                            <p>{item.role}</p>
                            <blockquote>{item.content}</blockquote>
                            <Image src={getAssetPath(item.image)} alt={item.name} />
                        </li>
                    ))}
                </ul>
            </Box>
        </Box>
    );
}
