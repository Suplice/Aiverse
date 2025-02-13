// import { useSearchParams } from "react-router-dom";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import SearchPageServices from "../../Components/SearchPageComponents/SearchPageServices";
import SearchPagePopularServices from "../../Components/SearchPageComponents/SearchPagePopularServices";
import Block from "../../Components/UI/Block";

const SearchServices = () => {
  return (
    <Block className="p-6 w-full bg-[#121212] gap-10 " direction="column">
      <LandingNavbar />
      <Block className="lg:p-10 md:p-6 sm:p-2 h-fit" direction="row" gap={4}>
        <SearchPageServices />
        <SearchPagePopularServices />
      </Block>
    </Block>
  );
};

export default SearchServices;
