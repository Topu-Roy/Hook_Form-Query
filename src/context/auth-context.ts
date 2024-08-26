import { createContext } from "react";
import type { UserType, CurrentUserType } from "../components/sign-in";

type AuthContextType = {
  isAuthenticated: boolean;
  user: CurrentUserType | null;
  logout: () => void;
  handleAuthenticate: (data: Omit<UserType, "name"> | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
