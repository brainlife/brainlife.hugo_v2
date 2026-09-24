'use client';

import { Box, Flex, Grid, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FileJson, GitCompare, Sparkles, Eye, FolderSearch, LayoutGrid, ArrowRight, LucideIcon } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const MotionLink = motion.create(Link);
const MotionGrid = motion.create(Grid);

const toolsParentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const toolCardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 100, damping: 18 },
    },
};

interface ToolProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href?: string;
    isPrimary?: boolean;
}

const ToolCard = ({ title, description, icon: IconComponent, href = '#', isPrimary = false }: ToolProps) => {
    const isInternal = href.startsWith('/');
    const shouldOpenNewTab = href !== '#';
    return (
        <MotionLink
            variants={toolCardVariants}
            {...(isInternal ? { as: NextLink, href } : { href })}
            target={shouldOpenNewTab ? '_blank' : undefined}
            rel={shouldOpenNewTab ? 'noopener noreferrer' : undefined}
            bg={isPrimary ? 'rgba(92, 197, 216, 0.08)' : 'rgba(15, 23, 42, 0.3)'}
            border="1px solid"
            borderColor={isPrimary ? 'rgba(92, 197, 216, 0.3)' : 'rgba(255, 255, 255, 0.05)'}
            backdropFilter="blur(16px)"
            borderRadius="12px"
            p="20px"
            sx={{
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            display="flex"
            flexDirection="column"
            cursor="pointer"
            _hover={{
                textDecoration: 'none',
                bg: isPrimary ? 'rgba(92, 197, 216, 0.14)' : 'rgba(15, 23, 42, 0.5)',
                borderColor: isPrimary ? '#5cc5d8' : 'rgba(255, 255, 255, 0.18)',
                transform: 'translateY(-3px)',
                boxShadow: isPrimary 
                    ? '0 12px 30px rgba(92, 197, 216, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    : '0 12px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
        >
            {/* Icon */}
            <Flex
                alignItems="center"
                justifyContent="center"
                w="36px"
                h="36px"
                borderRadius="8px"
                bg={isPrimary ? 'rgba(92, 197, 216, 0.12)' : 'rgba(255, 255, 255, 0.04)'}
                mb="12px"
                color={isPrimary ? '#5cc5d8' : 'white'}
            >
                <IconComponent size={20} />
            </Flex>

            {/* Title */}
            <Text fontSize="15px" fontWeight="700" color="white" mb="4px" fontFamily="'Work Sans', sans-serif">
                {title}
            </Text>

            {/* Description */}
            <Text fontSize="12px" color="rgba(248, 250, 252, 0.6)" lineHeight="1.4" fontFamily="'Work Sans', sans-serif">
                {description}
            </Text>
        </MotionLink>
    );
};

export default function ToolsSection() {
    const tools = [
        {
            title: 'EzBIDS',
            description: 'Convert raw neuroimaging scanner files easily to BIDS format.',
            icon: FileJson,
            href: 'https://brainlife.io/ezbids/'
        },
        {
            title: 'Dicompare',
            description: 'Compare algorithm runs and parameter outputs in detail.',
            icon: GitCompare,
            href: 'https://dicompare.neurodesk.org/'
        },
        {
            title: 'SKAI',
            description: 'Leverage artificial intelligence workflows for brain modeling.',
            icon: Sparkles,
            href: '/assistant'
        },
        {
            title: 'Neuroglancer',
            description: 'Interactive high-dimensional visualization and volume slice viewing.',
            icon: Eye,
            href: '#'
        },
        {
            title: 'BIDS Viewer',
            description: 'Inspect BIDS datasets and validate schemas instantly.',
            icon: FolderSearch,
            href: '#'
        },
        {
            title: 'All tools',
            description: 'Browse the full catalog of utilities built by Brainlife.',
            icon: LayoutGrid,
            isPrimary: true,
            href: '/apps'
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
                bottom="-10%"
                width="600px"
                height="600px"
                background="radial-gradient(circle, rgba(58, 111, 124, 0.04) 0%, transparent 60%)"
                filter="blur(90px)"
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
                            Utility Suite
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
                            Tools & products
                        </Text>
                        <Text
                            fontSize="14px"
                            color="rgba(248, 250, 252, 0.65)"
                            lineHeight="1.5"
                            mb="24px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Powerful, open-source tools built for the neuroscience community.
                        </Text>

                        <Link
                            as={NextLink}
                            href="/apps"
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
                            Explore all tools
                            <ArrowRight size={14} />
                        </Link>
                    </Flex>

                    {/* Right Column: Grid Matrix */}
                    <MotionGrid
                        variants={toolsParentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        templateColumns={{
                            base: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        }}
                        gap="16px"
                    >
                        {tools.map((tool, idx) => (
                            <ToolCard key={idx} {...tool} />
                        ))}
                    </MotionGrid>
                </Grid>
            </Box>
        </Box>
    );
}
