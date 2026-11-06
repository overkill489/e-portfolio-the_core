
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function CubeFrame({ size, color, opacity = 0.7 }) {
  const geometry = useMemo(
    () => new THREE.BoxGeometry(size, size, size),
    [size]
  );

  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry]
  );

  return (
    <lineSegments geometry={edges}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  );
}

function ProcessorCore() {
  const processorRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (processorRef.current) {
      const pulse = 1 + Math.sin(time * 2.4) * 0.035;

      processorRef.current.scale.setScalar(pulse);
    }

    if (innerRef.current) {
      innerRef.current.rotation.y += delta * 0.28;
      innerRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={processorRef}>
      <mesh>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#092938"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      <CubeFrame
        size={0.94}
        color="#64eaff"
        opacity={0.95}
      />

      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.48, 0]} />
        <meshBasicMaterial
          color="#00d9ff"
          wireframe
          toneMapped={false}
        />
      </mesh>

      <pointLight
        color="#00d9ff"
        intensity={5}
        distance={4}
      />
    </group>
  );
}

function RotatingCubeLayer({
  size,
  speed,
  reverse = false,
  color = "#38dfff",
  opacity = 0.5,
}) {
  const layerRef = useRef();

  useFrame((state, delta) => {
    if (!layerRef.current) return;

    const direction = reverse ? -1 : 1;

    layerRef.current.rotation.y += delta * speed * direction;
    layerRef.current.rotation.x += delta * speed * 0.35;
  });

  return (
    <group ref={layerRef}>
      <CubeFrame
        size={size}
        color={color}
        opacity={opacity}
      />
    </group>
  );
}

function CircuitPaths() {
  const groupRef = useRef();

  const paths = useMemo(() => {
    const points = [];

    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;

      points.push({
        x: Math.cos(angle) * 1.05,
        y: Math.sin(angle) * 1.05,
        z: (i % 3 - 1) * 0.65,
      });
    }

    return points;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      {paths.map((point, index) => (
        <group key={index}>
          <mesh
            position={[point.x / 2, point.y / 2, point.z / 2]}
          >
            <boxGeometry
              args={[
                Math.max(Math.abs(point.x), 0.015),
                0.012,
                0.012,
              ]}
            />
            <meshBasicMaterial
              color="#00bfff"
              transparent
              opacity={0.55}
              toneMapped={false}
            />
          </mesh>

          <mesh position={[point.x, point.y, point.z]}>
            <boxGeometry args={[0.075, 0.075, 0.075]} />
            <meshBasicMaterial
              color="#8af4ff"
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ScanningPlane() {
  const scannerRef = useRef();

  useFrame((state) => {
    if (!scannerRef.current) return;

    const time = state.clock.elapsedTime;

    scannerRef.current.position.y =
      Math.sin(time * 0.9) * 1.15;
  });

  return (
    <mesh
      ref={scannerRef}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[2.6, 2.6]} />
      <meshBasicMaterial
        color="#00d9ff"
        transparent
        opacity={0.045}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function BaseHologram() {
  const mainRef = useRef();

  useFrame((state, delta) => {
    if (!mainRef.current) return;

    mainRef.current.rotation.y = THREE.MathUtils.damp(
      mainRef.current.rotation.y,
      state.pointer.x * 0.15,
      2,
      delta
    );

    mainRef.current.rotation.x = THREE.MathUtils.damp(
      mainRef.current.rotation.x,
      state.pointer.y * 0.12,
      2,
      delta
    );
  });

  return (
    <Float
      speed={0.9}
      rotationIntensity={0.06}
      floatIntensity={0.12}
    >
      <group ref={mainRef}>
        <ProcessorCore />

        <RotatingCubeLayer
          size={1.55}
          speed={0.18}
          color="#38dfff"
          opacity={0.8}
        />

        <RotatingCubeLayer
          size={2.15}
          speed={0.12}
          reverse
          color="#80edff"
          opacity={0.5}
        />

        <RotatingCubeLayer
          size={2.75}
          speed={0.06}
          color="#245e77"
          opacity={0.35}
        />

        <CircuitPaths />

        <ScanningPlane />
      </group>
    </Float>
  );
}
