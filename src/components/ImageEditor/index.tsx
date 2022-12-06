import { useState } from "react";
import ImageViewer, { PixelData } from "../ImageViewer";
import useImageSettings from "./useImageSettings";
import ImageSettings from "../ImageSettings";
import { Header } from "../Header/Header";
import ImageStats from "../ImageStats";
import ImageService from "../../services/image.service";

export default function ImageEditor() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useImageSettings();
  const [pixels, setPixels] = useState<PixelData>();
  const imageService = pixels && new ImageService(pixels);

  return (
    <div className="w-full h-full relative flex flex-col items-center overflow-hidden bg-[#121212]">
      <Header
        setImageUrl={setSettings("src")}
        handleDownload={() => imageService?.downloadImage()}
      />
      <ImageViewer {...settings} setPixels={setPixels} />
      <ImageSettings
        settings={settings}
        setSettings={setSettings}
        setOpen={setToggleSettings}
        open={toggleSettings}
      />
      <ImageStats pixels={pixels} />
    </div>
  );
}
