import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";

const UserSettings = () => {
  const { user } = useAuth();  
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState<string>(user?.Name || "")

  const handleChangeName = () => {
    if (userName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }

    setUserName(userName);
    // Tutaj dodam logikę zapisywania nowego imienia
    setIsEditingName(false);
    // Zaktualizowanie imienia może się odbywać tutaj
    console.log('New name:', userName);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start justify-center gap-4 mt-4">
        <div className="font-bold text-xl mb-2">User Data:</div>
        <div className="flex flex-row items-center gap-4">
          <strong>Name:</strong> 
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="px-2 py-1 border rounded"
              />
              <button onClick={handleChangeName} className="px-2 py-1 bg-white text-green-500 border-2 border-green-500 rounded-lg shadow-md hover:bg-green-500 hover:text-white focus:outline-none transition duration-300">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {user?.Name} 
              <button onClick={() => {setIsEditingName(true)}} className="px-2 py-1 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none transition duration-300">
                Change
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Email:</strong>
          {user?.Email}
          {user?.Provider === "EMAIL" && <button className="px-2 py-1 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none transition duration-300">Change</button>}
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Provider:</strong> {user?.Provider}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
