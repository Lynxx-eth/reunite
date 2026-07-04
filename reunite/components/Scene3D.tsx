"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const loading = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="h-56 w-56 rounded-full bg-blue/10 blur-3xl" />
  </div>
);

const scenes: Record<string, ComponentType> = {
  data: dynamic(() => import("./three/DataCrownScene"), { ssr: false, loading }),
  beacon: dynamic(() => import("./three/BeaconScene"), { ssr: false, loading }),
  constellation: dynamic(() => import("./three/ConstellationScene"), { ssr: false, loading }),
};

export default function Scene3D({ name }: { name: keyof typeof scenes | string }) {
  const Component = scenes[name] ?? scenes.data;
  return <Component />;
}
