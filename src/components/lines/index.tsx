import { config } from "@/constants";
import { allCountries } from "@/constants/all-countries";
import { connections } from "@/constants/connections";
import { getCountry, getSplineFromCoords } from "@/ultis";
import { CubicBezierLine } from "@react-three/drei";
import { Fragment, useEffect, useState } from "react";
import * as THREE from "three";
import { Dots } from "./dots";

const countries = Object.keys(connections);
const total = countries.length;
const interval = 10000;

export const Lines = () => {
  const [active, setActive] = useState(0);

  const radius = config.sizes.globe + config.sizes.globe * config.scale.points;
  const [key, value] = Object.entries(connections)[active];
  const startCountry = getCountry(key, allCountries);

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setActive((prev) => {
          if (prev + 1 >= total) {
            return 0;
          }
          return prev + 1;
        }),
      interval
    );

    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <group name="Lines">
      {value.map((endCountry) => {
        const { start, end, mid1, mid2 } = getSplineFromCoords(
          +startCountry.latitude,
          +startCountry.longitude,
          +endCountry.latitude,
          +endCountry.longitude,
          radius
        );
        const curve = new THREE.CubicBezierCurve3(start, mid1, mid2, end);
        const points = curve.getPoints(200);
        return (
          <Fragment key={endCountry.name}>
            <CubicBezierLine
              start={start}
              end={end}
              midA={mid1}
              midB={mid2}
              color={config.colors.globeLines}
              transparent={true}
              opacity={0.5}
            />
            <Dots
              countries={{
                ...endCountry,
                points,
              }}
            />
          </Fragment>
        );
      })}
    </group>
  );
};
