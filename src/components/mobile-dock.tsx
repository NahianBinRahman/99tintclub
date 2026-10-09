"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  X,
  Zap,
} from "lucide-react";
import { useSiteConfig } from "@/context/site-context";

interface MobileDockProps {
  onOpenBooking: () => void;
}

export const MobileDock: React.FC<MobileDockProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolled past initial hero (>80px)
      if (window.scrollY > 80 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 80) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <aside
      aria-label="Mobile concierge quick actions"
      className="fixed bottom-3 left-2.5 right-2.5 z-40 lg:hidden max-w-md mx-auto animate-in slide-in-from-bottom-6 duration-300 pointer-events-auto"
    >
      <div className="relative rounded-2xl glass-panel bg-[#1A1B1B]/95 backdrop-blur-2xl border border-[#5EE07C]/30 p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-2 overflow-hidden ring-1 ring-white/10">
        {/* Animated Accent Top Border Beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5EE07C] to-transparent opacity-80" />

        {/* Top Status & Telemetry Strip */}
        <div className="flex items-center justify-between px-1.5 text-[10px] font-mono tracking-wider text-zinc-300 border-b border-white/[0.08] pb-1.5">
          <div className="flex items-center gap-1.5 text-[#5EE07C] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EE07C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5EE07C]" />
            </span>
            <span className="uppercase text-[9px] font-bold tracking-widest">
              Tint Bays Open
            </span>
          </div>

          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400 text-[9.5px] uppercase truncate max-w-[150px]">
            Yucaipa & Inland Empire
          </span>
          <span className="text-zinc-500">•</span>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Close mobile dock"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Primary Action Controls Row */}
        <div className="flex items-center gap-2">
          {/* Quick Call Concierge Button */}
          <a
            href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
            className="w-11 h-11 rounded-xl bg-[#252525] border border-white/10 hover:border-[#5EE07C]/40 flex flex-col items-center justify-center text-zinc-200 active:scale-95 transition-all flex-shrink-0 shadow-md group"
            aria-label={`Call concierge at ${config.phone}`}
            title="Direct Phone Call"
          >
            <Phone className="w-4 h-4 text-[#5EE07C] group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono uppercase text-zinc-400 mt-0.5 font-bold">
              Call
            </span>
          </a>

          {/* Quick SMS / Text Quote Button */}
          <a
            href={`sms:${config.phone.replace(/[^0-9+]/g, "")}?body=Hi%2099%20Tint%20Club,%20I'd%20like%20a%20fast%20window%20tinting%20estimate`}
            className="w-11 h-11 rounded-xl bg-[#252525] border border-white/10 hover:border-[#5EE07C]/40 flex flex-col items-center justify-center text-zinc-200 active:scale-95 transition-all flex-shrink-0 shadow-md group"
            aria-label="Send SMS text for quick quote"
            title="Text Message Quote"
          >
            <MessageSquare className="w-4 h-4 text-[#5EE07C] group-hover:scale-110 transition-transform" />
            <span className="text-[8px] font-mono uppercase text-zinc-400 mt-0.5 font-bold">
              Text
            </span>
          </a>

          {/* Glowing Super CTA: Instant Quote & Booking */}
          <button
            onClick={onOpenBooking}
            className="flex-1 h-11 px-4 rounded-xl font-black uppercase tracking-wider text-xs text-black flex items-center justify-between shadow-[0_4px_20px_rgba(94,224,124,0.4)] active:scale-95 transition-all relative overflow-hidden group bg-gradient-to-r from-[#5EE07C] via-[#4ade80] to-[#5EE07C]"
          >
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />

            <div className="flex items-center gap-1.5 relative z-10">
              <Zap className="w-4 h-4 fill-black stroke-black" />
              <span className="font-extrabold tracking-wide text-[11px] sm:text-xs">
                GET INSTANT QUOTE
              </span>
            </div>

            <div className="w-6 h-6 rounded-lg bg-black/15 flex items-center justify-center relative z-10 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};
