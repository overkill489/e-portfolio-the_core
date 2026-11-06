import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { realms } from "../data/realms";

import RealmNavigation from "../components/RealmNavigation";
import RealmPreview from "../components/RealmPreview";
import ProjectsRealm from "./ProjectRealm";
import SkillsRealm from "./SkillsRealm";
import StoryRealm from "./StoryRealm";
import ProcessRealm from "./ProcessRealm";
import ContactRealm from "./ContactRealm";
import RecruiterAccess from "../components/RecruiterAccess";

export default function Hub() {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  const [hoveredRealm, setHoveredRealm] = useState(null);

  const path = location.pathname;
  const selected = path.startsWith("/projects/") ? "projects" : path.slice(1);

  const previewRealm =
    realms.find((realm) => realm.id === hoveredRealm) ?? null;

  const activeRealm = realms.find((realm) => realm.id === selected) ?? null;

  const goToHub = () => {
    setHoveredRealm(null);
    navigate("/hub");
  };

  const selectRealm = (realmId) => {
    setHoveredRealm(null);
    navigate(`/${realmId}`);
  };

  const openProject = (id) => {
    setHoveredRealm(null);

    navigate(id ? `/projects/${encodeURIComponent(id)}` : "/projects");
  };

  if (selected === "projects") {
    return (
      <ProjectsRealm
        key={projectId ?? "gallery"}
        initialProject={projectId ?? null}
        onSelectProject={openProject}
        onBack={goToHub}
      />
    );
  }

  if (selected === "skills") {
    return <SkillsRealm onBack={goToHub} onOpenProject={openProject} />;
  }

  if (selected === "story") {
    return <StoryRealm onBack={goToHub} />;
  }

  if (selected === "process") {
    return <ProcessRealm onBack={goToHub} />;
  }

  if (selected === "contact") {
    return <ContactRealm onBack={goToHub} />;
  }

  if (activeRealm) {
    return (
      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-28 sm:px-12">
        <p className="mb-4 text-xs tracking-[0.35em] text-cyan-400">
          THE CORE / REALM {activeRealm.number}
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          {activeRealm.title}
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400">
          {activeRealm.description}
        </p>

        <div className="mt-12 max-w-2xl border border-cyan-500/20 bg-cyan-950/10 p-8">
          <span className="text-[10px] tracking-[0.3em] text-cyan-400">
            REALM INITIALIZED
          </span>

          <h2 className="mt-5 text-2xl font-semibold">
            {activeRealm.subtitle}
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            This destination is ready for development.
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs text-cyan-400">
            <ArrowUpRight size={16} />
            SYSTEM READY
          </div>
        </div>

        <button
          type="button"
          onClick={goToHub}
          className="mt-10 flex w-fit cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-cyan-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
        >
          <ArrowLeft size={17} />
          BACK TO COMMAND CENTER
        </button>
      </section>
    );
  }

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-5 pb-12 pt-28 sm:px-10 xl:px-14">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-[10px] tracking-[0.4em] text-cyan-400">
            SYSTEM / COMMAND CENTER
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            SELECT YOUR PATH.
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Five destinations. One universe to explore.
          </p>
        </div>

        <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] text-cyan-400">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00d9ff]" />
          ALL SYSTEMS ONLINE
        </div>
      </div>

      <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1fr)] xl:gap-10">
        <div className="order-2 lg:order-1">
          <RealmNavigation
            realms={realms.slice(0, 3)}
            hoveredRealm={hoveredRealm}
            onHover={setHoveredRealm}
            onSelect={selectRealm}
          />
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <RealmPreview realm={previewRealm} />
        </div>

        <div className="order-3">
          <RealmNavigation
            realms={realms.slice(3)}
            hoveredRealm={hoveredRealm}
            onHover={setHoveredRealm}
            onSelect={selectRealm}
          />
        </div>
      </div>
      <RecruiterAccess />
      <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[10px] tracking-[0.2em] text-gray-500 sm:flex-row">
        <span>JEREMIAH AUSTIN / DEVELOPER PORTFOLIO</span>
        <span>MOVE TO PREVIEW / SELECT TO EXPLORE</span>
      </div>
    </section>
  );
}
