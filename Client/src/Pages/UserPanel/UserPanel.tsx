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
    <Block className="flex-row h-screen bg-[#121212]">
      <Block className="py-6 px-6">
        <LandingNavbar />
      </Block>

      <Block direction="column">
        <Block 
          className="bg-[#1E1E1E] mt-10 flex items-center shadow-md border-4 rounded-lg py-4 w-full sm:w-4/5 lg:w-3/5 mx-auto"
          direction="row"
          justify="center"
        >
          <Block
            className="w-48 h-48 mt-16 mb-16 rounded-full overflow-hidden relative border-4 border-[#FFFFFF] group"
          >
            {isUserImage ? (
              <img
                src={userImage}
                alt="User"
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-50 group-hover:opacity-80"
              />
            ) : (
              <Avatar size={180} />
            )}
            <label
              htmlFor="imageUpload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition duration-300"
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

          <Block direction="column" className="ml-6 text-center">
            <BlockTextField
              value={user?.Name || "Your name"}
              className="text-2xl font-bold text-white"
            />
            <TextField value="Welcome back!" className="text-gray-400" />
          </Block>
        </Block>
        <Block className="border-[#1F1F1F] py-4 w-5/6 mx-auto" children={undefined}></Block>
      </Block>

      <Block
        direction="row"
        justify="center"
        align="center"
        gap="4"
        className="shadow-lg shadow-[rgba(255,255,255,0.3)] rounded-3xl border-[#1F1F1F] py-3 w-5/6 mx-auto pt-6 pb-6 h-[175px]" 
        style={{
          backgroundImage: "url('/Black_blinking_stars.gif')",
        }}
      >

        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => setSelectedSubPage(page)}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 border-4 ${
              selectedSubPage === page
                ? "bg-white text-black"
                : "bg-[#1F1F1F] text-white hover:bg-white hover:text-black"
            }`}
            value={page}
            type="button"
            id={`button-${page}`}
            disabled={false}
          />
        ))}
      </Block>

      <Block align="center" className="mt-6 bg-[#121212]">
        <Block className="w-3/5">
          {selectedSubPage === "Settings" && <UserSettings />}
          {selectedSubPage === "Liked" && <div className="text-white">Liked Content</div>}
          {selectedSubPage === "Rated" && <div className="text-white">Rated Content</div>}
        </Block>
      </Block>
    </Block>
  );
};

export default UserPanel;
