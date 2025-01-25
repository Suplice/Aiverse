import { useState } from "react";
import { useUser } from "../../Utils/Context/UserContext";
import UserSettings from "../../Components/UserPanelComponents/UserSettings";
import { Avatar } from "@mantine/core";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";
import BlockTextField from "../../Components/UI/BlockTextField";
import TextField from "../../Components/UI/TextField";
import Button from "../../Components/UI/Button";

const UserPanel = () => {
  const { user, userImage, isUserImage, saveImageToDatabase } = useUser();
  const [selectedSubPage, setSelectedSubPage] = useState<
    "Settings" | "Liked" | "Rated"
  >("Liked");
  const pages: Array<"Settings" | "Liked" | "Rated"> = [
    "Settings",
    "Liked",
    "Rated",
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      saveImageToDatabase(file);
    }
  };
  return (
    <Block className="flex flex-col h-screen bg-gradient-to-b bg-[#121212]">
      <Block className="py-6 px-6 bg-[#121212]">
        <LandingNavbar />
      </Block>
      <Block direction="column" className="flex-1">
        {/* User Card */}
        <Block
          className="bg-gradient-to-r bg-[#1E1E1E] mt-10 flex items-center shadow-2xl border-2 border-[#333333] rounded-3xl py-8 px-10 w-11/12 sm:w-4/5 lg:w-3/5 mx-auto"
          direction="row"
          justify="center"
        >
          <Block className="w-48  rounded-full overflow-hidden relative border-4 border-[#5A5A5A] group shadow-lg aspect-square">
            {isUserImage ? (
              <img
                src={userImage}
                alt="User"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 aspect-square"
              />
            ) : (
              <Avatar size={180} />
            )}
            <label
              htmlFor="imageUpload"
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
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

        {/* Separator */}
        <Block
          className="border-t-2 border-[#444444] my-12 w-11/12 mx-auto"
          children={undefined}
        ></Block>

        {/* Navigation Buttons */}
        <Block className="bg-[#121212]">
          <Block
            direction="row"
            justify="center"
            align="center"
            gap="6"
            className="flex sm:flex-row flex-col items-center justify-center shadow-2xl rounded-2xl border border-[#444444] py-8 px-12 w-11/12 sm:w-4/5  lg:w-3/5 mx-auto bg-gradient-to-r bg-[#1E1E1E]"
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => setSelectedSubPage(page)}
                className={`px-8 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
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

        {/* Content Section */}
        <Block align="center" className="mt-16 bg-[#121212]">
          <Block className="w-4/5">
            {selectedSubPage === "Settings" && <UserSettings />}
            {selectedSubPage === "Liked" && (
              <div className="text-white text-lg">Liked Content</div>
            )}
            {selectedSubPage === "Rated" && (
              <div className="text-white text-lg">Rated Content</div>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default UserPanel;
