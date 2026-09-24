'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.svg';

const logoSrc = typeof logo === 'string' ? logo : (logo as any)?.src || '/logo.svg';


const MotionBox = motion.create(Box);

export default function PreloaderCurtain({ onComplete }: { onComplete?: () => void }) {
    const [count, setCount] = useState(0);
    const [isOpening, setIsOpening] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Prevent body scroll during preloader
        document.body.style.overflow = 'hidden';

        const startTime = Date.now();
        const duration = 1800; // 1.8 seconds counting duration

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(1, elapsed / duration);

            const currentCount = Math.floor(progress * 100);
            setCount(currentCount);

            if (progress >= 1) {
                clearInterval(timer);
                setCount(100);
                setTimeout(() => {
                    setIsOpening(true);
                }, 150);
            }
        }, 16);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (isOpening) {
            const timeout = setTimeout(() => {
                setIsComplete(true);
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }, 850);
            return () => clearTimeout(timeout);
        }
    }, [isOpening, onComplete]);

    if (isComplete) return null;

    const formattedCount = String(count).padStart(3, '0');

    return (
        <AnimatePresence>
            <Box
                position="fixed"
                inset={0}
                zIndex={99999}
                pointerEvents={isOpening ? 'none' : 'auto'}
                overflow="hidden"
            >
                {/* Top Half Curtain */}
                <MotionBox
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="50vh"
                    bg="radial-gradient(circle at 50% 100%, #1e293b 0%, #0f172a 100%)"
                    borderBottom="1px solid rgba(255, 255, 255, 0.1)"
                    initial={{ y: 0 }}
                    animate={{ y: isOpening ? '-100%' : 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-end"
                    pb="20px"
                >
                    {/* Logo ON TOP of count */}
                    <Box mb="8px">
                        <Image
                            src={logoSrc}
                            alt="Brainlife"
                            w={{ base: '44px', md: '56px' }}
                            h={{ base: '44px', md: '56px' }}
                            objectFit="contain"
                            filter="drop-shadow(0 0 12px rgba(92, 197, 216, 0.5))"
                        />
                    </Box>

                    {/* Big Counter Display with bottom padding/margin */}
                    <Text
                        fontSize={{ base: '80px', sm: '110px', md: '140px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.04em"
                        lineHeight={0.9}
                        userSelect="none"
                        mb="12px"
                        pb="4px"
                        style={{
                            textShadow: '0 0 35px rgba(92, 197, 216, 0.35)',
                        }}
                    >
                        {formattedCount}
                    </Text>

                    {/* Progress Bar (Bottom line of Top curtain) */}
                    <Box
                        position="absolute"
                        left={0}
                        bottom={0}
                        h="2px"
                        bg="linear-gradient(90deg, #5cc5d8, #60a5fa, #34d399)"
                        style={{ width: `${count}%` }}
                        transition="width 0.05s linear"
                        boxShadow="0 0 10px #5cc5d8"
                    />
                </MotionBox>

                {/* Bottom Half Curtain */}
                <MotionBox
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    h="50vh"
                    bg="radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)"
                    borderTop="1px solid rgba(255, 255, 255, 0.1)"
                    initial={{ y: 0 }}
                    animate={{ y: isOpening ? '100%' : 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    pt="24px"
                >
                    {/* Progress Bar (Top line of Bottom curtain) */}
                    <Box
                        position="absolute"
                        left={0}
                        top={0}
                        h="2px"
                        bg="linear-gradient(90deg, #5cc5d8, #60a5fa, #34d399)"
                        style={{ width: `${count}%` }}
                        transition="width 0.05s linear"
                        boxShadow="0 0 10px #5cc5d8"
                    />

                    {/* Brainlife Brand Name with padding/margin top */}
                    <Text
                        fontSize={{ base: '24px', sm: '32px', md: '42px' }}
                        fontWeight={900}
                        color="white"
                        letterSpacing="0.12em"
                        textTransform="uppercase"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        mt="8px"
                        pt="4px"
                        style={{
                            textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                        }}
                    >
                        Brainlife
                    </Text>
                </MotionBox>
            </Box>
        </AnimatePresence>
    );
}
