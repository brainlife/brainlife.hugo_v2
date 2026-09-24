'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Badge,
    Grid,
    Button,
    Spinner,
    ButtonGroup,
} from '@chakra-ui/react';
import { Search, MapPin, Building, Globe, Layers, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

const MotionBox = motion.create(Box);

export interface InstitutionLocation {
    institution: string;
    lat: number;
    lng: number;
}

type MapLayerType = 'voyager' | 'satellite' | 'dark';

const TILE_LAYERS: Record<MapLayerType, { url: string; attribution: string }> = {
    voyager: {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &copy; Earthstar Geographics',
    },
    dark: {
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
};

export default function GlobalUserMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersLayerRef = useRef<any>(null);
    const activeTileLayerRef = useRef<any>(null);

    const [locations, setLocations] = useState<InstitutionLocation[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMapReady, setIsMapReady] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'map' | 'directory'>('map');
    const [activeLayer, setActiveLayer] = useState<MapLayerType>('voyager');

    // Fetch user locations from Brainlife API
    useEffect(() => {
        let isMounted = true;
        fetch('https://brainlife.io/api/auth/profile/userlocs')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch user locations');
                return res.json();
            })
            .then((data: any[]) => {
                if (!isMounted || !Array.isArray(data)) return;
                const cleaned: InstitutionLocation[] = data
                    .filter((item) => item && item.lat != null && item.lng != null && item.institution)
                    .map((item) => ({
                        institution: String(item.institution).trim(),
                        lat: typeof item.lat === 'number' ? item.lat : parseFloat(item.lat),
                        lng: typeof item.lng === 'number' ? item.lng : parseFloat(item.lng),
                    }))
                    .filter((item) => !isNaN(item.lat) && !isNaN(item.lng));

                if (cleaned.length > 0) {
                    setLocations(cleaned);
                }
            })
            .catch((err) => {
                console.warn('Could not load user locations:', err);
            })
            .finally(() => {
                if (isMounted) setIsDataLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Initialize Leaflet Map
    useEffect(() => {
        let isMounted = true;

        const initMap = async () => {
            if (!mapContainerRef.current || mapInstanceRef.current || !isMounted) return;

            try {
                const L = (await import('leaflet')).default;
                if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

                const container = mapContainerRef.current;
                if ((container as any)._leaflet_id != null) {
                    delete (container as any)._leaflet_id;
                }

                const map = L.map(container, {
                    center: [25, 10],
                    zoom: 2,
                    minZoom: 2,
                    maxZoom: 18,
                    worldCopyJump: true,
                    zoomControl: false,
                });

                L.control.zoom({ position: 'bottomright' }).addTo(map);

                const initialLayer = L.tileLayer(TILE_LAYERS[activeLayer].url, {
                    attribution: TILE_LAYERS[activeLayer].attribution,
                    maxZoom: 19,
                    subdomains: 'abcd',
                }).addTo(map);

                activeTileLayerRef.current = initialLayer;

                const markersLayer = L.layerGroup().addTo(map);
                markersLayerRef.current = markersLayer;
                mapInstanceRef.current = map;

                if (isMounted) {
                    setIsMapReady(true);
                }
            } catch (err) {
                console.warn('Leaflet map initialization warning:', err);
            }
        };

        initMap();

        return () => {
            isMounted = false;
            if (mapInstanceRef.current) {
                try {
                    mapInstanceRef.current.remove();
                } catch {
                    // Ignore cleanup error if DOM detached
                }
                mapInstanceRef.current = null;
            }
            if (mapContainerRef.current && (mapContainerRef.current as any)._leaflet_id != null) {
                delete (mapContainerRef.current as any)._leaflet_id;
            }
        };
    }, []);

    // Handle Layer Switch
    const changeTileLayer = async (layerType: MapLayerType) => {
        setActiveLayer(layerType);
        if (!mapInstanceRef.current) return;
        const L = (await import('leaflet')).default;

        if (activeTileLayerRef.current) {
            mapInstanceRef.current.removeLayer(activeTileLayerRef.current);
        }

        const newLayer = L.tileLayer(TILE_LAYERS[layerType].url, {
            attribution: TILE_LAYERS[layerType].attribution,
            maxZoom: 19,
            subdomains: 'abcd',
        }).addTo(mapInstanceRef.current);

        activeTileLayerRef.current = newLayer;
    };

    // Render Pin Markers on the map
    useEffect(() => {
        if (!mapInstanceRef.current || !markersLayerRef.current || locations.length === 0) return;

        let isCancelled = false;

        const renderMarkers = async () => {
            const L = (await import('leaflet')).default;
            if (isCancelled || !markersLayerRef.current) return;

            markersLayerRef.current.clearLayers();

            const redPinIcon = L.divIcon({
                className: 'brainlife-map-pin',
                html: `
                    <div style="cursor: pointer; transform: translate(-50%, -100%); transition: transform 0.2s ease;">
                        <svg viewBox="0 0 24 36" width="22" height="33" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="#ea4335"/>
                            <circle cx="12" cy="12" r="4.5" fill="#78110b"/>
                        </svg>
                    </div>
                `,
                iconSize: [0, 0],
                iconAnchor: [0, 0],
                popupAnchor: [0, -32],
            });

            locations.forEach((loc) => {
                const marker = L.marker([loc.lat, loc.lng], {
                    icon: redPinIcon,
                    title: loc.institution,
                });

                marker.bindPopup(`
                    <div style="color: #0f172a; padding: 4px 6px; font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                        <h4 style="font-weight: 800; font-size: 13.5px; margin: 0 0 4px 0; color: #1e293b; line-height: 1.3;">${loc.institution}</h4>
                        <p style="margin: 0; font-size: 11px; color: #64748b;">
                            Lat: ${loc.lat.toFixed(3)}° &nbsp;|&nbsp; Lng: ${loc.lng.toFixed(3)}°
                        </p>
                    </div>
                `, {
                    maxWidth: 260,
                    className: 'custom-brainlife-popup',
                });

                markersLayerRef.current.addLayer(marker);
            });
        };

        renderMarkers();

        return () => {
            isCancelled = true;
        };
    }, [locations, isMapReady]);

    const filteredLocations = useMemo(() => {
        if (!searchQuery.trim()) return locations;
        const q = searchQuery.toLowerCase();
        return locations.filter((loc) => loc.institution.toLowerCase().includes(q));
    }, [locations, searchQuery]);

    const handleSelectInstitution = (loc: InstitutionLocation) => {
        setActiveTab('map');
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([loc.lat, loc.lng], 8, {
                animate: true,
            });

            // Delay popup opening slightly to let pan finish
            setTimeout(async () => {
                const L = (await import('leaflet')).default;
                L.popup({ maxWidth: 280, className: 'custom-brainlife-popup' })
                    .setLatLng([loc.lat, loc.lng])
                    .setContent(`
                        <div style="color: #0f172a; padding: 4px 6px; font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;">
                            <h4 style="font-weight: 800; font-size: 13.5px; margin: 0 0 4px 0; color: #1e293b; line-height: 1.3;">${loc.institution}</h4>
                            <p style="margin: 0; font-size: 11px; color: #64748b;">
                                Lat: ${loc.lat.toFixed(3)}° &nbsp;|&nbsp; Lng: ${loc.lng.toFixed(3)}°
                            </p>
                        </div>
                    `)
                    .openOn(mapInstanceRef.current);
            }, 300);
        }
    };

    return (
        <Box
            position="relative"
            borderRadius="16px"
            overflow="hidden"
            bg="#162032"
            border="1px solid rgba(255, 255, 255, 0.1)"
            boxShadow="0 15px 35px rgba(0, 0, 0, 0.35)"
            p={{ base: '20px 16px', md: '32px 28px', lg: '36px 32px' }}
        >
            {/* Header Controls Bar */}
            <Flex
                position="relative"
                zIndex={1}
                direction={{ base: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ base: 'flex-start', md: 'center' }}
                gap="20px"
                mb="24px"
            >
                <Box position="relative">
                    <Text
                        fontSize={{ base: '48px', sm: '64px', md: '78px' }}
                        fontWeight={900}
                        color="rgba(255, 255, 255, 0.08)"
                        letterSpacing="-0.04em"
                        lineHeight="0.85"
                        fontFamily="'Work Sans', sans-serif"
                        userSelect="none"
                        pointerEvents="none"
                    >
                        Global
                    </Text>
                    <Heading
                        fontSize={{ base: '22px', md: '28px' }}
                        fontWeight={800}
                        color="white"
                        fontFamily="'Work Sans', sans-serif"
                        letterSpacing="-0.02em"
                        mt={{ base: '-14px', sm: '-18px', md: '-22px' }}
                    >
                        User Base
                    </Heading>
                    <Text fontSize="13.5px" color="#94a3b8" mt="4px">
                        Connecting ~1,200+ scientists and students across {locations.length || '1202+'} academic institutions.
                    </Text>
                </Box>

                {/* View Mode Switcher & Search */}
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    alignItems={{ base: 'stretch', sm: 'center' }}
                    gap="12px"
                    w={{ base: '100%', md: 'auto' }}
                >
                    <InputGroup size="sm" maxW={{ base: '100%', sm: '220px' }}>
                        <InputLeftElement pointerEvents="none">
                            <Search size={13} color="#94a3b8" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search institution..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            bg="#0e1626"
                            borderColor="rgba(255, 255, 255, 0.12)"
                            borderRadius="8px"
                            color="white"
                            fontSize="12px"
                            _placeholder={{ color: '#64748b' }}
                            _focus={{ borderColor: '#2693D8', boxShadow: '0 0 0 1px #2693D8' }}
                        />
                    </InputGroup>

                    <Flex bg="#0e1626" p="3px" borderRadius="8px" border="1px solid rgba(255, 255, 255, 0.08)">
                        <Button
                            size="xs"
                            variant={activeTab === 'map' ? 'solid' : 'ghost'}
                            bg={activeTab === 'map' ? '#2693D8' : 'transparent'}
                            color={activeTab === 'map' ? 'white' : 'rgba(255, 255, 255, 0.7)'}
                            borderRadius="6px"
                            fontSize="11.5px"
                            fontWeight={700}
                            h="28px"
                            px="12px"
                            onClick={() => setActiveTab('map')}
                            leftIcon={<MapPin size={12} />}
                            _hover={{
                                bg: activeTab === 'map' ? '#1d74ae' : 'rgba(255, 255, 255, 0.06)',
                            }}
                        >
                            Interactive Map
                        </Button>
                        <Button
                            size="xs"
                            variant={activeTab === 'directory' ? 'solid' : 'ghost'}
                            bg={activeTab === 'directory' ? '#2693D8' : 'transparent'}
                            color={activeTab === 'directory' ? 'white' : 'rgba(255, 255, 255, 0.7)'}
                            borderRadius="6px"
                            fontSize="11.5px"
                            fontWeight={700}
                            h="28px"
                            px="12px"
                            onClick={() => setActiveTab('directory')}
                            leftIcon={<Building size={12} />}
                            _hover={{
                                bg: activeTab === 'directory' ? '#1d74ae' : 'rgba(255, 255, 255, 0.06)',
                            }}
                        >
                            Directory ({locations.length || '1202'})
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            {/* TAB 1: Real Interactive World Map with Red Pins */}
            <Box display={activeTab === 'map' ? 'block' : 'none'} position="relative">
                {/* Floating Map Tile Style Selector */}
                <Box
                    position="absolute"
                    top="14px"
                    left="14px"
                    zIndex={1000}
                    bg="rgba(14, 22, 38, 0.95)"
                    p="4px"
                    borderRadius="8px"
                    border="1px solid rgba(255, 255, 255, 0.15)"
                    boxShadow="0 8px 24px rgba(0,0,0,0.6)"
                >
                    <Flex gap="4px">
                        <Button
                            size="xs"
                            variant={activeLayer === 'voyager' ? 'solid' : 'ghost'}
                            bg={activeLayer === 'voyager' ? '#2693D8' : 'transparent'}
                            color="white"
                            fontSize="11px"
                            fontWeight={700}
                            h="24px"
                            px="8px"
                            borderRadius="6px"
                            onClick={() => changeTileLayer('voyager')}
                            _hover={{ bg: activeLayer === 'voyager' ? '#1d74ae' : 'rgba(255, 255, 255, 0.1)' }}
                        >
                            Roadmap
                        </Button>
                        <Button
                            size="xs"
                            variant={activeLayer === 'satellite' ? 'solid' : 'ghost'}
                            bg={activeLayer === 'satellite' ? '#2693D8' : 'transparent'}
                            color="white"
                            fontSize="11px"
                            fontWeight={700}
                            h="24px"
                            px="8px"
                            borderRadius="6px"
                            onClick={() => changeTileLayer('satellite')}
                            _hover={{ bg: activeLayer === 'satellite' ? '#1d74ae' : 'rgba(255, 255, 255, 0.1)' }}
                        >
                            Satellite
                        </Button>
                        <Button
                            size="xs"
                            variant={activeLayer === 'dark' ? 'solid' : 'ghost'}
                            bg={activeLayer === 'dark' ? '#2693D8' : 'transparent'}
                            color="white"
                            fontSize="11px"
                            fontWeight={700}
                            h="24px"
                            px="8px"
                            borderRadius="6px"
                            onClick={() => changeTileLayer('dark')}
                            _hover={{ bg: activeLayer === 'dark' ? '#1d74ae' : 'rgba(255, 255, 255, 0.1)' }}
                        >
                            Dark Mode
                        </Button>
                    </Flex>
                </Box>

                {/* Leaflet Map DOM Node */}
                <Box
                    ref={mapContainerRef}
                    id="map"
                    w="100%"
                    h={{ base: '440px', md: '580px', lg: '620px' }}
                    borderRadius="12px"
                    overflow="hidden"
                    boxShadow="0 15px 35px rgba(0, 0, 0, 0.5)"
                    border="1px solid rgba(255, 255, 255, 0.12)"
                    bg="#0f172a"
                    zIndex={0}
                />

                {isDataLoading && (
                    <Flex
                        position="absolute"
                        inset={0}
                        bg="rgba(14, 22, 38, 0.9)"
                        borderRadius="12px"
                        justify="center"
                        align="center"
                        direction="column"
                        gap="14px"
                        zIndex={5}
                    >
                        <Spinner size="lg" color="#2693D8" thickness="3px" />
                        <Text fontSize="13px" color="#94a3b8" fontFamily="'Work Sans', sans-serif">
                            Loading 1,202+ Brainlife research hub coordinates...
                        </Text>
                    </Flex>
                )}

                {/* Footer Telemetry */}
                <Flex
                    wrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap="12px"
                    mt="14px"
                    px="4px"
                    fontSize="12px"
                    color="#94a3b8"
                >
                    <Text>Showing {locations.length} verified research institutions worldwide</Text>
                    <Text fontSize="11px" color="#64748b">
                        Live coordinates from Brainlife Auth API
                    </Text>
                </Flex>
            </Box>

            {/* TAB 2: Searchable Institution Directory */}
            {activeTab === 'directory' && (
                <Box>
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        }}
                        gap="12px"
                        maxH="580px"
                        overflowY="auto"
                        pr="4px"
                        css={{
                            '&::-webkit-scrollbar': { width: '6px' },
                            '&::-webkit-scrollbar-track': { background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' },
                            '&::-webkit-scrollbar-thumb': { background: 'rgba(38, 147, 216, 0.4)', borderRadius: '4px' },
                        }}
                    >
                        {filteredLocations.map((loc, idx) => (
                            <MotionBox
                                key={`${loc.institution}-${idx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: Math.min(idx * 0.015, 0.3) }}
                                p="14px 16px"
                                borderRadius="10px"
                                bg="#0e1626"
                                border="1px solid rgba(255, 255, 255, 0.08)"
                                cursor="pointer"
                                onClick={() => handleSelectInstitution(loc)}
                                _hover={{
                                    borderColor: '#2693D8',
                                    bg: 'rgba(38, 147, 216, 0.08)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
                                }}
                            >
                                <Flex alignItems="flex-start" gap="10px">
                                    <Box
                                        p="7px"
                                        borderRadius="6px"
                                        bg="rgba(38, 147, 216, 0.12)"
                                        color="#2693D8"
                                        flexShrink={0}
                                        mt="2px"
                                    >
                                        <Building size={14} />
                                    </Box>
                                    <Box flex="1" minW={0}>
                                        <Heading
                                            as="h5"
                                            fontSize="13.5px"
                                            fontWeight={700}
                                            color="white"
                                            noOfLines={2}
                                            lineHeight="1.3"
                                            fontFamily="'Work Sans', sans-serif"
                                        >
                                            {loc.institution}
                                        </Heading>
                                        <Flex alignItems="center" gap="6px" mt="6px">
                                            <MapPin size={11} color="#64748b" />
                                            <Text fontSize="11px" color="#94a3b8">
                                                {loc.lat.toFixed(2)}°, {loc.lng.toFixed(2)}°
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </MotionBox>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}
