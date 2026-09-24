'use client';

import { Box, Flex, Grid, Image, Text, Link } from '@chakra-ui/react';
import { Play, ArrowRight, UserPlus, Upload, Cpu, Eye, Share2 } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const MotionLink = motion.create(Link);
const MotionFlex = motion.create(Flex);

const learnParentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const learnCardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

interface VideoProps {
    title: string;
    duration: string;
    label: string;
    thumbnail: string;
    href: string;
    description: string;
}

const VideoCard = ({ title, duration, label, thumbnail, href, description }: VideoProps) => (
    <MotionLink
        variants={learnCardVariants}
        href={href}
        target={href !== '#' ? '_blank' : undefined}
        rel={href !== '#' ? 'noopener noreferrer' : undefined}
        display="flex"
        flexDirection="column"
        minW={{ base: '280px', sm: '320px', md: '288px', lg: '368px', xl: '434px' }}
        w={{ base: '280px', sm: '320px', md: '288px', lg: '368px', xl: '434px' }}
        flexShrink={0}
        cursor={href === '#' ? 'default' : 'pointer'}
        role="group"
        bg="rgba(15, 23, 42, 0.3)"
        border="1px solid rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(16px)"
        borderRadius="12px"
        p="16px"
        sx={{
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important',
        }}
        _hover={{
            textDecoration: 'none',
            transform: 'translateY(-4px)',
            bg: 'rgba(15, 23, 42, 0.45)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        }}
    >
        {/* Thumbnail Container */}
        <Box
            borderRadius="8px"
            overflow="hidden"
            h="120px"
            w="100%"
            mb="16px"
            position="relative"
            bg="#070a13"
        >
            <Image src={thumbnail} alt={title} w="100%" h="100%" objectFit="cover" />
            <Box position="absolute" inset={0} bg="rgba(11, 14, 23, 0.2)" />

            {/* Play Button Overlay */}
            <Flex position="absolute" inset={0} alignItems="center" justifyContent="center">
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    w="36px"
                    h="36px"
                    borderRadius="full"
                    bg="rgba(255, 255, 255, 0.9)"
                    color="#0b0e17"
                    transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    _groupHover={{
                        transform: 'scale(1.1)',
                        bg: '#5cc5d8',
                        color: '#090d16',
                        boxShadow: '0 0 20px rgba(92, 197, 216, 0.5)',
                    }}
                >
                    <Play size={14} fill="currentColor" style={{ marginLeft: '1.5px' }} />
                </Flex>
            </Flex>
        </Box>

        {/* Metadata Row */}
        <Flex gap="6px" align="center" mb="8px">
            <Text fontSize="11px" fontWeight="700" color="#5cc5d8" textTransform="uppercase" letterSpacing="0.04em">
                {label}
            </Text>
            <Text fontSize="11px" color="rgba(255, 255, 255, 0.3)">
                •
            </Text>
            <Text fontSize="11px" color="rgba(255, 255, 255, 0.4)" fontWeight="500">
                {duration}
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
            transition="color 0.2s ease"
            _groupHover={{ color: '#5cc5d8' }}
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

        {/* Action Row */}
        <Flex gap="12px" borderTop="1px solid rgba(255, 255, 255, 0.06)" pt="12px" mt="auto">
            <Text
                display="inline-flex"
                alignItems="center"
                gap="4px"
                fontSize="11px"
                fontWeight="700"
                color="white"
                opacity={0.7}
                _groupHover={{ opacity: 1 }}
            >
                <Play size={12} fill="currentColor" />
                Watch Video
            </Text>
        </Flex>
    </MotionLink>
);

export default function LearnSection() {
    const videos = [
        {
            title: 'brainlife.io white matter segmentation visualization',
            duration: '0:21',
            label: 'Visualization',
            thumbnail: 'https://img.youtube.com/vi/5Q59jVlWmgA/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=5Q59jVlWmgA',
            description: 'High-resolution 3D fiber tractography mapping white matter pathways.',
        },
        {
            title: 'visualizers',
            duration: '1:12',
            label: '3D Brain',
            thumbnail: 'https://img.youtube.com/vi/H21eKZDJYxg/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=H21eKZDJYxg',
            description: 'Explore interactive visualizers for structural and functional neuroimaging data.',
        },
        {
            title: 'Network Neuroscience Visualizer',
            duration: '0:43',
            label: 'Network',
            thumbnail: 'https://img.youtube.com/vi/A2V5GEtapkM/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=A2V5GEtapkM',
            description: 'An interactive viewer for connectome graphs and network matrices.',
        },
        {
            title: '2021 OHBM Sandra Hanekamp Poster 2506',
            duration: '2:56',
            label: 'Research',
            thumbnail: 'https://img.youtube.com/vi/97k2sI9gGZ4/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=97k2sI9gGZ4',
            description: 'OHBM poster presentation showing clinical neuroscience application.',
        },
        {
            title: 'Step 3 Diffusion Preprocessing (mrtrix preproc)',
            duration: '5:03',
            label: 'Pipeline',
            thumbnail: 'https://img.youtube.com/vi/72eChbz9ZfM/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=72eChbz9ZfM',
            description: 'Step-by-step pipeline demonstration using MRtrix3 tools.',
        },
        {
            title: 'Four ways to upload data to brainlife.io',
            duration: '6:36',
            label: 'Data Upload',
            thumbnail: 'https://img.youtube.com/vi/usqJT9c5EW0/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=usqJT9c5EW0',
            description: 'Learn how to import datasets using CLI, GUI, ezBIDS, or DataLad.',
        },
        {
            title: 'What is brainlife.io?',
            duration: '2:42',
            label: 'Platform',
            thumbnail: 'https://img.youtube.com/vi/JXKPRWwcPx8/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=JXKPRWwcPx8',
            description: 'An overview of the cloud platform for reproducible neuroscience.',
        },
        {
            title: 'Running Apps on brainlife',
            duration: '3:44',
            label: 'Tutorial',
            thumbnail: 'https://img.youtube.com/vi/43yhZ1k6icQ/hqdefault.jpg',
            href: 'https://www.youtube.com/watch?v=43yhZ1k6icQ',
            description: 'Tutorial on selecting, configuring, and execution of computing pipelines.',
        },
    ];

    const steps = [
        {
            num: 1,
            title: 'Get started',
            description: 'Create your account and first project',
            icon: UserPlus,
        },
        {
            num: 2,
            title: 'Upload data',
            description: 'Bring your data to Brainlife',
            icon: Upload,
        },
        {
            num: 3,
            title: 'Run pipelines',
            description: 'Process and analyze with Apps',
            icon: Cpu,
        },
        {
            num: 4,
            title: 'Visualize results',
            description: 'Explore with interactive tools',
            icon: Eye,
        },
        {
            num: 5,
            title: 'Publish & share',
            description: 'Share, cite, and make an impact',
            icon: Share2,
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
            {/* Glow */}
            <Box
                position="absolute"
                left="-10%"
                bottom="-10%"
                width="500px"
                height="500px"
                background="radial-gradient(circle, rgba(56, 189, 248, 0.02) 0%, transparent 60%)"
                filter="blur(80px)"
                pointerEvents="none"
                zIndex={0}
            />

            <Box maxW="1400px" mx="auto" px="24px" position="relative" zIndex={2}>
                <Grid
                    templateColumns={{ base: '1fr', lg: '300px 1fr' }}
                    gap={{ base: '32px', lg: '48px' }}
                    alignItems="center"
                >
                    {/* Left Column: Heading */}
                    <Flex direction="column" justify="center">
                        <Text
                            fontSize="11px"
                            fontWeight="800"
                            letterSpacing="0.15em"
                            color="rgba(255, 255, 255, 0.4)"
                            textTransform="uppercase"
                            mb="12px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Education & Community
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
                            Learn with Brainlife
                        </Text>
                        <Text
                            fontSize="14px"
                            color="rgba(248, 250, 252, 0.65)"
                            lineHeight="1.5"
                            mb="24px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Tutorials, videos, and workshops to accelerate your research.
                        </Text>

                        <Link
                            href="https://brainlife.io/docs/"
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
                            Explore resources
                            <ArrowRight size={14} />
                        </Link>
                    </Flex>

                    {/* Right Column: Horizontal Scrolling List containing Learning Path + Featured Videos */}
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
                        <MotionFlex
                            variants={learnParentVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            gap="32px"
                            alignItems="stretch"
                        >
                            {/* Learning Path Container */}
                            <Flex direction="column" minW={{ base: '280px', sm: '600px', md: '720px' }} flexShrink={0}>
                                <Text
                                    fontSize="11px"
                                    fontWeight="800"
                                    letterSpacing="0.08em"
                                    color="rgba(255, 255, 255, 0.4)"
                                    mb="16px"
                                    textTransform="uppercase"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    Your Learning Path
                                </Text>
                                <Box
                                    bg="rgba(15, 23, 42, 0.3)"
                                    border="1px solid rgba(255, 255, 255, 0.05)"
                                    backdropFilter="blur(16px)"
                                    borderRadius="12px"
                                    p="24px"
                                    flex={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Flex align="center" justify="space-between" w="100%">
                                        {steps.map((step, idx) => {
                                            const IconComponent = step.icon;
                                            return (
                                                <Flex key={step.num} align="center" flex={1}>
                                                    {/* Step Item */}
                                                    <Flex direction="column" align="center" textAlign="center" flex={1}>
                                                        {/* Circle Icon Container */}
                                                        <Box
                                                            position="relative"
                                                            w="54px"
                                                            h="54px"
                                                            borderRadius="full"
                                                            border="2px dashed rgba(92, 197, 216, 0.4)"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            mb="12px"
                                                            color="#5cc5d8"
                                                            bg="rgba(92, 197, 216, 0.08)"
                                                            _hover={{
                                                                borderStyle: 'solid',
                                                                borderColor: '#5cc5d8',
                                                                boxShadow: '0 0 15px rgba(92, 197, 216, 0.3)',
                                                                transform: 'scale(1.05)',
                                                            }}
                                                            transition="all 0.3s ease"
                                                        >
                                                            <IconComponent size={20} />
                                                            {/* Step Number Badge */}
                                                            <Flex
                                                                position="absolute"
                                                                bottom="-6px"
                                                                bg="#0f172a"
                                                                border="1px solid rgba(255, 255, 255, 0.2)"
                                                                borderRadius="full"
                                                                w="16px"
                                                                h="16px"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Text fontSize="9px" fontWeight="800" color="white">
                                                                    {step.num}
                                                                </Text>
                                                            </Flex>
                                                        </Box>

                                                        {/* Step Titles */}
                                                        <Text
                                                            fontSize="13px"
                                                            fontWeight="700"
                                                            color="white"
                                                            mb="4px"
                                                            fontFamily="'Work Sans', sans-serif"
                                                        >
                                                            {step.title}
                                                        </Text>
                                                        <Text
                                                            fontSize="10px"
                                                            color="rgba(248, 250, 252, 0.5)"
                                                            lineHeight="1.3"
                                                            fontFamily="'Work Sans', sans-serif"
                                                        >
                                                            {step.description}
                                                        </Text>
                                                    </Flex>

                                                    {/* Arrow Connector (if not the last step) */}
                                                    {idx < steps.length - 1 && (
                                                        <Box mx="8px" color="rgba(255, 255, 255, 0.15)">
                                                            <ArrowRight size={14} />
                                                        </Box>
                                                    )}
                                                </Flex>
                                            );
                                        })}
                                    </Flex>
                                </Box>
                            </Flex>

                            {/* Featured Tutorials Section */}
                            <Flex direction="column" flexShrink={0}>
                                <Text
                                    fontSize="11px"
                                    fontWeight="800"
                                    letterSpacing="0.08em"
                                    color="rgba(255, 255, 255, 0.4)"
                                    mb="16px"
                                    textTransform="uppercase"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    Featured Tutorials
                                </Text>
                                <Flex gap="20px" alignItems="stretch" flex={1}>
                                    {videos.map((video, idx) => (
                                        <VideoCard key={idx} {...video} />
                                    ))}
                                </Flex>
                                {/* Link at the bottom of Featured Tutorials column */}
                                <Link
                                    href="https://www.youtube.com/@brainlifeio/videos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="inline-flex"
                                    alignItems="center"
                                    gap="6px"
                                    fontSize="13px"
                                    fontWeight="700"
                                    color="#5cc5d8"
                                    _hover={{ color: '#7fe0f0', textDecoration: 'none' }}
                                    mt="12px"
                                    w="fit-content"
                                >
                                    View all tutorials
                                    <ArrowRight size={14} />
                                </Link>
                            </Flex>
                        </MotionFlex>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}
