'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Badge, Heading, Image } from '@chakra-ui/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FolderPlus,
    UploadCloud,
    Cpu,
    Eye,
    Sparkles,
    Bell,
    Activity,
} from 'lucide-react';
import createImg from '@/assets/landing/create.png';
import importDataImg from '@/assets/landing/import_data.png';
import processImg from '@/assets/landing/process.png';
import phoneAnatomyImg from '@/assets/landing/phone_anatomy_clean.png';
import iosHomepageImg from '@/assets/landing/brainlife_ios_homepage.png';
import phoneDetailImg from '@/assets/landing/brainlife_detail3.png';
import desktopAnatomyImg from '@/assets/landing/anatomy_showcase_clean@2x.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;

const createImgSrc = getSrc(createImg, '/assets/landing/create.png');
const importDataImgSrc = getSrc(importDataImg, '/assets/landing/import_data.png');
const processImgSrc = getSrc(processImg, '/assets/landing/process.png');
const phoneAnatomyImgSrc = getSrc(phoneAnatomyImg, '/assets/landing/phone_anatomy_clean.png');
const iosHomepageImgSrc = getSrc(iosHomepageImg, '/assets/landing/brainlife_ios_homepage.png');
const phoneDetailImgSrc = getSrc(phoneDetailImg, '/assets/landing/brainlife_detail3.png');
const desktopAnatomyImgSrc = getSrc(desktopAnatomyImg, '/assets/landing/anatomy_showcase_clean@2x.png');

export const samplePipelineTracts = [
    {
        id: 'leftILF',
        name: 'leftILF.tck',
        label: 'Inferior Longitudinal Fasciculus',
        size: '25 MB',
        sizeBytes: 26257040,
        color: '#3b82f6',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftILF.tck',
    },
    {
        id: 'leftCST',
        name: 'leftCST.tck',
        label: 'Corticospinal Tract',
        size: '10 MB',
        sizeBytes: 10406216,
        color: '#ef4444',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftCST.tck',
    },
    {
        id: 'leftArc',
        name: 'leftArc.tck',
        label: 'Arcuate Fasciculus',
        size: '37 MB',
        sizeBytes: 37562276,
        color: '#10b981',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftArc.tck',
    },
];

const pipelineSteps = [
    {
        step: '01',
        keyword: 'CREATE',
        title: 'Create Project',
        subtitle: 'Initialize collaborative neuroscience research projects & configure team permissions',
        icon: FolderPlus,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['Project Setup', 'Access Controls', 'Team Workspaces'],
        image: createImgSrc,
        urlPath: 'brainlife.io/project/new',
    },
    {
        step: '02',
        keyword: 'IMPORT',
        title: 'Import Dataset',
        subtitle: 'Upload & ingest multi-modal NIfTI, DICOM, and BIDS brain imaging datasets',
        icon: UploadCloud,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['BIDS Standard', 'NIfTI / DICOM', 'Zero-Copy Cloud'],
        image: importDataImgSrc,
        urlPath: 'brainlife.io/dataset/import',
    },
    {
        step: '03',
        keyword: 'PROCESS',
        title: 'Stage to Process',
        subtitle: 'Dispatch scalable Slurm HPC job containers on NVIDIA A100 GPU clusters',
        icon: Cpu,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['Slurm HPC', 'Singularity Container', '500+ Apps'],
        image: processImgSrc,
        urlPath: 'brainlife.io/process/hpc-dispatch',
    },
    {
        step: '04',
        keyword: 'NOTIFY',
        title: 'Mobile Notification',
        subtitle: 'Receive real-time mobile push notifications when long-running HPC pipelines finish',
        icon: Bell,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['Mobile Push Alert', 'HPC Telemetry', 'Real-Time Sync'],
    },
    {
        step: '05',
        keyword: 'VISUALIZE',
        title: 'Mobile 3D Connectomics',
        subtitle: 'GPU-powered volumetric rendering & 500k streamline tractography visualization',
        icon: Eye,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['NiiVue WebGL', '500k Streamlines', 'Real-Time GPU'],
    },
    {
        step: '06',
        keyword: 'VISUALIZE',
        title: 'Desktop 3D Connectomics',
        subtitle: 'Interactive multi-slice anatomical visualization & streamline tractography studio',
        icon: Activity,
        accentColor: '#5cc5d8',
        bgGradient: 'radial-gradient(circle at center, rgba(92, 197, 216, 0.15) 0%, transparent 70%)',
        badges: ['Desktop WebGL', 'Volumetric Anatomy', 'Streamline Fiber Tracts'],
        image: desktopAnatomyImgSrc,
        urlPath: 'brainlife.io/viewer/desktop-connectomics',
    },
];

