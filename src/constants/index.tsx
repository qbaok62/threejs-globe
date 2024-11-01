export const config = {
  urls: {
    globeTexture: "/textures/earth_dark.jpg",
    pointTexture: "/imgs/disc.png",
  },
  sizes: {
    globe: 200,
    globeDotSize: 1.6,
  },
  scale: {
    points: 0.025,
    markers: 0.025,
    globeScale: 1,
  },
  rotation: {
    globe: 0.001,
  },
  colors: {
    globeDotColor: "rgb(203, 168, 0)",
    globeMarkerColor: "rgb(143, 216, 216)",
    globeMarkerGlow: "rgb(255, 255, 255)",
    globeLines: "rgb(255, 255, 255)",
    globeLinesDots: "rgb(255, 255, 255)",
  },
  display: {
    points: true,
    map: true,
    lines: true,
    markers: true,
    markerLabel: true,
    markerPoint: true,
  },
  dots: {
    total: 5,
  },
};
