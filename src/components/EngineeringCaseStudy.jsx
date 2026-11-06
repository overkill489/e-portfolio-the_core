
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lightbulb,
  Workflow,
} from "lucide-react";

export default function EngineeringCaseStudy({ study }) {
  const [selectedNode, setSelectedNode] = useState(
    study.architecture[0].id
  );

  const activeNode = study.architecture.find(
    (node) => node.id === selectedNode
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-4 text-[10px] tracking-[0.3em] text-cyan-400">
          04 / ENGINEERING
        </p>

        <h3 className="text-2xl font-semibold">
          {study.title}
        </h3>
      </div>

      <div className="space-y-6">
        <div className="border-l-2 border-orange-400/60 pl-5">
          <div className="mb-3 flex items-center gap-3">
            <Cpu size={17} className="text-orange-300" />

            <h4 className="text-xs font-semibold tracking-[0.15em] text-orange-300">
              THE CHALLENGE
            </h4>
          </div>

          <p className="text-sm leading-7 text-gray-400">
            {study.challenge}
          </p>
        </div>

        <div className="border-l-2 border-cyan-400/60 pl-5">
          <div className="mb-3 flex items-center gap-3">
            <Lightbulb size={17} className="text-cyan-300" />

            <h4 className="text-xs font-semibold tracking-[0.15em] text-cyan-300">
              THE SOLUTION
            </h4>
          </div>

          <p className="text-sm leading-7 text-gray-400">
            {study.solution}
          </p>
        </div>
      </div>

      <div className="border border-white/10 bg-white/[0.02] p-5">
        <div className="mb-6 flex items-center gap-3">
          <Workflow size={17} className="text-cyan-400" />

          <h4 className="text-xs font-semibold tracking-[0.15em]">
            SYSTEM ARCHITECTURE
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {study.architecture.map((node, index) => (
            <div
              key={node.id}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setSelectedNode(node.id)}
                className={`cursor-pointer border px-3 py-3 text-xs transition-all duration-300 ${
                  selectedNode === node.id
                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                    : "border-white/10 text-gray-400 hover:border-cyan-400/40"
                }`}
              >
                {node.label}
              </button>

              {index < study.architecture.length - 1 && (
                <ArrowRight
                  size={13}
                  className="text-cyan-600"
                />
              )}
            </div>
          ))}
        </div>

        <div
          key={activeNode.id}
          className="mt-6 border-t border-white/10 pt-5"
        >
          <h5 className="text-sm font-semibold text-cyan-300">
            {activeNode.label}
          </h5>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            {activeNode.description}
          </p>
        </div>
      </div>

      <div>
        <h4 className="mb-5 text-sm font-semibold">
          Engineering Highlights
        </h4>

        <div className="space-y-3">
          {study.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-3"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-cyan-400"
              />

              <span className="text-sm leading-6 text-gray-400">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
