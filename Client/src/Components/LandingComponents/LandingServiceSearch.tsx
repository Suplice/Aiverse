import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LandingServiceSearch = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const inputValue = document.querySelector("input")?.value as string;

    if (!inputValue.trim()) return;

    navigate(`/services/${inputValue}`);
  };

  return (
    <div
      className="w-full h-[400px] relative flex flex-col items-center justify-center mt-3 rounded-xl overflow-hidden bg-cover bg-center shadow-lg shadow-gray-700 "
      style={{ backgroundImage: "url('/public/Black_blinking_stars.gif')" }}
    >
      <div className=" z-10 text-center flex flex-col items-center">
        <h1 className="text-white text-3xl font-bold mb-6">
          Find the best AI services with us
        </h1>
        <div className="flex w-full  rounded-xl bg-white bg-opacity-90 p-2 gap-1 items-center">
          <IoSearchSharp size={32} />

          <input
            className="bg-transparent outline-none w-full"
            placeholder="Enter product, categories or service name"
          ></input>
          <button
            onClick={handleSearch}
            className="px-2 py-1 bg-blue-600 text-white rounded-md  hover:bg-blue-700 transition-all duration-150"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingServiceSearch;
