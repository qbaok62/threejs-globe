import { config } from "@/constants";
import { GlobeType } from "@/types";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import GlowMaterial from "./material";
import { useControls } from "leva";

interface Props
  extends Pick<GlobeType, "cityMarkerColor" | "cityName" | "cityMarkerSize"> {
  label: string;
  cords: { x: number; y: number; z: number };
  textColor?: string;
  glowColor?: string;
}

const markerMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.8,
});

export const Marker = ({
  label,
  cords,
  textColor = "white",
  glowColor = config.colors.globeMarkerGlow,
  cityMarkerSize = 2,
  cityMarkerColor = config.colors.globeMarkerColor,
  cityName = config.display.markerLabel,
}: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<GlowMaterial>(null);

  const markerGeometry = useMemo(
    () => new THREE.SphereGeometry(cityMarkerSize, 15, 15),
    [cityMarkerSize]
  );

  const glowMaterial = useMemo(
    () => new GlowMaterial({ cityMarkerSize: 4, glowColor }),
    [glowColor]
  );

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  const { glow } = useControls({
    glow: {
      value: false,
    },
  });

  return (
    <group
      name="Marker"
      ref={groupRef}
      position={[-cords.x, cords.y, -cords.z]}
    >
      {/* Glow */}
      {glow && (
        <mesh>
          <primitive object={markerGeometry.clone()} />
          <primitive object={glowMaterial} ref={glowRef} />
        </mesh>
      )}

      {/* Point */}
      <mesh>
        <primitive object={markerGeometry} />
        <primitive object={markerMaterial} color={cityMarkerColor} />
      </mesh>

      {/* Label */}
      {!!cityName && (
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
      )}
    </group>
  );
};
