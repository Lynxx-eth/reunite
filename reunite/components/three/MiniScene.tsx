"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---- bars ---- */
function BarsMini() {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const bars = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return { a, x: Math.cos(a) * 1.1, z: Math.sin(a) * 1.1, phase: i * 0.5 };
      }),
    []
  );
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.5;
    meshes.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.3 + (Math.sin(t * 2 + bars[i].phase) * 0.5 + 0.5) * 1.1;
      m.scale.y = h;
      m.position.y = h / 2;
    });
  });
  return (
    <group ref={group} rotation={[0.5, 0, 0]}>
      {bars.map((b, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el;
          }}
          position={[b.x, 0, b.z]}
        >
          <boxGeometry args={[0.13, 1, 0.13]} />
          <meshStandardMaterial color="#5eb3ff" emissive="#5eb3ff" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ---- beacon ---- */
function BeaconMini() {
  const core = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const m1 = useRef<THREE.MeshBasicMaterial>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const m2 = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.12);
    const a = ((t % 2.6) / 2.6);
    if (r1.current) r1.current.scale.setScalar(0.5 + a * 2);
    if (m1.current) m1.current.opacity = (1 - a) * 0.6;
    const b = (((t + 1.3) % 2.6) / 2.6);
    if (r2.current) r2.current.scale.setScalar(0.5 + b * 2);
    if (m2.current) m2.current.opacity = (1 - b) * 0.6;
  });
  return (
    <group>
      <mesh ref={core}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffe4a3" emissive="#ffcf6b" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <mesh ref={r1} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.95, 64]} />
        <meshBasicMaterial ref={m1} color="#ffcf6b" transparent side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh ref={r2} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.95, 64]} />
        <meshBasicMaterial ref={m2} color="#ffcf6b" transparent side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---- network ---- */
function NetMini() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 9; i++) {
      const y = 1 - (i / 8) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(1.3));
    }
    return pts;
  }, []);
  const edges = useMemo(() => {
    const e: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < 1.4) e.push([nodes[i], nodes[j]]);
    return e;
  }, [nodes]);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group ref={group}>
      {edges.map((e, i) => (
        <Line key={i} points={[e[0], e[1]]} color="#5eb3ff" lineWidth={1} transparent opacity={0.3} />
      ))}
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#ffcf6b" : "#5eb3ff"} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function MiniScene({ variant }: { variant: "bars" | "beacon" | "network" }) {
  return (
    <Canvas camera={{ position: [0, 0.6, 4], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 3]} intensity={25} color="#ffffff" />
      {variant === "bars" && <BarsMini />}
      {variant === "beacon" && <BeaconMini />}
      {variant === "network" && <NetMini />}
    </Canvas>
  );
}
