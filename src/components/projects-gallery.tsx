"use client";

import React, { useState } from "react";
import { useSiteConfig } from "@/context/site-context";
import { ProjectItem } from "@/types";
import { Eye, Sparkles, X, ChevronRight, CheckCircle2 } from "lucide-react";

export const ProjectsGallery: React.FC = () => {
  const { config } = useSiteConfig();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterOptions = ["All", "Porsche", "Ferrari", "Lamborghini", "Mercedes-AMG", "McLaren", "BMW M"];

  const filteredProjects =
    activeFilter === "All"
      ? config.projects
      : config.projects.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <section id="projects" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#1A1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CURATED HYPERCAR ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              MASTERPIECE <span className="shimmer-text">PORTFOLIO</span>
            </h2>
          </div>

          <p className="text-zinc-300 text-sm max-w-md mt-4 md:mt-0 font-normal leading-relaxed">
            A testament to surgical precision. Explore exotics and track weapons finished to concours
            standards in our sterile detailing facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterOptions.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveFilter(brand)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                activeFilter === brand
                  ? "bg-[#5EE07C] text-black border-[#5EE07C] shadow-[0_2px_12px_rgba(94,224,124,0.35)] font-bold"
                  : "bg-[#252525] text-zinc-300 border-white/[0.08] hover:border-white/20 hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/25 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              {/* Image Preview with Hover Reveal */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-black/60 flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-transparent to-transparent opacity-85" />

                {/* Gloss Rating Badge with GU explanation */}
                <div
                  className="absolute top-3.5 right-3.5 backdrop-blur-md bg-black/75 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md cursor-help"
                  title="GU = Gloss Units (measurement of specular gloss reflectance under standard geometry)"
                >
                  <span className="text-[10px] font-mono text-zinc-400">GLOSS (?)</span>
                  <span className="text-xs font-black font-mono text-[var(--accent-primary)]">
                    {project.glossRating}
                  </span>
                </div>

                {/* Inspect Overlay on Hover */}
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-xs">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 backdrop-blur-md">
                    <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>View Specifications</span>
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span>{project.carModel}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold uppercase text-white group-hover:text-[var(--accent-primary)] transition-colors mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mb-4 line-clamp-2 font-normal leading-relaxed">
                    {project.treatment}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Specification Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-3xl rounded-2xl glass-panel border border-white/20 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="relative h-72 sm:h-96 w-full">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-[var(--accent-primary)] font-bold block mb-1">
                    {selectedProject.category} • {selectedProject.year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <div
                  className="backdrop-blur-md bg-black/80 border border-white/20 px-3.5 py-2 rounded-xl text-right cursor-help"
                  title="GU = Gloss Units (measurement of specular gloss reflectance)"
                >
                  <div className="text-[10px] font-mono text-zinc-400">Gloss Index (?)</div>
                  <div className="text-base font-black text-[var(--accent-primary)] font-mono">
                    {selectedProject.glossRating}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Specs */}
            <div className="p-6 sm:p-8 bg-[#252525]">
              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-300 mb-2">
                Applied Bespoke Treatments
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed mb-6 font-normal">
                {selectedProject.treatment}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Vehicle Model</span>
                  <span className="text-xs font-bold text-white">{selectedProject.carModel}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Installation Bay</span>
                  <span className="text-xs font-bold text-[#5EE07C]">Climate-Controlled</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">Applied Finish</span>
                  <span className="text-xs font-bold text-[var(--accent-primary)]">Ceramic / PPF Matrix</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-bold uppercase text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
