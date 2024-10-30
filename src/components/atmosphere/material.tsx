import fragmentShader from "@/shaders/atmosphere/fragment.glsl";
import vertexShader from "@/shaders/atmosphere/vertex.glsl";
import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

export default class AtmosphereMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      uniforms: {},
    });
  }
}

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    atmosphereMaterial: Object3DNode<
      AtmosphereMaterial,
      typeof AtmosphereMaterial
    >;
  }
}
