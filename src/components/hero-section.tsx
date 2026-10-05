"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSiteConfig } from "@/context/site-context";
import {
  ArrowRight,
  Gauge,
  Layers,
  ChevronDown,
  Shield,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  Play,
  Pause,
  Eye,
  Info,
  X,
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  category: string;
  title: string;
  description: string;
  spec: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "ppf",
    x: 27,
    y: 71,
    category: "SURFACE ARMOR",
    title: "Self-Healing PPF Stealth Shield",
    description: "8-mil optical-grade polyurethane absorbs rock chips and road stone impacts with ambient heat self-healing.",
    spec: "8 mil • Self-Healing Topcoat",
  },
  {
    id: "correction",
    x: 54,
    y: 43,
    category: "OPTICAL CLARITY",
    title: "Multi-Stage Paint Restoration",
    description: "Ultrasonic depth-gauged compounding removes micro-marring and wash swirls, restoring pure mirror reflection.",
    spec: "2-Stage Jeweling Polish",
  },
  {
    id: "ceramic",
    x: 81,
    y: 52,
    category: "MOLECULAR MATRIX",
    title: "Graphene & Ceramic Matrix",
    description: "Covalently bonded hydrophobic barrier delivering extreme contact angle beading, UV defense, and thermal resilience.",
    spec: "9H Hardness • 110° Water Angle",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();

  // Surface Scan State
  const [scanPos, setScanPos] = useState<number>(55);
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(true);
  const [isHoveringVisual, setIsHoveringVisual] = useState<boolean>(false);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const scanDirectionRef = useRef<number>(1); // 1 = right, -1 = left

  // Hotspots State
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Protection Layer Overlay State
  const [showProtectionLayer, setShowProtectionLayer] = useState<boolean>(false);

  // Restrained Parallax State (Desktop only)
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Detect touch and reduced-motion capabilities
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      );

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      motionQuery.addEventListener("change", handleMotionChange);
      return () => motionQuery.removeEventListener("change", handleMotionChange);
    }
  }, []);

  // Smooth Auto-Scanning Loop
  useEffect(() => {
    if (!isAutoScanning || isScrubbing || isHoveringVisual || prefersReducedMotion) {
      return;
    }

    let lastTime = performance.now();
    const speed = 0.016; // speed factor for gentle ~7-8s cycle

    const loop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setScanPos((prev) => {
        let next = prev + scanDirectionRef.current * (speed * (delta || 16));
        if (next >= 92) {
          scanDirectionRef.current = -1;
          next = 92;
        } else if (next <= 8) {
          scanDirectionRef.current = 1;
          next = 8;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isAutoScanning, isScrubbing, isHoveringVisual, prefersReducedMotion]);

  // Pointer Parallax Handler (Restrained: max ~3-8px)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, relativeX));
      const clampedY = Math.max(-1, Math.min(1, relativeY));

      setParallax({ x: clampedX, y: clampedY });
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
    setIsHoveringVisual(false);
    setIsScrubbing(false);
  }, []);

  // Manual Scan Scrubbing on Vehicle Stage
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(5, Math.min(95, x));
    setScanPos(clamped);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    handleStagePointerMove(e);
  };

  const handlePointerUp = () => {
    setIsScrubbing(false);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] lg:min-h-[92vh] pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col justify-center overflow-hidden border-b border-white/[0.06] bg-[#07080c] select-none"
      aria-label="Outumn Motorsport Detailing Hero"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC STUDIO LIGHTING & ATMOSPHERIC ENVIRONMENT */}
      {/* ========================================================================= */}

      {/* Cleanroom Overhead Softbox Light Beam (Simulating ceiling studio luminaire) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-44 pointer-events-none opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 80%)",
          transform: `translate3d(${parallax.x * 2}px, ${parallax.y * 1}px, 0)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Studio Floor Ground Vignette (Seamless depth grounding the car) */}
      <div
        className="absolute bottom-0 inset-x-0 h-72 pointer-events-none opacity-85"
        style={{
          background:
            "linear-gradient(to top, #07080c 20%, rgba(7, 8, 12, 0.8) 60%, transparent 100%)",
        }}
      />

      {/* Atmospheric Ambient Drift Lights (Restrained, low opacity) */}
      {config.theme.enableAmbientGlow && !prefersReducedMotion && (
        <>
          <div
            className="glow-orb -top-24 left-10 w-[420px] h-[420px] opacity-10 animate-ambient-drift pointer-events-none"
            style={{
              background: "rgba(239, 68, 68, 0.25)",
              transform: `translate3d(${parallax.x * 3}px, ${parallax.y * 2}px, 0)`,
            }}
          />
          <div
            className="glow-orb top-1/3 -right-20 w-[460px] h-[460px] opacity-10 pointer-events-none"
            style={{
              background: "rgba(6, 182, 212, 0.2)",
              transform: `translate3d(${parallax.x * -2}px, ${parallax.y * -2}px, 0)`,
            }}
          />
        </>
      )}

      {/* Precision Technical Mesh Grid */}
      {config.theme.enableGridBackground && (
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN HERO CONTAINER */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ===================================================================== */}
          {/* LEFT COLUMN: EDITORIAL TYPOGRAPHY & BESPOKE VALUE */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Status Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-primary)]" />
              </span>
              <span className="text-[11px] uppercase font-bold tracking-[0.22em] text-zinc-200">
                BESPOKE MOTORSPORT DETAILING LAB
              </span>
              <span className="text-zinc-600 text-[10px]">•</span>
              <span className="text-[10px] font-mono tracking-wider text-cyan-400 font-medium">
                SUITE 01 ACTIVE
              </span>
            </div>

            {/* Editorial Luxury Headline */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl xl:text-[4.25rem] font-black uppercase tracking-tight text-white leading-[1.04] mb-6">
              <span className="block text-white drop-shadow-sm">
                PERFECTION
              </span>
              <span className="block text-thermal-gradient">
                RE-ENGINEERED
              </span>
              <span className="block text-xl xs:text-2xl sm:text-3xl xl:text-[2rem] font-bold text-zinc-300 tracking-tight mt-2.5">
                FOR PERFORMANCE & LUXURY
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-zinc-300/90 font-normal leading-relaxed max-w-xl mb-8">
              Precision paint correction, advanced surface protection, and bespoke detailing engineered for exceptional automobiles.
            </p>

            {/* Primary & Secondary CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto mb-10">
              {/* Primary CTA with Luxury Fluid Hover */}
              <button
                onClick={onOpenBooking}
                className="group relative px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.28)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.45)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span>Book Detailing</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              {/* Secondary CTA */}
              <a
                href="#calculator"
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-zinc-200 bg-white/[0.04] border border-white/12 hover:border-white/28 hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>Get Estimate</span>
              </a>

              {/* Optional Tertiary Text Link */}
              <a
                href="#services"
                className="px-4 py-2 font-medium text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-1.5 group"
              >
                <span>Explore The Process</span>
                <span className="text-zinc-600 group-hover:text-zinc-300 transition-colors">→</span>
              </a>
            </div>

            {/* Micro-Metrics (Qualitative, Verified Trust Pillars) */}
            <div className="w-full pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                    PAINT PRESERVATION
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug">
                    Precision Optical Compounding
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                    PREMIUM PROTECTION
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug">
                    Self-Healing Film & Ceramic Matrix
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                    CONTROLLED PROCESS
                  </div>
                  <div className="text-[11px] text-zinc-400 leading-snug">
                    Cleanroom Detailing Bays
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: CINEMATIC AUTOMOTIVE STAGE & SURFACE SCANNER */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            
            {/* Studio Floor Reflected Vignette & Ambient Radial Glow */}
            <div
              className="absolute -inset-4 sm:-inset-8 pointer-events-none rounded-[3rem] opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.08) 0%, rgba(6, 182, 212, 0.06) 45%, transparent 70%)",
                transform: `translate3d(${parallax.x * 5}px, ${parallax.y * 4}px, 0)`,
                transition: "transform 0.25s ease-out",
              }}
            />

            {/* The Integrated Automotive Studio Stage (No standard card border) */}
            <div
              ref={stageRef}
              onPointerDown={handlePointerDown}
              onPointerMove={(e) => {
                if (isScrubbing) handleStagePointerMove(e);
              }}
              onPointerUp={handlePointerUp}
              onMouseEnter={() => setIsHoveringVisual(true)}
              onMouseLeave={() => {
                setIsHoveringVisual(false);
                setIsScrubbing(false);
              }}
              className="relative w-full aspect-[16/10] sm:aspect-[16/10.2] rounded-2xl sm:rounded-3xl overflow-hidden cursor-crosshair group shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] border border-white/[0.08] bg-[#090b11]"
              style={{
                transform: `translate3d(${parallax.x * 4}px, ${parallax.y * 3}px, 0)`,
                transition: isScrubbing ? "none" : "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Layer 1: Untreated Surface (Before Scan - Softer reflection, slight haze) */}
              <div className="absolute inset-0 w-full h-full select-none">
                <img
                  src={config.heroSupercarImage}
                  alt="Porsche 911 GT3 in Outumn Studio Cleanroom - Baseline Finish"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[0.92] saturate-[0.85]"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Diffuse surface haze overlay */}
                <div className="absolute inset-0 bg-white/[0.025] backdrop-blur-[0.4px] pointer-events-none" />
              </div>

              {/* Layer 2: Lab-Restored Finish (After Scan - Deep optical clarity, 9H gloss, rich obsidian paint) */}
              <div
                className="absolute inset-0 w-full h-full select-none overflow-hidden transition-all duration-75"
                style={{
                  clipPath: `polygon(0 0, ${scanPos}% 0, ${scanPos}% 100%, 0 100%)`,
                }}
              >
                <img
                  src={config.heroSupercarImage}
                  alt="Porsche 911 GT3 in Outumn Studio Cleanroom - Concours Treated Finish"
                  className="w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.18] saturate-[1.12]"
                  loading="eager"
                />
                {/* Specular Wet-Look Gloss Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(6,182,212,0.08) 100%)",
                  }}
                />
              </div>

              {/* Dynamic Studio Specular Light Sweep (Moving inspection luminaire) */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                  <div
                    className="w-1/3 h-full animate-studio-sweep pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.18) 50%, transparent 100%)",
                    }}
                  />
                </div>
              )}

              {/* Optional Protection Layer Matrix Visualization */}
              {showProtectionLayer && (
                <div className="absolute inset-0 z-25 pointer-events-none transition-opacity duration-500 opacity-90">
                  {/* Subtle Nanocoat Polygonal Grid Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                        linear-gradient(to right, rgba(6, 182, 212, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
                      `,
                      backgroundSize: "28px 28px",
                    }}
                  />

                  {/* Surface Contour Wireframe Accent Lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M 50 200 Q 200 120 400 180 T 800 220"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 100 240 Q 300 160 550 210 T 900 260"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="6 6"
                      opacity="0.6"
                    />
                  </svg>

                  {/* Protection Layer Watermark */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-cyan-400/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-200">
                      PROTECTION LAYER VISUALIZATION • MOLECULAR BARRIER
                    </span>
                  </div>
                </div>
              )}

              {/* Signature Paint Scanner Beam */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none transition-all duration-75"
                style={{
                  left: `${scanPos}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Vertical Laser Beam Core */}
                <div
                  className="w-[2px] h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.95) 25%, #ffffff 50%, rgba(245, 158, 11, 0.95) 75%, rgba(239, 68, 68, 0) 100%)",
                    boxShadow: "0 0 16px rgba(6, 182, 212, 0.9), 0 0 32px rgba(6, 182, 212, 0.4)",
                  }}
                />

                {/* Laser Flare at Center */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -left-2 w-5 h-5 rounded-full pointer-events-none opacity-80"
                  style={{
                    background: "radial-gradient(circle, #ffffff 10%, rgba(6, 182, 212, 0.6) 50%, transparent 80%)",
                  }}
                />

                {/* Top Scanner Diamond Indicator */}
                <div className="absolute top-2 -translate-x-1/2 left-1/2 hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/85 border border-cyan-400/40 text-[9px] font-mono text-cyan-300 uppercase tracking-widest whitespace-nowrap shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>SURFACE SCAN</span>
                </div>
              </div>

              {/* Surface Hotspots (3 Precision Annotations) */}
              {HOTSPOTS.map((hotspot) => {
                const isActive = activeHotspot === hotspot.id;
                return (
                  <div
                    key={hotspot.id}
                    className="absolute z-35"
                    style={{
                      top: `${hotspot.y}%`,
                      left: `${hotspot.x}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Hotspot Target Button */}
                    <button
                      type="button"
                      aria-label={`${hotspot.title} - ${hotspot.category}`}
                      aria-expanded={isActive}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isActive ? null : hotspot.id);
                      }}
                      onMouseEnter={() => setActiveHotspot(hotspot.id)}
                      className="relative p-2 group/hotspot focus-visible:outline-none"
                    >
                      {/* Gentle Outer Pulse Ring */}
                      {!prefersReducedMotion && (
                        <span className="absolute inset-0 rounded-full hotspot-ring pointer-events-none" />
                      )}

                      {/* Precise Inner Dot */}
                      <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-black/80 border border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.7)] group-hover/hotspot:border-cyan-400 group-hover/hotspot:scale-110 transition-all duration-200">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover/hotspot:bg-white transition-colors" />
                      </span>
                    </button>

                    {/* Compact Frosted Glass Annotation Tooltip */}
                    {isActive && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-8 w-60 sm:w-64 p-3 rounded-xl bg-[#090b12]/95 border border-white/18 backdrop-blur-xl shadow-2xl z-40 text-left animate-in fade-in zoom-in-95 duration-200"
                        role="tooltip"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                            {hotspot.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveHotspot(null)}
                            className="text-zinc-400 hover:text-white p-0.5"
                            aria-label="Close annotation"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-xs font-bold text-white mb-1">
                          {hotspot.title}
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-snug mb-2 font-normal">
                          {hotspot.description}
                        </p>
                        <div className="text-[10px] font-mono text-zinc-400 border-t border-white/10 pt-1.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                          <span>{hotspot.spec}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Stage Control Bar: Auto-Scan Toggle & Protection Layer Button */}
              <div
                className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between px-3 py-2 rounded-xl bg-[#090b12]/80 border border-white/10 backdrop-blur-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left: Scan Comparison Indicator */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 hidden xs:inline">
                    SURFACE COMPARISON:
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <span className="text-zinc-500">RAW</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-cyan-400 font-bold">CONCOURS</span>
                  </div>
                </div>

                {/* Right: Interactive Controls */}
                <div className="flex items-center gap-2">
                  {/* View Protection Layer Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowProtectionLayer((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border ${
                      showProtectionLayer
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                        : "bg-white/[0.04] text-zinc-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Eye className="w-3 h-3 text-cyan-400" />
                    <span className="hidden sm:inline">View</span> Protection Layer
                  </button>

                  {/* Auto-Scan Pause/Play Button */}
                  <button
                    type="button"
                    onClick={() => setIsAutoScanning((prev) => !prev)}
                    className="p-1 rounded-lg bg-white/[0.04] text-zinc-300 border border-white/10 hover:border-white/25 transition-colors"
                    aria-label={isAutoScanning ? "Pause auto-scan" : "Start auto-scan"}
                    title={isAutoScanning ? "Pause auto-scan" : "Start auto-scan"}
                  >
                    {isAutoScanning ? (
                      <Pause className="w-3 h-3 text-zinc-300" />
                    ) : (
                      <Play className="w-3 h-3 text-cyan-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Edge Fade Gradients (Integrating car smoothly into dark canvas) */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-white/10 shadow-inner" />
            </div>

            {/* Floating Technical Badge Below Stage (Desktop only) */}
            <div
              className="absolute -bottom-4 right-6 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#090b12]/90 border border-white/10 shadow-xl backdrop-blur-md text-left z-35"
              style={{
                transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 5}px, 0)`,
              }}
            >
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  Surface Analysis
                </div>
                <div className="text-xs font-bold text-white">
                  99.4% Optical Purity
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Live Stats Counter Strip */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {config.stats.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/[0.07] hover:border-[var(--accent-primary)]/40 transition-all duration-300 group"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-mono group-hover:text-[var(--accent-primary)] transition-colors">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-xs sm:text-sm font-bold text-[var(--accent-primary)] font-mono">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="text-[11px] sm:text-xs uppercase font-extrabold tracking-wider text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Down Scroll Anchor */}
        <div className="flex justify-center mt-10">
          <a
            href="#services"
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/20 animate-pulse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Scroll to services"
          >
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
