import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T>();
  const item = window.localStorage.getItem(key);

  useEffect(() => {
    if (item) {
      const parsedData = JSON.parse(item) as T;
      setData(parsedData);
    }
  }, [item]);

  const setItem = useCallback((value: T) => {
    if (Array.isArray(data)) {
      const alreadyExist = data.find((item) => item === value);
      alreadyExist
        ? (window.location.href = "/auth/sign-in")
        : window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  const removeItem = useCallback(() => {
    window.localStorage.removeItem(key);
  }, []);

  return { data, setItem, removeItem };
}

export function useNewLocalStorage<T>(key: string) {
  const getItem = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setItem = useCallback((value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { getItem, setItem, removeItem };
}
