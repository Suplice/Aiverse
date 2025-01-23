import { FaFire } from "react-icons/fa";
import SearchPagePopularServiceCard from "./SearchPagePopularServiceCard";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";
import TextField from "../UI/TextField";
import Button from "../UI/Button";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";
import { AiService } from "../../Utils/Models/AiService";

const mockSearchPageServices: AiService[] = [
  {
    Id: 1,
    Title: "ChatGPT",
    Description: "Description 1",
    Price: "Free",
    Image: "https://via.placeholder.com/150",
    Stars: 4.5,
    Reviews: 1200,
    Categories: ["AI", "Chatbot"],
    Status: "Verified",
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
    Categories: ["AI", "Video"],
    Status: "Verified",
    CreatorId: 1,
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
    Status: "Verified",
    CreatorId: 1,
  },
];

const SearchPagePopularServices = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className=" lg:w-1/4 w-0 hidden lg:flex lg:flex-col  h-min sticky top-0 my-24 rounded-lg  ">
      <div>
        <BlockTextField
          color="white"
          className="text-2xl mb-10 text-center flex flex-row justify-center items-center gap-4 mt-4 text-white"
        >
          <TextField
            value="Popular Services"
            className="text-2xl"
            color="white"
          />
          <FaFire color="red" />
        </BlockTextField>
      </div>
      <div className="border-2 border-[#4B4B4D] shadow-[0px_0px_12px_0px_#2d3748] relative rounded-lg">
        {mockSearchPageServices.map((service, index) => (
          <SearchPagePopularServiceCard {...service} index={index} />
        ))}

        {isAuthenticated ? null : (
          <div className="absolute w-full h-full backdrop-blur-lg bg-black/60 inset-0 rounded-lg ">
            <Block
              className="h-full text-white p-4"
              direction="column"
              align="center"
              justify="center"
            >
              <TextField
                value="Please Log In"
                className="text-lg mb-2"
                color="white"
              />
              <TextField
                value="In order to see the most popular services, you need to log in."
                className="text-md mt-4 text-center"
                color="white"
              />

              <Button
                value="Log In"
                onClick={() => navigate("/auth/SignUp")}
                className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                TextColor="white"
              />
            </Block>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPagePopularServices;
