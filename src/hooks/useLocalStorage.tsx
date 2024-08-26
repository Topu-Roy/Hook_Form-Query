import { useEffect, useState } from "react";

export const keys = {
  allUsersArray: "USERS_DATA_ARRAY",
  currentUserSession: "CURRENT_USER_SESSION",
};

type UserType = {
  name: string;
  email: string;
  password: string;
};

type CurrentUserType = Omit<UserType, "password">;

export function useLocalStorage_userList() {
  const [allUsersArray, setData] = useState<UserType[] | null>(null);
  const localValue = localStorage.getItem(keys.allUsersArray);

  useEffect(() => {
    if (localValue) {
      setData(JSON.parse(localValue));
    }
  }, [localValue]);

  const updateUsersArray = (userData: UserType) => {
    if (Array.isArray(allUsersArray)) {
      if (allUsersArray.find((item) => item.email === userData.email)) {
        return alert("User already exist");
      }

      const newData = [...allUsersArray, userData];
      localStorage.setItem(keys.allUsersArray, JSON.stringify(newData));
    }
  };

  return { allUsersArray, updateUsersArray };
}

export function useLocalStorage_userSession() {
  const [currentSession, setData] = useState<CurrentUserType[] | null>(null);
  const localValue = localStorage.getItem(keys.currentUserSession);

  useEffect(() => {
    if (localValue) {
      setData(JSON.parse(localValue));
    }
  }, [localValue]);

  const updateCurrentSession = (userData: CurrentUserType | null) => {
    localStorage.setItem(keys.currentUserSession, JSON.stringify(userData));
  };

  return { currentSession, updateCurrentSession };
}
