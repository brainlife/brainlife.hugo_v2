'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    Image,
    Link,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { Menu, ExternalLink } from 'lucide-react';
import logo from '@/assets/logo.svg';
import { redirectToBrainlifeLogin } from '@/contexts/AuthContext.helpers';
import { getAssetPath } from '@/lib/basePath';

const rawLogoSrc = typeof logo === 'string' ? logo : (logo as any)?.src || '/logo.svg';
const logoSrc = getAssetPath(rawLogoSrc);

interface NavItem {
    label: string;
    href: string;
    isExternal?: boolean;
    isScrollTarget?: boolean;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'ABOUT', href: '/about' },
    { label: 'DOCS', href: 'https://brainlife.io/docs/', isExternal: true },
    { label: 'USERS', href: '/users' },
    { label: 'EZBIDS', href: 'https://brainlife.io/ezbids/', isExternal: true },
    { label: 'MOBILE', href: '/mobile' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
        if (item.isScrollTarget && item.href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(item.href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
            onClose();
        }
    };

    return (
        <Box
            as="header"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            bg={isScrolled ? 'rgba(8, 14, 28, 0.92)' : 'rgba(15, 23, 42, 0.65)'}
            backdropFilter="blur(20px)"
            borderBottom="1px solid"
            borderColor={isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)'}
            boxShadow={isScrolled ? '0 10px 30px rgba(0,0,0,0.45)' : 'none'}
        >
            <Container
                maxW="clamp(100%, 94vw, 1600px)"
                mx="auto"
                w="100%"
                px={{ base: '16px', md: '32px', lg: '48px' }}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    py={isScrolled ? '12px' : '18px'}
                    transition="padding 0.3s ease"
                >
                    {/* Brand Logo */}
                    <Flex
                        as={NextLink}
                        href="/"
                        alignItems="center"
                        gap="10px"
                        cursor="pointer"
                        _hover={{ opacity: 0.9 }}
                        transition="opacity 0.2s"
                        textDecoration="none !important"
                    >
                        <Image
                            src={logoSrc}
                            alt="Brainlife"
                            w={{ base: '28px', md: '34px' }}
                            h={{ base: '28px', md: '34px' }}
                            objectFit="contain"
                        />
                        <Text
                            fontWeight={800}
                            letterSpacing="-0.03em"
                            fontSize={{ base: '20px', md: '22px' }}
                            color="#2693D8"
                            fontFamily="'Work Sans', sans-serif"
                        >
                            brainlife
                        </Text>
                    </Flex>

                    {/* Desktop Navigation Links & Action Button */}
                    <Flex display={{ base: 'none', lg: 'flex' }} alignItems="center" gap={{ lg: '28px', xl: '36px' }}>
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                as={item.isExternal ? undefined : NextLink}
                                href={item.href}
                                target={item.isExternal ? '_blank' : undefined}
                                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                onClick={(e) => handleNavClick(item, e)}
                                fontSize="13px"
                                fontWeight={700}
                                letterSpacing="0.08em"
                                textTransform="uppercase"
                                color="rgba(255, 255, 255, 0.85)"
                                _hover={{
                                    color: '#5cc5d8',
                                    textDecoration: 'none',
                                    transform: 'translateY(-1px)',
                                }}
                                transition="all 0.2s ease"
                                fontFamily="'Work Sans', sans-serif"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Signature Framed PORTAL Button */}
                        <Button
                            onClick={redirectToBrainlifeLogin}
                            variant="outline"
                            borderColor="rgba(255, 255, 255, 0.8)"
                            borderWidth="1.5px"
                            color="white"
                            bg="transparent"
                            px="20px"
                            py="6px"
                            h="36px"
                            borderRadius="4px"
                            fontSize="13px"
                            fontWeight={800}
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                            fontFamily="'Work Sans', sans-serif"
                            transition="all 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
                            _hover={{
                                bg: '#2693D8',
                                borderColor: '#2693D8',
                                color: 'white',
                                boxShadow: '0 0 20px rgba(38, 147, 216, 0.5)',
                                transform: 'translateY(-1px)',
                            }}
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                        >
                            PORTAL
                        </Button>
                    </Flex>

                    {/* Mobile Hamburger Menu Toggle */}
                    <Flex display={{ base: 'flex', lg: 'none' }} alignItems="center" gap="12px">
                        <Button
                            onClick={redirectToBrainlifeLogin}
                            variant="outline"
                            borderColor="rgba(255, 255, 255, 0.7)"
                            borderWidth="1.5px"
                            color="white"
                            size="sm"
                            px="14px"
                            h="32px"
                            borderRadius="4px"
                            fontSize="11px"
                            fontWeight={800}
                            letterSpacing="0.06em"
                            textTransform="uppercase"
                        >
                            PORTAL
                        </Button>
                        <IconButton
                            aria-label="Open Navigation Menu"
                            icon={<Menu size={22} />}
                            onClick={onOpen}
                            variant="ghost"
                            color="white"
                            _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                            size="md"
                        />
                    </Flex>
                </Flex>
            </Container>

            {/* Mobile Navigation Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay bg="rgba(0, 0, 0, 0.7)" backdropFilter="blur(8px)" />
                <DrawerContent bg="#0b1120" color="white" borderLeft="1px solid rgba(255, 255, 255, 0.1)">
                    <DrawerCloseButton color="white" mt="8px" />
                    <DrawerHeader borderBottomWidth="1px" borderColor="rgba(255, 255, 255, 0.08)" pt="24px">
                        <Flex alignItems="center" gap="10px">
                            <Image src={logoSrc} alt="Brainlife" w="28px" h="28px" />
                            <Text fontWeight={800} fontSize="20px" color="#2693D8" fontFamily="'Work Sans', sans-serif">
                                brainlife
                            </Text>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody py="32px">
                        <VStack spacing="24px" align="stretch">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.label}
                                    as={item.isExternal ? undefined : NextLink}
                                    href={item.href}
                                    target={item.isExternal ? '_blank' : undefined}
                                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={(e) => {
                                        handleNavClick(item, e);
                                        onClose();
                                    }}
                                    fontSize="16px"
                                    fontWeight={700}
                                    letterSpacing="0.06em"
                                    textTransform="uppercase"
                                    color="rgba(255, 255, 255, 0.9)"
                                    _hover={{ color: '#5cc5d8', textDecoration: 'none' }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    py="8px"
                                    borderBottom="1px solid rgba(255, 255, 255, 0.05)"
                                >
                                    {item.label}
                                    {item.isExternal && <ExternalLink size={14} opacity={0.6} />}
                                </Link>
                            ))}

                            <Box pt="16px">
                                <Button
                                    w="100%"
                                    onClick={() => {
                                        onClose();
                                        redirectToBrainlifeLogin();
                                    }}
                                    bg="#2693D8"
                                    color="white"
                                    h="44px"
                                    borderRadius="6px"
                                    fontWeight={800}
                                    fontSize="14px"
                                    letterSpacing="0.08em"
                                    textTransform="uppercase"
                                    _hover={{ bg: '#1d74ae' }}
                                >
                                    PORTAL / SIGN IN
                                </Button>
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
