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
        dialog.showModal(); // Opens modal and traps focus automatically
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native Escape key press
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault(); // Prevent native browser closing to let React state manage it
    closeModal();
  };

  // Close when clicking the backdrop
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
