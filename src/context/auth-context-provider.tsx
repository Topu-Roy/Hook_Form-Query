import { ReactNode, useCallback, useEffect, useState } from "react";
import { CurrentUserType, UserType } from "../components/sign-in";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const currentUser = localStorage.getItem(
    "currentUser",
  ) as CurrentUserType | null;

  useEffect(() => {
    if (currentUser) {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
