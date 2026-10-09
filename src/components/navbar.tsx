"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteConfig } from "@/context/site-context";
import { BrandLogo } from "@/components/brand-logo";
import {
  Menu,
  X,
  Shield,
  ChevronDown,
  ChevronRight,
  Phone,
  Layers,
  Glasses,
  Calculator,
  ArrowRight,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Standard primary navigation items per specifications
  const primaryNav = [
    { id: "home", label: "Home", href: "#hero" },
    { id: "services", label: "Services", href: "#services", hasDropdown: true },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "about", label: "About", href: "/about" },
    { id: "reviews", label: "Reviews", href: "#reviews" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-[#1A1B1B]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.7)]"
            : "py-2.5 sm:py-3 bg-gradient-to-b from-[#1A1B1B]/95 via-[#1A1B1B]/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 sm:h-11">
            {/* Luxury Brand Logo */}
            <BrandLogo size="md" />

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] px-3 py-1 rounded-full backdrop-blur-md shadow-sm"
              aria-label="Main Navigation"
            >
              {primaryNav.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <a
                        href={getHref(item.href)}
                        className="px-3 py-1 text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.06] flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                        onClick={() => {
                          setServicesDropdownOpen(false);
                        }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
                            servicesDropdownOpen ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </a>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 w-64 rounded-2xl bg-[#252525]/98 backdrop-blur-xl border border-white/10 p-2 shadow-2xl z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                          <a
                            href={getHref("#services")}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group flex items-start gap-2.5 text-left"
                          >
                            <Shield className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[var(--accent-primary)] transition-colors">
                                All Detailing Services
                              </div>
                              <div className="text-[11px] text-zinc-400 font-normal">
                                PPF, ceramic, correction & interior
                              </div>
                            </div>
                          </a>

                          <a
                            href={getHref("#paint-lab")}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group flex items-start gap-2.5 text-left"
                          >
                            <Layers className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[var(--accent-primary)] transition-colors">
                                Paint Lab & Restoration
                              </div>
                              <div className="text-[11px] text-zinc-400 font-normal">
                                Optical before & after comparison
                              </div>
                            </div>
                          </a>

                          <a
                            href={getHref("#ar-studio")}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group flex items-start gap-2.5 text-left"
                          >
                            <Glasses className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[var(--accent-primary)] transition-colors">
                                AR / VR Experience
                              </div>
                              <div className="text-[11px] text-zinc-400 font-normal">
                                360° vehicle visualizer
                              </div>
                            </div>
                          </a>

                          <div className="pt-1.5 border-t border-white/[0.06]">
                            <a
                              href={getHref("#calculator")}
                              onClick={() => setServicesDropdownOpen(false)}
                              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-200"
                            >
                              <span className="flex items-center gap-1.5">
                                <Calculator className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                                <span>Get Estimate</span>
                              </span>
                              <ChevronRight className="w-3 h-3 text-zinc-400" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={getHref(item.href)}
                    className="px-3 py-1 text-xs uppercase tracking-wider font-semibold text-zinc-300 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/[0.06] relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
                  >
                    {item.label}
                    <span className="absolute bottom-1 left-3 right-3 h-[1.5px] bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Clean & Standardized CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Secondary CTA: Get Estimate */}
              <a
                href={getHref("#calculator")}
                className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Get Estimate
              </a>

              {/* Primary CTA: Book Detailing */}
              <button
                onClick={onOpenBooking}
                className="relative group overflow-hidden px-4 py-2 rounded-xl font-semibold text-xs tracking-wider uppercase text-black transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Book Detailing</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile Menu Trigger & Quick Book */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="px-3 py-1.5 rounded-lg font-bold text-[11px] tracking-wider uppercase text-black transition-all active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                Book
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Intentionally Designed Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
          className="fixed inset-0 z-40 bg-[#1A1B1B]/98 backdrop-blur-2xl sm:hidden pt-20 px-6 pb-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-2">
              Studio Navigation
            </span>

            {primaryNav.map((item) => (
              <a
                key={item.id}
                href={getHref(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-white/[0.06] text-base font-semibold text-zinc-200 hover:text-white active:text-[var(--accent-primary)] transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </a>
            ))}

            {/* Supporting Lab Experiences subsection */}
            <div className="mt-4 pt-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block mb-2">
                Specialized Labs
              </span>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getHref("#paint-lab")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  <Layers className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Paint Lab</span>
                </a>

                <a
                  href={getHref("#ar-studio")}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  <Glasses className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>AR/VR Studio</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Footer CTAs */}
          <div className="flex flex-col gap-3 pt-6 border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl font-semibold uppercase tracking-wider text-black text-xs flex items-center justify-center gap-2 shadow-md active:scale-95"
              style={{ background: "var(--accent-gradient)" }}
            >
              <span>Book Detailing</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={getHref("#calculator")}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-zinc-200 bg-white/[0.04] border border-white/10 text-xs flex items-center justify-center gap-2"
            >
              <Calculator className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Get Estimate</span>
            </a>

            <a
              href={`tel:${config.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#5EE07C]" />
              <span>{config.phone}</span>
            </a>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase text-zinc-500 hover:text-[#5EE07C] pt-2 border-t border-white/[0.06]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
