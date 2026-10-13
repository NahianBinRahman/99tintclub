"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Sliders,
  Type,
  Menu,
  Sparkles,
  Layers,
  Car,
  Star,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Palette,
  Image as ImageIcon,
} from "lucide-react";
import { useSiteConfig } from "@/context/site-context";
import {
  NavItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  BookingRecord,
  AccentColorTheme,
} from "@/types";

const ADMIN_PASSCODE = "adminx11";

type ActiveTab =
  | "branding"
  | "theme"
  | "menus"
  | "services"
  | "projects"
  | "reviews"
  | "bookings";

export default function AdminPage() {
  const {
    config,
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
    updateBookingStatus,
    deleteBooking,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
  } = useSiteConfig();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_auth_99") === "true";
    }
    return false;
  });
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Dashboard Tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("branding");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit Modals / Form States
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingReview, setEditingReview] = useState<TestimonialItem | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const [editingMenuItem, setEditingMenuItem] = useState<NavItem | null>(null);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth_99", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth_99");
    setPasscode("");
  };

  const handleExport = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `99tintclub-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Configuration exported successfully!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importConfigJson(content)) {
        showToast("Backup imported successfully!");
      } else {
        alert("Invalid configuration file format.");
      }
    };
    reader.readAsText(file);
  };

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FF1A1A]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#FF1A1A]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-900/90 border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 flex items-center justify-center text-[#FF1A1A] mb-4 shadow-[0_0_25px_rgba(255,26,26,0.3)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#FF1A1A] uppercase font-bold">
              Secure Operations Access
            </span>
            <h1 className="font-anton text-3xl tracking-wider text-white mt-1 uppercase">
              Admin Studio
            </h1>
            <p className="text-zinc-400 text-xs mt-2">
              Enter master credentials to manage live website content, theme styling, typography, and bookings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="Enter passcode (adminx11)"
                  className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] focus:ring-1 focus:ring-[#FF1A1A] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute right-3.5 top-3.5" />
              </div>
              {authError && (
                <p className="text-[#FF1A1A] text-xs font-semibold mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect passcode. Try <code className="bg-white/10 px-1 py-0.5 rounded text-white">adminx11</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] active:scale-[0.99] text-white font-anton uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(255,26,26,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Console</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                &larr; Return to Live Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#FF1A1A] selection:text-white pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#FF1A1A] text-white px-5 py-3 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF1A1A]/10 border border-[#FF1A1A]/30 flex items-center justify-center text-[#FF1A1A]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-anton text-lg tracking-wider uppercase text-white">
                {config.brandName || "99 TINT CLUB"}
              </span>
              <span className="text-[10px] bg-[#FF1A1A]/20 text-[#FF1A1A] px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Live CRUD Management • Instant Synced State
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </Link>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Download JSON Config Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to reset all site data to original factory defaults?"
                )
              ) {
                resetToDefaults();
                showToast("Reset to factory defaults completed.");
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs text-red-300 hover:text-white transition-colors cursor-pointer"
            title="Reset site to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Factory</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-3 sticky top-20 backdrop-blur-xl">
            <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
              Management Modules
            </div>

            <nav className="space-y-1">
              {[
                { id: "branding", label: "Branding & Copy", icon: Type, count: null },
                { id: "theme", label: "Theme & Styling", icon: Palette, count: null },
                { id: "menus", label: "Navigation Menus", icon: Menu, count: config.navItems?.length },
                { id: "services", label: "Services Studio", icon: Layers, count: config.services?.length },
                { id: "projects", label: "Projects / Gallery", icon: Car, count: config.projects?.length },
                { id: "reviews", label: "Customer Reviews", icon: Star, count: config.testimonials?.length },
                { id: "bookings", label: "Bay Bookings", icon: Users, count: config.bookings?.length },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ActiveTab)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FF1A1A] text-white shadow-[0_0_15px_rgba(255,26,26,0.3)]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== null && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-zinc-400"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Metrics */}
            <div className="mt-6 pt-4 border-t border-white/10 px-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-2">
                Live Studio Snapshot
              </span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                  <div className="font-anton text-lg text-white">{config.services?.length}</div>
                  <div className="text-[9px] uppercase tracking-wider text-zinc-400">Services</div>
                </div>
                <div className="bg-black/40 border border-white/5 p-2 rounded-xl">
                  <div className="font-anton text-lg text-white">{config.projects?.length}</div>
                  <div className="text-[9px] uppercase tracking-wider text-zinc-400">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-zinc-900/40 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-xl">
          {/* TAB 1: BRANDING & GENERAL COPY */}
          {activeTab === "branding" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                    Branding & Global Copy
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage studio names, contact information, hours, and hero headlines.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Studio Full Brand Name
                  </label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Short Brand Name
                  </label>
                  <input
                    type="text"
                    value={config.shortName}
                    onChange={(e) => updateSiteConfig({ shortName: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Brand Tagline / Slogan
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF1A1A]" /> Phone Line
                  </label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF1A1A]" /> Concierge Email
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateSiteConfig({ email: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF1A1A]" /> Studio Address
                  </label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateSiteConfig({ address: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF1A1A]" /> Business Hours
                  </label>
                  <input
                    type="text"
                    value={config.workingHours || config.hours || ""}
                    onChange={(e) => updateSiteConfig({ workingHours: e.target.value, hours: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              {/* Hero Section Copy */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <h3 className="font-anton text-lg uppercase tracking-wider text-white">
                  Hero Section Text
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Hero Badge / Subtitle
                    </label>
                    <input
                      type="text"
                      value={config.heroSubtitle || config.heroBadge || ""}
                      onChange={(e) => updateSiteConfig({ heroSubtitle: e.target.value, heroBadge: e.target.value })}
                      placeholder="e.g. Elevating Automotive Aesthetics"
                      className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                      Hero Primary CTA Label
                    </label>
                    <input
                      type="text"
                      value={config.heroCtaText || config.heroButtonLabel || ""}
                      onChange={(e) => updateSiteConfig({ heroCtaText: e.target.value, heroButtonLabel: e.target.value })}
                      placeholder="e.g. Reserve Bay"
                      className="w-full bg-black/60 border border-white/15 focus:border-[#FF1A1A] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THEME & TYPOGRAPHY SCALE */}
          {activeTab === "theme" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                  Theme & Typography Scale
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Adjust color accents, font sizing scale, and surface background contrast.
                </p>
              </div>

              {/* Accent Color Palette */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Primary Accent Color Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Crimson Red", value: "#FF1A1A" },
                    { label: "Electric Cyan", value: "#00F0FF" },
                    { label: "Hyper Gold", value: "#FFB800" },
                    { label: "Emerald Bay", value: "#10B981" },
                    { label: "Violet Neon", value: "#A855F7" },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() =>
                        updateTheme({ primaryAccent: preset.value as AccentColorTheme })
                      }
                      className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                        config.theme.primaryAccent === preset.value
                          ? "border-white bg-white/10 shadow-lg"
                          : "border-white/10 bg-black/40 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: preset.value }}
                      />
                      <span className="text-xs font-semibold text-zinc-200">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Scale Adjuster */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Typography Sizing Scale ({config.theme.fontScale})
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Compact Scale", value: "compact", scale: "92%" },
                    { label: "Standard Scale", value: "normal", scale: "100%" },
                    { label: "Bold Large Scale", value: "large", scale: "108%" },
                  ].map((scaleOpt) => (
                    <button
                      key={scaleOpt.value}
                      type="button"
                      onClick={() =>
                        updateTheme({
                          fontScale: scaleOpt.value as "compact" | "normal" | "large",
                        })
                      }
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        config.theme.fontScale === scaleOpt.value
                          ? "border-[#FF1A1A] bg-[#FF1A1A]/10 text-white"
                          : "border-white/10 bg-black/40 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <div className="text-xs font-bold">{scaleOpt.label}</div>
                      <div className="text-[10px] text-zinc-400 mt-1">{scaleOpt.scale} font multiplier</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Dark Tone */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Dark Background Tone
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Obsidian Deep", value: "#050505" },
                    { label: "Pure Jet Black", value: "#000000" },
                    { label: "Midnight Carbon", value: "#0A0D14" },
                  ].map((bgOpt) => (
                    <button
                      key={bgOpt.value}
                      type="button"
                      onClick={() => updateTheme({ bgDark: bgOpt.value })}
                      className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                        config.theme.bgDark === bgOpt.value
                          ? "border-white bg-white/10"
                          : "border-white/10 bg-black/40 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-lg border border-white/20"
                        style={{ backgroundColor: bgOpt.value }}
                      />
                      <span className="text-xs font-semibold text-zinc-200">{bgOpt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MENUS CRUD */}
          {activeTab === "menus" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                    Navigation Menus CRUD
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Add, edit, or remove navbar and drawer navigation links.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const id = `nav-${Date.now()}`;
                    const newItem: NavItem = {
                      id,
                      label: "NEW LINK",
                      href: "#hero",
                      order: config.navItems.length + 1,
                    };
                    addMenuItem(newItem);
                    showToast("New menu link added.");
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] text-white font-anton uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Menu Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {config.navItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Label</span>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) =>
                            updateMenuItem(item.id, { label: e.target.value.toUpperCase() })
                          }
                          className="w-full bg-zinc-900 border border-white/10 focus:border-[#FF1A1A] rounded-lg px-3 py-1.5 text-xs text-white font-anton tracking-wider outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">Target Anchor / URL</span>
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => updateMenuItem(item.id, { href: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/10 focus:border-[#FF1A1A] rounded-lg px-3 py-1.5 text-xs text-zinc-300 font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => {
                          if (confirm(`Delete menu item "${item.label}"?`)) {
                            deleteMenuItem(item.id);
                            showToast("Menu item removed.");
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-800/30 transition-colors cursor-pointer"
                        title="Delete menu item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES CRUD */}
          {activeTab === "services" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                    Services CRUD Studio
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage service offerings, specifications, imagery, pricing, and warranty text.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = `service-${Date.now()}`;
                    const created: ServiceItem = {
                      id: newId,
                      slug: `service-${Date.now()}`,
                      label: "NEW SERVICE",
                      title: "NEW AUTOMOTIVE SERVICE",
                      subtitle: "Precision Studio Application",
                      description: "Enter detailed overview of the automotive service procedures, benefits, and quality guarantees.",
                      badge: "PREMIUM",
                      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
                      duration: "1 - 2 Days",
                      warranty: "10-Year Limited Warranty",
                      startingPrice: "$599",
                      button: "Explore Service",
                      order: config.services.length + 1,
                      visible: true,
                      category: "PROTECTION",
                      features: ["High Heat Rejection", "UV Block 99%", "Flawless Edge Fit"],
                      cta: { label: "RESERVE BAY", href: "#contact" },
                    };
                    addService(created);
                    setEditingService(created);
                    showToast("New service created.");
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] text-white font-anton uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Service Editor Drawer / Inline Modal */}
              {editingService && (
                <div className="bg-black/80 border-2 border-[#FF1A1A]/60 rounded-2xl p-5 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-anton text-lg uppercase tracking-wider text-white">
                      Editing Service: {editingService.title}
                    </span>
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) => {
                          const updated = { ...editingService, title: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-anton tracking-wider outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={editingService.category}
                        onChange={(e) => {
                          const updated = { ...editingService, category: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Image URL (Unsplash or direct asset)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingService.image}
                          onChange={(e) => {
                            const updated = { ...editingService, image: e.target.value };
                            setEditingService(updated);
                            updateService(editingService.id, updated);
                          }}
                          className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 font-mono outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Service Description
                      </label>
                      <textarea
                        rows={3}
                        value={editingService.description}
                        onChange={(e) => {
                          const updated = { ...editingService, description: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={editingService.startingPrice || ""}
                        onChange={(e) => {
                          const updated = { ...editingService, startingPrice: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Estimated Turnaround
                      </label>
                      <input
                        type="text"
                        value={editingService.duration || ""}
                        onChange={(e) => {
                          const updated = { ...editingService, duration: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Warranty Guarantee
                      </label>
                      <input
                        type="text"
                        value={editingService.warranty || ""}
                        onChange={(e) => {
                          const updated = { ...editingService, warranty: e.target.value };
                          setEditingService(updated);
                          updateService(editingService.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Service Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.services.map((srv) => (
                  <div
                    key={srv.id}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
                  >
                    <div className="flex gap-4">
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={srv.image}
                          alt={srv.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase text-[#FF1A1A] font-semibold">
                          {srv.category}
                        </span>
                        <h4 className="font-anton text-base uppercase tracking-wider text-white truncate">
                          {srv.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">
                          {srv.description}
                        </p>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">
                          Price: {srv.startingPrice || "Custom"} • {srv.duration || "1 Day"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingService(srv)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${srv.title}"?`)) {
                            deleteService(srv.id);
                            if (editingService?.id === srv.id) setEditingService(null);
                            showToast("Service deleted.");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-800/30 transition-colors cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS / GALLERY CRUD */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                    Projects & Gallery CRUD
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage showcase builds, before/after media, vehicle tags, and client specs.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = `project-${Date.now()}`;
                    const created: ProjectItem = {
                      id: newId,
                      title: "Porsche 911 GT3 RS",
                      category: "PPF & CERAMIC",
                      vehicle: "Porsche 911 GT3 RS",
                      year: "2024",
                      package: "Full Body Satin Stealth PPF",
                      description: "Complete track-grade surface armor installation and optical heat rejection tinting.",
                      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
                      images: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop"],
                      services: ["Full Body PPF", "IR Ceramic Tint"],
                      tags: ["Full Body PPF", "IR Ceramic Tint", "Track Prep"],
                      featured: true,
                    };
                    addProject(created);
                    setEditingProject(created);
                    showToast("New project showcase added.");
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] text-white font-anton uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Project Editor */}
              {editingProject && (
                <div className="bg-black/80 border-2 border-[#FF1A1A]/60 rounded-2xl p-5 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-anton text-lg uppercase tracking-wider text-white">
                      Editing Project: {editingProject.title}
                    </span>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Vehicle / Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => {
                          const updated = { ...editingProject, title: e.target.value };
                          setEditingProject(updated);
                          updateProject(editingProject.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-anton tracking-wider outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Package Executed
                      </label>
                      <input
                        type="text"
                        value={editingProject.package || editingProject.category}
                        onChange={(e) => {
                          const updated = { ...editingProject, package: e.target.value };
                          setEditingProject(updated);
                          updateProject(editingProject.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Project Showcase Image URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.image || editingProject.images?.[0] || ""}
                        onChange={(e) => {
                          const updated = {
                            ...editingProject,
                            image: e.target.value,
                            images: [e.target.value, ...(editingProject.images?.slice(1) || [])],
                          };
                          setEditingProject(updated);
                          updateProject(editingProject.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-300 font-mono outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Description / Story
                      </label>
                      <textarea
                        rows={3}
                        value={editingProject.description}
                        onChange={(e) => {
                          const updated = { ...editingProject, description: e.target.value };
                          setEditingProject(updated);
                          updateProject(editingProject.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={proj.image || proj.images?.[0] || "/images/projects/project-01-cover.webp"}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase text-[#FF1A1A] font-semibold">
                          {proj.category}
                        </span>
                        <h4 className="font-anton text-base uppercase tracking-wider text-white truncate">
                          {proj.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">
                          {proj.description}
                        </p>
                        <div className="text-[10px] text-zinc-500 font-mono mt-1">
                          {proj.package || proj.category}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            deleteProject(proj.id);
                            if (editingProject?.id === proj.id) setEditingProject(null);
                            showToast("Project deleted.");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-800/30 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS CRUD */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                    Customer Reviews CRUD
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage verified testimonials, ratings, and vehicle owner feedback.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = `review-${Date.now()}`;
                    const created: TestimonialItem = {
                      id: newId,
                      name: "Alex Rivera",
                      vehicle: "BMW M4 Competition",
                      rating: 5,
                      text: "Incredible attention to detail. The ceramic tint keeps the cabin ice cold even in 100-degree Texas heat.",
                      verified: true,
                      date: "Recent Client",
                    };
                    addTestimonial(created);
                    setEditingReview(created);
                    showToast("New review added.");
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] text-white font-anton uppercase tracking-wider text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Review Editor */}
              {editingReview && (
                <div className="bg-black/80 border-2 border-[#FF1A1A]/60 rounded-2xl p-5 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-anton text-lg uppercase tracking-wider text-white">
                      Editing Review: {editingReview.name}
                    </span>
                    <button
                      onClick={() => setEditingReview(null)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Done Editing
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={editingReview.name}
                        onChange={(e) => {
                          const updated = { ...editingReview, name: e.target.value };
                          setEditingReview(updated);
                          updateTestimonial(editingReview.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        value={editingReview.vehicle}
                        onChange={(e) => {
                          const updated = { ...editingReview, vehicle: e.target.value };
                          setEditingReview(updated);
                          updateTestimonial(editingReview.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                        Review Commentary
                      </label>
                      <textarea
                        rows={3}
                        value={editingReview.text || editingReview.reviewText || ""}
                        onChange={(e) => {
                          const updated = {
                            ...editingReview,
                            text: e.target.value,
                            reviewText: e.target.value,
                          };
                          setEditingReview(updated);
                          updateTestimonial(editingReview.id, updated);
                        }}
                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-3">
                {config.testimonials.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-anton text-sm uppercase tracking-wide text-white">
                          {rev.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          ({rev.vehicle})
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 italic">"{rev.text || rev.reviewText}"</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingReview(rev)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review by "${rev.name}"?`)) {
                            deleteTestimonial(rev.id);
                            if (editingReview?.id === rev.id) setEditingReview(null);
                            showToast("Review deleted.");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-800/30 transition-colors cursor-pointer"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BAY BOOKINGS LEADS */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-anton text-2xl uppercase tracking-wider text-white">
                  Bay Bookings & Consultation Leads
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Real-time pipeline of customer inquiries, vehicle intake requests, and bay scheduling.
                </p>
              </div>

              <div className="space-y-3">
                {config.bookings?.length === 0 ? (
                  <p className="text-sm text-zinc-500 py-8 text-center font-mono">
                    No active booking records in the pipeline.
                  </p>
                ) : (
                  config.bookings?.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-zinc-300">
                            {b.id}
                          </span>
                          <span className="font-anton text-base uppercase text-white tracking-wide">
                            {b.name}
                          </span>
                          <span className="text-xs text-zinc-400 font-mono">
                            {b.phone}
                          </span>
                        </div>
                        <div className="text-xs text-[#FF1A1A] font-semibold">
                          {b.vehicle}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          {b.service} • <span className="font-mono text-zinc-500">{b.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateBookingStatus(
                              b.id,
                              e.target.value as BookingRecord["status"]
                            )
                          }
                          className="bg-zinc-900 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                        >
                          <option value="Pending Review">Pending Review</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Bay">In Bay</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => {
                            if (confirm(`Remove booking for ${b.name}?`)) {
                              deleteBooking(b.id);
                              showToast("Booking deleted.");
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/30 hover:bg-red-900/50 text-red-400 hover:text-white border border-red-800/30 transition-colors cursor-pointer"
                          title="Delete booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
