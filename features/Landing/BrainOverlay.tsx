'use client';

import React, { useMemo } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import brainImg2 from '@/assets/landing/tract5.png';

const brainImg2Src = typeof brainImg2 === 'string' ? brainImg2 : (brainImg2 as any)?.src || '/assets/landing/tract5.png';


const floatData = keyframes`
  0% { transform: translate(0, 0); opacity: 0.4; }
  50% { transform: translate(4px, -6px); opacity: 0.8; }
  100% { transform: translate(0, 0); opacity: 0.4; }
`;

const MotionBox = motion.create(Box);

interface BrainOverlayProps {
    yOffset?: MotionValue<number>;
}

export default function BrainOverlay({ yOffset }: BrainOverlayProps) {
    const mvX = useMotionValue(0);
    const mvY = useMotionValue(0);
    const tx = useTransform(mvX, (v) => `${v * 0.02}px`);
    const ty = useTransform(mvY, (v) => `${v * 0.02}px`);

    function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mvX.set(x);
        mvY.set(y);
    }

    const dots = useMemo(
        () =>
            Array.from({ length: 12 }).map((_, i) => ({
                id: i,
                left: 18 + i * 7,
                top: 12 + (i % 3) * 6,
                size: i % 4 === 0 ? 10 : 6,
                delay: (i % 5) * 0.6,
                color: i % 3 === 0 ? 'rgba(141,186,255,0.9)' : i % 3 === 1 ? 'rgba(120,170,230,0.75)' : '#a684ff',
            })),
        []
    );

    return (
        <MotionBox
            style={{ y: yOffset }}
            onMouseMove={handleMouse}
            position="absolute"
            left={{ base: '75%', md: '19%' }}
            top={{ base: '55%', md: '30%' }}
            transform="translate(-50%, -50%)"
            width={{ base: '320px', sm: '400px', md: '700px' }}
            zIndex={1}
            pointerEvents="auto"
            userSelect="none"
        >
            <motion.div
                style={{
                    x: tx,
                    y: ty,
                    width: '100%',
                    position: 'relative',
                    zIndex: 3,
                }}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            >
                <Image
                    src={brainImg2Src}
                    alt="Brain visualization"
                    w="100%"
                    h="auto"
                    display="block"
                    mixBlendMode="screen"
                    style={{
                        maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 85%)',
                        WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 85%)',
                    }}
                    filter="drop-shadow(0 20px 40px rgba(15, 23, 42, 0.12)) blur(0.5px)"
                    opacity={0.15}
                />
            </motion.div>

            <Box position="absolute" inset={0} pointerEvents="none" zIndex={1}>
                {/* subtle atmospheric glow, much reduced */}
                <Box
                    position="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%,-50%)"
                    width="140%"
                    height="140%"
                    background="radial-gradient(circle at 50% 50%, rgba(45, 55, 72, 0.03) 0%, transparent 60%)"
                    filter="blur(40px)"
                />

                {dots.map((d) => (
                    <Box
                        key={d.id}
                        position="absolute"
                        left={`${d.left}%`}
                        top={`${d.top}%`}
                        width={`${d.size / 2}px`}
                        height={`${d.size / 2}px`}
                        borderRadius="50%"
                        bg="rgba(45, 55, 72, 0.4)"
                        opacity={0.6}
                        animation={`${floatData} 8s ${d.delay}s ease-in-out infinite`}
                    />
                ))}
            </Box>
        </MotionBox>
    );
}
