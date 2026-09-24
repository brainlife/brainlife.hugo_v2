'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Badge, Button, Image } from '@chakra-ui/react';
import { Sparkles, RotateCw, Layers, Menu, Bell, Zap, CheckCircle2, Wifi, Battery, Brain } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NiiVueViewer from '@/features/ProjectDataS3/components/NiiVueViewer';

import tractographyImg from '@/assets/landing/tractography.jpeg';
import brainImg from '@/assets/landing/hero_brain_transparent.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const getSrc = (img: any, fallback: string) => typeof img === 'string' ? img : img?.src || fallback;
const tractographyImgSrc = getSrc(tractographyImg, '/assets/landing/tractography.jpeg');
const brainImgSrc = getSrc(brainImg, '/assets/landing/hero_brain_transparent.png');


export interface TractItem {
    id: string;
    name: string;
    label: string;
    size: string;
    sizeBytes: number;
    color: string;
    url: string;
}

export const sampleCamcanTracts: TractItem[] = [
    {
        id: 'leftILF',
        name: 'leftILF.tck',
        label: 'Inferior Longitudinal Fasciculus (ILF)',
        size: '25 MB',
        sizeBytes: 26257040,
        color: '#3b82f6',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftILF.tck',
    },
    {
        id: 'leftCST',
        name: 'leftCST.tck',
        label: 'Corticospinal Tract (CST)',
        size: '10 MB',
        sizeBytes: 10406216,
        color: '#ef4444',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftCST.tck',
    },
    {
        id: 'leftArc',
        name: 'leftArc.tck',
        label: 'Arcuate Fasciculus (Arc)',
        size: '37 MB',
        sizeBytes: 37562276,
        color: '#10b981',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/leftArc.tck',
    },
    {
        id: 'forcepsMajor',
        name: 'forcepsMajor.tck',
        label: 'Forceps Major (Occipital Callosum)',
        size: '11 MB',
        sizeBytes: 11949116,
        color: '#f59e0b',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/forcepsMajor.tck',
    },
    {
        id: 'forcepsMinor',
        name: 'forcepsMinor.tck',
        label: 'Forceps Minor (Frontal Callosum)',
        size: '29 MB',
        sizeBytes: 29156120,
        color: '#8b5cf6',
        url: 'https://brainlife.io/api/warehouse/pub/6a014fb3ea4d9f77d878b3cf/viz-data/1/0/forcepsMinor.tck',
    },
];

