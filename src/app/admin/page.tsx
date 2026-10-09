"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/context/site-context";
import {
  NavItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
  AccentColorTheme,
  FontSizeScale,
  FontFamilyChoice,
} from "@/types";
import {
  Shield,
  Sparkles,
  SlidersHorizontal,
  Menu as MenuIcon,
  Wrench,
  Car,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  Download,
  Upload,
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  Eye,
  EyeOff,
  Sliders,
  Layers,
  ChevronRight,
  ExternalLink,
  Lock,
  Unlock,
  LogOut,
  Calendar,
  Activity,
  AlertCircle,
  Clock,
  User,
  Phone,
  Mail,
  Image as ImageIcon,
  Type,
  Palette,
  CheckCircle2,
  Copy,
  ToggleLeft,
  ToggleRight,
  Sun,
  Layout,
  FileText,
  Search,
  Filter,
} from "lucide-react";

// Required Admin Passcode
const ADMIN_PASSCODE = "adminx11";
const AUTH_STORAGE_KEY = "admin_auth_99tintclub";

interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  enclosedTransport: boolean;
  status: "Pending Review" | "Confirmed" | "In Bay" | "Completed" | "Cancelled";
  createdAt: string;
}

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-88421",
    name: "Marcus Vance",
    email: "marcus.vance@beverlyhills.net",
    phone: "+1 (310) 849-2104",
    vehicle: "2024 Range Rover Sport",
    service: "Automotive Window Tinting (Ceramic IR)",
    date: "2026-10-12",
    enclosedTransport: true,
    status: "In Bay",
    createdAt: "Oct 8, 11:20 AM",
  },
  {
    id: "BK-88419",
    name: "Elena Rostova",
    email: "elena@palmsprings.net",
    phone: "+1 (760) 602-9918",
    vehicle: "2024 Tesla Model S Plaid",
    service: "Ceramic Window Tint + Glass Roof Protection",
    date: "2026-10-14",
    enclosedTransport: false,
    status: "Confirmed",
    createdAt: "Oct 8, 03:45 PM",
  },
  {
    id: "BK-88415",
    name: "Julian Sterling",
    email: "j.sterling@newportbeach.io",
    phone: "+1 (949) 555-0199",
    vehicle: "2024 Porsche 911 Carrera S",
    service: "Full Body Self-Healing PPF + Ceramic Tint",
    date: "2026-10-18",
    enclosedTransport: true,
    status: "Pending Review",
    createdAt: "Oct 9, 09:12 AM",
  },
  {
    id: "BK-88402",
    name: "David Thorne",
    email: "d.thorne@inlandempire.org",
    phone: "+1 (909) 902-4411",
    vehicle: "2024 Mercedes-AMG G63",
    service: "Privacy & Decorative Window Film",
    date: "2026-10-09",
    enclosedTransport: false,
    status: "Completed",
    createdAt: "Oct 7, 02:30 PM",
  },
];

