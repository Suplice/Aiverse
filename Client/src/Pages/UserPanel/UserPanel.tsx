
import ProfilePicture from "../../Components/UserPanelComponents/ProfilePicture";
import SettingsButton from "../../Components/UserPanelComponents/UserSettings";
import { useState } from "react";


const UserPanel = () => {
  const [selectedSubPage, setSelectedSubPage ] = useState<"Settings" | "Liked" | "Rated">("Liked")


  return (
    <div className="flex-col justify-center items-center h-screen bg-gray-100">
      <div className="flex justify-center items-center h-1/2 bg-gray-100">
        <ProfilePicture/>
      </div>
      <div className="flex justify-center gap-4">
        <button onClick = {() => {setSelectedSubPage("Settings")}} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 focus:outline-none">
          Settings
        </button>
        <button onClick = {() => {setSelectedSubPage("Liked")}}className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 focus:outline-none">
          Liked
        </button>
        <button onClick = {() => {setSelectedSubPage("Rated")}} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-400 focus:outline-none">
          Rated
        </button>
      </div>
      <div>
        {selectedSubPage === "Settings" && <SettingsButton />}
        {selectedSubPage === "Liked" && <div>Liked Content</div>}
        {selectedSubPage === "Rated" && <div>Rated Content</div>}
      </div>
    </div>
    
  );
};

export default UserPanel;
