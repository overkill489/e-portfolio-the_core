
import { useMemo } from "react";
import { Atom, Code2, Database, Layers, Server, Wrench } from "lucide-react";

const iconMap = {
  react: Atom,
  javascript: Code2,
  nextjs: Layers,
  tailwind: Layers,
  node: Server,
  firebase: Database,
  vite: Wrench,
  git: Code2,
};

export default function SkillNetwork({
  skills,
  selectedSkill,
  onSelect,
}) {
  const connections = useMemo(() => {
    return skills.flatMap((skill, index) =>
      skills.slice(index + 1).filter((other) =>
        skill.projects.some((id) => other.projects.includes(id))
      ).map((other) => [skill.id, other.id])
    );
  }, [skills]);

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#080e16] p-6 sm:p-8">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.3em] text-cyan-400">
          TECHNOLOGY NETWORK
        </span>

        <span className="text-[10px] tracking-[0.2em] text-gray-500">
          {skills.length} NODES
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => {
          const Icon = iconMap[skill.id] || Code2;
          const isSelected = selectedSkill === skill.id;

          const isConnected =
            selectedSkill &&
            connections.some(
              ([a, b]) =>
                (a === selectedSkill && b === skill.id) ||
                (b === selectedSkill && a === skill.id)
            );

          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => onSelect(skill.id)}
              className={`group flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 border p-4 text-center transition-all duration-300 ${
                isSelected
                  ? "border-cyan-400 bg-cyan-500/15"
                  : isConnected
                  ? "border-cyan-500/40 bg-cyan-500/[0.05]"
                  : "border-white/10 bg-white/[0.02] hover:border-cyan-500/40"
              }`}
            >
              <Icon
                size={28}
                style={{ color: skill.color }}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="text-sm font-medium">
                {skill.name}
              </span>

              <span className="text-[10px] text-gray-500">
                {skill.category}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-6 text-gray-500">
        Select a technology to inspect its capabilities.
        Related technologies are highlighted when they share projects.
      </p>
    </div>
  );
}
