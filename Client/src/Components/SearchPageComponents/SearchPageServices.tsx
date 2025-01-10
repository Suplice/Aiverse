import { IoSearchSharp } from "react-icons/io5";
import LandingServiceCard from "../LandingComponents/LandingServiceCard";
// import React, { useState } from "react";
import FilterButtons from "./FilterButtons";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchParams } from "../../Utils/Models/SearchParams";
import LoadingServicesSkeleton from "./LoadingServicesSkeleton";

const mockSearchPageServices = [
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

interface SearchPageServicesProps {
  searchText: string;
}

const SearchPageServices: React.FC<SearchPageServicesProps> = () => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [services, setServices] = useState(mockSearchPageServices);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("searchText");
    setSearchText(searchParam);
    showNewServices(params);
  }, [location]);

  const handleSearch = () => {
    const params = new URLSearchParams(location.search);
    params.set("searchText", inputRef.current?.value ?? "");
    inputRef.current!.value = "";
    navigate(`?${params.toString()}`);
    showNewServices(params);
  };

  const handleSearchWithFilters = (tempSearchParams: SearchParams) => {
    setIsFiltering(true);
    const params = new URLSearchParams(location.search);
    params.set("categories", tempSearchParams.categories.join(","));
    params.set("priceRange", tempSearchParams.priceRange.join(","));
    navigate(`?${params.toString()}`);
  };

  const showNewServices = (params: URLSearchParams) => {
    setIsLoading(true);
    setTimeout(() => {
      const newServices = mockSearchPageServices.filter((service) => {
        const categories = params.get("categories")?.split(",") || [];
        const priceRange =
          params.get("priceRange")?.split(",").map(Number) || [];
        const searchText = params.get("searchText")?.toLowerCase() || "";

        const isCategoryMatch =
          (categories[0] === "" && categories.length === 1) ||
          service.Categories.some((category) => categories.includes(category));
        const isPriceMatch =
          priceRange.length === 0 ||
          (service.price === "Free" && priceRange[0] === 0) ||
          service.price.split(" - ").some((price) => {
            const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
            return (
              numericPrice >= priceRange[0] && numericPrice <= priceRange[1]
            );
          });
        const isSearchTextMatch =
          searchText === "" ||
          service.title.toLowerCase().includes(searchText) ||
          service.description.toLowerCase().includes(searchText);

        return isCategoryMatch && isPriceMatch && isSearchTextMatch;
      });
      setServices(newServices);
      setIsLoading(false);
      setIsFiltering(false);
    }, 2000);
  };

  return (
    <div className="w-full lg:w-3/4  lg:px-10 md:px-6 sm:px-2  flex flex-col gap-10 ">
      <div className="flex items-center w-full justify-center gap-5 flex-wrap">
        <div className=" border-2 mx-5 rounded-sm border-[#3B3B3D] focus-within:border-blue-500/50 transition-all duration-200 ">
          <div className="flex   rounded-xl text-white  p-3 gap-1 items-center">
            <IoSearchSharp size={32} />

            <input
              ref={inputRef}
              className="bg-transparent outline-none w-full"
              placeholder={searchText ? searchText : "Search for services"}
            ></input>
            <button
              onClick={handleSearch}
              className="px-2 py-1 bg-blue-600 text-white rounded-md  hover:bg-blue-700 transition-all duration-150"
            >
              Search
            </button>
          </div>
        </div>
        <div className=" flex flex-row justify-around gap-6 px-12 items-center flex-wrap ">
          <FilterButtons
            handleFilter={handleSearchWithFilters}
            isFiltering={isFiltering}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
          <LoadingServicesSkeleton />
        </div>
      ) : (
        <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
          {services.map((service, index) => (
            <LandingServiceCard {...service} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchPageServices;
