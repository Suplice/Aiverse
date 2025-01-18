import { IoSearchSharp } from "react-icons/io5";
import LandingServiceCard from "../LandingComponents/LandingServiceCard";
import FilterButtons from "./FilterButtons";

import { SearchParams } from "../../Utils/Models/SearchParams";
import LoadingServicesSkeleton from "./LoadingServicesSkeleton";
import useSearchParams from "./hooks/useSearchParams";
import useSearchInput from "./hooks/useSearchInput";
import useFilteredServices from "./hooks/useFilteredServices";
import { AiService } from "../../Utils/Models/AiService";
import { useEffect } from "react";

const mockSearchPageServices: AiService[] = [
  {
    id: 1,
    title: "ChatGPT",
    description: "Description 1",
    price: "Free",
    image: "https://via.placeholder.com/150",
    stars: 4.5,
    reviews: "1.2k",
    Categories: ["AI", "Chatbot", "LLM"],
  },
  {
    id: 2,
    title: "ReelMagic",
    description: "Description 2",
    price: "$10 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 3.2,
    reviews: 172,
    Categories: ["AI", "Video", "Art"],
  },
  {
    id: 3,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$100 - 490 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search", "Music"],
  },
  {
    id: 4,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video", "LLM"],
  },
  {
    id: 5,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search", "Art"],
  },
  {
    id: 6,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video", "Music"],
  },
  {
    id: 7,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search", "Video"],
  },
  {
    id: 8,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video"],
  },
];

const SearchPageServices = () => {
  const { getParams, updateParams } = useSearchParams();
  const { inputRef, resetInput, lastInput } = useSearchInput("");
  const { filteredServices, filterServices, isLoading } = useFilteredServices(
    mockSearchPageServices
  );

  useEffect(() => {
    const params = getParams;
    const searchText = params.get("searchText");
    if (searchText && inputRef.current) {
      inputRef.current.value = searchText;
    }
    filterServices(params);
  }, []);

  const handleSearch = () => {
    const searchText = inputRef.current?.value || "";
    const currentParams = getParams;

    const updatedParams = new URLSearchParams(currentParams);
    updatedParams.set("searchText", searchText);

    updateParams(Object.fromEntries(updatedParams.entries()));
    filterServices(updatedParams);
    resetInput();
  };

  const handleSearchWithFilters = (tempSearchParams: SearchParams) => {
    const { categories, priceRange } = tempSearchParams;
    const currentParams = getParams;

    const updatedParams = new URLSearchParams(currentParams);

    if (categories && categories.length > 0) {
      updatedParams.set("categories", categories.join(","));
    } else {
      updatedParams.delete("categories");
    }

    if (priceRange && priceRange.length > 0) {
      updatedParams.set("priceRange", priceRange.join(","));
    } else {
      updatedParams.delete("priceRange");
    }

    const searchText = updatedParams.get("searchText");
    if (searchText) {
      updatedParams.set("searchText", searchText);
    }

    updateParams(Object.fromEntries(updatedParams.entries()));
    filterServices(updatedParams);
  };

  return (
    <div className="w-full lg:w-3/4 lg:px-10 md:px-6 sm:px-2 flex flex-col gap-10">
      <div className="flex items-center w-full justify-center gap-5 flex-wrap">
        <div className="border-2 mx-5 rounded-sm border-[#3B3B3D] focus-within:border-blue-500/50 transition-all duration-200">
          <div className="flex rounded-xl text-white p-3 gap-1 items-center">
            <IoSearchSharp size={32} />
            <input
              ref={inputRef}
              className="bg-transparent outline-none w-full"
              placeholder={lastInput ?? "Search for services"}
            ></input>
            <button
              onClick={handleSearch}
              className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-150"
            >
              Search
            </button>
          </div>
        </div>
        <FilterButtons
          isFiltering={isLoading}
          handleFilter={handleSearchWithFilters}
        />
      </div>
      {isLoading ? (
        <LoadingServicesSkeleton />
      ) : (
        <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index: number) => (
              <LandingServiceCard key={service.id} {...service} index={index} />
            ))
          ) : (
            <div className="text-white text-center p-5">No services found</div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchPageServices;