// Content rendered inside the 3D Smartphone Display (For Steps 4, 5, & 6)
function PhoneScreenStageContent({ stageIndex }: { stageIndex: number }) {
    if (stageIndex === 3) {
        // Step 04: Mobile App Screen (1st Image: Brainlife Mobile iOS Homepage)
        return (
            <Box
                w="100%"
                h="100%"
                bg="#080c14"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                overflow="hidden"
            >
                <Image
                    src={iosHomepageImgSrc}
                    alt="Brainlife Mobile iOS Homepage"
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                />
            </Box>
        );
    }

    if (stageIndex === 4) {
        // Step 05: Mobile 3D Connectomics (2nd Image: 3D Brain Streamline Anatomy)
        return (
            <Box
                w="100%"
                h="100%"
                bg="#000"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                overflow="hidden"
            >
                <Image
                    src={phoneAnatomyImgSrc}
                    alt="3D Brain Streamline Anatomy Visualization"
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                />
            </Box>
        );
    }

    // Step 06: Mobile ➔ Desktop Sync (3rd Image: Brainlife 3D Detail View)
    return (
        <Box
            w="100%"
            h="100%"
            bg="#080c14"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            overflow="hidden"
        >
            <Image
                src={phoneDetailImgSrc}
                alt="Brainlife 3D Detail View"
                w="100%"
                h="100%"
                objectFit="contain"
                objectPosition="center"
            />
            {stageIndex === 5 && (
                <Box
                    position="absolute"
                    bottom="16px"
                    left="12px"
                    right="12px"
                    bg="rgba(15, 23, 42, 0.9)"
                    backdropFilter="blur(10px)"
                    p="8px 12px"
                    borderRadius="12px"
                    border="1px solid rgba(56, 189, 248, 0.4)"
                    boxShadow="0 10px 20px rgba(0,0,0,0.6)"
                >
                    <Text
                        fontSize="9px"
                        fontWeight="800"
                        color="#38bdf8"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                    >
                        Mobile ➔ Desktop Sync Active
                    </Text>
                    <Text fontSize="8px" color="rgba(255,255,255,0.7)">
                        Volumetric Fiber Streamlines
                    </Text>
                </Box>
            )}
        </Box>
    );
}

