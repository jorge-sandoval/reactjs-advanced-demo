import { Dispatch, SetStateAction, useEffect, useState } from "react";
import parseStoredValue from "../utils/parseStoredValue";

export default function useLocalStorage<T>(key = '', initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? parseStoredValue<T>(JSON.parse(storedValue)) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}