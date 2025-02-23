import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "../Models/User";
import { useAuth } from "./AuthContext";
import useToast from "../hooks/useToast";

interface UserContextProps {
  user: User | null;
  updateUserName: (newName: string) => Promise<void>;
  updateUserEmail: (newEmail: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  updateUserImage: (file: File) => void;
  userImage: string;
  isUserImage: boolean;
  fetchUserById: (id: number) => void;
  saveImageToDatabase: (file: File) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userImage, setUserImage] = useState<string>("");
  const [isUserImage, setIsUserImage] = useState<boolean>(true);

  const { showToast } = useToast();

  /**
   * A function to fetch the user data by id.
   * It sends a GET request to the API with the user id.
   * If the response is successful, the user data is set to the state.
   * If the user has a profile picture, the profile picture is set to the state.
   * If there is an error, it logs the error to the console.
   *
   * @async
   * @function fetchUserById
   * @param {number} id - The id of the user to fetch
   * @returns {Promise<void>}
   */
  const fetchUserById = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const userData = await response.json();

        if (userData?.Picture) {
          setUserImage(`${import.meta.env.VITE_API_URL}${userData.Picture}`);
        } else {
          setIsUserImage(false);
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  /**
   * A function to save the image to the database.
   * It sends a PATCH request to the API with the user id and the file.
   * If the response is successful, the updated user data is set to the state.
   * If there is an error, it logs the error to the console.
   *
   * @async
   * @function saveImageToDatabase
   * @param {File} file - The image file to save
   * @returns {Promise<void>}
   */
  const saveImageToDatabase = async (file: File) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/profile-picture`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setIsUserImage(true);
        setUserImage(`${import.meta.env.VITE_API_URL}${updatedUser.filePath}`);
      }
    } catch {
      showToast(
        "Error occured while trying to update profile picture",
        "error"
      );
    }
  };

  /**
   * A function to update the user image.
   * It updates the preview image immediately.
   * It saves the image to the database.
   * @function updateUserImage
   * @param {File} file - The image file to update
   * @returns {void}
   */
  const updateUserImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUserImage(imageUrl);
    saveImageToDatabase(file);
  };

  /**
   * A function to fetch the user data by id when the component mounts.
   */
  useEffect(() => {
    if (user?.Id) {
      fetchUserById(user.Id);
    }
  }, []);

  /**
   * A function to update the user name.
   * It sends a PATCH request to the API with the user id and the new name.
   * If the response is successful, the user name is updated.
   * If there is an error, it logs the error to the console.
   * @async
   * @function updateUserName
   * @param {string} newName - The new name to update
   * @returns
   */
  const updateUserName = async (newName: string) => {
    if (!user) {
      return;
    }
    try {
      const updatedUserData = {
        ...user,
        Name: newName,
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
      if (!response.ok) {
        showToast("Failed to update user name", "error");
      }
    } catch {
      showToast("Failed to update user name", "error");
    }
  };

  /**
   * A function to update the user email.
   * It sends a PATCH request to the API with the user id and the new email.
   * If the response is successful, the user email is updated.
   * If there is an error, it logs the error to the console.
   * @async
   * @function updateUserEmail
   * @param {string} newEmail - The new email to update
   * @returns
   */
  const updateUserEmail = async (newEmail: string) => {
    if (!user) {
      return;
    }

    try {
      const updatedUserData = { ...user, Email: newEmail };
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
      if (!response.ok) {
        showToast("Failed to update user email", "error");
      }
    } catch {
      showToast("Failed to update user email", "error");
    }
  };

  /**
   * A function to update the user password.
   * It sends a PATCH request to the API with the user id and the new password.
   * If the response is successful, the user password is updated.
   * If there is an error, it logs the error to the console.
   * @async
   * @function updateUserPassword
   * @param {string} newUserPassword - The new password to update
   * @returns
   */
  const updateUserPassword = async (newUserPassword: string) => {
    if (!user) {
      return;
    }
    try {
      const passwordData = newUserPassword;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/Password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData),
          credentials: "include",
        }
      );

      if (!response.ok) {
        showToast("Failed to update password", "error");
      }
    } catch {
      showToast("Failed to update password", "error");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUserName,
        updateUserEmail,
        updateUserPassword,
        updateUserImage,
        userImage,
        isUserImage,
        fetchUserById,
        saveImageToDatabase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
