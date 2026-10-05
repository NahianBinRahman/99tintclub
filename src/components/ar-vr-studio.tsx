"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Sparkles,
  Maximize2,
  Scan,
  Layers,
  Glasses,
  QrCode,
  Shield,
  Activity,
  Zap,
  Play,
  Pause,
  Sun,
  Moon,
  Compass,
  Smartphone,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface SupercarAngle {
  label: string;
  image: string;
  hotspots: {
    x: number;
    y: number;
    title: string;
    detail: string;
    spec: string;
  }[];
}

const VEHICLE_ANGLES: SupercarAngle[] = [
  {
    label: "Front 3/4 Studio",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: 38, y: 55, title: "Self-Healing Front PPF", detail: "Computer-cut thermoplastic polyurethane film shielding bumper, hood, and mirrors.", spec: "Self-Healing TPU" },
      { x: 72, y: 62, title: "Forged Wheel Ceramic", detail: "High-temperature ceramic barrier applied to wheel faces, barrels, and brake calipers.", spec: "Thermal Ceramic" },
      { x: 50, y: 35, title: "Ceramic Windshield Tint", detail: "Infrared heat-rejecting nano-ceramic film maintaining optical clarity.", spec: "UV Rejection" },
    ],
  },
  {
    label: "Aero Profile View",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: 28, y: 50, title: "Fender Protection Film", detail: "High-impact protection film with computer-cut wrapped edges along body lines.", spec: "Wrapped Edges" },
      { x: 58, y: 58, title: "Stage 2 Paint Correction", detail: "Multi-stage jeweled compounding achieving swirl-free optical depth.", spec: "High Gloss Finish" },
      { x: 78, y: 48, title: "Rear Arch Stone Guard", detail: "Protective film behind drive wheels defending against thrown road debris.", spec: "Impact Shield" },
    ],
  },
  {
    label: "Rear Diffuser & Track Wing",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1600&auto=format&fit=crop",
    hotspots: [
      { x: 50, y: 30, title: "Carbon Fiber Ceramic", detail: "UV-inhibiting ceramic protective topcoat preserving exposed carbon weave.", spec: "UV Protection" },
      { x: 50, y: 70, title: "Exhaust Surround Protection", detail: "High-temperature barrier protecting bumper surfaces from exhaust heat.", spec: "Thermal Defense" },
    ],
  },
];

type StudioMode = "turntable" | "hotspots" | "vr-booth";
type LightingMode = "inspection" | "studio-warm" | "track-night";

