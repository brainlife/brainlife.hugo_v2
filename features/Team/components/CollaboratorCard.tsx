'use client';

import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Image, Badge } from '@chakra-ui/react';
import { ArrowUpRight, Sparkles, Building2 } from 'lucide-react';
import type { TeamMember } from '../teamData';
import { getAssetPath } from '@/lib/basePath';

interface CollaboratorCardProps {
    member: TeamMember;
    onSelect?: (member: TeamMember) => void;
}

export default function CollaboratorCard({ member, onSelect }: CollaboratorCardProps) {
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
            borderRadius="16px"
            bg="#162032"
            border="1px solid"
            borderColor={isHovered ? '#2693D8' : 'rgba(255, 255, 255, 0.1)'}
            boxShadow={
                isHovered
                    ? '0 12px 30px rgba(0, 0, 0, 0.5)'
                    : '0 4px 16px rgba(0, 0, 0, 0.3)'
            }
            p={{ base: '20px', md: '22px' }}
            cursor="pointer"
            overflow="hidden"
            outline="none"
            transition="all 0.25s ease"
            _focusVisible={{
                borderColor: '#2693D8',
                boxShadow: '0 0 0 2px #2693D8',
            }}
            _hover={{
                transform: 'translateY(-3px)',
            }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            alignItems={{ base: 'center', sm: 'flex-start' }}
            gap={{ base: '16px', sm: '20px' }}
        >
            {/* Prominent Large Circular Portrait */}
            <Box position="relative" flexShrink={0}>
                <Box
                    w={{ base: '84px', md: '92px' }}
                    h={{ base: '84px', md: '92px' }}
                    borderRadius="full"
                    overflow="hidden"
                    border="2px solid"
                    borderColor={isHovered ? '#2693D8' : 'rgba(38, 147, 216, 0.3)'}
                    boxShadow="0 4px 14px rgba(0,0,0,0.5)"
                    bg="#0e1626"
                    transition="all 0.25s ease"
                >
                    <Image
                        src={member.avatar}
                        alt={member.name}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        fallbackSrc={getAssetPath('/img/team/person.png')}
                        transition="transform 0.35s ease"
                        transform={isHovered ? 'scale(1.06)' : 'scale(1)'}
                    />
                </Box>
            </Box>

            {/* Member Details */}
            <Box flex="1" minW={0} textAlign={{ base: 'center', sm: 'left' }}>
                <Flex
                    justifyContent={{ base: 'center', sm: 'space-between' }}
                    alignItems="flex-start"
                    gap="8px"
                >
                    <Box minW={0}>
                        <Heading
                            as="h3"
                            fontSize={{ base: '17px', md: '18px' }}
                            fontWeight={800}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            lineHeight="1.2"
                        >
                            {member.name}
                        </Heading>
                        <Text
                            fontSize="13px"
                            fontWeight={600}
                            color="#2693D8"
                            fontFamily="'Work Sans', sans-serif"
                            mt="3px"
                            lineHeight="1.3"
                        >
                            {member.title}
                        </Text>
                        {member.institution && (
                            <Flex
                                alignItems="center"
                                justifyContent={{ base: 'center', sm: 'flex-start' }}
                                gap="5px"
                                mt="3px"
                            >
                                <Building2 size={12} color="#94a3b8" />
                                <Text
                                    fontSize="11.5px"
                                    color="#94a3b8"
                                    fontFamily="'Work Sans', sans-serif"
                                    noOfLines={1}
                                >
                                    {member.institution}
                                </Text>
                            </Flex>
                        )}
                    </Box>

                    {/* Animated Top-Right Arrow */}
                    <Box
                        display={{ base: 'none', sm: 'block' }}
                        color={isHovered ? '#2693D8' : 'rgba(255, 255, 255, 0.35)'}
                        transition="transform 0.2s ease, color 0.2s ease"
                        transform={isHovered ? 'translate(2px, -2px)' : 'none'}
                        flexShrink={0}
                        p="2px"
                    >
                        <ArrowUpRight size={17} />
                    </Box>
                </Flex>

                {/* Expertise Tag Badges */}
                {member.expertise && member.expertise.length > 0 && (
                    <Flex
                        wrap="wrap"
                        gap="6px"
                        mt="12px"
                        justifyContent={{ base: 'center', sm: 'flex-start' }}
                    >
                        {member.expertise.map((tag) => (
                            <Badge
                                key={tag}
                                bg={isHovered ? 'rgba(38, 147, 216, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
                                color={isHovered ? '#2693D8' : '#cbd5e1'}
                                border="1px solid"
                                borderColor={isHovered ? 'rgba(38, 147, 216, 0.35)' : 'rgba(255, 255, 255, 0.08)'}
                                fontSize="10px"
                                fontWeight={600}
                                px="7px"
                                py="2px"
                                borderRadius="4px"
                                letterSpacing="0.02em"
                                transition="all 0.2s ease"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </Flex>
                )}

                {/* Inspection Affordance */}
                <Flex
                    alignItems="center"
                    justifyContent={{ base: 'center', sm: 'flex-start' }}
                    gap="4px"
                    mt="12px"
                    pt="8px"
                    borderTop="1px solid rgba(255, 255, 255, 0.08)"
                >
                    <Text
                        fontSize="11px"
                        fontWeight={600}
                        color={isHovered ? '#2693D8' : '#94a3b8'}
                        fontFamily="'Work Sans', sans-serif"
                        transition="color 0.2s ease"
                    >
                        View collaborator profile
                    </Text>
                    <Sparkles size={11} color={isHovered ? '#2693D8' : '#94a3b8'} />
                </Flex>
            </Box>
        </Box>
    );
}
