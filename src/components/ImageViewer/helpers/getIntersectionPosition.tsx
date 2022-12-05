import * as THREE from "three";
import { RootState } from "@react-three/fiber";

export default function getIntersectionPosition(state: RootState) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(state.mouse, state.camera);
  const intersects = raycaster.intersectObjects(state.scene.children);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    const { x, y } = intersect.point;
    return new THREE.Vector2(x, y);
  }
  return null;
}
