import ImageService from "../../services/image.service";
import { useState } from "react";
import { PixelData } from "../ImageViewer";
import useDebounce from "../../hooks/useDebounce";
import { MdClose } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function ImageStats({ pixels }: { pixels?: PixelData }) {
  const [toggle, setToggle] = useState<boolean>(false);
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
    <div
      className={`absolute top-24 left-4 p-5 w-64 h-56 z-10  backdrop-blur-md overflow-hidden
       bg-[#121212]/70 text-white rounded shadow-xl transition-all duration-300 ${
         toggle
           ? "w-64 h-56 "
           : "h-14 w-14 bg-[#353535]/70 flex-center rounded-[28rem] animate-pulse hover:animate-none cursor-pointer"
       }`}
      onClick={() => !toggle && setToggle(!toggle)}
    >
      {toggle && (
        <MdClose
          onClick={() => setToggle(!toggle)}
          className="absolute text-white top-2 right-2 shadow-md text-2xl 
          transition-all hover:scale-125 cursor-pointer"
        />
      )}
      {toggle ? (
        loading ? (
          <div className="flex animate-fadein flex-col gap-3 h-full justify-around">
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
          <div className="flex flex-col h-full gap-5 animate-fadein">
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
                <span className="text-sm w-1/2">
                  {stats?.standardDeviation}
                </span>
              </div>
            </div>
          </div>
        )
      ) : (
        <HiOutlineInformationCircle className="text-5xl text-gray-300 absolute" />
      )}
    </div>
  );
}
