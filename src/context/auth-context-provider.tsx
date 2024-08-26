import { ReactNode, useCallback, useState } from "react";
import type { CurrentUserType, UserType } from "../components/sign-in";
import { AuthContext } from "./auth-context";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CurrentUserType | null>(null);
  const { setItem: updateCurrentSession, removeItem: removeCurrentSession } =
    useLocalStorage<CurrentUserType>("currentUserSession");
  const { data: allUsersArray } = useLocalStorage<UserType[]>("allUsersArray");

  function handleAuthenticate(data: Omit<UserType, "name"> | null) {
    if (data) {
      if (Array.isArray(allUsersArray)) {
        const userData = allUsersArray.find(
          (user) => user.email === data.email,
        );

        if (!userData) {
          return alert("Email is not correct");
        }

        if (data.password !== userData.password) {
          return alert("Password is not correct");
        }

        updateCurrentSession({
          email: userData.email,
          name: userData.name,
        });

        setUser({
          email: userData.email,
          name: userData.name,
        });

        setIsAuthenticated(true);
      } else {
        return alert("No user exist yet. Register first.");
      }
    } else {
      removeCurrentSession();
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  const logout = useCallback(() => {
    removeCurrentSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, handleAuthenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
