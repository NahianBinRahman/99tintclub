"use client";

import { motion } from "framer-motion";
import { heroData, type HeroConfig } from "@/data/hero";
import { HeroVideo } from "./hero-video";
import { HeroBadge } from "./hero-badge";
import { HeroContent } from "./hero-content";

interface HeroProps {
  customData?: HeroConfig;
}

export function Hero({ customData }: HeroProps) {
  const data = customData || heroData;
  const leftBadge = data.badges.find((b) => b.position === "top-left");
  const rightBadge = data.badges.find((b) => b.position === "top-right");

  return (
    <section
      id="hero"
      data-snap-section="true"
      className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-white select-none"
    >
      {/* Background Video Component (Unobscured High-Key White Studio) */}
      <HeroVideo
        src={data.video.src}
        mobileSrc={data.video.mobileSrc}
        poster={data.video.poster}
      />

      {/* Left Badge: Visible on desktop to frame the studio car, hidden on mobile */}
      {leftBadge && (
        <div className="hidden md:block absolute top-[34%] left-[1.5%] lg:left-[2%] z-20 pointer-events-auto">
          <HeroBadge badge={leftBadge} />
        </div>
      )}

      {/* Right Badge: Visible on desktop to frame the studio car, hidden on mobile */}
      {rightBadge && (
        <div className="hidden md:block absolute top-[34%] right-[10%] lg:right-[12%] z-20 pointer-events-auto">
          <HeroBadge badge={rightBadge} />
        </div>
      )}

      {/* Headline & Studio Details: Comfortably elevated above the mobile dock */}
      <div className="absolute bottom-24 sm:bottom-28 md:bottom-8 lg:bottom-10 left-5 sm:left-8 lg:left-12 z-20 pointer-events-auto max-w-[88vw] md:max-w-none">
        <HeroContent data={data} />
      </div>

      {/* Desktop Bottom Center: Supporting Text + Red BOOK NOW Pill Button */}
      <div className="hidden md:flex absolute bottom-2 lg:bottom-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex-col items-center text-center space-y-1.5 max-w-[190px]">
        <p className="text-[8.5px] sm:text-[9.5px] text-black/80 font-sans font-medium leading-tight lowercase tracking-tight">
          {data.supportingSnippet || data.description}
        </p>

        <motion.a
          href={data.primaryButton.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center justify-center px-7 sm:px-8 py-2 sm:py-2.5 rounded-full bg-[#FF1A1A] hover:bg-[#e01414] text-white font-anton text-sm sm:text-base tracking-wider uppercase shadow-[0_6px_20px_rgba(255,26,26,0.4)] transition-all duration-300 cursor-pointer"
        >
          {data.primaryButton.label}
        </motion.a>
      </div>


    </section>
  );
}
