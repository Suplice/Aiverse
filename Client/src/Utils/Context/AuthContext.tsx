import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { User } from "../Models/User";
import { SignInFormData, SignUpFormData } from "../Models/Forms";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { GoogleSignInData } from "../Models/ProviderLogin";

interface AuthContextType {
  user: User | null;
  loginWithEmailAndPassword: (data: SignInFormData) => Promise<void>;
  registerWithEmailAndPassword: (data: SignUpFormData) => Promise<void>;
  isAuthenticated: boolean;
  Logout: () => Promise<void>;
  LoginWithGoogle: (data: GoogleSignInData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const loginWithEmailAndPassword = async (data: SignInFormData) => {
    setIsLoading(true);
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
        const result = await response.json();

        setIsAuthenticated(true);
        setUser({
          Id: result.data.Id,
          Email: result.data.Email,
          Provider: "EMAIL",
          Role: result.data.Role,
          Name: result.data.Name,
        });

        navigate("/");
      } else {
        console.error("Failed to login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmailAndPassword = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
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
        const result = await response.json();

        setIsAuthenticated(true);
        setUser({
          Id: result.data.Id,
          Email: result.data.Email,
          Provider: "EMAIL",
          Role: result.data.Role,
          Name: result.data.Name,
        });

        navigate("/");
      } else {
        const result = await response.json();
        console.log(result);
        console.error("Failed to register");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const LoginWithGoogle = async (data: GoogleSignInData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google`,
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
        const result = await response.json();

        setIsAuthenticated(true);
        setUser({
          Id: result.data.Id,
          Email: result.data.Email,
          Provider: "GOOGLE",
          Role: result.data.Role,
          Name: result.data.Name,
        });

        navigate("/");
      } else {
        console.error("Failed to login with Google");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/auth/SignIn");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkCredentials = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/credentials`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const result = await response.json();

          console.log(result);

          setIsAuthenticated(true);
          setUser({
            Id: result.data.Id,
            Email: result.data.Email,
            Provider: result.data.Provider,
            Role: result.data.Role,
            Name: result.data.Name,
          });
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkCredentials();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        isAuthenticated,
        Logout,
        LoginWithGoogle,
      }}
    >
      {isLoading ? <LoadingPage /> : children}
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