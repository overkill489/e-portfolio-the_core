import { ArrowLeft, BrainCircuit, Workflow } from "lucide-react";
import ProcessSimulator from "../components/ProcessSimulator";
import { processChallenges } from "../data/process";

export default function ProcessRealm({ onBack }) {
  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[550px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-12 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-cyan-400">
              <BrainCircuit size={18} />
              REALM 04 / ENGINEERING PROCESS
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              THE MIND<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
              Great software isn't just about writing code. It's about
              understanding problems, investigating solutions, and building
              systems that work. Explore the thinking behind my projects.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
            ENGINEERING LAB ONLINE
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-white/10 py-5">
          <Workflow size={18} className="text-cyan-400" />

          <span className="text-xs tracking-[0.15em] text-gray-400">
            PROBLEM
          </span>

          <span className="text-cyan-700">/</span>

          <span className="text-xs tracking-[0.15em] text-gray-400">
            INVESTIGATION
          </span>

          <span className="text-cyan-700">/</span>

          <span className="text-xs tracking-[0.15em] text-gray-400">
            SOLUTION
          </span>

          <span className="text-cyan-700">/</span>

          <span className="text-xs tracking-[0.15em] text-gray-400">
            RESULT
          </span>
        </div>

        <ProcessSimulator challenges={processChallenges} />

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.2em] text-gray-500 sm:flex-row">
          <span>THE CORE / ENGINEERING LAB</span>

          <span>THINK. BUILD. TEST. IMPROVE.</span>
        </div>
      </div>
    </section>
  );
}
