'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { RotateCcw } from 'lucide-react';

// 4-Tier Brainlife Research & Computing Stack
// Lift distances are calculated so when assembled at base, all 4 isometric trays
// nest into a single tight 3D solid box with zero gaps.
interface TierConfig {
    id: number;
    step: number; // 1 = unboxes first (top), 4 = base
    num: string;
    title: string;
    descLine1: string;
    descLine2: string;
    meta: string;
    accentColor: string;
    surfaceFill: string;
    surfaceTone: string;
    borderStroke: string;
    yBase: number;
    lift: number;
    labelY: number;
}

const TIERS: TierConfig[] = [
    {
        id: 4,
        step: 1,
        num: '4',
        title: 'Discover & Share',
        descLine1: 'Visualize results, explore interactive 3D brain maps,',
        descLine2: 'and publish reproducible research with persistent citable DOIs.',
        meta: 'VISUALIZATION · CONNECTOMES · PUBLICATION',
        accentColor: '#38bdf8',
        surfaceFill: '#11253e',
        surfaceTone: 'rgba(56, 189, 248, 0.16)',
        borderStroke: 'rgba(56, 189, 248, 0.95)',
        yBase: 40,
        lift: 432,
        labelY: 140,
    },
    {
        id: 3,
        step: 2,
        num: '3',
        title: 'Analysis Workflows',
        descLine1: 'Execute containerized apps, reproducible processing pipelines,',
        descLine2: 'and automated neuroimaging computing graphs at scale.',
        meta: 'APPS · PIPELINES · REPRODUCIBILITY',
        accentColor: '#38bdf8',
        surfaceFill: '#0e2036',
        surfaceTone: 'rgba(45, 212, 191, 0.12)',
        borderStroke: 'rgba(56, 189, 248, 0.85)',
        yBase: 195,
        lift: 288,
        labelY: 295,
    },
    {
        id: 2,
        step: 3,
        num: '2',
        title: 'Data Management',
        descLine1: 'Organize, curate, and share multi-modal neuroimaging datasets',
        descLine2: '(BIDS, MRI, MEG, EEG) with full cryptographic provenance.',
        meta: 'BIDS · FORMATS · PROVENANCE',
        accentColor: '#38bdf8',
        surfaceFill: '#0c1b2e',
        surfaceTone: 'rgba(56, 189, 248, 0.10)',
        borderStroke: 'rgba(56, 189, 248, 0.80)',
        yBase: 350,
        lift: 144,
        labelY: 455,
    },
    {
        id: 1,
        step: 4,
        num: '1',
        title: 'Cloud Infrastructure',
        descLine1: 'High-performance compute clusters, scalable cloud storage,',
        descLine2: 'and secure international research computing facilities.',
        meta: 'HPC · CLUSTERS · SECURE STORAGE',
        accentColor: '#38bdf8',
        surfaceFill: '#091524',
        surfaceTone: 'rgba(56, 189, 248, 0.07)',
        borderStroke: 'rgba(56, 189, 248, 0.75)',
        yBase: 505,
        lift: 0,
        labelY: 615,
    },
];

