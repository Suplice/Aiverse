import { TiStarFullOutline } from "react-icons/ti";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Tooltip } from "@mantine/core";

interface SearchPagePopularServiceCard {
  title: string;
  price: string;
  image: string;
  stars: number;
  reviews: number | string;
  Categories: string[];
  index: number;
}

const SearchPagePopularServiceCard: React.FC<SearchPagePopularServiceCard> = ({
  title,
  price,
  image,
  stars,
  reviews,
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
        src={image}
        alt={title}
        className=" h-24 object-cover rounded-lg mb-5 aspect-auto"
      />
      <div className="text-2xl font-bold mb-2">{title}</div>
      <div className="text-lg mb-2">{price}</div>
      <div className="flex items-center gap-1 mb-2">
        <p className="flex flex-row gap-1 items-center">
          <TiStarFullOutline className="text-yellow-300" />
          {stars}
        </p>
        <div className="text-sm text-gray-300 underline">{reviews} reviews</div>
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
