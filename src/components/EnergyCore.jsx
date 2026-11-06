import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function EnergyNucleus() {
  const nucleusRef = useRef();

  useFrame((state) => {
    if (!nucleusRef.current) return;

    const time = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(time * 2) * 0.04;

    nucleusRef.current.scale.setScalar(pulse);
  });

  return (
    <group ref={nucleusRef}>
      <mesh>
        <icosahedronGeometry args={[0.65, 3]} />

        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00aaff"
          emissiveIntensity={3}
          metalness={0.2}
          roughness={0.15}
          flatShading
          toneMapped={false}
        />
      </mesh>

      <mesh scale={1.12}>
        <icosahedronGeometry args={[0.65, 2]} />

        <meshBasicMaterial
          color="#55eaff"
          wireframe
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </mesh>

      <pointLight color="#00d9ff" intensity={18} distance={8} />
    </group>
  );
}

function ReactorShell() {
  const shellRef = useRef();

  useFrame((state, delta) => {
    if (!shellRef.current) return;

    shellRef.current.rotation.y -= delta * 0.08;
    shellRef.current.rotation.z += delta * 0.025;
  });

  return (
    <group ref={shellRef}>
      <mesh scale={1.015}>
        <icosahedronGeometry args={[1.15, 1]} />

        <meshBasicMaterial
          color="#00cfff"
          wireframe
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.18, 1]} />

        <meshBasicMaterial
          color="#001019"
          wireframe
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function OrbitalRing({ radius, rotation, speed, color }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    ringRef.current.rotation.x += delta * speed;
    ringRef.current.rotation.y += delta * speed * 0.5;
  });

  return (
    <group rotation={rotation}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.012, 6, 128]} />

        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function EnergyParticles() {
  const particlesRef = useRef();

  const positions = useMemo(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    const count = isMobile ? 90 : 180;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 1.7 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);

      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);

      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    particlesRef.current.rotation.y += delta * 0.025;
    particlesRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>

      <pointsMaterial
        color="#00d9ff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

export default function EnergyCore({ energized = false, pointerRef }) {
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (!coreRef.current) return;

    const pointerX = pointerRef?.current?.x ?? 0;
    const pointerY = pointerRef?.current?.y ?? 0;

    const targetX = pointerY * 0.15;
    const targetY = pointerX * 0.22;

    coreRef.current.rotation.x = THREE.MathUtils.damp(
      coreRef.current.rotation.x,
      targetX,
      3,
      delta,
    );

    coreRef.current.rotation.y = THREE.MathUtils.damp(
      coreRef.current.rotation.y,
      targetY,
      3,
      delta,
    );

    const targetScale = energized ? 1.18 : 1;

    const newScale = THREE.MathUtils.damp(
      coreRef.current.scale.x,
      targetScale,
      4,
      delta,
    );

    coreRef.current.scale.setScalar(newScale);
  });

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={coreRef}>
        <EnergyNucleus />

        <ReactorShell />

        <OrbitalRing
          radius={1.55}
          rotation={[Math.PI / 3, 0, 0]}
          speed={0.15}
          color="#00e5ff"
        />

        <OrbitalRing
          radius={1.85}
          rotation={[0, Math.PI / 4, 0]}
          speed={-0.12}
          color="#7beeff"
        />

        <OrbitalRing
          radius={2.1}
          rotation={[Math.PI / 5, Math.PI / 3, 0]}
          speed={0.08}
          color="#245e77"
        />

        <EnergyParticles />
      </group>
    </Float>
  );
}
