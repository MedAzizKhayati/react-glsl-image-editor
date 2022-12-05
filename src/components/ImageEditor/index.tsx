import { useEffect, useState } from "react";
import ImageViewer from "../ImageViewer";
import useImageSettings from "./useImageSettings";
import ImageSettings from "../ImageSettings";
import { Header } from "../Header/Header";
import downloadUint8Array from "../../utils/downloadPixelsData";

export default function ImageEditor() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useImageSettings();
  const [pixels, setPixels] = useState<Uint8Array>();

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-hidden bg-[#121212]">
      {/* <img
        className="absolute top-16 right-5 w-56 aspect-video z-10 rounnded"
        src={pixels && downloadUint8Array(pixels, "test.jpg")}
      /> */}
      <Header
        setImageUrl={setSettings("src")}
        handleDownload={() => pixels && downloadUint8Array(pixels, "test.jpg")}
      />
      <ImageViewer {...settings} setPixels={setPixels} />
      <ImageSettings
        settings={settings}
        setSettings={setSettings}
        setOpen={setToggleSettings}
        open={toggleSettings}
      />
    </div>
  );
}
