"use client";

import { useEffect, useRef, useState } from "react";

export const useDebounce = (value, delay = 200) => {
  const [debouncedVal, setDebouncedVal] = useState(undefined);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedVal(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedVal;
};
