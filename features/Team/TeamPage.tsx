'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import Navbar from '@/components/Navbar';
import CircularPortraitItem from './components/CircularPortraitItem';
import LeadershipBentoSection from './components/LeadershipBentoSection';
import AlumniCareerSection from './components/AlumniCareerSection';
import LabCultureSection from './components/LabCultureSection';
import AboutUsStorySection from './components/AboutUsStorySection';
import TimelineJourneySection from './components/TimelineJourneySection';
import TeamDirectoryFilterBar from './components/TeamDirectoryFilterBar';
import MemberInspectionModal from './components/MemberInspectionModal';
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Text,
    Image,
    Badge,
    useDisclosure,
} from '@chakra-ui/react';
import {
    ArrowDown,
    ArrowUpRight,
} from 'lucide-react';
import {
    ACTIVE_MEMBERS,
    COLLABORATORS,
    CONTRIBUTORS,
    ALUMNI,
    type TeamMember,
} from './teamData';
import { getAssetPath } from '@/lib/basePath';

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" width="16px" height="16px" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);


export default function TeamPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('active');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [inspectedMember, setInspectedMember] = useState<TeamMember | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSelectMember = (member: TeamMember) => {
        setInspectedMember(member);
        onOpen();
    };

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Filtered lists based on search query matching name, title, bio, institution, or expertise tags
    const filterMember = (m: TeamMember, q: string) => {
        const matchName = m.name.toLowerCase().includes(q);
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchBio = m.bio ? m.bio.toLowerCase().includes(q) : false;
        const matchInst = m.institution ? m.institution.toLowerCase().includes(q) : false;
        const matchExp = m.expertise ? m.expertise.some((e) => e.toLowerCase().includes(q)) : false;
        return matchName || matchTitle || matchBio || matchInst || matchExp;
    };

    const filteredActive = useMemo(() => {
        if (!searchQuery.trim()) return ACTIVE_MEMBERS;
        const q = searchQuery.toLowerCase().trim();
        return ACTIVE_MEMBERS.filter((m) => filterMember(m, q));
    }, [searchQuery]);

    const filteredCollaborators = useMemo(() => {
        if (!searchQuery.trim()) return COLLABORATORS;
        const q = searchQuery.toLowerCase().trim();
        return COLLABORATORS.filter((m) => filterMember(m, q));
    }, [searchQuery]);

    const filteredContributors = useMemo(() => {
        if (!searchQuery.trim()) return CONTRIBUTORS;
        const q = searchQuery.toLowerCase().trim();
        return CONTRIBUTORS.filter((m) => filterMember(m, q));
    }, [searchQuery]);

    const filteredAlumni = useMemo(() => {
        if (!searchQuery.trim()) return ALUMNI;
        const q = searchQuery.toLowerCase().trim();
        return ALUMNI.filter((m) => filterMember(m, q));
    }, [searchQuery]);

    const totalCount =
        filteredActive.length +
        filteredCollaborators.length +
        filteredContributors.length +
        filteredAlumni.length;

    return (
        <Box
            minHeight="100vh"
            position="relative"
            color="white"
            background="#080c16"
            overflowX="clip"
        >
            {/* Sticky Header Navbar */}
            <Navbar />

            {/* HERO SECTION WITH CINEMATIC TEAM BACKGROUND IMAGE */}
            <Box
                position="relative"
                minH={{ base: '520px', md: '600px', lg: '660px' }}
                display="flex"
                alignItems="center"
                overflow="hidden"
                borderBottom="1px solid rgba(255, 255, 255, 0.08)"
            >
                {/* Background Image Layer with Uniform Faint Overlay */}
                <Box
                    position="absolute"
                    inset={0}
                    zIndex={0}
                >
                    <Image
                        src={getAssetPath('/img/team/all.jpg')}
                        alt="Brainlife Team Background"
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        objectPosition="center 25%"
                    />

                    {/* Faint Uniform Dark Overlay (No Gradients) */}
                    <Box
                        position="absolute"
                        inset={0}
                        bg="rgba(8, 12, 22, 0.65)"
                    />
                </Box>

                {/* Hero Foreground Content */}
                <Container
                    maxW="clamp(100%, 94vw, 1600px)"
                    mx="auto"
                    position="relative"
                    zIndex={2}
                    pt={{ base: '96px', md: '112px', lg: '124px' }}
                    pb={{ base: '44px', md: '56px' }}
                    px={{ base: '16px', md: '32px', lg: '48px' }}
                >
                    <Box maxW={{ base: '100%', md: '680px', lg: '780px' }} textAlign={{ base: 'center', lg: 'left' }}>
                        {/* Eyebrow */}
                        <Box mb="18px">
                            <Text
                                fontSize="12px"
                                fontWeight={700}
                                letterSpacing="0.16em"
                                textTransform="uppercase"
                                color="#2693D8"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                THE BRAINLIFE COMMUNITY
                            </Text>
                        </Box>

                        {/* Main Headline */}
                        <Heading
                            as="h1"
                            fontSize={{ base: '38px', sm: '48px', md: '56px', lg: '62px' }}
                            fontWeight={900}
                            letterSpacing="-0.035em"
                            lineHeight={{ base: '1.14', md: '1.06' }}
                            fontFamily="'Work Sans', sans-serif"
                            color="white"
                            mb="22px"
                            textShadow="0 4px 20px rgba(0, 0, 0, 0.8)"
                        >
                            Built by scientists.{' '}
                            <Box as="span" display="block">
                                Engineered for{' '}
                                <Text as="span" color="#2693D8">
                                    neuroscience.
                                </Text>
                            </Box>
                        </Heading>

                        {/* Concise Supporting Copy */}
                        <Text
                            fontSize={{ base: '16px', md: '18px' }}
                            lineHeight="1.6"
                            color="rgba(248, 250, 252, 0.88)"
                            fontFamily="'Work Sans', sans-serif"
                            maxW="580px"
                            mx={{ base: 'auto', lg: '0' }}
                            mb="32px"
                            textShadow="0 2px 10px rgba(0, 0, 0, 0.8)"
                        >
                            Researchers, engineers, and contributors building open infrastructure for reproducible brain science.
                        </Text>

                        {/* Intentional CTAs */}
                        <Flex
                            gap="14px"
                            justifyContent={{ base: 'center', lg: 'flex-start' }}
                            wrap="wrap"
                            mb="40px"
                        >
                            <Button
                                onClick={() => scrollToSection('leadership-section')}
                                bg="#2693D8"
                                color="white"
                                px="24px"
                                py="12px"
                                h="46px"
                                borderRadius="8px"
                                fontWeight={700}
                                fontSize="14px"
                                rightIcon={<ArrowDown size={15} />}
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: '#1d74ae',
                                    boxShadow: '0 0 25px rgba(38, 147, 216, 0.7)',
                                    transform: 'translateY(-2px)',
                                }}
                            >
                                Meet the team
                            </Button>
                            <Button
                                as="a"
                                href="https://brainlife.io"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                borderColor="rgba(255, 255, 255, 0.3)"
                                bg="rgba(15, 23, 42, 0.6)"
                                backdropFilter="blur(10px)"
                                color="white"
                                px="22px"
                                py="12px"
                                h="46px"
                                borderRadius="8px"
                                fontWeight={600}
                                fontSize="14px"
                                rightIcon={<ArrowUpRight size={15} />}
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.12)',
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    textDecoration: 'none',
                                }}
                            >
                                Explore brainlife
                            </Button>
                        </Flex>

                        {/* Typography Micro-Stats */}
                        <Box
                            pt="24px"
                            borderTop="1px solid rgba(255, 255, 255, 0.12)"
                            maxW="560px"
                        >
                            <Flex
                                alignItems="center"
                                justifyContent={{ base: 'center', lg: 'flex-start' }}
                                gap={{ base: '24px', sm: '36px' }}
                                mb="10px"
                            >
                                <Box textAlign={{ base: 'center', lg: 'left' }}>
                                    <Text
                                        fontSize="28px"
                                        fontWeight={900}
                                        color="white"
                                        lineHeight="1"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        63
                                    </Text>
                                    <Text
                                        fontSize="11px"
                                        fontWeight={600}
                                        color="#94a3b8"
                                        letterSpacing="0.06em"
                                        textTransform="uppercase"
                                        mt="4px"
                                    >
                                        people
                                    </Text>
                                </Box>

                                <Box w="1px" h="30px" bg="rgba(255, 255, 255, 0.15)" />

                                <Box textAlign={{ base: 'center', lg: 'left' }}>
                                    <Text
                                        fontSize="28px"
                                        fontWeight={900}
                                        color="white"
                                        lineHeight="1"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        12
                                    </Text>
                                    <Text
                                        fontSize="11px"
                                        fontWeight={600}
                                        color="#94a3b8"
                                        letterSpacing="0.06em"
                                        textTransform="uppercase"
                                        mt="4px"
                                    >
                                        core team
                                    </Text>
                                </Box>

                                <Box w="1px" h="30px" bg="rgba(255, 255, 255, 0.15)" />

                                <Box textAlign={{ base: 'center', lg: 'left' }}>
                                    <Text
                                        fontSize="28px"
                                        fontWeight={900}
                                        color="white"
                                        lineHeight="1"
                                        fontFamily="'Work Sans', sans-serif"
                                    >
                                        16
                                    </Text>
                                    <Text
                                        fontSize="11px"
                                        fontWeight={600}
                                        color="#94a3b8"
                                        letterSpacing="0.06em"
                                        textTransform="uppercase"
                                        mt="4px"
                                    >
                                        collaborators
                                    </Text>
                                </Box>
                            </Flex>
                            <Text
                                fontSize="12px"
                                color="rgba(255, 255, 255, 0.55)"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                35 alumni worldwide across industry and academia
                            </Text>
                        </Box>
                    </Box>

                    {/* Subtle Right Side Photo Attribution Badge on Desktop */}
                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        position="absolute"
                        right="32px"
                        bottom="32px"
                    >
                        <Badge
                            bg="rgba(14, 22, 38, 0.85)"
                            color="#2693D8"
                            border="1px solid rgba(38, 147, 216, 0.3)"
                            px="14px"
                            py="6px"
                            borderRadius="8px"
                            fontSize="11px"
                            fontWeight={700}
                            letterSpacing="0.05em"
                            backdropFilter="blur(12px)"
                            boxShadow="0 8px 24px rgba(0, 0, 0, 0.6)"
                        >
                            PESTILLI LAB &amp; BRAINLIFE CORE · 63 MEMBERS &amp; ALUMNI
                        </Badge>
                    </Box>
                </Container>
            </Box>


            {/* MAIN CONTENT AREA */}
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                position="relative"
                zIndex={2}
                pt={{ base: '44px', md: '64px' }}
                pb={{ base: '60px', md: '96px' }}
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* LEADERSHIP BENTO GRID */}
                <Box id="leadership-section" scrollMarginTop="100px">
                    <LeadershipBentoSection onSelectMember={handleSelectMember} />
                </Box>

                {/* ABOUT US MISSION STORY, 3-PHOTO COLLAGE & NUMBERS ROW */}
                <AboutUsStorySection />

                {/* LAB CULTURE & COLLABORATIVE SPRINTS */}
                <LabCultureSection />
            </Container>

            {/* HOW WE GOT HERE (FULL-WIDTH SCROLL-DRIVEN MILESTONE JOURNEY WAVE) */}
            <TimelineJourneySection />

            {/* DIRECTORY & ALUMNI CONTENT AREA */}
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                position="relative"
                zIndex={2}
                pb={{ base: '60px', md: '96px' }}
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                {/* STICKY FILTER & SEARCH BAR */}
                <TeamDirectoryFilterBar
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    counts={{
                        all: totalCount,
                        active: filteredActive.length,
                        collaborators: filteredCollaborators.length,
                        contributors: filteredContributors.length,
                        alumni: filteredAlumni.length,
                    }}
                />

                {/* SECTION: ACTIVE / CORE TEAM MEMBERS */}
                {(selectedCategory === 'all' || selectedCategory === 'active') && filteredActive.length > 0 && (
                    <Box mb={{ base: '48px', md: '64px' }}>
                        <Box mb="28px" maxW="840px">
                            <Text
                                fontSize="11px"
                                fontWeight={700}
                                color="#2693D8"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                                mb="4px"
                            >
                                Current Roster
                            </Text>
                            <Heading
                                fontSize={{ base: '22px', md: '28px' }}
                                fontWeight={800}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Team ({filteredActive.length})
                            </Heading>
                            <Text
                                fontSize="14px"
                                color="#94a3b8"
                                mt="6px"
                                lineHeight="1.6"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                The following are the exceptional students, postdocs, staff members, and faculty colleagues whose dedication and expertise make our science possible.
                            </Text>
                        </Box>

                        <Grid
                            templateColumns={{
                                base: 'repeat(2, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            }}
                            gap={{ base: '28px 16px', md: '40px 24px' }}
                        >
                            {filteredActive.map((member) => (
                                <CircularPortraitItem
                                    key={member.name}
                                    member={member}
                                    onSelect={handleSelectMember}
                                />
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* SECTION: COLLABORATORS */}
                {(selectedCategory === 'all' || selectedCategory === 'collaborators') && filteredCollaborators.length > 0 && (
                    <Box mb={{ base: '48px', md: '64px' }}>
                        <Box mb="28px">
                            <Text
                                fontSize="11px"
                                fontWeight={700}
                                color="#2693D8"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                                mb="4px"
                            >
                                Global Partners
                            </Text>
                            <Heading
                                fontSize={{ base: '22px', md: '26px' }}
                                fontWeight={800}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Collaborators ({filteredCollaborators.length})
                            </Heading>
                        </Box>

                        <Grid
                            templateColumns={{
                                base: 'repeat(2, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            }}
                            gap={{ base: '28px 16px', md: '40px 24px' }}
                        >
                            {filteredCollaborators.map((member) => (
                                <CircularPortraitItem
                                    key={member.name}
                                    member={member}
                                    onSelect={handleSelectMember}
                                />
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* SECTION: CONTRIBUTORS */}
                {(selectedCategory === 'all' || selectedCategory === 'contributors') && filteredContributors.length > 0 && (
                    <Box mb={{ base: '48px', md: '64px' }}>
                        <Box mb="28px">
                            <Text
                                fontSize="11px"
                                fontWeight={700}
                                color="#2693D8"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                                mb="4px"
                            >
                                Open Source Champions
                            </Text>
                            <Heading
                                fontSize={{ base: '22px', md: '26px' }}
                                fontWeight={800}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                Contributors ({filteredContributors.length})
                            </Heading>
                        </Box>

                        <Grid
                            templateColumns={{
                                base: 'repeat(2, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            }}
                            gap={{ base: '28px 16px', md: '40px 24px' }}
                        >
                            {filteredContributors.map((member) => (
                                <CircularPortraitItem
                                    key={member.name}
                                    member={member}
                                    onSelect={handleSelectMember}
                                />
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* ALUMNI CAREER HIGHLIGHTS */}
                {(selectedCategory === 'all' || selectedCategory === 'alumni') && (
                    <AlumniCareerSection onSelectMember={handleSelectMember} />
                )}

                {/* FULL ALUMNI DIRECTORY */}
                {(selectedCategory === 'all' || selectedCategory === 'alumni') && filteredAlumni.length > 0 && (
                    <Box mb={{ base: '60px', md: '80px' }}>
                        <Box mb="28px">
                            <Text
                                fontSize="11px"
                                fontWeight={700}
                                color="#2693D8"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                                mb="4px"
                            >
                                Global Network
                            </Text>
                            <Heading
                                fontSize={{ base: '22px', md: '26px' }}
                                fontWeight={800}
                                color="white"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                All Alumni ({filteredAlumni.length})
                            </Heading>
                        </Box>

                        <Grid
                            templateColumns={{
                                base: 'repeat(2, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            }}
                            gap={{ base: '28px 16px', md: '40px 24px' }}
                        >
                            {filteredAlumni.map((member) => (
                                <CircularPortraitItem
                                    key={member.name}
                                    member={member}
                                    onSelect={handleSelectMember}
                                />
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* CALL TO ACTION / JOIN US BANNER */}
                <Box
                    borderRadius="16px"
                    overflow="hidden"
                    position="relative"
                    bg="#162032"
                    border="1px solid rgba(38, 147, 216, 0.35)"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.4)"
                    p={{ base: '32px 20px', md: '48px 40px' }}
                    textAlign="center"
                >
                    <Box maxW="680px" mx="auto">
                        <Heading
                            fontSize={{ base: '24px', md: '32px' }}
                            fontWeight={900}
                            color="white"
                            fontFamily="'Work Sans', sans-serif"
                            letterSpacing="-0.02em"
                            mb="12px"
                        >
                            Want to build the future of cloud neuroscience?
                        </Heading>
                        <Text
                            fontSize="14.5px"
                            color="rgba(255, 255, 255, 0.8)"
                            lineHeight="1.6"
                            fontFamily="'Work Sans', sans-serif"
                            mb="24px"
                        >
                            Whether you are developing new tractography algorithms, containerizing pipelines, or analyzing multi-modal datasets, we welcome researchers and engineers to join our open-source community.
                        </Text>
                        <Flex justify="center" gap="12px" wrap="wrap">
                            <Button
                                as="a"
                                href="https://github.com/brainlife"
                                target="_blank"
                                rel="noopener noreferrer"
                                bg="#2693D8"
                                color="white"
                                px="24px"
                                py="12px"
                                h="44px"
                                borderRadius="6px"
                                fontWeight={700}
                                fontSize="13.5px"
                                leftIcon={<GitHubIcon />}
                                transition="all 0.2s ease"
                                _hover={{
                                    bg: '#1d74ae',
                                    boxShadow: '0 0 25px rgba(38, 147, 216, 0.6)',
                                    transform: 'translateY(-2px)',
                                    textDecoration: 'none',
                                }}
                            >
                                Explore GitHub
                            </Button>
                            <Button
                                as={NextLink}
                                href="/users"
                                variant="outline"
                                borderColor="rgba(255, 255, 255, 0.25)"
                                color="white"
                                px="22px"
                                py="12px"
                                h="44px"
                                borderRadius="6px"
                                fontWeight={600}
                                fontSize="13.5px"
                                _hover={{
                                    bg: 'rgba(255, 255, 255, 0.08)',
                                    borderColor: 'white',
                                }}
                            >
                                Community &amp; Users Map
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Container>

            {/* HOLOGRAPHIC MEMBER PROFILE MODAL */}
            <MemberInspectionModal
                isOpen={isOpen}
                onClose={onClose}
                member={inspectedMember}
                category="Team Profile"
            />
        </Box>
    );
}
