import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '../../context/ModalContext';
import './Modal.css';

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    closeModal();
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  return createPortal(
    <dialog ref={dialogRef} className="modal-container" onCancel={handleCancel} onClick={handleClick}>
      {content}
    </dialog>,
    document.body
  );
};

export default Modal;
