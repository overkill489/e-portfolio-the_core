import { useMemo, useRef, useState, useEffect } from "react";
import BaseHologram from "./BaseHologram";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

function RotatingRing({
  radius = 1.1,
  tube = 0.018,
  rotation = [0, 0, 0],
  speed = 0.3,
  axis = "y",
  color = "#38dfff",
  wireframe = false,
}) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    ringRef.current.rotation[axis] += delta * speed;
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, tube, 12, 120]} />

        <meshBasicMaterial
          color={color}
          wireframe={wireframe}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ProcessingSatellite({
  radius = 1.78,
  speed = 0.65,
  offset = 0,
  color = "#9bf7ff",
  tilt = [0, 0, 0],
}) {
  const orbitRef = useRef();
  const nodeRef = useRef();

  useFrame((state, delta) => {
    if (!orbitRef.current || !nodeRef.current) return;

    orbitRef.current.rotation.z += delta * speed;

    nodeRef.current.rotation.x += delta * 1.1;
    nodeRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group rotation={tilt}>
      <group rotation={[0, 0, offset]}>
        <group ref={orbitRef}>
          <mesh position={[radius / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.005, 0.005, radius, 8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.35}
              toneMapped={false}
            />
          </mesh>

          <mesh ref={nodeRef} position={[radius, 0, 0]}>
            <octahedronGeometry args={[0.09, 0]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>

          <mesh position={[radius, 0, 0]}>
            <sphereGeometry args={[0.16, 12, 12]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.12}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function ProcessingNucleus() {
  const coreRef = useRef();
  const shellRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.12;

      coreRef.current.scale.setScalar(pulse);

      coreRef.current.rotation.y += delta * 0.35;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x += delta * 0.25;
      shellRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.38, 1]} />
        <meshBasicMaterial color="#00d9ff" toneMapped={false} />
      </mesh>

      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color="#9bf7ff"
          wireframe
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#00d9ff" intensity={5} distance={4} />
    </group>
  );
}

function ProcessingConnections() {
  const linesRef = useRef();
  const nodeCount = 6;
  const radius = 1.45;

  const positions = useMemo(() => {
    const points = new Float32Array(nodeCount * 6);

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;

      const index = i * 6;

      points[index] = 0;
      points[index + 1] = 0;
      points[index + 2] = 0;

      points[index + 3] = Math.cos(angle) * radius;
      points[index + 4] = Math.sin(angle) * radius;
      points[index + 5] = 0;
    }

    return points;
  }, []);

  useFrame((state, delta) => {
    if (!linesRef.current) return;

    linesRef.current.rotation.z += delta * 0.18;
    linesRef.current.rotation.x += delta * 0.12;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <lineBasicMaterial
        color="#38dfff"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function HologramObject({ realmId }) {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current || !innerRef.current) return;

    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.15,
      2,
      delta,
    );

    innerRef.current.rotation.x += delta * 0.16;
    innerRef.current.rotation.z += delta * 0.12;
  });

  const material = (
    <meshBasicMaterial
      color="#38dfff"
      wireframe
      transparent
      opacity={0.85}
      toneMapped={false}
    />
  );

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <group ref={groupRef}>
        <group ref={innerRef}>
          {realmId === "projects" && (
            <>
              <mesh>
                <boxGeometry args={[1.7, 1.7, 1.7]} />
                {material}
              </mesh>

              <mesh rotation={[0.6, 0.4, 0]}>
                <octahedronGeometry args={[1.1, 0]} />
                <meshBasicMaterial
                  color="#87f5ff"
                  wireframe
                  transparent
                  opacity={0.65}
                />
              </mesh>
            </>
          )}

          {realmId === "skills" && (
            <>
              <mesh>
                <icosahedronGeometry args={[1.3, 2]} />
                {material}
              </mesh>

              <mesh>
                <icosahedronGeometry args={[0.9, 1]} />
                <meshBasicMaterial
                  color="#9bf7ff"
                  wireframe
                  transparent
                  opacity={0.45}
                />
              </mesh>
            </>
          )}

          {realmId === "story" && (
            <>
              {[0.8, 1.15, 1.5].map((radius, index) => (
                <mesh
                  key={radius}
                  rotation={[index * 0.8, index * 0.6, index * 0.4]}
                >
                  <torusGeometry args={[radius, 0.018, 10, 120]} />
                  <meshBasicMaterial
                    color={index === 1 ? "#ffffff" : "#38dfff"}
                    transparent
                    opacity={0.85}
                    toneMapped={false}
                  />
                </mesh>
              ))}
            </>
          )}

          {realmId === "process" && (
            <>
              <RotatingRing
                radius={1.05}
                tube={0.025}
                rotation={[Math.PI / 2, 0, 0]}
                speed={0.55}
                axis="x"
                color="#38dfff"
              />

              <RotatingRing
                radius={1.35}
                tube={0.018}
                rotation={[0, Math.PI / 2, 0]}
                speed={-0.4}
                axis="y"
                color="#80edff"
              />

              <RotatingRing
                radius={1.62}
                tube={0.012}
                rotation={[Math.PI / 4, Math.PI / 4, 0]}
                speed={0.25}
                axis="x"
                color="#ffffff"
              />

              <ProcessingNucleus />

              <ProcessingSatellite
                radius={1.78}
                speed={0.65}
                offset={0}
                color="#9bf7ff"
                tilt={[Math.PI / 6, 0, 0]}
              />

              <ProcessingSatellite
                radius={1.78}
                speed={0.65}
                offset={Math.PI / 2}
                color="#38dfff"
                tilt={[Math.PI / 6, 0, 0]}
              />

              <ProcessingSatellite
                radius={1.78}
                speed={0.65}
                offset={Math.PI}
                color="#9bf7ff"
                tilt={[Math.PI / 6, 0, 0]}
              />

              <ProcessingSatellite
                radius={1.78}
                speed={0.65}
                offset={(Math.PI * 3) / 2}
                color="#38dfff"
                tilt={[Math.PI / 6, 0, 0]}
              />
            </>
          )}
          {realmId === "contact" && (
            <>
              <mesh>
                <sphereGeometry args={[0.75, 32, 32]} />

                <meshBasicMaterial
                  color="#00bfff"
                  wireframe
                  transparent
                  opacity={0.6}
                />
              </mesh>

              <RotatingRing
                radius={1.1}
                rotation={[Math.PI / 3, 0, 0]}
                speed={0.5}
                axis="x"
                color="#38dfff"
              />

              <RotatingRing
                radius={1.4}
                rotation={[0, Math.PI / 3, 0]}
                speed={-0.35}
                axis="y"
                color="#80edff"
              />

              <RotatingRing
                radius={1.7}
                rotation={[Math.PI / 4, Math.PI / 4, 0]}
                speed={0.25}
                axis="x"
                color="#ffffff"
              />
            </>
          )}
        </group>

        <pointLight color="#00d9ff" intensity={8} distance={7} />
      </group>
    </Float>
  );
}

