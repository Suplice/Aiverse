import { IoSearchSharp } from "react-icons/io5";
import LandingServiceCard from "../LandingComponents/LandingServiceCard/LandingServiceCard";
import FilterButtons from "./FilterButtons";

import { SearchParams } from "../../Utils/Models/SearchParams";
import LoadingServicesSkeleton from "./LoadingServicesSkeleton";
import useSearchParams from "./hooks/useSearchParams";
import useSearchInput from "./hooks/useSearchInput";
import useFilteredServices from "./hooks/useFilteredServices";
import { AiService } from "../../Utils/Models/AiService";
import { useEffect } from "react";
import Button from "../UI/Button";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";

const mockSearchPageServices: AiService[] = [
  {
    Id: 1,
    Title: "ChatGPT",
    Description: "Description 1",
    Price: "Free",
    Image: "https://via.placeholder.com/150",
    Stars: 4.5,
    Reviews: 1200,
    Categories: ["AI", "Chatbot", "LLM"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 2,
    Title: "ReelMagic",
    Description: "Description 2",
    Price: "$10 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 3.2,
    Reviews: 172,
    Categories: ["AI", "VIdeo", "Art"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 3,
    Title: "DeepSeek-V3",
    Description: "Description 3",
    Price: "$100 - 490 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.1,
    Reviews: 32,
    Categories: ["AI", "Search", "Music"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 4,
    Title: "Leffa",
    Description: "Description 4",
    Price: "Free + $1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.3,
    Reviews: 983,
    Categories: ["AI", "VIdeo", "LLM"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 5,
    Title: "DeepSeek-V3",
    Description: "Description 3",
    Price: "$1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.1,
    Reviews: 32,
    Categories: ["AI", "Search", "Art"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 6,
    Title: "Leffa",
    Description: "Description 4",
    Price: "Free + $1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.3,
    Reviews: 983,
    Categories: ["AI", "VIdeo", "Music"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 7,
    Title: "DeepSeek-V3",
    Description: "Description 3",
    Price: "$1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.1,
    Reviews: 32,
    Categories: ["AI", "Search", "VIdeo"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
  },
  {
    Id: 8,
    Title: "Leffa",
    Description: "Description 4",
    Price: "Free + $1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.3,
    Reviews: 983,
    Categories: ["AI", "VIdeo"],
    Status: "Verified",
    CreatedAt: new Date(),
    CreatorId: 1,
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
    <Block
      className="w-full lg:w-3/4 lg:px-10 md:px-6 sm:px-2 "
      direction="column"
      gap={10}
    >
      <Block
        className=" w-full flex-wrap"
        align="center"
        justify="center"
        gap={5}
        direction="row"
      >
        <div className="border-2 mx-5 rounded-sm border-[#3B3B3D] focus-within:border-blue-500/50 transition-all duration-200">
          <Block
            className="text-white p-3 rounded-xl"
            gap={1}
            align="center"
            direction="row"
          >
            <IoSearchSharp size={32} />
            <input
              ref={inputRef}
              className="bg-transparent outline-none w-full"
              placeholder={lastInput ?? "Search for services"}
            ></input>
            <Button
              onClick={handleSearch}
              className=" bg-blue-600 rounded-md hover:bg-blue-700 px-2 py-1 "
              value="Search"
              TextColor="white"
            ></Button>
          </Block>
        </div>
        <FilterButtons
          isFiltering={isLoading}
          handleFilter={handleSearchWithFilters}
        />
      </Block>
      {isLoading ? (
        <LoadingServicesSkeleton />
      ) : (
        <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index: number) => (
              <LandingServiceCard key={service.Id} {...service} index={index} />
            ))
          ) : (
            <BlockTextField
              color="white"
              className="text-white text-center p-5"
            >
              No services found
            </BlockTextField>
          )}
        </div>
      )}
    </Block>
  );
};
export default SearchPageServices;
