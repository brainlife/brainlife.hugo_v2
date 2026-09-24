'use client';

import React, { useRef, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton,
    HStack,
    Kbd,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
    Users,
    Sparkles,
    HeartHandshake,
    GitPullRequest,
    History,
    Search,
    X,
} from 'lucide-react';

const MotionBox = motion.create(Box);

interface FilterTab {
    id: string;
    label: string;
    count: number;
    icon: React.ReactNode;
}

interface TeamDirectoryFilterBarProps {
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    counts: {
        all: number;
        active: number;
        collaborators: number;
        contributors: number;
        alumni: number;
    };
}

export default function TeamDirectoryFilterBar({
    selectedCategory,
    onSelectCategory,
    searchQuery,
    onSearchChange,
    counts,
}: TeamDirectoryFilterBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Global keyboard listener: press "/" or Cmd+K / Ctrl+K to jump to search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping =
                target?.tagName === 'INPUT' ||
                target?.tagName === 'TEXTAREA' ||
                target?.isContentEditable;

            if (
                (e.key === '/' && !isTyping) ||
                ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')
            ) {
                e.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const TABS: FilterTab[] = [
        {
            id: 'active',
            label: 'Team',
            count: counts.active,
            icon: <Sparkles size={14} />,
        },
        {
            id: 'collaborators',
            label: 'Collaborators',
            count: counts.collaborators,
            icon: <HeartHandshake size={14} />,
        },
        ...(counts.contributors > 0
            ? [
                  {
                      id: 'contributors',
                      label: 'Contributors',
                      count: counts.contributors,
                      icon: <GitPullRequest size={14} />,
                  },
              ]
            : []),
        {
            id: 'alumni',
            label: 'Alumni',
            count: counts.alumni,
            icon: <History size={14} />,
        },
        {
            id: 'all',
            label: 'All',
            count: counts.all,
            icon: <Users size={14} />,
        },
    ];

    return (
        <Box
            id="team-directory"
            position="sticky"
            top={{ base: '70px', md: '76px' }}
            zIndex={30}
            mb={{ base: '32px', md: '44px' }}
            p={{ base: '8px 10px', md: '8px 14px' }}
            borderRadius={{ base: '14px', md: '16px' }}
            bg="rgba(14, 22, 38, 0.92)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.45)"
            transition="all 0.25s ease"
        >
            <Flex
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
                alignItems={{ base: 'stretch', lg: 'center' }}
                gap={{ base: '10px', lg: '16px' }}
            >
                {/* SEGMENTED FILTER PILL TRACK */}
                <Box
                    p="3px"
                    borderRadius="full"
                    bg="#0a0f1d"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    overflowX="auto"
                    sx={{
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    }}
                >
                    <HStack spacing="2px" minW="max-content">
                        {TABS.map((tab) => {
                            const isSelected = selectedCategory === tab.id;
                            return (
                                <Box
                                    key={tab.id}
                                    position="relative"
                                    onClick={() => onSelectCategory(tab.id)}
                                    cursor="pointer"
                                    px={{ base: '12px', md: '15px' }}
                                    py="6px"
                                    borderRadius="full"
                                    userSelect="none"
                                    transition="color 0.2s ease"
                                >
                                    {/* Active Pill Highlight Animation */}
                                    {isSelected && (
                                        <MotionBox
                                            layoutId="activeFilterPill"
                                            position="absolute"
                                            inset={0}
                                            borderRadius="full"
                                            bg="#2693D8"
                                            border="1px solid #2693D8"
                                            boxShadow="0 2px 8px rgba(38, 147, 216, 0.35)"
                                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                            zIndex={1}
                                        />
                                    )}

                                    {/* Tab Content */}
                                    <Flex
                                        alignItems="center"
                                        gap="7px"
                                        position="relative"
                                        zIndex={2}
                                    >
                                        <Box
                                            color={isSelected ? 'white' : '#94a3b8'}
                                            transition="color 0.2s ease"
                                            display="flex"
                                            alignItems="center"
                                        >
                                            {tab.icon}
                                        </Box>
                                        <Text
                                            fontSize="13px"
                                            fontWeight={isSelected ? 700 : 500}
                                            color={isSelected ? 'white' : '#cbd5e1'}
                                            fontFamily="'Work Sans', sans-serif"
                                            letterSpacing="-0.01em"
                                            transition="color 0.2s ease"
                                        >
                                            {tab.label}
                                        </Text>

                                        {/* Count Pill Badge */}
                                        <Box
                                            px="6px"
                                            py="1px"
                                            borderRadius="full"
                                            bg={
                                                isSelected
                                                    ? 'rgba(255, 255, 255, 0.22)'
                                                    : 'rgba(255, 255, 255, 0.08)'
                                            }
                                            border="none"
                                            color={isSelected ? 'white' : '#94a3b8'}
                                            fontSize="11px"
                                            fontWeight={700}
                                            fontFamily="'Work Sans', sans-serif"
                                            transition="all 0.2s ease"
                                        >
                                            {tab.count}
                                        </Box>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </HStack>
                </Box>

                {/* SEARCH INPUT BAR */}
                <Box minW={{ base: '100%', md: '280px', lg: '320px' }}>
                    <InputGroup size="sm">
                        <InputLeftElement pointerEvents="none" h="100%" pl="12px">
                            <Search
                                size={14}
                                color={searchQuery ? '#2693D8' : '#94a3b8'}
                                style={{ transition: 'color 0.2s ease' }}
                            />
                        </InputLeftElement>
                        <Input
                            ref={inputRef}
                            placeholder="Search people, roles, expertise..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            bg="#0a0f1d"
                            borderColor="rgba(255, 255, 255, 0.12)"
                            borderRadius="full"
                            color="white"
                            fontSize="12.5px"
                            fontFamily="'Work Sans', sans-serif"
                            h="36px"
                            pl="36px"
                            pr={searchQuery ? '36px' : '48px'}
                            _placeholder={{ color: '#64748b', fontSize: '12px' }}
                            _hover={{
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                bg: '#0e1626',
                            }}
                            _focus={{
                                borderColor: '#2693D8',
                                boxShadow: '0 0 0 1px #2693D8',
                                bg: '#0e1626',
                            }}
                            transition="all 0.2s ease"
                        />
                        {searchQuery ? (
                            <InputRightElement h="100%" pr="6px">
                                <IconButton
                                    aria-label="Clear search"
                                    icon={<X size={13} />}
                                    size="xs"
                                    variant="ghost"
                                    color="rgba(255, 255, 255, 0.6)"
                                    borderRadius="full"
                                    _hover={{ color: 'white', bg: 'rgba(255, 255, 255, 0.1)' }}
                                    onClick={() => {
                                        onSearchChange('');
                                        inputRef.current?.focus();
                                    }}
                                />
                            </InputRightElement>
                        ) : (
                            <InputRightElement h="100%" pr="10px" pointerEvents="none">
                                <Kbd
                                    fontSize="10px"
                                    bg="rgba(255, 255, 255, 0.08)"
                                    borderColor="rgba(255, 255, 255, 0.12)"
                                    color="rgba(255, 255, 255, 0.45)"
                                    borderRadius="4px"
                                    px="5px"
                                    py="1px"
                                    fontFamily="'Work Sans', sans-serif"
                                >
                                    /
                                </Kbd>
                            </InputRightElement>
                        )}
                    </InputGroup>
                </Box>
            </Flex>
        </Box>
    );
}
