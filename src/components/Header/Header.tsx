export const Header = () => {
  return (
    <div className="w-full h-20 flex flex-row max-w-[1200px] mx-auto justify-between items-center px-10">
      <a className="px-4 py-2 bg-[#2c2c2c] rounded-lg text-gray-500 transition-all duration-300 cursor-pointer hover:text-white hover:bg-buttonBlue">
        Check our github
      </a>
      <div className="flex flex-row gap-4">
        <label className="bg-buttonBlue text-xs flex flex-col items-center justify-center rounded-lg px-4 py-2 cursor-pointer text-white transition-all duration-500 ease-out hover:-translate-y-1">
          Load Image
          <input className="hidden h-full w-full" id="file_input" type="file" />
        </label>
        <div className="text-xs flex flex-col items-center justify-center px-4 py-2 bg-gray-50 rounded-lg text-buttonBlue cursor-pointer transition-all duration-500 ease-out hover:-translate-y-1">
          Download Image
        </div>
      </div>
    </div>
  );
};
