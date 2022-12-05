import { RootState } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function useMouseDown(
  state: RootState,
  callback?: (down: boolean) => void
) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  useEffect(() => {
    const canvas = state.gl.domElement;
    canvas.style.cursor = "grab";
    const handleMouseDown = () => {
      canvas.style.cursor = "grabbing";
      setMouseDown(true);
    };
    const handleMouseUp = () => {
      canvas.style.cursor = "grab";
      setMouseDown(false);
      callback?.(false);
    };
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, []);
  return mouseDown;
}
