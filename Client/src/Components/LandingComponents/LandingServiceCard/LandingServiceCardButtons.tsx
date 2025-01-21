import { Tooltip } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import Button from "../../UI/Button";
import { IoIosArrowDropdown } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import Block from "../../UI/Block";

interface LandingServiceCardButtonProps {
  isDescriptionVisible: boolean;
  setIsDescriptionVisible: (value: boolean) => void;
  isAuthenticated: boolean;
}

const LandingServiceCardButtons: React.FC<LandingServiceCardButtonProps> = (
  props
) => {
  return (
    <Block
      className="w-full md:w-1/4 flex-wrap"
      justify="around"
      direction="row"
      gap={2}
    >
      <Tooltip label="Visit page" position="top" withArrow>
        <Button
          className="rounded-full px-4 py-4 border-black bg-black hover:bg-slate-500"
          TextColor="white"
        >
          <LuExternalLink size={24} />
        </Button>
      </Tooltip>
      <Tooltip
        label={
          props.isDescriptionVisible ? "Hide description" : "Show description"
        }
        position="top"
        withArrow
      >
        <Button
          onClick={() =>
            props.setIsDescriptionVisible(!props.isDescriptionVisible)
          }
          className="rounded-full px-4 py-4 border-black bg-black hover:bg-slate-500"
          TextColor="white"
        >
          <IoIosArrowDropdown
            size={24}
            className={`transform transition-transform duration-200 ${
              props.isDescriptionVisible ? "rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </Tooltip>
      {props.isAuthenticated && (
        <Tooltip label="Add to liked services" position="top" withArrow>
          <Button
            className="rounded-full hover:bg-green-700 px-4 py-4 border-black bg-black "
            TextColor="white"
          >
            {/*TODO: 
             - Check whether service is already liked, if yes then swap FaHeart to slashed heart and background to red
             - Implement logic of adding and erasing from liked services*/}
            <FaHeart size={24} />
          </Button>
        </Tooltip>
      )}
    </Block>
  );
};

export default LandingServiceCardButtons;
