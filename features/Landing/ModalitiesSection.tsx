'use client';

import { useState } from 'react';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { motion, type Variants } from 'framer-motion';
import axialScan from '@/assets/landing/axial.jpeg';
import coronalScan from '@/assets/landing/coronal.jpg';
import tractography from '@/assets/landing/tractography.jpeg';
import connectomicsImg from '@/assets/landing/tract2.png';
import microscopyImg from '@/assets/landing/microscopy.png';
import psOctImg from '@/assets/landing/ps-oct.png';

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;

const axialScanSrc = getSrc(axialScan, '/assets/landing/axial.jpeg');
const coronalScanSrc = getSrc(coronalScan, '/assets/landing/coronal.jpg');
const tractographySrc = getSrc(tractography, '/assets/landing/tractography.jpeg');
const connectomicsImgSrc = getSrc(connectomicsImg, '/assets/landing/tract2.png');
const microscopyImgSrc = getSrc(microscopyImg, '/assets/landing/microscopy.png');
const psOctImgSrc = getSrc(psOctImg, '/assets/landing/ps-oct.png');

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionGrid = motion.create(Grid);

const sectionParentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: 'easeInOut' },
    },
};

const dotVariants = (idx: number): Variants => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: idx * 0.12,
            type: 'spring' as const,
            stiffness: 120,
            damping: 12,
        },
    },
});

const cardsContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.07,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
};

interface Modality {
    id: string;
    label: string;
    image: string;
    description: string;
}

