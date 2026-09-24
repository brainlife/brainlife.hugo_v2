'use client';

import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    Badge,
    VStack,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const MotionBox = motion.create(Box);

interface FaqItem {
    question: string;
    answer: string;
}

const FAQS: FaqItem[] = [
    {
        question: 'Is the Brainlife Mobile app free?',
        answer:
            'Yes! Brainlife Mobile is 100% free to download and use for all registered researchers, students, and academic labs worldwide with no hidden subscriptions.',
    },
    {
        question: 'Can I launch or retry neuroimaging processes from the app?',
        answer:
            'Yes. While building complex multi-step analysis pipelines from scratch is best done on the web platform, the mobile app allows you to instantly restart failed Slurm jobs, trigger standardized BIDS apps, and monitor pipeline progress in real-time.',
    },
    {
        question: 'How is my research and clinical data secured?',
        answer:
            'Brainlife Mobile uses the exact same enterprise-grade security protocols as our cloud platform, including encrypted OAuth2 authentication, TLS 1.3 in-transit encryption, and role-based access controls compliant with NIH and NSF security standards.',
    },
    {
        question: 'Which mobile platforms and operating systems are supported?',
        answer:
            'Brainlife Mobile is natively built for both iOS (iPhone & iPad, iOS 15.0+) and Android (Android 10.0+).',
    },
    {
        question: 'Will I receive push notifications when my compute jobs finish?',
        answer:
            'Yes. You can customize push notifications for Slurm job completions, error alerts, collaborator data sharing requests, and storage allocation thresholds.',
    },
];

export default function MobileFaqSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const toggleFaq = (idx: number) => {
        setOpenIdx((prev) => (prev === idx ? null : idx));
    };

    return (
        <Box
            py={{ base: '60px', md: '100px' }}
            position="relative"
        >
            <Container
                maxW="clamp(100%, 90vw, 1000px)"
                mx="auto"
                px={{ base: '16px', md: '32px' }}
            >
                {/* SECTION HEADER */}
                <Box textAlign="center" mb={{ base: '44px', md: '64px' }} position="relative">
                    <Text
                        fontSize={{ base: '50px', sm: '70px', md: '90px' }}
                        fontWeight={900}
                        color="rgba(255, 255, 255, 0.08)"
                        letterSpacing="-0.04em"
                        lineHeight="0.85"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        pointerEvents="none"
                    >
                        Frequently
                    </Text>
                    <Heading
                        as="h2"
                        fontSize={{ base: '26px', sm: '34px', md: '42px' }}
                        fontWeight={900}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.03em"
                        mt={{ base: '-16px', sm: '-22px', md: '-28px' }}
                        mb="14px"
                    >
                        Asked Questions
                    </Heading>
                    <Text
                        fontSize={{ base: '15px', md: '16.5px' }}
                        color="#94a3b8"
                        lineHeight="1.7"
                        fontFamily="'Work Sans', sans-serif"
                    >
                        Everything you need to know about using Brainlife on your mobile devices.
                    </Text>
                </Box>

                {/* ACCORDION LIST */}
                <VStack spacing="14px" align="stretch">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <Box
                                key={idx}
                                borderRadius="14px"
                                bg="#162032"
                                border="1px solid"
                                borderColor={isOpen ? 'rgba(38, 147, 216, 0.45)' : 'rgba(255, 255, 255, 0.08)'}
                                boxShadow="0 8px 20px rgba(0, 0, 0, 0.25)"
                                overflow="hidden"
                                transition="all 0.2s ease"
                            >
                                <Flex
                                    justify="space-between"
                                    align="center"
                                    p={{ base: '18px 20px', md: '22px 26px' }}
                                    cursor="pointer"
                                    onClick={() => toggleFaq(idx)}
                                    userSelect="none"
                                >
                                    <Text
                                        fontSize={{ base: '15.5px', md: '17px' }}
                                        fontWeight={600}
                                        color={isOpen ? 'white' : 'rgba(255, 255, 255, 0.85)'}
                                        fontFamily="'Work Sans', sans-serif"
                                        pr="16px"
                                    >
                                        {faq.question}
                                    </Text>
                                    <Box
                                        w="30px"
                                        h="30px"
                                        borderRadius="full"
                                        bg={isOpen ? 'rgba(38, 147, 216, 0.15)' : 'rgba(255, 255, 255, 0.06)'}
                                        border="1px solid"
                                        borderColor={isOpen ? 'rgba(38, 147, 216, 0.35)' : 'rgba(255, 255, 255, 0.1)'}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexShrink={0}
                                        color={isOpen ? '#2693D8' : '#94a3b8'}
                                        transition="all 0.2s ease"
                                    >
                                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                    </Box>
                                </Flex>

                                <AnimatePresence>
                                    {isOpen && (
                                        <MotionBox
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        >
                                            <Box
                                                px={{ base: '20px', md: '26px' }}
                                                pb={{ base: '20px', md: '24px' }}
                                                pt="0"
                                            >
                                                <Text
                                                    fontSize="14px"
                                                    color="#94a3b8"
                                                    lineHeight="1.7"
                                                    fontFamily="'Work Sans', sans-serif"
                                                >
                                                    {faq.answer}
                                                </Text>
                                            </Box>
                                        </MotionBox>
                                    )}
                                </AnimatePresence>
                            </Box>
                        );
                    })}
                </VStack>
            </Container>
        </Box>
    );
}
