import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";

const ImageMaterial = shaderMaterial(
  {
    time: 0,
    uColor: new THREE.Color("#f02"),
    uTexture: new THREE.Texture(),
    resolution: new THREE.Vector2(),
    imageResolution: new THREE.Vector2(),
    blurRadius: 0,
    blurFactor: 1,
    gaussian: false,
    brightness: 0,
    contrast: 1,
    exposure: 0,
    saturation: 1,
  },
  glsl`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
  glsl`
      uniform sampler2D uTexture;
      uniform vec3 uColor;
      uniform vec2 resolution;
      uniform vec2 imageResolution;
      varying vec2 vUv;
      uniform float time;
      uniform float blurFactor;
      uniform float brightness;
      uniform float contrast;
      uniform float exposure;
      uniform float saturation;
      uniform int blurRadius;
      uniform bool gaussian;

      

      vec2 getPixelCoords(vec2 uv) {
        return uv * resolution;
      }

      vec2 getUvCoords(vec2 pixelCoords) {
        return pixelCoords / resolution;
      }

      vec4 gaussianBlur(sampler2D image, vec2 uv, int radius, float sigma) {
        vec4 color = vec4(0.0);
        float weightSum = 0.0;
        vec2 onePixel = vec2(1.0) / imageResolution;
        float sigma_sq = sigma * sigma * 2.0;
        float dividend = (3.1415926 * sigma_sq);
        for (int x = -radius; x <= radius; x++) {
          for (int y = -radius; y <= radius; y++) {
            float weight = 1.0 / dividend * exp(-(float(x) * float(x) + float(y) * float(y)) / (sigma_sq));
            color += texture2D(image, uv + vec2(float(x), float(y)) * onePixel) * weight;
            weightSum += weight;
          }
        }
        return color / weightSum;
      }

      vec4 blurCurrentPixel(sampler2D image, vec2 uv, int blurRadius, float blurStrength) {
        vec3 sum = vec3(0.0);
        vec2 onePixel = vec2(1.0) / imageResolution;
        float avg = 0.0;
        for (int x = -blurRadius; x <= blurRadius; x++) {
          for (int y = -blurRadius; y <= blurRadius; y++) {
            vec2 offset = vec2(x, y) * onePixel;
            if(x == 0 && y == 0) {
              sum += texture2D(image, uv).rgb;
              avg += 1.0;
            }
            else {
              sum += texture2D(image, uv + offset * blurStrength).rgb;
              avg += blurStrength;
            }
          }
        }
        return vec4(sum / (float((blurRadius * 2) + 1) * float((blurRadius * 2) + 1)), 1.0);
      }

      vec4 adjustBrightness(vec4 color, float value) {
        return color + vec4(value);
      }

      vec4 adjustContrast(vec4 color, float value) {
        return vec4((color.rgb - 0.5) * value + 0.5, color.a);
      }

      vec4 adjustExposure(vec4 color, float value) {
        return vec4(vec3(1.0 + value) * color.rgb, color.a);
      }

      vec4 adjustSaturation(vec4 color, float value) {
        vec3 gray = vec3(dot(vec3(0.2125, 0.7154, 0.0721), color.rgb));
        return vec4(mix(gray, color.rgb, value), color.a);
      }

      void main() {
        if(gaussian) {
          gl_FragColor = gaussianBlur(uTexture, vUv, blurRadius, blurFactor);
        }else {
          gl_FragColor = blurCurrentPixel(uTexture, vUv, blurRadius, blurFactor);
        }
        gl_FragColor = adjustContrast(gl_FragColor, contrast);
        gl_FragColor = adjustBrightness(gl_FragColor, brightness);
        gl_FragColor = adjustExposure(gl_FragColor, exposure);
        gl_FragColor = adjustSaturation(gl_FragColor, saturation);

      }`
);

extend({ ImageMaterial });

export default ImageMaterial;