type AdminTab =
  | "branding"
  | "theme"
  | "sections"
  | "menus"
  | "services"
  | "projects"
  | "testimonials"
  | "bookings"
  | "backup";

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
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
  } = useSiteConfig();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("branding");

  // Notifications Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bookings list state
  const [bookings, setBookings] = useState<BookingRecord[]>(DEFAULT_BOOKINGS);

  // Dialog / Modal states for CRUD
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  const [editingMenu, setEditingMenu] = useState<NavItem | null>(null);
  const [isNewMenu, setIsNewMenu] = useState<boolean>(false);

  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState<boolean>(false);

  const [importJsonText, setImportJsonText] = useState<string>("");
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Check existing session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      showToast("Access Granted. Welcome to Admin Suite.");
    } else {
      setAuthError("Invalid passcode. Please enter the authorized administrator key.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // =========================================================================
  // 1. AUTHENTICATION LOCK SCREEN (pw: adminx11)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1B1B] text-white flex items-center justify-center p-4 selection:bg-[#5EE07C] selection:text-black">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-[#252525] border border-[#5EE07C]/30 rounded-3xl p-8 sm:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#5EE07C]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Crest Logo & Header */}
            <div className="flex flex-col items-center text-center mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#1A1B1B] border border-[#5EE07C]/50 flex items-center justify-center text-[#5EE07C] shadow-[0_0_24px_rgba(94,224,124,0.3)] mb-4">
                <Lock className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5EE07C]/10 border border-[#5EE07C]/30 text-[10px] font-mono uppercase tracking-widest text-[#5EE07C] font-bold mb-2">
                <span>SECURITY LEVEL 1</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Admin <span className="shimmer-text">Console</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-1.5 max-w-xs font-normal">
                Enter the master administrator key to manage content, themes, sections, and customer requests.
              </p>
            </div>

            {/* Passcode Form */}
            <form onSubmit={handleLogin} className="space-y-4 relative z-10">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-bold mb-2">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder="Enter passcode..."
                    className="w-full h-12 px-4 pr-12 rounded-xl bg-[#1A1B1B] border border-white/15 focus:border-[#5EE07C] focus:ring-2 focus:ring-[#5EE07C]/30 text-white placeholder-zinc-500 font-mono text-sm transition-all outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1 rounded"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mt-2 animate-in fade-in duration-200">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-400 flex items-center justify-between">
                <span>Default Passcode:</span>
                <span className="font-mono text-[#5EE07C] font-bold bg-[#1A1B1B] px-2 py-0.5 rounded border border-white/10">
                  adminx11
                </span>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center justify-center gap-2 transition-all hover:brightness-105 active:scale-95 shadow-[0_4px_20px_rgba(94,224,124,0.35)] bg-[#5EE07C]"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Dashboard</span>
              </button>

              <div className="pt-2 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Public Website</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#1A1B1B] text-slate-100 selection:bg-[#5EE07C] selection:text-black">
      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#252525] border border-[#5EE07C] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold font-mono animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#5EE07C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Administrative Header */}
      <header className="sticky top-0 z-30 bg-[#252525]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-[#1A1B1B] border border-[#5EE07C]/50 flex items-center justify-center text-[#5EE07C] shadow-[0_0_12px_rgba(94,224,124,0.3)]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black uppercase tracking-tight block leading-tight">
                  {config.brandName}
                </span>
                <span className="text-[10px] font-mono text-[#5EE07C] font-semibold tracking-wider block">
                  SUPER ADMIN CONSOLE
                </span>
              </div>
            </Link>

            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5EE07C]/10 border border-[#5EE07C]/30 text-[10px] font-mono uppercase tracking-widest text-[#5EE07C] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EE07C] animate-pulse" />
              <span>LIVE SYNC ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-[#1A1B1B] border border-white/10 hover:border-white/25 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0"
              title="Preview site changes in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#5EE07C]" />
              <span>Preview Site</span>
            </Link>

            <button
              onClick={() => {
                showToast("All configurations stored & live!");
              }}
              className="px-4 py-2 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider transition-all hover:brightness-105 active:scale-95 flex items-center gap-1.5 flex-shrink-0 shadow-[0_2px_12px_rgba(94,224,124,0.3)]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-rose-500/40 hover:text-rose-400 text-zinc-400 flex items-center justify-center transition-all flex-shrink-0"
              title="Lock Console & Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-white/[0.08]">
          {[
            { id: "branding", label: "General & Text", icon: FileText },
            { id: "theme", label: "Colors & Typography", icon: Palette },
            { id: "sections", label: "Sections Manager", icon: Layout },
            { id: "menus", label: "Navigation Menus", icon: MenuIcon },
            { id: "services", label: "Services CRUD", icon: Wrench },
            { id: "projects", label: "Projects CRUD", icon: Car },
            { id: "testimonials", label: "Reviews CRUD", icon: MessageSquare },
            { id: "bookings", label: "Inquiries & Leads", icon: Activity },
            { id: "backup", label: "Backup & Reset", icon: SlidersHorizontal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 border focus-visible:outline-none ${
                  isActive
                    ? "bg-[#5EE07C] text-black border-[#5EE07C] shadow-[0_2px_14px_rgba(94,224,124,0.35)] scale-[1.02]"
                    : "bg-[#252525] text-zinc-300 border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[#5EE07C]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: BRANDING & GENERAL TEXT                                           */}
        {/* ========================================================================= */}
        {activeTab === "branding" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#5EE07C]" />
                <span>Brand Identity & Contact Coordinates</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Control the business name, contact phone numbers, and physical location shown across header, hero, and footer.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateSiteConfig({ email: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Studio Physical Address
                  </label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateSiteConfig({ address: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={config.workingHours}
                    onChange={(e) => updateSiteConfig({ workingHours: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Emergency Hotline
                  </label>
                  <input
                    type="text"
                    value={config.emergencyHotline}
                    onChange={(e) => updateSiteConfig({ emergencyHotline: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Hero Headlines Content Section */}
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#5EE07C]" />
                <span>Hero Section Copywriting</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Customize the main banner headlines, highlight phrases, and overview description.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Hero Top Badge
                  </label>
                  <input
                    type="text"
                    value={config.heroBadge}
                    onChange={(e) => updateSiteConfig({ heroBadge: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleLine1}
                    onChange={(e) => updateSiteConfig({ heroTitleLine1: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Headline Highlight (Glowing Text)
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleHighlight}
                    onChange={(e) => updateSiteConfig({ heroTitleHighlight: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleLine2}
                    onChange={(e) => updateSiteConfig({ heroTitleLine2: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Hero Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={config.heroDescription}
                    onChange={(e) => updateSiteConfig({ heroDescription: e.target.value })}
                    className="w-full p-4 rounded-xl bg-[#1A1B1B] border border-white/10 focus:border-[#5EE07C] text-white text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COLORS & TYPOGRAPHY (SUPER CUSTOMIZATION)                         */}
        {/* ========================================================================= */}
        {activeTab === "theme" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Color System Customization */}
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#5EE07C]" />
                <span>Color Palette & Dynamic Themes</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Choose from signature presets or select exact hex codes for accents, backgrounds, and surfaces.
              </p>

              {/* Preset Palettes */}
              <div className="mb-8">
                <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-3">
                  Signature Color Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { id: "apex-combo", name: "Apex Emerald", hex: "#5EE07C" },
                    { id: "amber", name: "Amber Gold", hex: "#f59e0b" },
                    { id: "cyan", name: "Cyan Ice", hex: "#06b6d4" },
                    { id: "red", name: "Rosso Corsa", hex: "#ef4444" },
                    { id: "violet", name: "Ultra Violet", hex: "#8b5cf6" },
                    { id: "emerald", name: "Deep Green", hex: "#10b981" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        updateTheme({
                          accent: p.id as AccentColorTheme,
                          customAccentColor: p.hex,
                        });
                        showToast(`Theme updated to ${p.name}`);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        config.theme.accent === p.id && (!config.theme.customAccentColor || config.theme.customAccentColor === p.hex)
                          ? "border-[#5EE07C] bg-[#1A1B1B] shadow-[0_0_20px_rgba(94,224,124,0.25)]"
                          : "border-white/10 bg-[#1A1B1B]/60 hover:border-white/25"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full mb-2" style={{ backgroundColor: p.hex }} />
                      <div className="text-xs font-bold text-white">{p.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400">{p.hex}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Hex Color Pickers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Custom Accent / Highlight Hex
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.customAccentColor || "#5EE07C"}
                      onChange={(e) => updateTheme({ customAccentColor: e.target.value })}
                      className="w-12 h-11 rounded-xl bg-transparent border border-white/15 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.customAccentColor || "#5EE07C"}
                      onChange={(e) => updateTheme({ customAccentColor: e.target.value })}
                      className="flex-1 h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 font-mono text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Custom Background Hex
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.customBackgroundColor || "#1A1B1B"}
                      onChange={(e) => updateTheme({ customBackgroundColor: e.target.value })}
                      className="w-12 h-11 rounded-xl bg-transparent border border-white/15 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.customBackgroundColor || "#1A1B1B"}
                      onChange={(e) => updateTheme({ customBackgroundColor: e.target.value })}
                      className="flex-1 h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 font-mono text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-2">
                    Custom Card / Container Hex
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.theme.customCardColor || "#252525"}
                      onChange={(e) => updateTheme({ customCardColor: e.target.value })}
                      className="w-12 h-11 rounded-xl bg-transparent border border-white/15 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.theme.customCardColor || "#252525"}
                      onChange={(e) => updateTheme({ customCardColor: e.target.value })}
                      className="flex-1 h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 font-mono text-sm text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Customization */}
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <Type className="w-5 h-5 text-[#5EE07C]" />
                <span>Typography & Font Sizing</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Choose the font scale and primary typeface family applied across the website.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Font Scale */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-3">
                    Global Text Scale
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "compact", label: "Compact", desc: "Sleek 0.925rem" },
                      { id: "normal", label: "Standard", desc: "Default 1.0rem" },
                      { id: "spacious", label: "Spacious", desc: "Airy 1.075rem" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          updateTheme({ fontSize: s.id as FontSizeScale });
                          showToast(`Font scale set to ${s.label}`);
                        }}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          config.theme.fontSize === s.id
                            ? "border-[#5EE07C] bg-[#1A1B1B] text-white font-bold"
                            : "border-white/10 bg-[#1A1B1B]/60 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs">{s.label}</div>
                        <div className="text-[10px] font-mono text-zinc-500 mt-1">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-3">
                    Typography Font Family
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: "system", name: "System Sans", style: "font-sans" },
                      { id: "outfit", name: "Outfit (Modern)", style: "font-sans font-bold" },
                      { id: "syne", name: "Syne (Luxury)", style: "font-sans font-black" },
                      { id: "space-grotesk", name: "Space Grotesk", style: "font-mono" },
                      { id: "mono", name: "Tech Monospace", style: "font-mono" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          updateTheme({ fontFamily: f.id as FontFamilyChoice });
                          showToast(`Font family set to ${f.name}`);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          (config.theme.fontFamily || "system") === f.id
                            ? "border-[#5EE07C] bg-[#1A1B1B] text-white font-bold"
                            : "border-white/10 bg-[#1A1B1B]/60 text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        <div className="text-xs truncate">{f.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SECTIONS MANAGER (ENABLE / DISABLE HOMEPAGE SECTIONS)              */}
        {/* ========================================================================= */}
        {activeTab === "sections" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <Layout className="w-5 h-5 text-[#5EE07C]" />
                <span>Homepage Sections Manager</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Easily toggle sections on or off to customize the homepage layout in real-time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "hero", label: "Hero Banner", desc: "Main supercar visual, headlines, and booking triggers" },
                  { id: "services", label: "Window Tinting & Studio Services", desc: "Modern tabbed window tinting and detailing catalog" },
                  { id: "slider", label: "Optical Before / After Slider", desc: "Interactive paint correction and swirl removal slider" },
                  { id: "calculator", label: "Specification Calculator", desc: "Custom estimate and vehicle classification calculator" },
                  { id: "projects", label: "Projects & Portfolio Gallery", desc: "Curated California luxury vehicles and treatment specs" },
                  { id: "about", label: "About Studio & Craftsmanship", desc: "Heritage, verified metrics, and climate-controlled bay standards" },
                  { id: "testimonials", label: "Verified Reviews & Ratings", desc: "Client testimonials and 5.0 Google satisfaction ratings" },
                  { id: "arStudio", label: "AR / VR Virtual Inspection Studio", desc: "Interactive 3D vehicle turntable with component hotspots" },
                ].map((s) => {
                  const currentSections = config.theme.sections || {
                    hero: true,
                    services: true,
                    slider: true,
                    calculator: true,
                    projects: true,
                    about: true,
                    testimonials: true,
                    arStudio: true,
                  };
                  const isEnabled = (currentSections as any)[s.id] !== false;

                  return (
                    <div
                      key={s.id}
                      className="p-5 rounded-2xl bg-[#1A1B1B] border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-sm font-bold text-white uppercase tracking-wide">
                          {s.label}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">{s.desc}</div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = {
                            ...currentSections,
                            [s.id]: !isEnabled,
                          };
                          updateTheme({ sections: updated });
                          showToast(`${s.label} is now ${!isEnabled ? "ENABLED" : "DISABLED"}`);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 transition-all ${
                          isEnabled
                            ? "bg-[#5EE07C] text-black shadow-[0_0_12px_rgba(94,224,124,0.3)]"
                            : "bg-zinc-800 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {isEnabled ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MENUS CRUD                                                         */}
        {/* ========================================================================= */}
        {activeTab === "menus" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                    <MenuIcon className="w-5 h-5 text-[#5EE07C]" />
                    <span>Navigation Menus (CRUD)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage the header navigation links, change destinations, order, or hide links.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingMenu({
                      id: "",
                      label: "New Link",
                      href: "#section",
                      order: config.navItems.length + 1,
                      isVisible: true,
                    });
                    setIsNewMenu(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Menu Item</span>
                </button>
              </div>

              {/* Navigation Items List */}
              <div className="space-y-3">
                {config.navItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#1A1B1B] border border-white/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[#5EE07C] font-bold">
                        {item.order}
                      </span>
                      <div>
                        <div className="text-sm font-bold text-white">{item.label}</div>
                        <div className="text-xs font-mono text-zinc-400">{item.href}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateMenuItem(item.id, { isVisible: !item.isVisible });
                          showToast(`${item.label} visibility toggled.`);
                        }}
                        className={`p-2 rounded-xl text-xs font-semibold ${
                          item.isVisible
                            ? "bg-[#5EE07C]/15 text-[#5EE07C] border border-[#5EE07C]/30"
                            : "bg-white/5 text-zinc-500 border border-white/10"
                        }`}
                        title={item.isVisible ? "Visible" : "Hidden"}
                      >
                        {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          setEditingMenu(item);
                          setIsNewMenu(false);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10"
                        title="Edit Menu Item"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          deleteMenuItem(item.id);
                          showToast(`Deleted ${item.label}`);
                        }}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                        title="Delete Menu Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Item Edit/Add Modal */}
            {editingMenu && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#252525] border border-[#5EE07C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
                    {isNewMenu ? "Add New Navigation Link" : `Edit "${editingMenu.label}"`}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Display Label
                      </label>
                      <input
                        type="text"
                        value={editingMenu.label}
                        onChange={(e) => setEditingMenu({ ...editingMenu, label: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        URL or Anchor Link (e.g. #services)
                      </label>
                      <input
                        type="text"
                        value={editingMenu.href}
                        onChange={(e) => setEditingMenu({ ...editingMenu, href: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Order Index
                      </label>
                      <input
                        type="number"
                        value={editingMenu.order}
                        onChange={(e) =>
                          setEditingMenu({ ...editingMenu, order: parseInt(e.target.value) || 1 })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingMenu(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        if (isNewMenu) {
                          addMenuItem({
                            label: editingMenu.label,
                            href: editingMenu.href,
                            order: editingMenu.order,
                            isVisible: editingMenu.isVisible,
                          });
                          showToast("Added new navigation menu item.");
                        } else {
                          updateMenuItem(editingMenu.id, editingMenu);
                          showToast("Updated navigation menu item.");
                        }
                        setEditingMenu(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Save Link
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SERVICES CRUD                                                      */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#5EE07C]" />
                    <span>Services Catalog (CRUD)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Add, edit, or remove Window Tinting and studio packages. All prices remain excluded per specifications.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingService({
                      id: "",
                      title: "New Window Tint Service",
                      subtitle: "Precision Solar Defense",
                      category: "Window Tinting",
                      duration: "2-3 Hours",
                      popular: false,
                      badge: "New Service",
                      description: "Custom window tinting engineered for vehicles in California.",
                      image: "/images/california-range-rover.jpg",
                      features: [
                        "Reduces Driving Heat & Harsh Sun Glare",
                        "Blocks 99% Harmful UV Rays",
                        "Lifetime Color-Stable Film Warranty",
                      ],
                    });
                    setIsNewService(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {config.services.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-black/60">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold bg-[#5EE07C] text-black">
                          {service.category}
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white leading-snug">{service.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{service.description}</p>

                      <div className="mt-3 text-[10px] font-mono text-[#5EE07C] font-semibold">
                        ⏱ {service.duration || "Custom Turnaround"}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-white/[0.08]">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setIsNewService(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          deleteService(service.id);
                          showToast(`Deleted service "${service.title}"`);
                        }}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Modal Edit/Add */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-2xl bg-[#252525] border border-[#5EE07C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
                    {isNewService ? "Create New Service Package" : `Edit "${editingService.title}"`}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={editingService.title}
                        onChange={(e) =>
                          setEditingService({ ...editingService, title: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Category Tab
                      </label>
                      <select
                        value={editingService.category}
                        onChange={(e) =>
                          setEditingService({ ...editingService, category: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      >
                        <option value="Window Tinting">Window Tinting</option>
                        <option value="Ceramic Coating">Ceramic Coating</option>
                        <option value="Paint Protection (PPF)">Paint Protection (PPF)</option>
                        <option value="Paint Correction">Paint Correction</option>
                        <option value="Automotive">Automotive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Estimated Turnaround
                      </label>
                      <input
                        type="text"
                        value={editingService.duration || ""}
                        onChange={(e) =>
                          setEditingService({ ...editingService, duration: e.target.value })
                        }
                        placeholder="e.g. 2-3 Hours"
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Image URL (Choose or enter path)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingService.image}
                          onChange={(e) =>
                            setEditingService({ ...editingService, image: e.target.value })
                          }
                          className="flex-1 h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs font-mono"
                        />
                      </div>
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                        {[
                          { name: "Range Rover", path: "/images/california-range-rover.jpg" },
                          { name: "Tesla Plaid", path: "/images/california-tesla.jpg" },
                          { name: "Porsche 911", path: "/images/california-porsche.jpg" },
                          { name: "G-Wagon", path: "/images/california-g-wagon.jpg" },
                        ].map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() =>
                              setEditingService({ ...editingService, image: preset.path })
                            }
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-300 hover:text-white hover:border-[#5EE07C]"
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingService.description}
                        onChange={(e) =>
                          setEditingService({ ...editingService, description: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Features (Separate each feature with a comma)
                      </label>
                      <input
                        type="text"
                        value={editingService.features.join(", ")}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            features: e.target.value.split(",").map((f) => f.trim()).filter(Boolean),
                          })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        if (isNewService) {
                          addService(editingService);
                          showToast("Added new service package.");
                        } else {
                          updateService(editingService.id, editingService);
                          showToast("Updated service package.");
                        }
                        setEditingService(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Save Service
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PROJECTS CRUD                                                      */}
        {/* ========================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                    <Car className="w-5 h-5 text-[#5EE07C]" />
                    <span>Portfolio Projects (CRUD)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage completed customer vehicles, California editions, gloss ratings, and treatments.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProject({
                      id: "",
                      title: "New Featured Vehicle",
                      category: "California Luxury",
                      carModel: "California Edition",
                      year: "2024",
                      glossRating: "99.9 GU",
                      treatment: "Full Ceramic Tint + Surface Defense",
                      image: "/images/california-range-rover.jpg",
                      tags: ["California", "Ceramic Tint", "Bespoke"],
                    });
                    setIsNewProject(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {config.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-black/60">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold bg-[#5EE07C] text-black">
                          {proj.glossRating}
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white uppercase">{proj.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{proj.treatment}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setIsNewProject(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          deleteProject(proj.id);
                          showToast(`Deleted project "${proj.title}"`);
                        }}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Edit/Add Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-xl bg-[#252525] border border-[#5EE07C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
                    {isNewProject ? "Add Portfolio Project" : `Edit "${editingProject.title}"`}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        value={editingProject.carModel}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, carModel: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Gloss Rating
                      </label>
                      <input
                        type="text"
                        value={editingProject.glossRating}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, glossRating: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Treatment Specification
                      </label>
                      <input
                        type="text"
                        value={editingProject.treatment}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, treatment: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.image}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        if (isNewProject) {
                          addProject(editingProject);
                          showToast("Added new portfolio project.");
                        } else {
                          updateProject(editingProject.id, editingProject);
                          showToast("Updated portfolio project.");
                        }
                        setEditingProject(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: TESTIMONIALS / REVIEWS CRUD                                        */}
        {/* ========================================================================= */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#5EE07C]" />
                    <span>Customer Reviews (CRUD)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage testimonials, client ratings, and verified review stamps.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTestimonial({
                      id: "",
                      name: "Client Name",
                      role: "Vehicle Owner",
                      car: "California Range Rover Sport",
                      rating: 5,
                      comment: "Flawless window tint installation and optical clarity in Yucaipa.",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
                      date: "Recent",
                      platform: "Google Verified",
                      verified: true,
                    });
                    setIsNewTestimonial(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-105 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Review</span>
                </button>
              </div>

              {/* Reviews List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.testimonials.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-bold text-white">{rev.name}</div>
                        <div className="text-[#5EE07C] font-mono text-xs font-bold">
                          {"★".repeat(rev.rating)}
                        </div>
                      </div>
                      <div className="text-xs font-mono text-zinc-400 mb-2">{rev.car}</div>
                      <p className="text-xs text-zinc-300 italic">"{rev.comment}"</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => {
                          setEditingTestimonial(rev);
                          setIsNewTestimonial(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white border border-white/10 flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          deleteTestimonial(rev.id);
                          showToast(`Deleted review from ${rev.name}`);
                        }}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Modal Edit/Add */}
            {editingTestimonial && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#252525] border border-[#5EE07C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4">
                    {isNewTestimonial ? "Add New Review" : `Edit Review from ${editingTestimonial.name}`}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.name}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Vehicle Serviced
                      </label>
                      <input
                        type="text"
                        value={editingTestimonial.car}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, car: e.target.value })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Rating (1 to 5)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={editingTestimonial.rating}
                        onChange={(e) =>
                          setEditingTestimonial({
                            ...editingTestimonial,
                            rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 5)),
                          })
                        }
                        className="w-full h-11 px-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 font-bold mb-1">
                        Testimonial Comment
                      </label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.comment}
                        onChange={(e) =>
                          setEditingTestimonial({ ...editingTestimonial, comment: e.target.value })
                        }
                        className="w-full p-3 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingTestimonial(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        if (isNewTestimonial) {
                          addTestimonial(editingTestimonial);
                          showToast("Added new testimonial.");
                        } else {
                          updateTestimonial(editingTestimonial.id, editingTestimonial);
                          showToast("Updated testimonial.");
                        }
                        setEditingTestimonial(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: INQUIRIES & LEADS                                                  */}
        {/* ========================================================================= */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#5EE07C]" />
                    <span>Inquiries & Consultation Requests</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage incoming window tinting and detailing leads submitted through the site forms.
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-[#5EE07C]/15 border border-[#5EE07C]/30 text-xs font-mono text-[#5EE07C] font-bold">
                  {bookings.length} Total Records
                </div>
              </div>

              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-[#5EE07C]">{b.id}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="font-bold text-sm text-white">{b.name}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-xs text-zinc-400 font-mono">{b.phone}</span>
                      </div>

                      <div className="text-xs text-zinc-300 font-medium">
                        Vehicle: <span className="text-white">{b.vehicle}</span> — {b.service}
                      </div>

                      <div className="text-[11px] text-zinc-500 font-mono mt-1">
                        Target Date: {b.date} • Received: {b.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={b.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as any;
                          setBookings((prev) =>
                            prev.map((item) =>
                              item.id === b.id ? { ...item, status: newStatus } : item
                            )
                          );
                          showToast(`Updated status for ${b.id}`);
                        }}
                        className="h-9 px-3 rounded-xl bg-[#252525] border border-white/15 text-xs text-white font-mono outline-none"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="In Bay">In Bay</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <a
                        href={`tel:${b.phone.replace(/[^0-9+]/g, "")}`}
                        className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-[#5EE07C] border border-white/10 flex items-center justify-center transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: BACKUP, EXPORT & FACTORY RESET                                     */}
        {/* ========================================================================= */}
        {activeTab === "backup" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-[#252525] border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold uppercase tracking-tight text-white mb-1 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#5EE07C]" />
                <span>Configuration Backup & Restoration</span>
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Export your customizations as a single JSON file, or restore factory defaults anytime.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Export Card */}
                <div className="p-6 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col justify-between">
                  <div>
                    <Download className="w-8 h-8 text-[#5EE07C] mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">Export JSON Backup</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Download your exact custom configuration including texts, services, and color values.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const json = exportConfigJson();
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `99tintclub-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                      showToast("Configuration backup downloaded.");
                    }}
                    className="mt-6 w-full py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-105 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-6 rounded-2xl bg-[#1A1B1B] border border-white/10 flex flex-col justify-between">
                  <div>
                    <Upload className="w-8 h-8 text-[#5EE07C] mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">Import JSON Backup</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Upload or paste a previous JSON configuration file to restore all settings instantly.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowImportModal(true)}
                    className="mt-6 w-full py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/15 active:scale-95 border border-white/15"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Import JSON</span>
                  </button>
                </div>

                {/* Factory Reset Card */}
                <div className="p-6 rounded-2xl bg-[#1A1B1B] border border-rose-500/20 flex flex-col justify-between">
                  <div>
                    <RotateCcw className="w-8 h-8 text-rose-400 mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">Factory Reset</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Reset all settings, colors, services, and texts back to the original clean $99 Tint Club configuration.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="mt-6 w-full py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-500/25 active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Import JSON Modal */}
            {showImportModal && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-xl bg-[#252525] border border-[#5EE07C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Import Configuration JSON
                  </h3>
                  <p className="text-xs text-zinc-400 mb-4">
                    Paste the JSON configuration contents below:
                  </p>

                  <textarea
                    rows={8}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste JSON content here..."
                    className="w-full p-4 rounded-xl bg-[#1A1B1B] border border-white/10 text-white text-xs font-mono outline-none"
                  />

                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={() => {
                        setShowImportModal(false);
                        setImportJsonText("");
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        if (importJsonText.trim()) {
                          const success = importConfigJson(importJsonText);
                          if (success) {
                            showToast("Configuration successfully imported & applied!");
                            setShowImportModal(false);
                            setImportJsonText("");
                          } else {
                            alert("Invalid JSON format. Please verify the configuration file.");
                          }
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#5EE07C] text-black font-bold text-xs uppercase tracking-wider"
                    >
                      Apply Import
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#252525] border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
                    <RotateCcw className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2">
                    Confirm Factory Reset
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                    Are you sure you want to revert all site settings, themes, services, and sections back to initial defaults? This action cannot be undone.
                  </p>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        resetToDefaults();
                        showToast("Site reset to factory defaults.");
                        setShowResetConfirm(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-600 active:scale-95"
                    >
                      Yes, Reset Everything
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
