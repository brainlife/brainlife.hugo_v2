'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TeamHeroCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 85;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle Neural Nodes
        const particleCount = 120;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities: THREE.Vector3[] = [];

        const colorPalette = [
            new THREE.Color('#2693D8'), // Brainlife Brand Blue
            new THREE.Color('#38bdf8'), // Sky Blue
            new THREE.Color('#60a5fa'), // Clean Blue
            new THREE.Color('#93c5fd'), // Soft Light Blue
        ];

        for (let i = 0; i < particleCount; i++) {
            // Position in spherical shell
            const radius = 35 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Random velocities
            velocities.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                )
            );

            // Node colors
            const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Texture for particle points
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            grad.addColorStop(0.3, 'rgba(38, 147, 216, 0.8)');
            grad.addColorStop(0.8, 'rgba(56, 189, 248, 0.2)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 64, 64);
        }
        const particleTexture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 3.5,
            map: particleTexture,
            vertexColors: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Dynamic Synaptic Connection Lines
        const lineMaterial = new THREE.LineBasicMaterial({
            color: '#2693D8',
            transparent: true,
            opacity: 0.14,
            blending: THREE.AdditiveBlending,
        });

        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(particleCount * particleCount * 6);
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(linesMesh);

        // Mouse Interactivity
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
            mouseY = -(((e.clientY - rect.top) / container.clientHeight) * 2 - 1);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Resize Listener
        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Animation Loop
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            // Smooth camera easing
            targetX += (mouseX * 12 - targetX) * 0.04;
            targetY += (mouseY * 12 - targetY) * 0.04;
            camera.position.x = targetX;
            camera.position.y = targetY;
            camera.lookAt(scene.position);

            // Rotate points constellation
            points.rotation.y += 0.0015;
            points.rotation.x += 0.0008;

            const posAttr = geometry.attributes.position as THREE.BufferAttribute;
            const currentPos = posAttr.array as Float32Array;

            // Connect nearby nodes with synaptic lines
            let lineIndex = 0;
            const maxDistance = 18;

            for (let i = 0; i < particleCount; i++) {
                // Update position with velocity
                currentPos[i * 3] += velocities[i].x;
                currentPos[i * 3 + 1] += velocities[i].y;
                currentPos[i * 3 + 2] += velocities[i].z;

                // Bounce in boundary
                const limit = 45;
                if (Math.abs(currentPos[i * 3]) > limit) velocities[i].x *= -1;
                if (Math.abs(currentPos[i * 3 + 1]) > limit) velocities[i].y *= -1;
                if (Math.abs(currentPos[i * 3 + 2]) > limit) velocities[i].z *= -1;

                // Check distance to other nodes
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = currentPos[i * 3] - currentPos[j * 3];
                    const dy = currentPos[i * 3 + 1] - currentPos[j * 3 + 1];
                    const dz = currentPos[i * 3 + 2] - currentPos[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        linePositions[lineIndex * 3] = currentPos[i * 3];
                        linePositions[lineIndex * 3 + 1] = currentPos[i * 3 + 1];
                        linePositions[lineIndex * 3 + 2] = currentPos[i * 3 + 2];

                        linePositions[(lineIndex + 1) * 3] = currentPos[j * 3];
                        linePositions[(lineIndex + 1) * 3 + 1] = currentPos[j * 3 + 1];
                        linePositions[(lineIndex + 1) * 3 + 2] = currentPos[j * 3 + 2];

                        lineIndex += 2;
                    }
                }
            }

            posAttr.needsUpdate = true;
            lineGeometry.setDrawRange(0, lineIndex);
            lineGeometry.attributes.position.needsUpdate = true;

            linesMesh.rotation.y = points.rotation.y;
            linesMesh.rotation.x = points.rotation.x;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0.75,
            }}
        />
    );
}
