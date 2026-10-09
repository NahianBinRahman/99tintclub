"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  asLink?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  showTagline = true,
  className = "",
  asLink = true,
}) => {
  const iconSizeClasses = {
    sm: "w-7.5 h-7.5",
    md: "w-8.5 h-8.5 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-11 sm:h-11",
  }[size];

  const dollarSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs sm:text-[13px]",
    lg: "text-sm",
  }[size];

  const numberSizeClasses = {
    sm: "text-sm",
    md: "text-base sm:text-lg",
    lg: "text-xl",
  }[size];

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm sm:text-[15px]",
    lg: "text-lg",
  }[size];

  const content = (
    <div className={`group flex items-center gap-2.5 select-none ${className}`}>
      {/* Bespoke Ceramic Tint Shield Crest */}
      <div
        className={`relative ${iconSizeClasses} rounded-xl bg-gradient-to-b from-[#252525] via-[#1A1B1B] to-black border border-white/20 flex items-center justify-center overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.7)] group-hover:border-[#5EE07C]/70 group-hover:shadow-[0_0_22px_rgba(94,224,124,0.35)] transition-all duration-300 flex-shrink-0`}
      >
        {/* Ambient Emerald Gradient Sheen */}
        <div
          className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(94, 224, 124, 0.4) 0%, rgba(52, 211, 153, 0.2) 60%, transparent 100%)",
          }}
        />

        {/* Diagonal Refractive Tint Film Blade (Glints across on hover) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-[180%] h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent rotate-[-35deg] -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        </div>

        {/* Custom Precision Ceramic Crest Vector */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Dark Nano-Ceramic Tint Glass Gradient */}
            <linearGradient id="tintGlass" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#252525" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#1A1B1B" stopOpacity="0.95" />
              <stop offset="1" stopColor="#0a0a0a" stopOpacity="1" />
            </linearGradient>

            {/* Specular Titanium & Emerald Edge Contour */}
            <linearGradient id="mintEdge" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.3" stopColor="#5EE07C" stopOpacity="0.95" />
              <stop offset="0.7" stopColor="#34d399" stopOpacity="0.85" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0.95" />
            </linearGradient>

            {/* Internal Refraction Glow */}
            <radialGradient id="apexGlow" cx="16" cy="14" r="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5EE07C" stopOpacity="0.6" />
              <stop offset="1" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Faceted Shield Body */}
          <path
            d="M 16 3 L 26 7 C 26 18 16 27.5 16 28 C 16 27.5 6 18 6 7 L 16 3 Z"
            fill="url(#tintGlass)"
            stroke="url(#mintEdge)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Inner Tint Chamber Facet */}
          <path
            d="M 16 6 L 23 9.2 C 23 16.5 16 23.5 16 24 C 16 23.5 9 16.5 9 9.2 L 16 6 Z"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Central Apex Glow */}
          <circle cx="16" cy="14" r="5" fill="url(#apexGlow)" />

          {/* Stylized Automotive Speed Apex Notch */}
          <path
            d="M 13 13 L 16 10 L 19 13 L 16 16 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <path
            d="M 16 17 L 16 21"
            stroke="#5EE07C"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>

        {/* Subtle Base Rim Highlight */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#5EE07C]/50 to-transparent" />
      </div>

      {/* Typography: $99 TINT CLUB */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5 leading-none">
          {/* $99 Metallic Badge Element */}
          <span className="inline-flex items-baseline tracking-tight">
            <span
              className={`${dollarSizeClasses} font-black text-[#5EE07C] font-mono tracking-tighter mr-0.5 select-none drop-shadow-[0_0_8px_rgba(94,224,124,0.4)]`}
            >
              $
            </span>
            <span
              className={`${numberSizeClasses} font-black tracking-tight text-white font-mono drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]`}
            >
              99
            </span>
          </span>

          {/* Precision Hairline Divider */}
          <span className="w-[1px] h-3.5 sm:h-4 bg-gradient-to-b from-transparent via-[#5EE07C]/60 to-transparent mx-0.5" />

          {/* TINT */}
          <span
            className={`${textSizeClasses} font-black tracking-[0.14em] uppercase text-white drop-shadow-sm`}
          >
            TINT
          </span>

          {/* CLUB with Luxury Mint Gradient */}
          <span
            className={`${textSizeClasses} font-black tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#5EE07C] via-emerald-300 to-white drop-shadow-[0_2px_8px_rgba(94,224,124,0.3)]`}
          >
            CLUB
          </span>

          {/* Live Studio Status Dot */}
          <span className="relative flex h-1.5 w-1.5 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5EE07C] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5EE07C] shadow-[0_0_8px_rgba(94,224,124,0.85)]" />
          </span>
        </div>

        {/* Micro-Engraved Sub-Tagline */}
        {showTagline && (
          <span className="text-[7.5px] sm:text-[8px] font-mono font-semibold tracking-[0.24em] uppercase text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5 hidden xs:block">
            Bespoke Ceramic Lab
          </span>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-flex items-center transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EE07C] rounded-lg"
        aria-label="$99 Tint Club Home"
      >
        {content}
      </Link>
    );
  }

  return content;
};
