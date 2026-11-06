import { ArrowUpRight, Code2 } from "lucide-react";

export default function ProjectCard({ project, onSelect, active }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`group relative flex min-h-72 w-full cursor-pointer flex-col justify-between overflow-hidden border p-6 text-left transition-all duration-500 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
        active
          ? "border-cyan-400/70 bg-cyan-500/10"
          : "border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-500/[0.05]"
      }`}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: project.accent }}
      />

      <div className="relative flex items-start justify-between">
        <span className="text-[10px] tracking-[0.3em] text-cyan-400">
          PROJECT / {project.number}
        </span>

        <ArrowUpRight
          size={20}
          className="text-gray-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>

      {project.id === "weatherly" ? (
        <div className="relative my-8 flex justify-center">
          <div
            className="flex h-24 w-24 rotate-45 items-center justify-center border transition-transform duration-700 group-hover:rotate-[135deg]"
            style={{ borderColor: project.accent }}
          >
            <Code2
              size={34}
              style={{
                color: project.accent,
                transform: "rotate(-45deg)",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative my-7 overflow-hidden border border-white/10 bg-[#080e16]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />

            <span className="ml-auto text-[9px] tracking-[0.2em] text-gray-500">
              LIVE PREVIEW
            </span>
          </div>

          <div className="relative aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={`${project.name} application preview`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />

            <div className="pointer-events-none absolute inset-0 border border-cyan-400/0 transition-colors duration-500 group-hover:border-cyan-400/30" />
          </div>
        </div>
      )}

      <div className="relative">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
          {project.category}
        </span>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          {project.name}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((technology) => (
            <span
              key={technology}
              className="border border-white/10 px-2 py-1 text-[10px] text-gray-400"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
