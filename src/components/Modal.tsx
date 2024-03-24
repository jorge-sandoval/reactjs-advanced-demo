import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="overlay" onClick={() => onClose()} />
      <div className="modal-body">{children}</div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
}
