'use client';

import React from 'react';
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Image,
} from '@chakra-ui/react';
import { ALUMNI, type TeamMember } from '../teamData';
import { getAssetPath } from '@/lib/basePath';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const CAREER_HIGHLIGHTS = [
    {
        name: 'Sophia Vinci-Booher',
        prevRole: 'Postdoctoral Researcher',
        currentDestination: 'Assistant Professor, Vanderbilt University',
        domain: 'Cognitive Development & White Matter',
        avatar: '/img/team/sophia_cropped_750x750.jpg',
        badge: 'Faculty',
    },
    {
        name: 'Soichi Hayashi',
        prevRole: 'Technical Lead',
        currentDestination: 'Software Engineer, Acadian Asset Management',
        domain: 'Supercomputing & Big Data Infrastructure',
        avatar: '/img/team/soichi.jpg',
        badge: 'Industry',
    },
    {
        name: 'Melanie Collier',
        prevRole: 'Lab Manager',
        currentDestination: 'Graduate Student, UCLA',
        domain: 'Behavioral & Cognitive Neuroscience',
        avatar: '/img/team/mel_collier.jpeg',
        badge: 'Graduate Studies',
    },
    {
        name: 'Brent C. McPherson',
        prevRole: 'Graduate Student',
        currentDestination: 'Postdoctoral Fellow, McGill University',
        domain: 'Big Data Connectomics & Diffusion MRI',
        avatar: '/img/team/brent.jpg',
        badge: 'Postdoc',
    },
    {
        name: 'Lindsey Kitchell',
        prevRole: 'Graduate Student',
        currentDestination: 'Neuroscientist, Johns Hopkins APL',
        domain: 'Neuro-AI & Intelligent Systems',
        avatar: '/img/team/lindseykitchell.jpg',
        badge: 'National Lab',
    },
    {
        name: 'Aurore Bussalb',
        prevRole: 'Research Engineer',
        currentDestination: 'Software Engineer, BioSerenity Paris',
        domain: 'Clinical EEG/MEG Analytics',
        avatar: '/img/team/Aurore_Bussalb.jpeg',
        badge: 'MedTech',
    },
    {
        name: 'Aman Arya',
        prevRole: 'Software Engineer',
        currentDestination: 'Software Engineer, Amazon',
        domain: 'Cloud Services & Scalable Compute',
        avatar: '/img/team/aman.jpg',
        badge: 'Big Tech',
    },
    {
        name: 'Josiah Leong',
        prevRole: 'Postdoctoral Researcher',
        currentDestination: 'Assistant Professor, University of Arkansas',
        domain: 'Large-scale ABCD White-matter Analysis',
        avatar: '/img/team/josiah.jpg',
        badge: 'Faculty',
    },
];

interface AlumniCareerSectionProps {
    onSelectMember: (member: TeamMember) => void;
}

export default function AlumniCareerSection({ onSelectMember }: AlumniCareerSectionProps) {
    return (
        <Box mb={{ base: '56px', md: '80px' }}>
            {/* Header */}
            <Box mb="24px">
                <Text
                    fontSize="12px"
                    fontWeight={700}
                    color="#2693D8"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    fontFamily="'Work Sans', sans-serif"
                    mb="4px"
                >
                    Career Trajectories &amp; Impact
                </Text>
                <Heading
                    fontSize={{ base: '22px', md: '26px' }}
                    fontWeight={800}
                    color="white"
                    fontFamily="'Work Sans', sans-serif"
                >
                    Alumni Destinations
                </Heading>
                <Text fontSize="14px" color="#cbd5e1" mt="4px">
                    Brainlife alumni carry open-science methodologies and high-performance computing skills to top institutions worldwide.
                </Text>
            </Box>

            {/* Grid of Highlighted Alumni Trajectories */}
            <Grid
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap="16px"
            >
                {CAREER_HIGHLIGHTS.map((item, idx) => {
                    const fullMember = ALUMNI.find((a) => a.name === item.name) || {
                        name: item.name,
                        title: item.currentDestination,
                        avatar: item.avatar,
                    };

                    return (
                        <MotionBox
                            key={item.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            p="18px 16px"
                            borderRadius="14px"
                            bg="#162032"
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            boxShadow="0 4px 16px rgba(0, 0, 0, 0.3)"
                            cursor="pointer"
                            onClick={() => onSelectMember(fullMember)}
                            _hover={{
                                borderColor: 'rgba(38, 147, 216, 0.5)',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                            }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Flex alignItems="center" gap="12px" mb="12px">
                                    <Box
                                        w="48px"
                                        h="48px"
                                        borderRadius="10px"
                                        overflow="hidden"
                                        border="1px solid rgba(255, 255, 255, 0.12)"
                                        bg="radial-gradient(circle, #3d4452 0%, #242831 100%)"
                                        flexShrink={0}
                                    >
                                        <Image
                                            src={getAssetPath(item.avatar)}
                                            alt={item.name}
                                            w="100%"
                                            h="100%"
                                            objectFit="cover"
                                            filter="grayscale(100%)"
                                            transition="filter 0.3s ease, transform 0.3s ease"
                                            _groupHover={{ filter: 'grayscale(0%)', transform: 'scale(1.05)' }}
                                            fallbackSrc={getAssetPath('/img/team/person.png')}
                                        />
                                    </Box>
                                    <Box minW={0}>
                                        <Badge
                                            bg="rgba(38, 147, 216, 0.15)"
                                            color="#2693D8"
                                            border="1px solid rgba(38, 147, 216, 0.35)"
                                            fontSize="9px"
                                            px="6px"
                                            py="1px"
                                            borderRadius="4px"
                                            textTransform="uppercase"
                                        >
                                            {item.badge}
                                        </Badge>
                                        <Heading as="h5" fontSize="15px" fontWeight={800} color="white" mt="2px" noOfLines={1}>
                                            {item.name}
                                        </Heading>
                                    </Box>
                                </Flex>

                                <Text fontSize="12.5px" fontWeight={700} color="#2693D8" lineHeight="1.3">
                                    {item.currentDestination}
                                </Text>
                                <Text fontSize="11.5px" color="#94a3b8" mt="4px" noOfLines={2}>
                                    {item.domain}
                                </Text>
                            </Box>

                            <Flex alignItems="center" justifyContent="space-between" mt="12px" pt="10px" borderTop="1px solid rgba(255, 255, 255, 0.08)">
                                <Text fontSize="10.5px" color="#94a3b8">
                                    Prev: {item.prevRole}
                                </Text>
                                <Text fontSize="10.5px" fontWeight={700} color="#2693D8">
                                    Inspect &rarr;
                                </Text>
                            </Flex>
                        </MotionBox>
                    );
                })}
            </Grid>
        </Box>
    );
}
