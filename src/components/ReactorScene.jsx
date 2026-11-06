import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import EnergyCore from "./EnergyCore";

function CameraFlight({ entering }) {
  useFrame((state, delta) => {
    const isMobile = state.size.width < 768;

    const defaultZ = isMobile ? 10.5 : 7;
    const targetZ = entering ? 0.35 : defaultZ;

    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      2.8,
      delta,
    );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ReactorScene({ energized, entering, onReady }) {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const resetPointer = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      resize={{
        debounce: 100,
      }}
      onCreated={() => {
        onReady?.();
      }}
    >
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.5} />

      <directionalLight position={[4, 5, 5]} intensity={3} color="#b8f5ff" />

      <pointLight
        position={[-4, -2, 3]}
        intensity={15}
        distance={12}
        color="#0088ff"
      />

      <EnergyCore energized={energized || entering} pointerRef={pointerRef} />

      <CameraFlight entering={entering} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.2}
          luminanceThreshold={1}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