export default function ModalitiesSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const modalities: Modality[] = [
        {
            id: 'mri',
            label: 'MRI',
            image: axialScanSrc,
            description: 'Structural & functional MRI scans resolving whole-brain anatomy.',
        },
        {
            id: 'dwi',
            label: 'DWI',
            image: tractographySrc,
            description: 'Diffusion-weighted imaging for mapping detailed white matter tracts.',
        },
        {
            id: 'fmri',
            label: 'fMRI',
            image: coronalScanSrc,
            description: 'Functional MRI capturing real-time neural dynamics and networks.',
        },
        {
            id: 'connectomics',
            label: 'Connectomics',
            image: connectomicsImgSrc,
            description: 'Mesoscale & macroscale connectivity mapping brain circuit graphs.',
        },
        {
            id: 'microscopy',
            label: 'Microscopy',
            image: microscopyImgSrc,
            description: 'Ultra-high resolution light sheet microscopy of individual cells.',
        },
        {
            id: 'psoct',
            label: 'PS-OCT',
            image: psOctImgSrc,
            description: 'Label-free mapping of myelinated fibers and orientations in brain tissue.',
        },
    ];

    return (
        <Box
            py={{ base: '40px', md: '60px', lg: '80px' }}
            position="relative"
            overflow="hidden"
            bg="transparent"
            borderTop="1px solid rgba(255, 255, 255, 0.05)"
        >
            <MotionBox
                maxW="1400px"
                mx="auto"
                px="24px"
                position="relative"
                zIndex={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionParentVariants}
            >
                {/* Header */}
                <Box textAlign="center" mb={{ base: '32px', lg: '48px' }}>
                    <Text
                        fontSize={{ base: '24px', md: '36px' }}
                        fontWeight="800"
                        color="white"
                        letterSpacing="-0.03em"
                        mb="12px"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        Work across modalities and scales
                    </Text>
                    <Text
                        fontSize="15px"
                        color="rgba(248, 250, 252, 0.65)"
                        maxW="600px"
                        mx="auto"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        From macroscale MRI to mesoscale connectomics and cellular imaging.
                    </Text>
                </Box>

                {/* Timeline / Continuum Layout (Desktop) */}
                <Box display={{ base: 'none', lg: 'block' }} position="relative" mb="48px" px="40px">
                    <Flex justify="space-between" align="center" mb="20px" position="relative">
                        {/* Macroscale / Microscale Indicators */}
                        <Box textAlign="left">
                            <Text
                                fontSize="12px"
                                fontWeight="800"
                                color="#38bdf8"
                                letterSpacing="0.08em"
                                textTransform="uppercase"
                            >
                                Macroscale
                            </Text>
                            <Text fontSize="10px" color="rgba(255, 255, 255, 0.4)">
                                Whole brain
                            </Text>
                        </Box>
                        <Box textAlign="right">
                            <Text
                                fontSize="12px"
                                fontWeight="800"
                                color="#c084fc"
                                letterSpacing="0.08em"
                                textTransform="uppercase"
                            >
                                Microscale
                            </Text>
                            <Text fontSize="10px" color="rgba(255, 255, 255, 0.4)">
                                Cellular level
                            </Text>
                        </Box>
                    </Flex>

                    {/* Timeline Line */}
                    <Box h="2px" w="100%" bg="rgba(255, 255, 255, 0.08)" position="relative">
                        {/* Glowing connector line */}
                        <MotionBox
                            variants={lineVariants}
                            style={{ originX: 0 }}
                            position="absolute"
                            left="0"
                            right="0"
                            top="0"
                            bottom="0"
                            background="linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)"
                            boxShadow="0 0 10px rgba(56, 189, 248, 0.4)"
                        />

                        {/* Modality Node Dots */}
                        {modalities.map((item, idx) => {
                            const percent = (idx / (modalities.length - 1)) * 100;
                            const isHovered = hoveredIndex === idx;
                            return (
                                <Box
                                    key={item.id}
                                    position="absolute"
                                    left={`${percent}%`}
                                    top="50%"
                                    transform="translate(-50%, -50%)"
                                    zIndex={3}
                                >
                                    <MotionBox
                                        variants={dotVariants(idx)}
                                        w={isHovered ? '14px' : '10px'}
                                        h={isHovered ? '14px' : '10px'}
                                        borderRadius="full"
                                        bg={idx < 2 ? '#38bdf8' : idx < 4 ? '#818cf8' : '#c084fc'}
                                        border="2px solid #0f172a"
                                        boxShadow={isHovered ? '0 0 12px currentColor' : 'none'}
                                        color={idx < 2 ? '#38bdf8' : idx < 4 ? '#818cf8' : '#c084fc'}
                                        sx={{
                                            transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease',
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* Modalities Cards Grid */}
                <MotionGrid
                    variants={cardsContainerVariants}
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(6, 1fr)',
                    }}
                    gap="20px"
                >
                    {modalities.map((modality, index) => {
                        const isHovered = hoveredIndex === index;
                        return (
                            <MotionFlex
                                variants={cardVariants}
                                key={modality.id}
                                direction="column"
                                bg="rgba(15, 23, 42, 0.35)"
                                border="1px solid rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(16px)"
                                borderRadius="12px"
                                p="12px"
                                sx={{
                                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}
                                cursor="pointer"
                                position="relative"
                                overflow="hidden"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                _hover={{
                                    transform: 'translateY(-6px)',
                                    bg: 'rgba(15, 23, 42, 0.55)',
                                    borderColor:
                                        index < 2
                                            ? 'rgba(56, 189, 248, 0.3)'
                                            : index < 4
                                              ? 'rgba(129, 140, 248, 0.3)'
                                              : 'rgba(192, 132, 252, 0.3)',
                                    boxShadow:
                                        index < 2
                                            ? '0 12px 30px rgba(56, 189, 248, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                                            : index < 4
                                              ? '0 12px 30px rgba(129, 140, 248, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                                              : '0 12px 30px rgba(192, 132, 252, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                                }}
                            >
                                {/* Glow element */}
                                <Box
                                    position="absolute"
                                    top="-50%"
                                    left="-50%"
                                    w="200%"
                                    h="200%"
                                    background={
                                        index < 2
                                            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 60%)'
                                            : index < 4
                                              ? 'radial-gradient(circle, rgba(129, 140, 248, 0.06) 0%, transparent 60%)'
                                              : 'radial-gradient(circle, rgba(192, 132, 252, 0.06) 0%, transparent 60%)'
                                    }
                                    opacity={isHovered ? 1 : 0}
                                    transition="opacity 0.3s ease"
                                    pointerEvents="none"
                                />

                                {/* Image block */}
                                <Box
                                    borderRadius="8px"
                                    overflow="hidden"
                                    aspectRatio={1}
                                    mb="12px"
                                    position="relative"
                                    bg="#070a13"
                                >
                                    <Image
                                        src={modality.image}
                                        alt={modality.label}
                                        w="100%"
                                        h="100%"
                                        objectFit="cover"
                                        transition="transform 0.5s ease"
                                        transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
                                    />
                                    <Box
                                        position="absolute"
                                        inset={0}
                                        bg="linear-gradient(to bottom, transparent 60%, rgba(15, 23, 42, 0.8) 100%)"
                                    />
                                </Box>

                                {/* Labels */}
                                <Text
                                    fontSize="15px"
                                    fontWeight="700"
                                    color="white"
                                    mb="4px"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    {modality.label}
                                </Text>
                                <Text
                                    fontSize="12px"
                                    color="rgba(248, 250, 252, 0.6)"
                                    lineHeight="1.4"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    {modality.description}
                                </Text>
                            </MotionFlex>
                        );
                    })}
                </MotionGrid>
            </MotionBox>
        </Box>
    );
}
