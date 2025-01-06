// import { useSearchParams } from "react-router-dom";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import SearchPageServices from "../../Components/SearchPageComponents/SearchPageServices";
import SearchPagePopularServices from "../../Components/SearchPageComponents/SearchPagePopularServices";

const SearchServices = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // Extract parameters from the URL
  // const category = searchParams.get("category") || "all";
  // const searchText = searchParams.get("searchText") || "";
  // const priceRange = searchParams.get("priceRange") || "any";

  // const updateSearch = () => {
  //   setSearchParams({
  //     category: "electronics",
  //     searchText: "laptop",
  //     priceRange: "100-500",
  //   });
  // };

  return (
    <div className="flex flex-col p-6 w-full bg-[#121212]">
      <LandingNavbar />
      <div className="flex flex-row gap-4 lg:p-10 md:p-6 sm:p-2  ">
        <SearchPageServices searchText={"test"} />
        <SearchPagePopularServices />
      </div>
    </div>
  );
};

export default SearchServices;
