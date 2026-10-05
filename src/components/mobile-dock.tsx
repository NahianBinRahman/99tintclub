"use client";

import React, { useState, useEffect } from "react";
import { Phone, Calculator, ArrowRight, Shield, Sparkles, Activity } from "lucide-react";
import { useSiteConfig } from "@/context/site-context";

interface MobileDockProps {
  onOpenBooking: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolled past initial hero (>100px)
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Mobile concierge quick actions"
      className="fixed bottom-3.5 left-3 right-3 z-40 lg:hidden max-w-sm mx-auto animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto"
    >
      <div className="rounded-2xl glass-panel bg-[#090c16]/95 backdrop-blur-2xl border border-white/20 p-2.5 shadow-[0_16px_45px_rgba(0,0,0,0.95)] flex flex-col gap-2 relative overflow-hidden">
        {/* Top Mini Telemetry Marquee */}
        <div className="flex items-center justify-between px-1 text-[9.5px] font-mono tracking-wider text-zinc-400 border-b border-white/[0.06] pb-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold uppercase">Bays Active</span>
          </div>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 uppercase truncate">Beverly Hills Cleanroom</span>
          <span className="text-zinc-500">•</span>
          <span className="text-[var(--accent-primary)] font-bold">5.0 ★</span>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Direct Phone Concierge */}
          <a
            href={`tel:${config.phone}`}
            className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex-shrink-0"
            aria-label={`Call concierge at ${config.phone}`}
            title="Call Concierge"
          >
            <Phone className="w-4 h-4 text-[var(--accent-primary)]" />
          </a>

          {/* Quick Real-Time Calculator Anchor */}
          <a
            href="#calculator"
            className="px-3 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white active:scale-95 transition-all flex-shrink-0"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Estimate</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onOpenBooking}
            className="flex-1 h-10 px-4 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(239,68,68,0.35)] active:scale-95 transition-all relative overflow-hidden group"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Book Detailing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </aside>
  );
};
