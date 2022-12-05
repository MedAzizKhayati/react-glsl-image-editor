import { Canvas } from "@react-three/fiber";
import Image from "./Image";

export interface Settings {
  /* Image Source Url\Uri */
  src?: string;
  setPixels?: (pixels: Uint8Array) => void;
  /* Spacial Filters */
  blurType: number;
  blurRadius: number;
  blurFactor: number;
  /* Color Filters */
  brightness: number;
  contrast: number;
  exposure: number;
  saturation: number;
  /* Noise */
  noise: number;
  noiseType: number;
}

export default function ImageViewer(settings: Settings) {
  return (
    <div className="flex-1 w-full">
      <Canvas>
        <Image {...settings} />
      </Canvas>
    </div>
  );
}
