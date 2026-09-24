'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Heading, Button, Image, Badge } from '@chakra-ui/react';
import { Play, Sparkles, SkipForward, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import tractographyImg from '@/assets/landing/tractography.jpeg';
import psOctImg from '@/assets/landing/ps-oct.png';
import microscopyImg from '@/assets/landing/microscopy.png';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const tractographyImgSrc = typeof tractographyImg === 'string' ? tractographyImg : (tractographyImg as any)?.src || '/assets/landing/tractography.jpeg';
const psOctImgSrc = typeof psOctImg === 'string' ? psOctImg : (psOctImg as any)?.src || '/assets/landing/ps-oct.png';
const microscopyImgSrc = typeof microscopyImg === 'string' ? microscopyImg : (microscopyImg as any)?.src || '/assets/landing/microscopy.png';

export const cmcReelTracks = [
    {
        id: 'dmri',
        title: 'dMRI Track Density Imaging',
        subtitle: 'Center for Mesoscale Connectomics — TDI Sagittal Streamlines',
        category: 'Diffusion MRI',
        poster: tractographyImgSrc,
        videoSrc: 'https://apex-connects.s3.us-east-2.amazonaws.com/CMC/Derivatives/movies/tdi_sagittal.mp4',
    },
    {
        id: 'psoct',
        title: 'PS-OCT 3D Volumetric Imaging',
        subtitle: 'Polarization-Sensitive Optical Coherence Tomography (3D Zarr)',
        category: 'PS-OCT Microscopy',
        poster: psOctImgSrc,
        videoSrc: 'https://apex-connects.s3.us-east-2.amazonaws.com/CMC/Derivatives/movies/3D_zarr_movie.mp4',
    },
    {
        id: 'axonal',
        title: 'Axonal Connectomics Architecture',
        subtitle: 'High-Resolution Axonal Track Fiber Mapping (PO11 S4)',
        category: 'Axonal Micro-Connectomics',
        poster: microscopyImgSrc,
        videoSrc: 'https://apex-connects.s3.us-east-2.amazonaws.com/axonal_connectomics/movies/Fig+3B+PO11+S4.mp4',
    },
];

export default function ExpandingReelSection() {
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    const activeTrack = cmcReelTracks[currentTrackIndex];

    useEffect(() => {
        const trigger = triggerRef.current;
        const container = containerRef.current;
        if (!trigger || !container) return;

        let ctx: gsap.Context;

        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                gsap.fromTo(
                    container,
                    {
                        width: '90%',
                        scale: 0.94,
                        borderRadius: '24px',
                        y: 30,
                        opacity: 0.85,
                    },
                    {
                        width: '100%',
                        scale: 1,
                        borderRadius: '16px',
                        y: 0,
                        opacity: 1,
                        ease: 'power1.out',
                        scrollTrigger: {
                            trigger: trigger,
                            start: 'top 85%',
                            end: 'top 35%',
                            scrub: 0.8,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }, triggerRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    // Play next video automatically when current video ends
    const handleVideoEnded = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % cmcReelTracks.length);
    };

    // Auto-play when switching tracks if player is already active
    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [currentTrackIndex, isPlaying]);

    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % cmcReelTracks.length);
    };

    return (
        <Box
            ref={triggerRef}
            minH="700px"
            py={{ base: '40px', md: '60px' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="relative"
            overflow="hidden"
            bg="transparent"
            borderTop="1px solid rgba(255, 255, 255, 0.05)"
        >
            <Box
                maxW="1280px"
                w="100%"
                px={{ base: '16px', md: '24px' }}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {/* Section Header with Stacked Faded Watermark */}
                <Box position="relative" textAlign="center" mb="28px">
                    <Text
                        fontSize={{ base: '50px', sm: '70px', md: '95px' }}
                        fontWeight={900}
                        color="rgba(255, 255, 255, 0.08)"
                        letterSpacing="-0.04em"
                        lineHeight="0.85"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        pointerEvents="none"
                    >
                        Connectomics
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '34px', md: '44px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.03em"
                        mt={{ base: '-16px', sm: '-22px', md: '-28px' }}
                        mb="10px"
                    >
                        Mesoscale Showreel
                    </Heading>
                    <Text
                        fontSize={{ base: '14px', md: '15.5px' }}
                        color="rgba(255, 255, 255, 0.65)"
                        fontFamily="'Work Sans', sans-serif"
                        maxW="640px"
                        mx="auto"
                    >
                        Center for Mesoscale Connectomics (CMC) multi-modal imaging and axonal architecture.
                    </Text>
                </Box>

                {/* Modality Track Selector Pills */}
                <Flex gap="10px" wrap="wrap" justify="center" mb="24px">
                    {cmcReelTracks.map((track, idx) => {
                        const isActive = idx === currentTrackIndex;
                        return (
                            <Button
                                key={track.id}
                                onClick={() => {
                                    setCurrentTrackIndex(idx);
                                    setIsPlaying(true);
                                }}
                                size="sm"
                                borderRadius="full"
                                bg={isActive ? 'rgba(92, 197, 216, 0.25)' : 'rgba(15, 23, 42, 0.6)'}
                                color={isActive ? '#5cc5d8' : 'rgba(255, 255, 255, 0.65)'}
                                border={isActive ? '1px solid #5cc5d8' : '1px solid rgba(255, 255, 255, 0.1)'}
                                backdropFilter="blur(12px)"
                                px="16px"
                                py="6px"
                                fontSize="12px"
                                fontWeight="700"
                                fontFamily="'Work Sans', sans-serif"
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: 'rgba(92, 197, 216, 0.35)',
                                    color: 'white',
                                }}
                                display="flex"
                                gap="8px"
                            >
                                <Box
                                    w="6px"
                                    h="6px"
                                    borderRadius="full"
                                    bg={isActive ? '#5cc5d8' : 'rgba(255, 255, 255, 0.3)'}
                                    boxShadow={isActive ? '0 0 8px #5cc5d8' : 'none'}
                                />
                                {track.category}
                            </Button>
                        );
                    })}
                </Flex>

                {/* Expanding Video Container */}
                <Box
                    ref={containerRef}
                    w="100%"
                    h={{ base: '320px', md: '540px', lg: '620px' }}
                    position="relative"
                    overflow="hidden"
                    boxShadow="0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    bg="#090d16"
                    willChange="transform, width, height"
                >
                    {!isPlaying ? (
                        <>
                            {/* Poster Image */}
                            <Image
                                key={activeTrack.id}
                                src={activeTrack.poster}
                                alt={activeTrack.title}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                            <Box
                                position="absolute"
                                inset={0}
                                bg="linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 100%)"
                            />

                            {/* Center PLAY REEL Button */}
                            <Flex position="absolute" inset={0} align="center" justify="center">
                                <Button
                                    onClick={() => setIsPlaying(true)}
                                    bg="rgba(15, 23, 42, 0.88)"
                                    color="white"
                                    px="32px"
                                    py="24px"
                                    h="54px"
                                    borderRadius="full"
                                    border="1px solid rgba(255, 255, 255, 0.25)"
                                    backdropFilter="blur(16px)"
                                    _hover={{
                                        bg: '#5cc5d8',
                                        color: '#0f172a',
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 0 30px rgba(92, 197, 216, 0.5)',
                                    }}
                                    transition="all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                                    display="flex"
                                    gap="12px"
                                >
                                    <Flex
                                        w="32px"
                                        h="32px"
                                        borderRadius="full"
                                        bg="#5cc5d8"
                                        align="center"
                                        justify="center"
                                    >
                                        <Play size={16} color="#0f172a" fill="#0f172a" style={{ marginLeft: '2px' }} />
                                    </Flex>
                                    <Text
                                        fontWeight={800}
                                        letterSpacing="0.08em"
                                        fontSize="13px"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        PLAY CONTINUOUS REEL ({currentTrackIndex + 1}/3)
                                    </Text>
                                </Button>
                            </Flex>

                            {/* Track Metadata Card */}
                            <Box
                                position="absolute"
                                bottom="20px"
                                left="24px"
                                right="24px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="flex-end"
                            >
                                <Box>
                                    <Badge
                                        bg="rgba(92, 197, 216, 0.25)"
                                        color="#5cc5d8"
                                        px="8px"
                                        py="3px"
                                        borderRadius="4px"
                                        fontSize="11px"
                                        mb="6px"
                                    >
                                        {activeTrack.category}
                                    </Badge>
                                    <Text
                                        fontSize="16px"
                                        fontWeight={800}
                                        color="white"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        {activeTrack.title}
                                    </Text>
                                    <Text
                                        fontSize="12px"
                                        color="rgba(255,255,255,0.65)"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        {activeTrack.subtitle}
                                    </Text>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        /* Continuous Video Player View */
                        <Box position="relative" w="100%" h="100%">
                            <video
                                ref={videoRef}
                                key={activeTrack.videoSrc}
                                src={activeTrack.videoSrc}
                                autoPlay
                                muted
                                playsInline
                                controls
                                onEnded={handleVideoEnded}
                                poster={activeTrack.poster}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />

                            {/* Overlay Player Controls (Track Indicator & Skip Button) */}
                            <Flex position="absolute" top="16px" left="16px" gap="8px" zIndex={20}>
                                <Badge
                                    bg="rgba(15, 23, 42, 0.85)"
                                    color="#5cc5d8"
                                    border="1px solid rgba(92, 197, 216, 0.4)"
                                    backdropFilter="blur(12px)"
                                    px="12px"
                                    py="6px"
                                    borderRadius="full"
                                    fontSize="12px"
                                    fontWeight="700"
                                    textTransform="none"
                                >
                                    Track {currentTrackIndex + 1} of {cmcReelTracks.length}: {activeTrack.category}
                                </Badge>
                                <Button
                                    onClick={handleNextTrack}
                                    size="xs"
                                    bg="rgba(15, 23, 42, 0.85)"
                                    color="white"
                                    border="1px solid rgba(255,255,255,0.2)"
                                    backdropFilter="blur(12px)"
                                    borderRadius="full"
                                    px="10px"
                                    h="26px"
                                    _hover={{ bg: 'rgba(92, 197, 216, 0.3)' }}
                                    display="flex"
                                    gap="4px"
                                >
                                    <SkipForward size={12} />
                                    Next Track
                                </Button>
                            </Flex>

                            {/* Close Button */}
                            <Button
                                position="absolute"
                                top="16px"
                                right="16px"
                                zIndex={20}
                                onClick={() => setIsPlaying(false)}
                                bg="rgba(0,0,0,0.7)"
                                color="white"
                                p="8px"
                                minW="36px"
                                h="36px"
                                borderRadius="full"
                                _hover={{ bg: 'rgba(255,255,255,0.2)' }}
                            >
                                <X size={18} />
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
