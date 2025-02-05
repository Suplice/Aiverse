import { TiStarFullOutline } from "react-icons/ti";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Tooltip } from "@mantine/core";
import BlockTextField from "../UI/BlockTextField";
import Block from "../UI/Block";

interface SearchPagePopularServiceCard {
  Title: string;
  Price: string;
  Image: string;
  Stars: number;
  Reviews: number | string;
  Categories: string[];
  index: number;
}

const SearchPagePopularServiceCard: React.FC<SearchPagePopularServiceCard> = ({
  Title,
  Price,
  Image,
  Stars,
  Reviews,
  Categories,
  index,
}) => {
  return (
    <Block
      className={`w-full relative bg-[#121212] text-white    p-5   border-[#7B7B7D] ${
        index === 0 ? "border-t-0 rounded-lg " : "border-t-2"
      }  `}
      direction="column"
      align="center"
    >
      <img
        src={`${import.meta.env.VITE_API_URL}${Image}`}
        alt={Title}
        className=" h-24 object-cover rounded-lg mb-5 aspect-auto"
      />

      <BlockTextField color="white" className="text-2xl font-bold mb-2">
        {Title}
      </BlockTextField>

      <BlockTextField color="white" className="text-lg mb-2">
        {Price}
      </BlockTextField>

      <Block className="mb-2" align="center" gap={1} direction="row">
        <BlockTextField
          color="white"
          className="flex flex-row gap-1 items-center"
        >
          <TiStarFullOutline className="text-yellow-300" />
          {Stars}
        </BlockTextField>

        <BlockTextField
          color="white"
          className="text-sm text-gray-300 underline"
        >
          {Reviews} reviews
        </BlockTextField>
      </Block>
      <Block className="flex-wrap" gap={1} direction="row">
        {Categories &&
          Categories.length > 0 &&
          Categories.map((category) => (
            <BlockTextField
              color="white"
              className="bg-[#2B2D30] px-2 py-1 rounded-lg"
            >
              {category}
            </BlockTextField>
          ))}
      </Block>
      <div className="absolute  right-0 p-3 text-center top-1/2 ">
        <Tooltip label="View Service" position="top" withArrow>
          <div>
            <FaArrowRightFromBracket
              size={24}
              className="hover:cursor-pointer"
            />
          </div>
        </Tooltip>
      </div>
    </Block>
  );
};

export default SearchPagePopularServiceCard;
