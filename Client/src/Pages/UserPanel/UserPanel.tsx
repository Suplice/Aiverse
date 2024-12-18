
import SettingsButton from "../../Components/UserPanelComponents/SettingsButton";
import { useState } from "react";


const UserPanel = () => {
  const [clickedButton, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  }

  return (
    <div>
      <div className="flex justify-center gap-4">
        <button onClick={handleClick} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
          Settings
        </button>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
          Liked
        </button>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none">
          Rated
        </button>
      </div>
      <div>
        {clickedButton && <SettingsButton />}
      </div>
    </div>
    
  );
};

export default UserPanel;
