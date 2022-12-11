import ImageService from "../../services/image.service";
import { useState } from "react";
import { PixelData } from "../ImageViewer";
import useDebounce from "../../hooks/useDebounce";
import { MdClose } from "react-icons/md";
import { HiOutlineInformationCircle } from "react-icons/hi";
import useSkeletons from "./useSekeletons";
import Chart from "react-apexcharts";

export default function ImageStats({ pixels }: { pixels?: PixelData }) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [stats, setStats] = useState<any>();
  const skeletons = useSkeletons();
  const [options, setOptions] = useState<any>();
  const [series, setSeries] = useState<any>();

  const loading = useDebounce(
    () => {
      if (pixels) {
        const imageService = new ImageService(pixels);
        const stats = imageService.getStatistics();
        setStats(stats);
        const SUBDIVISIONS = 8;
        const options = {
          chart: {
            id: "histogram",
          },
          xaxis: {
            categories: Array(SUBDIVISIONS)
              .fill(0)
              .map((_, i) => i * (256 / SUBDIVISIONS)),
          },
          stroke: {
            curve: "smooth",
            width: 3,
            lineCap: "round",
          },
          title: {
            text: "Histogram",
          },
        };
        // only take 20 values from the histogram
        const histogram: number[][] = [];
        for (let i = 0; i < 256; i += 256 / SUBDIVISIONS) {
          histogram.push(stats.histogram[i]);
        }
        const colors = ["#F00", "#0F0", "#00F"];
        const series = ["red", "green", "blue"].map((color, i) => ({
          name: color,
          data: histogram.map((val: number[]) => val[i]),
          color: colors[i],
        }));

        setOptions(options);
        setSeries(series);
      }
    },
    50,
    [pixels]
  );

  return (
    <>
      <div
        className={`absolute top-24 left-4 p-5 w-64 h-56 z-10  backdrop-blur-md overflow-hidden
       bg-primaryBackground/70 text-white rounded shadow-xl transition-all duration-300 ${
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
                <div
                  key={i}
                  className="animate-pulse flex justify-between gap-2"
                >
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
      {options && series && (
        <div
          className={`absolute top-96 left-4 z-10 py-2  backdrop-blur-md overflow-hidden
       bg-primaryBackground/70 text-gray-700 rounded shadow-xl transition-all duration-300 ${
         toggle ? "" : "opacity-0 -z-10"
       }`}
        >
          <Chart options={options} series={series} type="line" />
        </div>
      )}
    </>
  );
}
