import { createContext } from "react";
import { UserType } from "../components/sign-in";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
