"use client";

import { Globe } from "@/components/globe";
import { config } from "@/constants";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <main id="canvas-container" className="h-screen">
      <Canvas
        camera={{
          position: [0, 0, config.sizes.globe * 2.05],
        }}
      >
        <Globe />
      </Canvas>
    </main>
  );
}
