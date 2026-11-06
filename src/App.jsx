import { useEffect, useState } from "react";
import ReactorScene from "./components/ReactorScene";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Hub from "./pages/Hub";

export default function App() {
  const [phase, setPhase] = useState(() => {
    const savedPhase = sessionStorage.getItem("the-core-phase");

    return savedPhase === "hub" ? "hub" : "landing";
  });
  const [hovered, setHovered] = useState(false);
  const [selectedRealm, setSelectedRealm] = useState(null);

  useEffect(() => {
    if (phase === "hub" || phase === "landing") {
      sessionStorage.setItem("the-core-phase", phase);
    }
  }, [phase]);

  const entering = phase === "entering";
  const inHub = phase === "hub";

  useEffect(() => {
    if (!entering) return;

    const timeout = setTimeout(() => {
      setPhase("hub");
    }, 1600);

    return () => clearTimeout(timeout);
  }, [entering]);

  const enterCore = () => {
    setHovered(false);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("hub");
    } else {
      setPhase("entering");
    }
  };

  const restart = () => {
    setSelectedRealm(null);
    setHovered(false);
    setPhase("landing");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {!inHub && (
        <div className="fixed inset-0">
          <ReactorScene energized={hovered} entering={entering} />
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_25%,#02060b_100%)]" />

      <Navbar inHub={inHub} onRestart={restart} />

      {!inHub ? (
        <Landing
          entering={entering}
          onEnter={enterCore}
          onSkip={() => setPhase("hub")}
          onHover={setHovered}
        />
      ) : (
        <Hub
          selected={selectedRealm}
          onSelect={setSelectedRealm}
          onBack={() => setSelectedRealm(null)}
        />
      )}
    </main>
  );
}
