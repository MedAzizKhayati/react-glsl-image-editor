import { Settings } from "../ImageViewer";
import SettingsSection from "./SettingsSection";
import SliderInput from "./SliderInput";

export interface ImageSettingsProps {
  settings: Settings;
  setSettings: (key: keyof Settings) => (value: any) => void;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export default function ImageSettings({
  settings,
  setSettings,
}: ImageSettingsProps) {
  const {
    blurRadius = 0,
    blurFactor = 4,
    gaussian = false,
    brightness = 0,
    contrast = 1,
    exposure = 0,
    saturation = 1,
    noise = 0,
  } = settings;

  return (
    <div
      className={`w-full max-w-[800px] flex gap-5 justify-between p-7 px-10 text-white`}
    >
      <SettingsSection title="spacial filters">
        <div className="flex gap-5 mr-auto">
          <input
            id="gaussian"
            type="checkbox"
            checked={gaussian}
            onChange={() => setSettings("gaussian")(!gaussian)}
          />
          <label htmlFor="gaussian">Gaussian Blur</label>
        </div>

        <SliderInput
          label={`Blur Radius: ${blurRadius}`}
          value={blurRadius}
          setValue={setSettings("blurRadius")}
          min={0}
          max={16}
        />

        <SliderInput
          label={`Blur Factor: ${blurFactor}`}
          value={blurFactor}
          setValue={setSettings("blurFactor")}
          min="1"
          max="10"
          step="0.1"
        />
      </SettingsSection>

      <SettingsSection title="transformations">
        <SliderInput
          label={`Brightness: ${brightness}`}
          value={brightness}
          setValue={setSettings("brightness")}
          min="-0.5"
          max="0.5"
          step="0.01"
        />

        <SliderInput
          label={`Contrast: ${contrast}`}
          value={contrast}
          setValue={setSettings("contrast")}
          min="0"
          max="2"
          step="0.01"
        />

        <SliderInput
          label={`Exposure: ${exposure}`}
          value={exposure}
          setValue={setSettings("exposure")}
          min="-1"
          max="1"
          step="0.01"
        />

        <SliderInput
          label={`Saturation: ${saturation}`}
          value={saturation}
          setValue={setSettings("saturation")}
          min="0"
          max="2"
          step="0.01"
        />
      </SettingsSection>

      <SettingsSection title="settings">
        <SliderInput
          label={`Noise: ${(noise * 100).toFixed(0)}%`}
          value={noise}
          setValue={setSettings("noise")}
          min="0"
          max="1"
          step="0.01"
        />
      </SettingsSection>
    </div>
  );
}
