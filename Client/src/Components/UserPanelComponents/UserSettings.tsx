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
        `${import.meta.env.VITE_API_URL}/user/${user.Id}`,
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
        `${import.meta.env.VITE_API_URL}/user/${user.Id}`,
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

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordError(null);
    console.log("Old password:", oldPassword);
    console.log("New password:", newPassword);

    setPasswordSuccess("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleToggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex flex-col items-start justify-center gap-6 mt-4">
        
        <div className="flex flex-col lg:flex-row items-center bg-gray-100 gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-4 p-6 h-auto">
          <strong className="text-lg lg:pl-16">Name:</strong>
          <span className="text-lg flex-grow">{user?.Name}</span>
          {isEditingName ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
              <button
                onClick={handleChangeName}
                className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-end lg:pr-16">
              {user?.Provider === "EMAIL" && (
                <button
                  onClick={() => setIsEditingName(true)}
                  className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 ${
                    selectedSubPage === "Name"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                >
                  Change
                </button>
              )}
              </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row items-center bg-gray-100 gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-4 p-6 h-auto">
          <strong className="text-lg lg:pl-16">Email:</strong>
          <span className="text-lg flex-grow">{user?.Email}</span>
          {isEditingEmail ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
              <button
                onClick={handleChangeEmail}
                className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-end lg:pr-16">
                {user?.Provider === "EMAIL" && (
              <button
                onClick={() => setIsEditingEmail(true)}
                className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 ${
                  selectedSubPage === "Email"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                Change
              </button>
            )}
              </div>
          )}
        </div>


        {user?.Provider === "EMAIL" && (
          <div className="flex flex-col items-center gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-4 p-6 h-auto bg-gray-100">
            <div className="flex items-center gap-2 w-full justify-between">
              <button
                onClick={handleToggleChangePassword}
                className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 w-full ml-auto sm:ml-16 mr-auto sm:mr-16 ${
                  selectedSubPage === "Password"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                Change password
              </button>
            </div>

            {isChangingPassword && (
              <div className="flex flex-col gap-4 mt-4 w-full p-6 h-auto bg-gray-100 rounded-lg">
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium">Old Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full"
                  />
                </div>


                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded w-full"
                  />
                </div>

                {passwordError && (
                  <div className="text-red-500 text-sm mt-2">{passwordError}</div>
                )}

                {passwordSuccess && (
                  <div className="text-green-500 text-sm mt-2">{passwordSuccess}</div>
                )}

                <button
                  onClick={handleChangePassword}
                  className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
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
