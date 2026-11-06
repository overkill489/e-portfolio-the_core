import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Lightbulb,
} from "lucide-react";

const stageLabels = ["PROBLEM", "INVESTIGATION", "SOLUTION", "RESULT"];

export default function ProcessSimulator({ challenges }) {
  const [challengeId, setChallengeId] = useState(challenges[0].id);
  const [stepIndex, setStepIndex] = useState(0);

  const challenge = challenges.find((item) => item.id === challengeId);

  const step = challenge.steps[stepIndex];

  const selectChallenge = (id) => {
    setChallengeId(id);
    setStepIndex(0);
  };

  const previousStep = () => {
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const nextStep = () => {
    setStepIndex((current) =>
      Math.min(challenge.steps.length - 1, current + 1),
    );
  };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="border border-white/10 bg-[#080e16] p-5">
        <div className="mb-7 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.25em] text-cyan-400">
            CHALLENGE ARCHIVE
          </p>

          <span className="text-xs text-gray-500">
            {String(challenges.length).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-3">
          {challenges.map((item) => {
            const selected = item.id === challengeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectChallenge(item.id)}
                aria-pressed={selected}
                className={`group w-full cursor-pointer border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cyan-300 ${
                  selected
                    ? "border-cyan-400/70 bg-cyan-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-cyan-400/40"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.25em] text-cyan-500">
                    CASE / {item.number}
                  </span>

                  <ChevronRight
                    size={16}
                    className={
                      selected
                        ? "text-cyan-300"
                        : "text-gray-600 group-hover:text-cyan-300"
                    }
                  />
                </div>

                <h3 className="text-base font-semibold leading-6">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs text-gray-500">{item.project}</p>

                <div className="mt-5 h-px bg-white/10" />

                <p className="mt-4 text-[10px] tracking-wider text-gray-500">
                  {item.category}
                </p>
              </button>
            );
          })}
        </div>
      </aside>

      <div className="min-w-0 border border-cyan-500/20 bg-[#08111a]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-cyan-400">
              ENGINEERING SIMULATION
            </p>

            <p className="mt-2 text-xs text-gray-500">
              {challenge.project} / {challenge.difficulty}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            CASE ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-white/10">
          {challenge.steps.map((item, index) => {
            const current = index === stepIndex;
            const visited = index < stepIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
                aria-current={current ? "step" : undefined}
                aria-label={`${index + 1}: ${stageLabels[index]}`}
                className={`flex min-w-0 cursor-pointer flex-col items-center gap-3 border-b-2 px-1 py-5 transition-colors sm:px-3 ${
                  current
                    ? "border-cyan-400 bg-cyan-400/[0.08] text-cyan-300"
                    : "border-transparent text-gray-500 hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                    current
                      ? "border-cyan-300 bg-cyan-400 text-black"
                      : visited
                        ? "border-cyan-500/60 text-cyan-300"
                        : "border-white/20"
                  }`}
                >
                  {visited ? <Check size={15} /> : index + 1}
                </span>

                <span className="text-[9px] tracking-wider sm:text-[10px]">
                  {stageLabels[index]}
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={`${challenge.id}-${step.id}`}
          className="p-6 motion-safe:animate-[process-reveal_450ms_ease-out_both] sm:p-9"
        >
          <p className="mb-4 text-[10px] tracking-[0.3em] text-cyan-400">
            STAGE {String(stepIndex + 1).padStart(2, "0")} / 04
            {" — "}
            {step.label}
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {step.title}
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-8 text-gray-300">
            {step.description}
          </p>

          <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(220px,1fr)]">
            <div className="min-w-0 overflow-hidden border border-white/10 bg-[#030810]">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Code2 size={16} />

                  <span className="text-[10px] tracking-widest">
                    CODE INSPECTION
                  </span>
                </div>

                <span className="text-[10px] text-gray-500">
                  {step.codeLabel}
                </span>
              </div>

              <pre className="max-h-[340px] overflow-auto p-5 text-xs leading-7 text-cyan-100/85 sm:text-sm">
                <code>{step.code}</code>
              </pre>
            </div>

            <div className="border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Lightbulb size={19} className="text-cyan-400" />

                <h3 className="text-xs font-semibold tracking-[0.15em] text-cyan-300">
                  ENGINEERING INSIGHT
                </h3>
              </div>

              <p className="text-sm leading-8 text-gray-300">{step.insight}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-5 sm:px-9">
          <button
            type="button"
            onClick={previousStep}
            disabled={stepIndex === 0}
            className="flex cursor-pointer items-center gap-2 text-xs tracking-wider text-gray-300 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={17} />
            PREVIOUS
          </button>

          <span className="text-xs tabular-nums text-gray-500">
            {stepIndex + 1} / {challenge.steps.length}
          </span>

          {stepIndex === challenge.steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStepIndex(0)}
              className="cursor-pointer border border-cyan-500/40 px-5 py-3 text-xs tracking-wider text-cyan-300 hover:bg-cyan-500/10"
            >
              REPLAY CASE
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="flex cursor-pointer items-center gap-2 border border-cyan-500/50 bg-cyan-500/10 px-5 py-3 text-xs tracking-wider text-cyan-300 hover:bg-cyan-400 hover:text-black"
            >
              NEXT STEP
              <ArrowRight size={17} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
