
import { useNavigate } from "react-router-dom";
import BlockTextField from "../UI/BlockTextField";

const LandingNavbarOptions = () => {

  const navigate = useNavigate();
  
  
  return (
    <div className="hidden md:flex space-x-8 md:text-lg font-medium text-sm ">
      <BlockTextField
        value="Home"
        color="white"
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer "
        onClick={() => navigate("/")}
      ></BlockTextField>
      <BlockTextField
        value="Services"
        color="white"
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer "
        onClick={() => {
          const searchParams = new URLSearchParams({
            searchText: "",
            categories: [].join(","),
            priceRange: [0, 1000].join(","),
          });

          navigate(`/services?${searchParams.toString()}`);
        }}
      ></BlockTextField>
    </div>
  );
};

export default LandingNavbarOptions;
