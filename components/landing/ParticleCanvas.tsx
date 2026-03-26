'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/site';

interface Particle {
  x: number;
  y: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  text: string;
  opacity: number;
  size: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    let particles: Particle[] = [];
    const mouse = { x: 0.5, y: 0.5 };
    const FRAGMENTS = siteConfig.particleFragments;

    function createParticle(): Particle {
      return {
        x: Math.random() * W,
        y: H + Math.random() * 100,
        speed: 0.2 + Math.random() * 0.5,
        amplitude: 20 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
        opacity: 0.08 + Math.random() * 0.2,
        size: 9 + Math.random() * 3,
      };
    }

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      particles = [];
      const count = Math.min(120, Math.floor((W * H) / 8000));
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.y = Math.random() * H;
        particles.push(p);
      }
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y -= p.speed;
        const dx = (mouse.x - 0.5) * 30;
        const dy = (mouse.y - 0.5) * 15;
        const ox = Math.sin(time * p.frequency + p.phase) * p.amplitude + dx;
        if (p.y < -30) Object.assign(p, createParticle());
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = '#C840E9';
        ctx!.font = `500 ${p.size}px "JetBrains Mono", monospace`;
        ctx!.fillText(p.text, p.x + ox, p.y + dy);
      }
      ctx!.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    }

    init();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}
