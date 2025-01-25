import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "../Models/User";
import { useAuth } from "./AuthContext";

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
        console.log(userData);
        //setUser(userData);
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

        setUserImage(`${import.meta.env.VITE_API_URL}${updatedUser.filePath}`);
      } else {
        console.error("Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const updateUserImage = (file: File) => {
    // Update the preview image immediately
    const imageUrl = URL.createObjectURL(file);
    setUserImage(imageUrl);

    // Save the image to the database
    saveImageToDatabase(file);
  };

  useEffect(() => {
    if (user?.Id) {
      fetchUserById(user.Id);
    }
  }, []);

  const updateUserName = async (newName: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }
    try {
      const updatedUserData = {
        ...user,
        Name: newName, // Update only the Name field
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
      } else {
        console.error("Failed to update user name");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserEmail = async (newEmail: string) => {
    if (!user) {
      console.error("User data is not available");
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
      if (response.ok) {
        console.log("User email updated successfully");
      } else {
        console.error("Failed to update user email");
      }
    } catch (error) {
      console.error("Error while updating email:", error);
    }
  };

  const updateUserPassword = async (newUserPassword: string) => {
    if (!user) {
      console.error("User data is not available");
      return;
    }
    try {
      const passwordData = newUserPassword; // Just the password

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${user.Id}/Password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passwordData), // Send only the password
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Password updated successfully");
      } else {
        console.error("Failed to update password. Status:", response.status);
      }
    } catch (error) {
      console.error("Error while updating password:", error);
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
