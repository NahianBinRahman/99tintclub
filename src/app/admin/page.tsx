"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/context/site-context";
import {
  AccentColorTheme,
  FontSizeScale,
  NavItem,
  ServiceItem,
  ProjectItem,
  TestimonialItem,
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
  DollarSign,
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
} from "lucide-react";

interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  price: string;
  enclosedTransport: boolean;
  status: "Pending Review" | "Confirmed" | "In Bay" | "Curing & QC" | "Completed" | "Cancelled";
  createdAt: string;
}

const DEFAULT_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-88421",
    name: "Marcus Vance",
    email: "marcus.vance@beverlyhills.net",
    phone: "+1 (310) 849-2104",
    vehicle: "2024 Porsche 911 GT3 RS",
    service: "Full Body Self-Healing PPF + Ceramic Topcoat",
    date: "2026-10-12",
    price: "$6,800",
    enclosedTransport: true,
    status: "In Bay",
    createdAt: "Oct 4, 11:20 AM",
  },
  {
    id: "BK-88419",
    name: "Elena Rostova",
    email: "elena@monacotrading.mc",
    phone: "+1 (415) 602-9918",
    vehicle: "2024 Ferrari SF90 Stradale",
    service: "Multi-Stage Paint Correction & Graphene Shield",
    date: "2026-10-14",
    price: "$4,200",
    enclosedTransport: true,
    status: "Confirmed",
    createdAt: "Oct 5, 03:45 PM",
  },
  {
    id: "BK-88415",
    name: "Julian Sterling",
    email: "j.sterling@sterlingcap.com",
    phone: "+1 (212) 555-0199",
    vehicle: "2023 McLaren 750S Spider",
    service: "High-Gloss Ceramic Matrix Shield",
    date: "2026-10-18",
    price: "$2,950",
    enclosedTransport: false,
    status: "Pending Review",
    createdAt: "Oct 5, 06:12 PM",
  },
  {
    id: "BK-88402",
    name: "David Thorne",
    email: "d.thorne@aeroworks.io",
    phone: "+1 (650) 902-4411",
    vehicle: "2024 Lamborghini Revuelto",
    service: "Concierge Track Armor PPF & Wheel Ceramic",
    date: "2026-10-02",
    price: "$7,500",
    enclosedTransport: true,
    status: "Completed",
    createdAt: "Oct 2, 09:30 AM",
  },
];

const MASTER_PASSWORD = "adminx11..";

