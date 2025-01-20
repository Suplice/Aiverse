import { FaFire } from "react-icons/fa";
import SearchPagePopularServiceCard from "./SearchPagePopularServiceCard";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";

const mockSearchPageServices = [
  {
    Id: 1,
    Title: "ChatGPT",
    Description: "Description 1",
    Price: "Free",
    Image: "https://via.placeholder.com/150",
    Stars: 4.5,
    Reviews: "1.2k",
    Categories: ["AI", "Chatbot"],
  },
  {
    Id: 2,
    Title: "ReelMagic",
    Description: "Description 2",
    Price: "$10 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 3.2,
    Reviews: 172,
    Categories: ["AI", "Video"],
  },
  {
    Id: 3,
    Title: "DeepSeek-V3",
    Description: "Description 3",
    Price: "$1 - 49 / Month",
    Image: "https://via.placeholder.com/150",
    Stars: 4.1,
    Reviews: 32,
    Categories: ["AI", "Search"],
  },
];

const SearchPagePopularServices = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className=" lg:w-1/4 w-0 hidden lg:flex lg:flex-col  h-min sticky top-0 my-24 rounded-lg  ">
      <div>
        <div className="text-2xl font-bold mb-10 text-center flex flex-row justify-center items-center gap-4 mt-4 text-white">
          <p>Popular Services</p>
          <FaFire color="red" />
        </div>
      </div>
      <div className="border-2 border-[#4B4B4D] shadow-[0px_0px_12px_0px_#2d3748] relative rounded-lg">
        {mockSearchPageServices.map((service, index) => (
          <SearchPagePopularServiceCard {...service} index={index} />
        ))}

        {isAuthenticated ? null : (
          <div className="absolute w-full h-full backdrop-blur-lg bg-black/60 inset-0 rounded-lg ">
            <div className="flex flex-col items-center justify-center h-full text-white p-4">
              <p className="text-lg font-semibold mb-2">Please Log In</p>
              <p className="text-md text-center">
                In order to see the most popular services, you need to log in.
              </p>
              <button
                onClick={() => {
                  navigate("/auth/SignIn");
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPagePopularServices;
