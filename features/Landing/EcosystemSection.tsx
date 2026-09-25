'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { Network, Database, FileText, Play, Eye, BookOpen, LucideIcon } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import logo from '@/assets/logo.svg';
import { getAssetPath } from '@/lib/basePath';
import { motion, type Variants } from 'framer-motion';

const rawLogoSrc = typeof logo === 'string' ? logo : (logo as StaticImageData)?.src || '/logo.svg';
const logoSrc = getAssetPath(rawLogoSrc);

const MotionBox = motion.create(Box);

const parentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const centerNodeVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
};

const nodesContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

const nodeVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
};

interface NodeProps {
    icon: LucideIcon;
    title: string;
    description: string;
    accentColor?: string;
}

const EcosystemNode = ({ icon: IconComponent, title, description, accentColor = '#5cc5d8' }: NodeProps) => (
    <Flex
        direction="row"
        alignItems="flex-start"
        gap="16px"
        maxW="290px"
        position="relative"
        zIndex={5}
        transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{ transform: 'translateY(-3px)' }}
        textAlign="left"
        role="group"
    >
        {/* Icon Circle */}
        <Flex
            alignItems="center"
            justifyContent="center"
            w="48px"
            h="48px"
            borderRadius="full"
            bg="rgba(15, 23, 42, 0.75)"
            border="1px solid rgba(255, 255, 255, 0.12)"
            backdropFilter="blur(12px)"
            boxShadow="0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            flexShrink={0}
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{
                bg: 'rgba(15, 23, 42, 0.95)',
                borderColor: accentColor,
                boxShadow: `0 0 25px ${accentColor}60, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
            }}
        >
            <IconComponent size={20} color="#f8fafc" />
        </Flex>

        {/* Text Column */}
        <Flex direction="column" gap="4px" pt="2px">
            {/* Title */}
            <Text
                fontSize="15px"
                fontWeight="700"
                color="white"
                fontFamily="'Work Sans', sans-serif"
                letterSpacing="-0.01em"
                lineHeight="1.2"
                transition="color 0.2s ease"
                _groupHover={{ color: accentColor }}
            >
                {title}
            </Text>

            {/* Description */}
            <Text
                fontSize="12.5px"
                color="rgba(248, 250, 252, 0.65)"
                lineHeight="1.45"
                fontFamily="'Work Sans', sans-serif"
                transition="color 0.2s ease"
                _groupHover={{ color: 'rgba(248, 250, 252, 0.9)' }}
            >
                {description}
            </Text>
        </Flex>
    </Flex>
);

export default function EcosystemSection() {
    const ringStageRef = useRef<HTMLDivElement>(null);
    const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

    // Interactive mouse tilt applied ONLY to the 3D ring system
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ringStageRef.current) return;
            const rect = ringStageRef.current.getBoundingClientRect();
            const xNorm = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const yNorm = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

            setMouseTilt({
                x: Math.max(-1, Math.min(1, xNorm)),
                y: Math.max(-1, Math.min(1, yNorm)),
            });
        };

        const handleMouseLeave = () => {
            setMouseTilt({ x: 0, y: 0 });
        };

        const stage = ringStageRef.current;
        if (stage) {
            stage.addEventListener('mousemove', handleMouseMove);
            stage.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (stage) {
                stage.removeEventListener('mousemove', handleMouseMove);
                stage.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const leftNodes = [
        {
            icon: Network,
            title: 'Apps & Pipelines',
            description: 'Run and share reproducible pipelines for a wide range of analyses.',
            accentColor: '#5cc5d8',
        },
        {
            icon: Database,
            title: 'Datasets',
            description: 'Access open neuroimaging datasets across modalities and species.',
            accentColor: '#60a5fa',
        },
        {
            icon: FileText,
            title: 'Publications',
            description: 'Discover research powered by Brainlife and cite with confidence.',
            accentColor: '#34d399',
        },
    ];

    const rightNodes = [
        {
            icon: BookOpen,
            title: 'Documentation',
            description: 'Guides, API references, and best practices to help you succeed.',
            accentColor: '#a78bfa',
        },
        {
            icon: Play,
            title: 'Tutorials & Videos',
            description: 'Learn with step-by-step tutorials, webinars, and workshops.',
            accentColor: '#f59e0b',
        },
        {
            icon: Eye,
            title: 'Visualization',
            description: 'Explore results with Neuroglancer and other interactive viewers.',
            accentColor: '#f43f5e',
        },
    ];

    const tiltX = mouseTilt.y * -10;
    const tiltY = mouseTilt.x * 14;

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
                left="50%"
                top="50%"
                transform="translate(-50%, -50%)"
                width={{ base: '280px', md: '500px', lg: '800px' }}
                height={{ base: '280px', md: '500px', lg: '800px' }}
                background="radial-gradient(circle, rgba(58, 111, 124, 0.08) 0%, rgba(72, 108, 152, 0.05) 40%, transparent 70%)"
                filter="blur(50px)"
                pointerEvents="none"
                zIndex={0}
            />

            <MotionBox
                maxW="1200px"
                mx="auto"
                px="24px"
                textAlign="center"
                position="relative"
                zIndex={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={parentVariants}
            >
                {/* Header with Stacked Faded Watermark */}
                <Box position="relative" textAlign="center" mb="16px">
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
                        Ecosystem
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '24px', sm: '34px', md: '44px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.03em"
                        mt={{ base: '-16px', sm: '-24px', md: '-32px' }}
                        mb="12px"
                    >
                        The Brainlife Ecosystem
                    </Heading>
                    <Text
                        fontSize={{ base: '14px', md: '17px' }}
                        color="rgba(255, 255, 255, 0.7)"
                        fontFamily="'Work Sans', sans-serif"
                        maxW="650px"
                        mx="auto"
                    >
                        Everything you need for reproducible neuroscience research.
                    </Text>
                </Box>

                {/* Desktop Solar/Orbit layout with 3D Rings & 2D Text Nodes */}
                <Box
                    ref={ringStageRef}
                    display={{ base: 'none', lg: 'block' }}
                    position="relative"
                    height="560px"
                    maxW="1100px"
                    mx="auto"
                    mt="40px"
                >
                    {/* 3D RINGS & ORBITAL RIG (ONLY THIS IS 3D) */}
                    <Box
                        position="absolute"
                        inset={0}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        pointerEvents="none"
                        zIndex={1}
                        style={{ perspective: '1200px' }}
                    >
                        {/* 3D Tilted Concentric Orbit System */}
                        <Box
                            w="820px"
                            h="820px"
                            position="relative"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: `rotateX(${66 + tiltX}deg) rotateZ(${tiltY}deg)`,
                                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        >
                            {/* Inner Orbit Ring 1 (3D) */}
                            <Box
                                position="absolute"
                                inset="250px"
                                borderRadius="full"
                                border="1.5px solid rgba(92, 197, 216, 0.4)"
                                boxShadow="0 0 25px rgba(92, 197, 216, 0.25), inset 0 0 20px rgba(92, 197, 216, 0.15)"
                                className="ring-spin-cw"
                            >
                                <Box
                                    position="absolute"
                                    top="-5px"
                                    left="50%"
                                    w="10px"
                                    h="10px"
                                    borderRadius="full"
                                    bg="#5cc5d8"
                                    boxShadow="0 0 14px #5cc5d8, 0 0 24px #5cc5d8"
                                />
                            </Box>

                            {/* Mid Orbit Ring 2 (3D) */}
                            <Box
                                position="absolute"
                                inset="160px"
                                borderRadius="full"
                                border="1.5px dashed rgba(96, 165, 250, 0.35)"
                                boxShadow="0 0 30px rgba(96, 165, 250, 0.2)"
                                className="ring-spin-ccw"
                            >
                                <Box
                                    position="absolute"
                                    top="50%"
                                    right="-5px"
                                    w="10px"
                                    h="10px"
                                    borderRadius="full"
                                    bg="#60a5fa"
                                    boxShadow="0 0 16px #60a5fa"
                                />
                                <Box
                                    position="absolute"
                                    bottom="12%"
                                    left="12%"
                                    w="7px"
                                    h="7px"
                                    borderRadius="full"
                                    bg="#34d399"
                                    boxShadow="0 0 12px #34d399"
                                />
                            </Box>

                            {/* Outer Orbit Ring 3 (3D) */}
                            <Box
                                position="absolute"
                                inset="70px"
                                borderRadius="full"
                                border="1.5px solid rgba(167, 139, 250, 0.25)"
                                boxShadow="0 0 40px rgba(167, 139, 250, 0.15)"
                                className="ring-spin-cw"
                            >
                                <Box
                                    position="absolute"
                                    bottom="-5px"
                                    left="50%"
                                    w="10px"
                                    h="10px"
                                    borderRadius="full"
                                    bg="#a78bfa"
                                    boxShadow="0 0 18px #a78bfa"
                                />
                                <Box
                                    position="absolute"
                                    top="18%"
                                    left="8%"
                                    w="8px"
                                    h="8px"
                                    borderRadius="full"
                                    bg="#f59e0b"
                                    boxShadow="0 0 14px #f59e0b"
                                />
                            </Box>

                            {/* Outer Atmosphere Dotted Ring (3D) */}
                            <Box
                                position="absolute"
                                inset="0px"
                                borderRadius="full"
                                border="1px dotted rgba(255, 255, 255, 0.15)"
                                opacity={0.7}
                            />
                        </Box>
                    </Box>

                    {/* Central Glowing 3D Gyroscope & Sun Core */}
                    <Box
                        position="absolute"
                        left="50%"
                        top="260px"
                        transform="translate(-50%, -50%)"
                        zIndex={3}
                        pointerEvents="none"
                    >
                        <MotionBox variants={centerNodeVariants}>
                            <Box
                                position="relative"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                w="110px"
                                h="110px"
                            >
                                {/* 3D Gyroscope Ring 1 */}
                                <Box
                                    position="absolute"
                                    inset="-14px"
                                    borderRadius="full"
                                    border="2px solid rgba(92, 197, 216, 0.5)"
                                    className="gyro-spin-1"
                                    pointerEvents="none"
                                />

                                {/* 3D Gyroscope Ring 2 */}
                                <Box
                                    position="absolute"
                                    inset="-22px"
                                    borderRadius="full"
                                    border="1.5px dashed rgba(139, 92, 246, 0.45)"
                                    className="gyro-spin-2"
                                    pointerEvents="none"
                                />

                                {/* Horizontal lens flare ray */}
                                <Box
                                    position="absolute"
                                    w="340px"
                                    h="1.5px"
                                    background="linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8) 50%, transparent)"
                                    filter="blur(0.8px)"
                                    pointerEvents="none"
                                />
                                {/* Vertical lens flare ray */}
                                <Box
                                    position="absolute"
                                    w="1.5px"
                                    h="340px"
                                    background="linear-gradient(180deg, transparent, rgba(56, 189, 248, 0.8) 50%, transparent)"
                                    filter="blur(0.8px)"
                                    pointerEvents="none"
                                />

                                {/* Bright white core glow */}
                                <Box
                                    position="absolute"
                                    w="100px"
                                    h="100px"
                                    borderRadius="full"
                                    bg="rgba(56, 189, 248, 0.35)"
                                    filter="blur(14px)"
                                    pointerEvents="none"
                                />
                                <Box
                                    position="absolute"
                                    w="45px"
                                    h="45px"
                                    borderRadius="full"
                                    bg="white"
                                    filter="blur(5px)"
                                    opacity="0.85"
                                    pointerEvents="none"
                                />

                                {/* Center Glass Orb */}
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="84px"
                                    h="84px"
                                    borderRadius="full"
                                    bg="#0f172a"
                                    border="3px solid rgba(56, 189, 248, 0.9)"
                                    boxShadow="0 0 45px rgba(56, 189, 248, 0.8), inset 0 0 15px rgba(56, 189, 248, 0.4)"
                                    pointerEvents="auto"
                                    cursor="pointer"
                                    transition="all 0.3s ease"
                                    _hover={{
                                        transform: 'scale(1.08)',
                                        boxShadow: '0 0 65px rgba(56, 189, 248, 1)',
                                    }}
                                >
                                    <img
                                        src={logoSrc}
                                        alt="Brainlife Sun"
                                        style={{
                                            width: '46px',
                                            height: '46px',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))',
                                        }}
                                    />
                                </Flex>
                            </Box>
                        </MotionBox>
                    </Box>

                    {/* 2D FLOATING CLEAN TEXT NODES (Unchanged & perfectly legible) */}
                    <MotionBox variants={nodesContainerVariants}>
                        {/* Left 1: Apps & Pipelines */}
                        <MotionBox variants={nodeVariants} position="absolute" left="50px" top="60px">
                            <EcosystemNode {...leftNodes[0]} />
                        </MotionBox>
                        {/* Left 2: Datasets */}
                        <MotionBox variants={nodeVariants} position="absolute" left="15px" top="260px">
                            <Box transform="translateY(-50%)">
                                <EcosystemNode {...leftNodes[1]} />
                            </Box>
                        </MotionBox>
                        {/* Left 3: Publications */}
                        <MotionBox variants={nodeVariants} position="absolute" left="180px" top="400px">
                            <EcosystemNode {...leftNodes[2]} />
                        </MotionBox>

                        {/* Right 1: Documentation */}
                        <MotionBox variants={nodeVariants} position="absolute" right="50px" top="60px">
                            <EcosystemNode {...rightNodes[0]} />
                        </MotionBox>
                        {/* Right 2: Tutorials */}
                        <MotionBox variants={nodeVariants} position="absolute" right="15px" top="260px">
                            <Box transform="translateY(-50%)">
                                <EcosystemNode {...rightNodes[1]} />
                            </Box>
                        </MotionBox>
                        {/* Right 3: Visualization */}
                        <MotionBox variants={nodeVariants} position="absolute" right="180px" top="400px">
                            <EcosystemNode {...rightNodes[2]} />
                        </MotionBox>
                    </MotionBox>
                </Box>

                {/* Mobile / Tablet grid flow */}
                <Box display={{ base: 'block', lg: 'none' }} mt="40px">
                    <Flex justify="center" mb="32px">
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            w="70px"
                            h="70px"
                            borderRadius="full"
                            bg="#0f172a"
                            border="2px solid rgba(56, 189, 248, 0.5)"
                            boxShadow="0 0 24px rgba(56, 189, 248, 0.2)"
                            position="relative"
                        >
                            <img src={logoSrc} alt="Brainlife Sun" style={{ width: '38px', height: '38px' }} />
                        </Flex>
                    </Flex>

                    <MotionBox
                        variants={nodesContainerVariants}
                        display="flex"
                        flexDirection="column"
                        gap="24px"
                        px="16px"
                        alignItems="center"
                    >
                        {[...leftNodes, ...rightNodes].map((node, i) => (
                            <MotionBox key={i} variants={nodeVariants} w="100%" maxW="320px">
                                <EcosystemNode {...node} />
                            </MotionBox>
                        ))}
                    </MotionBox>
                </Box>
            </MotionBox>

            {/* Custom 3D Animations */}
            <style>{`
                @keyframes ringSpinCW {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes ringSpinCCW {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes gyroSpin1 {
                    0% { transform: rotateX(70deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(70deg) rotateY(360deg) rotateZ(360deg); }
                }
                @keyframes gyroSpin2 {
                    0% { transform: rotateX(-50deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(-50deg) rotateY(-360deg) rotateZ(360deg); }
                }
                .ring-spin-cw {
                    animation: ringSpinCW 40s linear infinite;
                }
                .ring-spin-ccw {
                    animation: ringSpinCCW 55s linear infinite;
                }
                .gyro-spin-1 {
                    animation: gyroSpin1 16s linear infinite;
                }
                .gyro-spin-2 {
                    animation: gyroSpin2 22s linear infinite;
                }
            `}</style>
        </Box>
    );
}
