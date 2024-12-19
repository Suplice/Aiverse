import UserSettings from "../../Components/UserPanelComponents/UserSettings";
import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";


const defaultImage = "../public/car.png";

const UserPanel = () => {
  const { user } = useAuth(); 
  const [selectedSubPage, setSelectedSubPage] = useState<"Settings" | "Liked" | "Rated">("Liked");
  const [userImage, setUserImage] = useState<string>(defaultImage);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = URL.createObjectURL(event.target.files[0]);
      setUserImage(newImage);
    }
  };

  return (
    <div className="flex-col justify-center items-center h-screen bg-white">
      <div className="flex items-center justify-center h-1/2 border-b-4 border-gray-200 py-4 w-5/6 mx-auto">
        <div className="w-48 h-48 rounded-full overflow-hidden flex justify-center items-center relative group border-4 border-black">
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
          <h1 className="text-2xl font-bold">{user?.Name} </h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 border-b-4 border-gray-200 py-4 w-5/6 mx-auto">
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

      <div className="flex justify-center mt-6">
        {selectedSubPage === "Settings" && <UserSettings />}
        {selectedSubPage === "Liked" && <div>Liked Content</div>}
        {selectedSubPage === "Rated" && <div>Rated Content</div>}
      </div>
    </div>
  );
};

export default UserPanel;
