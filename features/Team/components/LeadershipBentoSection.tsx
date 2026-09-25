'use client';

import React from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Image,
    Badge,
} from '@chakra-ui/react';
import { ACTIVE_MEMBERS, type TeamMember } from '../teamData';
import { getAssetPath } from '@/lib/basePath';

interface LeadershipBentoSectionProps {
    onSelectMember: (member: TeamMember) => void;
}

export default function LeadershipBentoSection({ onSelectMember }: LeadershipBentoSectionProps) {
    const director = ACTIVE_MEMBERS.find((m) => m.name.includes('Franco')) || ACTIVE_MEMBERS[0];
    const kimRay = ACTIVE_MEMBERS.find((m) => m.name.includes('Kimberly')) || ACTIVE_MEMBERS[1];
    const anibal = ACTIVE_MEMBERS.find((m) => m.name.includes('Anibal')) || ACTIVE_MEMBERS[0];
    const taylor = ACTIVE_MEMBERS.find((m) => m.name.includes('Taylor')) || ACTIVE_MEMBERS[0];
    const nick = ACTIVE_MEMBERS.find((m) => m.name.includes('Nicholas')) || ACTIVE_MEMBERS[0];

    return (
        <Box mb={{ base: '56px', md: '80px' }}>
            {/* Section Header */}
            <Box mb="28px">
                <Text
                    fontSize="12px"
                    fontWeight={700}
                    color="#2693D8"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    fontFamily="'Work Sans', sans-serif"
                    mb="6px"
                >
                    Core Leadership &amp; Engineering
                </Text>
                <Heading
                    fontSize={{ base: '24px', md: '30px' }}
                    fontWeight={900}
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                    letterSpacing="-0.02em"
                >
                    Current Team
                </Heading>
                <Text fontSize="14.5px" color="#94a3b8" mt="4px" maxW="720px">
                    Meet the researchers, computer scientists, and software architects spearheading the brainlife.io ecosystem.
                </Text>
            </Box>

            {/* BENTO GRID LAYOUT */}
            <Grid
                templateColumns={{
                    base: '1fr',
                    lg: 'repeat(12, 1fr)',
                }}
                gap={{ base: '16px', md: '20px' }}
            >
                {/* 1. HERO BENTO TILE: FRANCO PESTILLI (Span 8 cols) */}
                <Box
                    role="group"
                    gridColumn={{ base: 'span 1', lg: 'span 8' }}
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                    p={{ base: '22px 18px', md: '32px 28px' }}
                    cursor="pointer"
                    onClick={() => onSelectMember(director)}
                    transition="all 0.2s ease"
                    _hover={{
                        borderColor: '#2693D8',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    }}
                >
                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        gap={{ base: '18px', sm: '24px' }}
                        alignItems={{ base: 'center', sm: 'flex-start' }}
                        position="relative"
                        zIndex={1}
                    >
                        {/* Director Portrait */}
                        <Box position="relative" flexShrink={0}>
                            <Box
                                w={{ base: '100px', sm: '130px', md: '140px' }}
                                h={{ base: '100px', sm: '130px', md: '140px' }}
                                borderRadius="14px"
                                overflow="hidden"
                                border="1px solid rgba(38, 147, 216, 0.35)"
                                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                            >
                                <Image
                                    src={director.avatar}
                                    alt={director.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    filter="grayscale(100%)"
                                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                                    _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.05)' }}
                                    fallbackSrc={getAssetPath('/img/team/person.png')}
                                />
                            </Box>
                        </Box>

                        {/* Info & Vision */}
                        <Box flex="1" textAlign={{ base: 'center', sm: 'left' }}>
                            <Badge
                                bg="rgba(38, 147, 216, 0.15)"
                                color="#2693D8"
                                border="1px solid rgba(38, 147, 216, 0.35)"
                                fontSize="10px"
                                fontWeight={800}
                                letterSpacing="0.08em"
                                px="8px"
                                py="2px"
                                borderRadius="4px"
                                textTransform="uppercase"
                                display="inline-block"
                                mb="6px"
                            >
                                FOUNDER &amp; PI
                            </Badge>
                            <Heading
                                as="h3"
                                fontSize={{ base: '22px', md: '26px' }}
                                fontWeight={900}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                letterSpacing="-0.02em"
                            >
                                {director.name}
                            </Heading>
                            <Text
                                fontSize="13.5px"
                                fontWeight={600}
                                color="#2693D8"
                                fontFamily="'Work Sans', sans-serif"
                                mt="2px"
                            >
                                {director.title} • UT Austin Psychology &amp; Neuroscience
                            </Text>

                            <Text
                                fontSize="13px"
                                lineHeight="1.6"
                                color="#cbd5e1"
                                fontFamily="'Work Sans', sans-serif"
                                mt="10px"
                                noOfLines={{ base: 4, md: 4 }}
                            >
                                {director.bio}
                            </Text>

                            {/* Accolades & Focus Tags */}
                            <Flex wrap="wrap" gap="6px" mt="14px" justify={{ base: 'center', sm: 'flex-start' }}>
                                <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" px="8px" py="2px" borderRadius="4px" fontSize="10px">
                                    BRAIN Initiative
                                </Badge>
                                <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" px="8px" py="2px" borderRadius="4px" fontSize="10px">
                                    BIDS Networks Lead
                                </Badge>
                                <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" px="8px" py="2px" borderRadius="4px" fontSize="10px">
                                    Microsoft Investigator Fellow
                                </Badge>
                                <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" px="8px" py="2px" borderRadius="4px" fontSize="10px">
                                    Janet Taylor Spence Award
                                </Badge>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>

                {/* 2. BENTO TILE: ANIBAL SOLON HEINSFELD (Span 4 cols) */}
                <Box
                    role="group"
                    gridColumn={{ base: 'span 1', lg: 'span 4' }}
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                    p={{ base: '22px 18px', md: '26px 22px' }}
                    cursor="pointer"
                    onClick={() => onSelectMember(anibal)}
                    transition="all 0.2s ease"
                    _hover={{
                        borderColor: '#2693D8',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box>
                        <Flex alignItems="center" gap="12px" mb="12px">
                            <Box
                                w="56px"
                                h="56px"
                                borderRadius="12px"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.12)"
                                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                                flexShrink={0}
                            >
                                <Image
                                    src={anibal.avatar}
                                    alt={anibal.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    filter="grayscale(100%)"
                                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                                    _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.06)' }}
                                    fallbackSrc={getAssetPath('/img/team/person.png')}
                                />
                            </Box>
                            <Box>
                                <Badge bg="rgba(38, 147, 216, 0.15)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.35)" fontSize="9.5px" px="6px" py="1px" borderRadius="4px">
                                    TECH LEAD
                                </Badge>
                                <Heading as="h4" fontSize="17px" fontWeight={800} color="white" mt="3px">
                                    {anibal.name}
                                </Heading>
                                <Text fontSize="12px" color="#2693D8" fontWeight={600}>
                                    Machine Learning &amp; Brain Networks
                                </Text>
                            </Box>
                        </Flex>

                        <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.55" noOfLines={4}>
                            {anibal.bio}
                        </Text>
                    </Box>

                    <Flex wrap="wrap" gap="5px" mt="14px" pt="10px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">C-PAC</Badge>
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">OpenNeuro</Badge>
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">BrainBox</Badge>
                    </Flex>
                </Box>

                {/* 3. BENTO TILE: KIMBERLY RAY (Span 4 cols) */}
                <Box
                    role="group"
                    gridColumn={{ base: 'span 1', lg: 'span 4' }}
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                    p={{ base: '22px 18px', md: '26px 22px' }}
                    cursor="pointer"
                    onClick={() => onSelectMember(kimRay)}
                    transition="all 0.2s ease"
                    _hover={{
                        borderColor: '#2693D8',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box>
                        <Flex alignItems="center" gap="12px" mb="12px">
                            <Box
                                w="56px"
                                h="56px"
                                borderRadius="12px"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.12)"
                                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                                flexShrink={0}
                            >
                                <Image
                                    src={kimRay.avatar}
                                    alt={kimRay.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    filter="grayscale(100%)"
                                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                                    _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.06)' }}
                                    fallbackSrc={getAssetPath('/img/team/person.png')}
                                />
                            </Box>
                            <Box>
                                <Badge bg="rgba(38, 147, 216, 0.15)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.35)" fontSize="9.5px" px="6px" py="1px" borderRadius="4px">
                                    ENGAGEMENT &amp; RESEARCH
                                </Badge>
                                <Heading as="h4" fontSize="17px" fontWeight={800} color="white" mt="3px">
                                    {kimRay.name}
                                </Heading>
                                <Text fontSize="12px" color="#2693D8" fontWeight={600}>
                                    Research Assistant Professor
                                </Text>
                            </Box>
                        </Flex>

                        <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.55" noOfLines={4}>
                            {kimRay.bio}
                        </Text>
                    </Box>

                    <Flex wrap="wrap" gap="5px" mt="14px" pt="10px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Human NeuroImaging</Badge>
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Mental Health</Badge>
                    </Flex>
                </Box>

                {/* 4. BENTO TILE: TAYLOR GRAFFT (Span 4 cols) */}
                <Box
                    role="group"
                    gridColumn={{ base: 'span 1', lg: 'span 4' }}
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                    p={{ base: '22px 18px', md: '26px 22px' }}
                    cursor="pointer"
                    onClick={() => onSelectMember(taylor)}
                    transition="all 0.2s ease"
                    _hover={{
                        borderColor: '#2693D8',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box>
                        <Flex alignItems="center" gap="12px" mb="12px">
                            <Box
                                w="56px"
                                h="56px"
                                borderRadius="12px"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.12)"
                                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                                flexShrink={0}
                            >
                                <Image
                                    src={taylor.avatar}
                                    alt={taylor.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    filter="grayscale(100%)"
                                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                                    _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.06)' }}
                                    fallbackSrc={getAssetPath('/img/team/person.png')}
                                />
                            </Box>
                            <Box>
                                <Badge bg="rgba(38, 147, 216, 0.15)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.35)" fontSize="9.5px" px="6px" py="1px" borderRadius="4px">
                                    CLOUD &amp; HPC
                                </Badge>
                                <Heading as="h4" fontSize="17px" fontWeight={800} color="white" mt="3px">
                                    {taylor.name}
                                </Heading>
                                <Text fontSize="12px" color="#2693D8" fontWeight={600}>
                                    Software Engineer
                                </Text>
                            </Box>
                        </Flex>

                        <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.55" noOfLines={4}>
                            {taylor.bio}
                        </Text>
                    </Box>

                    <Flex wrap="wrap" gap="5px" mt="14px" pt="10px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Infrastructure</Badge>
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Cloud Integration</Badge>
                    </Flex>
                </Box>

                {/* 5. BENTO TILE: NICHOLAS LEE (Span 4 cols) */}
                <Box
                    role="group"
                    gridColumn={{ base: 'span 1', lg: 'span 4' }}
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(255, 255, 255, 0.1)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
                    p={{ base: '22px 18px', md: '26px 22px' }}
                    cursor="pointer"
                    onClick={() => onSelectMember(nick)}
                    transition="all 0.2s ease"
                    _hover={{
                        borderColor: '#2693D8',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
                        transform: 'translateY(-2px)',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box>
                        <Flex alignItems="center" gap="12px" mb="12px">
                            <Box
                                w="56px"
                                h="56px"
                                borderRadius="12px"
                                overflow="hidden"
                                border="1px solid rgba(255, 255, 255, 0.12)"
                                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                                flexShrink={0}
                            >
                                <Image
                                    src={nick.avatar}
                                    alt={nick.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    filter="grayscale(100%)"
                                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                                    _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.06)' }}
                                    fallbackSrc={getAssetPath('/img/team/person.png')}
                                />
                            </Box>
                            <Box>
                                <Badge bg="rgba(38, 147, 216, 0.15)" color="#2693D8" border="1px solid rgba(38, 147, 216, 0.35)" fontSize="9.5px" px="6px" py="1px" borderRadius="4px">
                                    FRONTEND &amp; UX
                                </Badge>
                                <Heading as="h4" fontSize="17px" fontWeight={800} color="white" mt="3px">
                                    {nick.name}
                                </Heading>
                                <Text fontSize="12px" color="#2693D8" fontWeight={600}>
                                    Software Engineer
                                </Text>
                            </Box>
                        </Flex>

                        <Text fontSize="12.5px" color="#cbd5e1" lineHeight="1.55" noOfLines={4}>
                            {nick.bio}
                        </Text>
                    </Box>

                    <Flex wrap="wrap" gap="5px" mt="14px" pt="10px" borderTop="1px solid rgba(255, 255, 255, 0.06)">
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Next.js &amp; UI</Badge>
                        <Badge bg="rgba(255, 255, 255, 0.05)" color="#cbd5e1" border="1px solid rgba(255, 255, 255, 0.08)" fontSize="9.5px">Workflows</Badge>
                    </Flex>
                </Box>
            </Grid>
        </Box>
    );
}
