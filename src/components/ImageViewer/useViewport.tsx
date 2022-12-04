import { useMemo } from "react";

export interface ViewportProps {
  width: number;
  height: number;
  image: HTMLImageElement;
  imgHeight: number;
  imgWidth: number;
  zoom: number;
}

export default function useViewport({
  image,
  zoom,
  width,
  height,
}: ViewportProps) {
  const viewPort = useMemo(() => {
    if (!image) return null;
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;
    if (imgRatio > canvasRatio) {
      return [width * zoom, (width / imgRatio) * zoom];
    } else {
      return [height * imgRatio * zoom, height * zoom];
    }
  }, [image, width, height, zoom]);

  return viewPort;
}
