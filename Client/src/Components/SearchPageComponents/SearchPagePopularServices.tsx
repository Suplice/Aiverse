import { FaFire } from "react-icons/fa";
import SearchPagePopularServiceCard from "./SearchPagePopularServiceCard";
import { useNavigate } from "react-router";
import { useAuth } from "../../Utils/Context/AuthContext";
import TextField from "../UI/TextField";
import Button from "../UI/Button";
import BlockTextField from "../UI/BlockTextField";
import { useAiService } from "../../Utils/Context/AiServiceContext";
import Block from "../UI/Block";

const SearchPagePopularServices = () => {
  const { services } = useAiService();

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
        {services
          .filter((service) => service.Status === "Verified")
          .slice(0, 3)
          .map((service, index) => (
            <SearchPagePopularServiceCard
              {...service}
              index={index}
              key={index}
            />
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
