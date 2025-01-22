import { useState } from "react";
import { useAuth } from "../../Utils/Context/AuthContext";
import Block from "../UI/Block";
import BlockTextField from "../UI/BlockTextField";
import TextField from "../UI/TextField";
import Button from "../UI/Button";

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

  const updateUserPassword = async (newUserPassword: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }

    if (newUserPassword.trim() === "") {
      alert("Name cannot be empty!");
      return;
    }

    try {
      const updatedUserData = {
        ...user,
        Password: newUserPassword, 
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
        setNewPassword(newPassword); 
      } else {
        console.error("Failed to update user name");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async () => {
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

    try {
      await updateUserPassword(newPassword);
      setIsChangingPassword(false);
      console.log("New password:", newPassword);
    } catch (error) {
      console.error(error);
    }
  };


  

  return (
    <Block className="p-4 bg-white rounded-lg" direction="column" gap={6}>
      <Block
        className="bg-gray-100 p-6 rounded-lg shadow-md border-4 md:flex-row"
        justify="start"
        align="center"
        direction="column"
        gap={4}
      >
        <BlockTextField className="text-lg" value="Name:" />
        {!isEditingName ? (
          <Block className="w-full md:flex-row" align="center" justify="between" gap={4} direction="column" >
            <TextField value={user?.Name} className="text-lg flex-grow" />
            {user?.Provider === "EMAIL" && (
              <Button
                value="Change"
                onClick={() => setIsEditingName(true)}
                className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-black hover:bg-black hover:text-white"
              />
            )}
          </Block>
        ) : (
          <Block direction="row" gap={2}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />
            <Button
              value="Save"
              onClick={handleChangeName}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
            />
          </Block>
        )}
      </Block>

      <Block
        className="bg-gray-100 p-6 rounded-lg shadow-md border-4 md:flex-row"
        justify="start"
        align="center"
        direction="column"
        gap={4}
      >
        <BlockTextField className="text-lg" value="Email:" />
        {!isEditingEmail ? (
          <Block className="w-full md:flex-row" align="center" justify="between" gap={4} direction="column" >
            <TextField value={user?.Email} className="text-lg flex-grow" />
            {user?.Provider === "EMAIL" && (
              <Button
                value="Change"
                onClick={() => setIsEditingEmail(true)}
                className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-black hover:bg-black hover:text-white"
              />
            )}
          </Block>
        ) : (
          <Block direction="row" gap={2}>
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="px-4 py-2 border rounded w-full"
            />
            <Button
              value="Save"
              onClick={handleChangeEmail}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
            />
          </Block>
        )}
      </Block>

      {user?.Provider === "EMAIL" && (
        <Block
          className="bg-gray-100 p-6 rounded-lg shadow-md border-4"
          direction="column"
          gap={4}
        >
          <Button
            value="Change Password"
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-black hover:bg-black hover:text-white"
          />
          {isChangingPassword && (
            <Block direction="column" gap={4}>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
              {passwordError && (
                <TextField value={passwordError} className="text-red-500" />
              )}
              {passwordSuccess && (
                <TextField value={passwordSuccess} className="text-green-500" />
              )}
              <Button
                value="Save"
                onClick={handleChangePassword}
                className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-white text-green-500 hover:bg-green-500 hover:text-white"
              />
            </Block>
          )}
        </Block>
      )}
    </Block>
  );
};

export default UserSettings;
