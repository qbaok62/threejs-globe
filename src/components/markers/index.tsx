import { config } from "@/constants";
import { GlobeType } from "@/types";
import { toSphereCoordinates } from "@/ultis";
import { Fragment } from "react";
import { Marker } from "./marker";

interface Props extends Pick<GlobeType, "cityMarkerColor" | "cityName"> {
  countries: { latitude: string; longitude: string; name: string }[];
  cityMarkerSize?: number;
}

export const Markers = ({
  countries,
  cityMarkerSize,
  cityMarkerColor,
  cityName = true,
}: Props) => {
  // const { camera } = useThree();
  // const currentZoom = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
  const radius = config.sizes.globe + config.sizes.globe * config.scale.points;

  return (
    <group name="GlobeMarkers">
      {countries.map((country) => {
        const key = country.name;
        if (!country.latitude || !country.longitude) {
          return <Fragment key={key} />;
        }
        const lat = +country.latitude;
        const lng = +country.longitude;
        const cords = toSphereCoordinates(lat, lng, radius);
        return (
          <Marker
            key={key}
            label={country.name}
            cords={cords}
            cityMarkerSize={cityMarkerSize}
            cityMarkerColor={cityMarkerColor}
            cityName={cityName}
          />
        );
      })}
    </group>
  );
};
