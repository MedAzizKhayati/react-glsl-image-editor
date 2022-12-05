import * as THREE from "three";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect } from "react";
import ImageMaterial from "./materials/ImageMaterial";
import useViewport from "./hooks/useViewport";
import useZoom from "./hooks/useZoom";
import useMouseDown from "./hooks/useMouseDown";
import getIntersectionPosition from "./helpers/getIntersectionPosition";
const unsplashImage = "wall.jpg";

export default function Image({
  src = unsplashImage,
  setPixels = (_) => {},
  ...other
}) {
  const ref = useRef();
  const [rendered, setRendered] = useState(false);
  const [image] = useLoader(THREE.TextureLoader, [src]);
  const state = useThree();
  const { width, height } = useThree((state) => state.viewport);
  const zoom = useZoom();
  const [mouseDownPos, setMouseDownPos] = useState({});
  const mouseDown = useMouseDown(state, () => setMouseDownPos({}));

  const viewPort = useViewport({
    image: image.image,
    zoom,
    width,
    height,
  });

  useFrame((state) => {
    if (mouseDown) {
      // select mesh and set it to the mouse position
      const pos = getIntersectionPosition(state);
      if (!pos) return;
      const { x, y } = pos;
      if (mouseDownPos.x === undefined) {
        mouseDownPos.x = x - ref.current.position.x;
        mouseDownPos.y = y - ref.current.position.y;
        setMouseDownPos(mouseDownPos);
      } else {
        ref.current.position.x = x - mouseDownPos.x;
        ref.current.position.y = y - mouseDownPos.y;
      }
      setRendered(false);
    }

    if (rendered) return;
    setRendered(true);
    state.gl.render(state.scene, state.camera);

    let pixels = new Uint8Array(
      state.gl.domElement.width * state.gl.domElement.height * 4
    );
    const context = state.gl.getContext();
    context.readPixels(
      0,
      0,
      state.gl.domElement.width,
      state.gl.domElement.height,
      context.RGBA,
      context.UNSIGNED_BYTE,
      pixels
    );
    setPixels(pixels);
  }, 1);

  const objectToValues = (obj) => {
    return Object.keys(obj).map((key) => obj[key]);
  };

  useEffect(() => {
    console.log("resetting");
    setRendered(false);
  }, [...objectToValues(other), zoom, width, height]);

  return (
    <mesh ref={ref}>
      <planeGeometry args={viewPort} />
      <Suspense fallback={null}>
        <imageMaterial
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
