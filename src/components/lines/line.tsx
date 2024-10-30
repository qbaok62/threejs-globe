import { config } from "@/constants";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  material: THREE.Material;
  geometry: THREE.BufferGeometry;
  label: string;
  cords: { x: number; y: number; z: number };
  textColor?: string;
  pointColor?: string;
  glowColor?: string;
}

export const Line = ({
  material,
  geometry,
  label,
  cords,
  textColor = "white",
  pointColor = config.colors.globeMarkerColor,
  glowColor = config.colors.globeMarkerGlow,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const isAnimatingRef = useRef(false);

  const animateGlow = () => {
    if (!isAnimatingRef.current) {
      if (Math.random() > 0.8) {
        isAnimatingRef.current = true;
      }
    } else {
      const glowMesh = glowRef.current;
      if (glowMesh) {
        glowMesh.scale.x += 0.025;
        glowMesh.scale.y += 0.025;
        glowMesh.scale.z += 0.025;
        (glowMesh.material as THREE.Material).opacity -= 0.005;

        if (glowMesh.scale.x >= 4) {
          glowMesh.scale.set(1, 1, 1);
          (glowMesh.material as THREE.Material).opacity = 0.6;
          isAnimatingRef.current = false;
        }
      }
    }
  };

  useFrame(() => {
    animateGlow();
  });

  return (
    <group
      name="Marker"
      ref={groupRef}
      position={[-cords.x, cords.y, -cords.z]}
    >
      {/* Point */}
      <mesh>
        <primitive object={geometry} />
        <primitive object={material} color={pointColor} depthWrite={false} />
      </mesh>

      {/* Glow */}
      <mesh ref={glowRef}>
        <primitive object={geometry} />
        <primitive
          object={material.clone()}
          color={glowColor}
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Html center={true} distanceFactor={320}>
        <p
          style={{
            color: textColor,
            textWrap: "nowrap",
            transform: "translateY(-26px)",
          }}
        >
          {label}
        </p>
      </Html>
    </group>
  );
};
