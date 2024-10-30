import { TCountry } from "@/types";
import * as THREE from "three";
import * as d3 from "d3";

export const toSphereCoordinates = (
  lat: number,
  lng: number,
  scale: number
) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((180 - lng) * Math.PI) / 180;
  const x = scale * Math.sin(phi) * Math.cos(theta);
  const y = scale * Math.cos(phi);
  const z = scale * Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
};

export const returnCurveCoordinates = (
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
  size: number
) => {
  const start = toSphereCoordinates(latitudeA, longitudeA, size);
  const end = toSphereCoordinates(latitudeB, longitudeB, size);

  const midPointX = (start.x + end.x) / 2;
  const midPointY = (start.y + end.y) / 2;
  const midPointZ = (start.z + end.z) / 2;

  let distance = Math.pow(end.x - start.x, 2);
  distance += Math.pow(end.y - start.y, 2);
  distance += Math.pow(end.z - start.z, 2);
  distance = Math.sqrt(distance);

  let multipleVal = Math.pow(midPointX, 2);
  multipleVal += Math.pow(midPointY, 2);
  multipleVal += Math.pow(midPointZ, 2);

  multipleVal = Math.pow(distance, 2) / multipleVal;
  multipleVal = multipleVal * 0.7;

  const midX = midPointX + multipleVal * midPointX;
  const midY = midPointY + multipleVal * midPointY;
  const midZ = midPointZ + multipleVal * midPointZ;

  return {
    start: {
      x: start.x,
      y: start.y,
      z: start.z,
    },
    mid: {
      x: midX,
      y: midY,
      z: midZ,
    },
    end: {
      x: end.x,
      y: end.y,
      z: end.z,
    },
  };
};

export const GLOBE_RADIUS = 200;
export const CURVE_MIN_ALTITUDE = 20;
export const CURVE_MAX_ALTITUDE = 200;
export const DEGREE_TO_RADIAN = Math.PI / 180;

export const clamp = (num: number, min: number, max: number) => {
  return num <= min ? min : num >= max ? max : num;
};

export const coordinateToPosition = (
  lat: number,
  lng: number,
  radius: number
) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((180 - lng) * Math.PI) / 180;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.sin(theta)
  );
};

export const getSplineFromCoords = (
  latitudeA: number,
  longitudeA: number,
  latitudeB: number,
  longitudeB: number,
  size: number
) => {
  const start = coordinateToPosition(latitudeA, longitudeA, size);
  const end = coordinateToPosition(latitudeB, longitudeB, size);

  // altitude
  const altitude = clamp(
    start.distanceTo(end) * 0.45,
    CURVE_MIN_ALTITUDE,
    CURVE_MAX_ALTITUDE
  );

  // 2 control points
  const interpolate = d3.geoInterpolate(
    [longitudeA, latitudeA],
    [longitudeB, latitudeB]
  );
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);
  const mid1 = coordinateToPosition(
    midCoord1[1],
    midCoord1[0],
    GLOBE_RADIUS + altitude
  );
  const mid2 = coordinateToPosition(
    midCoord2[1],
    midCoord2[0],
    GLOBE_RADIUS + altitude
  );

  return { start, end, mid1, mid2 };
};

export const getCountry = (name: string, countries: TCountry[]) => {
  return countries.find((c) => c.name === name) ?? countries[0];
};
