'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Button,
    Stack,
    HStack,
    Icon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    UploadCloud,
    Cpu,
    LineChart,
    Award,
    CheckCircle2,
    ArrowRight,
    Terminal,
    FileCode2,
    Database,
    Share2,
    Layers,
    Play,
    Sparkles,
    GitBranch,
    ShieldCheck,
} from 'lucide-react';

const MotionBox = motion.create(Box);

interface JourneyStage {
    id: string;
    stepNumber: string;
    title: string;
    tagline: string;
    role: string;
    icon: any;
    accentColor: string;
    summary: string;
    bottleneck: string;
    solution: string;
    features: string[];
    previewType: 'bids' | 'hpc' | 'jupyter' | 'provenance';
}

const JOURNEY_STAGES: JourneyStage[] = [
    {
        id: 'ingestion',
        stepNumber: '01',
        title: 'Ingest & Standardize',
        tagline: 'From raw DICOM scanner files to validated BIDS in minutes',
        role: 'Students & Imaging Technologists',
        icon: UploadCloud,
        accentColor: '#5cc5d8',
        summary:
            'Neuroimaging begins with messy data from GE, Siemens, or Philips MRI scanners. Brainlife eliminates manual conversion scripts with automated ezBIDS conversion.',
        bottleneck:
            'Days lost deciphering scanner protocol naming conventions and manually structuring subject folders.',
        solution:
            'Automated DICOM-to-BIDS conversion with strict schema validation, visual defacing inspection, and instant cloud cataloging.',
        features: [
            'Zero-configuration ezBIDS automated mapping',
            'Full support for MRI (T1w, T2w, DWI, fMRI) and M/EEG',
            'Instant BIDS Schema validation with error diagnostics',
            'Automated anatomical defacing for privacy compliance',
        ],
        previewType: 'bids',
    },
    {
        id: 'computation',
        stepNumber: '02',
        title: 'Cloud Supercomputing',
        tagline: 'Execute 400+ containerized pipelines across Slurm HPCs',
        role: 'Algorithm Developers & Engineers',
        icon: Cpu,
        accentColor: '#38bdf8',
        summary:
            'Avoid compiling legacy scientific C++/Fortran binaries or configuring complex CUDA drivers. Run state-of-the-art tools across international supercomputers.',
        bottleneck:
            'Conflicting GLIBC/CUDA library versions, cluster queue scripts, and lack of local GPU power.',
        solution:
            '400+ pre-built Docker/Singularity apps orchestrated seamlessly across NSF supercomputing clusters (TACC, SDSC, IU Carbonate).',
        features: [
            '400+ curated apps: FreeSurfer, FSL, MRtrix3, ANTs, QSIprep',
            'Automated Slurm job dispatch and memory allocation',
            'Heterogeneous cloud execution with zero local hardware load',
            'Reproducible container execution with pinned image hashes',
        ],
        previewType: 'hpc',
    },
    {
        id: 'analysis',
        stepNumber: '03',
        title: 'Multi-Modal Discovery',
        tagline: 'Interactive 3D tractography & cloud Jupyter Notebooks',
        role: 'Data Scientists & Postdocs',
        icon: LineChart,
        accentColor: '#818cf8',
        summary:
            'Inspect multi-shell diffusion models, white matter fascicles, and functional connectivity matrices directly in the browser or via live Python kernels.',
        bottleneck:
            'Downloading terabytes of intermediate derivatives to local machines before being able to run group statistics.',
        solution:
            'In-browser WebGL 3D tractography viewers and cloud-hosted Jupyter Notebooks with direct access to project derivatives.',
        features: [
            'Interactive 3D fiber tractography and cortical mesh visualizers',
            'Cloud Jupyter kernels with NiBabel, Nilearn, MNE, and DIPY',
            'Instant multi-subject aggregation into tidy CSV/Parquet dataframes',
            'Automated quality control metrics and outlier rejection',
        ],
        previewType: 'jupyter',
    },
    {
        id: 'publishing',
        stepNumber: '04',
        title: 'Provenance & Publishing',
        tagline: 'Mint permanent DOIs with 100% reproducible pipeline graphs',
        role: 'Principal Investigators & Lab Directors',
        icon: Award,
        accentColor: '#34d399',
        summary:
            'When submitting manuscripts to Nature, NeuroImage, or eLife, share your exact data lineage. Anyone can replicate your results with a single click.',
        bottleneck:
            'Reviewers asking for exact parameter logs and software versions years after a graduate student has left the lab.',
        solution:
            'Cryptographically verifiable data provenance graph linking every raw byte, intermediate file, app version, and published figure.',
        features: [
            'Permanent citable DOIs generated for published projects',
            'Complete provenance DAG (Directed Acyclic Graph) tracking every step',
            'One-click replication allows reviewers to re-run full workflows',
            'NIH & European Open Science grant compliance out of the box',
        ],
        previewType: 'provenance',
    },
];

