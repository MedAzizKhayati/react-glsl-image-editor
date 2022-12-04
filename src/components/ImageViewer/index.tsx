import { Canvas } from "@react-three/fiber";
import Image from "./Image";

export interface Settings {
  blurRadius?: number;
  blurFactor?: number;
  gaussian?: boolean;
  brightness?: number;
  contrast?: number;
  exposure?: number;
  saturation?: number;
  noise?: number;
  src?: string;
}

export default function ImageViewer(settings: Settings) {
  return (
    <Canvas>
      <Image {...settings} />
    </Canvas>
  );
}
