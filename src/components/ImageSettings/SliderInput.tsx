export interface SliderInputProps {
  label: string;
  value: number;
  setValue: (state: number) => void;
}

export default function SliderInput({
  label,
  setValue,
  ...others
}: SliderInputProps & JSX.IntrinsicElements["input"]) {
  return (
    <>
      <label className="text-sm w-full">{label}</label>
      <input
        type="range"
        onChange={(e) => setValue(+e.target.value)}
        className="w-full h-3 ring-1 ring-gray-400/5 rounded-lg appearance-none cursor-pointer
         bg-transparent backdrop-blur-2xl outline-none transition-colors hover:bg-gray-400/20"
        {...others}
      />
    </>
  );
}
