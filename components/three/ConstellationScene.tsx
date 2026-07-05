"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function Node({ position, index }: { position: THREE.Vector3; index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const gold = index % 3 === 0;
  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.8 + index) * 0.25;
    if (ref.current) ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.075, 20, 20]} />
      <meshBasicMaterial color={gold ? "#ffcf6b" : "#5eb3ff"} toneMapped={false} />
    </mesh>
  );
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => fibonacciSphere(18, 2.1), []);
  const edges = useMemo(() => {
    const e: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.95) e.push([nodes[i], nodes[j]]);
      }
    }
    return e;
  }, [nodes]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.09;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
    }
  });

  return (
    <group ref={group}>
      {edges.map((e, i) => (
        <Line key={i} points={[e[0], e[1]]} color="#5eb3ff" lineWidth={1} transparent opacity={0.22} />
      ))}
      {nodes.map((n, i) => (
        <Node key={i} position={n} index={i} />
      ))}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#0e1626" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function ConstellationScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 4, 4]} intensity={30} color="#ffcf6b" />
      <Stars radius={60} depth={35} count={1500} factor={4} fade speed={0.5} />
      <Network />
    </Canvas>
  );
}
