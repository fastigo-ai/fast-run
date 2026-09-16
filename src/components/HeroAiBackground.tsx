import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export const HeroAiBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulsePhase: number;
      pulseSpeed: number;
    }

    // Generate responsive nodes
    const nodeCount = Math.min(
      Math.max(Math.floor((width * height) / 22000), 28),
      60
    );
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        baseAlpha: Math.random() * 0.45 + 0.35,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    // Active data packets traversing between connected nodes
    const packets: PulsePacket[] = [];
    const maxPackets = 7;

    const spawnPacket = (connections: { i: number; j: number }[]) => {
      if (connections.length === 0 || packets.length >= maxPackets) return;
      if (Math.random() < 0.04) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        packets.push({
          fromNode: conn.i,
          toNode: conn.j,
          progress: 0,
          speed: Math.random() * 0.012 + 0.008,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const maxDist = 145;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw nodes
      const mouse = mouseRef.current;
      const connections: { i: number; j: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Gentle edge bounce
        if (n.x < 10) {
          n.x = 10;
          n.vx *= -1;
        } else if (n.x > width - 10) {
          n.x = width - 10;
          n.vx *= -1;
        }
        if (n.y < 10) {
          n.y = 10;
          n.vy *= -1;
        } else if (n.y > height - 10) {
          n.y = height - 10;
          n.vy *= -1;
        }

        // Mouse interactive soft repulsion / attraction
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 1) {
            const force = (160 - dist) / 160;
            n.x -= (dx / dist) * force * 0.8;
            n.y -= (dy / dist) * force * 0.8;
          }
        }

        // Node pulse
        n.pulsePhase += n.pulseSpeed;
        const currentAlpha = n.baseAlpha + Math.sin(n.pulsePhase) * 0.2;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 224, ${Math.max(0.15, currentAlpha)})`;
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            connections.push({ i, j });
            const lineAlpha = (1 - dist / maxDist) * 0.24;

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(0, 112, 173, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // Spawn and animate synaptic data packets
      spawnPacket(connections);

      for (let pIdx = packets.length - 1; pIdx >= 0; pIdx--) {
        const p = packets[pIdx];
        const nFrom = nodes[p.fromNode];
        const nTo = nodes[p.toNode];

        if (!nFrom || !nTo) {
          packets.splice(pIdx, 1);
          continue;
        }

        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(pIdx, 1);
          continue;
        }

        const px = nFrom.x + (nTo.x - nFrom.x) * p.progress;
        const py = nFrom.y + (nTo.y - nFrom.y) * p.progress;

        // Glowing data packet point
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 163, 224, 0.95)";
        ctx.shadowColor = "rgba(0, 163, 224, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. Base Gradient Foundation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eaf4fe] via-[#f1f8fd] to-[#f8fbfe]" />

      {/* 2. Top Perimeter Illuminated Cyber-Beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#0070AD]/30 to-transparent" />
      <div className="absolute top-0 right-1/4 w-44 h-[2px] bg-gradient-to-r from-transparent via-[#00A3E0] to-transparent animate-beam-move" />

      {/* 3. Smooth Moving Ambient AI Aurora Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -25, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-6 left-1/2 -translate-x-1/2 w-[820px] h-[380px] bg-gradient-to-tr from-[#0070AD]/12 via-[#00A3E0]/18 to-[#38bdf8]/12 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -left-32 w-[480px] h-[480px] bg-sky-400/10 rounded-full blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-32 w-[520px] h-[520px] bg-indigo-500/8 rounded-full blur-[140px]"
      />

      {/* 4. Subtle Isometric AI Hex/Diamond Lattice Matrix */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-ai-hex-pattern"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            {/* Center diamond & coordinate ticks */}
            <path
              d="M 28 0 L 56 28 L 28 56 L 0 28 Z"
              fill="none"
              stroke="#0070AD"
              strokeWidth="0.5"
              strokeOpacity="0.12"
            />
            <circle cx="28" cy="28" r="1.2" fill="#00A3E0" fillOpacity="0.35" />
            <circle cx="0" cy="0" r="0.8" fill="#0070AD" fillOpacity="0.25" />
            <circle cx="56" cy="0" r="0.8" fill="#0070AD" fillOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-ai-hex-pattern)" />
      </svg>

      {/* 5. Rotating AI Focal Aperture & Orbital Rings (Behind Heading & Search) */}
      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-[720px] h-[720px] pointer-events-none opacity-40">
        {/* Outer Orbital Ring with Coordinate Ticks */}
        <div className="absolute inset-0 rounded-full border border-sky-400/25 border-dashed animate-spin-slow" />

        {/* Mid Counter-Rotating Ring */}
        <div
          className="absolute inset-16 rounded-full border border-[#0070AD]/20 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "36s" }}
        />

        {/* Inner Subtle Radar Aperture with Crosshairs */}
        <div className="absolute inset-36 rounded-full border border-sky-500/15">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00A3E0]/20 to-transparent" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#00A3E0]/20 to-transparent" />
        </div>
      </div>

      {/* 6. Real-time Interactive Synaptic Canvas (Nodes + Data Packets) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default HeroAiBackground;
