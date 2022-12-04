import { useEffect, useState } from "react";
import ImageViewer from "../ImageViewer";
import useImageSettings from "./useImageSettings";
import ImageSettings from "../ImageSettings";
import { Header } from "../Header/Header";
import { useUploadedImage } from "../ImageViewer/hooks/useUploadedImage";

export default function ImageEditor() {
  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useImageSettings();
  const { url, setImageUrl } = useUploadedImage();

  useEffect(() => {
    if (url) {
      setSettings("src")(url);
    }
  }, [url]);

  return (
    <div className="w-full h-full relative flex-start overflow-hidden bg-[#121212]">
      <Header setImageUrl={setImageUrl} />
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
