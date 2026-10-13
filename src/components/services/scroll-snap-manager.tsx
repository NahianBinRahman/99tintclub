"use client";

import { useEffect, useRef } from "react";

// The complete, ordered sequence of cinematic snap sections across the entire website
const SECTION_SEQUENCE = [
  "hero",
  "services-intro",
  "service-window-tint",
  "service-ceramic-coating",
  "service-paint-correction",
  "service-complete-detail",
  "service-engine-detailing",
  "service-paint-protection-film",
  "services-consultation",
  "projects-intro",
  "project-01",
  "project-02",
  "project-03",
  "projects-cta",
  "about",
  "about-metrics",
  "testimonials",
  "contact",
];

export function ScrollSnapManager() {
  const isAnimatingRef = useRef(false);
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only enhance single-scroll section transitions on desktop (>= 768px)
    const isDesktop = () => window.innerWidth >= 768;

    const getOrderedSections = (): HTMLElement[] => {
      const elements: HTMLElement[] = [];
      for (const id of SECTION_SEQUENCE) {
        const el = document.getElementById(id);
        if (el) elements.push(el);
      }
      return elements;
    };

    const scrollToSection = (targetElement: HTMLElement) => {
      isAnimatingRef.current = true;
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      // Lock input for 800ms during the smooth transition
      animTimeoutRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 800);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;

      // Crucial: ALWAYS prevent wheel events while animating to prevent
      // browser gesture inertia from aborting or stranding smooth scrolling midway
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      // Filter out tiny trackpad jitter / idle micro-movements
      if (Math.abs(delta) < 16) return;

      const sections = getOrderedSections();
      if (sections.length === 0) return;

      // Find which section in the sequence is currently closest to the top of the viewport
      let currentIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = index;
        }
      });

      const direction = delta > 0 ? 1 : -1;
      const targetIndex = currentIndex + direction;

      // Out of bounds check
      if (targetIndex < 0 || targetIndex >= sections.length) {
        return;
      }

      e.preventDefault();
      scrollToSection(sections[targetIndex]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDesktop()) return;

      const downKeys = ["ArrowDown", "PageDown"];
      const upKeys = ["ArrowUp", "PageUp"];

      if (!downKeys.includes(e.key) && !upKeys.includes(e.key)) return;

      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const sections = getOrderedSections();
      if (sections.length === 0) return;

      let currentIndex = 0;
      let minDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          currentIndex = index;
        }
      });

      const direction = downKeys.includes(e.key) ? 1 : -1;
      const targetIndex = currentIndex + direction;

      if (targetIndex < 0 || targetIndex >= sections.length) return;

      e.preventDefault();
      scrollToSection(sections[targetIndex]);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    };
  }, []);

  return null;
}
