import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";

const UserSettings = () => {
  const { user } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState<string>(user?.Name || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState<string>(user?.Email || "");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const [selectedSubPage] = useState<string>("");

  const updateUserName = async (newName: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }
    if (newName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    try {
      const updatedUserData = {
        ...user,
        Name: newName, // Zmieniamy tylko pole Name
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/Name`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("User name updated successfully");
        setUserName(newName);
      } else {
        console.error("Failed to update user name");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeName = async () => {
    try {
      await updateUserName(userName);
      setIsEditingName(false);
      console.log("New name:", userName);
    } catch (error) {
      console.error(error);
    }
  };
  const updateUserEmail = async (newEmail: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }
    if (newEmail.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }
    try {
      const updatedUserData = {
        ...user,
        Email: newEmail,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/Email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
          credentials: "include",
        }
      );
      if (response.ok) {
        console.log("User name updated successfully");
        setUserEmail(newEmail);
      } else {
        console.error("Failed to update user name");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeEmail = async () => {
    try {
      await updateUserEmail(userEmail);
      setIsEditingEmail(false);
      console.log("New email:", userEmail);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserPassword = async (newUserPassword: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }
  
    // Tworzymy obiekt JSON z nowym hasłem
    const passwordData = newUserPassword; // Tylko hasło, bez klucza "haslo"

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/Password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData), // Wysyłamy same hasło
          credentials: "include",
        }
      );
  
      if (response.ok) {
        console.log("Password updated successfully");
        setNewPassword(newUserPassword); // Update the state with the new password
      } else {
        // Check if the server returned a specific error message
        if (response.status === 400) {
          console.error("Bad request. Make sure the new password is valid.");
        } else if (response.status === 404) {
          console.error(`User with ID ${user.Id} not found.`);
        } else if (response.status === 500) {
          console.error("Server error. Please try again later.");
        } else {
          console.error("Failed to update password. Status: " + response.status);
        }
      }
    } catch (error) {
      console.error("Error while updating password:", error);
    }
  };
  
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
  
    setPasswordError(null);
    setPasswordSuccess("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  
    try {
      // Zaktualizuj hasło użytkownika
      await updateUserPassword(newPassword);
      setIsChangingPassword(false); // Po zakończeniu zmiany hasła, możesz zakończyć proces
      console.log("New password:", newPassword);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const handleToggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  return (
    <div className="p-4 bg-[#121212]">
  <div className="flex flex-col items-start justify-center gap-6 mt-4">
    <div className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] gap-4 w-full rounded-2xl shadow-md focus:outline-none transition duration-300 border-2 border-[#1F1F1F] p-6 h-auto border border-[#333333]">
      <strong className="text-lg text-white lg:pl-16">Name:</strong>
      <span className="text-lg text-gray-400 flex-grow">{user?.Name}</span>
      {isEditingName ? (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white w-full"
          />
          <button
            onClick={handleChangeName}
            className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-end lg:pr-16">
          {user?.Provider === "EMAIL" && (
            <button
            onClick={() => setIsEditingName(true)}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
              selectedSubPage === "Email"
                ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
            }`}
          >
            Change
          </button>
          )}
        </div>
      )}
    </div>

    <div className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2 border-[#1F1F1F] p-6 h-auto border border-[#333333]">
      <strong className="text-lg text-white lg:pl-16">Email:</strong>
      <span className="text-lg text-gray-400 flex-grow">{user?.Email}</span>
      {isEditingEmail ? (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white w-full"
          />
          <button
            onClick={handleChangeEmail}
            className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-end lg:pr-16">
          {user?.Provider === "EMAIL" && (
            <button
              onClick={() => setIsEditingEmail(true)}
              className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                selectedSubPage === "Email"
                  ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                  : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
              }`}
            >
              Change
            </button>
          )}
        </div>
      )}
    </div>

    {user?.Provider === "EMAIL" && (
      <div className="flex flex-col items-center gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2 border-[#1F1F1F] p-6 h-auto bg-[#1E1E1E] border border-[#333333]">
        <div className="flex items-center gap-2 w-full justify-center">
          <button
            onClick={handleToggleChangePassword}
            className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
              selectedSubPage === "Password"
                ? "bg-gradient-to-r from-[#6D6D6D] to-[#333333] text-white border-[#444444] scale-105"
                : "bg-[#2C2C2C] text-[#E0E0E0] border-[#3A3A3A] hover:bg-[#444444] hover:border-[#222222] hover:text-white hover:scale-105"
            }`}
          >
            Change password
          </button>
        </div>

        {isChangingPassword && (
          <div className="flex flex-col gap-4 mt-4 w-full p-6 h-auto bg-[#1E1E1E] rounded-lg border border-[#333333]">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-white">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="px-4 py-2 border border-[#333333] rounded bg-[#121212] text-white w-full"
              />
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm mt-2">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="text-green-500 text-sm mt-2">
                {passwordSuccess}
              </div>
            )}

            <button
              onClick={handleChangePassword}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
            >
              Save
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</div>


  );
};

export default UserSettings;
