import { useEffect, useState } from "react";
import { clamp } from "three/src/math/MathUtils";

export default function useZoom() {
  const [zoom, setZoom] = useState(1);

  // listen to ctrl + mousewheel
  const handleWheel = (e: WheelEvent) => {
    const delta = Math.sign(e.deltaY);
    setZoom((zoom) => clamp(zoom - delta * 0.1, 0.8, 5));
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return zoom;
}
