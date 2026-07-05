"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, QuadraticBezierLine } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const RADIUS = 1.62;

/** Even point distribution on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
    );
  }
  return pts;
}

function Marker({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const s = 1 + Math.sin(t * 2.2) * 0.35;
    if (ref.current) ref.current.scale.setScalar(s);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffcf6b" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color="#fff6df" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Globe() {
  const group = useRef<THREE.Group>(null);

  const dotPositions = useMemo(() => {
    const pts = fibonacciSphere(900, RADIUS);
    const arr = new Float32Array(pts.length * 3);
    pts.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, []);

  const markers = useMemo(() => {
    const all = fibonacciSphere(64, RADIUS);
    const picks = [3, 12, 21, 29, 37, 46, 55];
    return picks.map((i) => all[i]);
  }, []);

  const arcs = useMemo(() => {
    const links: [THREE.Vector3, THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < markers.length - 1; i++) {
      const a = markers[i];
      const b = markers[i + 1];
      const mid = a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(RADIUS * 1.45);
      links.push([a, b, mid]);
    }
    return links;
  }, [markers]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.09;
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0.18]}>
      {/* dotted surface */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          color="#5eb3ff"
          transparent
          opacity={0.9}
          sizeAttenuation
          toneMapped={false}
        />
      </points>

      {/* wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[RADIUS - 0.03, 3]} />
        <meshBasicMaterial color="#1b3a6b" wireframe transparent opacity={0.14} />
      </mesh>

      {/* inner solid core so back dots read as a globe */}
      <mesh>
        <sphereGeometry args={[RADIUS - 0.05, 48, 48]} />
        <meshBasicMaterial color="#08101f" />
      </mesh>

      {/* atmosphere glow */}
      <mesh scale={1.16}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshBasicMaterial
          color="#2f6bd0"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {arcs.map((a, i) => (
        <QuadraticBezierLine
          key={i}
          start={a[0]}
          end={a[1]}
          mid={a[2]}
          color="#ffcf6b"
          lineWidth={1.1}
          transparent
          opacity={0.45}
        />
      ))}

      {markers.map((m, i) => (
        <Marker key={i} position={m} delay={i * 0.8} />
      ))}
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 5, 4]} intensity={40} color="#ffcf6b" />
      <pointLight position={[-6, -3, -4]} intensity={30} color="#5eb3ff" />
      <Stars radius={60} depth={40} count={1800} factor={4} saturation={0} fade speed={0.6} />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <Globe />
      </Float>
    </Canvas>
  );
}
