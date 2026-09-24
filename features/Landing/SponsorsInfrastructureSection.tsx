'use client';

import React from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    Text,
    Image,
    Badge,
    Link,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import {
    Cpu,
    Cloud,
    Share2,
    CheckCircle2,
    Eye,
    Award,
    ArrowUpRight,
    Sparkles,
    MoveHorizontal,
} from 'lucide-react';

interface InfrastructureCard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    tag: string;
    badges: string[];
    linkText: string;
    linkUrl: string;
}

const INFRASTRUCTURE_CARDS: InfrastructureCard[] = [
    {
        id: 'supercomputing',
        category: 'HIGH PERFORMANCE COMPUTING',
        title: 'Supercomputing Resources',
        description:
            'Brainlife provides millions of free computing hours supported by NSF and donated cycles to researchers and students on HPC Slurm clusters.',
        image: '/img/features/stampede2.jpg',
        icon: <Cpu size={16} color="#5cc5d8" />,
        tag: 'NSF & TACC Supercomputing',
        badges: ['Millions of Free CPU/GPU Hours', 'Slurm HPC', 'Zero Cost'],
        linkText: 'EXPLORE COMPUTE',
        linkUrl: 'https://brainlife.io/apps',
    },
    {
        id: 'storage',
        category: 'DATA STORAGE & HOSTING',
        title: 'Cloud Storage',
        description:
            'Brainlife provides secure cloud storage of raw neuroimaging data as well as data derivatives supported by the AWS Open Data Program.',
        image: '/img/features/2x_aws.png',
        icon: <Cloud size={16} color="#5cc5d8" />,
        tag: 'AWS Open Data Program',
        badges: ['Raw & Derivatives', 'AWS S3 Open Data', 'Unlimited Storage'],
        linkText: 'VIEW STORAGE SPECS',
        linkUrl: 'https://brainlife.io/datasets',
    },
    {
        id: 'collaboration',
        category: 'GLOBAL COMMUNITY',
        title: 'Global Collaboration',
        description:
            'Collaborate and analyze your data with researchers from around the world. Over 2,000 users across 30+ countries have benefited from Brainlife.',
        image: '/img/features/collaborate.png',
        icon: <Share2 size={16} color="#5cc5d8" />,
        tag: '2,000+ Researchers Worldwide',
        badges: ['International Teams', 'Cross-Lab Sharing', 'FAIR Governance'],
        linkText: 'JOIN NETWORK',
        linkUrl: 'https://brainlife.io/',
    },
    {
        id: 'reproducibility',
        category: 'COMPUTATIONAL PROVENANCE',
        title: 'Reproducible Analysis',
        description:
            'Automated capture of data processing steps. Capture full data provenance and App versions when generating data derivatives via Singularity and Docker.',
        image: '/img/features/provenance.png',
        icon: <CheckCircle2 size={16} color="#5cc5d8" />,
        tag: 'Singularity & Docker Pipelines',
        badges: ['Full Provenance Graphs', 'Containerized Slurm', 'Permanent DOIs'],
        linkText: 'LEARN PROVENANCE',
        linkUrl: 'https://brainlife.io/docs/user/provenance/',
    },
    {
        id: 'visualization',
        category: 'INTERACTIVE VISUALIZATION',
        title: 'Browser Visualization',
        description:
            'A rich variety of 2D/3D visualization tools can be launched directly from your web browser for tractography, cortical surfaces, and NIfTI volumes.',
        image: '/img/features/visualization.png',
        icon: <Eye size={16} color="#5cc5d8" />,
        tag: 'Zero-Install Web Renderers',
        badges: ['3D Tractography', 'FreeSurfer Surfaces', 'In-Browser QA'],
        linkText: 'LAUNCH VISUALIZERS',
        linkUrl: 'https://brainlife.io/apps',
    },
    {
        id: 'public-funding',
        category: 'GRANT-BACKED SCIENCE',
        title: 'Publicly Funded Mission',
        description:
            'Brainlife is publicly funded by the NSF, DoD, Kavli Foundation, and NIH awards to serve the global scientific community with 100% free access.',
        image: '/img/features/dataanalyse.png',
        icon: <Award size={16} color="#5cc5d8" />,
        tag: 'NSF • NIH • DoD • Kavli Awards',
        badges: ['100% Free for Science', 'Grant Supported', 'Open Science Mission'],
        linkText: 'READ MISSION',
        linkUrl: 'https://brainlife.io/about',
    },
];

