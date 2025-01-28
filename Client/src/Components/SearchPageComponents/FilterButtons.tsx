import { Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { FcClearFilters } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";
import { Range } from "react-range";
import { useLocation, useNavigate } from "react-router";
import { SearchParams } from "../../Utils/Models/SearchParams";
import TextField from "../UI/TextField";
import Button from "../UI/Button";
import Block from "../UI/Block";

const Categories = ["Video", "Music", "Art", "LLM"];

interface FilterButtonsProps {
  handleFilter: (searchParams: SearchParams) => void;
  handleRemoveFilters: () => void;
  isFiltering: boolean;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  handleFilter,
  isFiltering,
  handleRemoveFilters,
}) => {
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] =
    useState<boolean>(false);
  const [isPriceMenuVisible, setIsPriceMenuVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialSearchParams: SearchParams = {
    searchText: query.get("searchText") || "",
    categories: query.get("categories")?.split(",") || [],
    priceRange: query.get("priceRange")
      ? (query.get("priceRange")!.split(",").map(Number) as [number, number])
      : [0, 1000],
  };

  if (
    initialSearchParams.priceRange[0] < 0 ||
    initialSearchParams.priceRange[1] > 1000 ||
    initialSearchParams.priceRange[0] > initialSearchParams.priceRange[1]
  ) {
    initialSearchParams.priceRange = [0, 1000];
  }

  const [searchParams, setSearchParams] =
    useState<SearchParams>(initialSearchParams);

  useEffect(() => {
    setSearchParams(initialSearchParams);
  }, [location.search]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("categories", searchParams.categories.join(","));
    params.set("priceRange", searchParams.priceRange.join(","));
    navigate(`?${params.toString()}`);
    console.log(searchParams);
    handleFilter(searchParams);
  };

  return (
    <>
      <div className="relative">
        <Block
          className="px-4 py-2 bg-blue-500 text-center hover:cursor-pointer hover:bg-blue-500/80 rounded-md transition-all duration-200"
          direction="row"
          align="center"
          justify="center"
          gap={2}
          onClick={() => setIsCategoryMenuVisible(!isCategoryMenuVisible)}
        >
          <TextField value="Categories" className="select-none" color="white" />
          <IoMdArrowDropdown
            className={`${
              isCategoryMenuVisible ? " rotate-180 " : "rotate-0 "
            } transition-all duration-200 text-white`}
            size={24}
          />
        </Block>

        {isCategoryMenuVisible && (
          <div className="absolute mt-2 w-full rounded border shadow-lg z-30 border-[#3B3B3D]">
            {Categories.map((value, index) => (
              <Block
                className="px-4 py-2 hover:bg-[#232325] bg-[#121212] cursor-pointer"
                key={index}
                align="center"
                direction="row"
                onClick={() => {
                  const checkbox = document.getElementById(
                    `category-checkbox-${index}`
                  ) as HTMLInputElement;
                  checkbox.checked = !checkbox.checked;
                  setSearchParams((prev) => ({
                    ...prev,
                    categories: checkbox.checked
                      ? [...prev.categories, value]
                      : prev.categories.filter(
                          (category) => category !== value
                        ),
                  }));
                }}
              >
                <input
                  onClick={(e) => e.stopPropagation()}
                  id={`category-checkbox-${index}`}
                  type="checkbox"
                  className="mr-2"
                  value={value}
                  checked={searchParams.categories.includes(value)}
                ></input>

                <TextField className="select-none" color="white">
                  {value}
                </TextField>
              </Block>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <Block
          className="px-4 py-2 bg-blue-500 text-center hover:cursor-pointer hover:bg-blue-500/80 rounded-md transition-all duration-200"
          direction="row"
          align="center"
          justify="center"
          gap={2}
          onClick={() => setIsPriceMenuVisible(!isPriceMenuVisible)}
        >
          <TextField
            value="Price range"
            className="select-none"
            color="white"
          />
          <IoMdArrowDropdown
            className={`${
              isPriceMenuVisible ? " rotate-180 " : " rotate-0 "
            } transition-all duration-200 text-white`}
            size={24}
          />
        </Block>
        {isPriceMenuVisible && (
          <div className="absolute mt-2 w-fit bg-[#121212] border border-[#3B3B3D] rounded-md shadow-lg z-30 p-4">
            <Block align="center" direction="column">
              <TextField
                value="Select Price Range"
                className="select-none"
                color="white"
              />
              <Range
                step={1}
                min={0}
                max={1000}
                values={searchParams.priceRange}
                onChange={(values) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    priceRange: values as [number, number],
                  }))
                }
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
              <Block className="flex-wrap mt-4" gap={2}>
                <input
                  type="number"
                  value={searchParams.priceRange[0]}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      priceRange: [+e.target.value, searchParams.priceRange[1]],
                    }))
                  }
                  className="border p-1 rounded select-none bg-zinc-600 text-white border-[#3B3B3D] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <input
                  type="number"
                  value={searchParams.priceRange[1]}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      priceRange: [searchParams.priceRange[0], +e.target.value],
                    }))
                  }
                  className="border p-1 rounded select-none bg-zinc-600 text-white border-[#3B3B3D] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </Block>
            </Block>
          </div>
        )}
      </div>
      <Block className="relative " align="center" gap={4} direction="row">
        <div className="relative flex flex-row gap-4 items-center ">
          <Tooltip label="Remove filters" position="bottom" withArrow>
            <div onClick={handleRemoveFilters}>
              <FcClearFilters size={24} className="hover:cursor-pointer" />
            </div>
          </Tooltip>

          <Button
            id="apply-filters"
            onClick={applyFilters}
            className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded-md"
            TextColor="white"
          >
            {isFiltering ? (
              <Block
                className="w-full h-full px-2 py-2"
                align="center"
                justify="center"
                gap={2}
              >
                <div className=" w-full h-full px-2 py-2 flex items-center justify-center gap-2">
                  <div className=" w-4 h-4 border-4 border-black border-dotted rounded-full animate-spin"></div>
                </div>
              </Block>
            ) : (
              "Apply Filters"
            )}
          </Button>
        </div>
      </Block>
    </>
  );
};

export default FilterButtons;
