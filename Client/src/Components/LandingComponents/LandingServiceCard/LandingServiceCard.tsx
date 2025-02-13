import { useState } from "react";
import { useAuth } from "../../../Utils/Context/AuthContext";
import { useNavigate } from "react-router";
import TextField from "../../UI/TextField";
import Button from "../../UI/Button";
import BlockTextField from "../../UI/BlockTextField";
import LandingServiceCardMainData from "./LandingServiceCardMainData";
import LandingServiceCardButtons from "./LandingServiceCardButtons";
import LandingServiceCardDescription from "./LandingServiceCardDescription";
import Block from "../../UI/Block";

interface LandingServiceCardProps {
  Id: number;
  Title: string;
  Description: string;
  Price: string;
  Categories: string[];
  Image: string;
  Stars: number;
  Reviews: number;
  index: number;
  ServiceURL: string;
}

const LandingServiceCard: React.FC<LandingServiceCardProps> = ({
  Id,
  ServiceURL,
  Title,
  Description,
  Price,
  Image,
  Stars,
  Reviews,
  Categories,
  index,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <Block
      className={`flex-col border-[#3B3B3D] cursor-pointer    p-4 ${
        index === 0 ? "border-t-0" : "border-t-2"
      }`}
      direction="column"
      onClick={() => navigate(`/aiservice/${Id}`)}
    >
      <Block
        className="bg-[#252729] w-full rounded-lg lg:p-10 md:p-6 p-4 md:flex-row  relative"
        direction="column"
        align="center"
        gap={4}
      >
        <BlockTextField className="text-white">{index + 1}</BlockTextField>

        <Block
          className="w-full flex-wrap md:flex-row"
          direction="column"
          align="center"
          justify="between"
        >
          <LandingServiceCardMainData
            Id={Id}
            image={Image}
            title={Title}
            stars={Stars}
            reviews={Reviews}
            Categories={Categories}
            price={Price}
          />
          <LandingServiceCardButtons
            isDescriptionVisible={isDescriptionVisible}
            setIsDescriptionVisible={setIsDescriptionVisible}
            isAuthenticated={isAuthenticated}
            id={Id}
            ServiceURL={ServiceURL}
          />
        </Block>

        {index > 1 && !isAuthenticated ? (
          <div className="absolute w-full h-full inset-0 rounded-lg bg-black/20 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full">
              <TextField
                value="You need to sign in to view this service."
                color="white"
                className="text-3xl "
              />

              <Button
                onClick={() => {
                  navigate("/auth/SignIn");
                }}
                className="px-4 py-2 bg-black mt-4 rounded-lg"
                TextColor="white"
              >
                <TextField value="Sign In" color="white" />
              </Button>
            </div>
          </div>
        ) : null}
      </Block>

      <LandingServiceCardDescription
        Description={Description}
        isDescriptionVisible={isDescriptionVisible}
      />
    </Block>
  );
};

export default LandingServiceCard;
