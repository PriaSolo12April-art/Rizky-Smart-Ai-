"use client";

import React, { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2, active: false };

    // Starfield/Particle definition
    interface Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glow: boolean;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));

    // Initialize random floating particles
    for (let i = 0; i < particleCount; i++) {
      const isGlow = Math.random() > 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 0.5,
        color: isGlow
          ? `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, 255, ${Math.random() * 0.4 + 0.3})`
          : `rgba(6, 182, 212, ${Math.random() * 0.3 + 0.1})`,
        glow: isGlow,
      });
    }

    // Initialize 3D Rotating Mesh Nodes (Globe/AI Brain simulation)
    interface Node3D {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
    }

    const meshNodes: Node3D[] = [];
    const globeRadius = Math.min(width, height) * 0.22;
    const nodeCount = 45;

    // Distribute nodes evenly on a sphere using Fibonacci lattice
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      meshNodes.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    let angleX = 0.003;
    let angleY = 0.004;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create rich cosmic gradient base
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, "#080c25");
      gradient.addColorStop(0.5, "#040717");
      gradient.addColorStop(1, "#020308");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Aurora/Nebula effect (Floating Blur Blobs)
      const time = Date.now() * 0.0003;
      const b1x = width * 0.3 + Math.sin(time) * 100;
      const b1y = height * 0.4 + Math.cos(time * 0.8) * 100;
      const b2x = width * 0.7 + Math.cos(time * 1.2) * 120;
      const b2y = height * 0.6 + Math.sin(time * 0.9) * 120;

      // Blob 1: Electric Blue / Purple
      const radGrad1 = ctx.createRadialGradient(b1x, b1y, 50, b1x, b1y, 400);
      radGrad1.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      radGrad1.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = radGrad1;
      ctx.beginPath();
      ctx.arc(b1x, b1y, 400, 0, Math.PI * 2);
      ctx.fill();

      // Blob 2: Cyan / Neon Teal
      const radGrad2 = ctx.createRadialGradient(b2x, b2y, 50, b2x, b2y, 350);
      radGrad2.addColorStop(0, "rgba(6, 182, 212, 0.1)");
      radGrad2.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = radGrad2;
      ctx.beginPath();
      ctx.arc(b2x, b2y, 350, 0, Math.PI * 2);
      ctx.fill();

      // Smooth mouse follow interpolation
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      // Draw custom mouse glowing cursor shadow if active
      if (mouse.active) {
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        mouseGrad.addColorStop(0, "rgba(6, 182, 212, 0.12)");
        mouseGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
        mouseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw floating background particles & lines
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Parallax offset from mouse position
        const dx = mouse.x - width / 2;
        const dy = mouse.y - height / 2;
        const px = p.x - dx * (0.015 * (100 / p.z));
        const py = p.y - dy * (0.015 * (100 / p.z));

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles that are close
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const px2 = p2.x - dx * (0.015 * (100 / p2.z));
          const py2 = p2.y - dy * (0.015 * (100 / p2.z));
          const dist = Math.hypot(px - px2, py - py2);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px2, py2);
            ctx.stroke();
          }
        }
      });

      // Draw 3D Rotating Mesh Sphere (Globe structure in central background)
      const cx = width / 2;
      const cy = height * 0.45;

      // Matrix rotation math
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      // Rotate nodes and map to 2D
      const projectedNodes: { x: number; y: number; z: number }[] = [];

      meshNodes.forEach((node) => {
        // Y Rotation
        let x1 = node.ox * cosY - node.oz * sinY;
        let z1 = node.ox * sinY + node.oz * cosY;

        // X Rotation
        let y2 = node.oy * cosX - z1 * sinX;
        let z2 = node.oy * sinX + z1 * cosX;

        // Update current position values
        node.ox = x1;
        node.oy = y2;
        node.oz = z2;

        // Perspective scale factor
        const perspective = 350 / (350 + z2);
        const screenX = cx + x1 * perspective;
        const screenY = cy + y2 * perspective;

        projectedNodes.push({ x: screenX, y: screenY, z: z2 });
      });

      // Draw connections/mesh lines for 3D globe
      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n2 = projectedNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          // Connect only nearby vertices to form nice web patterns
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.12 * ((n1.z + n2.z + 400) / 800);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw glowing central orb
      const orbRad = Math.min(width, height) * 0.08;
      const orbGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, orbRad);
      orbGrad.addColorStop(0, "rgba(6, 182, 212, 0.18)");
      orbGrad.addColorStop(0.4, "rgba(99, 102, 241, 0.06)");
      orbGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, orbRad, 0, Math.PI * 2);
      ctx.fill();

      // Draw projected node dots
      projectedNodes.forEach((node) => {
        const nodeSize = (1 - node.z / globeRadius) * 1.5 + 0.5;
        const alpha = (1 - node.z / globeRadius) * 0.4 + 0.1;
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly float globe central position with time
      angleX = 0.0006 + Math.sin(time) * 0.0002;
      angleY = 0.0012 + Math.cos(time * 0.8) * 0.0002;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />;
}
