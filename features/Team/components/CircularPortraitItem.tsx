'use client';

import React, { useState } from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import type { TeamMember } from '../teamData';
import { getAssetPath } from '@/lib/basePath';

interface CircularPortraitItemProps {
    member: TeamMember;
    onSelect?: (member: TeamMember) => void;
}

export default function CircularPortraitItem({ member, onSelect }: CircularPortraitItemProps) {
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
            cursor="pointer"
            outline="none"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            p="12px 8px"
            borderRadius="16px"
            transition="transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
            _hover={{
                transform: 'translateY(-4px)',
            }}
            _focusVisible={{
                boxShadow: '0 0 0 2px #2693D8',
            }}
        >
            {/* Prominent Large Circular Portrait */}
            <Box
                w={{ base: '116px', sm: '130px', md: '144px' }}
                h={{ base: '116px', sm: '130px', md: '144px' }}
                borderRadius="full"
                overflow="hidden"
                border="2px solid"
                borderColor={isHovered ? '#2693D8' : 'rgba(255, 255, 255, 0.12)'}
                boxShadow={
                    isHovered
                        ? '0 10px 25px rgba(0, 0, 0, 0.6)'
                        : '0 4px 14px rgba(0, 0, 0, 0.4)'
                }
                bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                flexShrink={0}
                transition="border-color 0.25s ease, box-shadow 0.25s ease"
            >
                <Image
                    src={member.avatar}
                    alt={member.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    fallbackSrc={getAssetPath('/img/team/person.png')}
                    filter={isHovered ? 'grayscale(0%)' : 'grayscale(100%)'}
                    transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
                    transform={isHovered ? 'scale(1.06)' : 'scale(1)'}
                />
            </Box>

            {/* Member Details Below Photo */}
            <Box mt="14px" maxW="260px" w="100%">
                <Heading
                    as="h4"
                    fontSize={{ base: '16px', md: '17px' }}
                    fontWeight={800}
                    color={isHovered ? '#2693D8' : 'white'}
                    fontFamily="'Work Sans', sans-serif"
                    lineHeight="1.25"
                    transition="color 0.2s ease"
                >
                    {member.name}
                </Heading>

                <Text
                    fontSize="13px"
                    lineHeight="1.4"
                    color="rgba(248, 250, 252, 0.78)"
                    fontFamily="'Work Sans', sans-serif"
                    mt="4px"
                    noOfLines={2}
                >
                    {member.title}
                </Text>

                {member.institution && (
                    <Text
                        fontSize="12px"
                        lineHeight="1.35"
                        color="#94a3b8"
                        fontFamily="'Work Sans', sans-serif"
                        mt="2px"
                        noOfLines={2}
                    >
                        {member.institution}
                    </Text>
                )}
            </Box>
        </Box>
    );
}
