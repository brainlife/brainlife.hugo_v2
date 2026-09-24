'use client';

import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Badge,
    Button,
    Stack,
    Link,
    Divider,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    ExternalLink,
    GraduationCap,
    BookOpen,
    Building2,
    Share2,
    CheckCircle2,
    ArrowUpRight,
    Brain,
} from 'lucide-react';
import type { TeamMember } from '../teamData';

interface MemberInspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: TeamMember | null;
    category?: string;
}

export default function MemberInspectionModal({
    isOpen,
    onClose,
    member,
    category = 'Team Member',
}: MemberInspectionModalProps) {
    if (!member) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'md', md: 'xl' }}>
            <ModalOverlay bg="rgba(7, 10, 15, 0.85)" backdropFilter="blur(12px)" />
            <ModalContent
                bg="#162032"
                border="1px solid rgba(255, 255, 255, 0.12)"
                boxShadow="0 25px 60px rgba(0, 0, 0, 0.8)"
                borderRadius="18px"
                color="white"
                overflow="hidden"
                mx="16px"
            >
                {/* Top Accent Strip */}
                <Box
                    h="4px"
                    w="100%"
                    bg="#2693D8"
                />

                <ModalCloseButton color="white" mt="10px" mr="10px" zIndex={10} />

                <ModalBody p={{ base: '28px 20px', md: '36px 32px' }}>
                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        gap={{ base: '20px', sm: '24px' }}
                        alignItems={{ base: 'center', sm: 'flex-start' }}
                        mb="24px"
                    >
                        {/* High-Tech Avatar Container */}
                        <Box position="relative" flexShrink={0}>
                            <Box
                                w={{ base: '100px', sm: '120px' }}
                                h={{ base: '100px', sm: '120px' }}
                                borderRadius="16px"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.15)"
                                boxShadow="0 8px 24px rgba(0,0,0,0.5)"
                                bg="#0e1626"
                            >
                                <Image
                                    src={member.avatar}
                                    alt={member.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    fallbackSrc="/img/team/person.png"
                                />
                            </Box>
                            {/* Indicator */}
                            <Box
                                position="absolute"
                                bottom="-4px"
                                right="-4px"
                                p="6px"
                                borderRadius="full"
                                bg="#0e1626"
                                border="1px solid rgba(38, 147, 216, 0.4)"
                            >
                                <Brain size={16} color="#2693D8" />
                            </Box>
                        </Box>

                        {/* Title & Role Info */}
                        <Box textAlign={{ base: 'center', sm: 'left' }} flex="1">
                            <Badge
                                bg="rgba(38, 147, 216, 0.15)"
                                color="#2693D8"
                                border="1px solid rgba(38, 147, 216, 0.35)"
                                px="10px"
                                py="3px"
                                borderRadius="6px"
                                fontSize="11px"
                                fontWeight={700}
                                letterSpacing="0.06em"
                                textTransform="uppercase"
                                mb="8px"
                            >
                                {category}
                            </Badge>

                            <Heading
                                as="h2"
                                fontSize={{ base: '24px', md: '28px' }}
                                fontWeight={900}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                letterSpacing="-0.02em"
                                lineHeight="1.15"
                            >
                                {member.name}
                            </Heading>

                            <Text
                                fontSize="14px"
                                fontWeight={600}
                                color="#2693D8"
                                fontFamily="'Work Sans', sans-serif"
                                mt="4px"
                                lineHeight="1.4"
                            >
                                {member.title}
                            </Text>

                            {member.url && (
                                <Link
                                    href={member.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="inline-flex"
                                    alignItems="center"
                                    gap="6px"
                                    fontSize="12.5px"
                                    fontWeight={700}
                                    color="#2693D8"
                                    _hover={{ bg: 'rgba(38, 147, 216, 0.2)', color: 'white', textDecoration: 'none' }}
                                    mt="12px"
                                    px="12px"
                                    py="4px"
                                    borderRadius="6px"
                                    bg="rgba(38, 147, 216, 0.1)"
                                    border="1px solid rgba(38, 147, 216, 0.3)"
                                    transition="all 0.2s ease"
                                >
                                    View Official Profile / Publications <ArrowUpRight size={14} />
                                </Link>
                            )}
                        </Box>
                    </Flex>

                    <Divider borderColor="rgba(255, 255, 255, 0.08)" mb="20px" />

                    {/* Biography Section */}
                    <Box mb="24px">
                        <Text
                            fontSize="11px"
                            fontWeight={800}
                            color="#94a3b8"
                            letterSpacing="0.1em"
                            textTransform="uppercase"
                            mb="8px"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Background &amp; Research Focus
                        </Text>
                        <Text
                            fontSize="14px"
                            lineHeight="1.7"
                            color="rgba(248, 250, 252, 0.9)"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            {member.bio ||
                                `${member.name} is an active contributor to the brainlife.io ecosystem, supporting open reproducible neuroscience research and cloud-scale analytical tools.`}
                        </Text>
                    </Box>

                    {/* Scientific Principles Badge Row */}
                    <Flex wrap="wrap" gap="8px" pt="6px">
                        <Badge
                            bg="rgba(255, 255, 255, 0.05)"
                            color="#cbd5e1"
                            fontSize="11px"
                            px="10px"
                            py="4px"
                            borderRadius="6px"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            Open Science
                        </Badge>
                        <Badge
                            bg="rgba(255, 255, 255, 0.05)"
                            color="#cbd5e1"
                            fontSize="11px"
                            px="10px"
                            py="4px"
                            borderRadius="6px"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            Reproducible Computing
                        </Badge>
                        <Badge
                            bg="rgba(255, 255, 255, 0.05)"
                            color="#cbd5e1"
                            fontSize="11px"
                            px="10px"
                            py="4px"
                            borderRadius="6px"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            BIDS Compatible
                        </Badge>
                        <Badge
                            bg="rgba(255, 255, 255, 0.05)"
                            color="#cbd5e1"
                            fontSize="11px"
                            px="10px"
                            py="4px"
                            borderRadius="6px"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                        >
                            Brain Connectivity
                        </Badge>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
