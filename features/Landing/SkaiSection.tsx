'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Grid, Text, Button, Image } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Sparkles, MessageSquare, Cpu, Eye, ArrowRight, Send, Bot, CheckCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import tractography from '@/assets/landing/tractography.jpeg';

const tractographySrc = typeof tractography === 'string' ? tractography : (tractography as StaticImageData)?.src || '/assets/landing/tractography.jpeg';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

const sectionRevealVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

const messageVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface ChatMessage {
    sender: 'user' | 'skai';
    text: string;
    timestamp: string;
}

const chatTimeline = [
    {
        // Step 0: User requests BIDS dataset check
        userMsg: { text: "Scan project #104 for BIDS datasets.", time: "11:42 AM" },
        skaiMsg: { text: "Scanning project files... Found 1 BIDS dataset. I can launch MRtrix3 tractography.", time: "11:42 AM" },
        panelState: 'scan',
        statusText: 'Analyzing files...'
    },
    {
        // Step 1: User approves pipeline launch
        userMsg: { text: "Let's launch the MRtrix3 tractography pipeline with default parameters.", time: "11:43 AM" },
        skaiMsg: { text: "Pipeline launched successfully. Streamlining tracts... Progress: 72%. Feel free to track progress on the right.", time: "11:43 AM" },
        panelState: 'running',
        statusText: 'Running MRtrix3...'
    },
    {
        // Step 2: Visualization complete
        userMsg: { text: "Let me see the output.", time: "11:44 AM" },
        skaiMsg: { text: "Tractography execution complete! Opening the interactive 3D Fiber Tractography Viewer.", time: "11:44 AM" },
        panelState: 'complete',
        statusText: 'Tractography rendering complete'
    }
];

