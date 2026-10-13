"use client";

import React from "react";
import { about } from "@/data/about";
import { AboutPhilosophy } from "./about-philosophy";
import { AboutMetrics } from "./about-metrics";
import { AboutScrollSnapManager } from "./about-scroll-snap-manager";

export function AboutSection() {
  return (
    <section className="relative w-full bg-[#050505] text-white">
      {/* Desktop Single-Scroll Section Snapping for About Sections */}
      <AboutScrollSnapManager />

      {/* =========================================================================
          1. About Section 1: Studio Philosophy & Heritage (100% Screen Fit)
          ========================================================================= */}
      <AboutPhilosophy
        data={about}
        prevTargetId="projects-cta"
        nextTargetId="about-metrics"
      />

      {/* =========================================================================
          2. About Section 2: Verifiable Metrics & Vehicle Showcase Stage (100% Screen Fit)
          ========================================================================= */}
      <AboutMetrics
        data={about}
        prevTargetId="about"
        nextTargetId="testimonials"
      />
    </section>
  );
}