export default function ExplodedAxonometricStage() {
    // Current unboxing step: 0 = assembled (compact box), 1 = Tier 4 lifted, 2 = Tier 3 lifted, 3 = Tier 2 lifted, 4 = all active
    const [unboxedStep, setUnboxedStep] = useState<number>(0);
    const [visibleLabels, setVisibleLabels] = useState<number[]>([]);
    const [hoveredTier, setHoveredTier] = useState<number | null>(null);
    const [isReplaying, setIsReplaying] = useState<boolean>(false);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    const clearTimers = useCallback(() => {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
    }, []);

    // Exact unboxing sequence matching Pestilli Lab / diagramdesign.dev:
    // Starts assembled at base -> Step 1: Top tier lifts -> label fades in -> Step 2: Next tier lifts -> ...
    const startUnboxing = useCallback(() => {
        clearTimers();

        const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setUnboxedStep(4);
            setVisibleLabels([4, 3, 2, 1]);
            setIsReplaying(false);
            return;
        }

        // Start assembled at base
        setUnboxedStep(0);
        setVisibleLabels([]);

        // Small initial pause for natural anticipation
        const tStart = setTimeout(() => {
            // Step 1: Tier 4 (top) unboxes and lifts
            setUnboxedStep(1);
            const tLab4 = setTimeout(() => {
                setVisibleLabels((prev) => [...prev, 4]);
            }, 460);
            timersRef.current.push(tLab4);

            // Step 2: Tier 3 unboxes and lifts
            const tStep2 = setTimeout(() => {
                setUnboxedStep(2);
                const tLab3 = setTimeout(() => {
                    setVisibleLabels((prev) => [...prev, 3]);
                }, 460);
                timersRef.current.push(tLab3);

                // Step 3: Tier 2 unboxes and lifts
                const tStep3 = setTimeout(() => {
                    setUnboxedStep(3);
                    const tLab2 = setTimeout(() => {
                        setVisibleLabels((prev) => [...prev, 2]);
                    }, 460);
                    timersRef.current.push(tLab2);

                    // Step 4: Base Tier 1 label reveals
                    const tStep4 = setTimeout(() => {
                        setUnboxedStep(4);
                        setVisibleLabels((prev) => [...prev, 1]);
                        setIsReplaying(false);
                    }, 420);
                    timersRef.current.push(tStep4);
                }, 420);
                timersRef.current.push(tStep3);
            }, 420);
            timersRef.current.push(tStep2);
        }, 300);

        timersRef.current.push(tStart);
    }, [clearTimers]);

    useEffect(() => {
        startUnboxing();
        return () => clearTimers();
    }, [startUnboxing, clearTimers]);

    const handleReplay = () => {
        setIsReplaying(true);
        startUnboxing();
    };

    return (
        <Box
            position="relative"
            w="100%"
            maxW="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            userSelect="none"
            pr={{ base: '0px', lg: '6px', xl: '12px' }}
        >
            <style jsx global>{`
                .bl-part {
                    transition: transform 720ms cubic-bezier(0.2, 0.7, 0.2, 1);
                    will-change: transform;
                }
                .bl-label-group {
                    transition: opacity 400ms linear, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1);
                }
                .bl-connector-line {
                    stroke-dasharray: 120;
                    transition: stroke-dashoffset 450ms cubic-bezier(0.2, 0.7, 0.2, 1);
                }
                .bl-tray-highlight {
                    transition: stroke 200ms ease, filter 200ms ease;
                }
                @media (prefers-reduced-motion: reduce) {
                    .bl-part,
                    .bl-label-group,
                    .bl-connector-line {
                        transition: none !important;
                        transform: none !important;
                        opacity: 1 !important;
                        stroke-dashoffset: 0 !important;
                    }
                }
            `}</style>

            {/* Main Stage: Native SVG Exploded Axonometric Stack */}
            <Box
                position="relative"
                w="100%"
                maxW={{ base: '100%', lg: '740px', xl: '780px' }}
                minH={{ base: '460px', sm: '500px', md: '540px' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <svg
                    viewBox="0 0 1060 840"
                    width="100%"
                    height="100%"
                    style={{
                        display: 'block',
                        overflow: 'visible',
                    }}
                    role="img"
                    aria-label="Brainlife 4-Tier Interactive Research and Computing Stack"
                >
                    <defs>
                        {/* Ambient back-glow filter */}
                        <filter id="ambient-cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
                        </filter>

                        {/* Interactive hover drop shadow */}
                        <filter id="tier-hover-glow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#38bdf8" floodOpacity="0.5" />
                        </filter>

                        {/* Workflow node pulse gradient */}
                        <radialGradient id="node-active-grad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                        </radialGradient>
                    </defs>

                    {/* Diffuse background ambient light behind the stack */}
                    <ellipse
                        cx="255"
                        cy="435"
                        rx="240"
                        ry="280"
                        fill="rgba(56, 189, 248, 0.08)"
                        filter="url(#ambient-cyan-glow)"
                    />

                    {/* ================================================================= */}
                    {/* TIER 1: Cloud Infrastructure (Base Level - step 4)                 */}
                    {/* ================================================================= */}
                    <g
                        className="bl-part"
                        style={{
                            transform: 'none', // Base foundation remains stationary
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredTier(1)}
                        onMouseLeave={() => setHoveredTier(null)}
                    >
                        {/* Isometric Tray Body: Solid Deep Slate-Navy Base */}
                        <path
                            d="M -10 610 A 14 7 0 0 1 -6 605 L 194 505 A 14 7 0 0 1 214 505 L 494 645 A 14 7 0 0 1 498 650 L 498 666 A 14 7 0 0 1 494 671 L 294 771 A 14 7 0 0 1 274 771 L -6 631 A 14 7 0 0 1 -10 626 Z"
                            fill="#091524"
                        />
                        {/* Tray Top Face Surface */}
                        <path
                            d="M 294 755 A 14 7 0 0 1 274 755 L -6 615 A 14 7 0 0 1 -6 605 L 194 505 A 14 7 0 0 1 214 505 L 494 645 A 14 7 0 0 1 494 655 Z"
                            fill="rgba(56, 189, 248, 0.07)"
                        />
                        {/* Right Bevel Shade */}
                        <path
                            d="M 284 757 A 14 7 0 0 0 294 755 L 494 655 A 14 7 0 0 0 498 650 L 498 666 A 14 7 0 0 1 494 671 L 294 771 A 14 7 0 0 1 284 773 Z"
                            fill="rgba(2, 6, 23, 0.75)"
                        />
                        {/* Tray Outline & Neon Accent */}
                        <path
                            d="M -10 610 A 14 7 0 0 1 -6 605 L 194 505 A 14 7 0 0 1 214 505 L 494 645 A 14 7 0 0 1 498 650 L 498 666 A 14 7 0 0 1 494 671 L 294 771 A 14 7 0 0 1 274 771 L -6 631 A 14 7 0 0 1 -10 626 Z"
                            fill="none"
                            stroke={hoveredTier === 1 ? '#38bdf8' : 'rgba(56, 189, 248, 0.75)'}
                            strokeWidth={hoveredTier === 1 ? '1.8' : '1.2'}
                            className="bl-tray-highlight"
                        />

                        {/* Tier 1 Scientific Visuals: HPC Compute Racks, Slurm Clusters & Bus Lines */}
                        <g>
                            {/* Compute Bus Interconnect Lines on Floor */}
                            <path d="M 140 590 L 220 550 L 330 605 L 250 645 Z" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="0.8" strokeDasharray="3,3" />

                            {/* Rack Bay 1 (Left: Storage Node) */}
                            <path d="M 75 580 L 135 550 L 170 567 L 110 597 Z" fill="#112235" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="0.8" />
                            <path d="M 75 580 L 110 597 L 110 620 L 75 603 Z" fill="#081420" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            <path d="M 110 597 L 170 567 L 170 590 L 110 620 Z" fill="#182d44" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            {/* Server Drive Bays & Activity LEDs */}
                            <line x1="83" y1="590" x2="105" y2="601" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
                            <circle cx="89" cy="592" r="1.5" fill="#22c55e" />
                            <circle cx="97" cy="596" r="1.5" fill="#38bdf8" />
                            <line x1="83" y1="597" x2="105" y2="608" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
                            <circle cx="89" cy="599" r="1.5" fill="#22c55e" />
                            <circle cx="97" cy="603" r="1.5" fill="#38bdf8" />
                            <line x1="83" y1="604" x2="105" y2="615" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
                            <circle cx="89" cy="606" r="1.5" fill="#38bdf8" />

                            {/* Rack Bay 2 (Center: HPC GPU Cluster Node) */}
                            <path d="M 195 520 L 260 488 L 298 506 L 233 538 Z" fill="#112235" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.9" />
                            <path d="M 195 520 L 233 538 L 233 564 L 195 546 Z" fill="#081420" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.9" />
                            <path d="M 233 538 L 298 506 L 298 532 L 233 564 Z" fill="#182d44" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.9" />
                            <line x1="203" y1="530" x2="228" y2="542" stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.2" />
                            <circle cx="210" cy="533" r="1.6" fill="#22c55e" />
                            <circle cx="218" cy="537" r="1.6" fill="#f59e0b" />
                            <circle cx="224" cy="540" r="1.6" fill="#38bdf8" />
                            <line x1="203" y1="538" x2="228" y2="550" stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.2" />
                            <circle cx="210" cy="541" r="1.6" fill="#22c55e" />
                            <circle cx="218" cy="545" r="1.6" fill="#38bdf8" />
                            <circle cx="224" cy="548" r="1.6" fill="#38bdf8" />
                            <line x1="203" y1="546" x2="228" y2="558" stroke="rgba(56, 189, 248, 0.75)" strokeWidth="1.2" />
                            <circle cx="210" cy="549" r="1.6" fill="#22c55e" />
                            <circle cx="218" cy="553" r="1.6" fill="#38bdf8" />

                            {/* Rack Bay 3 (Right: High-Throughput Node) */}
                            <path d="M 315 575 L 375 545 L 410 562 L 350 592 Z" fill="#112235" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="0.8" />
                            <path d="M 315 575 L 350 592 L 350 615 L 315 598 Z" fill="#081420" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            <path d="M 350 592 L 410 562 L 410 585 L 350 615 Z" fill="#182d44" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            <line x1="323" y1="585" x2="345" y2="596" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
                            <circle cx="329" cy="587" r="1.5" fill="#38bdf8" />
                            <circle cx="337" cy="591" r="1.5" fill="#38bdf8" />
                            <line x1="323" y1="592" x2="345" y2="603" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1" />
                            <circle cx="329" cy="594" r="1.5" fill="#22c55e" />
                            <circle cx="337" cy="598" r="1.5" fill="#38bdf8" />
                        </g>

                        {/* Tier 1 Label & Curved Connector */}
                        <g
                            className="bl-label-group"
                            style={{
                                opacity: visibleLabels.includes(1) ? 1 : 0,
                                transform: visibleLabels.includes(1) ? 'none' : 'translateX(10px)',
                            }}
                        >
                            {/* Curved Cyan Bezier Connector Line */}
                            <path
                                d="M 498 650 C 538 650 555 615 592 615"
                                fill="none"
                                stroke={hoveredTier === 1 ? '#38bdf8' : 'rgba(56, 189, 248, 0.85)'}
                                strokeWidth={hoveredTier === 1 ? '1.8' : '1.3'}
                                className="bl-connector-line"
                                style={{ strokeDashoffset: visibleLabels.includes(1) ? 0 : 120 }}
                            />
                            <circle cx="498" cy="650" r="2.8" fill="#38bdf8" />

                            {/* Badge Circle '1' */}
                            <circle cx="612" cy="615" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                            <text x="612" y="620" fill="#ffffff" fontSize="13.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">1</text>

                            {/* Typography: Enhanced Size, Contrast & Breathing Room */}
                            <text x="638" y="608" fill="#ffffff" fontSize="21" fontWeight="700" letterSpacing="-0.01em" fontFamily="'Work Sans', system-ui, sans-serif">1. Cloud Infrastructure</text>
                            <text x="638" y="628" fill="#38bdf8" fontSize="12" fontWeight="600" letterSpacing="0.12em" fontFamily="'Geist Mono', ui-monospace, monospace">HPC · CLUSTERS · SECURE STORAGE</text>
                            <text x="638" y="649" fill="#e2e8f0" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">High-performance compute clusters, scalable cloud storage,</text>
                            <text x="638" y="669" fill="#cbd5e1" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">and secure international research computing facilities.</text>
                        </g>
                    </g>

                    {/* ================================================================= */}
                    {/* TIER 2: Data Management (step 3 unbox)                            */}
                    {/* ================================================================= */}
                    <g
                        className="bl-part"
                        style={{
                            transform: unboxedStep >= 3 ? 'none' : 'translateY(144px)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredTier(2)}
                        onMouseLeave={() => setHoveredTier(null)}
                    >
                        {/* Isometric Tray Body: Rich Slate-Navy */}
                        <path
                            d="M -10 455 A 14 7 0 0 1 -6 450 L 194 350 A 14 7 0 0 1 214 350 L 494 490 A 14 7 0 0 1 498 495 L 498 511 A 14 7 0 0 1 494 516 L 294 616 A 14 7 0 0 1 274 616 L -6 476 A 14 7 0 0 1 -10 471 Z"
                            fill="#0c1b2e"
                        />
                        <path
                            d="M 294 600 A 14 7 0 0 1 274 600 L -6 460 A 14 7 0 0 1 -6 450 L 194 350 A 14 7 0 0 1 214 350 L 494 490 A 14 7 0 0 1 494 500 Z"
                            fill="rgba(56, 189, 248, 0.10)"
                        />
                        <path
                            d="M 284 602 A 14 7 0 0 0 294 600 L 494 500 A 14 7 0 0 0 498 495 L 498 511 A 14 7 0 0 1 494 516 L 294 616 A 14 7 0 0 1 284 618 Z"
                            fill="rgba(2, 6, 23, 0.70)"
                        />
                        <path
                            d="M -10 455 A 14 7 0 0 1 -6 450 L 194 350 A 14 7 0 0 1 214 350 L 494 490 A 14 7 0 0 1 498 495 L 498 511 A 14 7 0 0 1 494 516 L 294 616 A 14 7 0 0 1 274 616 L -6 476 A 14 7 0 0 1 -10 471 Z"
                            fill="none"
                            stroke={hoveredTier === 2 ? '#38bdf8' : 'rgba(56, 189, 248, 0.80)'}
                            strokeWidth={hoveredTier === 2 ? '1.8' : '1.2'}
                            className="bl-tray-highlight"
                        />

                        {/* Tier 2 Scientific Visuals: BIDS Datasets, Multi-modal MRI Slices, Provenance Token */}
                        <g>
                            {/* BIDS Dataset Card 1 (T1w Anatomy) */}
                            <path d="M 115 435 L 180 402 L 225 425 L 160 458 Z" fill="#14283e" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.9" />
                            <path d="M 115 435 L 160 458 L 160 472 L 115 450 Z" fill="#091828" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            <path d="M 160 458 L 225 425 L 225 440 L 160 472 Z" fill="#1b3450" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            {/* MRI Slice Cross-Section Graphics */}
                            <ellipse cx="170" cy="430" rx="22" ry="11" fill="none" stroke="#38bdf8" strokeWidth="0.9" strokeDasharray="4,2" />
                            <path d="M 156 430 Q 170 423 184 430" fill="none" stroke="rgba(238,243,246,0.7)" strokeWidth="1" />
                            <circle cx="170" cy="430" r="3" fill="#38bdf8" />
                            {/* BIDS sub-01 Label Pill */}
                            <rect x="124" y="440" width="30" height="7" rx="3" fill="rgba(56, 189, 248, 0.25)" />

                            {/* BIDS Dataset Card 2 (DWI Diffusion + Provenance) */}
                            <path d="M 235 455 L 300 422 L 345 445 L 280 478 Z" fill="#14283e" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="0.9" />
                            <path d="M 235 455 L 280 478 L 280 492 L 235 470 Z" fill="#091828" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            <path d="M 280 478 L 345 445 L 345 460 L 280 492 Z" fill="#1b3450" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="0.8" />
                            {/* Provenance Token Node Chain */}
                            <circle cx="286" cy="450" r="4.5" fill="#f59e0b" />
                            <line x1="286" y1="450" x2="318" y2="434" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3,2" />
                            <circle cx="318" cy="434" r="3.5" fill="#38bdf8" />
                            <line x1="318" y1="434" x2="335" y2="442" stroke="#38bdf8" strokeWidth="1" />
                            <circle cx="335" cy="442" r="2" fill="#22c55e" />

                            {/* Data Provenance Ledger Bar */}
                            <path d="M 180 480 L 230 455 L 245 462 L 195 487 Z" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="0.8" />
                        </g>

                        {/* Tier 2 Label & Curved Connector */}
                        <g
                            className="bl-label-group"
                            style={{
                                opacity: visibleLabels.includes(2) ? 1 : 0,
                                transform: visibleLabels.includes(2) ? 'none' : 'translateX(10px)',
                            }}
                        >
                            <path
                                d="M 498 495 C 538 495 555 455 592 455"
                                fill="none"
                                stroke={hoveredTier === 2 ? '#38bdf8' : 'rgba(56, 189, 248, 0.85)'}
                                strokeWidth={hoveredTier === 2 ? '1.8' : '1.3'}
                                className="bl-connector-line"
                                style={{ strokeDashoffset: visibleLabels.includes(2) ? 0 : 120 }}
                            />
                            <circle cx="498" cy="495" r="2.8" fill="#38bdf8" />

                            <circle cx="612" cy="455" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                            <text x="612" y="460" fill="#ffffff" fontSize="13.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">2</text>

                            <text x="638" y="448" fill="#ffffff" fontSize="21" fontWeight="700" letterSpacing="-0.01em" fontFamily="'Work Sans', system-ui, sans-serif">2. Data Management</text>
                            <text x="638" y="468" fill="#38bdf8" fontSize="12" fontWeight="600" letterSpacing="0.12em" fontFamily="'Geist Mono', ui-monospace, monospace">BIDS · MULTI-MODAL · PROVENANCE</text>
                            <text x="638" y="489" fill="#e2e8f0" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">Organize, curate, and share multi-modal neuroimaging datasets</text>
                            <text x="638" y="509" fill="#cbd5e1" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">(BIDS, MRI, MEG, EEG) with full cryptographic provenance.</text>
                        </g>
                    </g>

                    {/* ================================================================= */}
                    {/* TIER 3: Analysis Workflows (step 2 unbox)                         */}
                    {/* ================================================================= */}
                    <g
                        className="bl-part"
                        style={{
                            transform: unboxedStep >= 2 ? 'none' : 'translateY(288px)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredTier(3)}
                        onMouseLeave={() => setHoveredTier(null)}
                    >
                        {/* Isometric Tray Body: Elevated Teal-Navy */}
                        <path
                            d="M -10 300 A 14 7 0 0 1 -6 295 L 194 195 A 14 7 0 0 1 214 195 L 494 335 A 14 7 0 0 1 498 340 L 498 356 A 14 7 0 0 1 494 361 L 294 461 A 14 7 0 0 1 274 461 L -6 321 A 14 7 0 0 1 -10 316 Z"
                            fill="#0e2036"
                        />
                        <path
                            d="M 294 445 A 14 7 0 0 1 274 445 L -6 305 A 14 7 0 0 1 -6 295 L 194 195 A 14 7 0 0 1 214 195 L 494 335 A 14 7 0 0 1 494 345 Z"
                            fill="rgba(45, 212, 191, 0.12)"
                        />
                        <path
                            d="M 284 447 A 14 7 0 0 0 294 445 L 494 345 A 14 7 0 0 0 498 340 L 498 356 A 14 7 0 0 1 494 361 L 294 461 A 14 7 0 0 1 284 463 Z"
                            fill="rgba(2, 6, 23, 0.65)"
                        />
                        <path
                            d="M -10 300 A 14 7 0 0 1 -6 295 L 194 195 A 14 7 0 0 1 214 195 L 494 335 A 14 7 0 0 1 498 340 L 498 356 A 14 7 0 0 1 494 361 L 294 461 A 14 7 0 0 1 274 461 L -6 321 A 14 7 0 0 1 -10 316 Z"
                            fill="none"
                            stroke={hoveredTier === 3 ? '#38bdf8' : 'rgba(56, 189, 248, 0.85)'}
                            strokeWidth={hoveredTier === 3 ? '1.8' : '1.2'}
                            className="bl-tray-highlight"
                        />

                        {/* Tier 3 Scientific Visuals: Rich Scientific DAG Pipeline & Neuroimaging Execution Graph */}
                        <g>
                            {/* Subtle Workflow Floor Grid Lines */}
                            <line x1="120" y1="280" x2="360" y2="280" stroke="rgba(45, 212, 191, 0.18)" strokeWidth="0.7" strokeDasharray="2,4" />
                            <line x1="180" y1="240" x2="310" y2="350" stroke="rgba(45, 212, 191, 0.18)" strokeWidth="0.7" strokeDasharray="2,4" />

                            {/* DAG Connecting Data Vectors */}
                            <line x1="135" y1="295" x2="195" y2="265" stroke="#38bdf8" strokeWidth="1.4" />
                            <line x1="195" y1="265" x2="265" y2="300" stroke="#38bdf8" strokeWidth="1.4" />
                            <line x1="195" y1="265" x2="245" y2="235" stroke="#2dd4bf" strokeWidth="1.4" />
                            <line x1="245" y1="235" x2="325" y2="275" stroke="#2dd4bf" strokeWidth="1.4" strokeDasharray="3,3" />
                            <line x1="265" y1="300" x2="325" y2="275" stroke="#38bdf8" strokeWidth="1.4" />
                            <line x1="265" y1="300" x2="295" y2="345" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3,2" />
                            <line x1="325" y1="275" x2="385" y2="250" stroke="#818cf8" strokeWidth="1.4" />

                            {/* Node 1: Input Data Source (dwi.nii.gz) */}
                            <circle cx="135" cy="295" r="7.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.4" />
                            <circle cx="135" cy="295" r="3" fill="#38bdf8" />
                            <text x="135" y="312" fill="#94a3b8" fontSize="8" fontFamily="'Geist Mono', monospace" textAnchor="middle">RAW DWI</text>

                            {/* Node 2: Preprocessing App (FSL Eddy / Topup) */}
                            <circle cx="195" cy="265" r="9.5" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.6" />
                            <circle cx="195" cy="265" r="4" fill="#ffffff" />
                            <text x="195" y="250" fill="#38bdf8" fontSize="8.5" fontWeight="600" fontFamily="'Geist Mono', monospace" textAnchor="middle">PREPROC</text>

                            {/* Node 3: QA Quality Control Inspection */}
                            <circle cx="245" cy="235" r="7.5" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.4" />
                            <circle cx="245" cy="235" r="3" fill="#2dd4bf" />
                            <text x="245" y="222" fill="#2dd4bf" fontSize="8" fontFamily="'Geist Mono', monospace" textAnchor="middle">QA CHECK</text>

                            {/* Node 4: Tractography App (MRtrix3 tckgen) */}
                            <circle cx="265" cy="300" r="10.5" fill="url(#node-active-grad)" stroke="#38bdf8" strokeWidth="1.8" />
                            <circle cx="265" cy="300" r="4.5" fill="#ffffff" />
                            <text x="265" y="322" fill="#38bdf8" fontSize="9" fontWeight="700" fontFamily="'Geist Mono', monospace" textAnchor="middle">TRACKING</text>

                            {/* Node 5: Fiber Filtering Node */}
                            <circle cx="295" cy="345" r="7" fill="#b45309" stroke="#f59e0b" strokeWidth="1.2" />
                            <circle cx="295" cy="345" r="2.5" fill="#ffffff" />

                            {/* Node 6: Connectome Network Analysis Node */}
                            <circle cx="325" cy="275" r="9.5" fill="#4338ca" stroke="#818cf8" strokeWidth="1.5" />
                            <circle cx="325" cy="275" r="4" fill="#a5b4fc" />
                            <text x="325" y="260" fill="#a5b4fc" fontSize="8.5" fontWeight="600" fontFamily="'Geist Mono', monospace" textAnchor="middle">CONNECTOME</text>

                            {/* Node 7: Output Derivatives Target */}
                            <circle cx="385" cy="250" r="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.4" />
                            <circle cx="385" cy="250" r="3" fill="#818cf8" />
                            <text x="385" y="267" fill="#94a3b8" fontSize="8" fontFamily="'Geist Mono', monospace" textAnchor="middle">OUTPUT</text>

                            {/* Subtle Mini App Execution Badge on Tray */}
                            <g transform="translate(140, 325)">
                                <rect x="0" y="0" width="76" height="18" rx="4" fill="#0a192f" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.8" />
                                <circle cx="8" cy="9" r="2.5" fill="#22c55e" />
                                <text x="16" y="12" fill="#94a3b8" fontSize="8" fontFamily="'Geist Mono', monospace">app-tracking</text>
                            </g>
                        </g>

                        {/* Tier 3 Label & Curved Connector */}
                        <g
                            className="bl-label-group"
                            style={{
                                opacity: visibleLabels.includes(3) ? 1 : 0,
                                transform: visibleLabels.includes(3) ? 'none' : 'translateX(10px)',
                            }}
                        >
                            <path
                                d="M 498 340 C 538 340 555 295 592 295"
                                fill="none"
                                stroke={hoveredTier === 3 ? '#38bdf8' : 'rgba(56, 189, 248, 0.85)'}
                                strokeWidth={hoveredTier === 3 ? '1.8' : '1.3'}
                                className="bl-connector-line"
                                style={{ strokeDashoffset: visibleLabels.includes(3) ? 0 : 120 }}
                            />
                            <circle cx="498" cy="340" r="2.8" fill="#38bdf8" />

                            <circle cx="612" cy="295" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                            <text x="612" y="300" fill="#ffffff" fontSize="13.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">3</text>

                            <text x="638" y="288" fill="#ffffff" fontSize="21" fontWeight="700" letterSpacing="-0.01em" fontFamily="'Work Sans', system-ui, sans-serif">3. Analysis Workflows</text>
                            <text x="638" y="308" fill="#38bdf8" fontSize="12" fontWeight="600" letterSpacing="0.12em" fontFamily="'Geist Mono', ui-monospace, monospace">APPS · PIPELINES · REPRODUCIBILITY</text>
                            <text x="638" y="329" fill="#e2e8f0" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">Execute containerized apps, reproducible processing pipelines,</text>
                            <text x="638" y="349" fill="#cbd5e1" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">and automated neuroimaging computing graphs at scale.</text>
                        </g>
                    </g>

                    {/* ================================================================= */}
                    {/* TIER 4: Discover & Share (Top Level - step 1 unbox)               */}
                    {/* ================================================================= */}
                    <g
                        className="bl-part"
                        style={{
                            transform: unboxedStep >= 1 ? 'none' : 'translateY(432px)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={() => setHoveredTier(4)}
                        onMouseLeave={() => setHoveredTier(null)}
                    >
                        {/* Isometric Tray Body: Elevated Luminous Cobalt-Navy */}
                        <path
                            d="M -10 145 A 14 7 0 0 1 -6 140 L 194 40 A 14 7 0 0 1 214 40 L 494 180 A 14 7 0 0 1 498 185 L 498 201 A 14 7 0 0 1 494 206 L 294 306 A 14 7 0 0 1 274 306 L -6 166 A 14 7 0 0 1 -10 161 Z"
                            fill="#11253e"
                        />
                        <path
                            d="M 294 290 A 14 7 0 0 1 274 290 L -6 150 A 14 7 0 0 1 -6 140 L 194 40 A 14 7 0 0 1 214 40 L 494 180 A 14 7 0 0 1 494 190 Z"
                            fill="rgba(56, 189, 248, 0.16)"
                        />
                        <path
                            d="M 284 292 A 14 7 0 0 0 294 290 L 494 190 A 14 7 0 0 0 498 185 L 498 201 A 14 7 0 0 1 494 206 L 294 306 A 14 7 0 0 1 284 308 Z"
                            fill="rgba(2, 6, 23, 0.60)"
                        />
                        <path
                            d="M -10 145 A 14 7 0 0 1 -6 140 L 194 40 A 14 7 0 0 1 214 40 L 494 180 A 14 7 0 0 1 498 185 L 498 201 A 14 7 0 0 1 494 206 L 294 306 A 14 7 0 0 1 274 306 L -6 166 A 14 7 0 0 1 -10 161 Z"
                            fill="none"
                            stroke={hoveredTier === 4 ? '#38bdf8' : 'rgba(56, 189, 248, 0.95)'}
                            strokeWidth={hoveredTier === 4 ? '2.2' : '1.4'}
                            className="bl-tray-highlight"
                        />

                        {/* Tier 4 Scientific Visuals: 3D Rainbow Brain Tractography Connectome & DOI Token */}
                        <g transform="matrix(1, 0.5, -1, 0.5, 204, 66) scale(1.38)">
                            {/* Cortical Hemisphere Contour */}
                            <path
                                d="M102.02,104.66c-5.43,0-11.45-2.29-18.42-7.01-5.52-3.68-12.18-4.89-19.23-6.18-.83-.15-1.66-.3-2.48-.46-3.4-.67-6.83-1.42-10.15-2.16-5.05-1.12-10.26-2.27-15.4-3.1-4.64-.71-8.77-1.09-12.6-1.17-3.33-.09-7.87-.21-11.58-2.87-5.71-3.91-8.35-13.54-7.49-20.2,.2-1.48,.58-2.94,1.16-4.46C12.71,40.25,27.39,19.11,48.02,9.98c9.39-4.11,20.15-5.1,27.42-5.48,2.34-.19,4.79-.19,7.16-.19,9.56,.09,19.35,1.43,29.11,3.96,14.19,4.09,24.4,8.94,32.2,15.28,2.95,2.38,5.67,5.16,8.08,8.27,.92,1.17,1.68,2.32,2.49,3.53l.39,.59c3.2,5.04,6.25,10.52,7.06,16.69,.68,5.22,.12,11.02-1.73,17.73-1.27,4.37-3.04,9.34-6.53,13.37-5.61,6.41-12.29,7.24-17.47,7.24h0c-2.72,0-5.5-.27-8.35-.56-.77-.08-1.51-.28-2.23-.48-.74-.2-1.5-.4-2.02-.4-.08,0-.14,0-.18,.01-.44,.31-1.18,1.65-1.59,2.38-.41,.74-.8,1.43-1.25,2.03-3.87,5-8.75,8.56-13.77,10.05-1.51,.45-3.12,.67-4.78,.67Z"
                                fill="rgba(238,243,246,0.15)"
                                stroke="rgba(238,243,246,0.95)"
                                strokeWidth="1.6"
                            />
                            {/* Multi-Modal Rainbow Tractography Pathways */}
                            <path d="M157.95,69.03l-34.31-2.61L91.55,7.27c-2.98-.27-5.96-.44-8.95-.47-2.31,0-4.72,0-7.03,.18-4.71,.25-9.62,.72-14.44,1.65l56.83,64.04,37.7,3.01c.85-1.95,1.53-3.98,2.12-6.01,.06-.22,.11-.44,.17-.66Z" fill="#f9c926" />
                            <path d="M59.64,8.95c-3.66,.78-7.24,1.84-10.61,3.32-3.66,1.62-7.16,3.66-10.5,6.03l73.26,61.42,38.13,4.2c.63-.55,1.25-1.15,1.85-1.83,1.43-1.64,2.54-3.49,3.47-5.45l-37.94-3.32L59.64,8.95Z" fill="#e57536" />
                            <path d="M37.65,18.93c-6.35,4.66-12.05,10.52-16.91,16.96l85.25,50.45,14.96,2.21c.48-.64,1-1.16,1.61-1.39,1.66-.55,3.88,.55,5.55,.74,7.79,.81,15.15,1.41,21.21-3.45l-38.26-4.14L37.65,18.93Z" fill="#a9262c" />
                            <path d="M20.08,36.78c-4.63,6.28-8.47,13.08-11.37,19.86l91.43,35.89,16.14,2.55c.82-.84,1.59-1.72,2.29-2.63,.63-.84,1.26-2.21,2-3.36l-15.13-2.26L20.08,36.78Z" fill="#2f8fbf" />
                        </g>

                        {/* Interactive DOI Token / Citation Badge */}
                        <g transform="translate(65, 175)">
                            <rect x="0" y="0" width="84" height="18" rx="4" fill="#081422" stroke="rgba(56, 189, 248, 0.45)" strokeWidth="0.8" />
                            <circle cx="8" cy="9" r="2.5" fill="#38bdf8" />
                            <text x="16" y="12" fill="#38bdf8" fontSize="8" fontFamily="'Geist Mono', monospace">doi:10.25663</text>
                        </g>

                        {/* Tier 4 Label & Curved Connector */}
                        <g
                            className="bl-label-group"
                            style={{
                                opacity: visibleLabels.includes(4) ? 1 : 0,
                                transform: visibleLabels.includes(4) ? 'none' : 'translateX(10px)',
                            }}
                        >
                            <path
                                d="M 498 185 C 538 185 555 140 592 140"
                                fill="none"
                                stroke={hoveredTier === 4 ? '#38bdf8' : 'rgba(56, 189, 248, 0.9)'}
                                strokeWidth={hoveredTier === 4 ? '1.8' : '1.3'}
                                className="bl-connector-line"
                                style={{ strokeDashoffset: visibleLabels.includes(4) ? 0 : 120 }}
                            />
                            <circle cx="498" cy="185" r="2.8" fill="#38bdf8" />

                            <circle cx="612" cy="140" r="15" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                            <text x="612" y="145" fill="#ffffff" fontSize="13.5" fontWeight="800" textAnchor="middle" fontFamily="system-ui, sans-serif">4</text>

                            <text x="638" y="133" fill="#ffffff" fontSize="21" fontWeight="700" letterSpacing="-0.01em" fontFamily="'Work Sans', system-ui, sans-serif">4. Discover &amp; Share</text>
                            <text x="638" y="153" fill="#38bdf8" fontSize="12" fontWeight="600" letterSpacing="0.12em" fontFamily="'Geist Mono', ui-monospace, monospace">VISUALIZATION · CONNECTOMES · PUBLICATION</text>
                            <text x="638" y="174" fill="#e2e8f0" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">Visualize results, explore interactive 3D brain maps,</text>
                            <text x="638" y="194" fill="#cbd5e1" fontSize="14.5" fontWeight="400" fontFamily="'Work Sans', system-ui, sans-serif">and publish reproducible research with persistent citable DOIs.</text>
                        </g>
                    </g>
                </svg>
            </Box>

            {/* Bottom Controls: Discreet Replay Pill & Figcaption */}
            <Flex
                align="center"
                justify="space-between"
                w="100%"
                maxW={{ base: '100%', lg: '740px', xl: '780px' }}
                mt="12px"
                px="6px"
            >
                <Button
                    size="xs"
                    variant="ghost"
                    color="rgba(169, 186, 198, 0.75)"
                    bg="transparent"
                    border="1px solid rgba(238, 243, 246, 0.16)"
                    borderRadius="full"
                    px="13px"
                    py="4px"
                    h="26px"
                    fontSize="11.5px"
                    fontWeight="500"
                    fontFamily="'Geist Mono', ui-monospace, monospace"
                    letterSpacing="0.04em"
                    gap="6px"
                    onClick={handleReplay}
                    isLoading={isReplaying}
                    _hover={{
                        bg: 'rgba(56, 189, 248, 0.08)',
                        borderColor: 'rgba(56, 189, 248, 0.45)',
                        color: '#38bdf8',
                    }}
                >
                    <RotateCcw size={11} />
                    <span>Replay unboxing</span>
                </Button>

                <Box
                    as="span"
                    fontFamily="'Geist Mono', ui-monospace, monospace"
                    fontSize="0.72rem"
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color="rgba(169, 186, 198, 0.7)"
                >
                    From raw data to reproducible discovery
                </Box>
            </Flex>
        </Box>
    );
}
