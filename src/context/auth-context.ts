import { createContext } from "react";

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type CurrentUserType = Omit<UserType, "password">;

type AuthContextType = {
  isAuthenticated: boolean;
  user: CurrentUserType | null;
  logout: () => void;
  handleAuthenticate: (data: Omit<UserType, "name"> | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
