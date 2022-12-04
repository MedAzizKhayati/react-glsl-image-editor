import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import fragment_ from "./shaders/fragment.glsl";
import vertex_ from "./shaders/vertex.glsl";

const FRAGMENT = await fetch(fragment_).then((response) => response.text());
const VERTEX = await fetch(vertex_).then((response) => response.text());

export const MATERIAL_ARGS = {
  time: 0,
  uColor: new THREE.Color("#f02"),
  uTexture: new THREE.Texture(),
  resolution: new THREE.Vector2(),
  imageResolution: new THREE.Vector2(),
  blurRadius: 0,
  blurFactor: 4,
  gaussian: false,
  brightness: 0,
  contrast: 1,
  exposure: 0,
  saturation: 1,
  noise: 0,
};

const ImageMaterial = shaderMaterial(MATERIAL_ARGS, VERTEX, FRAGMENT);

extend({ ImageMaterial });

export default ImageMaterial;
