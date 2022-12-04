import { useState } from "react";
import ImageViewer from "../ImageViewer";
import useImageSettings from "./useImageSettings";
import ImageSettings from "../ImageSettings";

export default function ImageEditor() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useImageSettings();

  return (
    <div className="w-full h-full relative flex-center overflow-hidden bg-[#121212]">
      <ImageViewer {...settings} />
      <ImageSettings
        settings={settings}
        setSettings={setSettings}
        setOpen={setToggleSettings}
        open={toggleSettings}
      />
    </div>
  );
}
