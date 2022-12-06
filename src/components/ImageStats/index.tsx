import ImageService from "../../services/image.service";
import { useEffect, useMemo, useState } from "react";
import { PixelData } from "../ImageViewer";
import useDebounce from "../../hooks/useDebounce";

export default function ImageStats({ pixels }: { pixels?: PixelData }) {
  // const [loading, setLoading] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<any>();
  const [skeletons] = useState<string[]>(
    Array(6)
      .fill(0)
      .map((_) => `${Math.random() * 100}%`)
  );

  const loading = useDebounce(
    () => {
      if (pixels) {
        const imageService = new ImageService(pixels);
        setStats(imageService.getStatistics());
      }
    },
    100,
    [pixels]
  );

  return (
    <div className="absolute top-24 left-1 p-5 w-64 h-56 z-10  backdrop-blur-md bg-[#121212]/70 text-white rounded">
      {loading ? (
        <div className="flex flex-col gap-3 h-full justify-around">
          {skeletons.map((val: string, i) => (
            <div key={i} className="animate-pulse flex justify-between gap-2">
              <span
                className="h-5 bg-gray-400 rounded-sm"
                style={{
                  width: val,
                }}
              ></span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col h-full gap-5">
          <h1 className="font-bold text-center">STATISTICS</h1>
          <div className="flex flex-col justify-around h-full">
            <div className="flex gap-3 items-center justify-between">
              <span className="text-sm">Minimum: </span>
              <span className="text-sm w-1/2">{stats?.min}</span>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <span className="text-sm">Maximum: </span>
              <span className="text-sm w-1/2">{stats?.max}</span>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <span className="text-sm">Mean: </span>
              <span className="text-sm w-1/2">{stats?.mean}</span>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <span className="text-sm">Deviation: </span>
              <span className="text-sm w-1/2">{stats?.standardDeviation}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