export default function HorizontalPipelineSection() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const phoneContainerRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);

    const [activeStageIndex, setActiveStageIndex] = useState(0);

    // Lizard-Style Pinned Horizontal Track + 3D Phone Sync
    useEffect(() => {
        const trigger = triggerRef.current;
        const wrapper = wrapperRef.current;
        const phoneContainer = phoneContainerRef.current;
        const phone = phoneRef.current;
        if (!trigger || !wrapper) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                const stepCount = pipelineSteps.length; // 6 stages
                const verticalScrollDistance = () => (stepCount - 1) * window.innerHeight * 1.3;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: trigger,
                        pin: true,
                        scrub: 0.8,
                        start: 'top top',
                        end: () => `+=${verticalScrollDistance()}`,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        refreshPriority: 2,
                        onUpdate: (self) => {
                            const p = self.progress;
                            const idx = Math.min(stepCount - 1, Math.floor(p * (stepCount - 1) + 0.5));
                            setActiveStageIndex(idx);
                        },
                    },
                });

                // 1. Horizontal Track Translation (percentage-based for 100% precision across screens)
                tl.to(
                    wrapper,
                    {
                        xPercent: -((stepCount - 1) / stepCount) * 100,
                        ease: 'none',
                        duration: 1,
                    },
                    0
                );

                // 2. Lizard Global Style: Content Shrinks into 3D Phone between Stage 3 (Process) & Stage 4 (Notify)
                if (phoneContainer) {
                    // Phone scales in & fades in as content shrinks into it (from progress 0.35 to 0.50)
                    tl.fromTo(
                        phoneContainer,
                        { scale: 0.35, opacity: 0, rotateY: -15 },
                        { scale: 1, opacity: 1, rotateY: 0, ease: 'power2.out', duration: 0.15 },
                        0.35
                    );
                    // Phone transitions to left & fades out as Stage 6 (Desktop Viz) arrives (from progress 0.80 to 0.95)
                    tl.to(
                        phoneContainer,
                        { xPercent: -120, opacity: 0, scale: 0.4, ease: 'power2.inOut', duration: 0.15 },
                        0.80
                    );
                }

                // 3. Full 360-Degree Smartphone Spin across Stages 4 & 5 (from progress 0.50 to 0.78)
                if (phone) {
                    tl.fromTo(
                        phone,
                        { rotateY: 0, rotateX: 6 },
                        { rotateY: 360, rotateX: -6, ease: 'none', duration: 0.28 },
                        0.50
                    );
                }

                // 4. Shrink Desktop Windows into Phone Screen as user scrolls into Stage 4
                const desktopWindows = trigger.querySelectorAll('.desktop-app-window');
                desktopWindows.forEach((win, index) => {
                    if (index === 2) {
                        // Stage 3 (Process) window shrinks into phone screen bounds
                        tl.to(
                            win,
                            {
                                scale: 0.35,
                                opacity: 0,
                                borderRadius: '40px',
                                ease: 'power2.in',
                                duration: 0.14,
                            },
                            0.35
                        );
                    }
                });

                ScrollTrigger.refresh();
            }, triggerRef);
        }, 100);

        const handleResizeOrLoad = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('load', handleResizeOrLoad);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('load', handleResizeOrLoad);
            if (ctx) ctx.revert();
        };
    }, []);

    const activeStage = pipelineSteps[activeStageIndex];
    const isPhoneStage = activeStageIndex >= 3 && activeStageIndex <= 4; // Steps 4 and 5

    return (
        <Box
            ref={triggerRef}
            position="relative"
            w="100%"
            h="100vh"
            bg="radial-gradient(ellipse at 50% 30%, #0d1527 0%, #04070d 75%)"
            overflow="hidden"
            borderTop="1px solid rgba(255, 255, 255, 0.08)"
            borderBottom="1px solid rgba(255, 255, 255, 0.08)"
            style={{ perspective: '1600px' }}
        >
            {/* Background Ambient Glow FX */}
            <Box
                position="absolute"
                top="40%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="900px"
                h="550px"
                bg="radial-gradient(circle, rgba(92, 197, 216, 0.12) 0%, rgba(139, 92, 246, 0.06) 50%, transparent 80%)"
                filter="blur(80px)"
                pointerEvents="none"
            />

            {/* Top Bar Header & Active Stage Badge */}
            <Box
                position="absolute"
                top={{ base: '24px', md: '36px' }}
                left="0"
                right="0"
                maxW="1440px"
                mx="auto"
                px={{ base: '20px', md: '40px' }}
                zIndex={20}
            >
                <Flex justify="space-between" align="center" wrap="wrap" gap="16px">
                    <Box position="relative">
                        <Text
                            fontSize={{ base: '36px', sm: '48px', md: '56px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Pipeline
                        </Text>
                        <Heading
                            fontSize={{ base: '20px', sm: '24px', md: '28px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.03em"
                            mt={{ base: '-12px', sm: '-16px', md: '-18px' }}
                        >
                            End-to-End Workflow
                        </Heading>
                    </Box>

                    {/* Active Stage Indicator Pill */}
                    <Badge
                        bg="rgba(15, 23, 42, 0.85)"
                        color={activeStage.accentColor}
                        border={`1.5px solid ${activeStage.accentColor}`}
                        px="18px"
                        py="9px"
                        borderRadius="full"
                        fontSize="13px"
                        fontWeight="800"
                        backdropFilter="blur(12px)"
                        boxShadow={`0 0 20px ${activeStage.accentColor}30`}
                    >
                        STAGE {activeStage.step}: {activeStage.keyword}
                    </Badge>
                </Flex>
            </Box>

            {/* STAGE DEVICE: 3D Smartphone Device */}
            <Box
                ref={phoneContainerRef}
                position="absolute"
                inset={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={10}
                pointerEvents={isPhoneStage ? 'auto' : 'none'}
                willChange="transform, opacity"
                style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
            >
                {/* 3D Extruded Phone Chassis */}
                <Box
                    ref={phoneRef}
                    position="relative"
                    w={{ base: '240px', sm: '270px', md: '295px' }}
                    h={{ base: '480px', sm: '540px', md: '590px' }}
                    willChange="transform"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Face Display */}
                    <Box
                        position="absolute"
                        inset={0}
                        borderRadius="42px"
                        bg="#080c14"
                        border="3.5px solid rgba(255, 255, 255, 0.3)"
                        boxShadow="0 30px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(92, 197, 216, 0.25), inset 0 0 2px rgba(255, 255, 255, 0.4)"
                        overflow="hidden"
                        style={{
                            transform: 'translateZ(18px)',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        {/* Dynamic Island Notch (shown only on 3D visualizer stage) */}
                        {activeStageIndex === 4 && (
                            <Flex
                                position="absolute"
                                top="12px"
                                left="50%"
                                transform="translateX(-50%)"
                                w="100px"
                                h="20px"
                                bg="#000"
                                borderRadius="full"
                                zIndex={35}
                                align="center"
                                justify="space-between"
                                px="10px"
                                border="1px solid rgba(255,255,255,0.1)"
                            >
                                <Box w="6px" h="6px" borderRadius="full" bg="#1e293b" border="1px solid #334155" />
                                <Box w="30px" h="3px" borderRadius="full" bg="#1e293b" />
                            </Flex>
                        )}

                        {/* Stage Content Render */}
                        <PhoneScreenStageContent stageIndex={activeStageIndex} />
                    </Box>

                    {/* Back Face Enclosure */}
                    <Box
                        position="absolute"
                        inset={0}
                        borderRadius="40px"
                        bg="linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #020617 100%)"
                        border="3.5px solid rgba(255, 255, 255, 0.2)"
                        p="24px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        style={{
                            transform: 'translateZ(-18px) rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <Box
                            w="90px"
                            h="90px"
                            borderRadius="22px"
                            bg="rgba(15, 23, 42, 0.9)"
                            border="1px solid rgba(255,255,255,0.15)"
                            p="10px"
                            display="grid"
                            gridTemplateColumns="1fr 1fr"
                            gap="6px"
                            alignContent="center"
                            justifyItems="center"
                        >
                            <Box w="28px" h="28px" borderRadius="full" bg="#090d16" border="2px solid #334155" />
                            <Box w="28px" h="28px" borderRadius="full" bg="#090d16" border="2px solid #334155" />
                            <Box w="28px" h="28px" borderRadius="full" bg="#090d16" border="2px solid #334155" />
                            <Box w="10px" h="10px" borderRadius="full" bg="white" />
                        </Box>

                        <Text
                            fontSize="11px"
                            fontWeight="800"
                            color="white"
                            textAlign="center"
                            letterSpacing="0.2em"
                            opacity={0.6}
                        >
                            BRAINLIFE PIPELINE
                        </Text>
                        <Box h="10px" />
                    </Box>

                    {/* Side Chassis Panels */}
                    <Box
                        position="absolute"
                        top="20px"
                        bottom="20px"
                        left="-18px"
                        w="36px"
                        bg="#1e293b"
                        borderLeft="1px solid rgba(255,255,255,0.2)"
                        style={{ transform: 'rotateY(-90deg)' }}
                    />
                    <Box
                        position="absolute"
                        top="20px"
                        bottom="20px"
                        right="-18px"
                        w="36px"
                        bg="#1e293b"
                        borderRight="1px solid rgba(255,255,255,0.2)"
                        style={{ transform: 'rotateY(90deg)' }}
                    />
                </Box>
            </Box>

            {/* SWEEPING HORIZONTAL TRACK (.workflow-horizontal-wrapper style) */}
            <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                display="flex"
                alignItems="center"
                zIndex={5}
                pointerEvents="none"
            >
                <Box
                    ref={wrapperRef}
                    display="flex"
                    flexDirection="row"
                    flexWrap="nowrap"
                    alignItems="center"
                    w={`${pipelineSteps.length * 100}vw`}
                    minW={`${pipelineSteps.length * 100}vw`}
                    willChange="transform"
                >
                    {pipelineSteps.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isDesktopStep = Boolean(step.image);

                        return (
                            <Box
                                key={step.step}
                                w="100vw"
                                minW="100vw"
                                maxW="100vw"
                                h="100vh"
                                flexShrink={0}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                px={{ base: '16px', md: '40px', xl: '80px' }}
                                pt="90px"
                                pb="60px"
                                position="relative"
                                overflow="hidden"
                            >
                                {/* Sweeping Giant Typography Keyword */}
                                <Text
                                    fontSize={{ base: '50px', sm: '90px', md: '130px' }}
                                    fontWeight={900}
                                    fontFamily="'Work Sans', sans-serif"
                                    color={step.accentColor}
                                    opacity={0.07}
                                    letterSpacing="-0.05em"
                                    lineHeight="0.8"
                                    userSelect="none"
                                    position="absolute"
                                    top="110px"
                                    left="5%"
                                    zIndex={1}
                                >
                                    {step.keyword}
                                </Text>

                                {/* Stage Layout Decision: Desktop Window (1-3 & 6) vs Smartphone Info (4-5) */}
                                {isDesktopStep ? (
                                    <Flex
                                        direction={{ base: 'column', lg: 'row' }}
                                        align="center"
                                        justify="center"
                                        gap={{ base: '20px', lg: '36px' }}
                                        maxW="1360px"
                                        mx="auto"
                                        w="100%"
                                        h="100%"
                                        maxH="calc(100vh - 140px)"
                                        position="relative"
                                        zIndex={15}
                                        pointerEvents="auto"
                                        pt={{ base: '40px', lg: '20px' }}
                                    >
                                        {/* Left Info Card */}
                                        <Box
                                            w={{ base: '100%', lg: '380px' }}
                                            flexShrink={0}
                                            bg="rgba(15, 23, 42, 0.88)"
                                            border="1.5px solid rgba(92, 197, 216, 0.35)"
                                            borderRadius="24px"
                                            p={{ base: '22px', md: '32px' }}
                                            backdropFilter="blur(20px)"
                                            boxShadow="0 30px 70px rgba(0,0,0,0.7), 0 0 30px rgba(92, 197, 216, 0.12)"
                                        >
                                            <Flex align="center" gap="12px" mb="14px">
                                                <Flex
                                                    w="40px"
                                                    h="40px"
                                                    borderRadius="12px"
                                                    bg="rgba(92, 197, 216, 0.15)"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <StepIcon size={22} color="#5cc5d8" />
                                                </Flex>
                                                <Badge
                                                    bg="rgba(255,255,255,0.08)"
                                                    color="white"
                                                    fontSize="12px"
                                                    px="10px"
                                                    py="4px"
                                                    borderRadius="6px"
                                                    fontWeight="800"
                                                >
                                                    STAGE {step.step}
                                                </Badge>
                                            </Flex>

                                            <Heading
                                                fontSize={{ base: '20px', md: '26px' }}
                                                color="white"
                                                fontFamily="'Work Sans', sans-serif"
                                                mb="10px"
                                                lineHeight="1.2"
                                            >
                                                {step.title}
                                            </Heading>
                                            <Text
                                                fontSize={{ base: '13px', md: '14px' }}
                                                color="rgba(255,255,255,0.75)"
                                                mb="20px"
                                                lineHeight="1.6"
                                            >
                                                {step.subtitle}
                                            </Text>

                                            <Flex gap="8px" wrap="wrap">
                                                {step.badges.map((b) => (
                                                    <Badge
                                                        key={b}
                                                        bg="rgba(255,255,255,0.08)"
                                                        color="rgba(255,255,255,0.85)"
                                                        fontSize="11px"
                                                        borderRadius="6px"
                                                        px="8px"
                                                        py="4px"
                                                        fontWeight="600"
                                                    >
                                                        {b}
                                                    </Badge>
                                                ))}
                                            </Flex>
                                        </Box>

                                        {/* Right Desktop Application Window Preview */}
                                        <Box
                                            flex={1}
                                            w="100%"
                                            minW={0}
                                            maxW={{ base: '100%', lg: '880px' }}
                                            h="100%"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <Box
                                                className="desktop-app-window"
                                                w="100%"
                                                bg="#0a0f1d"
                                                borderRadius="20px"
                                                border="1.5px solid rgba(92, 197, 216, 0.35)"
                                                boxShadow="0 35px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(92, 197, 216, 0.15)"
                                                overflow="hidden"
                                                transition="all 0.3s ease"
                                                style={{
                                                    transformOrigin: 'center center',
                                                    willChange: 'transform, opacity',
                                                }}
                                            >
                                                {/* macOS Top Bar */}
                                                <Flex
                                                    bg="#060913"
                                                    px="16px"
                                                    py="10px"
                                                    align="center"
                                                    justify="space-between"
                                                    borderBottom="1px solid rgba(255,255,255,0.08)"
                                                >
                                                    <Flex align="center" gap="8px">
                                                        <Box w="10px" h="10px" borderRadius="full" bg="#ef4444" />
                                                        <Box w="10px" h="10px" borderRadius="full" bg="#eab308" />
                                                        <Box w="10px" h="10px" borderRadius="full" bg="#22c55e" />
                                                        <Text
                                                            fontSize="12px"
                                                            color="rgba(255,255,255,0.5)"
                                                            ml="12px"
                                                            fontFamily="monospace"
                                                            fontWeight="600"
                                                        >
                                                            {step.urlPath}
                                                        </Text>
                                                    </Flex>
                                                    <Badge
                                                        bg="rgba(255,255,255,0.08)"
                                                        color="rgba(255,255,255,0.7)"
                                                        fontSize="10px"
                                                        px="8px"
                                                        py="3px"
                                                        borderRadius="4px"
                                                    >
                                                        DESKTOP INTERFACE
                                                    </Badge>
                                                </Flex>

                                                {/* Image Content */}
                                                <Image
                                                    src={step.image}
                                                    alt={step.title}
                                                    w="100%"
                                                    h={{ base: '260px', sm: '360px', md: '480px', lg: '560px' }}
                                                    objectFit={step.step === '06' ? 'contain' : 'cover'}
                                                    objectPosition={step.step === '06' ? 'center' : 'top left'}
                                                    bg={step.step === '06' ? '#000' : 'transparent'}
                                                />
                                            </Box>
                                        </Box>
                                    </Flex>
                                ) : (
                                    /* Steps 4 & 5: Smartphone occupies center stage, Info Card floats on side */
                                    <Box
                                        maxW={{ base: '300px', sm: '360px', md: '380px' }}
                                        bg="rgba(15, 23, 42, 0.85)"
                                        border="1.5px solid rgba(92, 197, 216, 0.35)"
                                        borderRadius="24px"
                                        p={{ base: '20px', md: '26px' }}
                                        backdropFilter="blur(20px)"
                                        boxShadow="0 25px 60px rgba(0,0,0,0.6), 0 0 25px rgba(92, 197, 216, 0.12)"
                                        zIndex={15}
                                        pointerEvents="auto"
                                        ml={{ base: '0', md: idx === 3 ? '5%' : '55%' }}
                                        mt={{ base: '140px', md: '0' }}
                                    >
                                        <Flex align="center" gap="10px" mb="12px">
                                            <Flex
                                                w="34px"
                                                h="34px"
                                                borderRadius="10px"
                                                bg="rgba(92, 197, 216, 0.15)"
                                                align="center"
                                                justify="center"
                                            >
                                                <StepIcon size={18} color="#5cc5d8" />
                                            </Flex>
                                            <Badge
                                                bg="rgba(255,255,255,0.06)"
                                                color="white"
                                                fontSize="11px"
                                                px="8px"
                                                py="3px"
                                                borderRadius="6px"
                                            >
                                                STAGE {step.step}
                                            </Badge>
                                        </Flex>

                                        <Heading size="md" color="white" fontFamily="'Work Sans', sans-serif" mb="6px">
                                            {step.title}
                                        </Heading>
                                        <Text fontSize="12px" color="rgba(255,255,255,0.65)" mb="16px" lineHeight="1.5">
                                            {step.subtitle}
                                        </Text>

                                        <Flex gap="6px" wrap="wrap">
                                            {step.badges.map((b) => (
                                                <Badge
                                                    key={b}
                                                    bg="rgba(255,255,255,0.05)"
                                                    color="rgba(255,255,255,0.7)"
                                                    fontSize="10px"
                                                    borderRadius="4px"
                                                    px="6px"
                                                    py="2px"
                                                >
                                                    {b}
                                                </Badge>
                                            ))}
                                        </Flex>
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* Bottom Progress Bar */}
            <Box
                position="absolute"
                bottom="20px"
                left="0"
                right="0"
                maxW="1440px"
                mx="auto"
                px={{ base: '20px', md: '40px' }}
                zIndex={20}
            >
                <Flex justify="space-between" align="center">
                    <Flex gap="8px">
                        {pipelineSteps.map((st, i) => (
                            <Box
                                key={st.step}
                                w="36px"
                                h="4px"
                                borderRadius="full"
                                bg={i === activeStageIndex ? st.accentColor : 'rgba(255,255,255,0.2)'}
                                transition="all 0.3s ease"
                            />
                        ))}
                    </Flex>
                    <Text fontSize="11px" color="rgba(255,255,255,0.5)">
                        Scroll down to sweep pipeline stages (CREATE ➔ IMPORT ➔ PROCESS ➔ NOTIFY ➔ MOBILE VIZ ➔ DESKTOP
                        VIZ)
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}