function TransitioningHologram({ realmId }) {
  const [displayedRealm, setDisplayedRealm] = useState(realmId);
  const [transitioning, setTransitioning] = useState(false);

  const groupRef = useRef();

  useEffect(() => {
    if (realmId === displayedRealm) return;

    const startFrame = requestAnimationFrame(() => {
      setTransitioning(true);
    });

    const timeout = setTimeout(() => {
      setDisplayedRealm(realmId);
      setTransitioning(false);
    }, 180);

    return () => {
      cancelAnimationFrame(startFrame);
      clearTimeout(timeout);
    };
  }, [realmId, displayedRealm]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetScale = transitioning ? 0.05 : 1;

    const nextScale = THREE.MathUtils.damp(
      groupRef.current.scale.x,
      targetScale,
      12,
      delta,
    );

    groupRef.current.scale.setScalar(nextScale);
  });

  return (
    <group ref={groupRef}>
      {displayedRealm ? (
        <HologramObject realmId={displayedRealm} />
      ) : (
        <BaseHologram />
      )}
    </group>
  );
}

export default function RealmHologram({ realmId = null }) {
  return (
    <div className="relative h-64 w-full sm:h-72">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />

        <TransitioningHologram realmId={realmId} />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={1}
            luminanceSmoothing={0.25}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
