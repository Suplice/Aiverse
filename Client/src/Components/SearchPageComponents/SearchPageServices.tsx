import { IoSearchSharp } from "react-icons/io5";
import LandingServiceCard from "../LandingComponents/LandingServiceCard";
// import React, { useState } from "react";
import FilterButtons from "./FilterButtons";

const mockSearchPageServices = [
  {
    id: 1,
    title: "ChatGPT",
    description: "Description 1",
    price: "Free",
    image: "https://via.placeholder.com/150",
    stars: 4.5,
    reviews: "1.2k",
    Categories: ["AI", "Chatbot"],
  },
  {
    id: 2,
    title: "ReelMagic",
    description: "Description 2",
    price: "$10 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 3.2,
    reviews: 172,
    Categories: ["AI", "Video"],
  },
  {
    id: 3,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search"],
  },
  {
    id: 4,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video"],
  },
  {
    id: 5,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search"],
  },
  {
    id: 6,
    title: "Leffa",
    description: "Description 4",
    price: "Free + $1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.3,
    reviews: 983,
    Categories: ["AI", "Video"],
  },
  {
    id: 7,
    title: "DeepSeek-V3",
    description: "Description 3",
    price: "$1 - 49 / Month",
    image: "https://via.placeholder.com/150",
    stars: 4.1,
    reviews: 32,
    Categories: ["AI", "Search"],
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

const SearchPageServices: React.FC<SearchPageServicesProps> = ({
  searchText,
}) => {
  return (
    <div className="w-full lg:w-3/4  lg:px-10 md:px-6 sm:px-2  flex flex-col gap-10 ">
      <div className="flex items-center w-full justify-center gap-5 flex-wrap">
        <div className=" border-2 mx-5 rounded-sm border-[#3B3B3D] focus-within:border-blue-500/50 transition-all duration-200 ">
          <div className="flex   rounded-xl text-white  p-3 gap-1 items-center">
            <IoSearchSharp size={32} />

            <input
              className="bg-transparent outline-none w-full"
              placeholder={
                searchText ?? "Enter product, categories or service name"
              }
            ></input>
            <button className="px-2 py-1 bg-blue-600 text-white rounded-md  hover:bg-blue-700 transition-all duration-150">
              Search
            </button>
          </div>
        </div>
        <div className=" flex flex-row justify-center gap-6 px-12 items-center flex-wrap ">
          <FilterButtons />
        </div>
      </div>
      <div className="bg-[#121212] border-2 border-[#3B3B3D] rounded-lg">
        {mockSearchPageServices.map((service, index) => (
          <LandingServiceCard {...service} index={index} />
        ))}
      </div>
    </div>
  );
};
export default SearchPageServices;
