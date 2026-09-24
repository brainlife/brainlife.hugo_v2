'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Image,
    Button,
    HStack,
    Stack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MotionBox = motion.create(Box);

const CULTURE_PHOTOS = [
    {
        id: 'franco-tree',
        src: '/img/team/franco-brainlife-tree.jpg',
        alt: 'Dr. Franco Pestilli holding the physical 3D Brainlife Tree emblem',
    },
    {
        id: 'tree-sculpture',
        src: '/img/team/brainlife-tree-sculpture.jpg',
        alt: 'The 3D-printed Brainlife Brain-Tree sculpture in the lab meeting space',
    },
    {
        id: 'hackathon',
        src: '/img/team/lab-culture-1.jpg',
        alt: 'Brainlife collaborative team sprint and hackathon',
    },
    {
        id: 'mentorship',
        src: '/img/team/lab-culture-2.jpg',
        alt: 'Pestilli lab students and postdocs collaborating',
    },
    {
        id: 'conference',
        src: '/img/users/poster-blaire-porter.jpg',
        alt: 'Dr. Blaire Porter presenting conference findings',
    },
    {
        id: 'team',
        src: '/img/team/all.jpg',
        alt: 'The global Brainlife team and consortium',
    },
];

export default function LabCultureSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance slides every 5.5s
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % CULTURE_PHOTOS.length);
        }, 5500);
        return () => clearInterval(timer);
    }, [isPaused]);

    return (
        <Box mb={{ base: '72px', md: '110px' }} position="relative">
            {/* 2-COLUMN LIZARD-STYLE LAYOUT */}
            <Grid
                templateColumns={{
                    base: '1fr',
                    lg: '1fr 1.15fr',
                }}
                gap={{ base: '36px', lg: '56px' }}
                alignItems="flex-start"
            >
                {/* =========================================
                    LEFT COLUMN: ASYMMETRIC IMAGE + DOTS + CTA
                   ========================================= */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Asymmetric Curvy Photo Frame */}
                    <Box
                        w="100%"
                        maxW="480px"
                        h={{ base: '300px', sm: '360px', md: '400px' }}
                        position="relative"
                        overflow="hidden"
                        borderRadius="24px 80px 24px 24px"
                        border="1px solid rgba(255, 255, 255, 0.15)"
                        boxShadow="0 20px 50px rgba(0, 0, 0, 0.6)"
                        bg="#0e1626"
                    >
                        <AnimatePresence mode="wait">
                            <MotionBox
                                key={CULTURE_PHOTOS[currentSlide].id}
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                position="absolute"
                                inset={0}
                            >
                                <Image
                                    src={CULTURE_PHOTOS[currentSlide].src}
                                    alt={CULTURE_PHOTOS[currentSlide].alt}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                />
                            </MotionBox>
                        </AnimatePresence>
                    </Box>

                    {/* Pagination Dots */}
                    <HStack spacing="8px" mt="22px" mb="18px" justify="center">
                        {CULTURE_PHOTOS.map((_, idx) => (
                            <Box
                                key={idx}
                                as="button"
                                onClick={() => setCurrentSlide(idx)}
                                w={idx === currentSlide ? '10px' : '8px'}
                                h={idx === currentSlide ? '10px' : '8px'}
                                borderRadius="full"
                                bg={idx === currentSlide ? '#2693D8' : 'rgba(255, 255, 255, 0.25)'}
                                transition="all 0.25s ease"
                                cursor="pointer"
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </HStack>

                    {/* Wavy Decorative Line */}
                    <Box mb="22px">
                        <svg width="140" height="16" viewBox="0 0 140 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 8C15 2 27 14 39 8C51 2 63 14 75 8C87 2 99 14 111 8C123 2 133 12 137 8"
                                stroke="#2693D8"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Box>

                    {/* Want to join headline with watermark */}
                    <Box position="relative" mb="20px" maxW="380px">
                        <Text
                            fontSize={{ base: '38px', sm: '46px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.03em"
                            lineHeight="0.9"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Want to join
                        </Text>
                        <Heading
                            as="h3"
                            fontSize={{ base: '22px', sm: '26px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mt="-10px"
                        >
                            the brainlife family?
                        </Heading>
                    </Box>

                    {/* LET'S TALK Button */}
                    <Button
                        as="a"
                        href="https://github.com/brainlife"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        borderColor="#2693D8"
                        color="#2693D8"
                        bg="rgba(38, 147, 216, 0.08)"
                        px="28px"
                        py="10px"
                        h="42px"
                        borderRadius="8px"
                        fontSize="12.5px"
                        fontWeight={800}
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        rightIcon={<ArrowRight size={15} />}
                        transition="all 0.25s ease"
                        _hover={{
                            bg: '#2693D8',
                            color: 'white',
                            borderColor: '#2693D8',
                            transform: 'translateY(-2px)',
                            textDecoration: 'none',
                        }}
                    >
                        LET&apos;S TALK
                    </Button>
                </Box>

                {/* =========================================
                    RIGHT COLUMN: WATERMARK HEADER + EDITORIAL COPY
                    ========================================= */}
                <Box pt={{ base: '0', lg: '10px' }}>
                    {/* Header with giant watermark "Our" and bold "Culture" */}
                    <Box position="relative" mb={{ base: '24px', md: '32px' }}>
                        <Text
                            fontSize={{ base: '64px', sm: '80px', md: '96px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Our
                        </Text>
                        <Heading
                            as="h2"
                            fontSize={{ base: '32px', sm: '38px', md: '44px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mt={{ base: '-18px', sm: '-22px', md: '-28px' }}
                        >
                            Culture
                        </Heading>
                    </Box>

                    {/* Editorial Paragraphs */}
                    <Stack spacing="18px" color="#cbd5e1" fontSize="14.5px" lineHeight="1.7" fontFamily="'Work Sans', sans-serif">
                        <Text>
                            Driven by a mission to democratize computational neuroscience, we innovate at the intersection of
                            form and function, and of cutting-edge algorithmic rigor and everyday research practicality.
                        </Text>

                        <Text>
                            Everything we create is built with an eye on the future. By providing flexible, reproducible cloud solutions,
                            we empower researchers and laboratories worldwide to keep asking ambitious questions about the human brain without technical limitations.
                        </Text>

                        <Text>
                            Our team is the heart of all our operations. It consists of an inspiring combination of diverse disciplines—psychologists,
                            neuroimagers, high-performance computing architects, and software engineers—all working together towards the common goal of advancing open discovery.
                        </Text>

                        <Text>
                            When we’re not tracking white matter fascicles or containerizing algorithms, we take a step back and connect over coffee,
                            themed hackathons, and collaborative problem-solving sessions.
                        </Text>

                        <Text>
                            The Pestilli Lab at UT Austin is a place where trainees and senior researchers challenge each other’s hypotheses and complement each other’s strengths.
                            It has cultivated a balanced, supportive culture that drives us to continuously innovate and build lasting tools for the global neuroscience community.
                        </Text>
                    </Stack>
                </Box>
            </Grid>
        </Box>
    );
}