// Brainlife Native Mobile UI Component
function BrainlifeMobileUI({ onSwitchTo3D }: { onSwitchTo3D?: () => void }) {
    return (
        <Box
            w="100%"
            h="100%"
            bg="#090e18"
            color="white"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="16px 14px 10px 14px"
            overflow="hidden"
            fontFamily="'Work Sans', sans-serif"
            userSelect="none"
        >
            {/* Top Phone Status Bar */}
            <Flex justify="space-between" align="center" pt="2px" px="4px" mb="12px" zIndex={35}>
                <Text fontSize="12px" fontWeight="700" color="white" letterSpacing="-0.02em">
                    23:22
                </Text>

                <Flex align="center" gap="5px" color="rgba(255,255,255,0.9)">
                    <Text fontSize="9px" fontWeight="700">••••</Text>
                    <Wifi size={11} />
                    <Battery size={13} />
                </Flex>
            </Flex>

            {/* App Navigation Bar */}
            <Flex align="center" justify="space-between" mb="14px" px="2px" zIndex={20}>
                <Box p="6px" borderRadius="10px" bg="rgba(255,255,255,0.06)" cursor="pointer">
                    <Menu size={18} color="white" />
                </Box>

                <Text fontSize="18px" fontWeight="900" letterSpacing="-0.04em" color="white">
                    brainlife
                </Text>

                <Box p="6px" borderRadius="10px" bg="rgba(255,255,255,0.06)" position="relative" cursor="pointer">
                    <Bell size={18} color="white" />
                    <Box position="absolute" top="5px" right="5px" w="6px" h="6px" borderRadius="full" bg="#38bdf8" />
                </Box>
            </Flex>

            {/* Scrollable Content Body */}
            <Box flex="1" overflowY="auto" css={{ '&::-webkit-scrollbar': { display: 'none' } }} pr="2px">
                {/* Empowering Neuroimaging Gradient Banner */}
                <Box
                    borderRadius="16px"
                    bg="linear-gradient(100deg, #38bdf8 0%, #34d399 100%)"
                    p="14px 16px"
                    mb="14px"
                    boxShadow="0 10px 25px rgba(56, 189, 248, 0.25)"
                    color="#090e18"
                >
                    <Flex align="center" gap="10px">
                        <Flex
                            w="32px"
                            h="32px"
                            borderRadius="10px"
                            bg="rgba(9, 14, 24, 0.15)"
                            align="center"
                            justify="center"
                            flexShrink={0}
                        >
                            <Zap size={18} color="#090e18" fill="#090e18" />
                        </Flex>

                        <Box overflow="hidden">
                            <Text fontSize="14px" fontWeight="900" lineHeight="1.2" letterSpacing="-0.02em">
                                Empowering Neuroimaging
                            </Text>
                            <Text fontSize="11px" fontWeight="600" opacity={0.85}>
                                On-the-Go
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Instances Metric Card */}
                <Box
                    bg="rgba(15, 23, 42, 0.85)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    borderRadius="20px"
                    p="14px"
                    mb="14px"
                    backdropFilter="blur(10px)"
                >
                    <Text fontSize="13px" fontWeight="800" textAlign="center" color="white" mb="12px" lineHeight="1.3">
                        Instances metric for<br />
                        <Text as="span" color="#38bdf8">brainlife_mobile_2</Text>
                    </Text>

                    {/* Circular Progress Gauge */}
                    <Flex justify="center" align="center" my="6px" position="relative">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle cx="60" cy="60" r="48" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="10" fill="none" />
                            <circle
                                cx="60"
                                cy="60"
                                r="48"
                                stroke="url(#gaugeGrad)"
                                strokeWidth="10"
                                strokeDasharray="301"
                                strokeDashoffset="108"
                                strokeLinecap="round"
                                fill="none"
                                transform="rotate(-90 60 60)"
                            />
                            <defs>
                                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#38bdf8" />
                                    <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <Flex position="absolute" direction="column" align="center">
                            <Text fontSize="20px" fontWeight="900" color="white" lineHeight="1">
                                64%
                            </Text>
                            <Text fontSize="10px" color="rgba(255,255,255,0.6)" fontWeight="600">
                                Finished
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Status Dot Breakdown */}
                    <Flex justify="space-between" align="center" pt="10px" px="4px">
                        <Flex direction="column" align="center">
                            <Box w="7px" h="7px" borderRadius="full" bg="#22c55e" mb="4px" />
                            <Text fontSize="11px" fontWeight="800">9</Text>
                            <Text fontSize="8px" color="rgba(255,255,255,0.5)">Finished</Text>
                        </Flex>

                        <Flex direction="column" align="center">
                            <Box w="7px" h="7px" borderRadius="full" bg="#3b82f6" mb="4px" />
                            <Text fontSize="11px" fontWeight="800">0</Text>
                            <Text fontSize="8px" color="rgba(255,255,255,0.5)">Running</Text>
                        </Flex>

                        <Flex direction="column" align="center">
                            <Box w="7px" h="7px" borderRadius="full" bg="#eab308" mb="4px" />
                            <Text fontSize="11px" fontWeight="800">0</Text>
                            <Text fontSize="8px" color="rgba(255,255,255,0.5)">Requested</Text>
                        </Flex>

                        <Flex direction="column" align="center">
                            <Box w="7px" h="7px" borderRadius="full" bg="#ef4444" mb="4px" />
                            <Text fontSize="11px" fontWeight="800">5</Text>
                            <Text fontSize="8px" color="rgba(255,255,255,0.5)">Failed</Text>
                        </Flex>

                        <Flex direction="column" align="center">
                            <Box w="7px" h="7px" borderRadius="full" bg="#cbd5e1" mb="4px" />
                            <Text fontSize="11px" fontWeight="800">0</Text>
                            <Text fontSize="8px" color="rgba(255,255,255,0.5)">Stopped</Text>
                        </Flex>
                    </Flex>
                </Box>

                {/* Active Processes Section */}
                <Box mb="10px">
                    <Flex justify="space-between" align="center" mb="8px" px="2px">
                        <Text fontSize="14px" fontWeight="800" color="white">
                            Active Processes
                        </Text>
                        <Text fontSize="11px" fontWeight="700" color="#38bdf8" cursor="pointer">
                            See All
                        </Text>
                    </Flex>

                    {/* Process Card 1 */}
                    <Box
                        bg="rgba(15, 23, 42, 0.85)"
                        border="1px solid rgba(255, 255, 255, 0.08)"
                        borderRadius="16px"
                        p="12px"
                        mb="8px"
                    >
                        <Flex align="center" gap="8px" mb="4px">
                            <CheckCircle2 size={16} color="#22c55e" />
                            <Text fontSize="13px" fontWeight="800" color="white">
                                Stage from archive
                            </Text>
                        </Flex>
                        <Text fontSize="11px" color="rgba(255,255,255,0.5)" mb="8px">
                            brainlife/app-stage
                        </Text>

                        <Flex justify="space-between" borderTop="1px solid rgba(255,255,255,0.06)" pt="8px">
                            <Box>
                                <Text fontSize="9px" color="rgba(255,255,255,0.4)" fontWeight="700">Requested</Text>
                                <Text fontSize="10px" color="rgba(255,255,255,0.8)">16/06/2026, 19:58:01</Text>
                            </Box>
                            <Box textAlign="right">
                                <Text fontSize="9px" color="rgba(255,255,255,0.4)" fontWeight="700">Finished</Text>
                                <Text fontSize="10px" color="rgba(255,255,255,0.8)">16/06/2026, 19:58:14</Text>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Box>

            {/* Switch to 3D WebGL Tractography Action Button */}
            {onSwitchTo3D && (
                <Button
                    onClick={onSwitchTo3D}
                    size="xs"
                    w="100%"
                    bg="rgba(56, 189, 248, 0.15)"
                    color="#38bdf8"
                    border="1px solid rgba(56, 189, 248, 0.3)"
                    _hover={{ bg: 'rgba(56, 189, 248, 0.3)', color: 'white' }}
                    borderRadius="10px"
                    py="14px"
                    fontSize="11px"
                    fontWeight="800"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="6px"
                    mb="4px"
                >
                    <Layers size={13} />
                    LAUNCH 3D LIVE TRACTOGRAPHY VIEWER
                </Button>
            )}

            {/* Bottom Home Bar Indicator */}
            <Flex justify="center" pt="2px">
                <Box w="100px" h="4px" borderRadius="full" bg="rgba(255,255,255,0.6)" />
            </Flex>
        </Box>
    );
}