const SPONSORS_LOGOS = [
    { name: 'National Science Foundation', src: '/img/clients/ref.nsf.png' },
    { name: 'National Institutes of Health', src: '/img/clients/ref.nih.png' },
    { name: 'Texas Advanced Computing Center', src: '/img/clients/ref.tacc.png' },
    { name: 'Jetstream Cloud', src: '/img/clients/ref.jetstream.png' },
    { name: 'Indiana University', src: '/img/clients/ref.iu.png' },
    { name: 'University of Texas at Austin', src: '/img/clients/ref.ut.png' },
    { name: 'Open Science Grid', src: '/img/clients/ref.osg.png' },
    { name: 'OSiRIS', src: '/img/clients/ref.osiris.png' },
    { name: 'DataCite', src: '/img/clients/ref.datacite.png' },
    { name: 'AWS Open Data Program', src: '/img/clients/ref.aws.png' },
];

const marqueeLeft = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const marqueeRight = keyframes`
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

function CardComponent({ card }: { card: InfrastructureCard }) {
    return (
        <Box
            w={{ base: '320px', sm: '380px', md: '440px', lg: '480px' }}
            flexShrink={0}
            bg="rgba(15, 23, 42, 0.78)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            borderRadius="24px"
            overflow="hidden"
            boxShadow="0 20px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)"
            transition="all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            role="group"
            _hover={{
                borderColor: 'rgba(92, 197, 216, 0.6)',
                transform: 'translateY(-6px) scale(1.01)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(92, 197, 216, 0.25)',
            }}
        >
            {/* PREVIEW IMAGE WITH TAG */}
            <Box position="relative" h={{ base: '160px', sm: '190px' }} w="100%" overflow="hidden" bg="#080c14">
                <Image
                    src={card.image}
                    alt={card.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    transition="transform 0.5s ease"
                    _groupHover={{ scale: 1.05 }}
                />
                <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15, 23, 42, 0.95) 100%)"
                />
                <Badge
                    position="absolute"
                    top="14px"
                    left="14px"
                    bg="rgba(10, 14, 24, 0.85)"
                    color="#5cc5d8"
                    border="1px solid rgba(92, 197, 216, 0.4)"
                    backdropFilter="blur(12px)"
                    px="10px"
                    py="4px"
                    borderRadius="full"
                    fontSize="10.5px"
                    fontWeight={800}
                    display="flex"
                    alignItems="center"
                    gap="5px"
                >
                    {card.icon}
                    {card.category}
                </Badge>
            </Box>

            {/* BODY CONTENT */}
            <Box p={{ base: '20px', md: '26px' }} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                <Box mb="16px">
                    <Heading
                        as="h3"
                        fontSize={{ base: '18px', md: '22px' }}
                        fontWeight={800}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.02em"
                        mb="8px"
                        _groupHover={{ color: '#5cc5d8' }}
                        transition="color 0.2s ease"
                    >
                        {card.title}
                    </Heading>
                    <Text
                        fontSize={{ base: '13px', md: '14px' }}
                        color="rgba(255, 255, 255, 0.72)"
                        lineHeight="1.6"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        {card.description}
                    </Text>
                </Box>

                {/* BADGES & CTA */}
                <Box pt="12px" borderTop="1px solid rgba(255, 255, 255, 0.08)">
                    <Flex gap="6px" wrap="wrap" mb="14px">
                        {card.badges.map((b) => (
                            <Badge
                                key={b}
                                bg="rgba(255, 255, 255, 0.06)"
                                color="rgba(255, 255, 255, 0.85)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                px="8px"
                                py="3px"
                                borderRadius="6px"
                                fontSize="10px"
                                fontWeight={600}
                            >
                                {b}
                            </Badge>
                        ))}
                    </Flex>

                    <Link
                        href={card.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        display="inline-flex"
                        alignItems="center"
                        gap="6px"
                        fontSize="12px"
                        fontWeight={800}
                        color="#5cc5d8"
                        letterSpacing="0.06em"
                        _hover={{ textDecoration: 'none', color: '#7ee0ef' }}
                    >
                        <span>{card.linkText}</span>
                        <ArrowUpRight size={14} />
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default function SponsorsInfrastructureSection() {
    // Split cards into two staggered rows
    const row1 = [INFRASTRUCTURE_CARDS[0], INFRASTRUCTURE_CARDS[1], INFRASTRUCTURE_CARDS[2]];
    const row2 = [INFRASTRUCTURE_CARDS[3], INFRASTRUCTURE_CARDS[4], INFRASTRUCTURE_CARDS[5]];

    // Duplicate sets 4 times so translation across 50% seamlessly wraps on any screen resolution
    const marqueeRow1 = [...row1, ...row1, ...row1, ...row1];
    const marqueeRow2 = [...row2, ...row2, ...row2, ...row2];

    return (
        <Box
            as="section"
            py={{ base: '70px', md: '110px', lg: '130px' }}
            position="relative"
            zIndex={20}
            w="100%"
            overflow="hidden"
            bg="linear-gradient(180deg, rgba(8, 12, 22, 0.4) 0%, rgba(13, 19, 34, 0.95) 50%, rgba(8, 12, 22, 0.4) 100%)"
            borderTop="1px solid rgba(255, 255, 255, 0.06)"
        >
            {/* Ambient Background Glows */}
            <Box
                position="absolute"
                top="15%"
                left="25%"
                w="700px"
                h="700px"
                bg="radial-gradient(circle, rgba(92, 197, 216, 0.08) 0%, rgba(36, 235, 163, 0.04) 40%, transparent 70%)"
                filter="blur(100px)"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                bottom="10%"
                right="15%"
                w="600px"
                h="600px"
                bg="radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 75%)"
                filter="blur(110px)"
                pointerEvents="none"
            />

            <Container maxW="clamp(100%, 92vw, 1600px)" mx="auto" px={{ base: '16px', md: '5vw' }}>
                {/* SECTION HEADER & MANIFESTO */}
                <Box mb={{ base: '40px', md: '56px' }} maxW="960px" position="relative">
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
                        Infrastructure
                    </Text>

                    <Heading
                        as="h2"
                        fontSize={{ base: '30px', sm: '42px', md: '54px', lg: '64px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.035em"
                        lineHeight={1.08}
                        mt={{ base: '-16px', sm: '-24px', md: '-32px' }}
                        mb={{ base: '16px', md: '20px' }}
                    >
                        Publicly Funded.{' '}
                        <Text as="span" bgGradient="linear(to-r, #5cc5d8, #7ee0ef, #5cc5d8)" bgClip="text">
                            Zero Cost to Science.
                        </Text>
                    </Heading>

                    <Text
                        fontSize={{ base: '15px', sm: '17px', md: '20px' }}
                        color="rgba(255, 255, 255, 0.78)"
                        lineHeight="1.6"
                        fontFamily="'Work Sans', sans-serif"
                        mb="20px"
                    >
                        Brainlife is publicly funded by the <strong>NSF, DoD, Kavli Foundation, and NIH awards</strong>.
                        The public-funding model allows us to collaborate with other publicly funded projects and support
                        unique supercomputing resources at no cost. Brainlife’s mission is to serve the neuroscience
                        community, support scientific reproducibility, and accelerate discovery.
                    </Text>

                    {/* INTERACTIVE HINT BADGE */}
                    <Flex align="center" gap="8px" color="rgba(92, 197, 216, 0.9)" fontSize="12.5px" fontWeight={600}>
                        <MoveHorizontal size={16} />
                        <Text>Continuously operating compute &amp; data pipelines • Hover to inspect</Text>
                    </Flex>
                </Box>
            </Container>

            {/* CONTINUOUS MARQUEE STAGE WITH EDGE GRADIENT FADES */}
            <Box
                position="relative"
                w="100%"
                overflow="hidden"
                py="10px"
            >
                {/* Left & Right Edge Vignette Masking for Clean Ingress/Egress */}
                <Box
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={0}
                    w={{ base: '40px', md: '100px', lg: '140px' }}
                    bg="linear-gradient(to right, rgba(8, 12, 22, 0.95) 0%, transparent 100%)"
                    zIndex={10}
                    pointerEvents="none"
                />
                <Box
                    position="absolute"
                    top={0}
                    bottom={0}
                    right={0}
                    w={{ base: '40px', md: '100px', lg: '140px' }}
                    bg="linear-gradient(to left, rgba(8, 12, 22, 0.95) 0%, transparent 100%)"
                    zIndex={10}
                    pointerEvents="none"
                />

                <Flex direction="column" gap="24px" w="100%" overflow="hidden">
                    {/* TOP ROW: CONTINUOUSLY MOVES FROM RIGHT TO LEFT */}
                    <Box
                        display="flex"
                        w="max-content"
                        gap="24px"
                        animation={`${marqueeLeft} 42s linear infinite`}
                        _hover={{ animationPlayState: 'paused' }}
                        willChange="transform"
                        py="4px"
                    >
                        {marqueeRow1.map((card, idx) => (
                            <CardComponent key={`top-${card.id}-${idx}`} card={card} />
                        ))}
                    </Box>

                    {/* BOTTOM ROW: CONTINUOUSLY MOVES FROM LEFT TO RIGHT */}
                    <Box
                        display="flex"
                        w="max-content"
                        gap="24px"
                        animation={`${marqueeRight} 42s linear infinite`}
                        _hover={{ animationPlayState: 'paused' }}
                        willChange="transform"
                        py="4px"
                    >
                        {marqueeRow2.map((card, idx) => (
                            <CardComponent key={`bot-${card.id}-${idx}`} card={card} />
                        ))}
                    </Box>
                </Flex>
            </Box>

            {/* INSTITUTIONAL SPONSORS & PARTNERS STRIP */}
            <Container maxW="clamp(100%, 92vw, 1600px)" mx="auto" px={{ base: '16px', md: '5vw' }} mt={{ base: '48px', md: '64px' }}>
                <Box
                    p={{ base: '20px', md: '28px' }}
                    bg="rgba(10, 15, 28, 0.6)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    borderRadius="20px"
                    backdropFilter="blur(16px)"
                >
                    <Text
                        fontSize="11px"
                        fontWeight="700"
                        letterSpacing="0.12em"
                        color="rgba(255, 255, 255, 0.45)"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                        textAlign="center"
                        mb="20px"
                    >
                        Supported by Public Funding Agencies &amp; High-Performance Computing Consortiums
                    </Text>

                    <Flex
                        wrap="wrap"
                        justify="center"
                        align="center"
                        gap={{ base: '20px', sm: '28px', md: '36px', lg: '44px' }}
                    >
                        {SPONSORS_LOGOS.map((sp) => (
                            <Box
                                key={sp.name}
                                title={sp.name}
                                opacity={0.55}
                                _hover={{ opacity: 1, transform: 'scale(1.06)' }}
                                transition="all 0.25s ease"
                                maxH="32px"
                            >
                                <Image
                                    src={sp.src}
                                    alt={sp.name}
                                    maxH={{ base: '24px', md: '30px' }}
                                    maxW={{ base: '90px', md: '120px' }}
                                    objectFit="contain"
                                    filter="brightness(0) invert(1)"
                                />
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}

