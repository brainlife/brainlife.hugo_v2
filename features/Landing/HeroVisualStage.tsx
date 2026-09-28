'use client';

import { useEffect, useRef } from 'react';
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
    Database,
    LayoutGrid,
    FileText,
    ArrowRight,
    Settings,
    CheckCircle2,
} from 'lucide-react';
import type { StaticImageData } from 'next/image';
import axialScan from '@/assets/landing/axial.jpeg';
import tractThumb from '@/assets/landing/tract_transparent.png';
import tractHighRes from '@/assets/landing/tract4_transparent.png';

const getImgSrc = (img: string | StaticImageData, fallback: string): string => {
    if (typeof img === 'string') return img;
    return img?.src || fallback;
};

const axialScanSrc = getImgSrc(axialScan, '/assets/landing/axial.jpeg');
const tractThumbSrc = getImgSrc(tractThumb, '/assets/landing/tract_transparent.png');
const tractHighResSrc = getImgSrc(tractHighRes, '/assets/landing/tract4_transparent.png');

// Official SKAI Hummingbird Vector Logo
const SkaiIcon = ({ size = 21, color = '#5cc5d8' }: { size?: number | string; color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 391.9 310.3"
        fill={color}
        stroke={color}
        style={{ width: size, height: 'auto', display: 'block', filter: `drop-shadow(0 0 5px ${color}80)` }}
    >
        <path d="m253.3 271.9 6.8 13.7-.7.6-18.3-27.4c-3.1-4.3-5.2-9.6-9.3-13.2s-8.8-6.2-13.4-9l-5-3-7.8-4.8-11.7-7.2-19.4-12L162 202l-7.8-5c-1.2-.7-4-1.8-4.7-3l-5.4-10-5.3-12-5-11.7-6.8-16.1-4.4-8.8-5.6-9.8-8.2-11.4-4.5-5.3c-6.4-7.3-13.2-12.4-23-13.2l-27.7-2.3-7.3-.7-6.3-.5-7.8-.7-31-2.4a2 2 0 0 1-1.2-.8l7.2-.3 13.7-.5 12.6-.6 14.9-.6 14.3-.5 17-.6c5-.2 9.7-.4 13.8-3.4l5.3-3.8c4.8-4.6 9.7-8.5 15.9-11.1a48 48 0 0 1 53.8 11.7l6.6 7.7 6.8 9.8 7.2 10 3.5 4 .6.8c.2.1-.6.8-.8.7l-9-6c-5.7-4.9-10.2-10-14.8-15.7q-5.7-7.2-13.4-12.4a42 42 0 0 0-40.4-2 32 32 0 0 0-7.5 5.1l-3.8 3.4c-6 5.2-11.9 6.1-9.9 7.1l5.2 2.6 5.6 4.3 6.8 6.8c6.5 6.5 11.4 14 15.8 22l3.2 5.5 2.3 4.6 7.8 17.9 2.5 5.5 8 18.5c5 11.8 2.5 8.9 12.8 15.2l22.7 14 5 3.2 13.8 8.5 9.8 6.2 12.7 8 9.9 6.2 5.1 10.1 4.5 9.3z" />
        <path d="m258.5 75.7-3.3 3.8-5.2 5.8-8.6 9.7-6.8 7.5-6.2 7-13.9 15.3-16 17.8c-1.7 1.8-4.6 3.7-5.6 6l-7.3 16.2-5.2 11-3.5 7.7c-.3.5-1.6 1.9-1.5 1.4l.6-3 6-21 5.3-16.8 11.6-12.5 4.9-5.5 4.3-4.8 3.6-4 8.7-9.6 6.5-7.2 3.5-4 4.4-4.7 8-9.1 3.3-3.6 7.6-8.5 8.2-9q1.9-2.1 4-3.2l8.3-3.8 6-2.7 12.1-5.6 7-3.3 8.7-4 5.9-2.7 10.8-5.2 8.2-3.8 6.7-3 9.7-4.7 6.3-3 8.5-4 5.1-2.3 10.1-4.8 7.9-3.7 4-1.8c.2 0 .8.6.7.8l-4.7 9L378 27l-3.8 7-9.6 18-4.3 8.2-5 9.3a7 7 0 0 1-2.7 2.8l-9.7 4.8-11.8 6-10 4.8-18.8 9.3-22 10.7-3.6 1.6c-.4.2-1.2 1.4-1.3 2-.4 3.8-4.2 7.2-8.3 6.4a7.3 7.3 0 0 1-5.5-10c1.4-3.5 6-5 9.4-3.5.6.3 1.9 1.6 2.5 1.3l3-1.4L291 97l11-5.5 13.7-7 13.6-7 6.4-3.4 13.3-6.9 4-7.5 13-24.2 3.2-6 5.4-10.6 2.3-4.5-6.4 2.7-20.6 9.7-9 4.2-6.3 3-7.8 3.6-16 7.4-10 4.5-10.8 5.1-12.1 5.6-8.4 3.9c-2.4 1-4.2 4-6 6zm11 38c1-.3 2-2.6 1.6-3.4a5 5 0 0 0-2.4-2.1c-1-.4-3 .6-3.3 1.5-.4.8 0 2.6.6 3.4q.8 1.1 3.6.5m-72.1 74.8 5-6.3 6-7.2 8.8-11.2 5.4-6.7c1.1-1.4 2.2-2 3.8-2.8l17.7-8.7 7.8-3.8 17.2-8.4L282 127l4.6-2.3 4.7-2.2 19.1-9.4 4.3-2.2 8.5-4.1 8.4-4.1 20.3-10 17.3-8.5.5-3.3c.6-3.9 4.5-5.8 7.8-5.5 3.6.3 6.5 3.1 6.7 7 .3 4.7-3.1 8.5-8 8-3.4-.3-4.3-2.6-6-1.5L348 100l-22.5 11.3-24.2 12-31 15.4-24.1 12L233 157l-5.3 2.8-5.2 5.7-7 8.4-5.6 6.5-7.2 8.4-3 4.4c-1 1.4-2.6 2-4 .8-1-1-1-2.8.3-4zM379.2 85c.7-1 .7-3.3 0-4-.9-1-3-1.5-4-.9-2.2 1.4-2.2 3.7-1 5.1s3.4 2 5-.2" />
        <path d="m274.2 174 8.5-3.8 14.1-6.5 18.5-8.4 5.3-2.3 7.1-3.1a7 7 0 0 0 3.5-3.6l7-13.1 3.9-7 3.3-6.4-12.2 5.5-7.8 3.6-7.1 3.3-17.9 8-17.4 7.2-12.5 5c-.3.2-.7-.8-.5-1l9-4.6 14-7.6 13.3-6.7 22.6-11.3 7-3.3 19.1-9.5 3.7-1.4-.4 1.6-6.5 12-5.9 10.8-2.6 4.8-4 7.5-2.5 4.4c-.7 1.3-1.8 4.6-3.3 5.3l-8.4 3.9-7.7 3.3-13.6 5.8-12.7 5.6-9.6 4.2-10.6 4.2-11.4 1.8c-.7 0-1.7 1.7-2 2.3-1.3 2.2-4.3 3-6.6 2.3s-4.2-2.6-4.5-5.3c-.5-4 2-7 6-7.1 4.8-.2 4.8 3.5 7.2 3.2l8.2-1.2c2-.3 4.3-1.4 6.4-2.4m-19.2 6.7a2.4 2.4 0 1 0-4.8 0 2.4 2.4 0 0 0 4.8 0m6 83.5c-3.9-.8-5.3-4.6-4.3-8 .7-2.3 3.2-3.7 5.2-3.8 2.4-.2 4.8.7 6.2 2.8s.6 5.3-.3 7.3c-.3.7.5 2.3.9 3l4.6 8.6 2.6 4.8 5.8 10.3c.7 1.2 3 3 4.2 3.8l2.9 1.6-4.7-13.3-6.6-19.3-4.7-13.2-7.6-22-5.2-15.1-9.4-5.5-9.6-6-10.1-6.4-8.3-5.3.3-1 5.1 2.4 10.1 4.7 6.7 3.1 10.5 5 9.4 4.4 7.9 22.9 2.2 6.4 3.8 11 6.1 18 8.1 24 7.3 21-1.4-.5-5-4-7.7-6.2c-2.6-2-6.6-4.2-8-7l-7.7-14.5-6.5-12.7c-.3-.6-2.2-1-3-1.2Zm3.9-5.7a2.3 2.3 0 1 0-4.7 0 2.3 2.3 0 0 0 4.7 0" />
        <circle cx="121.4" cy="91.5" r="5.2" />
    </svg>
);


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

        // 8 Precision radial coordinate tick marks on outer pedestal ring
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const rInner = 2.62;
            const rOuter = 2.78;
            const tickPts = [
                new THREE.Vector3(Math.cos(angle) * rInner, 0, Math.sin(angle) * rInner),
                new THREE.Vector3(Math.cos(angle) * rOuter, 0, Math.sin(angle) * rOuter),
            ];
            const tickGeom = new THREE.BufferGeometry().setFromPoints(tickPts);
            const tickMat = new THREE.LineBasicMaterial({
                color: '#5cc5d8',
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending,
            });
            const tickLine = new THREE.Line(tickGeom, tickMat);
            pedestalGroup.add(tickLine);
        }

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

            {/* Subtle Scientific Telemetry Graticule (Desktop only) */}
            <Box
                position="absolute"
                top={{ base: '11%', md: '13%' }}
                left={{ base: '12%', sm: '18%', md: '21%' }}
                zIndex={4}
                pointerEvents="none"
                display={{ base: 'none', sm: 'block' }}
                opacity={0.8}
            >
                <Flex align="center" gap="6px">
                    <Box w="5px" h="5px" borderRadius="full" bg="#5cc5d8" boxShadow="0 0 6px #5cc5d8" />
                    <Text fontSize="9px" fontWeight="700" color="#5cc5d8" letterSpacing="0.08em" fontFamily="monospace">
                        ACQ: 3T / 10.5T CONNECTOME
                    </Text>
                </Flex>
                <Text fontSize="8px" color="rgba(255,255,255,0.5)" letterSpacing="0.06em" fontFamily="monospace" ml="11px">
                    VOX: 1.25mm³ ISO | b=3000 s/mm²
                </Text>
            </Box>

            {/* ---------------------------------------------------- */}
            {/* CENTRAL 3D TRACTOGRAPHY BRAIN (TRANSPARENT)          */}
            {/* ---------------------------------------------------- */}
            <Box
                position="absolute"
                top={{ base: '44%', md: '44%' }}
                left="50%"
                transform="translate(-50%, -50%)"
                w={{ base: '310px', sm: '390px', md: '460px', lg: '510px' }}
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
                        src={tractHighResSrc}
                        alt="High-Resolution Connectome Tractography Streamlines"
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
                    <SkaiIcon size={22} color="#5cc5d8" />
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

            {/* Card 2: HCP Connectome & White Matter Atlas (Top Right) */}
            <MotionBox
                style={{ x: tx, y: ty }}
                position="absolute"
                top={{ base: '3%', md: '5%' }}
                right={{ base: '2%', sm: '4%', md: '6%' }}
                zIndex={12}
                bg="rgba(13, 21, 39, 0.94)"
                border="1.5px solid rgba(92, 197, 216, 0.45)"
                borderRadius="16px"
                p="12px 16px"
                backdropFilter="blur(20px)"
                boxShadow="0 20px 40px rgba(0,0,0,0.75), 0 0 25px rgba(58, 111, 124, 0.25)"
                animation={`${floatCard} 6.5s ease-in-out infinite 0.5s`}
                _hover={{
                    transform: 'translateY(-3px) scale(1.02)',
                    borderColor: '#5cc5d8',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.85), 0 0 35px rgba(92, 197, 216, 0.45)',
                }}
            >
                <Flex align="center" gap="10px" mb="8px">
                    <Box
                        w="32px"
                        h="32px"
                        borderRadius="8px"
                        overflow="hidden"
                        border="1px solid rgba(92, 197, 216, 0.6)"
                        bg="#0a0f1d"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p="2px"
                    >
                        <Image src={tractThumbSrc} alt="HCP Connectome Atlas" w="100%" h="100%" objectFit="contain" />
                    </Box>
                    <Box>
                        <Text fontSize="12.5px" fontWeight="800" color="white" lineHeight="1.2">
                            HCP Connectome Atlas
                        </Text>
                        <Text fontSize="10px" fontWeight="600" color="#5cc5d8" lineHeight="1.2">
                            500k Streamlines ● iFOD2 ACT
                        </Text>
                    </Box>
                </Flex>

                <Flex align="center" justify="space-between" gap="8px" mb="8px">
                    <Flex
                        align="center"
                        gap="5px"
                        bg="rgba(92, 197, 216, 0.12)"
                        border="1px solid rgba(92, 197, 216, 0.4)"
                        borderRadius="full"
                        px="8px"
                        py="2px"
                    >
                        <CheckCircle2 size={11} color="#5cc5d8" />
                        <Text fontSize="10px" fontWeight="700" color="#5cc5d8">
                            FAIR Verified
                        </Text>
                    </Flex>
                    <Link
                        href="https://brainlife.io/pub/64"
                        isExternal
                        fontSize="9px"
                        fontWeight="600"
                        color="rgba(255,255,255,0.65)"
                        letterSpacing="0.02em"
                        _hover={{ color: '#5cc5d8', textDecoration: 'none' }}
                    >
                        DOI: 10.25663/pub.64 ↗
                    </Link>
                </Flex>
            </MotionBox>

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
