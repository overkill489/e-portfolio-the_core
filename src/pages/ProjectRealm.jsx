import { useState } from "react";
import { ArrowLeft, Layers } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ProjectInspection from "../components/ProjectInspection";
import { projects } from "../data/projects";

export default function ProjectsRealm({ onBack, initialProject = null }) {
  const [selectedProject, setSelectedProject] = useState(initialProject);

  const activeProject = projects.find(
    (project) => project.id === selectedProject,
  );

  if (activeProject) {
    return (
      <ProjectInspection
        key={activeProject.id}
        project={activeProject}
        onBack={() => setSelectedProject(null)}
      />
    );
  }

  return (
    <section className="relative z-10 min-h-screen overflow-hidden px-6 pb-20 pt-32 text-white sm:px-12">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>

        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3 text-cyan-400">
            <Layers size={16} />

            <span className="text-[10px] tracking-[0.35em]">
              REALM 01 / PROJECT ARCHIVE
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            THE BUILDS<span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Every project begins with a problem. Explore the applications,
            systems, and experiences I've built to solve them.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[10px] tracking-[0.25em] text-gray-500">
            SELECT A PROJECT TO INSPECT
          </span>

          <span className="text-xs text-cyan-400">
            {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              active={selectedProject === project.id}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
