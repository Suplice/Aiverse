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
import { ToastContainer } from "react-toastify";
import useToast from "../hooks/useToast";

interface AuthContextType {
  user: User | null;
  loginWithEmailAndPassword: (data: SignInFormData) => Promise<void>;
  registerWithEmailAndPassword: (data: SignUpFormData) => Promise<void>;
  isAuthenticated: boolean;
  Logout: () => Promise<void>;
  LoginWithGoogle: (data: GoogleSignInData) => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { showToast } = useToast();

  const navigate = useNavigate();

  /**
   * A function to login with email and password.
   * A POST request is sent to the API with the email and password.
   * If the response is successful, the user is authenticated and the user data is set to the state.
   * else an error message is shown.
   * @async
   * @function loginWithEmailAndPassword
   * @param {SignInFormData} data holds the email and password of the user
   * @returns {Promise<void>}
   */
  const loginWithEmailAndPassword = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
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

        showToast("Logged in successfully", "success");

        navigate("/");
      } else {
        showToast("Invalid credentials, please try again", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * A function to register with email and password.
   * A POST request is sent to the API with the email, password, and name.
   * If the response is successful, the user is authenticated and the user data is set to the state.
   * else an error message is shown.
   * @async
   * @function registerWithEmailAndPassword
   * @param {SignUpFormData} data holds the email, password, and name of the user
   * @returns {Promise<void>}
   */
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

        showToast("Registered successfully", "success");

        navigate("/");
      } else {
        showToast("Failed to register, please try again", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * A function to login with Google.
   * A POST request is sent to the API with the google sign in data.
   * If the response is successful, the user is authenticated and the user data is set to the state.
   * else an error message is shown.
   * @async
   * @function LoginWithGoogle
   * @param {GoogleSignInData} data holds the google sign in data
   * @returns {Promise<void>}
   */
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

      const result = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setUser({
          Id: result.data.Id,
          Email: result.data.Email,
          Provider: "GOOGLE",
          Role: result.data.Role,
          Name: result.data.Name,
        });

        showToast("Logged in successfully", "success");

        navigate("/");
      } else {
        showToast("Failed to login with Google, please try again", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * A function to logout the user.
   * A POST request is sent to the API to logout the user.
   * If the response is successful, the user is logged out and the user data is set to null.
   * else an error message is shown.
   * @async
   * @function Logout
   * @returns {Promise<void>}
   */
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
        showToast("Logged out successfully", "success");
      } else {
        showToast("Failed to logout", "error");
      }
    } catch {
      showToast("Failed to logout", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /**
     * A function to check the user credentials.
     * A GET request is sent to the API to check the user credentials.
     * If the response is successful, the user is authenticated and the user data is set to the state.
     * else the user is not authenticated and the user data is set to null.
     * @async
     * @function checkCredentials
     * @returns {Promise<void>}
     */
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
        setUser,
      }}
    >
      <ToastContainer />
      <>{isLoading ? <LoadingPage /> : children}</>
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
