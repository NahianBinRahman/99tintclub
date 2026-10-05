"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SiteConfig,
  ThemeConfig,
  NavItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  AccentColorTheme,
} from "@/types";
import { initialSiteConfig } from "@/lib/default-data";

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
  // Utilities
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = "tintclub_joshieknocks_config_v1";

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const ACCENT_COLOR_MAP: Record<AccentColorTheme, { primary: string; glow: string; gradient: string }> = {
  "apex-combo": {
    primary: "#ef4444",
    glow: "rgba(239, 68, 68, 0.45)",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #06b6d4 100%)",
  },
  red: {
    primary: "#ef4444",
    glow: "rgba(239, 68, 68, 0.4)",
    gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)",
  },
  amber: {
    primary: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.4)",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
  },
  cyan: {
    primary: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.4)",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
  },
  violet: {
    primary: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.4)",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #5b21b6 100%)",
  },
  emerald: {
    primary: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
  },
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(initialSiteConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      }
    } catch (e) {
      console.error("Failed to load site config from storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes & apply CSS variables
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

      // Update dynamic CSS variables on document root
      const root = document.documentElement;
      const themeData = ACCENT_COLOR_MAP[config.theme.accent] || ACCENT_COLOR_MAP.amber;
      root.style.setProperty("--accent-primary", themeData.primary);
      root.style.setProperty("--accent-glow", themeData.glow);
      root.style.setProperty("--accent-gradient", themeData.gradient);

      // Font Scale
      if (config.theme.fontSize === "compact") {
        root.style.setProperty("--font-scale", "0.925rem");
      } else if (config.theme.fontSize === "spacious") {
        root.style.setProperty("--font-scale", "1.075rem");
      } else {
        root.style.setProperty("--font-scale", "1rem");
      }
    } catch (e) {
      console.error("Failed to persist site config", e);
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
      navItems: prev.navItems.map((item) => (item.id === id ? { ...item, ...updated } : item)),
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
      id: "srv-" + Date.now(),
    };
    setConfig((prev) => ({
      ...prev,
      services: [newService, ...prev.services],
    }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setConfig((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
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
      id: "proj-" + Date.now(),
    };
    setConfig((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setConfig((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
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
      id: "t-" + Date.now(),
    };
    setConfig((prev) => ({
      ...prev,
      testimonials: [newT, ...prev.testimonials],
    }));
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
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
