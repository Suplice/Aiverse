
import SettingsButton from "../../Components/UserPanelComponents/SettingsButton";
import { useState } from "react";


const UserPanel = () => {
  const [selectedSubPage, setSelectedSubPage ] = useState<"Settings" | "Liked" | "Rated">("Liked")


  return (
    <div>
      <div>

      </div>
      <div className="flex justify-center gap-4">
        <button onClick = {() => {setSelectedSubPage("Settings")}} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
          Settings
        </button>
        <button onClick = {() => {setSelectedSubPage("Liked")}}className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
          Liked
        </button>
        <button onClick = {() => {setSelectedSubPage("Rated")}} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
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
