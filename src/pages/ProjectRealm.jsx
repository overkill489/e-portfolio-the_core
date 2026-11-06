import { ArrowLeft, ArrowUpRight, Code2, FolderCode } from "lucide-react";
import { projects } from "../data/projects";
import ProjectInspection from "../components/ProjectInspection";

export default function ProjectsRealm({
  onBack,
  initialProject = null,
  onSelectProject,
}) {
  const activeProject = projects.find(
    (project) => project.id === initialProject,
  );

  const openProject = (projectId) => {
    onSelectProject(projectId);
  };

  const backToProjects = () => {
    onSelectProject(null);
  };

  if (activeProject) {
    return (
      <ProjectInspection project={activeProject} onBack={backToProjects} />
    );
  }

  if (initialProject && !activeProject) {
    return (
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-center text-white">
        <FolderCode size={48} className="mb-6 text-cyan-400" />

        <p className="mb-4 text-xs tracking-[0.3em] text-cyan-400">
          PROJECT NOT FOUND
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          UNKNOWN PROJECT<span className="text-cyan-400">.</span>
        </h1>

        <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
          The requested project doesn't exist in the archive. Return to the
          gallery to explore my available work.
        </p>

        <button
          type="button"
          onClick={backToProjects}
          className="mt-9 flex cursor-pointer items-center gap-3 border border-cyan-400/50 px-6 py-4 text-xs tracking-[0.2em] text-cyan-300 transition-all hover:bg-cyan-400 hover:text-black"
        >
          <ArrowLeft size={17} />
          ALL PROJECTS
        </button>
      </section>
    );
  }

  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>

        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-cyan-400">
              <FolderCode size={18} />
              REALM 01 / PROJECT ARCHIVE
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              THE BUILDS<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
              Explore the applications I've built, the technologies behind them,
              and the engineering decisions that brought them to life.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
            PROJECT ARCHIVE ONLINE
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-5">
          <div className="flex items-center gap-3">
            <Code2 size={18} className="text-cyan-400" />

            <span className="text-xs tracking-[0.15em] text-gray-400">
              SELECT A PROJECT TO INSPECT
            </span>
          </div>

          <span className="text-xs tracking-[0.2em] text-gray-500">
            {String(projects.length).padStart(2, "0")} PROJECTS AVAILABLE
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const image = project.image || project.screenshot;
            const technologies = project.technologies || project.tech || [];

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => openProject(project.id)}
                aria-label={`Inspect ${project.name}`}
                className="group min-w-0 cursor-pointer overflow-hidden border border-white/10 bg-[#08111a] text-left transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.07)] focus-visible:outline-2 focus-visible:outline-cyan-300"
              >
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-white/10 bg-[#050c14]">
                  {image ? (
                    <img
                      src={image}
                      alt={`${project.name} application preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-5">
                      <div className="relative flex h-24 w-24 items-center justify-center border border-cyan-500/30 bg-cyan-500/[0.05]">
                        <div className="absolute inset-[-12px] rotate-45 border border-cyan-400/15" />

                        <Code2
                          size={44}
                          strokeWidth={1.5}
                          className="relative text-cyan-400"
                        />
                      </div>

                      <span className="text-[10px] tracking-[0.3em] text-cyan-500/70">
                        SOFTWARE APPLICATION
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 border border-cyan-400/30 bg-black/75 px-3 py-2 text-[10px] tracking-[0.2em] text-cyan-300">
                    PROJECT / {project.number}
                  </div>

                  <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-black/70 text-cyan-400 transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-400">
                      {project.category || "WEB DEVELOPMENT"}
                    </span>

                    <span className="text-[10px] tracking-wider text-gray-600">
                      {project.number}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-3xl">
                    {project.name}
                  </h2>

                  {project.description && (
                    <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-400">
                      {project.description}
                    </p>
                  )}

                  {technologies.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {technologies.slice(0, 5).map((tech) => (
                        <span
                          key={typeof tech === "string" ? tech : tech.name}
                          className="border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] tracking-wider text-gray-400"
                        >
                          {typeof tech === "string" ? tech : tech.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-[10px] tracking-[0.2em] text-gray-500">
                      SYSTEM INSPECTION
                    </span>

                    <span className="flex items-center gap-2 text-xs tracking-wider text-cyan-400 transition-all group-hover:gap-4">
                      EXPLORE
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.2em] text-gray-500 sm:flex-row">
          <span>THE CORE / PROJECT ARCHIVE</span>

          <span>BUILD. TEST. IMPROVE. REPEAT.</span>
        </div>
      </div>
    </section>
  );
}
