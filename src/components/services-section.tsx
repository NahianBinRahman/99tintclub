"use client";

import React, { useState } from "react";
import { useSiteConfig } from "@/context/site-context";
import { ServiceItem } from "@/types";
import {
  Check,
  Clock,
  Sparkles,
  ArrowUpRight,
  Shield,
  Layers,
  ChevronRight,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { config } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Ceramic Coating",
    "PPF Protection Film",
    "Paint Correction",
    "Interior Detailing",
    "Window Tint",
    "Full Concierge Package",
  ];

  const filteredServices =
    activeCategory === "All"
      ? config.services
      : config.services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#07080c]">
      {/* Glow Ambient background */}
      <div
        className="glow-orb top-1/2 left-0 w-[500px] h-[500px] opacity-10"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>BESPOKE SURFACE PROTECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              STUDIO SERVICES & <span className="shimmer-text">PACKAGES</span>
            </h2>
          </div>

          <p className="text-zinc-300 text-sm max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Precision detailing and film installation engineered for high-performance supercars, grand
            tourers, and treasured collector automobiles.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                activeCategory === cat
                  ? "bg-white text-black border-white shadow-[0_2px_10px_rgba(255,255,255,0.25)] font-bold"
                  : "bg-white/[0.03] text-zinc-300 border-white/[0.08] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid with uniform heights & alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl overflow-hidden glass-panel border transition-all duration-250 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] ${
                service.popular
                  ? "border-[var(--accent-primary)]/40 hover:border-[var(--accent-primary)]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {/* Top Banner Tag */}
              {service.badge && (
                <div
                  className="absolute top-3.5 right-3.5 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black shadow-md"
                  style={{ background: "var(--accent-gradient)" }}
                >
                  {service.badge}
                </div>
              )}

              <div className="flex-1 flex flex-col">
                {/* Image Container with overlay */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-black/60 flex-shrink-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-[#0e111a]/40 to-transparent" />

                  {/* Duration Tag */}
                  <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-xs font-mono text-zinc-200">
                    <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-[var(--accent-primary)] mb-1">
                      {service.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase text-white group-hover:text-[var(--accent-primary)] transition-colors leading-tight mb-1">
                      {service.title}
                    </h3>
                    <div className="text-xs text-zinc-300 font-medium mb-3">
                      {service.subtitle}
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.08]">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <div className="w-4 h-4 rounded-full bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Action */}
              <div className="p-6 pt-0 mt-auto">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-zinc-400 block">Starting at</span>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">{service.price}</span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-xl font-semibold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 transition-all duration-200 hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    <span>Reserve</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary CTA: Get Estimate */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Require a Tailored Specification?
              </h3>
              <p className="text-xs text-zinc-300 font-normal">
                Use our real-time specification calculator to customize protection modules and calculate estimated investment.
              </p>
            </div>
          </div>
          <a
            href="#calculator"
            className="px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-zinc-200 bg-white/[0.05] border border-white/15 hover:border-white/30 hover:text-white transition-all flex items-center gap-2 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <span>Get Estimate</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
