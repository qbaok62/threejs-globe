import { config } from "@/constants";
import { GlobeType } from "@/types";
import { toSphereCoordinates } from "@/ultis";
import { useMemo } from "react";
import * as THREE from "three";

interface Props extends Pick<GlobeType, "pointDensity" | "pointColor"> {
  grid: {
    lat: number;
    lon: number;
    b: {
      x: number;
      y: number;
      z: number;
    }[];
  }[];
}

const pointSize = config.sizes.globeDotSize;

export const Points = ({
  grid,
  pointColor = config.colors.globeDotColor,
}: Props) => {
  const { colors, positions, sizes } = useMemo(() => {
    const radius =
      config.sizes.globe + config.sizes.globe * config.scale.points;

    const color = new THREE.Color();
    const positionArray: number[] = [];
    const sizeArray: number[] = [];
    const colorsArray: [] = [];

    grid.forEach((item, i) => {
      const { lat, lon } = item;
      const { x, y, z } = toSphereCoordinates(lat, lon, radius);

      positionArray.push(-x, -y, -z);
      sizeArray.push(pointSize);

      color.set(pointColor);
      color.toArray(colorsArray, i * 3);
    });
    return {
      positions: new Float32Array(positionArray),
      colors: new Float32Array(colorsArray),
      sizes: new Float32Array(sizeArray),
    };
  }, [grid, pointColor]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length / 1}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial color={pointColor} size={config.sizes.globeDotSize} />
    </points>
  );
};
