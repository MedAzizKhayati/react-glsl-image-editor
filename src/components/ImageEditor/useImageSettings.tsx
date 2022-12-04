import { useState } from "react";
import { Settings } from "../ImageViewer";

export default function useImageSettings(
  initialState: Settings = {}
): [Settings, (key: keyof Settings) => (value: any) => void] {
  const [settings, setSettings_] = useState(initialState);
  const setSettings = (key: keyof Settings) => (value: any) =>
    setSettings_((prev) => ({ ...prev, [key]: value }));
  return [settings, setSettings];
}
