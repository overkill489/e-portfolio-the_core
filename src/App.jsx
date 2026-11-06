import { useEffect, useState } from "react";
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
import Hub from "./pages/Hub";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [entering, setEntering] = useState(false);
  const [hovered, setHovered] = useState(false);

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
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {showLanding && (
        <div className="fixed inset-0">
          <ReactorScene energized={hovered} entering={entering} />
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
      )}
    </main>
  );
}
