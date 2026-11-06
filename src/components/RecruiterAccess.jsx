import { ArrowUpRight, FileText, Code2, Mail } from "lucide-react";
import { Link } from "react-router";

export default function RecruiterAccess() {
  return (
    <section
      aria-labelledby="recruiter-access-title"
      className="mt-8 border border-cyan-500/20 bg-[#08111a]/80 p-5 sm:p-7"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            id="recruiter-access-title"
            className="text-[11px] font-semibold tracking-[0.25em] text-cyan-400"
          >
            RECRUITER ACCESS
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Everything you need to connect and explore my work.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-cyan-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          ACCESS AVAILABLE
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/[0.06] focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <div className="flex items-center gap-3">
            <FileText size={21} className="text-cyan-400" />

            <div>
              <p className="text-xs font-semibold text-white">VIEW RESUME</p>

              <p className="mt-1 text-[10px] text-gray-500">PDF DOCUMENT</p>
            </div>
          </div>

          <ArrowUpRight
            size={16}
            className="shrink-0 text-gray-500 group-hover:text-cyan-400"
          />
        </a>

        <a
          href="https://github.com/overkill489"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/[0.06] focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <div className="flex items-center gap-3">
            <Code2 size={21} className="text-cyan-400" />

            <div>
              <p className="text-xs font-semibold text-white">GITHUB</p>

              <p className="mt-1 text-[10px] text-gray-500">SOURCE CODE</p>
            </div>
          </div>

          <ArrowUpRight
            size={16}
            className="shrink-0 text-gray-500 group-hover:text-cyan-400"
          />
        </a>

        <Link
          to="/contact"
          className="group flex items-center justify-between border border-white/10 bg-black/20 p-4 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/[0.06] focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <div className="flex items-center gap-3">
            <Mail size={21} className="text-cyan-400" />

            <div>
              <p className="text-xs font-semibold text-white">CONTACT ME</p>

              <p className="mt-1 text-[10px] text-gray-500">SEND A MESSAGE</p>
            </div>
          </div>

          <ArrowUpRight
            size={16}
            className="shrink-0 text-gray-500 group-hover:text-cyan-400"
          />
        </Link>
      </div>
    </section>
  );
}
