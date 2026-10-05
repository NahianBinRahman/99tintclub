"use client";

import React, { useState } from "react";
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
  Sliders,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

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

  const [activeTab, setActiveTab] = useState<
    "general" | "theme" | "menus" | "services" | "projects" | "reviews"
  >("general");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals / Editing States
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isNewService, setIsNewService] = useState<boolean>(false);

  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);

  const [editingMenu, setEditingMenu] = useState<NavItem | null>(null);
  const [isNewMenu, setIsNewMenu] = useState<boolean>(false);

  const [editingReview, setEditingReview] = useState<TestimonialItem | null>(null);
  const [isNewReview, setIsNewReview] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    const jsonStr = exportConfigJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `outumn-config-${Date.now()}.json`;
    a.click();
    showToast("Configuration successfully exported as JSON file.");
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
    if (confirm("Are you sure you want to reset all site data to original factory defaults?")) {
      resetToDefaults();
      showToast("Reset to factory defaults completed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-zinc-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl glass-panel border border-[var(--accent-primary)]/50 shadow-2xl text-xs font-bold text-white flex items-center gap-2 animate-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#090b12]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Live Site</span>
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-primary)]/15 border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-black uppercase tracking-wider text-white">
                {config.brandName} Studio CMS
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <label className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import JSON</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          <button
            onClick={handleExport}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export JSON</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
            title="Reset site to original defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black flex items-center gap-1.5 shadow-md hover:opacity-90"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.08] no-scrollbar">
          {[
            { id: "general", label: "General & Hero", icon: Sliders },
            { id: "theme", label: "Theme & Visuals", icon: SlidersHorizontal },
            { id: "menus", label: "Navigation Menus", icon: MenuIcon },
            { id: "services", label: "Services CRUD", icon: Wrench },
            { id: "projects", label: "Projects Showcase", icon: Car },
            { id: "reviews", label: "Client Reviews", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "glass-panel border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[var(--accent-primary)]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: GENERAL & HERO */}
        {activeTab === "general" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <h3 className="text-lg font-black uppercase text-white mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Brand Identity & Hero Copy</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Studio Brand Name
                  </label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => updateSiteConfig({ brandName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Studio Tagline
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateSiteConfig({ tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Badge Text
                  </label>
                  <input
                    type="text"
                    value={config.heroBadge}
                    onChange={(e) => updateSiteConfig({ heroBadge: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Highlight Text (Shimmering)
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleHighlight}
                    onChange={(e) => updateSiteConfig({ heroTitleHighlight: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Title Line 1
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleLine1}
                    onChange={(e) => updateSiteConfig({ heroTitleLine1: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Title Line 2
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleLine2}
                    onChange={(e) => updateSiteConfig({ heroTitleLine2: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Description
                  </label>
                  <textarea
                    rows={3}
                    value={config.heroDescription}
                    onChange={(e) => updateSiteConfig({ heroDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Hero Supercar Image URL
                  </label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="url"
                      value={config.heroSupercarImage}
                      onChange={(e) => updateSiteConfig({ heroSupercarImage: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none font-mono"
                    />
                    <img
                      src={config.heroSupercarImage}
                      alt="Hero Preview"
                      className="w-16 h-12 rounded-xl object-cover border border-white/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & Location Settings */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
              <h3 className="text-lg font-black uppercase text-white mb-6">
                Location & Concierge Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => updateSiteConfig({ phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => updateSiteConfig({ email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Studio Facility Address
                  </label>
                  <input
                    type="text"
                    value={config.address}
                    onChange={(e) => updateSiteConfig({ address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={config.workingHours}
                    onChange={(e) => updateSiteConfig({ workingHours: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-[var(--accent-primary)] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THEME & VISUALS */}
        {activeTab === "theme" && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-8 animate-in fade-in duration-200">
            <div>
              <h3 className="text-lg font-black uppercase text-white mb-2 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[var(--accent-primary)]" />
                <span>Cyberpunk Accent Color</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Dynamically re-colors every glow, border, gradient button, and highlight in real-time.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  {
                    key: "apex-combo",
                    name: "Apex Tri-Combo",
                    gradient: "linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #06b6d4 100%)",
                    badge: "Opt 1+2+3 Combo",
                  },
                  { key: "red", name: "Velocity Red", color: "#ef4444", badge: "Rosso Corsa (Opt 3)" },
                  { key: "amber", name: "Solar Amber", color: "#f59e0b", badge: "Automotive Gold (Opt 1)" },
                  { key: "cyan", name: "Cyber Cyan", color: "#06b6d4", badge: "Electric Neon (Opt 2)" },
                  { key: "violet", name: "Hyper Violet", color: "#8b5cf6", badge: "Ultraviolet" },
                  { key: "emerald", name: "Apex Emerald", color: "#10b981", badge: "Verde Motorsport" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {
                      updateTheme({ accent: t.key as AccentColorTheme });
                      showToast(`Accent updated to ${t.name}`);
                    }}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                      config.theme.accent === t.key
                        ? "bg-white/[0.08] border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-[1.02]"
                        : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-5 h-5 rounded-full"
                        style={{ background: (t as any).gradient || t.color }}
                      />
                      {config.theme.accent === t.key && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">{t.name}</div>
                      <div className="text-[10px] text-zinc-400">{t.badge}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Scale */}
            <div className="pt-6 border-t border-white/[0.08]">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                Font Scale Sizing
              </h4>
              <p className="text-xs text-zinc-400 mb-4">
                Adjust overall typography density across the interface.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                {(["compact", "normal", "spacious"] as FontSizeScale[]).map((scale) => (
                  <button
                    key={scale}
                    onClick={() => {
                      updateTheme({ fontSize: scale });
                      showToast(`Font scale set to ${scale}`);
                    }}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase transition-colors ${
                      config.theme.fontSize === scale
                        ? "bg-white text-black border-white shadow-md font-extrabold"
                        : "bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white"
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Atmosphere Toggles */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                onClick={() =>
                  updateTheme({ enableGridBackground: !config.theme.enableGridBackground })
                }
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer flex items-center justify-between select-none"
              >
                <div>
                  <div className="text-xs font-bold text-white uppercase">Futuristic Cyber Grid</div>
                  <div className="text-[11px] text-zinc-400">
                    Displays background vector blueprint grid lines
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.theme.enableGridBackground}
                  onChange={() => {}}
                  className="w-5 h-5 text-[var(--accent-primary)] rounded"
                />
              </div>

              <div
                onClick={() =>
                  updateTheme({ enableAmbientGlow: !config.theme.enableAmbientGlow })
                }
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer flex items-center justify-between select-none"
              >
                <div>
                  <div className="text-xs font-bold text-white uppercase">Ambient Glow Orbs</div>
                  <div className="text-[11px] text-zinc-400">
                    Dynamic background blurred lighting spheres
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={config.theme.enableAmbientGlow}
                  onChange={() => {}}
                  className="w-5 h-5 text-[var(--accent-primary)] rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MENUS CRUD */}
        {activeTab === "menus" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <MenuIcon className="w-5 h-5 text-[var(--accent-primary)]" />
                  <span>Navigation Menu Links</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage links, labels, ordering, and visibility on the header and mobile drawer.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMenu({
                    id: "",
                    label: "",
                    href: "#",
                    order: config.navItems.length + 1,
                    isVisible: true,
                  });
                  setIsNewMenu(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Menu Item</span>
              </button>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] border-b border-white/[0.08] text-zinc-400 uppercase font-mono">
                  <tr>
                    <th className="p-4">Order</th>
                    <th className="p-4">Label</th>
                    <th className="p-4">Link (Href)</th>
                    <th className="p-4">Visibility</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {config.navItems
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 font-mono font-bold text-[var(--accent-primary)]">
                          {item.order}
                        </td>
                        <td className="p-4 font-bold text-white uppercase">{item.label}</td>
                        <td className="p-4 font-mono text-zinc-400">{item.href}</td>
                        <td className="p-4">
                          <button
                            onClick={() =>
                              updateMenuItem(item.id, { isVisible: !item.isVisible })
                            }
                            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase ${
                              item.isVisible
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            }`}
                          >
                            {item.isVisible ? "Visible" : "Hidden"}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingMenu(item);
                              setIsNewMenu(false);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete menu item "${item.label}"?`)) {
                                deleteMenuItem(item.id);
                                showToast(`Deleted "${item.label}"`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Menu Edit Modal */}
            {editingMenu && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/20 shadow-2xl">
                  <h4 className="text-base font-black uppercase text-white mb-4">
                    {isNewMenu ? "Add Navigation Item" : "Edit Navigation Item"}
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase font-bold text-zinc-400 block mb-1">
                        Menu Label
                      </label>
                      <input
                        type="text"
                        value={editingMenu.label}
                        onChange={(e) => setEditingMenu({ ...editingMenu, label: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-bold text-zinc-400 block mb-1">
                        Anchor / Link Target (e.g. #services or /about)
                      </label>
                      <input
                        type="text"
                        value={editingMenu.href}
                        onChange={(e) => setEditingMenu({ ...editingMenu, href: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-bold text-zinc-400 block mb-1">
                        Order Index (1, 2, 3...)
                      </label>
                      <input
                        type="number"
                        value={editingMenu.order}
                        onChange={(e) =>
                          setEditingMenu({ ...editingMenu, order: Number(e.target.value) })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingMenu(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isNewMenu) {
                          addMenuItem(editingMenu);
                          showToast(`Created menu item "${editingMenu.label}"`);
                        } else {
                          updateMenuItem(editingMenu.id, editingMenu);
                          showToast(`Updated menu item "${editingMenu.label}"`);
                        }
                        setEditingMenu(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase text-black"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      Save Item
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SERVICES CRUD */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-[var(--accent-primary)]" />
                  <span>Bespoke Detailing Services ({config.services.length})</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Add, update, or remove studio packages, pricing, durations, and feature checklists.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService({
                    id: "",
                    title: "",
                    subtitle: "",
                    category: "Ceramic Coating",
                    price: "$950",
                    duration: "24 Hours",
                    description: "",
                    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
                    features: ["Warranty Included", "Nanotech Formula"],
                    popular: false,
                  });
                  setIsNewService(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.services.map((srv) => (
                <div
                  key={srv.id}
                  className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                      <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/70 text-white border border-white/20">
                        {srv.category}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-base font-black uppercase text-white">{srv.title}</h4>
                      <span className="text-sm font-black font-mono text-[var(--accent-primary)]">
                        {srv.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{srv.description}</p>
                    <div className="text-[11px] font-mono text-zinc-500 mb-4">
                      Duration: {srv.duration} • {srv.features.length} features
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingService(srv);
                        setIsNewService(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete service "${srv.title}"?`)) {
                          deleteService(srv.id);
                          showToast(`Deleted "${srv.title}"`);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit / Create Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl my-auto animate-in zoom-in-95">
                  <h4 className="text-lg font-black uppercase text-white mb-6">
                    {isNewService ? "Add New Service Package" : "Edit Service Package"}
                  </h4>

                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) =>
                            setEditingService({ ...editingService, title: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Category
                        </label>
                        <select
                          value={editingService.category}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-[#121622] border border-white/10 text-white text-xs focus:outline-none"
                        >
                          <option value="Ceramic Coating">Ceramic Coating</option>
                          <option value="PPF Wraps">PPF Wraps</option>
                          <option value="Paint Correction">Paint Correction</option>
                          <option value="Interior Spa">Interior Spa</option>
                          <option value="Window Tint">Window Tint</option>
                          <option value="Full Package">Full Package</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Price Display (e.g. $1,200)
                        </label>
                        <input
                          type="text"
                          value={editingService.price}
                          onChange={(e) =>
                            setEditingService({ ...editingService, price: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Turnaround Duration
                        </label>
                        <input
                          type="text"
                          value={editingService.duration}
                          onChange={(e) =>
                            setEditingService({ ...editingService, duration: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={editingService.image}
                        onChange={(e) =>
                          setEditingService({ ...editingService, image: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={3}
                        value={editingService.description}
                        onChange={(e) =>
                          setEditingService({ ...editingService, description: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Features (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={editingService.features.join("\n")}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            features: e.target.value.split("\n").filter((f) => f.trim().length > 0),
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingService(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isNewService) {
                          addService(editingService);
                          showToast(`Added service "${editingService.title}"`);
                        } else {
                          updateService(editingService.id, editingService);
                          showToast(`Updated service "${editingService.title}"`);
                        }
                        setEditingService(null);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-black"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      Save Service
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROJECTS CRUD */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <Car className="w-5 h-5 text-[var(--accent-primary)]" />
                  <span>Curated Projects Archive ({config.projects.length})</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage completed exotics, gloss ratings, car models, and high-res imagery.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    id: "",
                    title: "",
                    category: "Porsche",
                    carModel: "",
                    year: "2024",
                    glossRating: "99.8 GU",
                    treatment: "Full PPF + Ceramic",
                    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
                    tags: ["Ceramic", "PPF"],
                  });
                  setIsNewProject(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/80 text-[var(--accent-primary)] border border-white/20">
                        {proj.glossRating}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono uppercase text-zinc-400 mb-0.5">
                      {proj.category} • {proj.year}
                    </div>
                    <h4 className="text-base font-black uppercase text-white mb-1">{proj.title}</h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">{proj.treatment}</p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2 mt-4">
                    <button
                      onClick={() => {
                        setEditingProject(proj);
                        setIsNewProject(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-200 flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          showToast(`Deleted "${proj.title}"`);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit / Create Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-xl glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl my-auto animate-in zoom-in-95">
                  <h4 className="text-lg font-black uppercase text-white mb-6">
                    {isNewProject ? "Add New Vehicle Showcase" : "Edit Vehicle Showcase"}
                  </h4>

                  <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Project Title
                        </label>
                        <input
                          type="text"
                          value={editingProject.title}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, title: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Brand Category
                        </label>
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, category: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Car Model
                        </label>
                        <input
                          type="text"
                          value={editingProject.carModel}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, carModel: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Model Year
                        </label>
                        <input
                          type="text"
                          value={editingProject.year}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, year: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Gloss Rating (GU)
                        </label>
                        <input
                          type="text"
                          value={editingProject.glossRating}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, glossRating: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        High-Res Image URL
                      </label>
                      <input
                        type="url"
                        value={editingProject.image}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Applied Treatment
                      </label>
                      <textarea
                        rows={3}
                        value={editingProject.treatment}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, treatment: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isNewProject) {
                          addProject(editingProject);
                          showToast(`Added project "${editingProject.title}"`);
                        } else {
                          updateProject(editingProject.id, editingProject);
                          showToast(`Updated project "${editingProject.title}"`);
                        }
                        setEditingProject(null);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-black"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      Save Project
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: REVIEWS CRUD */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[var(--accent-primary)]" />
                  <span>VIP Reviews & Testimonials ({config.testimonials.length})</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage client testimonials, vehicle ownership badges, ratings, and quotes.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingReview({
                    id: "",
                    name: "",
                    role: "Supercar Owner",
                    car: "Ferrari 488 Pista",
                    rating: 5,
                    comment: "",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                    date: "Recent",
                  });
                  setIsNewReview(true);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2"
                style={{ background: "var(--accent-gradient)" }}
              >
                <Plus className="w-4 h-4" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.testimonials.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <div className="text-sm font-bold text-white uppercase">{rev.name}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{rev.car}</div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 italic mb-4">&ldquo;{rev.comment}&rdquo;</p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--accent-primary)] font-bold">
                      {rev.rating}.0 / 5.0 Stars
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingReview(rev);
                          setIsNewReview(false);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete review from "${rev.name}"?`)) {
                            deleteTestimonial(rev.id);
                            showToast(`Deleted review from "${rev.name}"`);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Review Edit Modal */}
            {editingReview && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
                  <h4 className="text-lg font-black uppercase text-white mb-6">
                    {isNewReview ? "Add VIP Review" : "Edit VIP Review"}
                  </h4>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={editingReview.name}
                          onChange={(e) =>
                            setEditingReview({ ...editingReview, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                          Vehicle Owned
                        </label>
                        <input
                          type="text"
                          value={editingReview.car}
                          onChange={(e) =>
                            setEditingReview({ ...editingReview, car: e.target.value })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Avatar Image URL
                      </label>
                      <input
                        type="url"
                        value={editingReview.avatar}
                        onChange={(e) =>
                          setEditingReview({ ...editingReview, avatar: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs font-mono focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase text-zinc-400 block mb-1">
                        Testimonial Comment
                      </label>
                      <textarea
                        rows={4}
                        value={editingReview.comment}
                        onChange={(e) =>
                          setEditingReview({ ...editingReview, comment: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingReview(null)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isNewReview) {
                          addTestimonial(editingReview);
                          showToast(`Added review from "${editingReview.name}"`);
                        } else {
                          updateTestimonial(editingReview.id, editingReview);
                          showToast(`Updated review from "${editingReview.name}"`);
                        }
                        setEditingReview(null);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold uppercase text-black"
                      style={{ background: "var(--accent-gradient)" }}
                    >
                      Save Review
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
