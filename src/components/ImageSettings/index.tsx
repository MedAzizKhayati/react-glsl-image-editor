import { Settings } from "../ImageViewer";
import RadioInput from "./RadioInput";
import SettingsSection from "./SettingsSection";
import SliderInput from "./SliderInput";

export interface ImageSettingsProps {
  settings: Settings;
  setSettings: (key: keyof Settings) => (value: any) => void;
  open: boolean;
  setOpen: (state: boolean) => void;
}

export default function ImageSettings({
  settings: {
    blurRadius,
    blurFactor,
    brightness,
    contrast,
    exposure,
    saturation,
    noise,
    blurType,
    noiseType,
  },
  setSettings,
}: ImageSettingsProps) {
  return (
    <div
      className={`w-full max-w-[800px] flex gap-5 justify-between p-7 px-10 text-white`}
    >
      <SettingsSection title="spacial filters">
        <RadioInput
          title="Blur Type"
          value={blurType}
          setValue={setSettings("blurType")}
          options={[
            { label: "Box Blur", value: 0 },
            { label: "Gaussian Blur", value: 1 },
            { label: "Median Filter", value: 2 },
          ]}
        />

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
        <RadioInput
          title="Noise Type"
          value={noiseType}
          setValue={setSettings("noiseType")}
          options={[
            { label: "Color Noise", value: 0 },
            { label: "Pepper And Salt", value: 1 },
          ]}
        />
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
