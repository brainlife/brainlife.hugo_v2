'use client';

import React from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Stack,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    Cpu,
    Database,
    Microscope,
    CheckCircle2,
    Terminal,
    Code2,
    Layers,
    ShieldCheck,
    FileSpreadsheet,
    Zap,
    Network,
} from 'lucide-react';

const MotionBox = motion.create(Box);

interface PersonaCard {
    id: string;
    role: string;
    targetTitle: string;
    tagline: string;
    accentColor: string;
    icon: any;
    mission: string;
    workflows: string[];
    toolsAndStandards: string[];
    deliverable: string;
}

const PERSONA_MATRIX: PersonaCard[] = [
    {
        id: 'students',
        role: 'Students & Trainees',
        targetTitle: 'Learning & Skill Building',
        tagline: 'Skip the setup headaches. Learn neuroimaging intuitively.',
        accentColor: '#5cc5d8',
        icon: GraduationCap,
        mission:
            'Start analyzing brain scans on day one without getting trapped in Linux environment variables, broken dependencies, or driver conflicts.',
        workflows: [
            'Explore curated open training datasets (HCP, ABCD, OpenNeuro)',
            'Learn diffusion MRI, fMRI, and EEG pipeline principles visually',
            'Interactive 3D cortical surface and tractography inspection',
            'Step-by-step pipeline templates guided by domain experts',
        ],
        toolsAndStandards: ['BIDS Standards', 'ezBIDS', '3D WebGL Viewers'],
        deliverable: 'First reproducible conference poster in weeks, not months',
    },
    {
        id: 'engineers',
        role: 'Computer Scientists & Developers',
        targetTitle: 'HPC & Container Scale',
        tagline: 'Turn your algorithms into global cloud apps with zero ops.',
        accentColor: '#38bdf8',
        icon: Cpu,
        mission:
            'Package your C++, Python, or Rust neuroimaging algorithms into Docker or Singularity containers and let Brainlife handle global HPC distribution.',
        workflows: [
            'Automated GitHub-to-App continuous integration and versioning',
            'Heterogeneous execution across Slurm supercomputing clusters',
            'Rigid BIDS datatype input and output validation schema',
            'Benchmark algorithmic speed and precision on thousands of brains',
        ],
        toolsAndStandards: ['Docker / Singularity', 'Slurm HPC', 'REST & CLI APIs'],
        deliverable: 'Published, citable cloud app used by hundreds of labs',
    },
    {
        id: 'data-scientists',
        role: 'Data Scientists & Statisticians',
        targetTitle: 'Analytics & Multi-Modal Stats',
        tagline: 'Direct Python, R & Jupyter integration on terabyte datasets.',
        accentColor: '#818cf8',
        icon: Database,
        mission:
            'Query multi-subject white-matter tract metrics and functional connectivity matrices directly from cloud storage without massive local downloads.',
        workflows: [
            'Instant cloud JupyterLab kernels with pre-configured environments',
            'Seamless Python ecosystem integration: NiBabel, Nilearn, MNE, DIPY',
            'Effortless cohort-level tabular aggregations and CSV/Parquet exports',
            'Automated quality control flags and outlier detection metrics',
        ],
        toolsAndStandards: ['JupyterLab', 'Python / R / Julia', 'Parquet / TSV'],
        deliverable: 'Statistical models & machine learning classifiers at scale',
    },
    {
        id: 'pis',
        role: 'Principal Investigators & Labs',
        targetTitle: 'Provenance & Grant Compliance',
        tagline: '100% reproducible science with automated data lineage.',
        accentColor: '#34d399',
        icon: Microscope,
        mission:
            'Maintain institutional memory, manage multi-site consortium access, and satisfy stringent NIH & European Open Science data sharing mandates.',
        workflows: [
            'Immutable provenance graphs tracking every raw file and parameter',
            'Mint persistent DOIs for manuscript data and processing pipelines',
            'Granular role-based permissions for multi-site lab collaborations',
            'Zero lab server maintenance and compute infrastructure overhead',
        ],
        toolsAndStandards: ['Permanent DOIs', 'Provenance DAG', 'FAIR Principles'],
        deliverable: 'High-impact publications with push-button replication',
    },
];

