import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ModelContextValue {
  isOpen: boolean;
  content: ReactNode | null;
  openModal: (content: ReactNode, callbacks?: (() => void)[]) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModelContextValue | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [onCloseCallbacks, setOnCloseCallbacks] = useState<(() => void)[] | null>(null);

  const openModal = useCallback((content: ReactNode, callbacks?: (() => void)[]) => {
    setContent(content);
    setOnCloseCallbacks(callbacks || null);
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'initial';
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    document.documentElement.style.overflow = 'initial';
    document.documentElement.style.scrollbarGutter = 'stable';
    onCloseCallbacks?.forEach((callback) => callback());
    setIsOpen(false);
  }, [onCloseCallbacks]);

  return <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
