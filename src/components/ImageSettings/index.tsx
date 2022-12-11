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
    filterRadius,
    filterStrength,
    brightness,
    contrast,
    exposure,
    saturation,
    noise,
    filterType,
    noiseType,
  },
  setSettings,
}: ImageSettingsProps) {
  return (
    <div
      className={`w-full max-w-[800px] flex gap-5 justify-between py-7 px-10 text-white`}
    >
      <SettingsSection title="spacial filters">
        <RadioInput
          title="Filter Type"
          value={filterType}
          setValue={setSettings("filterType")}
          options={[
            { label: "Box Blur", value: 0b1 },
            { label: "Gaussian Blur", value: 0b10 },
            { label: "Median Filter", value: 0b100 },
            { label: "Sharpen (High Pass)", value: 0b1000 },
          ]}
        />

        <SliderInput
          label={`Filter Size: ${filterRadius * 2 + 1}x${filterRadius * 2 + 1}`}
          value={filterRadius}
          setValue={setSettings("filterRadius")}
          min={0}
          max={10}
        />

        <SliderInput
          label={`Filter Strength: ${filterStrength}`}
          value={filterStrength}
          setValue={setSettings("filterStrength")}
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
        <h3 className="-mb-2 mt-2">Threshold</h3>
        <div className="flex flex-wrap justify-start items-end gap-3 text-sm">
          <div className="flex flex-col items-center">
            <label>R</label>
            <input
              type="number"
              min={0}
              max={255}
              className="outline-none w-10 p-1 bg-[#2c2c2c] rounded text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label>G</label>
            <input
              type="number"
              min={0}
              max={255}
              className="outline-none w-10 p-1 bg-[#2c2c2c] rounded"
            />
          </div>
          <div className="flex flex-col items-center">
            <label>B</label>
            <input
              type="number"
              min={0}
              max={255}
              className="outline-none w-10 p-1 bg-[#2c2c2c] rounded"
            />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}
