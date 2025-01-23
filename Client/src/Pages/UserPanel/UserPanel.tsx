import { useEffect, useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";
import UserSettings from "../../Components/UserPanelComponents/UserSettings";
import { Avatar } from "@mantine/core";
import LandingNavbar from "../../Components/LandingComponents/LandingNavbar";
import Block from "../../Components/UI/Block";
import BlockTextField from "../../Components/UI/BlockTextField";
import TextField from "../../Components/UI/TextField";
import Button from "../../Components/UI/Button";

const UserPanel = () => {
  const { user } = useAuth();
  const [selectedSubPage, setSelectedSubPage] = useState<"Settings" | "Liked" | "Rated">("Liked");
  const [isUserImage, setIsUserImage] = useState(true);
  const [userImage, setUserImage] = useState("");
  const pages: Array<"Settings" | "Liked" | "Rated"> = ["Settings", "Liked", "Rated"];

  const fetchUserById = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        console.error("Failed to fetch user data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    const updateUserImage = async () => {
      if (user?.Id) {
        const fetchedUser = await fetchUserById(user.Id);
        if (fetchedUser?.Picture) {
          setUserImage(`${import.meta.env.VITE_API_URL}${fetchedUser.Picture}`);
        } else {
          setIsUserImage(false);
        }
      }
    };

    updateUserImage();
  }, [user]);

  const saveImageToDatabase = async (file: File) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.Id}/profile-picture`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Profile picture updated successfully.");
        const updatedUser = await response.json();
        setUserImage(`${import.meta.env.VITE_API_URL}${updatedUser.Picture}`);
      } else {
        console.error("Failed to update profile picture");
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setIsUserImage(false);
      setUserImage(URL.createObjectURL(file));
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
        <Block
          className="w-48 h-48 rounded-full overflow-hidden relative border-4 border-[#5A5A5A] group shadow-lg"
        >
          {isUserImage ? (
            <img
              src={userImage}
              alt="User"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
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
            value={user?.Name || "Your Name"}
            className="text-4xl font-extrabold text-gray-100"
          />
          <TextField value="Welcome back!" className="text-gray-400 mt-3 text-lg" />
        </Block>
      </Block>
  
      {/* Separator */}
      <Block className="border-t-2 bg-red border-[#444444] my-12 w-11/12 mx-auto" children={undefined}></Block>
  
      {/* Navigation Buttons */}
      <Block className="bg-[#121212]">
        <Block
          direction="row"
          justify="center"
          align="center"
          gap="6"
          className="flex items-center justify-center shadow-2xl rounded-2xl border border-[#444444] py-8 px-12 w-11/12 sm:w-4/5  lg:w-3/5 mx-auto bg-gradient-to-r bg-[#1E1E1E]"
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
          {selectedSubPage === "Liked" && <div className="text-white text-lg">Liked Content</div>}
          {selectedSubPage === "Rated" && <div className="text-white text-lg">Rated Content</div>}
        </Block>
      </Block>
    </Block>
  </Block>
  );
};

export default UserPanel;
