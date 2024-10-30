"use client";

import { countries } from "@/constants/countries";
import { grid } from "@/constants/grid";
import { GlobeType } from "@/types";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Group } from "three";
import { Markers } from "../markers";
import { Points } from "../points";
import { useControls } from "leva";
import { config } from "@/constants";
import { Atmosphere } from "../atmosphere";
import { Lines } from "../lines";

export const Globe = ({
  pointDensity,
  pointColor = config.colors.globeDotColor,
  cityMarkerColor = config.colors.globeMarkerColor,
  cityName = true,
  cityMarkerSize = 2,
  transparency = 100,
  rotation = true,
}: GlobeType) => {
  const [rotatable, setRotatable] = useState(rotation);
  const globeRef = useRef<Group>(null);

  const {
    rotation: controlledRotation,
    pointColor: controlledPointColor,
    cityMarkerColor: controlledCityMarkerColor,
    cityName: controlledCityName,
    cityMarkerSize: controlledCityMarkerSize,
    transparency: controlledTransparency,
  } = useControls({
    rotation: { value: rotation },
    pointColor: {
      value: pointColor,
    },
    cityMarkerColor: {
      value: cityMarkerColor,
    },
    cityName: {
      value: cityName,
    },
    cityMarkerSize: {
      value: cityMarkerSize,
      min: 1,
      max: 5,
    },
    transparency: {
      value: transparency,
      min: 0,
      max: 100,
    },
  });

  const handleMouseHover = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setRotatable(false);
  };
  const handleMouseLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setRotatable(true);
  };

  useFrame(() => {
    if (!rotatable || !controlledRotation) {
      return;
    }
    if (globeRef.current) {
      globeRef.current.rotation.y -= 0.0025;
    }
  });

  return (
    <>
      <color args={["black"]} attach={"background"} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      <PerspectiveCamera
        fov={60}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 15, 30]}
      />

      <group
        ref={globeRef}
        name="Main"
        onPointerEnter={handleMouseHover}
        onPointerLeave={handleMouseLeave}
      >
        <Suspense fallback={null}>
          <Atmosphere transparency={controlledTransparency} />
          <Points
            grid={grid}
            pointDensity={pointDensity}
            pointColor={controlledPointColor}
          />
          <Markers
            countries={countries}
            cityMarkerColor={controlledCityMarkerColor}
            cityName={controlledCityName}
            cityMarkerSize={controlledCityMarkerSize}
          />
          <Lines />
        </Suspense>
      </group>
    </>
  );
};
