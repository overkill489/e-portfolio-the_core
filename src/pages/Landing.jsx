
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function Landing({
  onEnter,
  onSkip,
  onHover,
  entering,
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-700 ${
        entering ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 md:flex lg:left-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          Core Status
        </span>

        <span className="text-xs tracking-[0.2em] text-cyan-400">
          ● ACTIVE
        </span>

        <div className="mt-3 h-px w-20 bg-cyan-900/70" />

        <span className="text-[10px] tracking-widest text-gray-500">
          SYSTEM / 001
        </span>
      </div>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex lg:right-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
          Interactive Environment
        </span>

        <span className="text-xs tracking-widest text-cyan-400">
          REACTOR ONLINE
        </span>

        <div className="mt-3 h-px w-20 bg-cyan-900/70" />

        <span className="text-[10px] tracking-widest text-gray-500">
          MOVE TO EXPLORE
        </span>
      </div>

      <div className="absolute inset-x-4 bottom-8 flex flex-col items-center text-center sm:bottom-12">
        <p className="mb-3 text-[10px] tracking-[0.45em] text-cyan-400 sm:text-xs">
          JEREMIAH AUSTIN
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          BEYOND THE CODE.
        </h1>

        <p className="mt-3 text-xs text-gray-400 sm:text-sm">
          Developer. Creator. Problem Solver.
        </p>

        <button
          type="button"
          onClick={onEnter}
          onPointerEnter={() => onHover(true)}
          onPointerLeave={() => onHover(false)}
          onFocus={() => onHover(true)}
          onBlur={() => onHover(false)}
          className="pointer-events-auto group relative mt-7 flex cursor-pointer items-center gap-6 overflow-hidden border border-cyan-500/50 bg-cyan-500/10 px-7 py-4 text-xs font-semibold tracking-[0.2em] text-cyan-100 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_35px_rgba(0,217,255,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          ENTER THE CORE

          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </button>

        <span className="mt-4 text-[10px] tracking-widest text-gray-500">
          AN INTERACTIVE PORTFOLIO EXPERIENCE
        </span>
      </div>

      <div className="absolute bottom-6 left-6 hidden items-center gap-3 text-[10px] tracking-[0.2em] text-gray-500 lg:flex">
        <ArrowDownRight size={15} />
        DESIGNED TO BE EXPLORED
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="pointer-events-auto absolute bottom-6 right-6 cursor-pointer text-[10px] tracking-[0.2em] text-gray-400 transition-colors hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-cyan-300"
      >
        SKIP INTRO
      </button>
    </div>
  );
}
