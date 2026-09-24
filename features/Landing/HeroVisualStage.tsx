'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
    Database,
    LayoutGrid,
    Brain as BrainIcon,
    FileText,
    ArrowRight,
    Settings,
    CheckCircle2,
    Activity,
} from 'lucide-react';
import axialScan from '@/assets/landing/axial.jpeg';
import tractThumb from '@/assets/landing/tract_transparent.png';
import tractAnim from '@/assets/landing/tractography_transparent.webp';

const axialScanSrc = typeof axialScan === 'string' ? axialScan : (axialScan as any)?.src || '/assets/landing/axial.jpeg';
const tractThumbSrc = typeof tractThumb === 'string' ? tractThumb : (tractThumb as any)?.src || '/assets/landing/tract_transparent.png';
const tractAnimSrc = typeof tractAnim === 'string' ? tractAnim : (tractAnim as any)?.src || '/assets/landing/tractography_transparent.webp';


// Micro-animation keyframes
const pulseGlow = keyframes`
  0% { opacity: 0.45; transform: scale(0.96); }
  50% { opacity: 0.85; transform: scale(1.04); }
  100% { opacity: 0.45; transform: scale(0.96); }
`;

const floatCard = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const floatBrain = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const MotionBox = motion.create(Box);

export default function HeroVisualStage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [progressVal, setProgressVal] = useState(68);

    // Mouse parallax for 2.5D tilt overlay
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const tx = useTransform(mvX, (v) => `${v * 0.02}px`);
    const ty = useTransform(mvY, (v) => `${v * 0.02}px`);

    // Three.js 3D Holographic Pedestal & Orbital Particle System
    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const width = container.clientWidth || 740;
        const height = container.clientHeight || 580;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        camera.position.set(0, 0.3, 7.8);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        container.appendChild(renderer.domElement);

        const mainStageGroup = new THREE.Group();
        scene.add(mainStageGroup);

        // ----------------------------------------------------
        // 1. GLOWING 3D SYNAPTIC PARTICLE CLOUD (TEAL / BLUE)
        // ----------------------------------------------------
        const particleCount = 240;
        const particleVertices: number[] = [];
        const particleColors: number[] = [];

        const colorTeal = new THREE.Color('#5cc5d8');
        const colorBrand = new THREE.Color('#3a6f7c');
        const colorLightTeal = new THREE.Color('#7ee0ef');
        const colorMuted = new THREE.Color('#94a3b8');

        for (let i = 0; i < particleCount; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * Math.PI * 2;
            const phi = Math.acos(2 * v - 1);

            const rx = 2.4 * (0.6 + 0.4 * Math.random());
            const ry = 1.4 * (0.6 + 0.4 * Math.random());
            const rz = 1.8 * (0.6 + 0.4 * Math.random());

            const px = Math.sin(phi) * Math.cos(theta) * rx;
            const py = Math.cos(phi) * ry + 0.2;
            const pz = Math.sin(phi) * Math.sin(theta) * rz;

            particleVertices.push(px, py, pz);

            const col = i % 4 === 0 ? colorTeal : i % 4 === 1 ? colorBrand : i % 4 === 2 ? colorLightTeal : colorMuted;
            particleColors.push(col.r, col.g, col.b);
        }

        const particleGeom = new THREE.BufferGeometry();
        particleGeom.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
        particleGeom.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 0.045,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
        });
        const particlePoints = new THREE.Points(particleGeom, particleMat);
        mainStageGroup.add(particlePoints);

        // ----------------------------------------------------
        // 2. 3D CONCENTRIC BASE COORDINATE PEDESTAL
        // ----------------------------------------------------
        const pedestalGroup = new THREE.Group();
        mainStageGroup.add(pedestalGroup);
        pedestalGroup.position.set(0, -1.35, 0);

        // Concentric circular rings
        const ringRadii = [1.4, 2.0, 2.7];
        ringRadii.forEach((r, idx) => {
            const ringGeom = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
            const ringMat = new THREE.MeshBasicMaterial({
                color: idx === 0 ? '#5cc5d8' : idx === 1 ? '#3a6f7c' : '#7ee0ef',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.35 - idx * 0.08,
                blending: THREE.AdditiveBlending,
            });
            const ringMesh = new THREE.Mesh(ringGeom, ringMat);
            ringMesh.rotation.x = Math.PI / 2;
            pedestalGroup.add(ringMesh);
        });

        // ----------------------------------------------------
        // 3. 3D STREAMLINE COORDINATE RINGS
        // ----------------------------------------------------
        const orbitGroup = new THREE.Group();
        mainStageGroup.add(orbitGroup);

        function createOrbitRing(tiltZ: number, tiltX: number, rx: number, rz: number, colorHex: string) {
            const orbitCurvePts: THREE.Vector3[] = [];
            const segments = 120;
            for (let i = 0; i <= segments; i++) {
                const theta = (i / segments) * Math.PI * 2;
                orbitCurvePts.push(new THREE.Vector3(Math.cos(theta) * rx, 0, Math.sin(theta) * rz));
            }
            const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitCurvePts);
            const orbitMat = new THREE.LineDashedMaterial({
                color: colorHex,
                dashSize: 0.15,
                gapSize: 0.08,
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending,
            });
            const orbitLine = new THREE.Line(orbitGeom, orbitMat);
            orbitLine.computeLineDistances();
            orbitLine.rotation.z = tiltZ;
            orbitLine.rotation.x = tiltX;
            return orbitLine;
        }

        const orbit1 = createOrbitRing(-0.3, 0.18, 3.4, 1.8, '#5cc5d8');
        const orbit2 = createOrbitRing(0.35, -0.2, 3.1, 1.6, '#3a6f7c');
        orbitGroup.add(orbit1);
        orbitGroup.add(orbit2);

        // Traveling orbital streamline coordinate particles
        const orbParticleGeom = new THREE.BufferGeometry();
        const orbParticlePositions = new Float32Array(12 * 3);
        orbParticleGeom.setAttribute('position', new THREE.BufferAttribute(orbParticlePositions, 3));
        const orbParticleMat = new THREE.PointsMaterial({
            size: 0.09,
            color: '#5cc5d8',
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
        });
        const orbParticleMesh = new THREE.Points(orbParticleGeom, orbParticleMat);
        orbitGroup.add(orbParticleMesh);

        // Mouse Parallax listener
        function onMouseMove(e: MouseEvent) {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            mvX.set(relX * 50);
            mvY.set(relY * 50);
        }

        window.addEventListener('mousemove', onMouseMove);

        // Resize Observer
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const w = entry.contentRect.width;
                const h = entry.contentRect.height;
                if (w > 0 && h > 0) {
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            }
        });
        resizeObserver.observe(container);

        let animationFrameId: number;
        const startTime = performance.now();

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = (performance.now() - startTime) / 1000;

            // Pedestal slow rotation
            pedestalGroup.rotation.y = elapsedTime * 0.08;
            particlePoints.rotation.y = elapsedTime * 0.04;

            // Orbit particles animation along paths
            const posAttr = orbParticleGeom.attributes.position as THREE.BufferAttribute;
            const positions = posAttr.array as Float32Array;
            for (let i = 0; i < 12; i++) {
                const t = (elapsedTime * 0.3 + i / 12) * Math.PI * 2;
                const rx = i % 2 === 0 ? 3.4 : 3.1;
                const rz = i % 2 === 0 ? 1.8 : 1.6;
                const tiltZ = i % 2 === 0 ? -0.3 : 0.35;
                const tiltX = i % 2 === 0 ? 0.18 : -0.2;

                const ox = Math.cos(t) * rx;
                const oz = Math.sin(t) * rz;
                const oy = Math.sin(t * 2) * 0.12;

                const vy = oy * Math.cos(tiltX) - oz * Math.sin(tiltX);
                const vz = oy * Math.sin(tiltX) + oz * Math.cos(tiltX);
                const vx = ox * Math.cos(tiltZ) - vy * Math.sin(tiltZ);
                const finalY = ox * Math.sin(tiltZ) + vy * Math.cos(tiltZ);

                positions[i * 3] = vx;
                positions[i * 3 + 1] = finalY;
                positions[i * 3 + 2] = vz;
            }
            posAttr.needsUpdate = true;

            renderer.render(scene, camera);
        }

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener('mousemove', onMouseMove);
            particleGeom.dispose();
            particleMat.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    // Progress bar tick animation
    useEffect(() => {
        const timer = setInterval(() => {
            setProgressVal((p) => (p >= 99 ? 42 : p + 1));
        }, 1200);
        return () => clearInterval(timer);
    }, []);

    return (
        <Box
            position="relative"
            w="100%"
            maxW={{ base: '100%', lg: '760px', xl: '840px' }}
            h={{ base: '520px', sm: '580px', md: '640px', lg: '680px' }}
            mx="auto"
            userSelect="none"
        >
            {/* Ambient Radial Teal/Cyan Glow Bloom */}
            <Box
                position="absolute"
                top="48%"
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: '320px', sm: '440px', md: '560px' }}
                h={{ base: '320px', sm: '440px', md: '560px' }}
                bg="radial-gradient(circle, rgba(58, 111, 124, 0.35) 0%, rgba(92, 197, 216, 0.2) 40%, transparent 70%)"
                filter="blur(60px)"
                pointerEvents="none"
                animation={`${pulseGlow} 6s ease-in-out infinite`}
                zIndex={0}
            />

            {/* Subtle High-Tech Blueprint Grid */}
            <Box
                position="absolute"
                inset="-5%"
                pointerEvents="none"
                opacity={0.3}
                backgroundImage="linear-gradient(to right, rgba(92, 197, 216, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(92, 197, 216, 0.08) 1px, transparent 1px)"
                backgroundSize="38px 38px"
                sx={{
                    maskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 45%, transparent 75%)',
                }}
                zIndex={0}
            />

            {/* Three.js 3D Background Pedestal & Orbit System Viewport */}
            <Box
                ref={mountRef}
                position="absolute"
                inset={0}
                zIndex={1}
                pointerEvents="none"
                borderRadius="24px"
                overflow="hidden"
            />

            {/* ---------------------------------------------------- */}
            {/* CENTRAL ROTATING 3D TRACTOGRAPHY BRAIN (TRANSPARENT) */}
            {/* ---------------------------------------------------- */}
            <Box
                position="absolute"
                top={{ base: '44%', md: '44%' }}
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: '300px', sm: '380px', md: '450px', lg: '500px' }}
                zIndex={3}
                pointerEvents="none"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <MotionBox
                    style={{ x: tx, y: ty }}
                    w="100%"
                    animation={`${floatBrain} 6s ease-in-out infinite`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image
                        src={tractAnimSrc}
                        alt="Rotating 3D Tractography Brain"
                        w="100%"
                        h="auto"
                        filter="drop-shadow(0 0 35px rgba(92, 197, 216, 0.5)) drop-shadow(0 0 15px rgba(58, 111, 124, 0.3))"
                    />
                </MotionBox>
            </Box>

            {/* ---------------------------------------------------- */}
            {/* 4 SATELLITE PLANETARY INTERACTIVE NODE BADGES        */}
            {/* ---------------------------------------------------- */}

            {/* Node 1: Datasets (Teal) - Top Left */}
            <Box
                as="a"
                href="#datasets"
                position="absolute"
                top={{ base: '20%', md: '22%' }}
                left={{ base: '4%', sm: '8%', md: '10%' }}
                zIndex={10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                transition="transform 0.25s ease"
                _hover={{ transform: 'scale(1.12)' }}
            >
                <Flex
                    w={{ base: '40px', md: '46px' }}
                    h={{ base: '40px', md: '46px' }}
                    borderRadius="full"
                    bg="rgba(92, 197, 216, 0.15)"
                    border="1.5px solid #5cc5d8"
                    boxShadow="0 0 20px rgba(92, 197, 216, 0.5), inset 0 0 10px rgba(92, 197, 216, 0.3)"
                    backdropFilter="blur(12px)"
                    align="center"
                    justify="center"
                    mb="6px"
                >
                    <Database size={19} color="#5cc5d8" />
                </Flex>
                <Text
                    fontSize="12px"
                    fontWeight="700"
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="0.02em"
                    textShadow="0 2px 10px rgba(0,0,0,0.9)"
                >
                    Datasets
                </Text>
            </Box>

            {/* Node 2: Apps (Teal) - Bottom Left */}
            <Box
                as="a"
                href="#apps"
                position="absolute"
                top={{ base: '60%', md: '62%' }}
                left={{ base: '4%', sm: '8%', md: '10%' }}
                zIndex={10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                transition="transform 0.25s ease"
                _hover={{ transform: 'scale(1.12)' }}
            >
                <Flex
                    w={{ base: '40px', md: '46px' }}
                    h={{ base: '40px', md: '46px' }}
                    borderRadius="full"
                    bg="rgba(58, 111, 124, 0.2)"
                    border="1.5px solid #5cc5d8"
                    boxShadow="0 0 20px rgba(92, 197, 216, 0.5), inset 0 0 10px rgba(92, 197, 216, 0.3)"
                    backdropFilter="blur(12px)"
                    align="center"
                    justify="center"
                    mb="6px"
                >
                    <LayoutGrid size={19} color="#5cc5d8" />
                </Flex>
                <Text
                    fontSize="12px"
                    fontWeight="700"
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="0.02em"
                    textShadow="0 2px 10px rgba(0,0,0,0.9)"
                >
                    Apps
                </Text>
            </Box>

            {/* Node 3: SKAI Assistant (Teal) - Far Right */}
            <Box
                position="absolute"
                top={{ base: '38%', md: '40%' }}
                right={{ base: '2%', sm: '4%', md: '6%' }}
                zIndex={10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                transition="transform 0.25s ease"
                _hover={{ transform: 'scale(1.12)' }}
            >
                <Flex
                    w={{ base: '40px', md: '46px' }}
                    h={{ base: '40px', md: '46px' }}
                    borderRadius="full"
                    bg="rgba(92, 197, 216, 0.15)"
                    border="1.5px solid #5cc5d8"
                    boxShadow="0 0 20px rgba(92, 197, 216, 0.5), inset 0 0 10px rgba(92, 197, 216, 0.3)"
                    backdropFilter="blur(12px)"
                    align="center"
                    justify="center"
                    mb="6px"
                >
                    <BrainIcon size={19} color="#5cc5d8" />
                </Flex>
                <Text
                    fontSize="12px"
                    fontWeight="700"
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="0.02em"
                    textShadow="0 2px 10px rgba(0,0,0,0.9)"
                >
                    SKAI
                </Text>
            </Box>

            {/* Node 4: Derivatives (Teal) - Bottom Right */}
            <Box
                position="absolute"
                top={{ base: '64%', md: '66%' }}
                right={{ base: '6%', sm: '8%', md: '10%' }}
                zIndex={10}
                display="flex"
                flexDirection="column"
                alignItems="center"
                cursor="pointer"
                transition="transform 0.25s ease"
                _hover={{ transform: 'scale(1.12)' }}
            >
                <Flex
                    w={{ base: '40px', md: '46px' }}
                    h={{ base: '40px', md: '46px' }}
                    borderRadius="full"
                    bg="rgba(92, 197, 216, 0.15)"
                    border="1.5px solid #5cc5d8"
                    boxShadow="0 0 20px rgba(92, 197, 216, 0.5), inset 0 0 10px rgba(92, 197, 216, 0.3)"
                    backdropFilter="blur(12px)"
                    align="center"
                    justify="center"
                    mb="6px"
                >
                    <FileText size={19} color="#5cc5d8" />
                </Flex>
                <Text
                    fontSize="12px"
                    fontWeight="700"
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="0.02em"
                    textShadow="0 2px 10px rgba(0,0,0,0.9)"
                >
                    Results
                </Text>
            </Box>

            {/* ---------------------------------------------------- */}
            {/* 3 FLOATING HOLOGRAPHIC GLASSMORPHIC UI CARDS         */}
            {/* ---------------------------------------------------- */}

            {/* Card 1: Mini Pipeline Card (Top Left) */}
            <MotionBox
                style={{ x: tx, y: ty }}
                position="absolute"
                top={{ base: '2%', md: '4%' }}
                left={{ base: '10%', sm: '16%', md: '20%' }}
                zIndex={12}
                bg="rgba(13, 21, 39, 0.92)"
                border="1.5px solid rgba(92, 197, 216, 0.4)"
                borderRadius="16px"
                p="10px 16px"
                backdropFilter="blur(20px)"
                boxShadow="0 20px 40px rgba(0,0,0,0.75), 0 0 25px rgba(58, 111, 124, 0.25)"
                animation={`${floatCard} 6s ease-in-out infinite`}
                _hover={{
                    transform: 'translateY(-3px) scale(1.02)',
                    borderColor: '#5cc5d8',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.85), 0 0 35px rgba(92, 197, 216, 0.4)',
                }}
            >
                <Flex align="center" gap={{ base: '10px', md: '14px' }}>
                    {/* Step 1: BIDS dMRI */}
                    <Flex direction="column" align="center" gap="4px">
                        <Box
                            w="36px"
                            h="36px"
                            borderRadius="8px"
                            overflow="hidden"
                            border="1px solid rgba(255,255,255,0.2)"
                            bg="#0f172a"
                        >
                            <Image src={axialScanSrc} alt="BIDS MRI" w="100%" h="100%" objectFit="cover" />
                        </Box>
                        <Text fontSize="10px" fontWeight="700" color="white">
                            dMRI
                        </Text>
                    </Flex>

                    <ArrowRight size={13} color="rgba(255,255,255,0.5)" />

                    {/* Step 2: Preprocess */}
                    <Flex direction="column" align="center" gap="4px">
                        <Flex
                            w="36px"
                            h="36px"
                            borderRadius="8px"
                            bg="rgba(58, 111, 124, 0.25)"
                            border="1px solid rgba(92, 197, 216, 0.6)"
                            align="center"
                            justify="center"
                        >
                            <Settings size={16} color="#5cc5d8" />
                        </Flex>
                        <Text fontSize="10px" fontWeight="700" color="white">
                            MRtrix3
                        </Text>
                    </Flex>

                    <ArrowRight size={13} color="rgba(255,255,255,0.5)" />

                    {/* Step 3: Analyze */}
                    <Flex direction="column" align="center" gap="4px">
                        <Box
                            w="36px"
                            h="36px"
                            borderRadius="8px"
                            overflow="hidden"
                            border="1px solid rgba(92, 197, 216, 0.6)"
                            bg="#0f172a"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            p="2px"
                        >
                            <Image src={tractThumbSrc} alt="Tracts" w="100%" h="100%" objectFit="contain" />
                        </Box>
                        <Text fontSize="10px" fontWeight="700" color="white">
                            Tracts
                        </Text>
                    </Flex>
                </Flex>
            </MotionBox>

            {/* Card 2: Workflow v2.4 Card (Top Right) */}
            <MotionBox
                style={{ x: tx, y: ty }}
                position="absolute"
                top={{ base: '4%', md: '6%' }}
                right={{ base: '2%', sm: '4%', md: '6%' }}
                zIndex={12}
                bg="rgba(13, 21, 39, 0.92)"
                border="1.5px solid rgba(92, 197, 216, 0.4)"
                borderRadius="16px"
                p="12px 18px"
                backdropFilter="blur(20px)"
                boxShadow="0 20px 40px rgba(0,0,0,0.75), 0 0 25px rgba(58, 111, 124, 0.25)"
                animation={`${floatCard} 6.5s ease-in-out infinite 0.5s`}
                _hover={{
                    transform: 'translateY(-3px) scale(1.02)',
                    borderColor: '#5cc5d8',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.85), 0 0 35px rgba(92, 197, 216, 0.4)',
                }}
            >
                <Flex align="center" gap="10px" mb="8px">
                    <Box
                        w="28px"
                        h="28px"
                        borderRadius="7px"
                        overflow="hidden"
                        border="1px solid rgba(92, 197, 216, 0.5)"
                        bg="#0f172a"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p="2px"
                    >
                        <Image src={tractThumbSrc} alt="HCP Tractography" w="100%" h="100%" objectFit="contain" />
                    </Box>
                    <Box>
                        <Text fontSize="13px" fontWeight="800" color="white" lineHeight="1.2">
                            HCP Tractography v2.4
                        </Text>
                        <Text fontSize="10px" fontWeight="600" color="#5cc5d8" lineHeight="1.2">
                            ● 500k Streamlines
                        </Text>
                    </Box>
                </Flex>

                <Flex
                    align="center"
                    gap="6px"
                    bg="rgba(92, 197, 216, 0.12)"
                    border="1px solid rgba(92, 197, 216, 0.4)"
                    borderRadius="full"
                    px="10px"
                    py="3px"
                >
                    <CheckCircle2 size={12} color="#5cc5d8" />
                    <Text fontSize="11px" fontWeight="700" color="#5cc5d8">
                        100% FAIR Verified
                    </Text>
                </Flex>
            </MotionBox>

            {/* Card 3: Live Tractography Progress Pill (Bottom Left) */}
            <Box
                position="absolute"
                bottom={{ base: '10%', md: '12%' }}
                left={{ base: '10%', sm: '14%', md: '18%' }}
                zIndex={12}
                bg="rgba(13, 21, 39, 0.94)"
                border="1.5px solid rgba(92, 197, 216, 0.4)"
                borderRadius="14px"
                p="9px 16px"
                backdropFilter="blur(20px)"
                boxShadow="0 15px 35px rgba(0,0,0,0.75), 0 0 25px rgba(58, 111, 124, 0.25)"
                display="flex"
                alignItems="center"
                gap="12px"
            >
                <Flex w="26px" h="26px" borderRadius="6px" bg="rgba(92, 197, 216, 0.2)" align="center" justify="center">
                    <Activity size={15} color="#5cc5d8" />
                </Flex>

                <Box>
                    <Text fontSize="11px" fontWeight="600" color="rgba(255,255,255,0.85)" mb="4px">
                        MRtrix3 ACT Tracking (Node #14)...
                    </Text>
                    <Box
                        w={{ base: '100px', sm: '130px', md: '150px' }}
                        h="4px"
                        borderRadius="full"
                        bg="rgba(255,255,255,0.15)"
                        overflow="hidden"
                    >
                        <Box
                            w={`${progressVal}%`}
                            h="100%"
                            borderRadius="full"
                            bg="linear-gradient(90deg, #3a6f7c 0%, #5cc5d8 100%)"
                            boxShadow="0 0 8px #5cc5d8"
                            transition="width 0.8s ease"
                        />
                    </Box>
                </Box>

                <Text fontSize="11px" fontWeight="800" color="white" ml="4px">
                    {progressVal}%
                </Text>
            </Box>

            {/* Bottom-Right Step Flow Timeline */}
            <Box
                position="absolute"
                bottom={{ base: '4%', md: '5%' }}
                right={{ base: '2%', sm: '4%', md: '6%' }}
                zIndex={12}
                textAlign="right"
            >
                <Flex align="center" gap="6px" justify="flex-end" mb="6px">
                    <Text fontSize="10px" fontWeight="700" color="rgba(255,255,255,0.6)" letterSpacing="0.08em">
                        BIDS DATA
                    </Text>
                    <Text fontSize="10px" color="rgba(255,255,255,0.4)">
                        →
                    </Text>
                    <Text fontSize="10px" fontWeight="700" color="rgba(255,255,255,0.6)" letterSpacing="0.08em">
                        APPS
                    </Text>
                    <Text fontSize="10px" color="rgba(255,255,255,0.4)">
                        →
                    </Text>
                    <Text fontSize="10px" fontWeight="700" color="rgba(255,255,255,0.6)" letterSpacing="0.08em">
                        SLURM HPC
                    </Text>
                    <Text fontSize="10px" color="rgba(255,255,255,0.4)">
                        →
                    </Text>
                    <Text fontSize="10px" fontWeight="700" color="#5cc5d8" letterSpacing="0.08em">
                        DERIVATIVES
                    </Text>
                </Flex>

                {/* Connected Glowing Milestone Track */}
                <Flex align="center" justify="flex-end" w="100%" position="relative">
                    <Box
                        w="100%"
                        h="2px"
                        bg="linear-gradient(90deg, rgba(92, 197, 216, 0.2), #3a6f7c 50%, #5cc5d8 100%)"
                        position="relative"
                    >
                        <Box
                            position="absolute"
                            left="5%"
                            top="50%"
                            transform="translate(-50%, -50%)"
                            w="7px"
                            h="7px"
                            borderRadius="full"
                            bg="#5cc5d8"
                            boxShadow="0 0 6px #5cc5d8"
                        />
                        <Box
                            position="absolute"
                            left="35%"
                            top="50%"
                            transform="translate(-50%, -50%)"
                            w="7px"
                            h="7px"
                            borderRadius="full"
                            bg="#3a6f7c"
                            boxShadow="0 0 6px #3a6f7c"
                        />
                        <Box
                            position="absolute"
                            left="68%"
                            top="50%"
                            transform="translate(-50%, -50%)"
                            w="8px"
                            h="8px"
                            borderRadius="full"
                            bg="#5cc5d8"
                            boxShadow="0 0 8px #5cc5d8"
                        />
                        <Box
                            position="absolute"
                            right="0"
                            top="50%"
                            transform="translate(50%, -50%)"
                            w="7px"
                            h="7px"
                            borderRadius="full"
                            bg="#5cc5d8"
                            boxShadow="0 0 6px #5cc5d8"
                        />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
