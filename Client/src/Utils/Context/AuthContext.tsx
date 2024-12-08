import { createContext, useState, ReactNode, useContext } from "react";
import { User } from "../Models/User";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
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
