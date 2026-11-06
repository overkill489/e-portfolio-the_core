import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Cpu } from "lucide-react";
import { skills, skillCategories } from "../data/skills";
import { projects } from "../data/projects";
import SkillNetwork from "../components/SkillNetwork";
import SkillConstellation from "../components/SkillConstellation";

export default function SkillsRealm({ onBack, onOpenProject }) {
  const [category, setCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("react");
  const [viewMode, setViewMode] = useState("3d");

  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const visibleSkills =
    category === "All"
      ? skills
      : skills.filter((skill) => skill.category === category);

  const activeSkill = visibleSkills.find((skill) => skill.id === selectedSkill);

  const relatedProjects = projects.filter((project) =>
    activeSkill?.projects.includes(project.id),
  );

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);

    const firstSkill =
      newCategory === "All"
        ? skills[0]
        : skills.find((skill) => skill.category === newCategory);

    setSelectedSkill(firstSkill?.id ?? null);
  };

  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1600px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>

        <div className="mb-12">
          <p className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-cyan-400">
            <Cpu size={17} />
            REALM 02 / TECHNOLOGY SYSTEMS
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            THE STACK<span className="text-cyan-400">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Explore the technologies I work with and discover the applications
            I've built using them.
          </p>
        </div>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-3">
            {skillCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleCategoryChange(item)}
                aria-pressed={category === item}
                className={`cursor-pointer border px-5 py-3 text-xs tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                  category === item
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-gray-400 hover:border-cyan-500/40 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
            TECHNOLOGY NETWORK ONLINE
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gray-500">
                  NETWORK VISUALIZATION
                </p>

                <p className="mt-2 text-xs text-gray-600">
                  {visibleSkills.length} technologies available
                </p>
              </div>

              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  aria-pressed={viewMode === "3d"}
                  className={`cursor-pointer border px-4 py-2 text-xs tracking-wider transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                    viewMode === "3d"
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 text-gray-500 hover:border-cyan-500/40 hover:text-white"
                  }`}
                >
                  3D VIEW
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  className={`cursor-pointer border px-4 py-2 text-xs tracking-wider transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                    viewMode === "grid"
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-white/10 text-gray-500 hover:border-cyan-500/40 hover:text-white"
                  }`}
                >
                  GRID VIEW
                </button>
              </div>
            </div>

            {isDesktop && viewMode === "3d" ? (
              <SkillConstellation
                skills={visibleSkills}
                selectedSkill={selectedSkill}
                onSelect={setSelectedSkill}
              />
            ) : (
              <SkillNetwork
                skills={visibleSkills}
                selectedSkill={selectedSkill}
                onSelect={setSelectedSkill}
              />
            )}
          </div>

          <div className="relative min-w-0 overflow-hidden border border-cyan-500/20 bg-cyan-950/[0.08] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/[0.06] blur-3xl" />

            <div className="relative">
              <div className="mb-7 flex items-center justify-between">
                <p className="text-[10px] tracking-[0.3em] text-cyan-400">
                  TECHNOLOGY INSPECTION
                </p>

                <Cpu size={17} className="text-cyan-500" />
              </div>

              {activeSkill ? (
                <div key={activeSkill.id}>
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: activeSkill.color,
                        boxShadow: `0 0 12px ${activeSkill.color}`,
                      }}
                    />

                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                      {activeSkill.category}
                    </span>
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {activeSkill.name}
                  </h2>

                  <p className="mt-5 text-sm leading-8 text-gray-400">
                    {activeSkill.description}
                  </p>

                  <div className="my-8 h-px bg-white/10" />

                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xs tracking-[0.2em] text-cyan-400">
                      RELATED PROJECTS
                    </h3>

                    <span className="text-xs text-gray-500">
                      {String(relatedProjects.length).padStart(2, "0")}
                    </span>
                  </div>

                  {relatedProjects.length > 0 ? (
                    <div className="space-y-3">
                      {relatedProjects.map((project) => (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => onOpenProject(project.id)}
                          className="group flex w-full cursor-pointer items-center justify-between gap-4 border border-white/10 bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/[0.05] focus-visible:outline-2 focus-visible:outline-cyan-300"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">
                              {project.name}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-500">
                              {project.category}
                            </p>
                          </div>

                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300"
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-7 text-gray-500">
                      No featured projects are linked to this technology yet.
                    </p>
                  )}

                  <div className="mt-8 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                      <span className="text-[10px] tracking-[0.25em] text-cyan-500">
                        TECHNOLOGY IDENTIFIED
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Cpu size={36} className="mx-auto mb-5 text-cyan-500/50" />

                  <h2 className="text-xl font-semibold">Select a Technology</h2>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    Choose a node in the network to inspect its capabilities and
                    related projects.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.2em] text-gray-500 sm:flex-row">
          <span>THE CORE / TECHNOLOGY SYSTEMS</span>

          <span>SELECT A NODE TO EXPLORE</span>
        </div>
      </div>
    </section>
  );
}
