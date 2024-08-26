import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T>();
  const item = window.localStorage.getItem(key);

  useEffect(() => {
    if (item) {
      const parsedData = JSON.parse(item) as T;
      setData(parsedData);
    }
  }, [item]);

  function setItem(value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function removeItem() {
    window.localStorage.removeItem(key);
  }

  return { data, setItem, removeItem };
}
