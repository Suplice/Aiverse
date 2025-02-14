import { useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import TextField from "../UI/TextField";
import Button from "../UI/Button";
import Block from "../UI/Block";

const LandingServiceSearch = () => {
  const navigate = useNavigate();

  /**
   * A function to handle the search of the user.
   * It searches for the services based on the user input.
   * Function creates a URLSearchParams object and navigates to the services page with the search parameters.
   *
   * @function handleSearch
   * @returns {void}
   */
  const handleSearch = () => {
    const inputValue = document.querySelector("input")?.value as string;

    if (!inputValue.trim()) return;

    const searchParams = new URLSearchParams({
      searchText: inputValue,
      categories: [].join(","),
      priceRange: [0, 1000].join(","),
    });

    navigate(`/services?${searchParams.toString()}`);
  };

  /**
   * A function to handle the search of the user when the user presses the Enter key.
   * It searches for the services based on the user input.
   * Function creates a URLSearchParams object and navigates to the services page with the search parameters.
   * This function is called when the user presses the Enter key.
   */
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <Block
      className="w-full h-[400px] relative mt-3 rounded-xl overflow-hidden  shadow-lg shadow-gray-700 px-4"
      align="center"
      justify="center"
      style={{ backgroundImage: "url('/public/Black_blinking_stars.gif')" }}
      direction="row"
    >
      <Block className="z-10 text-center " direction="column" align="center">
        <TextField
          value="Find the best AI services with us"
          className="mb-6 text-3xl"
          color="white"
        />
        <Block
          className="w-full rounded-xl bg-[#252729] bg-opacity-90 p-2 text-white"
          align="center"
          direction="row"
          gap={1}
        >
          <IoSearchSharp size={32} />

          <input
            className="bg-transparent outline-none w-full"
            placeholder="Enter product, categories or service name"
          ></input>

          <Button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            <TextField value="Search" color="white" />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default LandingServiceSearch;
