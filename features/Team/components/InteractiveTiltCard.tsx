'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { TeamMember } from '../teamData';

interface InteractiveTiltCardProps {
    member: TeamMember;
    isFeatured?: boolean;
    accentColor?: string;
    categoryBadge?: string;
    onSelect?: (member: TeamMember) => void;
}

export default function InteractiveTiltCard({
    member,
    isFeatured = false,
    accentColor = '#2693D8',
    categoryBadge,
    onSelect,
}: InteractiveTiltCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (onSelect) {
            onSelect(member);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            position="relative"
            h="100%"
            borderRadius="14px"
            bg="#162032"
            border="1px solid"
            borderColor={isHovered ? accentColor : 'rgba(255, 255, 255, 0.1)'}
            boxShadow={
                isHovered
                    ? '0 12px 30px rgba(0, 0, 0, 0.5)'
                    : '0 4px 16px rgba(0, 0, 0, 0.3)'
            }
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            cursor="pointer"
            overflow="hidden"
            outline="none"
            transition="border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease"
            _focusVisible={{
                borderColor: accentColor,
                boxShadow: `0 0 0 2px ${accentColor}`,
            }}
            _hover={{
                transform: 'translateY(-3px)',
            }}
        >
            {/* Top Content Block */}
            <Box p={{ base: '18px', md: '20px' }}>
                <Flex justifyContent="space-between" alignItems="flex-start" gap="12px" mb="14px">
                    <Flex alignItems="center" gap="14px">
                        {/* Member Avatar */}
                        <Box
                            w={{ base: '56px', md: isFeatured ? '68px' : '60px' }}
                            h={{ base: '56px', md: isFeatured ? '68px' : '60px' }}
                            borderRadius="12px"
                            overflow="hidden"
                            border="1px solid"
                            borderColor={isHovered ? accentColor : 'rgba(255, 255, 255, 0.12)'}
                            bg="#0f172a"
                            flexShrink={0}
                            transition="border-color 0.2s ease"
                        >
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                w="100%"
                                h="100%"
                                objectFit="cover"
                                fallbackSrc="/img/team/person.png"
                                transition="transform 0.3s ease"
                                transform={isHovered ? 'scale(1.04)' : 'scale(1)'}
                            />
                        </Box>

                        {/* Name & Title */}
                        <Box minW={0}>
                            {categoryBadge && (
                                <Badge
                                    bg="rgba(255, 255, 255, 0.06)"
                                    color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.6)'}
                                    border="1px solid"
                                    borderColor={isHovered ? `${accentColor}40` : 'rgba(255, 255, 255, 0.08)'}
                                    px="6px"
                                    py="1px"
                                    borderRadius="4px"
                                    fontSize="9.5px"
                                    fontWeight={700}
                                    letterSpacing="0.06em"
                                    textTransform="uppercase"
                                    mb="4px"
                                >
                                    {categoryBadge}
                                </Badge>
                            )}
                            <Heading
                                as="h3"
                                fontSize={{ base: '16px', md: '17px' }}
                                fontWeight={800}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                                lineHeight="1.2"
                                noOfLines={1}
                            >
                                {member.name}
                            </Heading>
                            <Text
                                fontSize="12.5px"
                                fontWeight={600}
                                color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.7)'}
                                fontFamily="'Work Sans', sans-serif"
                                mt="2px"
                                lineHeight="1.3"
                                noOfLines={1}
                                transition="color 0.2s ease"
                            >
                                {member.title}
                            </Text>
                            {member.institution && (
                                <Text
                                    fontSize="11px"
                                    color="rgba(255, 255, 255, 0.45)"
                                    fontFamily="'Work Sans', sans-serif"
                                    mt="2px"
                                    noOfLines={1}
                                >
                                    {member.institution}
                                </Text>
                            )}
                        </Box>
                    </Flex>

                    {/* Animated Top-Right Arrow */}
                    <Box
                        color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.35)'}
                        transition="transform 0.2s ease, color 0.2s ease"
                        transform={isHovered ? 'translate(2px, -2px)' : 'none'}
                        p="4px"
                        flexShrink={0}
                    >
                        <ArrowUpRight size={16} />
                    </Box>
                </Flex>

                {/* Expertise Tag Badges */}
                {member.expertise && member.expertise.length > 0 && (
                    <Flex wrap="wrap" gap="5px" mt="12px">
                        {member.expertise.map((tag) => (
                            <Badge
                                key={tag}
                                bg={isHovered ? `${accentColor}15` : 'rgba(255, 255, 255, 0.04)'}
                                color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.65)'}
                                border="1px solid"
                                borderColor={isHovered ? `${accentColor}35` : 'rgba(255, 255, 255, 0.06)'}
                                fontSize="10px"
                                fontWeight={600}
                                px="6px"
                                py="1px"
                                borderRadius="4px"
                                letterSpacing="0.02em"
                                transition="all 0.2s ease"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </Flex>
                )}

                {/* Brief bio snippet if available */}
                {member.bio && (
                    <Text
                        fontSize="12.5px"
                        color="rgba(248, 250, 252, 0.7)"
                        lineHeight="1.5"
                        fontFamily="'Work Sans', sans-serif"
                        mt="10px"
                        noOfLines={2}
                    >
                        {member.bio}
                    </Text>
                )}
            </Box>

            {/* Bottom Subtle Action Bar */}
            <Flex
                px={{ base: '18px', md: '20px' }}
                py="10px"
                bg="rgba(15, 23, 42, 0.4)"
                borderTop="1px solid rgba(255, 255, 255, 0.05)"
                justifyContent="space-between"
                alignItems="center"
            >
                <Text
                    fontSize="11px"
                    fontWeight={600}
                    color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.4)'}
                    fontFamily="'Work Sans', sans-serif"
                    display="inline-flex"
                    alignItems="center"
                    gap="4px"
                    transition="color 0.2s ease"
                >
                    View profile details
                </Text>
                <Sparkles size={11} color={isHovered ? accentColor : 'rgba(255, 255, 255, 0.3)'} />
            </Flex>
        </Box>
    );
}
