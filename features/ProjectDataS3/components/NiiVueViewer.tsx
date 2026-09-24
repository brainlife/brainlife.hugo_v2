'use client';

import React, { useRef, useState } from 'react';
import { Box, Flex, Text, Spinner } from '@chakra-ui/react';

interface NiiVueMeshSource {
    url: string;
    name: string;
    size?: number;
    rgba255?: [number, number, number, number];
}

interface NiiVueViewerProps {
    fileUrl?: string;
    fileName?: string;
    meshSources?: NiiVueMeshSource[];
    meshCollectionLabel?: string;
    width?: string | number;
    height?: string | number;
    hideSidebar?: boolean;
}

export default function NiiVueViewer({
    fileName = 'brain.nii.gz',
    width = '100%',
    height = '100%',
}: NiiVueViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <Box
            position="relative"
            w={width}
            h={height}
            bg="#000000"
            borderRadius="12px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            <Flex
                position="absolute"
                bottom="12px"
                left="12px"
                px="10px"
                py="4px"
                bg="rgba(15, 23, 42, 0.75)"
                borderRadius="6px"
                border="1px solid rgba(255, 255, 255, 0.1)"
            >
                <Text fontSize="11px" color="rgba(255, 255, 255, 0.8)">
                    {fileName}
                </Text>
            </Flex>
        </Box>
    );
}
