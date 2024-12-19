import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";

const UserSettings = () => {
  const { user } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState<string>(user?.Name || "");

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const handleChangeName = () => {
    if (userName.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }

    setUserName(userName);
    setIsEditingName(false);
    console.log("New name:", userName);
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start justify-center gap-6 mt-4">
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
              <button
                onClick={handleChangeName}
                className="px-2 py-1 bg-white text-green-500 border-2 border-green-500 rounded-lg shadow-md hover:bg-green-500 hover:text-white focus:outline-none transition duration-300"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {user?.Name}
              <button
                onClick={() => setIsEditingName(true)}
                className="px-2 py-1 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none transition duration-300"
              >
                Change
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Email:</strong>
          <div className="flex items-center gap-2">
            {user?.Email}
            {user?.Provider === "EMAIL" && (
              <button className="px-2 py-1 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none transition duration-300">
                Change
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          <strong>Provider:</strong> {user?.Provider}
        </div>

        {user?.Provider === "EMAIL" && (
          <div className="flex flex-row items-center gap-4">
            <strong>Password:</strong>
            <button
              onClick={handleToggleChangePassword}
              className="px-2 py-1 bg-white text-black border-2 border-black rounded-lg shadow-md hover:bg-black hover:text-white focus:outline-none transition duration-300"
            >
              Change Password
            </button>
          </div>
        )}

        {isChangingPassword && (
          <div className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="px-2 py-1 border rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-2 py-1 border rounded w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="px-2 py-1 border rounded w-full"
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
              className="px-2 py-1 bg-white text-green-500 border-2 border-green-500 rounded-lg shadow-md hover:bg-green-500 hover:text-white focus:outline-none transition duration-300"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSettings;
