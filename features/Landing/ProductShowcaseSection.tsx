'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Image, Badge, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { Layers, Database, Cpu, CheckCircle2, Eye, Sparkles, Server, Terminal, Activity } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import connectomicsImg from '@/assets/landing/tract2.png';
import anatomyShowcaseImg from '@/assets/landing/anatomy_showcase_clean@2x.png';
import NiiVueViewer from '@/features/ProjectDataS3/components/NiiVueViewer';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;
const connectomicsImgSrc = getSrc(connectomicsImg, '/assets/landing/tract2.png');
const anatomyShowcaseImgSrc = getSrc(anatomyShowcaseImg, '/assets/landing/anatomy_showcase_clean@2x.png');


const STAGES = [
    {
        id: 0,
        title: '3D Tractography & Volume Viewer',
        icon: Eye,
        badgeColor: '#5cc5d8',
        tag: 'Stage 1 of 4: Visual Inspection',
        description: 'Interactive high-dimensional brain tractography rendering with sub-millimeter streamline filtering & opacity controls.',
    },
    {
        id: 1,
        title: 'BIDS Dataset & Provenance Graph',
        icon: Layers,
        badgeColor: '#60a5fa',
        tag: 'Stage 2 of 4: Data Lineage',
        description: 'Automated BIDS validation, tree hierarchy indexing, and end-to-end provenance node graph mapping.',
    },
    {
        id: 2,
        title: 'HPC Execution & App Catalog (500+)',
        icon: Cpu,
        badgeColor: '#34d399',
        tag: 'Stage 3 of 4: Cloud HPC Engine',
        description: 'Containerized Slurm execution on A100 GPU clusters with real-time log telemetry and automated S3 syncing.',
    },
    {
        id: 3,
        title: 'FreeSurfer Parcellation & Surface Viewer',
        icon: Activity,
        badgeColor: '#a78bfa',
        tag: 'Stage 4 of 4: Cortical Analysis',
        description: 'Live interactive FreeSurfer parcellation & subcortical segmentation viewer loaded directly from NIfTI endpoints.',
    },
];

