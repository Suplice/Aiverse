import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";

const SettingsButton = () => {
  const { user } = useAuth();  
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.Name || "");

  const handleNameChange = () => {
    setEditingName(true);
  };

  // Funkcja do zapisania nowego imienia
  const saveName = () => {
    // Tutaj dodam logikę zapisywania nowego imienia
    setEditingName(false);
    // Zaktualizowanie imienia może się odbywać tutaj
    console.log('New name:', newName);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col items-start justify-center gap-4 mt-4">
        <div className="font-bold text-xl mb-2">User Data:</div>
        <div className="flex flex-row items-center gap-4">
          <strong>Name:</strong> 
          {editingName ? (
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className="px-2 py-1 border rounded"
              />
              <button onClick={saveName} className="px-2 py-1 bg-blue-500 text-white rounded">
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {user?.Name} 
              <button onClick={handleNameChange} className="px-2 py-1 bg-black text-white rounded">
                Change
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Email:</strong>
          {user?.Email}
          {user?.Provider === "EMAIL" && <button className="px-2 py-1 bg-black text-white rounded">Change</button>}
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Provider:</strong> {user?.Provider}
        </div>
      </div>
    </div>
  );
};

export default SettingsButton;
