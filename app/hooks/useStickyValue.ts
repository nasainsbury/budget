"use client";
import React from "react";

function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setValue] = React.useState<T>(() => {
    let value = defaultValue;
    if (typeof window !== "undefined") {
      const stickyValue = window?.localStorage.getItem(key);
      if (stickyValue) {
        value = JSON.parse(stickyValue) as T;
      }
    }
    return value;
  });

  React.useEffect(() => {
    if (window) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useStickyState;
