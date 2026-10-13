"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/data/testimonials";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = testimonialsData.reviews;
  const currentReview = reviews[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;

  return (
    <article
      id="testimonials"
      data-snap-section="true"
      className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] text-white select-none"
    >
      {/* Ambient Luxury Background Warm & Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#EAB308]/6 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[320px] h-[220px] bg-[#FF1A1A]/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* =========================================================================
          Top Studio Metadata Header (Clearance below fixed navbar)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-14 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
          <span>// 99 TINT CLUB ARCHIVE — 05.REVIEWS</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-zinc-400 font-mono text-[9px]">
          <span className="flex items-center gap-1 text-[#EAB308]">
            <CheckCircle2 className="w-3 h-3" />
            <span>VERIFIED STUDIO CLIENTS</span>
          </span>
          <span>•</span>
          <span>OVERALL 5.0 ★ (280+ REVIEWS)</span>
        </div>
      </div>

      {/* =========================================================================
          Center Stage: Reference Styled Glassmorphic Reviews Showcase
          ========================================================================= */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8 flex-1 flex flex-col justify-center items-center z-10 my-auto">
        {/* Subtle Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#EAB308]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-ping" />
          <span>{testimonialsData.badge}</span>
        </div>

        {/* Outer Carousel Container with Peeking Side Cards */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Peeking Card (Directly inspired by reference screenshot) */}
          <div
            onClick={handlePrev}
            className="hidden lg:block absolute -left-10 xl:-left-16 w-60 h-[280px] rounded-[28px] bg-white/[0.02] border border-white/[0.07] backdrop-blur-md opacity-30 scale-90 -rotate-3 transition-all duration-500 cursor-pointer hover:opacity-55 overflow-hidden pointer-events-auto p-5"
          >
            <div className="flex items-center gap-1 text-[#EAB308] mb-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#EAB308]" />
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-4 font-light leading-relaxed">
              "{reviews[prevIndex].reviewText}"
            </p>
            <p className="mt-3 text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider">
              {reviews[prevIndex].name}
            </p>
          </div>

          {/* Center Main Glassmorphic Card (Directly inspired by reference screenshot) */}
          <div className="relative w-full max-w-[500px] sm:max-w-[530px] rounded-[28px] sm:rounded-[32px] bg-white/[0.035] border border-white/[0.14] backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] p-4 sm:p-5 md:p-6 flex flex-col justify-between transition-all duration-300">
            {/* Top Card Header: Client Feedback + 5 Gold Stars */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
                  Client
                </h3>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mt-0.5">
                  Feedback
                </h2>
                {/* 5 Big Gold Stars matching reference screenshot */}
                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-[#EAB308] fill-[#EAB308]"
                    />
                  ))}
                </div>
              </div>

              {/* Navigation arrows for switching review */}
              <div className="flex items-center gap-1 bg-black/50 border border-white/10 rounded-full p-1 backdrop-blur-md">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Inner Google-Style Verified Review Card (Matching reference card) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full bg-[#111111]/90 border border-white/[0.08] rounded-xl p-3 sm:p-4 shadow-inner"
              >
                {/* Reviewer Meta Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Initial Avatar Circle */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm font-sans shadow-md"
                      style={{ backgroundColor: currentReview.avatarColor }}
                    >
                      {currentReview.avatarInitial}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-white tracking-wide flex items-center gap-1.5">
                        <span>{currentReview.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 inline" />
                      </h4>
                      <p className="text-[9.5px] sm:text-[10px] text-zinc-400 font-mono">
                        {currentReview.reviewCount} reviews • {currentReview.timeAgo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <span className="text-[8.5px] font-mono bg-white/[0.06] px-1.5 py-0.5 rounded text-zinc-400">
                      GOOGLE
                    </span>
                    <MoreVertical className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Stars in Google Card */}
                <div className="flex items-center gap-1 mt-2 mb-1.5">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-[#EAB308] fill-[#EAB308]"
                    />
                  ))}
                  <span className="text-[9.5px] text-zinc-400 font-mono pl-1.5">
                    {currentReview.service}
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-[11px] sm:text-xs text-zinc-200 font-sans font-light leading-relaxed line-clamp-3">
                  "{currentReview.reviewText}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Studio Reply Pill (Matching bottom pill in reference screenshot) */}
            <motion.div
              key={`reply-${currentReview.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="mt-3 w-full rounded-full border border-white/[0.12] bg-white/[0.03] px-3.5 sm:px-4 py-2 text-center text-[10px] sm:text-[11px] text-zinc-300 italic font-light leading-tight shadow-sm"
            >
              "{currentReview.studioReply}"
            </motion.div>
          </div>

          {/* Right Peeking Card (Directly inspired by reference screenshot) */}
          <div
            onClick={handleNext}
            className="hidden lg:block absolute -right-10 xl:-right-16 w-60 h-[280px] rounded-[28px] bg-white/[0.02] border border-white/[0.07] backdrop-blur-md opacity-30 scale-90 rotate-3 transition-all duration-500 cursor-pointer hover:opacity-55 overflow-hidden pointer-events-auto p-5"
          >
            <div className="flex items-center gap-1 text-[#EAB308] mb-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#EAB308]" />
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-4 font-light leading-relaxed">
              "{reviews[nextIndex].reviewText}"
            </p>
            <p className="mt-3 text-[9.5px] font-mono text-zinc-500 uppercase tracking-wider">
              {reviews[nextIndex].name}
            </p>
          </div>
        </div>

        {/* Carousel Dots Stepper */}
        <div className="flex items-center justify-center gap-1.5 mt-2.5">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-6 bg-[#EAB308]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          Bottom Stepper Bar & Navigation
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-3 sm:pb-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xs sm:text-sm">
            0{currentIndex + 1}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 text-[11px]">0{reviews.length}</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
            — {currentReview.vehicle}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <span>CONTINUE TO STUDIO CONTACT</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#FF1A1A]" />
        </button>
      </div>
    </article>
  );
}
