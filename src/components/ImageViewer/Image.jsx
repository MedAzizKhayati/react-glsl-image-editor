import * as THREE from "three";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import ImageMaterial from "./ImageMaterial";
import useViewport from "./useViewport";
import useZoom from "./useZoom";

const unsplashImage = "wall.jpg";

export default function Image({ src = unsplashImage, ...other }) {
  const ref = useRef();
  const state = useThree();
  const { width, height } = useThree((state) => state.viewport);
  const [image] = useLoader(THREE.TextureLoader, [src]);
  const [rendered, setRendered] = useState(false);
  const zoom = useZoom();

  const viewPort = useViewport({
    image: image.image,
    zoom,
    width,
    height,
  });

  useFrame(({ gl, scene, camera }) => {
    if (!rendered) {
      setRendered(true);
      gl.render(scene, camera);
    }
  }, 1);

  useEffect(() => {
    setRendered(false);
  }, [state, zoom]);

  return (
    <mesh scale={[...viewPort, 1]}>
      <planeGeometry />
      <Suspense fallback={null}>
        <imageMaterial
          ref={ref}
          key={ImageMaterial.key}
          resolution={[width, height]}
          imageResolution={[image?.image?.width, image?.image?.height]}
          uTexture={image}
          {...other}
        />
      </Suspense>
    </mesh>
  );
}
