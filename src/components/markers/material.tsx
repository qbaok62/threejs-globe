import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

export default class GlowMaterial extends THREE.ShaderMaterial {
  constructor({
    cityMarkerSize,
    glowColor,
  }: {
    cityMarkerSize: number;
    glowColor: string;
  }) {
    super({
      transparent: true,
      vertexShader: `
        uniform float uSize;
        uniform float uTime;
        uniform float uRandom;
        uniform float uFrequency;

        varying float vTime;

        void main() {
          float deltaTime = mod((uTime + uRandom) * uFrequency , 1.0);
          vec3 newPosition = position * uSize * deltaTime;
          vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition ;
          vTime = deltaTime;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vTime;
        
        void main() {
          float alpha = 1.0 - smoothstep(0.0001, 0.6, vTime);
          alpha *= 0.55;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      uniforms: {
        uSize: new THREE.Uniform(cityMarkerSize * 4),
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(glowColor)),
        uOpacity: new THREE.Uniform(0.2),
        uRandom: new THREE.Uniform(Math.random() * 10),
        uFrequency: new THREE.Uniform(0.9),
      },
    });
  }
}

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    glowMaterial: Object3DNode<GlowMaterial, typeof GlowMaterial>;
  }
}