export default function SkaiSection() {
    const [step, setStep] = useState(0);
    const [subStep, setSubStep] = useState(0); // 0: user message appearing, 1: skai typing, 2: skai message appears
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Timeline control loop
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;

        const currentStepData = chatTimeline[step];

        if (subStep === 0) {
            // User message appears
            timer = setTimeout(() => {
                setMessages(prev => [
                    ...(step === 0 ? [] : prev),
                    { sender: 'user', text: currentStepData.userMsg.text, timestamp: currentStepData.userMsg.time }
                ]);
                timer = setTimeout(() => {
                    setSubStep(1);
                }, 1800);
            }, 50);
        } else if (subStep === 1) {
            // SKAI typing indicator is shown (handled in render)
            // Wait 2.2 seconds, then show SKAI response
            timer = setTimeout(() => {
                setSubStep(2);
            }, 2200);
        } else if (subStep === 2) {
            // SKAI message appears
            timer = setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    { sender: 'skai', text: currentStepData.skaiMsg.text, timestamp: currentStepData.skaiMsg.time }
                ]);
                timer = setTimeout(() => {
                    if (step < chatTimeline.length - 1) {
                        setStep(step + 1);
                        setSubStep(0);
                    } else {
                        // Pause on completed screen before resetting
                        timer = setTimeout(() => {
                            setStep(0);
                            setSubStep(0);
                        }, 4000);
                    }
                }, 6000);
            }, 50);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [step, subStep]);

    // Scroll chat container to bottom on message change or typing state change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, subStep]);

    const activePanelState = chatTimeline[step].panelState;

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
                left="-10%"
                top="20%"
                width="600px"
                height="600px"
                background="radial-gradient(circle, rgba(72, 108, 152, 0.06) 0%, transparent 60%)"
                filter="blur(80px)"
                pointerEvents="none"
                zIndex={0}
            />
            <Box
                position="absolute"
                right="-10%"
                bottom="-10%"
                width="500px"
                height="500px"
                background="radial-gradient(circle, rgba(58, 111, 124, 0.04) 0%, transparent 60%)"
                filter="blur(90px)"
                pointerEvents="none"
                zIndex={0}
            />

            <MotionBox
                maxW="1400px"
                mx="auto"
                px="24px"
                position="relative"
                zIndex={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={sectionRevealVariants}
            >
                <Grid
                    templateColumns={{ base: '1fr', lg: '45% 55%' }}
                    gap={{ base: '40px', lg: '48px' }}
                    alignItems="center"
                >
                    {/* Left Column: Heading and info copy */}
                    <Flex direction="column" justify="center" pr={{ lg: '16px' }}>
                        <Box
                            display="inline-flex"
                            alignItems="center"
                            gap="6px"
                            px="10px"
                            py="4px"
                            borderRadius="full"
                            bg="rgba(92, 197, 216, 0.12)"
                            border="1px solid rgba(92, 197, 216, 0.3)"
                            color="#5cc5d8"
                            fontSize="10px"
                            fontWeight="800"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            mb="16px"
                            w="fit-content"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            <Sparkles size={12} />
                            Introducing SKAI
                        </Box>

                        <Text
                            fontSize={{ base: '26px', md: '36px' }}
                            fontWeight="800"
                            color="white"
                            letterSpacing="-0.03em"
                            lineHeight="1.15"
                            mb="16px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Your AI Copilot for Neuroscience
                        </Text>
                        
                        <Text
                            fontSize="14px"
                            color="rgba(248, 250, 252, 0.65)"
                            lineHeight="1.5"
                            mb="28px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Converse, analyze, and build brain models with a specialized assistant. SKAI helps you query open datasets, configure BIDS pipelines, validate inputs, and dispatch computing jobs on distributed HPC clusters.
                        </Text>

                        {/* Feature List */}
                        <Grid templateColumns="1fr" gap="20px" mb="32px">
                            <Flex gap="16px" align="flex-start">
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    borderRadius="8px"
                                    bg="rgba(92, 197, 216, 0.12)"
                                    color="#5cc5d8"
                                    flexShrink={0}
                                    mt="2px"
                                >
                                    <MessageSquare size={18} />
                                </Flex>
                                <Box>
                                    <Text fontSize="14px" fontWeight="700" color="white" mb="2px" fontFamily="'Work Sans', sans-serif">
                                        Conversational Workflows
                                    </Text>
                                    <Text fontSize="12px" color="rgba(248, 250, 252, 0.55)" lineHeight="1.4" fontFamily="'Work Sans', sans-serif">
                                        Ask questions, generate analysis scripts, and inspect neuroimaging datasets in plain English.
                                    </Text>
                                </Box>
                            </Flex>

                            <Flex gap="16px" align="flex-start">
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    borderRadius="8px"
                                    bg="rgba(92, 197, 216, 0.12)"
                                    color="#5cc5d8"
                                    flexShrink={0}
                                    mt="2px"
                                >
                                    <Eye size={18} />
                                </Flex>
                                <Box>
                                    <Text fontSize="14px" fontWeight="700" color="white" mb="2px" fontFamily="'Work Sans', sans-serif">
                                        Interactive Visualizer Panels
                                    </Text>
                                    <Text fontSize="12px" color="rgba(248, 250, 252, 0.55)" lineHeight="1.4" fontFamily="'Work Sans', sans-serif">
                                        Open dynamic plots, volume viewers, and 3D tractography side-by-side with your chat workspace.
                                    </Text>
                                </Box>
                            </Flex>

                            <Flex gap="16px" align="flex-start">
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="36px"
                                    h="36px"
                                    borderRadius="8px"
                                    bg="rgba(92, 197, 216, 0.12)"
                                    color="#5cc5d8"
                                    flexShrink={0}
                                    mt="2px"
                                >
                                    <Cpu size={18} />
                                </Flex>
                                <Box>
                                    <Text fontSize="14px" fontWeight="700" color="white" mb="2px" fontFamily="'Work Sans', sans-serif">
                                        Smart Pipeline Automation
                                    </Text>
                                    <Text fontSize="12px" color="rgba(248, 250, 252, 0.55)" lineHeight="1.4" fontFamily="'Work Sans', sans-serif">
                                        Instantly find, configure, and execute Brainlife apps suited for your specific research goals.
                                    </Text>
                                </Box>
                            </Flex>
                        </Grid>

                        <Button
                            as={NextLink}
                            href="/assistant"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            px="20px"
                            py="10px"
                            h="auto"
                            borderRadius="8px"
                            bg="#5cc5d8"
                            color="#090d16"
                            fontSize="13px"
                            fontWeight={700}
                            _hover={{ bg: '#7fe0f0', transform: 'translateY(-1px)', textDecoration: 'none' }}
                            transition="all 0.2s"
                            rightIcon={<ArrowRight size={14} />}
                            w="fit-content"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Try SKAI Assistant
                        </Button>
                    </Flex>

                    {/* Right Column: Premium Mockup Window */}
                    <Box
                        bg="rgba(15, 23, 42, 0.25)"
                        border="1px solid rgba(255, 255, 255, 0.08)"
                        backdropFilter="blur(20px)"
                        borderRadius="16px"
                        overflow="hidden"
                        boxShadow="0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                        height="430px"
                        w="100%"
                        position="relative"
                    >
                        {/* Mockup Topbar */}
                        <Flex
                            px="16px"
                            py="10px"
                            bg="rgba(15, 23, 42, 0.5)"
                            borderBottom="1px solid rgba(255, 255, 255, 0.06)"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            {/* Window controls circles */}
                            <Flex gap="6px" alignItems="center">
                                <Box w="10px" h="10px" borderRadius="full" bg="#ef4444" opacity={0.6} />
                                <Box w="10px" h="10px" borderRadius="full" bg="#f59e0b" opacity={0.6} />
                                <Box w="10px" h="10px" borderRadius="full" bg="#10b981" opacity={0.6} />
                            </Flex>

                            {/* Center title */}
                            <Flex alignItems="center" gap="6px">
                                <Bot size={13} color="#5cc5d8" />
                                <Text fontSize="11px" fontWeight="700" color="rgba(255, 255, 255, 0.8)" fontFamily="'Work Sans', sans-serif">
                                    SKAI Workspace
                                </Text>
                                <Box w="6px" h="6px" borderRadius="full" bg="#10b981" animation="pulse 1.5s infinite" />
                            </Flex>

                            {/* Status label */}
                            <Text fontSize="9px" color="rgba(255, 255, 255, 0.3)" fontWeight="700" fontFamily="'Work Sans', sans-serif" textTransform="uppercase">
                                {chatTimeline[step].statusText}
                            </Text>
                        </Flex>

                        {/* Split Workspace Mockup */}
                        <Grid templateColumns="45% 55%" h="calc(100% - 37px)">
                            {/* Left panel: Simulated Chat */}
                            <Flex direction="column" h="100%" borderRight="1px solid rgba(255, 255, 255, 0.06)" bg="rgba(10, 15, 30, 0.2)">
                                {/* Messages container */}
                                <Box ref={chatContainerRef} flex="1" overflowY="auto" p="12px" css={{
                                    '&::-webkit-scrollbar': { width: '4px' },
                                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                                    '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px' }
                                }}>
                                    <Flex direction="column" gap="10px">
                                        <AnimatePresence initial={false}>
                                            {messages.map((msg, index) => (
                                                <MotionBox
                                                    key={index}
                                                    variants={messageVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                                                    maxW="85%"
                                                    w="fit-content"
                                                >
                                                    <Box
                                                        bg={msg.sender === 'user' ? 'rgba(92, 197, 216, 0.15)' : 'rgba(255, 255, 255, 0.04)'}
                                                        border="1px solid"
                                                        borderColor={msg.sender === 'user' ? 'rgba(92, 197, 216, 0.3)' : 'rgba(255, 255, 255, 0.06)'}
                                                        borderRadius="10px"
                                                        px="10px"
                                                        py="8px"
                                                    >
                                                        <Text fontSize="11px" color="rgba(255, 255, 255, 0.9)" lineHeight="1.4" fontFamily="'Work Sans', sans-serif">
                                                            {msg.text}
                                                        </Text>
                                                    </Box>
                                                    <Text fontSize="8px" color="rgba(255, 255, 255, 0.3)" mt="2px" textAlign={msg.sender === 'user' ? 'right' : 'left'} fontFamily="'Work Sans', sans-serif">
                                                        {msg.sender === 'user' ? 'You' : 'SKAI'} • {msg.timestamp}
                                                    </Text>
                                                </MotionBox>
                                            ))}
                                        </AnimatePresence>

                                        {/* Typing Indicator */}
                                        {subStep === 1 && (
                                            <MotionBox
                                                variants={messageVariants}
                                                initial="hidden"
                                                animate="visible"
                                                alignSelf="flex-start"
                                                bg="rgba(255, 255, 255, 0.04)"
                                                border="1px solid rgba(255, 255, 255, 0.06)"
                                                borderRadius="10px"
                                                px="12px"
                                                py="10px"
                                            >
                                                <Flex gap="4px" align="center" h="10px">
                                                    <Box w="4px" h="4px" borderRadius="full" bg="#5cc5d8" animation="typing 1s infinite alternate" style={{ animationDelay: '0s' }} />
                                                    <Box w="4px" h="4px" borderRadius="full" bg="#5cc5d8" animation="typing 1s infinite alternate" style={{ animationDelay: '0.2s' }} />
                                                    <Box w="4px" h="4px" borderRadius="full" bg="#5cc5d8" animation="typing 1s infinite alternate" style={{ animationDelay: '0.4s' }} />
                                                </Flex>
                                            </MotionBox>
                                        )}
                                    </Flex>
                                </Box>

                                {/* Input bar */}
                                <Box p="10px" borderTop="1px solid rgba(255, 255, 255, 0.06)" bg="rgba(15, 23, 42, 0.4)">
                                    <Flex gap="6px" align="center" bg="rgba(255,255,255,0.03)" border="1px solid rgba(255,255,255,0.06)" borderRadius="6px" px="8px" py="5px">
                                        <Text fontSize="10px" color="rgba(255, 255, 255, 0.35)" flex="1" fontFamily="'Work Sans', sans-serif" isTruncated>
                                            {subStep === 0 && step === 0 ? "Ask SKAI..." : "Launch pipeline..."}
                                        </Text>
                                        <IconButtonMock />
                                    </Flex>
                                </Box>
                            </Flex>

                            {/* Right panel: Visualization & Progress */}
                            <Box h="100%" bg="rgba(7, 10, 19, 0.4)" position="relative" overflow="hidden">
                                <AnimatePresence mode="wait">
                                    {activePanelState === 'scan' && (
                                        <MotionFlex
                                            key="scan"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            direction="column"
                                            h="100%"
                                            p="16px"
                                            justify="center"
                                            align="center"
                                            gap="12px"
                                        >
                                            <Flex
                                                w="42px"
                                                h="42px"
                                                borderRadius="full"
                                                bg="rgba(92, 197, 216, 0.08)"
                                                border="1px dashed rgba(92, 197, 216, 0.4)"
                                                alignItems="center"
                                                justifyContent="center"
                                                color="#5cc5d8"
                                                animation="spinSlow 6s linear infinite"
                                            >
                                                <RefreshCw size={20} />
                                            </Flex>
                                            <Text fontSize="11px" fontWeight="700" color="white" fontFamily="'Work Sans', sans-serif">
                                                Scanning Project Repository...
                                            </Text>
                                            <Box w="140px" h="3px" bg="rgba(255, 255, 255, 0.08)" borderRadius="full" overflow="hidden" position="relative">
                                                <Box
                                                    position="absolute"
                                                    left={0}
                                                    top={0}
                                                    h="100%"
                                                    w="60px"
                                                    bg="#5cc5d8"
                                                    borderRadius="full"
                                                    animation="progressIndeterminate 1.5s infinite ease-in-out"
                                                />
                                            </Box>
                                        </MotionFlex>
                                    )}

                                    {activePanelState === 'running' && (
                                        <MotionFlex
                                            key="running"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            direction="column"
                                            h="100%"
                                            p="16px"
                                            justify="center"
                                            gap="16px"
                                        >
                                            <Box bg="rgba(15, 23, 42, 0.5)" border="1px solid rgba(255,255,255,0.06)" borderRadius="8px" p="12px">
                                                <Flex justify="space-between" mb="8px" align="center">
                                                    <Text fontSize="10px" fontWeight="700" color="white" fontFamily="'Work Sans', sans-serif">
                                                        MRtrix3 Pipeline Status
                                                    </Text>
                                                    <Text fontSize="9px" fontWeight="800" color="#5cc5d8" fontFamily="'Work Sans', sans-serif">
                                                        72% Complete
                                                    </Text>
                                                </Flex>

                                                {/* Glowing Progress bar */}
                                                <Box w="100%" h="6px" bg="rgba(255, 255, 255, 0.06)" borderRadius="full" overflow="hidden" mb="12px" position="relative">
                                                    <Box
                                                        h="100%"
                                                        w="72%"
                                                        bg="linear-gradient(90deg, #0070f3, #5cc5d8)"
                                                        borderRadius="full"
                                                        boxShadow="0 0 10px rgba(92, 197, 216, 0.5)"
                                                    />
                                                </Box>

                                                {/* Micro status steps */}
                                                <Flex direction="column" gap="6px">
                                                    <Flex align="center" gap="6px" opacity={1}>
                                                        <CheckCircle size={10} color="#10b981" />
                                                        <Text fontSize="8px" color="rgba(255, 255, 255, 0.6)" fontFamily="'Work Sans', sans-serif">
                                                            Read and validate BIDS inputs
                                                        </Text>
                                                    </Flex>
                                                    <Flex align="center" gap="6px" opacity={1}>
                                                        <Flex w="10px" h="10px" borderRadius="full" border="1px solid #5cc5d8" align="center" justify="center" animation="pulse 1s infinite">
                                                            <Box w="4px" h="4px" borderRadius="full" bg="#5cc5d8" />
                                                        </Flex>
                                                        <Text fontSize="8px" color="#5cc5d8" fontWeight="700" fontFamily="'Work Sans', sans-serif">
                                                            Generating FOD pathways...
                                                        </Text>
                                                    </Flex>
                                                    <Flex align="center" gap="6px" opacity={0.4}>
                                                        <Box w="10px" h="10px" borderRadius="full" border="1px solid rgba(255, 255, 255, 0.3)" />
                                                        <Text fontSize="8px" color="rgba(255, 255, 255, 0.6)" fontFamily="'Work Sans', sans-serif">
                                                            Compute streamlines (15,000 count)
                                                        </Text>
                                                    </Flex>
                                                </Flex>
                                            </Box>
                                        </MotionFlex>
                                    )}

                                    {activePanelState === 'complete' && (
                                        <MotionBox
                                            key="complete"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            h="100%"
                                            w="100%"
                                            position="relative"
                                        >
                                            {/* Tractography screenshot mockup */}
                                            <Image
                                                src={tractographySrc}
                                                alt="Mockup Tractography"
                                                w="100%"
                                                h="100%"
                                                objectFit="cover"
                                            />

                                            {/* UI Overlay (glassmorphic 3D viewer chrome) */}
                                            <Box position="absolute" inset="0" bg="linear-gradient(to bottom, rgba(15, 23, 42, 0.4) 0%, transparent 20%, transparent 80%, rgba(15, 23, 42, 0.6) 100%)" pointerEvents="none" />

                                            {/* Top viewer control label */}
                                            <Flex position="absolute" top="8px" left="8px" px="6px" py="3px" borderRadius="4px" bg="rgba(15, 23, 42, 0.7)" border="1px solid rgba(255,255,255,0.08)">
                                                <Text fontSize="8px" fontWeight="700" color="rgba(255,255,255,0.8)" fontFamily="monospace">
                                                    sub-01_dwi.trk (15,000 streamlines)
                                                </Text>
                                            </Flex>

                                            {/* Sidebar viewer control menu */}
                                            <Flex direction="column" gap="4px" position="absolute" top="8px" right="8px" p="4px" borderRadius="6px" bg="rgba(15, 23, 42, 0.7)" border="1px solid rgba(255,255,255,0.08)">
                                                <Flex w="12px" h="12px" borderRadius="2px" border="1px solid rgba(255,255,255,0.2)" bg="rgba(255,255,255,0.05)" align="center" justify="center" _hover={{ border: "1px solid white" }}>
                                                    <Text fontSize="7px" color="white" fontWeight="800" transform="scale(0.8)">3D</Text>
                                                </Flex>
                                                <Flex w="12px" h="12px" borderRadius="2px" border="1px solid rgba(255,255,255,0.2)" bg="rgba(255,255,255,0.05)" align="center" justify="center" _hover={{ border: "1px solid white" }}>
                                                    <Text fontSize="7px" color="white" fontWeight="800" transform="scale(0.8)">Z</Text>
                                                </Flex>
                                                <Flex w="12px" h="12px" borderRadius="2px" border="1px solid rgba(255,255,255,0.2)" bg="rgba(255,255,255,0.05)" align="center" justify="center" _hover={{ border: "1px solid white" }}>
                                                    <Text fontSize="7px" color="white" fontWeight="800" transform="scale(0.8)">R</Text>
                                                </Flex>
                                            </Flex>

                                            {/* Bottom parameters status */}
                                            <Flex position="absolute" bottom="8px" left="8px" right="8px" justify="space-between" bg="rgba(15, 23, 42, 0.75)" border="1px solid rgba(255,255,255,0.08)" borderRadius="6px" px="8px" py="4px">
                                                <Flex gap="10px">
                                                    <Flex direction="column">
                                                        <Text fontSize="6px" color="rgba(255,255,255,0.4)" fontFamily="'Work Sans', sans-serif">MIN LENGTH</Text>
                                                        <Text fontSize="8px" color="white" fontWeight="700" fontFamily="monospace">20mm</Text>
                                                    </Flex>
                                                    <Flex direction="column">
                                                        <Text fontSize="6px" color="rgba(255,255,255,0.4)" fontFamily="'Work Sans', sans-serif">COLORMAP</Text>
                                                        <Text fontSize="8px" color="#5cc5d8" fontWeight="700" fontFamily="monospace">FA (Direction)</Text>
                                                    </Flex>
                                                </Flex>
                                                <Flex align="center">
                                                    <Box w="4px" h="4px" borderRadius="full" bg="#10b981" mr="4px" />
                                                    <Text fontSize="7px" color="#10b981" fontWeight="800" fontFamily="'Work Sans', sans-serif">STABLE RENDER</Text>
                                                </Flex>
                                            </Flex>
                                        </MotionBox>
                                    )}
                                </AnimatePresence>
                            </Box>
                        </Grid>

                        {/* Styles for typing indicator and other animations */}
                        <style>{`
                            @keyframes typing {
                                0% { opacity: 0.2; transform: translateY(0); }
                                100% { opacity: 1; transform: translateY(-2px); }
                            }
                            @keyframes spinSlow {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                            @keyframes progressIndeterminate {
                                0% { left: -60px; }
                                100% { left: 140px; }
                            }
                            @keyframes pulse {
                                0% { opacity: 0.4; }
                                100% { opacity: 1; }
                            }
                        `}</style>
                    </Box>
                </Grid>
            </MotionBox>
        </Box>
    );
}

const IconButtonMock = () => (
    <Flex
        alignItems="center"
        justifyContent="center"
        w="22px"
        h="22px"
        borderRadius="4px"
        bg="rgba(56, 189, 248, 0.15)"
        color="#38bdf8"
        cursor="default"
    >
        <Send size={11} fill="currentColor" />
    </Flex>
);