const CURATED_SUPERCAR_PRESETS = [
  {
    label: "Porsche 911 GT3 RS (Guards Red)",
    url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    label: "Porsche 911 Dark Metallic (Studio)",
    url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  },
  {
    label: "Ferrari Track Special (Diffuser)",
    url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1600&auto=format&fit=crop",
  },
  {
    label: "McLaren Ceramic Reflection",
    url: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop",
  },
];

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Tabs & Notifications
  const [activeTab, setActiveTab] = useState<
    "overview" | "bookings" | "services" | "projects" | "reviews" | "menus" | "media" | "identity" | "appearance"
  >("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Bookings state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [bookingFilter, setBookingFilter] = useState<string>("All");
  const [isNewBookingModal, setIsNewBookingModal] = useState<boolean>(false);
  const [newBookingForm, setNewBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    service: config.services[0]?.title || "Ceramic Coating",
    date: new Date().toISOString().split("T")[0],
    price: "$2,800",
    enclosedTransport: true,
    status: "Confirmed" as BookingRecord["status"],
  });

  // Services CRUD States
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  // Projects CRUD States
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  // Reviews CRUD States
  const [editingReview, setEditingReview] = useState<TestimonialItem | null>(null);
  const [isNewReview, setIsNewReview] = useState<boolean>(false);

  // Navigation Menus CRUD States
  const [editingMenu, setEditingMenu] = useState<NavItem | null>(null);
  const [isNewMenu, setIsNewMenu] = useState<boolean>(false);

  // Check existing session on mount
  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem("tintclub_admin_token");
      if (storedAuth === "authenticated") {
        setIsAuthenticated(true);
      }
    } catch {
      // fallback
    } finally {
      setAuthChecking(false);
    }
  }, []);

  // Load and sync bookings
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tintclub_bookings");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
          return;
        }
      }
      setBookings(DEFAULT_BOOKINGS);
      localStorage.setItem("tintclub_bookings", JSON.stringify(DEFAULT_BOOKINGS));
    } catch {
      setBookings(DEFAULT_BOOKINGS);
    }
  }, []);

  const saveBookingsList = (updated: BookingRecord[]) => {
    setBookings(updated);
    try {
      localStorage.setItem("tintclub_bookings", JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === MASTER_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError(null);
      try {
        sessionStorage.setItem("tintclub_admin_token", "authenticated");
      } catch {
        // fallback
      }
      showToast("Access Granted. Welcome to $99 Tint Club CMS.");
    } else {
      setAuthError("Invalid security key. Authentication denied.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput("");
    try {
      sessionStorage.removeItem("tintclub_admin_token");
    } catch {
      // fallback
    }
    showToast("Session terminated.");
  };

  const handleUpdateBookingStatus = (id: string, newStatus: BookingRecord["status"]) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    saveBookingsList(updated);
    showToast(`Booking ${id} status updated to ${newStatus}.`);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to remove this booking record?")) {
      const updated = bookings.filter((b) => b.id !== id);
      saveBookingsList(updated);
      showToast(`Booking ${id} deleted.`);
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: BookingRecord = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      name: newBookingForm.name,
      email: newBookingForm.email,
      phone: newBookingForm.phone,
      vehicle: newBookingForm.vehicle,
      service: newBookingForm.service,
      date: newBookingForm.date,
      price: newBookingForm.price,
      enclosedTransport: newBookingForm.enclosedTransport,
      status: newBookingForm.status,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    saveBookingsList([newEntry, ...bookings]);
    setIsNewBookingModal(false);
    setNewBookingForm({
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      service: config.services[0]?.title || "Ceramic Coating",
      date: new Date().toISOString().split("T")[0],
      price: "$2,800",
      enclosedTransport: true,
      status: "Confirmed",
    });
    showToast("New VIP booking registered successfully.");
  };

  const handleExport = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tintclub-config-${Date.now()}.json`;
    a.click();
    showToast("Studio configuration exported successfully.");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importConfigJson(content)) {
        showToast("Configuration imported successfully!");
      } else {
        alert("Failed to parse configuration file.");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Reset all site configurations, services, and projects to factory defaults?")) {
      resetToDefaults();
      showToast("Reset to factory defaults completed.");
    }
  };

  // -------------------------------------------------------------
  // PASSWORD GATE: RENDER WHEN NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (authChecking) {
    return <div className="min-h-screen bg-[#06070a]" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-[var(--accent-primary)] selection:text-black">
        {/* Ambient Lighting */}
        <div
          className="glow-orb top-1/4 left-1/4 w-[500px] h-[500px] opacity-15"
          style={{ background: "var(--accent-glow)" }}
        />
        <div
          className="glow-orb bottom-10 right-10 w-[400px] h-[400px] opacity-10"
          style={{ background: "rgba(6, 182, 212, 0.2)" }}
        />
        <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

        {/* Security Login Card */}
        <div className="relative w-full max-w-md rounded-2xl glass-panel border border-white/15 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#0c0e17]/95 backdrop-blur-2xl z-10 animate-in zoom-in-95 duration-200">
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: "var(--accent-gradient)" }}
          />

          <div className="text-center mb-7">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-center mx-auto mb-4 text-[var(--accent-primary)] shadow-inner">
              <Shield className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-2">
              <Lock className="w-3 h-3" />
              <span>COMMAND ACCESS REQUIRED</span>
            </div>

            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              {config.brandName} <span className="shimmer-text">STUDIO CMS</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1 font-normal">
              Enter authorized administrator access key to access studio management operations.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5 flex items-center justify-between">
                <span>Security Access Key</span>
                <span className="text-[10px] text-zinc-500 font-mono">Restricted</span>
              </label>

              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter administrator password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all font-mono"
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(239,68,68,0.3)] transition-all hover:opacity-95 active:scale-95 mt-2"
              style={{ background: "var(--accent-gradient)" }}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Authenticate Session</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/[0.08] text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const filteredBookings =
    bookingFilter === "All" ? bookings : bookings.filter((b) => b.status === bookingFilter);

  return (
    <div className="min-h-screen bg-[#1A1B1B] text-zinc-100 flex flex-col font-sans selection:bg-[var(--accent-primary)] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-xl glass-panel border border-[var(--accent-primary)]/50 shadow-2xl text-xs font-bold text-white flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#252525]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            title="Return to live client site"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Live Studio</span>
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-white leading-tight">
                {config.brandName} Studio Portal
              </div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Encrypted • Session Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Header Actions */}
        <div className="flex items-center gap-2">
          <label className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import JSON</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleExport}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Download full studio config"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
            title="Reset site to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
            title="Lock Dashboard"
          >
            <LogOut className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        {/* Navigation Tabs Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-7 border-b border-white/[0.08] no-scrollbar">
          {[
            { id: "overview", label: "Studio Overview", icon: Activity },
            { id: "bookings", label: `VIP Bookings (${bookings.length})`, icon: Calendar },
            { id: "services", label: `Services (${config.services.length})`, icon: Wrench },
            { id: "projects", label: `Portfolio (${config.projects.length})`, icon: Car },
            { id: "reviews", label: `Reviews (${config.testimonials.length})`, icon: MessageSquare },
            { id: "menus", label: `Menus (${config.navItems.length})`, icon: MenuIcon },
            { id: "media", label: "Photos & Media", icon: ImageIcon },
            { id: "identity", label: "Brand Copy", icon: Type },
            { id: "appearance", label: "Theme & Palette", icon: Palette },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_2px_12px_rgba(255,255,255,0.3)] font-black"
                    : "glass-panel border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[var(--accent-primary)]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* TAB 1: STUDIO OVERVIEW & LIVE TELEMETRY */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-7 animate-in fade-in duration-200">
            {/* Top KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono uppercase">
                  <span>Pipeline Value</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">$148,500</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <span>+18.4%</span>
                  <span className="text-zinc-500 font-normal">vs last month</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono uppercase">
                  <span>Active Intake Queue</span>
                  <Calendar className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{bookings.length} Vehicles</div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {bookings.filter((b) => b.status === "In Bay").length} currently in installation bays
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono uppercase">
                  <span>Facility Bays</span>
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">4 / 4 Active</div>
                <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Climate Control: 70.2°F / 42% RH</span>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono uppercase">
                  <span>Client Rating</span>
                  <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[var(--accent-primary)] font-mono">5.0 ★</div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  100% verified collector satisfaction
                </div>
              </div>
            </div>

            {/* Live Studio Bay Monitoring Grid */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-white">
                    Live Installation Bay Status
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Real-time operational monitoring across cleanroom facilities.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase">
                  All Systems Optimal
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    bay: "Bay 01 • Decon & Intake",
                    vehicle: "2024 Porsche 911 GT3 RS",
                    stage: "PPF Wrapping Phase",
                    temp: "70.1°F • 41% RH",
                    color: "border-[var(--accent-primary)]/40",
                  },
                  {
                    bay: "Bay 02 • Paint Restoration",
                    vehicle: "2024 Ferrari SF90 Stradale",
                    stage: "Stage 2 Jeweled Polish",
                    temp: "69.8°F • 40% RH",
                    color: "border-amber-500/30",
                  },
                  {
                    bay: "Bay 03 • Ceramic IR Curing",
                    vehicle: "2024 Lamborghini Revuelto",
                    stage: "Graphene Thermal Bake",
                    temp: "115.0°F (IR Lamp)",
                    color: "border-cyan-500/30",
                  },
                  {
                    bay: "Bay 04 • Quality Control",
                    vehicle: "2023 McLaren 750S",
                    stage: "Final Specular Inspection",
                    temp: "70.4°F • 42% RH",
                    color: "border-emerald-500/30",
                  },
                ].map((b, idx) => (
                  <div key={idx} className={`p-4 rounded-xl bg-white/[0.02] border ${b.color} flex flex-col justify-between`}>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                        {b.bay}
                      </span>
                      <div className="text-sm font-bold text-white mb-1">{b.vehicle}</div>
                      <div className="text-xs text-[var(--accent-primary)] font-medium mb-3">
                        {b.stage}
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                      <span>{b.temp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 2: VIP INTAKE & APPOINTMENTS MANAGEMENT */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "bookings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black uppercase text-white">VIP Appointment Concierge</h3>
                <p className="text-xs text-zinc-400">
                  Manage incoming client bookings, update bay stages, and register custom intake orders.
                </p>
              </div>

              <button
                onClick={() => setIsNewBookingModal(true)}
                className="px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center gap-1.5 shadow-md active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Appointment</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["All", "Pending Review", "Confirmed", "In Bay", "Completed"].map((flt) => (
                <button
                  key={flt}
                  onClick={() => setBookingFilter(flt)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors border ${
                    bookingFilter === flt
                      ? "bg-white text-black border-white font-bold"
                      : "bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-white"
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>

            {/* Bookings List Cards */}
            <div className="space-y-3">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                        {b.id}
                      </span>
                      <span className="text-base font-bold text-white uppercase">{b.vehicle}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.status === "Completed"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : b.status === "In Bay"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>

                    <div className="text-xs text-[var(--accent-primary)] font-medium">
                      Treatment: {b.service}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-normal">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <strong className="text-zinc-200">{b.name}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <a href={`tel:${b.phone}`} className="hover:text-white underline">
                          {b.phone}
                        </a>
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{b.email}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Arrival: {b.date}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] flex-shrink-0">
                    <div className="text-right pr-2">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase block">Est. Investment</span>
                      <span className="text-lg font-black font-mono text-white">{b.price}</span>
                    </div>

                    <select
                      value={b.status}
                      onChange={(e) =>
                        handleUpdateBookingStatus(b.id, e.target.value as BookingRecord["status"])
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#111420] border border-white/15 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Bay">In Bay</option>
                      <option value="Curing & QC">Curing & QC</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      title="Delete booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: New Appointment Registration */}
            {isNewBookingModal && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="relative w-full max-w-lg rounded-2xl glass-panel p-6 sm:p-7 border border-white/20 bg-[#0c0e17] shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black uppercase text-white">Create Intake Appointment</h3>
                    <button
                      onClick={() => setIsNewBookingModal(false)}
                      className="text-zinc-400 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateBooking} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Client Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={newBookingForm.name}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, name: e.target.value })}
                          placeholder="e.g. Christian Horner"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Phone Number
                        </label>
                        <input
                          required
                          type="tel"
                          value={newBookingForm.phone}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          value={newBookingForm.email}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, email: e.target.value })}
                          placeholder="client@concierge.com"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Vehicle Specification
                        </label>
                        <input
                          required
                          type="text"
                          value={newBookingForm.vehicle}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, vehicle: e.target.value })}
                          placeholder="e.g. 2024 Porsche 911 GT3 RS"
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Service Package
                        </label>
                        <select
                          value={newBookingForm.service}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, service: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#141824] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        >
                          {config.services.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title} ({s.price})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase text-zinc-300 block mb-1">
                          Arrival Date
                        </label>
                        <input
                          required
                          type="date"
                          value={newBookingForm.date}
                          onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                      <button
                        type="button"
                        onClick={() => setIsNewBookingModal(false)}
                        className="px-4 py-2 rounded-xl border border-white/20 text-xs font-semibold text-zinc-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl font-bold uppercase text-xs text-black shadow-md"
                        style={{ background: "var(--accent-gradient)" }}
                      >
                        Save Booking
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 3: SERVICES CRUD */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase text-white">Studio Service Catalog</h3>
                <p className="text-xs text-zinc-400">
                  Configure packages, pricing, durations, features checklist, and badges.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService({
                    id: `srv-${Date.now()}`,
                    title: "",
                    subtitle: "",
                    category: "Ceramic Coating",
                    duration: "2-3 Days",
                    price: "$1,800",
                    description: "",
                    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
                    features: ["Self-Healing Topcoat", "Hydrophobic Barrier"],
                    badge: "POPULAR",
                    popular: true,
                  });
                  setIsNewService(true);
                }}
                className="px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center gap-1.5 shadow-md active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.services.map((srv) => (
                <div
                  key={srv.id}
                  className="glass-panel rounded-2xl border border-white/10 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--accent-primary)] mb-1">
                      <span>{srv.category}</span>
                      <span className="font-bold text-white font-mono">{srv.price}</span>
                    </div>

                    <h4 className="text-base font-bold text-white uppercase mb-1">{srv.title}</h4>
                    <p className="text-xs text-zinc-400 mb-4 line-clamp-2">{srv.description}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => {
                        setEditingService(srv);
                        setIsNewService(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3 h-3 text-[var(--accent-primary)]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${srv.title}"?`)) {
                          deleteService(srv.id);
                          showToast("Service deleted.");
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
                <div className="relative w-full max-w-xl rounded-2xl glass-panel p-6 sm:p-7 border border-white/20 bg-[#0c0e17] shadow-2xl my-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black uppercase text-white">
                      {isNewService ? "Create New Service Package" : `Edit: ${editingService.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingService(null)}
                      className="text-zinc-400 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Package Title</label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Starting Price</label>
                        <input
                          type="text"
                          value={editingService.price}
                          onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Category</label>
                        <input
                          type="text"
                          value={editingService.category}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Duration</label>
                        <input
                          type="text"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Photo Image URL</label>
                      <input
                        type="url"
                        value={editingService.image}
                        onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Features (One per line)</label>
                      <textarea
                        rows={3}
                        value={editingService.features.join("\n")}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            features: e.target.value.split("\n").filter((l) => l.trim()),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-xl border border-white/20 text-zinc-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (isNewService) {
                            addService(editingService);
                            showToast("New service created.");
                          } else {
                            updateService(editingService.id, editingService);
                            showToast("Service updated.");
                          }
                          setEditingService(null);
                        }}
                        className="px-5 py-2 rounded-xl font-bold uppercase text-black"
                        style={{ background: "var(--accent-gradient)" }}
                      >
                        Save Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 4: PROJECTS SHOWCASE CRUD */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase text-white">Curated Portfolio Archive</h3>
                <p className="text-xs text-zinc-400">
                  Manage exotic builds, client showcase galleries, and gloss indexes.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: `prj-${Date.now()}`,
                    title: "",
                    carModel: "",
                    category: "Porsche",
                    year: "2024",
                    treatment: "Full PPF Armor & 5-Year Ceramic Matrix Shield",
                    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
                    glossRating: "98.4 GU",
                    tags: ["PPF", "Ceramic"],
                  });
                  setIsNewProject(true);
                }}
                className="px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center gap-1.5 shadow-md active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.projects.map((prj) => (
                <div
                  key={prj.id}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-44 w-full relative bg-black/60">
                    <img src={prj.image} alt={prj.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-[var(--accent-primary)] font-bold">
                      {prj.glossRating}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-zinc-400 mb-0.5">
                        {prj.category} • {prj.year}
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase mb-1">{prj.title}</h4>
                      <p className="text-xs text-zinc-300 line-clamp-2 mb-3">{prj.treatment}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
                      <button
                        onClick={() => {
                          setEditingProject(prj);
                          setIsNewProject(false);
                        }}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs text-white flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3 text-[var(--accent-primary)]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${prj.title}"?`)) {
                            deleteProject(prj.id);
                            showToast("Project deleted.");
                          }
                        }}
                        className="p-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="relative w-full max-w-xl rounded-2xl glass-panel p-6 sm:p-7 border border-white/20 bg-[#0c0e17] shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-black uppercase text-white">
                      {isNewProject ? "Add Vehicle to Portfolio" : `Edit: ${editingProject.title}`}
                    </h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-zinc-400 hover:text-white text-xs font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Project Title</label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Car Model</label>
                        <input
                          type="text"
                          value={editingProject.carModel}
                          onChange={(e) => setEditingProject({ ...editingProject, carModel: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Brand Filter</label>
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Model Year</label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold uppercase text-zinc-300 block mb-1">Gloss Index (GU)</label>
                        <input
                          type="text"
                          value={editingProject.glossRating}
                          onChange={(e) => setEditingProject({ ...editingProject, glossRating: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Image URL</label>
                      <input
                        type="url"
                        value={editingProject.image}
                        onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Applied Treatments Detail</label>
                      <textarea
                        rows={2}
                        value={editingProject.treatment}
                        onChange={(e) => setEditingProject({ ...editingProject, treatment: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl border border-white/20 text-zinc-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (isNewProject) {
                            addProject(editingProject);
                            showToast("Project added.");
                          } else {
                            updateProject(editingProject.id, editingProject);
                            showToast("Project updated.");
                          }
                          setEditingProject(null);
                        }}
                        className="px-5 py-2 rounded-xl font-bold uppercase text-black"
                        style={{ background: "var(--accent-gradient)" }}
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 5: REVIEWS CRUD */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase text-white">Client Feedback & Reputation</h3>
                <p className="text-xs text-zinc-400">
                  Moderate collector testimonials, platform source tags, and client car models.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingReview({
                    id: `rev-${Date.now()}`,
                    name: "",
                    role: "Supercar Owner",
                    car: "Porsche 911 GT3",
                    comment: "",
                    rating: 5,
                    verified: true,
                    platform: "Google Business",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                    date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                  });
                  setIsNewReview(true);
                }}
                className="px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center gap-1.5 shadow-md active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {config.testimonials.map((rev) => (
                <div key={rev.id} className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-[var(--accent-primary)] text-xs">{"★".repeat(rev.rating)}</div>
                      {rev.platform && (
                        <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                          {rev.platform}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-300 italic mb-4 font-normal">&ldquo;{rev.comment}&rdquo;</p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white uppercase">{rev.name}</div>
                      <div className="text-[11px] text-[var(--accent-primary)] font-mono">{rev.car}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete review from "${rev.name}"?`)) {
                          deleteTestimonial(rev.id);
                          showToast("Review deleted.");
                        }
                      }}
                      className="p-1 rounded text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 6: MENUS & NAVIGATION CRUD */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "menus" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black uppercase text-white">Navigation Menus Management</h3>
                <p className="text-xs text-zinc-400">
                  Add, edit, reorder, or remove navigation links on desktop and mobile menus.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMenu({
                    id: `nav-${Date.now()}`,
                    label: "",
                    href: "#",
                    order: config.navItems.length + 1,
                    isVisible: true,
                  });
                  setIsNewMenu(true);
                }}
                className="px-4 py-2 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center gap-1.5 shadow-md active:scale-95"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Nav Link</span>
              </button>
            </div>

            <div className="space-y-3">
              {config.navItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-[var(--accent-primary)] font-bold">
                      #
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white uppercase">{item.label}</div>
                      <div className="text-xs text-zinc-400 font-mono">{item.href}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingMenu(item);
                        setIsNewMenu(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-xs text-white flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3 text-[var(--accent-primary)]" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove navigation item "${item.label}"?`)) {
                          deleteMenuItem(item.id);
                          showToast("Menu item removed.");
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Edit Modal */}
            {editingMenu && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="relative w-full max-w-md rounded-2xl glass-panel p-6 border border-white/20 bg-[#0c0e17] shadow-2xl">
                  <h3 className="text-base font-bold uppercase text-white mb-4">
                    {isNewMenu ? "New Navigation Link" : `Edit: ${editingMenu.label}`}
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Menu Label</label>
                      <input
                        type="text"
                        value={editingMenu.label}
                        onChange={(e) => setEditingMenu({ ...editingMenu, label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold uppercase text-zinc-300 block mb-1">Target Href / Anchor</label>
                      <input
                        type="text"
                        value={editingMenu.href}
                        onChange={(e) => setEditingMenu({ ...editingMenu, href: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
                      <button
                        onClick={() => setEditingMenu(null)}
                        className="px-4 py-2 rounded-xl border border-white/20 text-zinc-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (isNewMenu) {
                            addMenuItem(editingMenu);
                            showToast("Nav item added.");
                          } else {
                            updateMenuItem(editingMenu.id, editingMenu);
                            showToast("Nav item updated.");
                          }
                          setEditingMenu(null);
                        }}
                        className="px-5 py-2 rounded-xl font-bold uppercase text-black"
                        style={{ background: "var(--accent-gradient)" }}
                      >
                        Save Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 7: PHOTOS & MEDIA MANAGEMENT */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "media" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-black uppercase text-white">Media Library & Photography</h3>
              <p className="text-xs text-zinc-400">
                Replace supercar imagery across the hero showcase and service visualizer.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold uppercase text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Primary Hero Showcase Vehicle</span>
              </h4>

              {/* Current Hero Image Live Preview */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-black/60 mb-5 border border-white/15">
                <img
                  src={config.heroSupercarImage}
                  alt="Current hero preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 text-[10px] font-mono text-zinc-300 border border-white/10">
                  CURRENT LIVE HERO ASSET
                </div>
              </div>

              {/* Custom URL Input */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase text-zinc-300 block mb-1">
                  Custom Hero Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={config.heroSupercarImage}
                    onChange={(e) => updateSiteConfig({ heroSupercarImage: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono"
                  />
                  <button
                    onClick={() => showToast("Hero photo updated!")}
                    className="px-4 py-2 rounded-xl font-bold uppercase text-xs text-black"
                    style={{ background: "var(--accent-gradient)" }}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* 1-Click Exotic Presets */}
              <h5 className="text-xs font-bold uppercase text-zinc-400 mb-3">1-Click Curated Supercar Presets</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {CURATED_SUPERCAR_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      updateSiteConfig({ heroSupercarImage: preset.url });
                      showToast(`Hero updated to ${preset.label}!`);
                    }}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-[var(--accent-primary)] transition-all p-2 bg-white/[0.02] flex flex-col"
                  >
                    <div className="h-28 w-full rounded-lg overflow-hidden bg-black/60 mb-2">
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-300 group-hover:text-white truncate">
                      {preset.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 8: BRAND IDENTITY & TEXT CUSTOMIZATION */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "identity" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold uppercase text-white mb-4">Hero Text & Headline Customization</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Hero Badge Text</label>
                  <input
                    type="text"
                    value={config.heroBadge}
                    onChange={(e) => updateSiteConfig({ heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Headline Part 1</label>
                  <input
                    type="text"
                    value={config.heroTitleLine1}
                    onChange={(e) => updateSiteConfig({ heroTitleLine1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Shimmer Highlight Word</label>
                  <input
                    type="text"
                    value={config.heroTitleHighlight}
                    onChange={(e) => updateSiteConfig({ heroTitleHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Headline Subtitle (Part 2)</label>
                  <input
                    type="text"
                    value={config.heroTitleLine2}
                    onChange={(e) => updateSiteConfig({ heroTitleLine2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Hero Paragraph Description</label>
                  <textarea
                    rows={3}
                    value={config.heroDescription}
                    onChange={(e) => updateSiteConfig({ heroDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
              </div>

              <h3 className="text-base font-bold uppercase text-white mb-4 pt-4 border-t border-white/[0.08]">
                Studio Identity & Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Studio Brand Name</label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Concierge Phone</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Concierge Email</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateSiteConfig({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-bold uppercase text-zinc-300 block mb-1">Facility Cleanroom Address</label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateSiteConfig({ address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* TAB 9: THEME, COLOR & TYPOGRAPHY PALETTE */}
        {/* ----------------------------------------------------------- */}
        {activeTab === "appearance" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
              <h3 className="text-base font-bold uppercase text-white mb-4">Color Palette & Accent Lighting</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { id: "apex-combo", label: "Emerald Mint (Hero)", hex: "linear-gradient(135deg, #5EE07C, #34d399, #10b981)" },
                  { id: "emerald", label: "Pure Mint (#5EE07C)", hex: "#5EE07C" },
                  { id: "cyan", label: "Laguna Cyan", hex: "#06b6d4" },
                  { id: "red", label: "Apex Red", hex: "#ef4444" },
                  { id: "amber", label: "Monza Amber", hex: "#f59e0b" },
                  { id: "violet", label: "Stealth Titanium", hex: "#8b5cf6" },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      updateTheme({ accent: th.id as AccentColorTheme });
                      showToast(`Accent theme set to ${th.label}`);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      config.theme.accent === th.id
                        ? "bg-white/[0.08] border-white text-white font-bold shadow-lg"
                        : "glass-panel border-white/[0.08] text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full mb-2"
                      style={{ background: th.hex }}
                    />
                    <span className="text-xs uppercase block">{th.label}</span>
                  </button>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-2">Typography Hierarchy Scale</h4>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: "normal", label: "Standard Luxury" },
                  { id: "compact", label: "Motorsport Compact" },
                  { id: "spacious", label: "Bold Display" },
                ].map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      updateTheme({ fontSize: sc.id as FontSizeScale });
                      showToast(`Typography scale updated to ${sc.label}`);
                    }}
                    className={`p-3 rounded-xl border text-center text-xs uppercase font-semibold ${
                      config.theme.fontSize === sc.id
                        ? "bg-white text-black font-bold border-white"
                        : "glass-panel border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase text-zinc-300 mb-2">Background Effects</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    updateTheme({ enableGridBackground: !config.theme.enableGridBackground });
                    showToast("Cyber grid toggle updated.");
                  }}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                    config.theme.enableGridBackground
                      ? "bg-white/10 border-white text-white"
                      : "bg-white/[0.02] border-white/10 text-zinc-400"
                  }`}
                >
                  Cyber Grid: {config.theme.enableGridBackground ? "ENABLED" : "DISABLED"}
                </button>
                <button
                  onClick={() => {
                    updateTheme({ enableAmbientGlow: !config.theme.enableAmbientGlow });
                    showToast("Ambient glow toggle updated.");
                  }}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                    config.theme.enableAmbientGlow
                      ? "bg-white/10 border-white text-white"
                      : "bg-white/[0.02] border-white/10 text-zinc-400"
                  }`}
                >
                  Ambient Glow: {config.theme.enableAmbientGlow ? "ENABLED" : "DISABLED"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
