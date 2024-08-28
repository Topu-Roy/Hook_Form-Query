import { type ReactElement, useCallback, useEffect, useState } from "react";
import { useNewLocalStorage } from "@/hooks/useLocalStorage";
import {
  AuthContext,
  type CurrentUserType,
  type UserType,
} from "@/context/auth-context";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<CurrentUserType | null>(null);
  const {
    getItem: getCurrentSession,
    removeItem: removeCurrentSession,
    setItem: updateCurrentSession,
  } = useNewLocalStorage<CurrentUserType>("currentUserSession");
  const { getItem: getAllUsersArray } =
    useNewLocalStorage<UserType[]>("allUsersArray");
  const [currentSession, setCurrentSession] = useState<CurrentUserType>();

  useEffect(() => {
    const session = getCurrentSession();
    if (session) setCurrentSession(session);
  }, []);

  useEffect(() => {
    if (currentSession) {
      setUser(currentSession);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [currentSession]);

  const handleAuthenticate = useCallback(
    (data: Omit<UserType, "name"> | null) => {
      if (data) {
        const latestUsers = getAllUsersArray() || [];
        const userData = latestUsers.find((user) => user.email === data.email);

        if (!userData) {
          return alert("User not found");
        }

        if (data.password !== userData.password) {
          return alert("Password is not correct");
        }

        updateCurrentSession({
          email: userData.email,
          name: userData.name,
        });

        setCurrentSession({
          email: userData.email,
          name: userData.name,
        });
      } else {
        return alert("No user exist yet. Register first.");
      }
    },
    [getAllUsersArray, updateCurrentSession],
  );

  const logout = useCallback(() => {
    removeCurrentSession();
    setCurrentSession(undefined);
  }, [removeCurrentSession]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logout, handleAuthenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