export default function ProductShowcaseSection() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const [selectedTab, setSelectedTab] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const isManualClick = useRef(false);

    useEffect(() => {
        const trigger = triggerRef.current;
        const windowEl = windowRef.current;
        if (!trigger || !windowEl) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: trigger,
                    start: 'top top',
                    end: '+=200%',
                    pin: true,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const prog = self.progress;
                        setScrollProgress(prog);

                        // 3D Perspective Tilt on Scroll
                        const rotateX = (0.5 - prog) * 12; // 6deg to -6deg
                        const rotateY = Math.sin(prog * Math.PI) * 4; // subtle 3D shift
                        const scale = 0.94 + Math.sin(prog * Math.PI) * 0.06; // 0.94 -> 1.0 -> 0.94

                        gsap.to(windowEl, {
                            rotateX: rotateX,
                            rotateY: rotateY,
                            scale: scale,
                            duration: 0.2,
                            ease: 'power1.out',
                        });

                        // Auto switch tabs based on scroll progress if user hasn't overridden
                        if (!isManualClick.current) {
                            if (prog < 0.25) {
                                setSelectedTab(0);
                            } else if (prog < 0.5) {
                                setSelectedTab(1);
                            } else if (prog < 0.75) {
                                setSelectedTab(2);
                            } else {
                                setSelectedTab(3);
                            }
                        }
                    },
                });
            }, triggerRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    const handleTabClick = (index: number) => {
        isManualClick.current = true;
        setSelectedTab(index);
        // Reset manual lock after 5 seconds of scroll idle
        setTimeout(() => {
            isManualClick.current = false;
        }, 5000);
    };

    const currentStage = STAGES[selectedTab];

    return (
        <Box
            ref={triggerRef}
            position="relative"
            bg="transparent"
            style={{ perspective: '1200px' }}
        >
            {/* Ambient Dynamic Background Glow */}
            <Box
                position="absolute"
                left="50%"
                top="40%"
                transform="translate(-50%, -50%)"
                width={{ base: '320px', md: '750px', lg: '1100px' }}
                height={{ base: '320px', md: '500px', lg: '700px' }}
                background="radial-gradient(ellipse at center, rgba(58, 111, 124, 0.16) 0%, rgba(72, 108, 152, 0.08) 50%, transparent 75%)"
                filter="blur(90px)"
                pointerEvents="none"
                zIndex={0}
            />

            {/* Sticky Viewport Container */}
            <Flex
                minH="100vh"
                direction="column"
                justify="center"
                align="center"
                py={{ base: '20px', md: '40px' }}
                px={{ base: '12px', md: '24px' }}
                position="relative"
                zIndex={2}
            >
                <Box maxW="1280px" w="100%" mx="auto">
                    {/* Header Banner */}
                    <Box textAlign="center" mb={{ base: '20px', md: '28px' }}>
                        <Flex justify="center" align="center" gap="8px" mb="10px">
                            <Box
                                display="inline-flex"
                                alignItems="center"
                                gap="6px"
                                px="12px"
                                py="4px"
                                borderRadius="full"
                                bg="rgba(58, 111, 124, 0.15)"
                                border="1px solid rgba(58, 111, 124, 0.35)"
                                color="#5cc5d8"
                                fontSize="11px"
                                fontWeight="700"
                                letterSpacing="0.08em"
                                textTransform="uppercase"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                <Sparkles size={13} />
                                Living Platform Interface
                            </Box>
                            <Box
                                display="inline-flex"
                                alignItems="center"
                                gap="6px"
                                px="10px"
                                py="4px"
                                borderRadius="full"
                                bg="rgba(255, 255, 255, 0.05)"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                color={currentStage.badgeColor}
                                fontSize="11px"
                                fontWeight="700"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                {currentStage.tag}
                            </Box>
                        </Flex>

                        <Text
                            fontSize={{ base: '22px', md: '34px', lg: '40px' }}
                            fontWeight="800"
                            color="white"
                            letterSpacing="-0.03em"
                            mb="8px"
                            fontFamily="'Work Sans', sans-serif"
                            lineHeight="1.15"
                        >
                            Powerful Studio Tools for Neuroscientists &amp; AI Engineers
                        </Text>
                        <Text
                            fontSize={{ base: '13px', md: '15px' }}
                            color="rgba(248, 250, 252, 0.68)"
                            maxW="720px"
                            mx="auto"
                            lineHeight="1.5"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            {currentStage.description}
                        </Text>
                    </Box>

                    {/* macOS / App Studio Window Container with 3D Transform */}
                    <Box
                        ref={windowRef}
                        bg="rgba(11, 16, 26, 0.85)"
                        border="1px solid rgba(255, 255, 255, 0.14)"
                        backdropFilter="blur(24px)"
                        borderRadius="18px"
                        boxShadow="0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(58, 111, 124, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        overflow="hidden"
                        transition="transform 0.1s linear"
                        transformOrigin="center center"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Top Bar / App Chrome */}
                        <Flex
                            px="18px"
                            py="12px"
                            bg="rgba(8, 12, 20, 0.95)"
                            borderBottom="1px solid rgba(255, 255, 255, 0.08)"
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            gap="12px"
                            position="relative"
                        >
                            {/* Scroll Progress Timeline Bar running along header bottom */}
                            <Box
                                position="absolute"
                                bottom={0}
                                left={0}
                                h="2px"
                                bg="linear-gradient(90deg, #3A6F7C 0%, #486C98 50%, #5CC5D8 100%)"
                                w={`${Math.min(Math.max(scrollProgress, 0), 1) * 100}%`}
                                transition="width 0.1s linear"
                            />

                            {/* Traffic light dots & app title */}
                            <Flex alignItems="center" gap="12px">
                                <Flex gap="6px">
                                    <Box w="10px" h="10px" borderRadius="full" bg="#ff5f56" opacity={0.9} />
                                    <Box w="10px" h="10px" borderRadius="full" bg="#ffbd2e" opacity={0.9} />
                                    <Box w="10px" h="10px" borderRadius="full" bg="#27c93f" opacity={0.9} />
                                </Flex>
                                <Flex align="center" gap="8px">
                                    <Server size={14} color="#5cc5d8" />
                                    <Text
                                        fontSize="12px"
                                        color="rgba(255, 255, 255, 0.75)"
                                        fontWeight="600"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        Brainlife Studio v3.2 — Project #104 (Human Connectome Pipeline)
                                    </Text>
                                </Flex>
                            </Flex>

                            {/* Live Status Badges */}
                            <Flex alignItems="center" gap="10px">
                                <Badge
                                    bg="rgba(52, 211, 153, 0.15)"
                                    color="#34d399"
                                    border="1px solid rgba(52, 211, 153, 0.3)"
                                    px="8px"
                                    py="3px"
                                    borderRadius="6px"
                                    fontSize="10px"
                                    fontWeight="700"
                                    textTransform="none"
                                    display="flex"
                                    alignItems="center"
                                    gap="4px"
                                >
                                    <CheckCircle2 size={12} />
                                    12 Slurm Jobs Completed
                                </Badge>
                                <Badge
                                    bg="rgba(58, 111, 124, 0.2)"
                                    color="#5cc5d8"
                                    border="1px solid rgba(58, 111, 124, 0.4)"
                                    px="8px"
                                    py="3px"
                                    borderRadius="6px"
                                    fontSize="10px"
                                    fontWeight="700"
                                    textTransform="none"
                                >
                                    Carbonate GPU Cluster
                                </Badge>
                            </Flex>
                        </Flex>

                        {/* Window Content Tabs */}
                        <Tabs
                            index={selectedTab}
                            onChange={handleTabClick}
                            variant="unstyled"
                            p="0"
                        >
                            <TabList
                                px="18px"
                                py="10px"
                                bg="rgba(15, 23, 42, 0.6)"
                                borderBottom="1px solid rgba(255, 255, 255, 0.06)"
                                display="flex"
                                gap="8px"
                                overflowX="auto"
                            >
                                {STAGES.map((stage) => {
                                    const IconComponent = stage.icon;
                                    const isActive = selectedTab === stage.id;
                                    return (
                                        <Tab
                                            key={stage.id}
                                            px="14px"
                                            py="8px"
                                            borderRadius="8px"
                                            fontSize="12px"
                                            fontWeight="700"
                                            color={isActive ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                                            bg={isActive ? 'rgba(58, 111, 124, 0.25)' : 'transparent'}
                                            border={isActive ? `1px solid ${stage.badgeColor}` : '1px solid transparent'}
                                            transition="all 0.2s ease"
                                            _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.06)' }}
                                            display="flex"
                                            alignItems="center"
                                            gap="8px"
                                            fontFamily="'Work Sans', sans-serif"
                                            whiteSpace="nowrap"
                                        >
                                            <IconComponent size={14} color={isActive ? stage.badgeColor : 'currentColor'} />
                                            {stage.title}
                                        </Tab>
                                    );
                                })}
                            </TabList>

                            <TabPanels p={{ base: '14px', md: '20px' }}>
                                {/* TAB 0: 3D Visualization Viewer */}
                                <TabPanel p="0">
                                    <Box
                                        w="100%"
                                        borderRadius="12px"
                                        overflow="hidden"
                                        position="relative"
                                        bg="#050810"
                                        border="1px solid rgba(255,255,255,0.08)"
                                        minH={{ base: '260px', md: '380px', lg: '420px' }}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Image
                                            src={anatomyShowcaseImgSrc}
                                            alt="3D Brain Tractography & Volume Viewer"
                                            w="100%"
                                            h="100%"
                                            maxH={{ base: '320px', md: '460px', lg: '540px' }}
                                            objectFit="cover"
                                            display="block"
                                        />
                                        <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(5,8,16,0.7) 0%, transparent 60%)" pointerEvents="none" />

                                        {/* Overlay stats floating chips */}
                                        <Flex position="absolute" bottom="16px" left="16px" right="16px" justify="flex-end" align="flex-end" flexWrap="wrap" gap="8px">
                                            <Flex gap="8px" wrap="wrap">
                                                <Badge bg="rgba(58, 111, 124, 0.35)" color="white" px="8px" py="4px" borderRadius="4px" fontSize="11px">
                                                    AF_L: 14,210 tracts
                                                </Badge>
                                                <Badge bg="rgba(72, 108, 152, 0.35)" color="white" px="8px" py="4px" borderRadius="4px" fontSize="11px">
                                                    CST_R: 22,890 tracts
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </TabPanel>

                                {/* TAB 1: BIDS Dataset & Provenance Graph */}
                                <TabPanel p="0">
                                    <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: '14px', md: '20px' }}>
                                        <Box flex="1 1 50%" bg="rgba(11, 16, 26, 0.6)" border="1px solid rgba(255,255,255,0.08)" borderRadius="12px" p="16px">
                                            <Text fontSize="12px" color="rgba(255,255,255,0.5)" fontWeight="700" textTransform="uppercase" mb="12px" fontFamily="'Work Sans', sans-serif">
                                                BIDS Data Tree (sub-01_ses-01)
                                            </Text>
                                            <Flex direction="column" gap="8px" fontFamily="monospace" fontSize="12px" color="rgba(255,255,255,0.85)">
                                                <Flex align="center" gap="6px">
                                                    <Database size={14} color="#5cc5d8" />
                                                    <Text color="#5cc5d8" fontWeight="700">bids://project-104/sub-01</Text>
                                                </Flex>
                                                <Box pl="16px">
                                                    <Text color="rgba(255,255,255,0.6)">├── anat/</Text>
                                                    <Text pl="16px">├── sub-01_ses-01_T1w.nii.gz <Badge colorScheme="blue" fontSize="9px">neuro/anat</Badge></Text>
                                                    <Text pl="16px">└── sub-01_ses-01_T2w.nii.gz</Text>
                                                    <Text color="rgba(255,255,255,0.6)">├── dwi/</Text>
                                                    <Text pl="16px">├── sub-01_ses-01_dwi.nii.gz <Badge colorScheme="teal" fontSize="9px">neuro/dwi</Badge></Text>
                                                    <Text pl="16px">├── sub-01_ses-01_dwi.bvec</Text>
                                                    <Text pl="16px">└── sub-01_ses-01_dwi.bval</Text>
                                                    <Text color="rgba(255,255,255,0.6)">└── func/</Text>
                                                    <Text pl="16px">└── sub-01_ses-01_task-rest_bold.nii.gz</Text>
                                                </Box>
                                            </Flex>
                                        </Box>

                                        <Box flex="1 1 50%" borderRadius="12px" overflow="hidden" bg="#050810" p="16px" border="1px solid rgba(255,255,255,0.08)">
                                            <Text fontSize="12px" color="rgba(255,255,255,0.5)" fontWeight="700" textTransform="uppercase" mb="12px" fontFamily="'Work Sans', sans-serif">
                                                Automated Data Lineage &amp; Provenance Graph
                                            </Text>
                                            <Image src={connectomicsImgSrc} alt="Connectomics brain network" h={{ base: '220px', md: '300px' }} w="100%" objectFit="cover" borderRadius="8px" />
                                        </Box>
                                    </Flex>
                                </TabPanel>

                                {/* TAB 2: HPC Cluster & App Catalog */}
                                <TabPanel p="0">
                                    <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: '14px', md: '20px' }}>
                                        <Box flex="1 1 50%" bg="rgba(11, 16, 26, 0.6)" border="1px solid rgba(255,255,255,0.08)" borderRadius="12px" p="16px">
                                            <Text fontSize="12px" color="rgba(255,255,255,0.5)" fontWeight="700" textTransform="uppercase" mb="12px" fontFamily="'Work Sans', sans-serif">
                                                Popular BIDS Containerized Apps
                                            </Text>
                                            <Flex direction="column" gap="10px">
                                                <Flex align="center" justify="space-between" bg="rgba(255,255,255,0.04)" p="10px 14px" borderRadius="8px">
                                                    <Box>
                                                        <Text fontSize="13px" fontWeight="700" color="white" fontFamily="'Work Sans', sans-serif">Freesurfer 7.3.2</Text>
                                                        <Text fontSize="11px" color="rgba(255,255,255,0.5)" fontFamily="'Work Sans', sans-serif">Automated cortical parcellation &amp; surface extraction</Text>
                                                    </Box>
                                                    <Badge bg="rgba(58, 111, 124, 0.3)" color="#5cc5d8">app #5a4b</Badge>
                                                </Flex>
                                                <Flex align="center" justify="space-between" bg="rgba(255,255,255,0.04)" p="10px 14px" borderRadius="8px">
                                                    <Box>
                                                        <Text fontSize="13px" fontWeight="700" color="white" fontFamily="'Work Sans', sans-serif">MRtrix3 Anatomically Constrained Tractography</Text>
                                                        <Text fontSize="11px" color="rgba(255,255,255,0.5)" fontFamily="'Work Sans', sans-serif">5-tissue-type segmentation &amp; probabilistic fiber tracking</Text>
                                                    </Box>
                                                    <Badge bg="rgba(72, 108, 152, 0.3)" color="#60a5fa">app #5c9d</Badge>
                                                </Flex>
                                                <Flex align="center" justify="space-between" bg="rgba(255,255,255,0.04)" p="10px 14px" borderRadius="8px">
                                                    <Box>
                                                        <Text fontSize="13px" fontWeight="700" color="white" fontFamily="'Work Sans', sans-serif">fMRIPrep Preprocessing Pipeline</Text>
                                                        <Text fontSize="11px" color="rgba(255,255,255,0.5)" fontFamily="'Work Sans', sans-serif">Standardized motion correction &amp; spatial normalization</Text>
                                                    </Box>
                                                    <Badge bg="rgba(92, 138, 108, 0.3)" color="#34d399">app #61ab</Badge>
                                                </Flex>
                                            </Flex>
                                        </Box>

                                        <Box flex="1 1 50%" bg="#050810" border="1px solid rgba(255,255,255,0.08)" borderRadius="12px" p="16px" fontFamily="monospace">
                                            <Flex align="center" justify="space-between" mb="12px">
                                                <Text fontSize="11px" color="rgba(255,255,255,0.5)" fontWeight="700" textTransform="uppercase">
                                                    Live HPC Slurm Execution Console
                                                </Text>
                                                <Flex align="center" gap="4px" color="#34d399" fontSize="11px">
                                                    <Terminal size={12} />
                                                    slurm_job_89421.log
                                                </Flex>
                                            </Flex>
                                            <Box bg="rgba(0,0,0,0.4)" p="12px" borderRadius="6px" fontSize="11px" color="rgba(255,255,255,0.75)" h="200px" overflowY="auto" lineHeight="1.6">
                                                <Text color="rgba(255,255,255,0.4)">[2026-09-04 22:14:02] Initializing Singularity container: brainlife/app-mrtrix3-act:v3.0.3</Text>
                                                <Text color="#5cc5d8">[2026-09-04 22:14:05] Allocating Slurm GPU node: carbonate-gpu-04 (NVIDIA A100 80GB)</Text>
                                                <Text color="rgba(255,255,255,0.8)">[2026-09-04 22:14:12] Running 5ttgen fsl sub-01_ses-01_T1w.nii.gz 5tt.nii.gz...</Text>
                                                <Text color="rgba(255,255,255,0.8)">[2026-09-04 22:18:40] Running tckgen -act 5tt.nii.gz -backtrack -maxlength 250 -select 500k...</Text>
                                                <Text color="#34d399">[2026-09-04 22:24:10] SUCCESS: Generated output track file: track.tck (500,000 streamlines)</Text>
                                                <Text color="#34d399">[2026-09-04 22:24:12] Saved output to Brainlife S3 Archive (Object ID: 64f92a10b9c3)</Text>
                                            </Box>
                                        </Box>
                                    </Flex>
                                </TabPanel>

                                {/* TAB 3: FreeSurfer Parcellation & Surface Viewer */}
                                <TabPanel p="0">
                                    <Box
                                        w="100%"
                                        borderRadius="12px"
                                        overflow="hidden"
                                        position="relative"
                                        bg="#050810"
                                        border="1px solid rgba(255,255,255,0.08)"
                                        minH={{ base: '280px', md: '420px', lg: '460px' }}
                                    >
                                        <NiiVueViewer
                                            fileUrl="https://niivue.github.io/niivue-demo-images/aparc+aseg.nii.gz"
                                            fileName="sub-01_FreeSurfer_aparc+aseg.nii.gz"
                                            hideSidebar={true}
                                        />
                                        <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(5,8,16,0.6) 0%, transparent 60%)" pointerEvents="none" />

                                        {/* Overlay stats floating chips */}
                                        <Flex position="absolute" bottom="16px" left="16px" right="16px" justify="space-between" align="flex-end" flexWrap="wrap" gap="8px" pointerEvents="none">
                                            <Box bg="rgba(15, 23, 42, 0.88)" p="10px 14px" borderRadius="8px" border="1px solid rgba(255,255,255,0.12)" backdropFilter="blur(8px)" pointerEvents="auto">
                                                <Text fontSize="10px" color="rgba(255,255,255,0.5)" fontWeight="700" textTransform="uppercase" fontFamily="'Work Sans', sans-serif">
                                                    FreeSurfer Active Layer
                                                </Text>
                                                <Text fontSize="13px" color="white" fontWeight="700" fontFamily="'Work Sans', sans-serif">
                                                    aparc+aseg.nii.gz (Desikan-Killiany Atlas)
                                                </Text>
                                            </Box>
                                            <Flex gap="8px" wrap="wrap" pointerEvents="auto">
                                                <Badge bg="rgba(167, 139, 250, 0.35)" color="white" px="8px" py="4px" borderRadius="4px" fontSize="11px">
                                                    CORTICAL PARCELLATION: 68 REGIONS
                                                </Badge>
                                                <Badge bg="rgba(52, 211, 153, 0.35)" color="white" px="8px" py="4px" borderRadius="4px" fontSize="11px">
                                                    SUBCORTICAL SEGMENTATION: 42 STRUCTURES
                                                </Badge>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
