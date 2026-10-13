"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { ServiceItem } from "@/data/services";
import { ServiceImage } from "./service-image";
import { ServiceContent } from "./service-content";
import { ServiceBackground } from "./service-background";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ServiceShowcaseProps {
  service: ServiceItem;
  index: number;
  totalCount: number;
  allServices: ServiceItem[];
  prevTargetId: string;
  nextTargetId: string;
}

export function ServiceShowcase({
  service,
  index,
  totalCount,
  allServices,
  prevTargetId,
  nextTargetId,
}: ServiceShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isEven = index % 2 === 0;

  // Track if this section is actively in the viewport (triggers photo auto-zoom & text movement animations)
  const isInView = useInView(containerRef, {
    amount: 0.45,
    once: false,
  });

  // Track the scroll position of this vertical section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Upward Exit & Downward Return Parallax
  // When scrolling DOWN to the next section (0.55 -> 0.95), content accelerates UPWARDS (-240px)!
  // When scrolling UP to the previous section (0.45 -> 0.05), content moves DOWNWARDS (+180px)!
  const contentY = useTransform(
    scrollYProgress,
    [0.05, 0.45, 0.55, 0.95],
    [180, 0, 0, -240]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.38, 0.62, 0.95],
    [0, 1, 1, 0]
  );

  // Watermark Parallax
  const watermarkY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -80]);
  const watermarkOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    [0, 0.045, 0.045, 0]
  );

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article
      id={`service-${service.slug}`}
      ref={containerRef}
      data-snap-service="true"
      data-snap-section="true"
      className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none"
    >
      {/* Dark Luxury Ambient Background with alternating glows */}
      <ServiceBackground glowPosition={isEven ? "left" : "right"} />

      {/* Top Studio Metadata Header */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
          <span>// 99 TINT CLUB ARCHIVE — 02.{service.id}</span>
        </div>
      </div>

      {/* Center Stage: Image and Content Grid with Accelerated Upward/Downward Parallax */}
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 z-10 my-auto">
        {/* Image Column */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className={`w-full flex items-center justify-center ${
            isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <ServiceImage
            src={service.image}
            alt={service.title}
            isEven={isEven}
            serviceId={service.id}
            isInView={isInView}
          />
        </motion.div>

        {/* Content Column */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className={`w-full flex items-center ${
            isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"
          }`}
        >
          <ServiceContent
            service={service}
            isEven={isEven}
            isInView={isInView}
            watermarkY={watermarkY}
            watermarkOpacity={watermarkOpacity}
          />
        </motion.div>
      </div>

      {/* Bottom Bar: Stepper & Navigation Controls for This Vertical Section */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
        {/* Service Progress Counter */}
        <div className="flex items-center gap-2.5">
          <span className="text-white font-bold text-sm">
            0{index + 1}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 text-xs">
            0{totalCount}
          </span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
            — {service.title}
          </span>
        </div>

        {/* Direct Dot Indicators to Jump between Services */}
        <div className="hidden md:flex items-center gap-2">
          {allServices.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToTarget(`service-${item.slug}`)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === index
                  ? "w-7 h-1.5 bg-[#FF1A1A]"
                  : "w-2 h-1.5 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Jump to ${item.title}`}
            />
          ))}
        </div>

        {/* Next / Previous Section Directional Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToTarget(prevTargetId)}
            className="p-2 rounded-full border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            aria-label="Previous Section"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToTarget(nextTargetId)}
            className="p-2 rounded-full border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            aria-label="Next Section"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
