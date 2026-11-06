import EngineeringCaseStudy from "./EngineeringCaseStudy";
import { caseStudies } from "../data/caseStudies";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Code2,
  ExternalLink,
  Layers,
  Monitor,
  CheckCircle2,
  Cpu,
} from "lucide-react";

const baseTabs = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "technology", label: "Technology" },
];

export default function ProjectInspection({ project, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");

  const study = caseStudies[project.id];

  const tabs = study
    ? [...baseTabs, { id: "engineering", label: "Engineering" }]
    : baseTabs;

  const hasImage = project.id !== "weatherly" && Boolean(project.image);

  return (
    <section className="relative z-10 min-h-screen px-5 pb-20 pt-28 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[550px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,200,255,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">
          <button
            type="button"
            onClick={onBack}
            className="flex cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            <ArrowLeft size={18} />
            ALL PROJECTS
          </button>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            INSPECTION SYSTEM ONLINE
          </div>
        </div>

        <div className="mb-10">
          <p className="mb-4 text-[10px] tracking-[0.35em] text-cyan-400">
            THE CORE / PROJECT {project.number}
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {project.name}
            <span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-500">
            {project.category}
          </p>
        </div>

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,1fr)]">
          <div className="min-w-0 space-y-6">
            <div className="relative overflow-hidden border border-cyan-500/25 bg-[#07111b]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                </div>

                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-gray-500">
                  <Monitor size={13} />
                  PROJECT DISPLAY
                </div>
              </div>

              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-[#030810]">
                {hasImage ? (
                  <img
                    src={project.image}
                    alt={`${project.name} application screenshot`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-8">
                    <div
                      className="flex h-32 w-32 rotate-45 items-center justify-center border"
                      style={{ borderColor: project.accent }}
                    >
                      <Code2
                        size={54}
                        style={{
                          color: project.accent,
                          transform: "rotate(-45deg)",
                        }}
                      />
                    </div>

                    <span className="text-[10px] tracking-[0.3em] text-gray-500">
                      VISUAL PREVIEW UNAVAILABLE
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 border border-cyan-400/10" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
                <span className="text-[10px] tracking-[0.25em] text-gray-400">
                  VISUAL INSPECTION / {project.number}
                </span>

                <span className="text-[10px] tracking-widest text-cyan-500">
                  {hasImage ? "PREVIEW LOADED" : "NO SCREENSHOT"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-cyan-400 bg-cyan-500/10 px-6 py-4 text-xs tracking-widest text-cyan-300 transition-all duration-300 hover:bg-cyan-400 hover:text-black"
                >
                  <ExternalLink size={18} />
                  LAUNCH APPLICATION
                  <ArrowUpRight size={16} />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-white/20 px-6 py-4 text-xs tracking-widest text-gray-200 transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300"
                >
                  <Code2 size={18} />
                  VIEW SOURCE CODE
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.02] p-4">
                <Layers size={18} className="mb-4 text-cyan-400" />
                <p className="text-2xl font-semibold">
                  {String(project.features.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs text-gray-500">Key Features</p>
              </div>

              <div className="border border-white/10 bg-white/[0.02] p-4">
                <Cpu size={18} className="mb-4 text-cyan-400" />
                <p className="text-2xl font-semibold">
                  {String(project.technologies.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs text-gray-500">Technologies</p>
              </div>

              <div className="col-span-2 border border-white/10 bg-white/[0.02] p-4 sm:col-span-1">
                <CheckCircle2 size={18} className="mb-4 text-cyan-400" />
                <p className="text-lg font-semibold">
                  {project.live ? "Deployed" : "Project"}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  {project.live ? "Live Link Provided" : "In Development"}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 border border-white/10 bg-[#080e16]/90">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-wider">
                  PROJECT INTELLIGENCE
                </h2>

                <span className="text-[10px] tracking-widest text-cyan-400">
                  {project.number}
                </span>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Project information"
              className={`grid border-b border-white/10 ${
                study ? "grid-cols-4" : "grid-cols-3"
              }`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="project-inspection-panel"
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer border-b-2 px-2 py-5 text-[10px] tracking-wider transition-colors sm:text-xs ${
                    activeTab === tab.id
                      ? "border-cyan-400 bg-cyan-400/[0.07] text-cyan-300"
                      : "border-transparent text-gray-500 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div
              id="project-inspection-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="min-h-72 p-6 sm:p-8"
            >
              {activeTab === "overview" && (
                <div>
                  <p className="mb-5 text-[10px] tracking-[0.3em] text-cyan-400">
                    01 / OVERVIEW
                  </p>

                  <h3 className="text-2xl font-semibold">Behind the Build</h3>

                  <p className="mt-5 text-sm leading-8 text-gray-400">
                    {project.details}
                  </p>

                  <div className="mt-8 border-l-2 border-cyan-500/60 pl-5">
                    <p className="text-xs tracking-wider text-cyan-300">
                      PROJECT PURPOSE
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div>
                  <p className="mb-5 text-[10px] tracking-[0.3em] text-cyan-400">
                    02 / CAPABILITIES
                  </p>

                  <h3 className="mb-7 text-2xl font-semibold">Key Features</h3>

                  <div className="space-y-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={feature}
                        className="flex items-start gap-4 border-b border-white/5 pb-4"
                      >
                        <span className="text-xs text-cyan-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "technology" && (
                <div>
                  <p className="mb-5 text-[10px] tracking-[0.3em] text-cyan-400">
                    03 / TECHNOLOGY
                  </p>

                  <h3 className="mb-7 text-2xl font-semibold">
                    Technology Stack
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-cyan-500/20 bg-cyan-400/[0.05] px-4 py-3 text-xs text-cyan-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <p className="mt-8 text-sm leading-7 text-gray-500">
                    Technologies and tools used in the development of this
                    application.
                  </p>
                </div>
              )}

              {activeTab === "engineering" && study && (
                <EngineeringCaseStudy study={study} />
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 px-6 py-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

              <span className="text-[10px] tracking-[0.2em] text-cyan-500">
                INSPECTION READY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