// Single 3D Extruded Phone Device Component
function Extruded3DPhoneDevice({
    selectedIds,
    isSecondary = false,
    viewMode = 'mobile_ui',
    onToggleViewMode,
}: {
    selectedIds: string[];
    isSecondary?: boolean;
    viewMode?: 'mobile_ui' | '3d_webgl';
    onToggleViewMode?: () => void;
}) {
    return (
        <Box
            position="relative"
            w={{ base: '280px', sm: '330px', md: '400px' }}
            h={{ base: '480px', sm: '540px', md: '600px' }}
            willChange="transform"
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {/* FRONT FACE (Screen Display, Notch, Glass Border) */}
            <Box
                position="absolute"
                inset={0}
                borderRadius="44px"
                bg="#080c14"
                border="3.5px solid rgba(255, 255, 255, 0.3)"
                boxShadow="0 30px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(92, 197, 216, 0.25), inset 0 0 2px rgba(255, 255, 255, 0.4)"
                overflow="hidden"
                style={{
                    transform: 'translateZ(18px)',
                    backfaceVisibility: 'hidden',
                }}
            >
                {/* Dynamic Island Notch */}
                <Flex
                    position="absolute"
                    top="12px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="110px"
                    h="22px"
                    bg="#000"
                    borderRadius="full"
                    zIndex={35}
                    align="center"
                    justify="space-between"
                    px="10px"
                    border="1px solid rgba(255,255,255,0.1)"
                >
                    <Box w="8px" h="8px" borderRadius="full" bg="#1e293b" border="1px solid #334155" />
                    <Box w="36px" h="4px" borderRadius="full" bg="#1e293b" />
                </Flex>

                {/* Phone Screen: Render Instant Native Mobile UI or 3D WebGL Canvas */}
                <Box position="relative" w="100%" h="100%" bg="#000">
                    {viewMode === 'mobile_ui' || isSecondary ? (
                        <BrainlifeMobileUI onSwitchTo3D={onToggleViewMode} />
                    ) : (
                        <NiiVueViewer
                            fileUrl="https://niivue.github.io/niivue-demo-images/mni152.nii.gz"
                            fileName="sub-01_T1w_anatomical.nii.gz"
                            meshCollectionLabel="Tracts"
                            hideSidebar={true}
                            meshSources={sampleCamcanTracts
                                .filter((t) => selectedIds.includes(t.id))
                                .map((t) => ({
                                    name: t.name,
                                    url: t.url,
                                    size: t.sizeBytes,
                                }))}
                        />
                    )}
                </Box>
            </Box>

            {/* BACK FACE (Matte Metallic Back Enclosure & Camera Module) */}
            <Box
                position="absolute"
                inset={0}
                borderRadius="44px"
                bg="linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #020617 100%)"
                border="3.5px solid rgba(255, 255, 255, 0.2)"
                boxShadow="inset 0 0 30px rgba(0, 0, 0, 0.8)"
                p="24px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                style={{
                    transform: 'translateZ(-18px) rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                }}
            >
                {/* Triple Camera Module Island */}
                <Box
                    w="110px"
                    h="110px"
                    borderRadius="28px"
                    bg="rgba(15, 23, 42, 0.9)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    boxShadow="0 10px 25px rgba(0,0,0,0.6)"
                    p="12px"
                    display="grid"
                    gridTemplateColumns="1fr 1fr"
                    gap="8px"
                    alignItems="center"
                    justifyItems="center"
                >
                    <Box w="34px" h="34px" borderRadius="full" bg="#090d16" border="3px solid #334155" display="flex" alignItems="center" justifyContent="center">
                        <Box w="12px" h="12px" borderRadius="full" bg="#1e293b" border="1px solid #5cc5d8" />
                    </Box>
                    <Box w="34px" h="34px" borderRadius="full" bg="#090d16" border="3px solid #334155" display="flex" alignItems="center" justifyContent="center">
                        <Box w="12px" h="12px" borderRadius="full" bg="#1e293b" border="1px solid #8b5cf6" />
                    </Box>
                    <Box w="34px" h="34px" borderRadius="full" bg="#090d16" border="3px solid #334155" display="flex" alignItems="center" justifyContent="center">
                        <Box w="12px" h="12px" borderRadius="full" bg="#1e293b" border="1px solid #34d399" />
                    </Box>
                    <Box w="14px" h="14px" borderRadius="full" bg="rgba(255,255,255,0.8)" boxShadow="0 0 10px white" />
                </Box>

                {/* Back Metallic Brainlife Logo */}
                <Flex direction="column" align="center" justify="center" opacity={0.65} gap="6px">
                    <Text fontSize="12px" fontWeight="800" color="white" letterSpacing="0.2em" textTransform="uppercase">
                        BRAINLIFE Mobile App
                    </Text>
                </Flex>

                <Box h="20px" />
            </Box>

            {/* LEFT SIDE CHASSIS PANEL (Extruded 3D Thickness - 36px Depth) */}
            <Box
                position="absolute"
                top="24px"
                bottom="24px"
                left="-18px"
                w="36px"
                bg="linear-gradient(to right, #0f172a, #334155, #0f172a)"
                borderLeft="1px solid rgba(255,255,255,0.2)"
                borderRight="1px solid rgba(255,255,255,0.2)"
                borderRadius="4px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="18px"
                style={{
                    transformOrigin: 'center center',
                    transform: 'rotateY(-90deg)',
                }}
            >
                <Box w="6px" h="32px" borderRadius="full" bg="#64748b" boxShadow="0 0 4px rgba(0,0,0,0.8)" />
                <Box w="6px" h="32px" borderRadius="full" bg="#64748b" boxShadow="0 0 4px rgba(0,0,0,0.8)" />
                <Box w="6px" h="18px" borderRadius="full" bg="#475569" boxShadow="0 0 4px rgba(0,0,0,0.8)" />
            </Box>

            {/* RIGHT SIDE CHASSIS PANEL (Extruded 3D Thickness - 36px Depth) */}
            <Box
                position="absolute"
                top="24px"
                bottom="24px"
                right="-18px"
                w="36px"
                bg="linear-gradient(to right, #0f172a, #334155, #0f172a)"
                borderLeft="1px solid rgba(255,255,255,0.2)"
                borderRight="1px solid rgba(255,255,255,0.2)"
                borderRadius="4px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    transformOrigin: 'center center',
                    transform: 'rotateY(90deg)',
                }}
            >
                <Box w="6px" h="48px" borderRadius="full" bg="#64748b" boxShadow="0 0 4px rgba(0,0,0,0.8)" />
            </Box>

            {/* TOP CHASSIS PANEL */}
            <Box
                position="absolute"
                top="-18px"
                left="24px"
                right="24px"
                h="36px"
                bg="linear-gradient(to bottom, #1e293b, #0f172a)"
                borderRadius="4px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="20px"
                style={{
                    transformOrigin: 'center center',
                    transform: 'rotateX(90deg)',
                }}
            >
                <Box w="4px" h="100%" bg="#0f172a" />
                <Box w="4px" h="100%" bg="#0f172a" />
            </Box>

            {/* BOTTOM CHASSIS PANEL */}
            <Box
                position="absolute"
                bottom="-18px"
                left="24px"
                right="24px"
                h="36px"
                bg="linear-gradient(to top, #1e293b, #0f172a)"
                borderRadius="4px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="14px"
                style={{
                    transformOrigin: 'center center',
                    transform: 'rotateX(-90deg)',
                }}
            >
                <Box w="16px" h="6px" borderRadius="full" bg="#020617" border="1px solid #334155" />
                <Box w="22px" h="8px" borderRadius="full" bg="#020617" border="1px solid #5cc5d8" />
                <Box w="16px" h="6px" borderRadius="full" bg="#020617" border="1px solid #334155" />
            </Box>
        </Box>
    );
}

