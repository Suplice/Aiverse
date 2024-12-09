import { createContext, useState, ReactNode, useContext } from "react";
import { SignInFormData, SignUpFormData, User } from "../Models/User";

interface AuthContextType {
  user: User | null;
  loginWithEmailAndPassword: (data: SignInFormData) => Promise<void>;
  registerWithEmailAndPassword: (data: SignUpFormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User | null>(null);

  const loginWithEmailAndPassword = async (data: SignInFormData) => {
    try {
      console.log(data);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log(user);
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerWithEmailAndPassword = async (data: SignUpFormData) => {
    try {
      // Set provider to EMAIL
      data.Provider = "EMAIL";

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        const user = await response.json();
        console.log(user);
      } else {
        console.error("Failed to register");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
      }}
    >
      {children}s
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
