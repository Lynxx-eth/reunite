"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const PERIOD = 3.4;

function Pulse({ offset }: { offset: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const t = ((state.clock.elapsedTime + offset) % PERIOD) / PERIOD;
    const s = 0.4 + t * 3.6;
    if (ring.current) ring.current.scale.set(s, s, s);
    if (mat.current) mat.current.opacity = (1 - t) * 0.55;
  });
  return (
    <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
      <ringGeometry args={[0.9, 1, 90]} />
      <meshBasicMaterial ref={mat} color="#ffcf6b" transparent side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

function Core() {
  const core = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const p = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.09;
    if (core.current) core.current.scale.setScalar(p);
  });
  return (
    <group position={[0, -0.15, 0]}>
      <mesh ref={core}>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshStandardMaterial color="#ffe4a3" emissive="#ffcf6b" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#ffcf6b" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

function Shell() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x += delta * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[0, -0.15, 0]}>
      <icosahedronGeometry args={[1.9, 1]} />
      <meshBasicMaterial color="#2f6bd0" wireframe transparent opacity={0.16} />
    </mesh>
  );
}

export default function BeaconScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5.2], fov: 46 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 3]} intensity={40} color="#ffcf6b" />
      <Stars radius={60} depth={35} count={1400} factor={4} fade speed={0.5} />
      <Core />
      <Shell />
      {[0, 1.13, 2.26].map((o, i) => (
        <Pulse key={i} offset={o} />
      ))}
    </Canvas>
  );
}
