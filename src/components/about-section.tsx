"use client";

import React from "react";
import { Shield, Sparkles, CheckCircle2, Award, Gauge, Clock, ChevronRight } from "lucide-react";
import { aboutData, businessMetrics } from "@/lib/business-data";

interface AboutSectionProps {
  onOpenBooking?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#07080c]">
      {/* Subtle ambient lighting */}
      <div
        className="glow-orb top-1/4 right-0 w-[450px] h-[450px] opacity-10"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="glow-orb bottom-10 left-10 w-[400px] h-[400px] opacity-05"
        style={{ background: "rgba(6, 182, 212, 0.2)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>{aboutData.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {aboutData.title}{" "}
              <span className="shimmer-text">{aboutData.titleHighlight}</span>
            </h2>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base max-w-lg mt-4 lg:mt-0 leading-relaxed font-normal">
            {aboutData.subtitle}
          </p>
        </div>

        {/* Story Grid: Main Narrative + Visual Metric Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-sm text-zinc-300 leading-relaxed font-normal">
            {aboutData.paragraphs.map((para, idx) => (
              <p key={idx} className="text-zinc-300">
                {para}
              </p>
            ))}

            <div className="pt-3 flex flex-wrap items-center gap-3">
              {onOpenBooking && (
                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-black flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all hover:opacity-95 active:scale-95"
                  style={{ background: "var(--accent-gradient)" }}
                >
                  <span>Book Detailing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <a
                href="#services"
                className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-zinc-200 bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Explore Services</span>
              </a>
            </div>
          </div>

          {/* Metric Highlights Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "var(--accent-gradient)" }}
              />

              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-400 mb-5 flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Verified Studio Standards</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mb-5">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-2xl font-black text-white font-mono">
                    {businessMetrics.vehiclesServiced}
                  </div>
                  <div className="text-xs font-bold text-zinc-300 uppercase mt-1">
                    {businessMetrics.vehiclesServicedLabel}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-normal">
                    {businessMetrics.vehiclesServicedNote}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-2xl font-black text-[var(--accent-primary)] font-mono">
                    {businessMetrics.warrantyTerm}
                  </div>
                  <div className="text-xs font-bold text-zinc-300 uppercase mt-1">
                    {businessMetrics.warrantyLabel}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-normal">
                    {businessMetrics.warrantyNote}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-2xl font-black text-white font-mono">
                    {businessMetrics.satisfactionRate}
                  </div>
                  <div className="text-xs font-bold text-zinc-300 uppercase mt-1">
                    {businessMetrics.satisfactionLabel}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-normal">
                    {businessMetrics.satisfactionNote}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-xl font-black text-white font-mono">
                    {businessMetrics.facilityType}
                  </div>
                  <div className="text-xs font-bold text-zinc-300 uppercase mt-1">
                    {businessMetrics.facilityLabel}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1 leading-normal">
                    {businessMetrics.facilityNote}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-zinc-400 border-t border-white/[0.06] pt-3.5 font-mono">
                * All business metrics subject to verification upon client intake and condition appraisal.
              </div>
            </div>
          </div>
        </div>

        {/* Studio Pillars (Quality Standards) */}
        <div className="mb-16">
          <div className="text-xs uppercase font-extrabold tracking-wider text-[var(--accent-primary)] mb-2">
            Core Principles
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-6">
            How We Protect Your Vehicle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutData.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-xl border border-white/[0.08] hover:border-white/20 transition-all duration-250 flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent-primary)] mb-3.5 font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
          <div className="text-xs uppercase font-extrabold tracking-wider text-[var(--accent-primary)] mb-2">
            Evolution
          </div>
          <h3 className="text-xl sm:text-2xl font-black uppercase text-white mb-6">
            Studio Milestones
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.milestones.map((m, idx) => (
              <div key={idx} className="relative pl-5 sm:pl-0 border-l sm:border-l-0 sm:border-t border-white/10 pt-4">
                <span className="text-xs font-mono font-bold text-[var(--accent-primary)] block mb-1">
                  {m.year}
                </span>
                <h4 className="text-sm font-bold text-white mb-1">{m.label}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
