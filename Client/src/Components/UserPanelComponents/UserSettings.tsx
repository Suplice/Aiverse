import { useState } from "react";
import { useUser } from "../../Utils/Context/UserContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Utils/Models/User";

interface FormData {
  email: string;
}

const UserSettings = () => {
  const { user, setUser, updateUserName, updateUserEmail, updateUserPassword } = useUser(); // Added setUser to update user data globally
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState<string>(user?.Name || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userEmail] = useState<string>(user?.Email || "");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [selectedSubPage] = useState<string>("");

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();

  const handleChangeName = async () => {
    try {
      if (userName.trim() === "") {
        alert("Name cannot be empty!");
        return;
      }
      await updateUserName(userName);
      setUser((prevUser) => ({
        ...prevUser,
        Name: userName,
      } as User)); 
      setIsEditingName(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChangeEmail: SubmitHandler<FormData> = async (data) => {
    const { email } = data;
    if (email) {
      try {
        await updateUserEmail(email);
        setUser((prevUser) => ({
          ...prevUser,
          Email: email,
        } as User)); // Rzutowanie na User
        setIsEditingEmail(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
  
    try {
      await updateUserPassword(newPassword);
      setPasswordError(null);
      setPasswordSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsChangingPassword(false);
    } catch (error) {
      console.error(error);
      setPasswordError("Failed to update password. Please try again.");
    }
  };

  const handleToggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setValue("email", userEmail); // Pre-fill the form with the current email
  };
  return (
    <div className="p-4 bg-[#121212]">
  <div className="flex flex-col items-start justify-center gap-6 mt-4">
    <div className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] gap-4 w-full rounded-2xl shadow-md focus:outline-none transition duration-300 border-2 p-6 h-auto  border-[#333333]">
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
              selectedSubPage === "Name"
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

    <div className="flex flex-col lg:flex-row items-center bg-[#1E1E1E] gap-4 w-full rounded-lg shadow-md focus:outline-none transition duration-300 border-2  p-6 h-auto border-[#333333]">
          <strong className="text-lg text-white lg:pl-16">Email:</strong>
          <span className="text-lg text-gray-400 flex-grow">{user?.Email}</span>
          
          {isEditingEmail ? (
            <div className="flex items-center gap-2 w-full">
              <form onSubmit={handleSubmit(handleChangeEmail)} className="flex items-center gap-2 w-full">
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  defaultValue={userEmail}
                  className="px-4 py-2 border border-[#333333] rounded bg-[#1E1E1E] text-white w-full"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </div>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-black"
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div className="flex justify-end lg:pr-16">
              {user?.Provider === "EMAIL" && (
                <button
                  onClick={handleEditEmail}
                  className={`px-6 py-3 rounded-lg shadow-md focus:outline-none transition-all duration-300 transform ease-in-out border-2 ${
                    userEmail === "Email" 
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
