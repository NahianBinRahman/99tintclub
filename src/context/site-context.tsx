"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SiteConfig,
  ThemeConfig,
  NavItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  BookingRecord,
  AccentColorTheme,
} from "@/types";
import { navigationData } from "@/data/navigation";
import { services as defaultServices } from "@/data/services";
import { projects as defaultProjects } from "@/data/projects";
import { testimonialsData as defaultTestimonials } from "@/data/testimonials";
import { contactData } from "@/data/contact";
import { heroData } from "@/data/hero";

const STORAGE_KEY = "99tintclub_admin_config_v2";

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-9901",
    name: "Dr. Aswini Krishna",
    phone: "+1 (800) 998-4682",
    vehicle: "Porsche 911 GT3 RS",
    service: "Full Body Self-Healing PPF & 9H Ceramic Shield",
    status: "In Bay",
    createdAt: "Oct 12, 10:30 AM",
  },
  {
    id: "BK-9902",
    name: "Marcus Vandenberg",
    phone: "+1 (310) 555-0192",
    vehicle: "McLaren 720S Performance",
    service: "Multi-Stage Paint Correction & Nano-Ceramic Tint",
    status: "Confirmed",
    createdAt: "Oct 13, 02:15 PM",
  },
  {
    id: "BK-9903",
    name: "Farhan Al-Rashid",
    phone: "+1 (415) 777-3829",
    vehicle: "BMW M8 Competition Gran Coupe",
    service: "Stealth Satin Matte PPF Conversion",
    status: "Pending Review",
    createdAt: "Oct 14, 09:45 AM",
  },
];

export const initialSiteConfig: SiteConfig = {
  brandName: navigationData.brand.name,
  shortName: navigationData.brand.shortName,
  prefix: navigationData.brand.prefix,
  accent: navigationData.brand.accent,
  suffix: navigationData.brand.suffix,
  tagline: navigationData.brand.tagline,
  phone: contactData.phone,
  phoneFormatted: contactData.phoneFormatted,
  whatsapp: contactData.whatsapp,
  email: contactData.email,
  address: contactData.address,
  city: contactData.city,
  workingHours: "MON–FRI: 08:00 – 19:00 • SAT: 09:00 – 17:00",
  emergencyHotline: "+1 (800) 998-4682",
  // Hero Section
  heroBadge: "SHINERY DETAIL STUDIO",
  heroTitleLine1: "$99 TINT",
  heroTitleHighlight: "CLUB",
  heroTitleLine2: "WE MAKE YOUR CAR SHINE DIFFERENT",
  heroDescription:
    "premium care, hand-done in every detail by our team at stonery studio.",
  heroButtonLabel: "BOOK NOW",
  heroButtonHref: "#contact",
  heroSubtitle: "WE MAKE YOUR CAR SHINE DIFFERENT",
  heroCtaText: "BOOK NOW",
  hours: "MON–FRI: 08:00 – 19:00 • SAT: 09:00 – 17:00",
  // Nav items & CTA
  navItems: navigationData.menuItems,
  ctaButton: navigationData.ctaButton,
  // Services
  services: defaultServices,
  // Projects
  projects: defaultProjects,
  // Testimonials
  testimonials: defaultTestimonials.reviews,
  // Theme
  theme: {
    accent: "red",
    customAccentColor: "#FF1A1A",
    customBackgroundColor: "#050505",
    customCardColor: "#0c0c0c",
    fontSize: "normal",
    fontFamily: "system",
    sections: {
      hero: true,
      services: true,
      projects: true,
      about: true,
      testimonials: true,
      contact: true,
    },
  },
  // Bookings
  bookings: DEFAULT_BOOKINGS,
};

