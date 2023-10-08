import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialVualue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof initialVualue === "function") {
      return (initialVualue as () => T)();
    } else {
      return initialVualue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
