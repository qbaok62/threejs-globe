import { config } from "@/constants";
import { TCountry } from "@/types";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  countries: TCountry & { points: THREE.Vector3[] };
}

const Dot = ({ countries }: Props) => {
  const pathRef = useRef<THREE.Vector3[] | null>();
  const pathIndexRef = useRef<number>(0);
  const meshRef = useRef<THREE.Mesh>(null);

  const assignToLine = () => {
    if (countries) {
      pathRef.current = countries.points;
    }
  };

  useFrame(() => {
    if (!pathRef.current) {
      if (Math.random() > 0.99) {
        assignToLine();
        pathIndexRef.current = 0;
      }
    } else if (
      pathRef.current &&
      pathIndexRef.current < pathRef.current.length - 1
    ) {
      const { x, y, z } = pathRef.current[pathIndexRef.current];
      meshRef.current?.position.set(x, y, z);
      pathIndexRef.current++;
    } else {
      pathRef.current = null;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color={config.colors.globeLinesDots}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
};

export const Dots = (props: Props) => {
  return (
    <group name="LineDots">
      {Array(config.dots.total)
        .fill("")
        .map((_, idx) => (
          <Dot key={idx} {...props} />
        ))}
    </group>
  );
};
