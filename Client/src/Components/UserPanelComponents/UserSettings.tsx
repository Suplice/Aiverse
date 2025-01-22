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

  const handleChangeName = async () => {
    setIsEditingName(false);
    console.log("New name:", userName);
  };

  const handleChangeEmail = async () => {
    setIsEditingEmail(false);
    console.log("New email:", userEmail);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    setPasswordError(null);
    setPasswordSuccess("Password changed successfully!");
    setIsChangingPassword(false);
    console.log("New password:", newPassword);
  };

  return (
    <Block className="p-4 bg-[#121212] rounded-lg text-white" direction="column" gap={6}>
      <Block className="bg-[#2E2E2E] p-6  rounded-lg shadow-md border-4 md:flex-row" justify="start" align="center" direction="column" gap={4}>
        <BlockTextField className="text-lg text-white" value="Name:" />
        {!isEditingName ? (
          <Block className="w-full md:flex-row" align="center" justify="between" gap={4} direction="column">
            <TextField value={user?.Name} className="text-lg flex-grow text-white bg-transparent" />
            <Button
              value="Change"
              onClick={() => setIsEditingName(true)}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-white hover:bg-white hover:text-black"
            />
          </Block>
        ) : (
          <Block direction="row" gap={2}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-[#121212] text-white"
            />
            <Button
              value="Save"
              onClick={handleChangeName}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-white"
            />
          </Block>
        )}
      </Block>

      <Block className="bg-[#2E2E2E] p-6 rounded-lg shadow-md border-4 md:flex-row" justify="start" align="center" direction="column" gap={4}>
        <BlockTextField className="text-lg text-white" value="Email:" />
        {!isEditingEmail ? (
          <Block className="w-full md:flex-row" align="center" justify="between" gap={4} direction="column">
            <TextField value={user?.Email} className="text-lg flex-grow text-white bg-transparent" />
            <Button
              value="Change"
              onClick={() => setIsEditingEmail(true)}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-white hover:bg-white hover:text-black"
            />
          </Block>
        ) : (
          <Block direction="row" gap={2}>
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-[#121212] text-white"
            />
            <Button
              value="Save"
              onClick={handleChangeEmail}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-white"
            />
          </Block>
        )}
      </Block>

      <Block className="bg-[#2E2E2E] p-6 rounded-lg shadow-md border-4" direction="column" gap={4}>
        <Button
          value="Change Password"
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-white hover:bg-white hover:text-black"
        />
        {isChangingPassword && (
          <Block direction="column" gap={4}>
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-[#121212] text-white"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-[#121212] text-white"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="px-4 py-2 border rounded w-full bg-[#121212] text-white"
            />
            {passwordError && <TextField value={passwordError} className="text-red-500" />}
            {passwordSuccess && <TextField value={passwordSuccess} className="text-green-500" />}
            <Button
              value="Save"
              onClick={handleChangePassword}
              className="px-6 py-3 rounded-lg shadow-md focus:outline-none transition duration-300 border-4 bg-[#1E1E1E] text-green-500 hover:bg-green-500 hover:text-white"
            />
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default UserSettings;
