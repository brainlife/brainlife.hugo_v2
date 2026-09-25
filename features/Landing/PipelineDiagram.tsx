'use client';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import type { StaticImageData } from 'next/image';
import logo from '@/assets/logo.svg';
import { getAssetPath } from '@/lib/basePath';

const rawLogoSrc = typeof logo === 'string' ? logo : (logo as StaticImageData)?.src || '/logo.svg';
const logoSrc = getAssetPath(rawLogoSrc);


type Node = {
    id: string;
    label: string;
    x: number;
    y: number;
};

const nodes: Node[] = [
    { id: 'input', label: 'INPUT DATA', x: 400, y: 60 },
    { id: 'preproc', label: 'Preprocessing', x: 400, y: 170 },
    { id: 'seg', label: 'Segmentation', x: 400, y: 290 },
    { id: 'tract', label: 'Tractography', x: 210, y: 440 },
    { id: 'fmri', label: 'fMRI Analysis', x: 590, y: 440 },
    { id: 'conn', label: 'Connectome', x: 400, y: 590 },
    { id: 'viz', label: 'Visualization', x: 400, y: 720 },
    { id: 'outcome', label: 'Publishable Brain Insights', x: 400, y: 850 },
];

const links: Array<[string, string]> = [
    ['input', 'preproc'],
    ['preproc', 'seg'],
    ['seg', 'tract'],
    ['seg', 'fmri'],
    ['tract', 'conn'],
    ['fmri', 'conn'],
    ['conn', 'viz'],
    ['viz', 'outcome'],
];

const boxWidth = 320;
const boxHeight = 90;

function pathBetween(a: Node, b: Node) {
    const y1 = a.y + boxHeight / 2;
    const y2 = b.y - boxHeight / 2;
    const midY = y1 + (y2 - y1) / 2;

    return `
        M ${a.x} ${y1}
        L ${a.x} ${midY}
        L ${b.x} ${midY}
        L ${b.x} ${y2}
    `;
}

function getLinkColor(fromId: string, toId: string) {
    if (fromId === 'seg' && toId === 'tract') return '#38bdf8'; // Cyan
    if (fromId === 'tract' && toId === 'conn') return '#38bdf8'; // Cyan
    if (fromId === 'seg' && toId === 'fmri') return '#c084fc'; // Purple
    if (fromId === 'fmri' && toId === 'conn') return '#c084fc'; // Purple
    if (fromId === 'conn' && toId === 'viz') return '#818cf8'; // Indigo
    return '#38bdf8'; // default cyan-blue
}

