import { lazy, Suspense, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";

import ReactorScene from "./components/ReactorScene";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

const Hub = lazy(() => import("./pages/Hub"));

function SystemLoader() {
  return (
    <div
      role="status"
      className="relative z-10 flex min-h-screen items-center justify-center bg-[#050505]"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-400 motion-reduce:animate-none" />

          <div className="absolute inset-3 rounded-full border border-cyan-400/20" />

          <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_20px_#00d9ff] motion-reduce:animate-none" />
        </div>

        <p className="animate-pulse text-xs tracking-[0.3em] text-cyan-400 motion-reduce:animate-none">
          INITIALIZING SYSTEM...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [entering, setEntering] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reactorReady, setReactorReady] = useState(false);

  const isLanding = location.pathname === "/";
  const showLanding = isLanding || entering;
  const inHub = !showLanding;

  useEffect(() => {
    if (!entering) return;

    const timeout = setTimeout(() => {
      setEntering(false);
      navigate("/hub");
    }, 1600);

    return () => clearTimeout(timeout);
  }, [entering, navigate]);

  const enterCore = () => {
    setHovered(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEntering(false);
      navigate("/hub");
      return;
    }

    setEntering(true);
  };

  const skipEntrance = () => {
    setEntering(false);
    setHovered(false);
    navigate("/hub");
  };

  const restart = () => {
    setEntering(false);
    setHovered(false);
    navigate("/");
  };

  return (
    <main className="core-page-enter relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {showLanding && (
        <div
          className={`fixed inset-0 transition-opacity duration-[1800ms] ease-in-out motion-reduce:duration-0 ${
            reactorReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <ReactorScene
            energized={hovered}
            entering={entering}
            onReady={() => setReactorReady(true)}
          />
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_25%,#02060b_100%)]" />

      <Navbar inHub={inHub} onRestart={restart} />

      {entering ? (
        <Landing
          entering={entering}
          onEnter={enterCore}
          onSkip={skipEntrance}
          onHover={setHovered}
        />
      ) : (
        <Suspense fallback={<SystemLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  entering={false}
                  onEnter={enterCore}
                  onSkip={skipEntrance}
                  onHover={setHovered}
                />
              }
            />

            <Route path="/hub" element={<Hub />} />

            <Route path="/projects" element={<Hub />} />

            <Route path="/projects/:projectId" element={<Hub />} />

            <Route path="/skills" element={<Hub />} />

            <Route path="/story" element={<Hub />} />

            <Route path="/process" element={<Hub />} />

            <Route path="/contact" element={<Hub />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </main>
  );
}
