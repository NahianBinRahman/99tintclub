"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { useSiteConfig } from "@/context/site-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { config } = useSiteConfig();
  const [isInDarkSection, setIsInDarkSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsInDarkSection(heroBottom <= 60);
      } else {
        setIsInDarkSection(window.scrollY > window.innerHeight * 0.7);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 250);
  };

  const brand = {
    name: config?.brandName || navigationData.brand.name,
    tagline: config?.tagline || navigationData.brand.tagline,
    shortName: config?.shortName || navigationData.brand.shortName,
  };
  const menuItems = (config?.navItems || navigationData.menuItems).filter(
    (item) => item.id !== "contact" && item.label?.toUpperCase() !== "CONTACT"
  );
  const ctaButton = config?.ctaButton || navigationData.ctaButton;
  const servicesItem = menuItems.find((item) => item.children);



  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMobile = false
  ) => {
    if (closeMobile) {
      setMobileOpen(false);
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (targetId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Update URL hash without breaking back button or failing on same hash
      window.history.pushState(null, "", href);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-5 sm:top-6 right-6 sm:right-10 lg:right-14 z-50 pointer-events-auto bg-transparent select-none"
    >
      <div className="flex flex-col items-end relative">
        {/* Transparent Fixed Navigation Links (No pill, no box, no blur background) */}
        <nav
          aria-label="Main Navigation"
          className="flex items-center gap-6 lg:gap-9 text-[11px] lg:text-xs font-semibold uppercase tracking-widest bg-transparent"
        >
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 bg-transparent">
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <div
                    key={item.id}
                    className="relative py-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setServicesDropdownOpen(!servicesDropdownOpen)
                      }
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer outline-none bg-transparent ${
                        isInDarkSection
                          ? "text-white/90 hover:text-white"
                          : "text-black/85 hover:text-black"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180" : ""
                        } ${
                          isInDarkSection ? "text-white/60" : "text-black/60"
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`transition-colors cursor-pointer bg-transparent ${
                    isInDarkSection
                      ? "text-white/85 hover:text-[#FF1A1A]"
                      : "text-black/85 hover:text-[#FF1A1A]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Subtle Divider */}
            <span
              className={`w-[1px] h-3.5 transition-colors ${
                isInDarkSection ? "bg-white/25" : "bg-black/20"
              }`}
            />

            {/* Red Accent Get In Touch */}
            {ctaButton && (
              <Link
                href={ctaButton.href}
                onClick={(e) => handleNavClick(e, ctaButton.href)}
                className="text-[#FF1A1A] hover:text-white transition-colors cursor-pointer font-bold tracking-wider"
              >
                {ctaButton.label}
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger (Completely Transparent) */}
          <div className="md:hidden flex items-center bg-transparent">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                aria-label="Toggle Navigation Menu"
                className={`p-1.5 transition-colors cursor-pointer outline-none bg-transparent ${
                  isInDarkSection ? "text-white" : "text-black"
                }`}
              >
                <Menu className="w-5 h-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] max-w-sm bg-zinc-950/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between text-white"
              >
                <SheetHeader className="text-left border-b border-white/10 pb-4">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="font-anton text-2xl text-white tracking-wider">
                      {brand.name}
                    </SheetTitle>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-1.5 rounded-full bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans mt-1">
                    {brand.tagline}
                  </p>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6 space-y-3">
                  {menuItems.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.id} className="space-y-2">
                          <button
                            onClick={() =>
                              setMobileServicesOpen(!mobileServicesOpen)
                            }
                            className="w-full flex items-center justify-between py-2 text-base font-anton uppercase tracking-wider text-white cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                mobileServicesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-3 space-y-2 border-l border-[#FF1A1A]/40"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={child.href}
                                    onClick={(e) =>
                                      handleNavClick(e, child.href, true)
                                    }
                                    className="flex items-center gap-2.5 py-1.5 text-xs text-zinc-300 hover:text-[#FF1A1A] transition-colors"
                                  >
                                    <span className="font-semibold uppercase tracking-wide">
                                      {child.title}
                                    </span>
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, true)}
                        className="block py-2 text-base font-anton uppercase tracking-wider text-white hover:text-[#FF1A1A] transition-colors"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Drawer Bottom Action */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  <Link
                    href={ctaButton.href}
                    onClick={(e) => handleNavClick(e, ctaButton.href, true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF1A1A] text-white font-anton text-base uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <span>{ctaButton.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {/* Dropdown Menu Sub-Strip for Services (Compact & Non-Obtrusive) */}
        <AnimatePresence>
          {servicesDropdownOpen && servicesItem?.children && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="hidden md:flex items-center pt-2 pointer-events-auto"
            >
              <div
                className={`flex items-center gap-4 sm:gap-6 px-4 py-1.5 rounded-full backdrop-blur-xl whitespace-nowrap shadow-lg transition-all ${
                  isInDarkSection
                    ? "bg-black/85 border border-white/15 text-zinc-300"
                    : "bg-white/95 border border-black/10 text-black/85"
                }`}
              >
                {servicesItem.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={(e) => {
                      setServicesDropdownOpen(false);
                      handleNavClick(e, child.href);
                    }}
                    className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors group cursor-pointer ${
                      isInDarkSection
                        ? "text-zinc-300 hover:text-white"
                        : "text-black/80 hover:text-[#FF1A1A]"
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#FF1A1A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{child.title}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
