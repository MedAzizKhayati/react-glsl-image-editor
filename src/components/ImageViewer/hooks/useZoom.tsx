import { useEffect, useState } from "react";
import { clamp } from "three/src/math/MathUtils";

export default function useZoom() {
  const [zoom, setZoom] = useState(1);
  const [, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // listen to ctrl + mousewheel
  const handleWheel = (e: WheelEvent) => {
    const delta = -Math.sign(e.deltaY);
    setIntervalId((id) => {
      if (id) clearInterval(id);
      return null;
    });

    let speed = 0.1;
    const id = setInterval(() => {
      setZoom((prev) => {
        if (speed < 0.001) {
          clearInterval(id);
          return prev;
        }
        speed *= 0.9;
        return clamp(prev + delta * speed, 0.8, 5);
      });
    }, 20);

    setIntervalId(id);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return zoom;
}
