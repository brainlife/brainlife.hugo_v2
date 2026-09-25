'use client';

import React from 'react';
import {
    Box,
    Container,
    Grid,
    Heading,
    Text,
    Image,
    Flex,
    HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/basePath';

const MotionBox = motion.create(Box);

export default function MobileAboutSection() {
    return (
        <Box
            py={{ base: '60px', md: '100px' }}
            position="relative"
        >
            <Container
                maxW="clamp(100%, 92vw, 1360px)"
                mx="auto"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* SECTION HEADER */}
                <Box textAlign="center" mb={{ base: '48px', md: '72px' }} position="relative">
                    {/* Brainlife Logo Icon Emblem */}
                    <Flex justify="center" align="center" mb="14px">
                        <Box
                            p={{ base: '12px', md: '14px' }}
                            borderRadius="16px"
                            bg="#162032"
                            border="1px solid rgba(38, 147, 216, 0.3)"
                            boxShadow="0 10px 25px rgba(0, 0, 0, 0.4)"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            transition="all 0.2s ease"
                            _hover={{
                                borderColor: '#2693D8',
                                transform: 'translateY(-2px)',
                            }}
                        >
                            <Image
                                src={getAssetPath('/logo.svg')}
                                alt="Brainlife Emblem"
                                w={{ base: '46px', sm: '54px', md: '60px' }}
                                h={{ base: '46px', sm: '54px', md: '60px' }}
                                objectFit="contain"
                            />
                        </Box>
                    </Flex>

                    {/* Stacked Faded Watermark Title */}
                    <Box position="relative">
                        <Text
                            fontSize={{ base: '55px', sm: '75px', md: '95px' }}
                            fontWeight={900}
                            color="rgba(255, 255, 255, 0.08)"
                            letterSpacing="-0.04em"
                            lineHeight="0.85"
                            fontFamily="'Work Sans', sans-serif"
                            userSelect="none"
                            pointerEvents="none"
                        >
                            Why
                        </Text>
                        <Heading
                            as="h2"
                            fontSize={{ base: '26px', sm: '34px', md: '42px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mt={{ base: '-16px', sm: '-22px', md: '-28px' }}
                            mb="10px"
                        >
                            Brainlife Mobile?
                        </Heading>
                        <Text
                            fontSize={{ base: '14.5px', sm: '16px' }}
                            color="#94a3b8"
                            fontFamily="'Work Sans', sans-serif"
                            maxW="600px"
                            mx="auto"
                        >
                            What makes our portable platform different for neuroimaging workflows.
                        </Text>
                    </Box>
                </Box>

                {/* 2-COLUMN CONTENT: IMAGE + PARAGRAPHS */}
                <Grid
                    templateColumns={{ base: '1fr', lg: '1fr 1.15fr' }}
                    gap={{ base: '40px', lg: '64px' }}
                    alignItems="center"
                >
                    {/* LEFT COLUMN: LIFESTYLE / LAB COLLABORATION IMAGE */}
                    <Flex justify="center" position="relative">
                        <MotionBox
                            position="relative"
                            zIndex={1}
                            w="100%"
                            maxW="540px"
                            h={{ base: '300px', sm: '380px', md: '420px' }}
                            borderRadius="16px"
                            overflow="hidden"
                            border="1px solid rgba(255, 255, 255, 0.12)"
                            boxShadow="0 15px 35px rgba(0, 0, 0, 0.6)"
                            whileHover={{ scale: 1.01, y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Image
                                src={getAssetPath('/img/about/about-2.jpg')}
                                alt="Researchers collaborating on Brainlife workflows"
                                w="100%"
                                h="100%"
                                objectFit="cover"
                            />
                        </MotionBox>
                    </Flex>

                    {/* RIGHT COLUMN: EDITORIAL PARAGRAPHS */}
                    <Flex direction="column" gap="20px" justify="center">
                        <Text
                            fontSize={{ base: '14.5px', sm: '15.5px', md: '16px' }}
                            color="#cbd5e1"
                            lineHeight="1.8"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Neuroimaging research, whether in the laboratory or collaborating across global consortia, involves complex supercomputing pipelines that can take hours or even days to compute. Monitoring whether a diffusion MRI tractography, fMRI preprocessing, or MEG source localization job finished, failed, or exceeded memory limits traditionally required staying tied to a desktop workstation or repeatedly SSHing into remote Slurm clusters.
                        </Text>

                        <Text
                            fontSize={{ base: '14.5px', sm: '15.5px', md: '16px' }}
                            color="#cbd5e1"
                            lineHeight="1.8"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            Brainlife Mobile was created to solve a simple yet transformative problem — untethering researchers from their desks without losing connection to their science. We make it effortless for you to track multi-cluster HPC executions in real time, receive instant push notifications the second an app finishes, inspect BIDS dataset hierarchies, and review results shared by international colleagues. Wherever your research takes you, Brainlife Mobile ensures your entire lab is always within reach.
                        </Text>
                    </Flex>
                </Grid>
            </Container>
        </Box>
    );
}
