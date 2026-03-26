'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/site';

interface FlowParticle {
  ax: number; ay: number;
  bx: number; by: number;
  t: number; speed: number; color: string;
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W: number, H: number;
    const nodes = siteConfig.networkNodes;
    const edges = siteConfig.networkEdges;
    const nodeMap: Record<string, (typeof nodes)[number]> = {};
    nodes.forEach((n) => (nodeMap[n.id] = n));
    let flowParticles: FlowParticle[] = [];

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      W = canvas!.width = rect.width;
      H = canvas!.height = rect.height;
    }

    function spawnFlowParticle() {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      const a = nodeMap[edge[0]];
      const b = nodeMap[edge[1]];
      if (!a || !b) return;
      flowParticles.push({
        ax: a.x, ay: a.y, bx: b.x, by: b.y,
        t: 0, speed: 0.003 + Math.random() * 0.005, color: a.color,
      });
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, W, H);

      for (const [aId, bId] of edges) {
        const a = nodeMap[aId];
        const b = nodeMap[bId];
        if (!a || !b) continue;
        ctx!.beginPath();
        ctx!.moveTo(a.x * W, a.y * H);
        ctx!.lineTo(b.x * W, b.y * H);
        ctx!.strokeStyle = 'rgba(200, 64, 233, 0.12)';
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      if (Math.random() < 0.08) spawnFlowParticle();
      flowParticles = flowParticles.filter((p) => p.t <= 1);
      for (const p of flowParticles) {
        p.t += p.speed;
        const x = (p.ax + (p.bx - p.ax) * p.t) * W;
        const y = (p.ay + (p.by - p.ay) * p.t) * H;
        ctx!.beginPath();
        ctx!.arc(x, y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = 1 - p.t;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      for (const n of nodes) {
        const x = n.x * W;
        const y = n.y * H;
        const pulse = 1 + Math.sin(time * 0.002 + n.x * 10) * 0.15;

        ctx!.beginPath();
        ctx!.arc(x, y, n.r * pulse * 1.5, 0, Math.PI * 2);
        const glow = ctx!.createRadialGradient(x, y, 0, x, y, n.r * pulse * 1.5);
        glow.addColorStop(0, n.color + '30');
        glow.addColorStop(1, 'transparent');
        ctx!.fillStyle = glow;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(x, y, n.r * pulse * 0.6, 0, Math.PI * 2);
        ctx!.fillStyle = n.color + '40';
        ctx!.fill();
        ctx!.strokeStyle = n.color + '80';
        ctx!.lineWidth = 1;
        ctx!.stroke();

        ctx!.font = '500 9px "JetBrains Mono", monospace';
        ctx!.fillStyle = n.color;
        ctx!.textAlign = 'center';
        ctx!.fillText(n.id, x, y + n.r * pulse * 0.6 + 14);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="network-canvas" />;
}
