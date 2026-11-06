import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const positions = [
  [-1.8, 1.15, 0],
  [-0.4, 1.65, -0.5],
  [1.25, 1.25, 0],
  [2.05, 0.1, -0.4],
  [1.25, -1.3, 0],
  [-0.25, -1.55, 0.2],
  [-1.85, -0.85, 0],
  [0.15, 0.05, 0.6],
];

function SkillNode({
  skill,
  position,
  selected,
  connected,
  onSelect,
  onHover,
}) {
  const nodeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!nodeRef.current) return;

    const pulse =
      1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.04;

    const target = selected ? 1.35 : hovered ? 1.2 : pulse;

    const scale = THREE.MathUtils.damp(
      nodeRef.current.scale.x,
      target,
      5,
      delta,
    );

    nodeRef.current.scale.setScalar(scale);
  });

  const active = selected || hovered;
  const color = skill.color;

  return (
    <group position={position}>
      <group ref={nodeRef}>
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            onSelect(skill.id);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            onHover(skill.id);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
        >
          <sphereGeometry args={[0.24, 24, 24]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={active ? 0.95 : 0.7}
            toneMapped={false}
          />
        </mesh>

        <mesh scale={1.55}>
          <sphereGeometry args={[0.24, 20, 20]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={active ? 0.2 : 0.06}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[0.35, 0.008, 8, 64]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={active ? 0.9 : connected ? 0.6 : 0.25}
            toneMapped={false}
          />
        </mesh>
      </group>

      <Html
        center
        position={[0, -0.48, 0]}
        distanceFactor={8}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap font-medium tracking-wide ${
            active ? "text-white" : "text-gray-400"
          }`}
          style={{ fontSize: 12, textShadow: "0 2px 8px #000" }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function Connection({ start, end, active }) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={active ? "#38dfff" : "#21516a"}
        transparent
        opacity={active ? 0.85 : 0.16}
        depthWrite={false}
      />
    </line>
  );
}

function NetworkScene({ skills, selectedSkill, onSelect }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const nodes = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        position: positions[Math.max(0, skill.index)] ?? [0, 0, 0],
      })),
    [skills],
  );

  const connections = useMemo(() => {
    const result = [];

    nodes.forEach((first, index) => {
      nodes.slice(index + 1).forEach((second) => {
        const shared = first.projects.some((id) =>
          second.projects.includes(id),
        );

        if (shared) {
          result.push({ first, second });
        }
      });
    });

    return result;
  }, [nodes]);

  const highlighted = hoveredSkill ?? selectedSkill;

  return (
    <>
      <color attach="background" args={["#080e16"]} />

      <ambientLight intensity={0.5} />

      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color="#063346"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {connections.map(({ first, second }) => (
        <Connection
          key={`${first.id}-${second.id}`}
          start={first.position}
          end={second.position}
          active={highlighted === first.id || highlighted === second.id}
        />
      ))}

      {nodes.map((skill) => {
        const selected = selectedSkill === skill.id;

        const connected =
          highlighted === skill.id ||
          connections.some(
            ({ first, second }) =>
              (first.id === highlighted && second.id === skill.id) ||
              (second.id === highlighted && first.id === skill.id),
          );

        return (
          <SkillNode
            key={skill.id}
            skill={skill}
            position={skill.position}
            selected={selected}
            connected={connected}
            onSelect={onSelect}
            onHover={setHoveredSkill}
          />
        );
      })}
    </>
  );
}

export default function SkillConstellation({
  skills,
  selectedSkill,
  onSelect,
}) {
  const indexedSkills = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        index: skill.positionIndex,
      })),
    [skills],
  );

  return (
    <div className="relative h-[480px] w-full overflow-hidden border border-cyan-500/20 bg-[#080e16]">
      <div className="pointer-events-none absolute left-6 top-6 z-10">
        <p className="text-[10px] tracking-[0.3em] text-cyan-400">
          NEURAL TECHNOLOGY NETWORK
        </p>

        <p className="mt-2 text-[10px] tracking-wider text-gray-500">
          SELECT A NODE TO INSPECT
        </p>
      </div>

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
      >
        <NetworkScene
          skills={indexedSkills}
          selectedSkill={selectedSkill}
          onSelect={onSelect}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-5 left-6 text-[10px] tracking-widest text-gray-500">
        {skills.length} ACTIVE NODES
      </div>
    </div>
  );
}
