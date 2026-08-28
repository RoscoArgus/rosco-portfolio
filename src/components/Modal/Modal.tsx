import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';
import { useEffect } from 'react';
import './Modal.css';

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, [closeModal]);

  return createPortal(
    <div className={'modal-bg' + (isOpen ? ' open' : '')} onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
