import { Avatar } from "@mantine/core";
import { useUser } from "../../Utils/Context/UserContext";
import Block from "../UI/Block";
import BlockTextField from "../UI/BlockTextField";
import TextField from "../UI/TextField";
import Button from "../UI/Button";

const pages: Array<"Settings" | "Liked" | "Rated"> = [
  "Settings",
  "Liked",
  "Rated",
];

interface UserDataProps {
  selectedSubPage: "Settings" | "Liked" | "Rated";
  setSelectedSubPage: (page: "Settings" | "Liked" | "Rated") => void;
}

const UserData: React.FC<UserDataProps> = ({
  selectedSubPage,
  setSelectedSubPage,
}) => {
  const { user, userImage, isUserImage, saveImageToDatabase } = useUser();

  /**
   * Handles the change of the image of the user
   * and saves it to the database
   * @function handleImageChange
   * @param {React.ChangeEvent<HTMLInputElement>} event event object of the input field with the image
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      saveImageToDatabase(file);
    }
  };

  return (
    <Block direction="column" className="">
      <Block
        className="bg-gradient-to-r bg-[#1E1E1E] mt-10 flex items-center shadow-2xl border-2 border-[#333333] rounded-3xl py-8 px-10 w-11/12 max-w-4xl mx-auto"
        direction="row"
        justify="center"
      >
        <Block className="w-48 rounded-full overflow-hidden relative border-4 border-[#5A5A5A] group shadow-lg aspect-square min-w-[180px] min-h-[180px]">
          {isUserImage && userImage ? (
            <img
              src={userImage}
              alt="User"
              className=" h-full  transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 aspect-square"
            />
          ) : (
            <Avatar size={180} />
          )}
          <label
            htmlFor="imageUpload"
            className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-transparent to-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
          >
            Change Photo
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </Block>

        <Block direction="column" className="ml-8 text-center">
          <BlockTextField
            value={user?.Name || "Guest"}
            className="text-4xl font-extrabold text-gray-100"
          />
          <TextField
            value="Welcome back!"
            className="text-gray-400 mt-3 text-lg"
          />
        </Block>
      </Block>

      <Block
        className="border-t-2 border-[#444444] my-12 w-11/12 mx-auto"
        children={undefined}
      ></Block>

      <Block className="bg-[#121212]">
        <Block
          direction="row"
          justify="center"
          align="center"
          gap="6"
          className="flex sm:flex-row flex-col  items-center justify-center shadow-2xl rounded-2xl border border-[#444444] py-8 px-12 w-3/5 mx-auto bg-gradient-to-r bg-[#1E1E1E]"
        >
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => setSelectedSubPage(page)}
              className={`px-8 md:py-4 py-2 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                selectedSubPage === page
                  ? "bg-gradient-to-r bg-[#333333] text-white border-[#444444] scale-105"
                  : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
              }`}
              value={page}
              type="button"
              id={`button-${page}`}
            />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default UserData;
