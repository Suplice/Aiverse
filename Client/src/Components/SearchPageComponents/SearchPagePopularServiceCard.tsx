import { TiStarFullOutline } from "react-icons/ti";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Tooltip } from "@mantine/core";

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
    <div
      className={`w-full flex flex-col items-center relative bg-[#121212] text-white    p-5   border-[#7B7B7D] ${
        index === 0 ? "border-t-0 rounded-lg " : "border-t-2"
      }  `}
    >
      <img
        src={Image}
        alt={Title}
        className=" h-24 object-cover rounded-lg mb-5 aspect-auto"
      />
      <div className="text-2xl font-bold mb-2">{Title}</div>
      <div className="text-lg mb-2">{Price}</div>
      <div className="flex items-center gap-1 mb-2">
        <p className="flex flex-row gap-1 items-center">
          <TiStarFullOutline className="text-yellow-300" />
          {Stars}
        </p>
        <div className="text-sm text-gray-300 underline">{Reviews} reviews</div>
      </div>
      <div className="flex flex-wrap gap-1">
        {Categories.map((category, index) => (
          <div key={index} className="bg-[#2B2D30] px-2 py-1 rounded-lg">
            {category}
          </div>
        ))}
      </div>
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
    </div>
  );
};

export default SearchPagePopularServiceCard;
