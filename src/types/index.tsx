export interface TCountry {
  latitude: string;
  longitude: string;
  name: string;
}

export interface GlobeType {
  pointDensity?: number;
  pointColor?: string;
  popOverOpen?: number;
  cityMarkerColor?: string;
  cityName?: boolean;
  cityMarkerSize?: number;
  /**
   * Transparency of globe
   * @param 0 - 100
   */
  transparency?: number;
  rotation?: boolean;
}
