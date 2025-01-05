import { FaFire } from "react-icons/fa";
import SearchPagePopularServiceCard from "./SearchPagePopularServiceCard";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";

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

];

const SearchPagePopularServices = () => {

  const navigate = useNavigate();
  const {isAuthenticated} = useAuth();

  return (
  <div className=" w-1/4 h-min sticky top-0 my-24 rounded-lg ">
    <div>
      <div className="text-2xl font-bold mb-10 text-center flex flex-row justify-center items-center gap-4 mt-4">
        <p>Popular Services</p>
        <FaFire color="red" />
      </div>
    </div>
    <div className="border relative rounded-lg">
        {mockSearchPageServices.map((service, index) => (
          <SearchPagePopularServiceCard {...service} index={index} />
        ))}

      {isAuthenticated ? null :
      (
        <div className="absolute w-full h-full backdrop-blur-lg bg-black/60 inset-0 rounded-lg border">
        <div className="flex flex-col items-center justify-center h-full text-white p-4">
          <p className="text-lg font-semibold mb-2">Please Log In</p>
          <p className="text-md text-center">In order to see the most popular services, you need to log in.</p>
          <button
          onClick={() => {navigate("/auth/SignIn")}}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Log In
          </button>
        </div>
      </div>  
      )}
     
    </div>
    </div>
)
  
  };

export default SearchPagePopularServices;
