'use client';

import { Box, Flex, Grid, Image, Text, Button, Link, useToast } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ArrowRight, FileText, Database, Eye } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import tractography from '@/assets/landing/tractography.jpeg';
import connectomicsImg from '@/assets/landing/tract2.png';
import psOctImg from '@/assets/landing/ps-oct.png';
import axonalArchImg from '@/assets/landing/axonal-architecture.png';

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;

const tractographySrc = getSrc(tractography, '/assets/landing/tractography.jpeg');
const connectomicsImgSrc = getSrc(connectomicsImg, '/assets/landing/tract2.png');
const psOctImgSrc = getSrc(psOctImg, '/assets/landing/ps-oct.png');
const axonalArchImgSrc = getSrc(axonalArchImg, '/assets/landing/axonal-architecture.png');

const MotionBox = motion.create(Box);

const sectionRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

interface StudyProps {
    title: string;
    journal: string;
    year: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
    citation: string;
}

const SupportingStudyCard = ({ title, journal, year, description, tags, image, link = '#', citation }: StudyProps) => {
    const toast = useToast();

    const handleCite = (e: React.MouseEvent) => {
        e.preventDefault();
        if (citation) {
            navigator.clipboard.writeText(citation);
            toast({
                title: 'Citation Copied',
                description: 'The publication citation has been copied to your clipboard.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    };

    return (
        <Box
            minW={{ base: '280px', sm: '320px', md: '288px', lg: '368px', xl: '434px' }}
            w={{ base: '280px', sm: '320px', md: '288px', lg: '368px', xl: '434px' }}
            flexShrink={0}
            bg="rgba(15, 23, 42, 0.3)"
            border="1px solid rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(16px)"
            borderRadius="12px"
            overflow="hidden"
            p="16px"
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _hover={{
                transform: 'translateY(-4px)',
                bg: 'rgba(15, 23, 42, 0.45)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
            display="flex"
            flexDirection="column"
            h="auto"
        >
            {/* Thumbnail */}
            <Box borderRadius="8px" overflow="hidden" h="120px" w="100%" mb="16px" position="relative" bg="#070a13">
                <Image src={image} alt={title} w="100%" h="100%" objectFit="cover" />
                <Box position="absolute" inset={0} bg="rgba(11, 14, 23, 0.2)" />
            </Box>

            {/* Journal Info */}
            <Flex gap="6px" align="center" mb="8px">
                <Text fontSize="11px" fontWeight="700" color="#5cc5d8" textTransform="uppercase" letterSpacing="0.04em">
                    {journal}
                </Text>
                <Text fontSize="11px" color="rgba(255, 255, 255, 0.3)">
                    •
                </Text>
                <Text fontSize="11px" color="rgba(255, 255, 255, 0.4)" fontWeight="500">
                    {year}
                </Text>
            </Flex>

            {/* Title */}
            <Text
                fontSize="15px"
                fontWeight="700"
                color="white"
                lineHeight="1.3"
                mb="6px"
                fontFamily="'Work Sans', sans-serif"
            >
                {title}
            </Text>

            {/* Description */}
            <Text
                fontSize="12px"
                color="rgba(248, 250, 252, 0.65)"
                lineHeight="1.5"
                mb="16px"
                flex={1}
                fontFamily="'Work Sans', sans-serif"
            >
                {description}
            </Text>

            {/* Tags Row */}
            <Flex gap="6px" wrap="wrap" mb="16px">
                {tags.map((t, i) => (
                    <Box
                        key={i}
                        px="8px"
                        py="3px"
                        borderRadius="4px"
                        bg="rgba(255, 255, 255, 0.04)"
                        border="1px solid rgba(255, 255, 255, 0.08)"
                        fontSize="10px"
                        fontWeight="600"
                        color="rgba(255, 255, 255, 0.6)"
                    >
                        {t}
                    </Box>
                ))}
            </Flex>

            {/* Action Row */}
            <Flex gap="12px" borderTop="1px solid rgba(255, 255, 255, 0.06)" pt="12px">
                <Link
                    href="#"
                    onClick={handleCite}
                    display="inline-flex"
                    alignItems="center"
                    gap="4px"
                    fontSize="11px"
                    fontWeight="700"
                    color="white"
                    opacity={0.7}
                    _hover={{ opacity: 1, textDecoration: 'none' }}
                >
                    <FileText size={12} />
                    Cite
                </Link>
                <Link
                    {...(link.startsWith('/')
                        ? { as: NextLink, href: link }
                        : { href: link, target: '_blank', rel: 'noopener noreferrer' })}
                    display="inline-flex"
                    alignItems="center"
                    gap="4px"
                    fontSize="11px"
                    fontWeight="700"
                    color="#5cc5d8"
                    opacity={0.85}
                    _hover={{ opacity: 1, textDecoration: 'none' }}
                >
                    <Eye size={12} />
                    View
                </Link>
            </Flex>
        </Box>
    );
};

export default function ResearchSection() {
    const supportingStudies = [
        {
            title: 'Center for Mesoscale Connectomics (dMRI)',
            journal: 'Scientific Data',
            year: '2023',
            description: 'Ultra-high field 10.5T diffusion MRI dataset mapping macroscopic white matter pathways.',
            tags: ['dMRI', 'Tractography', 'Macaque'],
            image: connectomicsImgSrc,
            link: '/publications/10.25663%2Fbrainlife.pub.64',
            citation:
                'Warrington, S., Selim, M. K., Tendler, B. C., Moeller, S., Farooq, H., Wu, W., Pisharady, P. K., Adriany, G., Auerbach, E. J., Bratch, A., Manea, A. M. G., Grafft, T., Jungst, S., Harel, N., Waks, M., Pestilli, F., Yacoub, E., Lenglet, C., Ugurbil, K., Heilbronner, S. R., Miller, K. L., Jbabdi, S., & Sotiropoulos, S. N. (2026). Center for Mesoscale Connectomics. https://doi.org/10.25663/brainlife.pub.64',
        },
        {
            title: 'Evaluations of White Matter Tractography Algorithms',
            journal: 'Nature Communications',
            year: '2022',
            description:
                'Comprehensive benchmark of tractography algorithms across diverse human neuroimaging protocols.',
            tags: ['Tractography', 'Benchmark', 'Human'],
            image: tractographySrc,
            link: '/publications/10.25663%2Fbrainlife.pub.8',
            citation:
                'Pestilli, F. et al. (2022). Evaluations of white matter tractography algorithms. Nature Communications. https://doi.org/10.25663/brainlife.pub.8',
        },
        {
            title: 'Polarization-Sensitive OCT Mapping (PS-OCT)',
            journal: 'Frontiers in Neuroanatomy',
            year: '2023',
            description:
                'Label-free, high-resolution polarization-sensitive optical coherence tomography for mapping myeloarchitecture.',
            tags: ['PS-OCT', 'Label-Free', 'Brainstem'],
            image: psOctImgSrc,
            link: '/publications/10.25663%2Fbrainlife.pub.64',
            citation:
                'Warrington, S., Selim, M. K., et al. (2026). Center for Mesoscale Connectomics (PS-OCT). https://doi.org/10.25663/brainlife.pub.64',
        },
        {
            title: 'Axonal Projections & Microscopy (Axonal)',
            journal: 'Cerebral Cortex',
            year: '2023',
            description:
                'Dense/sparse axonal tracing and light sheet microscopy mapping projections of individual axons.',
            tags: ['Microscopy', 'Axonal Tracing', 'Histology'],
            image: axonalArchImgSrc,
            link: '/publications/10.25663%2Fbrainlife.pub.64',
            citation:
                'Warrington, S., Selim, M. K., et al. (2026). Center for Mesoscale Connectomics (Axonal). https://doi.org/10.25663/brainlife.pub.64',
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
            {/* Ambient glows */}
            <Box
                position="absolute"
                right="-10%"
                top="20%"
                width="600px"
                height="600px"
                background="radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 60%)"
                filter="blur(80px)"
                pointerEvents="none"
                zIndex={0}
            />

            <MotionBox
                maxW="1400px"
                mx="auto"
                px="24px"
                position="relative"
                zIndex={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionRevealVariants}
            >
                <Grid
                    templateColumns={{ base: '1fr', lg: '300px 1fr' }}
                    gap={{ base: '32px', lg: '48px' }}
                    alignItems="center"
                >
                    {/* Left Panel: Intro */}
                    <Flex direction="column" justify="center">
                        <Box>
                            <Text
                                fontSize="11px"
                                fontWeight="800"
                                letterSpacing="0.15em"
                                color="rgba(255, 255, 255, 0.4)"
                                textTransform="uppercase"
                                mb="12px"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Scientific Impact
                            </Text>
                            <Text
                                fontSize={{ base: '26px', md: '36px' }}
                                fontWeight="800"
                                color="white"
                                letterSpacing="-0.03em"
                                lineHeight="1.15"
                                mb="16px"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Research powered by Brainlife
                            </Text>
                            <Text
                                fontSize="14px"
                                color="rgba(248, 250, 252, 0.65)"
                                lineHeight="1.5"
                                mb="24px"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Real discoveries enabled by open data, reproducible workflows, and a collaborative
                                community.
                            </Text>
                        </Box>

                        <Link
                            href="https://brainlife.io/pubs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            display="inline-flex"
                            alignItems="center"
                            gap="6px"
                            fontSize="13px"
                            fontWeight="700"
                            color="#5cc5d8"
                            _hover={{ color: '#7fe0f0', textDecoration: 'none' }}
                        >
                            View all publications
                            <ArrowRight size={14} />
                        </Link>
                    </Flex>

                    {/* Right Column: Horizontal Scrolling List containing Featured Study + Supporting Studies */}
                    <Box
                        overflowX="auto"
                        pb="16px"
                        mx="-24px"
                        px="24px"
                        css={{
                            '&::-webkit-scrollbar': {
                                height: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(255, 255, 255, 0.02)',
                                borderRadius: '3px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '3px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <Flex gap="20px" alignItems="stretch">
                            {/* Featured Study Card */}
                            <Box
                                minW={{ base: '280px', sm: '580px', md: '560px', lg: '720px', xl: '850px' }}
                                w={{ base: '280px', sm: '580px', md: '560px', lg: '720px', xl: '850px' }}
                                flexShrink={0}
                                bg="rgba(15, 23, 42, 0.35)"
                                border="1px solid rgba(255, 255, 255, 0.05)"
                                backdropFilter="blur(16px)"
                                borderRadius="16px"
                                overflow="hidden"
                                p={{ base: '20px', md: '32px' }}
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                boxShadow="0 20px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
                                transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
                                _hover={{
                                    borderColor: 'rgba(255, 255, 255, 0.15)',
                                    bg: 'rgba(15, 23, 42, 0.55)',
                                    boxShadow:
                                        '0 30px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                }}
                            >
                                <Grid
                                    templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
                                    gap={{ base: '24px', md: '32px' }}
                                    alignItems="center"
                                >
                                    {/* Visual Image */}
                                    <Box
                                        borderRadius="12px"
                                        overflow="hidden"
                                        border="1px solid rgba(255, 255, 255, 0.1)"
                                        shadow="lg"
                                        bg="#070a13"
                                    >
                                        <Image
                                            src={tractographySrc}
                                            alt="Heterogeneity of White Matter Connectivity"
                                            w="100%"
                                            h="auto"
                                            maxH="280px"
                                            objectFit="cover"
                                        />
                                    </Box>

                                    {/* Featured Metadata & Text */}
                                    <Flex direction="column">
                                        <Box
                                            display="inline-flex"
                                            alignItems="center"
                                            px="10px"
                                            py="4px"
                                            borderRadius="full"
                                            bg="rgba(92, 197, 216, 0.12)"
                                            border="1px solid rgba(92, 197, 216, 0.3)"
                                            color="#5cc5d8"
                                            fontSize="10px"
                                            fontWeight="800"
                                            letterSpacing="0.08em"
                                            textTransform="uppercase"
                                            mb="16px"
                                            w="fit-content"
                                        >
                                            Featured Study
                                        </Box>

                                        <Text
                                            fontSize={{ base: '20px', md: '24px' }}
                                            fontWeight="800"
                                            color="white"
                                            lineHeight="1.25"
                                            mb="8px"
                                            fontFamily="'Work Sans', sans-serif"
                                            letterSpacing="-0.02em"
                                        >
                                            Heterogeneity of white-matter organization in the human brain
                                        </Text>

                                        <Flex gap="6px" align="center" mb="12px">
                                            <Text fontSize="12px" fontWeight="700" color="#5cc5d8">
                                                bioRxiv
                                            </Text>
                                            <Text fontSize="12px" color="rgba(255, 255, 255, 0.3)">
                                                •
                                            </Text>
                                            <Text fontSize="12px" color="rgba(255, 255, 255, 0.4)">
                                                2026
                                            </Text>
                                        </Flex>

                                        <Text
                                            fontSize="13px"
                                            color="rgba(248, 250, 252, 0.7)"
                                            lineHeight="1.6"
                                            mb="20px"
                                            fontFamily="'Work Sans', sans-serif"
                                        >
                                            Revealing the regional diversity and three-dimensional organization of
                                            individual axons within human white matter.
                                        </Text>

                                        <Flex gap="8px" wrap="wrap" mb="24px">
                                            {['Axons', 'Microstructure', 'Histology'].map((tag, i) => (
                                                <Box
                                                    key={i}
                                                    px="10px"
                                                    py="4px"
                                                    borderRadius="6px"
                                                    bg="rgba(255, 255, 255, 0.04)"
                                                    border="1px solid rgba(255, 255, 255, 0.08)"
                                                    fontSize="11px"
                                                    fontWeight="600"
                                                    color="rgba(255, 255, 255, 0.75)"
                                                >
                                                    {tag}
                                                </Box>
                                            ))}
                                        </Flex>

                                        <Flex gap="16px">
                                            <Button
                                                as={NextLink}
                                                href="/publications/10.25663%2Fbrainlife.pub.70"
                                                px="18px"
                                                py="10px"
                                                h="auto"
                                                borderRadius="8px"
                                                bg="#5cc5d8"
                                                color="#090d16"
                                                fontSize="13px"
                                                fontWeight={700}
                                                _hover={{ bg: '#7fe0f0', textDecoration: 'none' }}
                                                leftIcon={<FileText size={14} />}
                                            >
                                                Read Publication
                                            </Button>
                                            <Button
                                                as={NextLink}
                                                href="/publications/10.25663%2Fbrainlife.pub.70"
                                                px="18px"
                                                py="10px"
                                                h="auto"
                                                borderRadius="8px"
                                                bg="transparent"
                                                border="1px solid rgba(255, 255, 255, 0.12)"
                                                color="white"
                                                fontSize="13px"
                                                fontWeight={700}
                                                _hover={{
                                                    bg: 'rgba(255, 255, 255, 0.04)',
                                                    borderColor: 'rgba(255, 255, 255, 0.25)',
                                                }}
                                                leftIcon={<Database size={14} />}
                                            >
                                                Explore Dataset
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Grid>
                            </Box>

                            {/* Supporting Studies Cards */}
                            {supportingStudies.map((study, idx) => (
                                <SupportingStudyCard key={idx} {...study} />
                            ))}
                        </Flex>
                    </Box>
                </Grid>
            </MotionBox>
        </Box>
    );
}
