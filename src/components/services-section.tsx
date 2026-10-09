"use client";

import React, { useState } from "react";
import { useSiteConfig } from "@/context/site-context";
import { ServiceItem } from "@/types";
import {
  Check,
  Clock,
  ArrowUpRight,
  Shield,
  Layers,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Sun,
  Home,
  Building2,
  Car,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { config } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Automotive",
    "Residential",
    "Commercial",
    "Ceramic",
    "Decorative",
    "Removal",
  ];

  const filteredServices =
    activeCategory === "All"
      ? config.services
      : config.services.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const handleGeneralInquiry = () => {
    if (config.services.length > 0) {
      onSelectService(config.services[0]);
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#1A1B1B]">
      {/* Glow Ambient background */}
      <div
        className="glow-orb top-1/3 left-0 w-[550px] h-[550px] opacity-10"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="glow-orb bottom-10 right-0 w-[500px] h-[500px] opacity-10"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================= */}
        {/* HERO SPOTLIGHT BANNER (From Screenshot 1) */}
        {/* ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] mb-16 sm:mb-20 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-end p-4 sm:p-8 lg:p-12">
          {/* Background Image: Luxury SUV in front of modern villa estate at twilight */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/window-tint-suv-estate.jpg"
              alt="Window Tinting in Yucaipa and Inland Empire"
              className="w-full h-full object-cover object-center"
            />
            {/* Elegant dark vignette & gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-transparent sm:block hidden" />
          </div>

          {/* Floating Hero Card (Screenshot 1 Design with Hero Colors) */}
          <div className="relative z-10 w-full max-w-xl bg-white/95 text-slate-900 rounded-3xl p-6 sm:p-8 sm:pr-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/5 text-[11px] font-mono uppercase tracking-widest text-slate-700 font-bold mb-3">
              <Sun className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Yucaipa & Inland Empire</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-none mb-3">
              Window Tinting
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
              Professional window tinting in Yucaipa and the Inland Empire. Reduce heat, glare,
              and UV exposure with premium window films for your vehicle, home, or business.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGeneralInquiry}
                className="px-6 py-3 rounded-2xl bg-[#252525] hover:bg-[#1A1B1B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Get in touch</span>
              </button>

              <button
                onClick={handleGeneralInquiry}
                className="w-11 h-11 rounded-2xl bg-[#252525] hover:bg-[#1A1B1B] text-[#5EE07C] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
                aria-label="Inquire about window tinting"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SERVICE INCLUDES HEADER (From Screenshot 2) */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 block mb-1">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              Service <span className="shimmer-text">Includes</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleGeneralInquiry}
              className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 transition-all duration-200 hover:opacity-95 active:scale-95 shadow-md"
              style={{ background: "var(--accent-gradient)" }}
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                activeCategory === cat
                  ? "bg-[#5EE07C] text-black border-[#5EE07C] shadow-[0_2px_12px_rgba(94,224,124,0.35)] font-bold"
                  : "bg-[#252525] text-zinc-300 border-white/[0.08] hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid - 6 Items (Screenshot 2 with NO Price Numbers) */}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-[#252525]/40 to-transparent" />

                  {/* Duration Tag */}
                  {service.duration && (
                    <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 border border-white/10 text-xs font-mono text-zinc-200">
                      <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>{service.duration}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase font-bold tracking-widest text-[var(--accent-primary)] mb-1">
                      {service.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold uppercase text-white group-hover:text-[var(--accent-primary)] transition-colors leading-tight mb-2">
                      {service.title}
                    </h3>
                    <div className="text-xs text-zinc-400 font-medium mb-3">
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

              {/* Card Footer: Action (ALL PRICES REMOVED) */}
              <div className="p-6 pt-0 mt-auto">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#5EE07C] font-semibold block">
                      Custom Specification
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Free Estimate
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-xl font-semibold text-xs uppercase tracking-wider text-black flex items-center gap-1.5 transition-all duration-200 hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    <span>Get in touch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Bottom CTA */}
        <div className="mt-12 p-6 sm:p-7 rounded-2xl glass-panel border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Require a Custom Window Film Consultation?
              </h3>
              <p className="text-xs text-zinc-300 font-normal">
                Serving Yucaipa, Redlands, and the greater Inland Empire with vehicle, residential, and commercial solar defense.
              </p>
            </div>
          </div>
          <button
            onClick={handleGeneralInquiry}
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black flex items-center gap-2 flex-shrink-0 transition-all hover:opacity-95 active:scale-95 shadow-md"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span>Get in touch</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
