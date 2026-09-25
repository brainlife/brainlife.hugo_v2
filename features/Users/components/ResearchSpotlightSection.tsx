'use client';

import React from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Image,
    Badge,
    Stack,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Award,
    CheckCircle2,
    Sparkles,
    FileText,
    Layers,
    Share2,
    Microscope,
    ExternalLink,
} from 'lucide-react';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);

export default function ResearchSpotlightSection() {
    return (
        <Box mb={{ base: '64px', md: '100px' }}>
            {/* Section Header */}
            <Box position="relative" textAlign="center" maxW="840px" mx="auto" mb={{ base: '32px', md: '44px' }}>
                <Text
                    fontSize={{ base: '60px', sm: '80px', md: '100px' }}
                    fontWeight={900}
                    color="rgba(255, 255, 255, 0.08)"
                    letterSpacing="-0.04em"
                    lineHeight="0.85"
                    fontFamily="'Work Sans', sans-serif"
                    userSelect="none"
                    pointerEvents="none"
                >
                    Research
                </Text>
                <Heading
                    as="h2"
                    fontSize={{ base: '28px', sm: '36px', md: '44px' }}
                    fontWeight={900}
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="-0.02em"
                    mt={{ base: '-18px', sm: '-24px', md: '-30px' }}
                    mb="14px"
                >
                    Spotlight
                </Heading>
                <Text fontSize="15px" color="#94a3b8" lineHeight="1.65" maxW="700px" mx="auto">
                    From raw scans to conference breakthroughs — see how researchers use ezBIDS and Brainlife.io to process multi-session diffusion MRI datasets and deliver reproducible discoveries.
                </Text>
            </Box>

            {/* Spotlight Showcase Card - Clean Brainlife Theme */}
            <Box
                borderRadius="16px"
                bg="#162032"
                border="1px solid rgba(255, 255, 255, 0.1)"
                boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                overflow="hidden"
                p={{ base: '22px 18px', md: '36px 32px' }}
            >
                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 1.3fr' }}
                    gap={{ base: '28px', lg: '40px' }}
                    alignItems="center"
                >
                    {/* Left: Authentic Conference Poster Photo */}
                    <Box position="relative">
                        <Box
                            borderRadius="12px"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            bg="#0e1626"
                            boxShadow="0 12px 30px rgba(0, 0, 0, 0.5)"
                            maxH={{ base: '480px', lg: '560px' }}
                        >
                            <Image
                                src={getAssetPath('/img/users/poster-blaire-porter.jpg')}
                                alt="Dr. Blaire Porter presenting her ezBIDS & Brainlife.io powered research poster"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                transition="transform 0.5s ease"
                                _hover={{ transform: 'scale(1.02)' }}
                            />
                        </Box>

                        {/* Conference Pill Badge */}
                        <Box
                            position="absolute"
                            bottom="16px"
                            left="16px"
                            right="16px"
                            bg="rgba(14, 22, 38, 0.92)"
                            border="1px solid rgba(38, 147, 216, 0.35)"
                            backdropFilter="blur(12px)"
                            p="10px 14px"
                            borderRadius="8px"
                        >
                            <Flex alignItems="center" gap="8px">
                                <Award size={16} color="#2693D8" style={{ flexShrink: 0 }} />
                                <Text fontSize="11.5px" color="white" fontWeight={600} lineHeight="1.3">
                                    Presented at Flux Congress: The Society for Developmental Cognitive Neuroscience
                                </Text>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Right: Scientific Breakdown & Pipeline Citations */}
                    <Box>
                        <Flex alignItems="center" gap="8px" mb="12px" wrap="wrap">
                            <Badge
                                bg="rgba(38, 147, 216, 0.12)"
                                color="#2693D8"
                                border="1px solid rgba(38, 147, 216, 0.3)"
                                fontSize="10.5px"
                                fontWeight={700}
                                letterSpacing="0.06em"
                                px="8px"
                                py="3px"
                                borderRadius="6px"
                                textTransform="uppercase"
                            >
                                Case Study • Cognitive Neuroscience
                            </Badge>
                            <Text fontSize="12px" color="#94a3b8">
                                University of Texas at Austin
                            </Text>
                        </Flex>

                        <Heading
                            as="h3"
                            fontSize={{ base: '20px', sm: '24px', md: '28px' }}
                            fontWeight={800}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            lineHeight="1.25"
                            mb="10px"
                        >
                            The role of white matter in math learning and retention in childhood
                        </Heading>

                        <Text fontSize="13px" color="#94a3b8" mb="18px">
                            <Text as="span" color="#cbd5e1" fontWeight={700}>
                                Authors:
                            </Text>{' '}
                            Blaire M. Porter, Gabriela Amorosino, Jessica A. Church, and Franco Pestilli (UT Austin)
                        </Text>

                        <Text fontSize="14px" color="#cbd5e1" lineHeight="1.65" mb="22px">
                            This study investigated how microstructural properties of white matter tracts predict individual
                            differences in children&apos;s mathematical ability. By leveraging{' '}
                            <Text as="span" color="#2693D8" fontWeight={700}>
                                ezBIDS
                            </Text>{' '}
                            for zero-friction scanner curation and{' '}
                            <Text as="span" color="#2693D8" fontWeight={700}>
                                Brainlife.io
                            </Text>{' '}
                            for cloud-based DWI tractography, the team executed complex preprocessing pipelines with guaranteed reproducibility.
                        </Text>

                        {/* Pipeline Highlights in the Study */}
                        <Box
                            p="16px"
                            borderRadius="10px"
                            bg="#0e1626"
                            border="1px solid rgba(255, 255, 255, 0.08)"
                            mb="22px"
                        >
                            <Text
                                fontSize="11px"
                                fontWeight={700}
                                color="#2693D8"
                                letterSpacing="0.08em"
                                textTransform="uppercase"
                                mb="10px"
                            >
                                Methodology Enabled by Brainlife Ecosystem
                            </Text>
                            <Stack spacing="9px">
                                <Flex alignItems="flex-start" gap="8px">
                                    <CheckCircle2 size={14} color="#2693D8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.4">
                                        <Text as="span" color="white" fontWeight={700}>ezBIDS Data Organization:</Text> Fully automated BIDS conversion from raw Siemens/GE DICOM sequences without manual script debugging.
                                    </Text>
                                </Flex>
                                <Flex alignItems="flex-start" gap="8px">
                                    <CheckCircle2 size={14} color="#2693D8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.4">
                                        <Text as="span" color="white" fontWeight={700}>Cloud DWI Preprocessing:</Text> Head-motion correction, eddy current elimination, and diffusion tensor fitting executed on NSF supercomputers.
                                    </Text>
                                </Flex>
                                <Flex alignItems="flex-start" gap="8px">
                                    <CheckCircle2 size={14} color="#2693D8" style={{ marginTop: '2px', flexShrink: 0 }} />
                                    <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.4">
                                        <Text as="span" color="white" fontWeight={700}>Tract-Level Analytics:</Text> Extracted fractional anisotropy (FA), mean diffusivity (MD), and quantitative tract profiles predicting math test scores.
                                    </Text>
                                </Flex>
                            </Stack>
                        </Box>

                        {/* Technology / Standard Tags */}
                        <Flex wrap="wrap" gap="8px">
                            <Badge bg="rgba(38, 147, 216, 0.12)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.3)" fontSize="11px" px="10px" py="4px" borderRadius="6px">
                                ezBIDS Standardized
                            </Badge>
                            <Badge bg="rgba(38, 147, 216, 0.12)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.3)" fontSize="11px" px="10px" py="4px" borderRadius="6px">
                                Brainlife.io Cloud Storage
                            </Badge>
                            <Badge bg="rgba(255, 255, 255, 0.06)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.1)" fontSize="11px" px="10px" py="4px" borderRadius="6px">
                                Tract-Level Diffusion MRI
                            </Badge>
                            <Badge bg="rgba(255, 255, 255, 0.06)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.1)" fontSize="11px" px="10px" py="4px" borderRadius="6px">
                                100% Reproducible Lineage
                            </Badge>
                        </Flex>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}