export default function PersonaMatrixSection() {
    return (
        <Box mb={{ base: '64px', md: '100px' }}>
            {/* Section Header */}
            <Box position="relative" textAlign="center" maxW="840px" mx="auto" mb={{ base: '32px', md: '48px' }}>
                {/* Subtle Background Watermark Text */}
                <Text
                    position="absolute"
                    top={{ base: '-20px', md: '-32px', lg: '-42px' }}
                    left="50%"
                    transform="translateX(-50%)"
                    fontSize={{ base: '55px', sm: '85px', md: '115px', lg: '135px' }}
                    fontWeight={900}
                    color="rgba(255, 255, 255, 0.04)"
                    letterSpacing="-0.04em"
                    lineHeight="0.85"
                    userSelect="none"
                    pointerEvents="none"
                    zIndex={0}
                    fontFamily="'Work Sans', sans-serif"
                    whiteSpace="nowrap"
                >
                    Workflows
                </Text>

                <Box position="relative" zIndex={1}>
                    <Text
                        fontSize="12px"
                        fontWeight={700}
                        color="#5cc5d8"
                        letterSpacing="0.12em"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                        mb="8px"
                    >
                        Built For Every Role
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '32px', md: '40px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.02em"
                        mb="14px"
                    >
                        Empowering the Full Spectrum of Neuroscience
                    </Heading>
                    <Text fontSize="15px" color="rgba(248, 250, 252, 0.8)" lineHeight="1.65">
                        Whether you are opening your first MRI scan, benchmarking a new deep learning algorithm,
                        or directing a 50-person multi-site consortium, Brainlife is calibrated to your workflow.
                    </Text>
                </Box>
            </Box>

            {/* 4-Column Persona Matrix */}
            <Grid
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    xl: 'repeat(4, 1fr)',
                }}
                gap={{ base: '18px', md: '20px' }}
            >
                {PERSONA_MATRIX.map((persona, index) => {
                    const IconComponent = persona.icon;
                    return (
                        <MotionBox
                            key={persona.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -4 }}
                            borderRadius="22px"
                            bg="linear-gradient(150deg, rgba(17, 24, 39, 0.94) 0%, rgba(9, 13, 23, 0.98) 100%)"
                            border="1px solid rgba(255, 255, 255, 0.08)"
                            boxShadow="0 20px 45px rgba(0, 0, 0, 0.5)"
                            backdropFilter="blur(20px)"
                            p={{ base: '22px 18px', md: '26px 22px' }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                            position="relative"
                            overflow="hidden"
                            _hover={{
                                borderColor: persona.accentColor,
                                boxShadow: `0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px ${persona.accentColor}25`,
                            }}
                        >
                            <Box>
                                {/* Role Header Pill */}
                                <Flex alignItems="center" justify="space-between" mb="16px">
                                    <Box
                                        w="42px"
                                        h="42px"
                                        borderRadius="12px"
                                        bg={`${persona.accentColor}18`}
                                        color={persona.accentColor}
                                        border="1px solid"
                                        borderColor={`${persona.accentColor}35`}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <IconComponent size={20} />
                                    </Box>
                                    <Badge
                                        bg="rgba(255, 255, 255, 0.05)"
                                        color="#cbd5e1"
                                        border="1px solid rgba(255, 255, 255, 0.08)"
                                        fontSize="9.5px"
                                        fontWeight={700}
                                        letterSpacing="0.05em"
                                        px="8px"
                                        py="2px"
                                        borderRadius="4px"
                                        textTransform="uppercase"
                                    >
                                        {persona.targetTitle}
                                    </Badge>
                                </Flex>

                                <Heading
                                    as="h3"
                                    fontSize="18px"
                                    fontWeight={800}
                                    color="white"
                                    fontFamily="'Work Sans', sans-serif"
                                    mb="4px"
                                >
                                    {persona.role}
                                </Heading>

                                <Text
                                    fontSize="12.5px"
                                    fontWeight={600}
                                    color={persona.accentColor}
                                    mb="12px"
                                    lineHeight="1.35"
                                >
                                    {persona.tagline}
                                </Text>

                                <Text
                                    fontSize="12.5px"
                                    color="rgba(248, 250, 252, 0.8)"
                                    lineHeight="1.55"
                                    mb="18px"
                                >
                                    {persona.mission}
                                </Text>

                                {/* Workflows */}
                                <Text
                                    fontSize="10.5px"
                                    fontWeight={800}
                                    color="rgba(255, 255, 255, 0.5)"
                                    letterSpacing="0.08em"
                                    textTransform="uppercase"
                                    mb="8px"
                                >
                                    Core Workflows
                                </Text>
                                <Stack spacing="7px" mb="18px">
                                    {persona.workflows.map((wf, wIdx) => (
                                        <Flex key={wIdx} alignItems="flex-start" gap="7px">
                                            <CheckCircle2
                                                size={13}
                                                color={persona.accentColor}
                                                style={{ marginTop: '2px', flexShrink: 0 }}
                                            />
                                            <Text fontSize="12px" color="rgba(255, 255, 255, 0.75)" lineHeight="1.35">
                                                {wf}
                                            </Text>
                                        </Flex>
                                    ))}
                                </Stack>
                            </Box>

                            {/* Bottom Deliverable Pill */}
                            <Box pt="14px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                                <Flex wrap="wrap" gap="4px" mb="10px">
                                    {persona.toolsAndStandards.map((tool) => (
                                        <Badge
                                            key={tool}
                                            bg="rgba(255, 255, 255, 0.04)"
                                            color="#94a3b8"
                                            fontSize="9px"
                                            px="5px"
                                            py="1px"
                                            borderRadius="3px"
                                        >
                                            {tool}
                                        </Badge>
                                    ))}
                                </Flex>

                                <Box
                                    p="8px 10px"
                                    borderRadius="8px"
                                    bg="rgba(0, 0, 0, 0.4)"
                                    border="1px solid rgba(255, 255, 255, 0.06)"
                                >
                                    <Text fontSize="9.5px" fontWeight={800} color={persona.accentColor} textTransform="uppercase" letterSpacing="0.05em">
                                        Primary Outcome
                                    </Text>
                                    <Text fontSize="11px" color="white" fontWeight={600} mt="1px">
                                        {persona.deliverable}
                                    </Text>
                                </Box>
                            </Box>
                        </MotionBox>
                    );
                })}
            </Grid>
        </Box>
    );
}
