"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSiteConfig } from "@/context/site-context";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Gauge,
  Layers,
  ChevronDown,
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-24 sm:pt-28 pb-16 sm:pb-20 flex flex-col justify-center overflow-hidden border-b border-white/[0.06]"
    >
      {/* Background Tri-Color Motorsport Ambient Lights - Soft & Atmospheric */}
      {config.theme.enableAmbientGlow && (
        <>
          <div
            className="glow-orb top-16 left-10 w-[380px] h-[380px] opacity-15"
            style={{ background: "rgba(239, 68, 68, 0.25)" }}
          />
          <div
            className="glow-orb top-1/3 right-10 w-[420px] h-[420px] opacity-12"
            style={{ background: "rgba(245, 158, 11, 0.2)" }}
          />
          <div
            className="glow-orb -bottom-20 left-1/3 w-[460px] h-[460px] opacity-10"
            style={{ background: "rgba(6, 182, 212, 0.2)" }}
          />
        </>
      )}

      {config.theme.enableGridBackground && (
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Motorsport HUD Badge */}
        <div className="flex items-center justify-center lg:justify-start mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.22em] text-zinc-300">
              {config.heroBadge}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[10px] font-mono font-medium text-[var(--accent-primary)]">
              EST. 2018
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Futuristic Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-5">
              <span>{config.heroTitleLine1} </span>
              <span className="shimmer-text block sm:inline">
                {config.heroTitleHighlight}
              </span>
              <br className="hidden sm:inline" />
              <span className="text-zinc-400 font-bold text-2xl sm:text-3xl xl:text-4xl block mt-1.5">
                {config.heroTitleLine2}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7">
              {config.heroDescription}
            </p>

            {/* Standardized Button Cluster with Matching Heights */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_16px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_22px_rgba(239,68,68,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span>Book Detailing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#calculator"
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-zinc-200 bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <Gauge className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                <span>Get Estimate</span>
              </a>

              <a
                href="#paint-lab"
                className="w-full sm:w-auto px-4 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors duration-200 flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Before & After Lab</span>
              </a>
            </div>

            {/* Badges / Standards */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Warranty Protection
                  </div>
                  <div className="text-[11px] text-zinc-300">Manufacturer-Backed Coverage</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Concours Clarity
                  </div>
                  <div className="text-[11px] text-zinc-300">Specular Optical Clarity</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    Controlled Bays
                  </div>
                  <div className="text-[11px] text-zinc-300">Dust-Filtered Installation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Supercar Showcase */}
          <div className="lg:col-span-5 relative">
            <div
              onMouseMove={handleMouseMove}
              className="relative rounded-3xl overflow-hidden glass-panel p-3 border border-white/15 group shadow-2xl transition-all duration-300"
            >
              {/* Dynamic Specular Sheen Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 group-hover:opacity-75"
                style={{
                  background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, var(--accent-glow), transparent 70%)`,
                }}
              />

              {/* Main Supercar Showcase Image */}
              <div className="relative h-[320px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-black/60">
                <img
                  src={config.heroSupercarImage}
                  alt="Outumn Luxury Porsche Detailing"
                  loading="eager"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlaid Futuristic HUD Card Elements */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-black/70 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-200">
                    STATUS: COATED & CURED
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl bg-[#090b12]/85 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-wider text-white">
                      Porsche 911 GT3 RS
                    </div>
                    <div className="text-[11px] text-zinc-300 flex items-center gap-2">
                      <span>Full Self-Healing PPF</span>
                      <span>•</span>
                      <span className="text-[var(--accent-primary)] font-bold">Ceramic Shield</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className="text-[10px] uppercase font-mono text-zinc-400"
                    >
                      Finish Grade
                    </div>
                    <div className="text-sm font-black text-white font-mono flex items-center gap-1">
                      <span className="text-[var(--accent-primary)]">Concours</span>
                      <span className="text-[10px] text-zinc-400">Level</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Quick Feature Tag */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 flex items-center justify-center text-[var(--accent-primary)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="pr-2">
                <div className="text-xs font-bold text-white">Hydrophobic Matrix</div>
                <div className="text-[11px] text-zinc-300">Fast Water Beading & Shedding</div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Live Stats Counter Strip */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {config.stats.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel p-5 rounded-2xl border border-white/[0.07] hover:border-[var(--accent-primary)]/40 transition-all duration-300 group"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono group-hover:text-[var(--accent-primary)] transition-colors">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-sm sm:text-base font-bold text-[var(--accent-primary)] font-mono">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Down Scroll Anchor */}
      <div className="flex justify-center mt-12">
        <a
          href="#services"
          className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full border border-white/10 hover:border-white/20 animate-pulse"
          aria-label="Scroll to services"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
