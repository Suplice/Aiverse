import { TiStarFullOutline } from "react-icons/ti";

interface SearchPagePopularServiceCard  {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    stars: number;
    reviews: number | string;
    Categories: string[];
    index: number;
  }

const SearchPagePopularServiceCard : React.FC<SearchPagePopularServiceCard > = ({  id,
    title,
    description,
    price,
    image,
    stars,
    reviews,
    Categories,
    index, }) => {

    return (
        <div className={`w-full flex flex-col items-center bg-white rounded-lg shadow-lg p-5   border-gray-200 ${index === 0 ? "border-t-0" : "border-t-4"}  `}>
            <img src={image} alt={title} className=" h-24 object-cover rounded-lg mb-5 aspect-auto" />
            <div className="text-2xl font-bold mb-2">{title}</div>
            <div className="text-lg mb-2">{price}</div>
            <div className="flex items-center gap-1 mb-2">
                 <p className="flex flex-row gap-1 items-center">
                    <TiStarFullOutline className="text-yellow-300" />
                    {stars}
                  </p>
                <div className="text-sm text-gray-500">{reviews} reviews</div>
            </div>
            <div className="flex flex-wrap gap-1">
                {Categories.map((category, index) => (
                    <div key={index} className="bg-gray-200 px-2 py-1 rounded-lg">{category}</div>
                ))}
            </div>
        </div>
    );
}

export default SearchPagePopularServiceCard;