export const ArVrStudio: React.FC = () => {
  const [activeMode, setActiveMode] = useState<StudioMode>("turntable");
  const [currentAngleIndex, setCurrentAngleIndex] = useState<number>(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<any | null>(null);
  const [lighting, setLighting] = useState<LightingMode>("inspection");
  const [showArModal, setShowArModal] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto orbit turntable timer
  useEffect(() => {
    if (!isAutoOrbit) return;
    const interval = setInterval(() => {
      setCurrentAngleIndex((prev) => (prev + 1) % VEHICLE_ANGLES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoOrbit]);

  // Motion Graphics Background Canvas (Nanotech Graphene Matrix Particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ["rgba(239, 68, 68, 0.6)", "rgba(245, 158, 11, 0.6)", "rgba(6, 182, 212, 0.6)"];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[i % colors.length],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with laser grid lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentAngle = VEHICLE_ANGLES[currentAngleIndex];

  return (
    <section id="ar-studio" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.08] bg-[#06070a]">
      {/* Background Particle Motion Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0"
      />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
              <Glasses className="w-3.5 h-3.5 text-cyan-400" />
              <span>360° VEHICLE VISUALIZER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              STUDIO SPECIFICATION & <span className="shimmer-text">EXPERIENCE</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <button
              onClick={() => setShowArModal(true)}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-black flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all hover:opacity-95 active:scale-95"
              style={{ background: "var(--accent-gradient)" }}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile AR Preview</span>
            </button>
          </div>
        </div>

        {/* Studio Command Deck / Control Bar */}
        <div className="glass-panel p-2 rounded-2xl border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-3">
          {/* Modes Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: "turntable", label: "360° Exterior Angles", icon: Compass },
              { id: "hotspots", label: "Surface Protection Hotspots", icon: Layers },
              { id: "vr-booth", label: "Studio Lighting Simulation", icon: Glasses },
            ].map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setActiveMode(mode.id as StudioMode);
                    setSelectedHotspot(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white text-black shadow-md font-bold scale-[1.01]"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-controls based on active mode */}
          <div className="flex items-center gap-2">
            {(activeMode === "turntable" || activeMode === "hotspots") && (
              <button
                onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono uppercase transition-colors ${
                  isAutoOrbit
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border-white/10 text-zinc-300"
                }`}
              >
                {isAutoOrbit ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isAutoOrbit ? "Auto Orbit ON" : "Auto Orbit OFF"}</span>
              </button>
            )}

            {activeMode === "vr-booth" && (
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                {[
                  { id: "inspection", label: "Spectrum White" },
                  { id: "studio-warm", label: "Warm Inspection" },
                  { id: "track-night", label: "Dark Studio" },
                ].map((lit) => (
                  <button
                    key={lit.id}
                    onClick={() => setLighting(lit.id as LightingMode)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono font-bold transition-all ${
                      lighting === lit.id
                        ? "bg-white text-black"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {lit.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main AR / VR Interactive Stage */}
        <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-[440px] sm:h-[560px] select-none group">
          {/* Dynamic Studio Lighting Ambient Overlay */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-700 z-10 ${
              lighting === "studio-warm"
                ? "bg-gradient-to-t from-amber-950/40 via-amber-900/20 to-transparent mix-blend-color-dodge"
                : lighting === "track-night"
                ? "bg-gradient-to-t from-[#06070a] via-black/40 to-black/70 mix-blend-multiply"
                : "bg-radial from-transparent via-black/20 to-black/60"
            }`}
          />

          {/* Vehicle Stage Image */}
          <div className="relative w-full h-full">
            <img
              src={currentAngle.image}
              alt="Studio Supercar Showcase"
              className="w-full h-full object-cover object-center transition-all duration-700"
            />

            {/* Top HUD Status Badges */}
            <div className="absolute top-4 left-4 z-30 flex flex-wrap items-center gap-2 pointer-events-none">
              <div className="backdrop-blur-md bg-black/75 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2 shadow-lg">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                  BAY: CLIMATE-CONTROLLED
                </span>
              </div>

              <div className="backdrop-blur-md bg-black/75 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2 shadow-lg">
                <Shield className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                  SPEC: FULL PPF + CERAMIC
                </span>
              </div>

              <div className="backdrop-blur-md bg-black/75 border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
                  FINISH: CONCOURS GLOSS
                </span>
              </div>
            </div>

            {/* Interactive Hologram Hotspots */}
            {currentAngle.hotspots.map((spot, idx) => (
              <div
                key={idx}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setSelectedHotspot(spot)}
              >
                <div className="relative group/spot">
                  {/* Subtle Radar Pulse */}
                  <span className="absolute -inset-1.5 rounded-full bg-[var(--accent-primary)]/30 animate-ping" />
                  <div className="relative w-7 h-7 rounded-full bg-black/85 border border-white/80 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:scale-115">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 pointer-events-none hidden group-hover/spot:flex flex-col items-center whitespace-nowrap z-40">
                    <div className="backdrop-blur-md bg-black/90 border border-white/15 px-3 py-1 rounded-lg text-center shadow-xl">
                      <div className="text-[10px] font-bold uppercase text-white tracking-wider">
                        {spot.title}
                      </div>
                      <div className="text-[9px] font-mono text-[var(--accent-primary)]">
                        {spot.spec}
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 bg-black/90 rotate-45 -mt-1 border-r border-b border-white/15" />
                  </div>
                </div>
              </div>
            ))}

            {/* Selected Hotspot Detail Card Panel */}
            {selectedHotspot && (
              <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-80 z-40 backdrop-blur-xl bg-black/90 border border-white/15 p-4.5 rounded-xl shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-bold uppercase text-white">
                      {selectedHotspot.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-zinc-400 hover:text-white text-xs font-mono p-1"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed mb-3">
                  {selectedHotspot.detail}
                </p>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">SPECIFICATION</span>
                  <span className="font-bold text-[var(--accent-primary)]">{selectedHotspot.spec}</span>
                </div>
              </div>
            )}

            {/* Turntable Angle Selector Thumbnails Bar */}
            <div className="absolute bottom-5 left-5 z-30 flex items-center gap-2">
              {VEHICLE_ANGLES.map((angle, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentAngleIndex(idx);
                    setIsAutoOrbit(false);
                    setSelectedHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium uppercase transition-all flex items-center gap-1.5 ${
                    currentAngleIndex === idx
                      ? "bg-white text-black shadow-md font-bold scale-[1.02]"
                      : "backdrop-blur-md bg-black/70 text-zinc-300 border border-white/10 hover:text-white"
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{angle.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AR QR Projection Modal */}
      {showArModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md glass-panel p-6 sm:p-7 rounded-2xl border border-white/20 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowArModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center mx-auto mb-3.5 text-white">
              <QrCode className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block mb-1">
              MOBILE 3D & AR PREVIEW
            </span>
            <h3 className="text-xl font-black uppercase text-white mb-2">
              INSPECT VEHICLE IN 3D
            </h3>
            <p className="text-xs text-zinc-300 mb-5 leading-relaxed">
              Scan with your smartphone camera to load the interactive 3D model and examine vehicle panel finishes on supported mobile browsers.
            </p>

            {/* Simulated AR QR Matrix */}
            <div className="p-3.5 rounded-xl bg-white inline-block shadow-2xl mb-5">
              <div className="w-44 h-44 bg-zinc-950 rounded-lg p-2 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-20" />
                <div className="w-32 h-32 border-2 border-dashed border-cyan-400/80 rounded-lg flex flex-col items-center justify-center text-center p-2 relative z-10 animate-pulse">
                  <Smartphone className="w-7 h-7 text-white mb-1" />
                  <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                    Ready for 3D Preview
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono">Scan Camera</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>iOS QuickLook & Android AR Ready</span>
              </div>
              <button
                onClick={() => setShowArModal(false)}
                className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors mt-2"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
