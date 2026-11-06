import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import StoryTimeline from "../components/StoryTimeline";
import { storyChapters } from "../data/story";

export default function StoryRealm({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const chapter = storyChapters[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === storyChapters.length - 1;

  const changeChapter = (index) => {
    if (index < 0 || index >= storyChapters.length) return;

    setActiveIndex(index);
  };

  return (
    <section className="relative z-10 min-h-screen overflow-hidden bg-[#050505] px-5 pb-20 pt-32 text-white sm:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[550px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1500px]">
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
              <BookOpen size={17} />
              REALM 03 / PERSONAL HISTORY
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              THE ORIGIN<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Behind every line of code is a story. Explore the journey,
              experiences, and ideas shaping the developer I'm becoming.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />

            <span className="text-[10px] tracking-[0.2em] text-cyan-400">
              PERSONAL ARCHIVE ONLINE
            </span>
          </div>
        </div>

        <div className="border border-white/10 bg-[#080e16]/70 px-4 py-8 sm:px-10">
          <StoryTimeline
            chapters={storyChapters}
            activeIndex={activeIndex}
            onSelect={changeChapter}
          />
        </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,1fr)]">
          <article className="relative min-h-[470px] overflow-hidden border border-cyan-500/20 bg-[#08111a]">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 right-0 text-[170px] font-black leading-none text-white/[0.025] sm:text-[240px]">
              {chapter.number}
            </div>

            <div
              key={chapter.id}
              className="relative flex h-full flex-col justify-between p-7 motion-safe:animate-[story-reveal_550ms_ease-out_both] sm:p-10"
            >
              <div>
                <div className="mb-12 flex items-center justify-between gap-4">
                  <span className="text-[10px] tracking-[0.3em] text-cyan-400">
                    CHAPTER {chapter.number} / 05
                  </span>

                  <Sparkles size={17} className="text-cyan-400/70" />
                </div>

                <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
                  {chapter.label}
                </p>

                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {chapter.title}
                </h2>

                <p className="mt-4 text-sm text-cyan-300/70">
                  {chapter.subtitle}
                </p>

                <p className="mt-8 max-w-xl text-sm leading-8 text-gray-300 sm:text-base">
                  {chapter.description}
                </p>
              </div>

              <div className="mt-14 border-l-2 border-cyan-400/50 pl-5">
                <p className="text-lg italic leading-8 text-gray-300">
                  "{chapter.quote}"
                </p>
              </div>
            </div>
          </article>

          <aside className="flex flex-col justify-between border border-white/10 bg-white/[0.02] p-7 sm:p-9">
            <div>
              <div className="mb-10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] text-cyan-400">
                  CHAPTER INTELLIGENCE
                </span>

                <span className="text-xs text-gray-500">
                  {chapter.number} / 05
                </span>
              </div>

              <div
                key={chapter.id}
                className="motion-safe:animate-[story-reveal_550ms_ease-out_both]"
              >
                <h3 className="text-2xl font-semibold">Key Milestones</h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  Experiences and skills connected to this chapter.
                </p>

                <div className="mt-9 space-y-6">
                  {chapter.highlights.map((highlight, index) => (
                    <div key={highlight} className="flex items-start gap-4">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-cyan-500/30 bg-cyan-500/[0.06]">
                        <CheckCircle2 size={15} className="text-cyan-400" />
                      </div>

                      <div>
                        <span className="text-[10px] tracking-[0.2em] text-gray-600">
                          MILESTONE {String(index + 1).padStart(2, "0")}
                        </span>

                        <p className="mt-2 text-sm leading-6 text-gray-300">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="mb-4 text-[10px] tracking-[0.2em] text-gray-500">
                JOURNEY PROGRESS
              </p>

              <div className="h-1 w-full overflow-hidden bg-white/10">
                <div
                  className="h-full bg-cyan-400 transition-[width] duration-700"
                  style={{
                    width: `${((activeIndex + 1) / storyChapters.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                Chapter {activeIndex + 1} of {storyChapters.length}
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => changeChapter(activeIndex - 1)}
            className="flex cursor-pointer items-center gap-3 border border-white/15 px-5 py-4 text-xs tracking-[0.15em] text-gray-300 transition-colors hover:border-cyan-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
            PREVIOUS CHAPTER
          </button>

          <span className="hidden text-[10px] tracking-[0.25em] text-gray-500 md:block">
            EXPLORE YOUR PATH
          </span>

          <button
            type="button"
            disabled={isLast}
            onClick={() => changeChapter(activeIndex + 1)}
            className="flex cursor-pointer items-center gap-3 border border-cyan-400/60 bg-cyan-500/10 px-5 py-4 text-xs tracking-[0.15em] text-cyan-300 transition-colors hover:bg-cyan-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            NEXT CHAPTER
            {isLast ? <ArrowRight size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
