import { useState, useCallback } from 'react';

export const usePasswordToggle = () => {
  const [show, setShow] = useState(false);

  const toggle = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return { show, toggle };
};
