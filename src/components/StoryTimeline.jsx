import { Check, Circle } from "lucide-react";

export default function StoryTimeline({ chapters, activeIndex, onSelect }) {
  return (
    <nav aria-label="Story chapters" className="w-full">
      <div className="relative grid grid-cols-5 gap-2">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-5 h-px bg-white/10" />

        <div
          className="pointer-events-none absolute left-[10%] top-5 h-px bg-cyan-400 transition-[width] duration-700 ease-in-out"
          style={{
            width: `${activeIndex * 20}%`,
          }}
        />

        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${chapter.number}: ${chapter.title}`}
              className="group relative flex cursor-pointer flex-col items-center gap-4 text-center focus-visible:rounded focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ${
                  isActive
                    ? "scale-110 border-cyan-300 bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                    : isComplete
                      ? "border-cyan-400 bg-[#07313e] text-cyan-300"
                      : "border-white/20 bg-[#080e16] text-gray-500 group-hover:border-cyan-400/60"
                }`}
              >
                {isComplete ? (
                  <Check size={16} />
                ) : isActive ? (
                  <Circle size={12} fill="currentColor" />
                ) : (
                  <span className="text-xs">{chapter.number}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                    isActive ? "text-cyan-300" : "text-gray-400"
                  }`}
                >
                  {chapter.title}
                </span>

                <span className="hidden text-[9px] tracking-widest text-gray-600 lg:block">
                  {chapter.number} / 05
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