export default function PipelineDiagram() {
    const pathRefs = useRef<Array<SVGPathElement | null>>([]);
    const dotRefs = useRef<Array<SVGCircleElement | null>>([]);
    const entryPathRef = useRef<SVGPathElement | null>(null);
    const entryDotRefs = useRef<Array<SVGCircleElement | null>>([]);
    const sourcePathRefs = useRef<Array<SVGPathElement | null>>([]);
    const sourceDotRefs = useRef<Array<SVGCircleElement | null>>([]);

    useEffect(() => {
        const anims: number[] = [];

        pathRefs.current.forEach((path, index) => {
            const dot = dotRefs.current[index];
            if (!path || !dot) return;

            const len = path.getTotalLength();
            const duration = 2600 + index * 200;

            const animate = (start: number) => {
                const loop = (now: number) => {
                    const t = ((now - start) % duration) / duration;
                    const point = path.getPointAtLength(t * len);
                    dot.setAttribute('cx', `${point.x}`);
                    dot.setAttribute('cy', `${point.y}`);
                    anims[index] = requestAnimationFrame(loop);
                };
                anims[index] = requestAnimationFrame(loop);
            };
            animate(performance.now());
        });

        const entryPath = entryPathRef.current;
        entryDotRefs.current.forEach((dot, index) => {
            if (!entryPath || !dot) return;

            const len = entryPath.getTotalLength();
            const duration = 1800 + index * 220;
            const start = performance.now() + index * 240;

            const loop = (now: number) => {
                const t = ((now - start) % duration) / duration;
                const point = entryPath.getPointAtLength(t * len);
                dot.setAttribute('cx', `${point.x}`);
                dot.setAttribute('cy', `${point.y}`);
                anims[index + 100] = requestAnimationFrame(loop);
            };
            anims[index + 100] = requestAnimationFrame(loop);
        });

        sourcePathRefs.current.forEach((path, index) => {
            const dot = sourceDotRefs.current[index];
            if (!path || !dot) return;

            const len = path.getTotalLength();
            const duration = 1500 + index * 180;
            const start = performance.now() + index * 180;

            const loop = (now: number) => {
                const t = ((now - start) % duration) / duration;
                const point = path.getPointAtLength(t * len);
                dot.setAttribute('cx', `${point.x}`);
                dot.setAttribute('cy', `${point.y}`);
                anims[index + 200] = requestAnimationFrame(loop);
            };
            anims[index + 200] = requestAnimationFrame(loop);
        });

        return () => {
            anims.forEach(cancelAnimationFrame);
        };
    }, []);

    return (
        <Box width="100%" maxWidth="760px" mx="auto" borderRadius="16px" overflow="hidden">
            <svg viewBox="0 0 800 930" width="100%" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="sourceGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <filter id="cardGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
                    </linearGradient>
                </defs>

                {/* visible source flow from MRI tiles into the input node */}
                {[
                    { x: 47, color: '#94a3b8' },
                    { x: 224, color: '#94a3b8' },
                    { x: 400, color: '#94a3b8' },
                    { x: 576, color: '#94a3b8' },
                    { x: 753, color: '#94a3b8' },
                ].map((lane, index) => (
                    <g key={`source-lane-${index}`}>
                        <path
                            ref={(el) => {
                                sourcePathRefs.current[index] = el;
                            }}
                            d={`M ${lane.x} 4 C ${lane.x} 14, 400 14, 400 50`}
                            fill="none"
                            stroke={lane.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="3 4"
                            opacity="0.75"
                        />
                        <circle cx={lane.x} cy={4} r="3" fill={lane.color} opacity="0.8" />
                        <circle
                            ref={(el) => {
                                sourceDotRefs.current[index] = el;
                            }}
                            r="3.5"
                            fill="#cbd5e1"
                            opacity="1"
                        />
                    </g>
                ))}

                <path
                    ref={(el) => {
                        entryPathRef.current = el;
                    }}
                    d="M 400 4 C 400 14, 400 30, 400 50"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeDasharray="3 4"
                    opacity="0.8"
                />

                {Array.from({ length: 3 }).map((_, index) => (
                    <circle
                        key={`entry-dot-${index}`}
                        ref={(el) => {
                            entryDotRefs.current[index] = el;
                        }}
                        r="3.5"
                        fill="#cbd5e1"
                        opacity="1"
                    />
                ))}

                {/* background network */}
                {Array.from({ length: 60 }).map((_, i) => {
                    const x = ((i * 109) % 800) + 10;
                    const y = ((i * 127) % 800) + 10;
                    return <circle key={i} cx={x} cy={y} r={1.6} fill="#8BD3FF" opacity={0.28} />;
                })}

                {/* links */}
                {links.map(([fromId, toId], index) => {
                    const a = nodes.find((n) => n.id === fromId)!;
                    const b = nodes.find((n) => n.id === toId)!;
                    const d = pathBetween(a, b);
                    const color = getLinkColor(fromId, toId);

                    return (
                        <g key={index}>
                            <path
                                ref={(el) => {
                                    pathRefs.current[index] = el;
                                }}
                                d={d}
                                fill="none"
                                stroke={color}
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity={0.85}
                            />
                            <circle
                                ref={(el) => {
                                    dotRefs.current[index] = el;
                                }}
                                r="4"
                                fill={color}
                                opacity={1}
                            />
                        </g>
                    );
                })}

                {/* nodes */}
                {nodes.map((node) => {
                    if (node.id === 'outcome') {
                        return (
                            <foreignObject
                                key={node.id}
                                x={node.x - boxWidth / 2}
                                y={node.y - boxHeight / 2}
                                width={boxWidth}
                                height={boxHeight}
                            >
                                <Box
                                    w="100%"
                                    h="100%"
                                    bg="rgba(59, 130, 246, 0.05)"
                                    border="1px solid rgba(90, 120, 180, 0.4)"
                                    borderRadius="14px"
                                    display="flex"
                                    alignItems="center"
                                    px="16px"
                                >
                                    {/* left icon container */}
                                    <Flex
                                        alignItems="center"
                                        justifyContent="center"
                                        w="36px"
                                        h="36px"
                                        borderRadius="full"
                                        bg="rgba(59, 130, 246, 0.15)"
                                        border="1px solid rgba(59, 130, 246, 0.3)"
                                        flexShrink={0}
                                        mr="14px"
                                    >
                                        <Image src={logoSrc} w="22px" h="22px" alt="Logo" />
                                    </Flex>

                                    {/* Text content */}
                                    <Box flex={1}>
                                        <Text
                                            color="#ffffff"
                                            fontSize="15px"
                                            fontWeight="700"
                                            fontFamily="'Inter', sans-serif"
                                            lineHeight="1.25"
                                        >
                                            Publishable Brain Insights
                                        </Text>
                                        <Text
                                            color="#94a3b8"
                                            fontSize="12px"
                                            fontWeight="500"
                                            fontFamily="'Inter', sans-serif"
                                            mt="2px"
                                        >
                                            Share. Cite. Reproduce.
                                        </Text>
                                    </Box>
                                </Box>
                            </foreignObject>
                        );
                    }

                    if (node.id === 'input') {
                        return (
                            <g key={node.id} transform={`translate(${node.x - 70}, ${node.y - 14})`}>
                                <rect
                                    width={140}
                                    height={28}
                                    rx={14}
                                    fill="rgba(45, 55, 72, 0.6)"
                                    stroke="rgba(255, 255, 255, 0.4)"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 3"
                                />
                                <text
                                    x={70}
                                    y={18}
                                    textAnchor="middle"
                                    fontSize="11"
                                    fontWeight="800"
                                    letterSpacing="0.15em"
                                    fill="#e2e8f0"
                                    opacity="0.9"
                                    fontFamily="Inter, sans-serif"
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    }

                    return (
                        <foreignObject
                            key={node.id}
                            x={node.x - boxWidth / 2}
                            y={node.y - boxHeight / 2}
                            width={boxWidth}
                            height={boxHeight}
                        >
                            <Box
                                w="100%"
                                h="100%"
                                bg="rgba(255, 255, 255, 0.06)"
                                border="1px solid rgba(255, 255, 255, 0.08)"
                                borderRadius="14px"
                                display="flex"
                                alignItems="center"
                                px="16px"
                            >
                                {/* left icon container */}
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="32px"
                                    h="32px"
                                    borderRadius="full"
                                    bg="rgba(255, 255, 255, 0.05)"
                                    mr="14px"
                                    flexShrink={0}
                                >
                                    <svg viewBox="-8 -8 16 16" width="20px" height="20px" style={{ display: 'block' }}>
                                        {node.id === 'preproc' && (
                                            <g transform="scale(1.2)">
                                                <ellipse
                                                    cx="0"
                                                    cy="-3.5"
                                                    rx="5.5"
                                                    ry="2"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M -5.5 -3.5 V 4.5 A 5.5 2 0 0 0 5.5 4.5 V -3.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M -5.5 0.5 A 5.5 2 0 0 0 5.5 0.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                            </g>
                                        )}
                                        {node.id === 'seg' && (
                                            <g transform="scale(1.2)">
                                                <path
                                                    d="M 0,-6 A 4.5,4.5 0 0,0 -4.5,-1.5 A 3,3 0 0,0 -5.5,1.5 A 4,4 0 0,0 0,5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M 0,-6 A 4.5,4.5 0 0,1 4.5,-1.5 A 3,3 0 0,1 5.5,1.5 A 4,4 0 0,1 0,5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M 0,-6 V 5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                            </g>
                                        )}
                                        {node.id === 'tract' && (
                                            <g transform="scale(1.2)">
                                                <circle
                                                    cx="-2"
                                                    cy="-2.5"
                                                    r="2.2"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M -6.5,4.5 A 4.5,4.5 0 0,1 2.5,4.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <circle
                                                    cx="3"
                                                    cy="-1"
                                                    r="1.8"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <path
                                                    d="M 0.5,4.5 A 3,3 0 0,1 5.5,4.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                            </g>
                                        )}
                                        {node.id === 'fmri' && (
                                            <g transform="scale(1.2)">
                                                <path
                                                    d="M -6.5,0 H -4.5 L -2.5,-4 L -0.5,4.5 L 1.5,-4.5 L 3.5,4 L 5.5,0 H 6.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                        )}
                                        {node.id === 'conn' && (
                                            <g transform="scale(1.2)">
                                                <circle cx="-3.5" cy="-3.5" r="1.5" fill="rgba(255,255,255,0.9)" />
                                                <circle cx="3.5" cy="-3.5" r="1.5" fill="rgba(255,255,255,0.9)" />
                                                <circle cx="0" cy="3.5" r="1.5" fill="rgba(255,255,255,0.9)" />
                                                <line
                                                    x1="-3.5"
                                                    y1="-3.5"
                                                    x2="0"
                                                    y2="3.5"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <line
                                                    x1="3.5"
                                                    y1="-3.5"
                                                    x2="0"
                                                    y2="3.5"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                                <line
                                                    x1="-3.5"
                                                    y1="-3.5"
                                                    x2="3.5"
                                                    y2="-3.5"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                />
                                            </g>
                                        )}
                                        {node.id === 'viz' && (
                                            <g transform="scale(1.2)">
                                                <path
                                                    d="M -5.5,-5 V 5.5 H 5.5"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                />
                                                <path
                                                    d="M -3,2 L -0.5,-1.5 L 2.5,-4 L 5,-1"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.9)"
                                                    strokeWidth="1.2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <circle cx="-3" cy="2" r="1" fill="rgba(255,255,255,0.9)" />
                                                <circle cx="-0.5" cy="-1.5" r="1" fill="rgba(255,255,255,0.9)" />
                                                <circle cx="2.5" cy="-4" r="1" fill="rgba(255,255,255,0.9)" />
                                            </g>
                                        )}
                                    </svg>
                                </Flex>

                                {/* label */}
                                <Text
                                    color="#f8fafc"
                                    fontSize="15px"
                                    fontWeight="600"
                                    fontFamily="'Inter', sans-serif"
                                    letterSpacing="0.02em"
                                    flex={1}
                                >
                                    {node.label}
                                </Text>

                                {/* right checkmark */}
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    w="20px"
                                    h="20px"
                                    borderRadius="full"
                                    bg="#52c41a"
                                    flexShrink={0}
                                >
                                    <svg viewBox="-5 -5 10 10" width="12px" height="12px">
                                        <path
                                            d="M-3,0 L-1,2 L3,-2"
                                            fill="none"
                                            stroke="#fff"
                                            strokeWidth="2.2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Flex>
                            </Box>
                        </foreignObject>
                    );
                })}
            </svg>
        </Box>
    );
}
