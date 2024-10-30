import { config } from "@/constants";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import AtmosphereMaterial from "./material";

extend({ AtmosphereMaterial });

interface Props {
  transparency?: number;
}

export const Atmosphere = ({ transparency = 100 }: Props) => {
  const globeRef = useRef<Mesh>(null);

  const opacity = transparency / 100;

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[config.sizes.globe, 64, 64]} />
      <atmosphereMaterial opacity={opacity} />
    </mesh>
  );
};