export default function ScientificJourneySection() {
    const [activeStageIndex, setActiveStageIndex] = useState(0);
    const activeStage = JOURNEY_STAGES[activeStageIndex];

    return (
        <Box mb={{ base: '64px', md: '100px' }}>
            {/* Header */}
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
                    Lifecycle
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
                        The Research Lifecycle
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
                        From Raw Scanner Data to Published Discovery
                    </Heading>
                    <Text fontSize="15px" color="rgba(248, 250, 252, 0.8)" lineHeight="1.65">
                        Traditional neuroimaging requires navigating fragmented software, complex cluster queues, and
                        reproducibility hurdles. Brainlife unites every stage of the scientific journey into a single open cloud platform.
                    </Text>
                </Box>
            </Box>

            {/* Step Navigation Tabs */}
            <Grid
                templateColumns={{
                    base: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                }}
                gap="10px"
                mb="24px"
            >
                {JOURNEY_STAGES.map((stage, idx) => {
                    const isSelected = idx === activeStageIndex;
                    const StageIcon = stage.icon;
                    return (
                        <Box
                            key={stage.id}
                            as="button"
                            onClick={() => setActiveStageIndex(idx)}
                            textAlign="left"
                            p={{ base: '14px 12px', md: '16px 16px' }}
                            borderRadius="16px"
                            bg={isSelected ? 'rgba(92, 197, 216, 0.12)' : 'rgba(15, 23, 42, 0.6)'}
                            border="1px solid"
                            borderColor={isSelected ? stage.accentColor : 'rgba(255, 255, 255, 0.08)'}
                            boxShadow={isSelected ? `0 0 25px ${stage.accentColor}25` : 'none'}
                            transition="all 0.25s ease"
                            cursor="pointer"
                            position="relative"
                            overflow="hidden"
                            _hover={{
                                borderColor: stage.accentColor,
                                bg: 'rgba(92, 197, 216, 0.08)',
                            }}
                        >
                            <Flex alignItems="center" gap="10px" mb="6px">
                                <Box
                                    w="28px"
                                    h="28px"
                                    borderRadius="8px"
                                    bg={isSelected ? `${stage.accentColor}25` : 'rgba(255, 255, 255, 0.05)'}
                                    color={isSelected ? stage.accentColor : 'rgba(255, 255, 255, 0.6)'}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="12px"
                                    fontWeight={800}
                                >
                                    <StageIcon size={14} />
                                </Box>
                                <Text
                                    fontSize="11px"
                                    fontWeight={800}
                                    letterSpacing="0.08em"
                                    color={isSelected ? stage.accentColor : 'rgba(255, 255, 255, 0.5)'}
                                >
                                    STEP {stage.stepNumber}
                                </Text>
                            </Flex>
                            <Text
                                fontSize={{ base: '13px', md: '14px' }}
                                fontWeight={700}
                                color={isSelected ? 'white' : 'rgba(255, 255, 255, 0.75)'}
                                lineHeight="1.3"
                                noOfLines={1}
                            >
                                {stage.title}
                            </Text>
                        </Box>
                    );
                })}
            </Grid>

            {/* Active Stage Interactive Showcase Card */}
            <AnimatePresence mode="wait">
                <MotionBox
                    key={activeStage.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    borderRadius={{ base: '20px', md: '28px' }}
                    bg="linear-gradient(145deg, rgba(17, 24, 39, 0.96) 0%, rgba(10, 14, 26, 0.98) 100%)"
                    border="1px solid"
                    borderColor={`${activeStage.accentColor}40`}
                    boxShadow={`0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px ${activeStage.accentColor}15`}
                    backdropFilter="blur(24px)"
                    p={{ base: '22px 18px', md: '36px 32px' }}
                >
                    <Grid
                        templateColumns={{ base: '1fr', lg: '1fr 1.15fr' }}
                        gap={{ base: '24px', lg: '36px' }}
                        alignItems="center"
                    >
                        {/* Left Side: Deep Narrative & Workflow Breakdown */}
                        <Box>
                            <Flex alignItems="center" gap="10px" mb="12px" wrap="wrap">
                                <Badge
                                    bg={`${activeStage.accentColor}20`}
                                    color={activeStage.accentColor}
                                    border="1px solid"
                                    borderColor={`${activeStage.accentColor}50`}
                                    fontSize="10px"
                                    fontWeight={800}
                                    letterSpacing="0.08em"
                                    px="8px"
                                    py="2px"
                                    borderRadius="4px"
                                    textTransform="uppercase"
                                >
                                    {activeStage.role}
                                </Badge>
                                <Text fontSize="12px" color="rgba(255, 255, 255, 0.5)">
                                    Stage {activeStage.stepNumber} of 04
                                </Text>
                            </Flex>

                            <Heading
                                as="h3"
                                fontSize={{ base: '22px', sm: '26px', md: '30px' }}
                                fontWeight={900}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                letterSpacing="-0.02em"
                                mb="8px"
                            >
                                {activeStage.title}
                            </Heading>

                            <Text
                                fontSize="14.5px"
                                fontWeight={600}
                                color={activeStage.accentColor}
                                mb="16px"
                            >
                                {activeStage.tagline}
                            </Text>

                            <Text
                                fontSize="13.5px"
                                color="rgba(248, 250, 252, 0.85)"
                                lineHeight="1.6"
                                mb="20px"
                            >
                                {activeStage.summary}
                            </Text>

                            {/* Contrast Box: Before vs Brainlife */}
                            <Box
                                p="14px 16px"
                                borderRadius="12px"
                                bg="rgba(0, 0, 0, 0.35)"
                                border="1px solid rgba(255, 255, 255, 0.08)"
                                mb="20px"
                            >
                                <Flex direction="column" gap="10px">
                                    <Box>
                                        <Text fontSize="10.5px" fontWeight={800} color="#f87171" letterSpacing="0.06em" textTransform="uppercase" mb="2px">
                                            The Traditional Bottleneck
                                        </Text>
                                        <Text fontSize="12px" color="rgba(255, 255, 255, 0.7)">
                                            {activeStage.bottleneck}
                                        </Text>
                                    </Box>
                                    <Box pt="8px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                                        <Text fontSize="10.5px" fontWeight={800} color="#34d399" letterSpacing="0.06em" textTransform="uppercase" mb="2px">
                                            The Brainlife Advantage
                                        </Text>
                                        <Text fontSize="12px" color="rgba(255, 255, 255, 0.9)">
                                            {activeStage.solution}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>

                            {/* Feature Checkmarks */}
                            <Stack spacing="8px">
                                {activeStage.features.map((feature, fIdx) => (
                                    <Flex key={fIdx} alignItems="flex-start" gap="8px">
                                        <CheckCircle2
                                            size={14}
                                            color={activeStage.accentColor}
                                            style={{ marginTop: '3px', flexShrink: 0 }}
                                        />
                                        <Text fontSize="12.5px" color="rgba(255, 255, 255, 0.8)" lineHeight="1.4">
                                            {feature}
                                        </Text>
                                    </Flex>
                                ))}
                            </Stack>
                        </Box>

                        {/* Right Side: High-Precision Technical Mockup Canvas */}
                        <Box
                            borderRadius="16px"
                            bg="#090d16"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            overflow="hidden"
                            boxShadow="0 15px 40px rgba(0, 0, 0, 0.6)"
                        >
                            {/* Window Topbar */}
                            <Flex
                                alignItems="center"
                                justify="space-between"
                                px="14px"
                                py="10px"
                                bg="rgba(255, 255, 255, 0.03)"
                                borderBottom="1px solid rgba(255, 255, 255, 0.08)"
                            >
                                <HStack spacing="6px">
                                    <Box w="10px" h="10px" borderRadius="full" bg="#ef4444" />
                                    <Box w="10px" h="10px" borderRadius="full" bg="#eab308" />
                                    <Box w="10px" h="10px" borderRadius="full" bg="#22c55e" />
                                </HStack>
                                <Text fontSize="11px" color="rgba(255, 255, 255, 0.5)" fontFamily="monospace">
                                    brainlife://stage/{activeStage.id}
                                </Text>
                                <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" fontSize="9px">
                                    LIVE DEMO
                                </Badge>
                            </Flex>

                            {/* Dynamic Content Preview Based on Stage */}
                            <Box p={{ base: '16px', md: '20px' }}>
                                {activeStage.previewType === 'bids' && <BidsVisualizerPreview />}
                                {activeStage.previewType === 'hpc' && <HpcClusterExecutionPreview />}
                                {activeStage.previewType === 'jupyter' && <JupyterAnalysisPreview />}
                                {activeStage.previewType === 'provenance' && <ProvenanceCitationPreview />}
                            </Box>
                        </Box>
                    </Grid>
                </MotionBox>
            </AnimatePresence>
        </Box>
    );
}

// ==========================================
// SUB-PREVIEW COMPONENTS (Authentic Mockups)
// ==========================================

function BidsVisualizerPreview() {
    return (
        <Box fontFamily="monospace" fontSize="11.5px">
            <Flex justify="space-between" mb="12px" pb="8px" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
                <Text color="#5cc5d8" fontWeight={700}>
                    📁 BIDS Dataset Structure Inspector
                </Text>
                <Badge bg="rgba(34, 197, 94, 0.15)" color="#4ade80" border="1px solid rgba(34, 197, 94, 0.3)">
                    ezBIDS: VALIDATED
                </Badge>
            </Flex>

            <Stack spacing="6px" color="rgba(255, 255, 255, 0.75)">
                <Text color="#94a3b8">dataset_description.json <Text as="span" color="#22c55e">✓</Text></Text>
                <Text color="#94a3b8">participants.tsv (N = 120 subjects) <Text as="span" color="#22c55e">✓</Text></Text>
                <Box pl="12px">
                    <Text color="#38bdf8">└── sub-01/</Text>
                    <Box pl="14px">
                        <Text color="#94a3b8">├── ses-01/</Text>
                        <Box pl="14px">
                            <Text color="#f8fafc">
                                ├── anat/sub-01_T1w.nii.gz <Text as="span" color="#22c55e">(Defaced ✓)</Text>
                            </Text>
                            <Text color="#f8fafc">
                                ├── dwi/sub-01_dwi.nii.gz <Text as="span" color="#5cc5d8">[b=1000/2000, 64 dir]</Text>
                            </Text>
                            <Text color="#f8fafc">
                                ├── dwi/sub-01_dwi.bval <Text as="span" color="#22c55e">✓</Text>
                            </Text>
                            <Text color="#f8fafc">
                                └── dwi/sub-01_dwi.bvec <Text as="span" color="#22c55e">✓</Text>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Stack>

            <Box mt="16px" p="10px 12px" borderRadius="8px" bg="rgba(92, 197, 216, 0.06)" border="1px solid rgba(92, 197, 216, 0.2)">
                <Flex justify="space-between" alignItems="center">
                    <Text fontSize="11px" color="#5cc5d8" fontWeight={700}>
                        ⚡ ezBIDS Automated Diagnostics
                    </Text>
                    <Text fontSize="10px" color="#4ade80">
                        100% BIDS v1.8.0 Compliant
                    </Text>
                </Flex>
                <Text fontSize="10.5px" color="rgba(255, 255, 255, 0.65)" mt="3px">
                    All acquisition parameters extracted directly from DICOM headers. Ready for cloud compute.
                </Text>
            </Box>
        </Box>
    );
}

function HpcClusterExecutionPreview() {
    return (
        <Box fontFamily="monospace" fontSize="11.5px">
            <Flex justify="space-between" mb="12px" pb="8px" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
                <Text color="#38bdf8" fontWeight={700}>
                    ⚡ Slurm HPC Dispatcher Monitor
                </Text>
                <Badge bg="rgba(56, 189, 248, 0.15)" color="#38bdf8" border="1px solid rgba(56, 189, 248, 0.3)">
                    JOB #89210 • RUNNING
                </Badge>
            </Flex>

            <Stack spacing="8px">
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="6px 10px" borderRadius="6px">
                    <Text color="#94a3b8">Active App:</Text>
                    <Text color="white" fontWeight={700}>brainlife/app-mrtrix3-act (v3.0.4)</Text>
                </Flex>
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="6px 10px" borderRadius="6px">
                    <Text color="#94a3b8">Target Supercomputer:</Text>
                    <Text color="#38bdf8">TACC Stampede2 / IU Carbonate</Text>
                </Flex>
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="6px 10px" borderRadius="6px">
                    <Text color="#94a3b8">Container Engine:</Text>
                    <Text color="#818cf8">Singularity 3.8.7 (sha256:8f4c...)</Text>
                </Flex>
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="6px 10px" borderRadius="6px">
                    <Text color="#94a3b8">Hardware Allocation:</Text>
                    <Text color="#4ade80">64 Cores • 256GB RAM • NVIDIA A100</Text>
                </Flex>
            </Stack>

            <Box mt="14px" p="8px 10px" borderRadius="6px" bg="black" border="1px solid rgba(255, 255, 255, 0.06)">
                <Text color="#64748b" fontSize="10px">[00:02:14] Generating 5-tissue-type anatomical segmentations...</Text>
                <Text color="#64748b" fontSize="10px">[00:04:30] Performing anatomically constrained tractography (ACT)...</Text>
                <Text color="#22c55e" fontSize="10px">[00:06:12] Output generated: 10,000,000 streamlines tracked.</Text>
            </Box>
        </Box>
    );
}

function JupyterAnalysisPreview() {
    return (
        <Box fontFamily="monospace" fontSize="11px">
            <Flex justify="space-between" mb="10px" pb="6px" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
                <Text color="#818cf8" fontWeight={700}>
                    📓 Cloud JupyterLab • Python 3.11 Kernel
                </Text>
                <Badge bg="rgba(129, 140, 248, 0.15)" color="#a5b4fc" border="1px solid rgba(129, 140, 248, 0.3)">
                    KERNEL: IDLE (0.4s)
                </Badge>
            </Flex>

            <Box bg="#06090e" p="10px" borderRadius="6px" border="1px solid rgba(255, 255, 255, 0.08)" mb="10px">
                <Text color="#64748b"># Load tractography derivatives directly from Brainlife project</Text>
                <Text color="#c084fc">import <Text as="span" color="#f8fafc">brainlife as bl</Text></Text>
                <Text color="#c084fc">import <Text as="span" color="#f8fafc">dipy.tracking as dti</Text></Text>
                <Text color="#f8fafc" mt="4px">
                    project = bl.Project(<Text as="span" color="#38bdf8">&apos;HCP_Lifespan_Diffusion&apos;</Text>)
                </Text>
                <Text color="#f8fafc">
                    tracts = project.get_derivatives(datatype=<Text as="span" color="#38bdf8">&apos;tractography/afq&apos;</Text>)
                </Text>
                <Text color="#f8fafc">
                    df = tracts.to_dataframe(metrics=[<Text as="span" color="#5cc5d8">&apos;FA&apos;</Text>, <Text as="span" color="#5cc5d8">&apos;MD&apos;</Text>, <Text as="span" color="#5cc5d8">&apos;volume&apos;</Text>])
                </Text>
                <Text color="#c084fc" mt="4px">df.describe()</Text>
            </Box>

            {/* Output Matrix Mockup */}
            <Box bg="rgba(255, 255, 255, 0.02)" p="8px 10px" borderRadius="6px" border="1px solid rgba(255, 255, 255, 0.05)">
                <Flex justify="space-between" color="#94a3b8" fontSize="10px" pb="4px" borderBottom="1px solid rgba(255, 255, 255, 0.05)">
                    <Text>TRACT NAME</Text>
                    <Text>SUBJECTS</Text>
                    <Text>MEAN FA</Text>
                    <Text>P-VALUE</Text>
                </Flex>
                <Flex justify="space-between" color="white" fontSize="10px" py="3px">
                    <Text color="#5cc5d8">Left Arcuate Fasciculus</Text>
                    <Text>540</Text>
                    <Text>0.482 ± 0.04</Text>
                    <Text color="#4ade80">p &lt; 0.001</Text>
                </Flex>
                <Flex justify="space-between" color="white" fontSize="10px" py="3px">
                    <Text color="#5cc5d8">Corpus Callosum (Forceps Major)</Text>
                    <Text>540</Text>
                    <Text>0.591 ± 0.03</Text>
                    <Text color="#4ade80">p &lt; 0.001</Text>
                </Flex>
            </Box>
        </Box>
    );
}

function ProvenanceCitationPreview() {
    return (
        <Box fontFamily="monospace" fontSize="11px">
            <Flex justify="space-between" mb="10px" pb="6px" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
                <Text color="#34d399" fontWeight={700}>
                    📜 Verified Reproducibility Record
                </Text>
                <Badge bg="rgba(52, 211, 153, 0.15)" color="#34d399" border="1px solid rgba(52, 211, 153, 0.3)">
                    IMMUTABLE DOI
                </Badge>
            </Flex>

            <Box bg="#06090e" p="12px" borderRadius="8px" border="1px solid rgba(52, 211, 153, 0.2)" mb="12px">
                <Flex alignItems="center" gap="8px" mb="6px">
                    <Award size={16} color="#34d399" />
                    <Text fontSize="12px" fontWeight={800} color="white">
                        doi:10.25663/brainlife.pub.88
                    </Text>
                </Flex>
                <Text fontSize="10.5px" color="rgba(255, 255, 255, 0.7)" fontFamily="'Work Sans', sans-serif">
                    &ldquo;White matter connectivity changes across the adult lifespan in 1,200 participants.&rdquo;
                </Text>
            </Box>

            <Stack spacing="6px">
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="5px 8px" borderRadius="4px">
                    <Text color="#94a3b8">Lineage Hash:</Text>
                    <Text color="#f8fafc">sha256:e3b0c44298fc1c149afbf4c8...</Text>
                </Flex>
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="5px 8px" borderRadius="4px">
                    <Text color="#94a3b8">Replication Status:</Text>
                    <Text color="#4ade80">100% Deterministic (Bit-for-Bit)</Text>
                </Flex>
                <Flex justify="space-between" bg="rgba(255, 255, 255, 0.03)" p="5px 8px" borderRadius="4px">
                    <Text color="#94a3b8">License:</Text>
                    <Text color="#38bdf8">Creative Commons Attribution 4.0</Text>
                </Flex>
            </Stack>

            <Box mt="10px" textAlign="center">
                <Badge bg="rgba(52, 211, 153, 0.1)" color="#34d399" px="10px" py="3px" borderRadius="full">
                    ✓ Compliant with NIH Data Sharing Policy
                </Badge>
            </Box>
        </Box>
    );
}
