import { Tooltip } from "@mantine/core";
import { useState } from "react";
import { FcClearFilters } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";
import { Range } from "react-range";

const Categories = ["Video", "Music", "Art", "LLM"];

const FilterButtons = () => {
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] =
    useState<boolean>(false);
  const [isPriceMenuVisible, setIsPriceMenuVisible] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  return (
    <>
      <div className="relative">
        <div
          className="px-4 py-2 bg-blue-500 text-center flex flex-row hover:cursor-pointer hover:bg-blue-500/80 items-center gap-2 justify-center rounded-md transition-all duration-200"
          onClick={() => setIsCategoryMenuVisible(!isCategoryMenuVisible)}
        >
          <p className="select-none text-white">Categories</p>
          <IoMdArrowDropdown
            className={`${
              isCategoryMenuVisible ? " rotate-180 " : "rotate-0 "
            } transition-all duration-200 text-white`}
            size={24}
          />
        </div>
        {isCategoryMenuVisible && (
          <div className="absolute mt-2 w-full rounded border   shadow-lg z-30 border-[#3B3B3D] ">
            {Categories.map((value, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 hover:bg-[#232325] bg-[#121212] cursor-pointer  "
                onClick={() => {
                  const checkbox = document.getElementById(
                    `category-checkbox-${index}`
                  ) as HTMLInputElement;
                  checkbox.checked = !checkbox.checked;
                }}
              >
                <input
                  onClick={(e) => e.stopPropagation()}
                  id={`category-checkbox-${index}`}
                  type="checkbox"
                  className="mr-2 "
                ></input>
                <p className="select-none text-white">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <div
          className="px-4 py-2 bg-blue-500 text-center flex flex-row hover:cursor-pointer hover:bg-blue-500/80 items-center gap-2 justify-center rounded-md transition-all duration-200"
          onClick={() => setIsPriceMenuVisible(!isPriceMenuVisible)}
        >
          <p className="select-none text-white">Price range</p>
          <IoMdArrowDropdown
            className={`${
              isPriceMenuVisible ? " rotate-180 " : " rotate-0 "
            } transition-all duration-200 text-white`}
            size={24}
          />
        </div>
        {isPriceMenuVisible && (
          <div className="absolute mt-2 w-fit bg-[#121212] border border-[#3B3B3D] rounded-md shadow-lg z-30 p-4">
            <div className="flex flex-col items-center">
              <p className="mb-2 select-none text-white">Select Price Range</p>
              <Range
                step={1}
                min={0}
                max={1000}
                values={priceRange}
                onChange={(values) => setPriceRange(values as [number, number])}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: "linear-gradient(to right, #4caf50, #81c784)",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "20px",
                      width: "20px",
                      backgroundColor: "#4caf50",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              />
              <div className="flex mt-4 gap-2 flex-wrap">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value, priceRange[1]])
                  }
                  className="border p-1 rounded select-none bg-zinc-600 text-white border-[#3B3B3D] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], +e.target.value])
                  }
                  className="border p-1 rounded select-none bg-zinc-600 text-white border-[#3B3B3D] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-row gap-4 items-center ">
        <Tooltip label="Remove filters" position="bottom" withArrow>
          <div>
            <FcClearFilters size={24} className="hover:cursor-pointer" />
          </div>
        </Tooltip>
        <button className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200 ">
          Apply Filters
        </button>
      </div>
    </>
  );
};

export default FilterButtons;
