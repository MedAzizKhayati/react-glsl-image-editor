export default function RGBInput({
  label = "R",
}) {
  return (
    <>
      <h3 className="-mb-2 mt-2">Threshold</h3>
      <div className="flex flex-wrap justify-start items-end gap-3 text-sm">
        <div className="flex flex-col items-center">
          <label>{label}</label>
          <input
            type="number"
            min={0}
            max={255}
            className="outline-none w-10 p-1 bg-[#2c2c2c] rounded text-center"
          />
        </div>
      </div>
    </>
  );
}
