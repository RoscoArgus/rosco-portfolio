import React, { useRef, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(callback: () => void): React.RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = ({ target }: Event) => {
      if (target && ref.current && !ref.current.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
};

export default useClickOutside;
