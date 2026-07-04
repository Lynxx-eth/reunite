"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 34;
const R = 2.15;

function Crown() {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);

  const bars = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2;
        const hue = 0.58 - (i / COUNT) * 0.46; // blue -> gold
        return {
          a,
          x: Math.cos(a) * R,
          z: Math.sin(a) * R,
          phase: i * 0.4,
          color: new THREE.Color().setHSL(hue, 0.75, 0.55),
          emissive: new THREE.Color().setHSL(hue, 0.85, 0.42),
        };
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.16;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.4 + (Math.sin(t * 1.5 + bars[i].phase) * 0.5 + 0.5) * 2;
      m.scale.y = h;
      m.position.y = h / 2;
    });
  });

  return (
    <group ref={group} rotation={[0.36, 0, 0]}>
      {bars.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          position={[b.x, 0, b.z]}
          rotation={[0, -b.a, 0]}
        >
          <boxGeometry args={[0.16, 1, 0.16]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.emissive}
            emissiveIntensity={0.7}
            metalness={0.35}
            roughness={0.35}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* glowing core */}
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial color="#0e1626" emissive="#5eb3ff" emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ffcf6b" transparent opacity={0.14} />
      </mesh>

      {/* base ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R - 0.15, R + 0.15, 80]} />
        <meshBasicMaterial color="#1b3a6b" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function DataCrownScene() {
  return (
    <Canvas camera={{ position: [0, 1.5, 5.6], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 6, 4]} intensity={55} color="#ffffff" />
      <pointLight position={[-5, -2, -3]} intensity={35} color="#5eb3ff" />
      <Stars radius={60} depth={30} count={1200} factor={4} fade speed={0.5} />
      <Float speed={1} rotationIntensity={0.12} floatIntensity={0.4}>
        <Crown />
      </Float>
    </Canvas>
  );
}