export default function ScrollTractographySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const t1CardRef = useRef<HTMLDivElement>(null);
    const tractCardRef = useRef<HTMLDivElement>(null);
    const phoneStageRef = useRef<HTMLDivElement>(null);
    const mainPhoneRef = useRef<HTMLDivElement>(null);
    const cascadeContainerRef = useRef<HTMLDivElement>(null);

    const [selectedIds, setSelectedIds] = useState<string[]>([sampleCamcanTracts[0].id]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [viewMode, setViewMode] = useState<'mobile_ui' | '3d_webgl'>('mobile_ui');
    const [currentStepTitle, setCurrentStepTitle] = useState('Structural T1 Anatomical Volume');

    const CASCADE_COUNT = 7;

    // Sequential ScrollTrigger Storyline Setup
    useEffect(() => {
        const section = sectionRef.current;
        const t1Card = t1CardRef.current;
        const tractCard = tractCardRef.current;
        const phoneStage = phoneStageRef.current;
        const mainPhone = mainPhoneRef.current;
        const cascadeContainer = cascadeContainerRef.current;
        if (!section || !t1Card || !tractCard || !phoneStage || !mainPhone) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                const mainTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: '+=4600',
                        pin: true,
                        scrub: 0.8,
                        onUpdate: (self) => {
                            const p = self.progress;
                            setScrollProgress(p);

                            // Dynamically update section subtitle badge based on active scroll stage
                            if (p < 0.25) {
                                setCurrentStepTitle('Stage 1: Structural T1 Anatomical Volume');
                            } else if (p < 0.5) {
                                setCurrentStepTitle('Stage 2: 3D White Matter Tractography');
                            } else if (p < 0.8) {
                                setCurrentStepTitle('Stage 3: 360° Brainlife Mobile App Showcase');
                            } else {
                                setCurrentStepTitle('Stage 4: Multi-Device Connectomics Network');
                            }

                            if (p >= 0.25) {
                                const activeProgress = Math.min(1, Math.max(0, (p - 0.25) / 0.65));
                                const countToEnable = Math.max(1, Math.ceil(activeProgress * sampleCamcanTracts.length));
                                const activeTractIds = sampleCamcanTracts.slice(0, countToEnable).map((t) => t.id);
                                setSelectedIds(activeTractIds);
                            }
                        },
                    },
                });

                // STAGE 1 (0.00 - 0.25 Scroll): T1 Anatomical Image Zooms in & Fades Out
                mainTl.fromTo(
                    t1Card,
                    { opacity: 1, scale: 0.85, y: 0 },
                    {
                        opacity: 0,
                        scale: 1.35,
                        y: -30,
                        duration: 0.25,
                        ease: 'power2.inOut',
                    },
                    0
                );

                // STAGE 2 (0.25 - 0.50 Scroll): 3D Tractography Image Zooms in & Fades Out
                mainTl.fromTo(
                    tractCard,
                    { opacity: 0, scale: 0.85, y: 40 },
                    {
                        opacity: 1,
                        scale: 1.05,
                        y: 0,
                        duration: 0.12,
                        ease: 'power2.out',
                    },
                    0.24
                );
                mainTl.to(
                    tractCard,
                    {
                        opacity: 0,
                        scale: 1.35,
                        y: -30,
                        duration: 0.14,
                        ease: 'power2.in',
                    },
                    0.36
                );

                // STAGE 3 (0.50 - 0.80 Scroll): 3D Smartphone Device Enters & Performs 360° Y-Spin
                mainTl.fromTo(
                    phoneStage,
                    { opacity: 0, scale: 0.7, y: 60 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.12,
                        ease: 'power2.out',
                    },
                    0.48
                );

                mainTl.fromTo(
                    mainPhone,
                    { rotateY: 0 },
                    {
                        rotateY: 360,
                        duration: 0.3,
                        ease: 'none',
                    },
                    0.5
                );

                // STAGE 4 (0.80 - 0.95 Scroll): Multi-Phone Row Duplication Cascade
                if (cascadeContainer) {
                    const cascadeChildren = Array.from(cascadeContainer.children) as HTMLElement[];
                    cascadeChildren.forEach((child, idx) => {
                        const step = idx + 1;
                        mainTl.fromTo(
                            child,
                            {
                                x: 0,
                                z: 0,
                                opacity: 0,
                                rotateY: 0,
                                scale: 1,
                            },
                            {
                                x: -step * 95,
                                z: -step * 120,
                                opacity: 1 - step * 0.08,
                                rotateY: -12,
                                scale: 1 - step * 0.04,
                                duration: 0.12,
                                ease: 'power2.out',
                            },
                            0.78 + idx * 0.015
                        );
                    });

                    // Collapse Cascade Row Back into Main Phone
                    cascadeChildren.forEach((child, idx) => {
                        mainTl.to(
                            child,
                            {
                                x: 0,
                                z: 0,
                                opacity: 0,
                                rotateY: 0,
                                scale: 1,
                                duration: 0.1,
                                ease: 'power2.in',
                            },
                            0.9 + idx * 0.01
                        );
                    });
                }
            }, sectionRef);
        }, 150);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    const toggleViewMode = () => {
        setViewMode((prev) => (prev === 'mobile_ui' ? '3d_webgl' : 'mobile_ui'));
    };

    const rotateDegree = Math.round(scrollProgress * 360);

    return (
        <Box
            ref={sectionRef}
            position="relative"
            w="100%"
            h="100vh"
            bg="radial-gradient(ellipse at 50% 30%, #0d1527 0%, #04070d 75%)"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            py={{ base: '20px', md: '36px' }}
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

            {/* Top Bar Header & Metadata */}
            <Box maxW="1440px" w="100%" mx="auto" px={{ base: '16px', md: '40px' }} zIndex={10}>
                <Flex justify="space-between" align="center" wrap="wrap" gap="16px">
                    <Box maxW="720px">
                        <Box
                            display="inline-flex"
                            alignItems="center"
                            gap="6px"
                            px="12px"
                            py="4px"
                            borderRadius="full"
                            bg="rgba(92, 197, 216, 0.12)"
                            border="1px solid rgba(92, 197, 216, 0.35)"
                            color="#5cc5d8"
                            fontSize="11px"
                            fontWeight="800"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            fontFamily="'Work Sans', sans-serif"
                            mb="8px"
                        >
                            <Sparkles size={13} />
                            Sequential Scroll Storytelling
                        </Box>

                        <Text
                            fontSize={{ base: '22px', md: '32px' }}
                            fontWeight={800}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.03em"
                            lineHeight="1.15"
                        >
                            {currentStepTitle}
                        </Text>
                    </Box>

                    {/* View Switcher Pill & Rotation Counter */}
                    <Flex align="center" gap="10px" wrap="wrap">
                        <Button
                            onClick={toggleViewMode}
                            size="sm"
                            borderRadius="full"
                            bg={viewMode === 'mobile_ui' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(139, 92, 246, 0.25)'}
                            color={viewMode === 'mobile_ui' ? '#38bdf8' : '#a78bfa'}
                            border={viewMode === 'mobile_ui' ? '1px solid #38bdf8' : '1px solid #a78bfa'}
                            backdropFilter="blur(12px)"
                            px="16px"
                            fontSize="12px"
                            fontWeight="800"
                            display="flex"
                            gap="6px"
                        >
                            <Layers size={13} />
                            Mode: {viewMode === 'mobile_ui' ? 'Native Mobile UI' : '3D Live WebGL'}
                        </Button>

                        <Badge
                            bg="rgba(15, 23, 42, 0.8)"
                            color="#5cc5d8"
                            border="1px solid rgba(92, 197, 216, 0.3)"
                            px="14px"
                            py="6px"
                            borderRadius="full"
                            fontSize="12px"
                            fontWeight="700"
                            backdropFilter="blur(12px)"
                            display="flex"
                            alignItems="center"
                            gap="6px"
                        >
                            <RotateCw size={13} />
                            Rotation: {rotateDegree}°
                        </Badge>
                    </Flex>
                </Flex>
            </Box>

            {/* Central Stage: Sequential Scroll Elements (T1 Image -> Tractography Image -> Mobile App) */}
            <Box
                position="relative"
                w="100%"
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                my="16px"
                zIndex={5}
                style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
            >
                {/* STAGE 1 CARD: Structural T1 Anatomical Brain Image (Zooms in & fades) */}
                <Box
                    ref={t1CardRef}
                    position="absolute"
                    w={{ base: '320px', sm: '460px', md: '580px' }}
                    bg="rgba(15, 23, 42, 0.85)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    borderRadius="24px"
                    p="16px"
                    boxShadow="0 30px 80px rgba(0,0,0,0.7), 0 0 30px rgba(245, 158, 11, 0.2)"
                    backdropFilter="blur(20px)"
                    zIndex={30}
                    willChange="transform, opacity"
                >
                    <Box borderRadius="16px" overflow="hidden" h={{ base: '220px', md: '340px' }} mb="14px" position="relative">
                        <Image src={brainImgSrc} alt="Structural T1 Anatomical Volume" w="100%" h="100%" objectFit="cover" />
                        <Box position="absolute" inset={0} bg="radial-gradient(circle, transparent 50%, rgba(15,23,42,0.8) 100%)" />
                    </Box>

                    <Flex justify="space-between" align="center">
                        <Box>
                            <Badge bg="rgba(245, 158, 11, 0.2)" color="#f59e0b" fontSize="10px" px="8px" py="3px" borderRadius="6px" mb="4px">
                                STAGE 1 — ANATOMICAL DISCOVERY
                            </Badge>
                            <Text fontSize="16px" fontWeight="800" color="white">
                                Structural T1 MRI Anatomical Volume
                            </Text>
                            <Text fontSize="12px" color="rgba(255,255,255,0.6)">
                                High-Resolution 3D Brain Mesh Segmentation
                            </Text>
                        </Box>

                        <Flex align="center" gap="6px" color="#f59e0b" fontSize="12px" fontWeight="700">
                            <Brain size={16} />
                            T1 MRI
                        </Flex>
                    </Flex>
                </Box>

                {/* STAGE 2 CARD: 3D White Matter Tractography Image (Zooms in & fades) */}
                <Box
                    ref={tractCardRef}
                    position="absolute"
                    w={{ base: '320px', sm: '460px', md: '580px' }}
                    bg="rgba(15, 23, 42, 0.85)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    borderRadius="24px"
                    p="16px"
                    boxShadow="0 30px 80px rgba(0,0,0,0.7), 0 0 30px rgba(56, 189, 248, 0.25)"
                    backdropFilter="blur(20px)"
                    zIndex={25}
                    opacity={0}
                    willChange="transform, opacity"
                >
                    <Box borderRadius="16px" overflow="hidden" h={{ base: '220px', md: '340px' }} mb="14px" position="relative">
                        <Image src={tractographyImgSrc} alt="3D White Matter Tractography" w="100%" h="100%" objectFit="cover" />
                        <Box position="absolute" inset={0} bg="radial-gradient(circle, transparent 50%, rgba(15,23,42,0.8) 100%)" />
                    </Box>

                    <Flex justify="space-between" align="center">
                        <Box>
                            <Badge bg="rgba(56, 189, 248, 0.2)" color="#38bdf8" fontSize="10px" px="8px" py="3px" borderRadius="6px" mb="4px">
                                STAGE 2 — FIBER TRACTOGRAPHY
                            </Badge>
                            <Text fontSize="16px" fontWeight="800" color="white">
                                3D White Matter Fiber Pathways
                            </Text>
                            <Text fontSize="12px" color="rgba(255,255,255,0.6)">
                                CamCAN Diffusion MRI Track Density Mapping
                            </Text>
                        </Box>

                        <Flex align="center" gap="6px" color="#38bdf8" fontSize="12px" fontWeight="700">
                            <Layers size={16} />
                            dMRI TDI
                        </Flex>
                    </Flex>
                </Box>

                {/* STAGE 3 & 4: 3D Smartphone Device + Cascade Row Duplication */}
                <Box
                    ref={phoneStageRef}
                    position="relative"
                    w="100%"
                    h="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity={0}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* CASCADE DUPLICATED PHONES ROW CONTAINER */}
                    <Box
                        ref={cascadeContainerRef}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        pointerEvents="none"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {Array.from({ length: CASCADE_COUNT }).map((_, idx) => (
                            <Box key={`cascade-phone-${idx}`} position="absolute" style={{ transformStyle: 'preserve-3d' }}>
                                <Extruded3DPhoneDevice selectedIds={selectedIds} isSecondary={true} viewMode="mobile_ui" />
                            </Box>
                        ))}
                    </Box>

                    {/* PRIMARY FRONT PHONE (Main Brainlife Mobile UI Device) */}
                    <Box
                        ref={mainPhoneRef}
                        position="relative"
                        zIndex={10}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Extruded3DPhoneDevice
                            selectedIds={selectedIds}
                            isSecondary={false}
                            viewMode={viewMode}
                            onToggleViewMode={toggleViewMode}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Bottom Info Bar */}
            <Box maxW="1440px" w="100%" mx="auto" px={{ base: '16px', md: '40px' }} zIndex={10}>
                <Flex justify="space-between" align="center" wrap="wrap" gap="12px">
                    <Text fontSize="11px" color="rgba(248, 250, 252, 0.6)" fontFamily="'Work Sans', sans-serif">
                        Scroll down to progress through: Structural T1 → 3D Tractography → 360° Native Mobile App.
                    </Text>

                    <Button
                        onClick={toggleViewMode}
                        size="xs"
                        bg="rgba(255,255,255,0.06)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.15)"
                        _hover={{ bg: 'rgba(56, 189, 248, 0.25)', color: '#38bdf8' }}
                        borderRadius="full"
                        px="12px"
                    >
                        TOGGLE MODE: {viewMode === 'mobile_ui' ? '3D WEBGL' : 'MOBILE DASHBOARD'}
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}
