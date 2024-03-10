import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type CustomModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
};

export default function CustomModal({
  isOpen,
  title,
  onClose,
  children,
}: CustomModalProps) {
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

  return createPortal(
    <>
      <div
        className={`modal modal-sheet position-fixed bg-dark bg-opacity-25 ${
          isOpen ? 'd-flex justify-content-center align-items-center' : 'd-none'
        }`}
      >
        <div className="modal-dialog w-100">
          <div className="modal-content">
            <div className="modal-header">
              <h5>{title}</h5>
              <button className="btn-close" onClick={() => onClose()} />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => onClose()}>
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector('#modal-container') as HTMLElement
  );
}
