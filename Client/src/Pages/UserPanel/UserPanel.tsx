import { useEffect, useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";
import UserSettings from "../../Components/UserPanelComponents/UserSettings";


const defaultImage = "/car.png"; // Poprawiona ścieżka domyślnego obrazu

const UserPanel = () => {
  const { user } = useAuth();
  const [selectedSubPage, setSelectedSubPage] = useState<"Settings" | "Liked" | "Rated">("Liked");
  const [userImage, setUserImage] = useState<string>(defaultImage);

  // Fetch user data by ID
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

  // Update user image when the user object changes
  useEffect(() => {
    const updateUserImage = async () => {
      if (user?.Id) {
        const fetchedUser = await fetchUserById(user.Id);
        if (fetchedUser?.Picture) {
          setUserImage(fetchedUser.Picture);
        } else {
          setUserImage(defaultImage);
        }
      }
    };
  
    updateUserImage();
  }, [user]);

  // Save updated image to the database
  const saveImageToDatabase = async (image: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.Id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, Picture: image }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Profile picture updated successfully.");
      } else {
        console.error("Failed to update profile picture");
        alert("Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture.");
    }
  };

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64Image = reader.result as string;
          setUserImage(base64Image);
          saveImageToDatabase(base64Image); // Save image to database
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="flex-row justify-center items-center h-screen bg-white">
      <div>
        <div className="bg-gray-100 mt-10 flex items-center shadow-md justify-center h-1/2 border-4 rounded-lg py-4 w-3/5 mx-auto">
          <div className="w-48 h-48 mt-16 mb-16 rounded-full overflow-hidden flex justify-center items-center relative group border-4 border-black">
            <img
              src={userImage}
              alt="User"
              className="w-full h-full object-cover transition duration-300 group-hover:brightness-100 group-hover:opacity-80"
            />
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
          </div>
          <div className="ml-6 text-center">
            <h1 className="text-2xl font-bold">{user?.Name || "Guest"}</h1>
            <p className="text-gray-600">Welcome back!</p>
          </div>
        </div>
        <div className="border-black py-4 w-5/6 mx-auto"></div>
      </div>

      <div  className="flex justify-center gap-20 shadow-lg shadow-[rgba(0,0,0,0.7)] rounded-lg border-black py-4 w-5/6 mx-auto pt-6 pb-6"
        style={{
          backgroundImage: "url('/Black_blinking_stars.gif')",
          height: '175px', 
        }}
      >
        <div className="flex justify-center items-center gap-20">
          <button
            onClick={() => setSelectedSubPage("Settings")}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 ${
              selectedSubPage === "Settings"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setSelectedSubPage("Liked")}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 ${
              selectedSubPage === "Liked"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Liked
          </button>
          <button
            onClick={() => setSelectedSubPage("Rated")}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 ${
              selectedSubPage === "Rated"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Rated
          </button>
        </div>
      </div>


      <div className="flex justify-center mt-6">
        <div className="w-3/5">
          {selectedSubPage === "Settings" && <UserSettings />}
          {selectedSubPage === "Liked" && <div>Liked Content</div>}
          {selectedSubPage === "Rated" && <div>Rated Content</div>}
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