interface SiteContextType {
  config: SiteConfig;
  isLoaded: boolean;
  updateSiteConfig: (partial: Partial<SiteConfig>) => void;
  updateTheme: (partial: Partial<ThemeConfig>) => void;
  // Menus CRUD
  addMenuItem: (item: Omit<NavItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<NavItem>) => void;
  deleteMenuItem: (id: string) => void;
  // Services CRUD
  addService: (service: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  // Projects CRUD
  addProject: (project: Omit<ProjectItem, "id">) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Testimonials CRUD
  addTestimonial: (t: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, t: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  // Bookings CRUD
  addBooking: (b: Omit<BookingRecord, "id" | "createdAt" | "status">) => void;
  updateBookingStatus: (id: string, status: BookingRecord["status"]) => void;
  deleteBooking: (id: string) => void;
  // Backup & Reset
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const sanitizedNavItems = parsed.navItems
          ? (parsed.navItems as NavItem[]).filter(
              (item: NavItem) => item.id !== "contact" && item.label?.toUpperCase() !== "CONTACT"
            )
          : initialSiteConfig.navItems;

        setConfig({
          ...initialSiteConfig,
          ...parsed,
          navItems: sanitizedNavItems,
          theme: {
            ...initialSiteConfig.theme,
            ...(parsed.theme || {}),
            sections: {
              ...initialSiteConfig.theme.sections,
              ...((parsed.theme && parsed.theme.sections) || {}),
            },
          },
        });
      }

    } catch (e) {
      console.error("Failed to load saved configuration", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes & apply dynamic theme variables
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

      const root = document.documentElement;
      const primaryColor = config.theme.customAccentColor || "#FF1A1A";

      root.style.setProperty("--color-tint-red", primaryColor);
      root.style.setProperty("--primary", primaryColor);

      if (config.theme.customBackgroundColor) {
        root.style.setProperty("--background", config.theme.customBackgroundColor);
      }
      if (config.theme.customCardColor) {
        root.style.setProperty("--card", config.theme.customCardColor);
      }

      // Font Scale
      if (config.theme.fontSize === "compact") {
        root.style.fontSize = "14px";
      } else if (config.theme.fontSize === "spacious") {
        root.style.fontSize = "17px";
      } else {
        root.style.fontSize = "16px";
      }
    } catch (e) {
      console.error("Failed to persist site configuration", e);
    }
  }, [config, isLoaded]);

  const updateSiteConfig = (partial: Partial<SiteConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const updateTheme = (partial: Partial<ThemeConfig>) => {
    setConfig((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...partial },
    }));
  };

  // Menus CRUD
  const addMenuItem = (item: Omit<NavItem, "id">) => {
    const newItem: NavItem = {
      ...item,
      id: "nav-" + Date.now(),
    };
    setConfig((prev) => ({
      ...prev,
      navItems: [...prev.navItems, newItem],
    }));
  };

  const updateMenuItem = (id: string, updated: Partial<NavItem>) => {
    setConfig((prev) => ({
      ...prev,
      navItems: prev.navItems.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  };

  const deleteMenuItem = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      navItems: prev.navItems.filter((item) => item.id !== id),
    }));
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, "id">) => {
    const newService: ServiceItem = {
      ...service,
      id: String(prevServiceCount(config.services) + 1).padStart(2, "0"),
    };
    setConfig((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const prevServiceCount = (list: ServiceItem[]) => list.length;

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setConfig((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    }));
  };

  const deleteService = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  // Projects CRUD
  const addProject = (project: Omit<ProjectItem, "id">) => {
    const newProject: ProjectItem = {
      ...project,
      id: String(config.projects.length + 1).padStart(2, "0"),
    };
    setConfig((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setConfig((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updated } : p
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Testimonials CRUD
  const addTestimonial = (testimonial: Omit<TestimonialItem, "id">) => {
    const newT: TestimonialItem = {
      ...testimonial,
      id: "rev-" + Date.now(),
    };
    setConfig((prev) => ({
      ...prev,
      testimonials: [newT, ...prev.testimonials],
    }));
  };

  const updateTestimonial = (
    id: string,
    updated: Partial<TestimonialItem>
  ) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, ...updated } : t
      ),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  // Bookings CRUD
  const addBooking = (b: Omit<BookingRecord, "id" | "createdAt" | "status">) => {
    const newB: BookingRecord = {
      ...b,
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      status: "Pending Review",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setConfig((prev) => ({
      ...prev,
      bookings: [newB, ...prev.bookings],
    }));
  };

  const updateBookingStatus = (id: string, status: BookingRecord["status"]) => {
    setConfig((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    }));
  };

  const deleteBooking = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setConfig(initialSiteConfig);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const exportConfigJson = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.brandName && parsed.services && parsed.navItems) {
        setConfig(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SiteContext.Provider
      value={{
        config,
        isLoaded,
        updateSiteConfig,
        updateTheme,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteProvider");
  }
  return context;
};
