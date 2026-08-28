import { useState, useCallback, type ReactNode } from 'react';
import { ModalContext } from './ModalContext';

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((content: ReactNode) => {
    setContent(content);
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'initial';
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    document.documentElement.style.overflow = 'initial';
    document.documentElement.style.scrollbarGutter = 'stable';
    setIsOpen(false);
    setTimeout(() => {
      setContent(null);
    }, 250);
  }, []);

  return <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
