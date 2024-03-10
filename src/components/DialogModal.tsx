import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DialogModalProps = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children?: ReactNode;
};

export default function DialogModal({
  isOpen,
  title,
  onClose,
  children,
}: DialogModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('close', onClose);

    return () => {
      dialog.removeEventListener('close', onClose);
    };
  }, [onClose]);

  return createPortal(
    <>
      <dialog
        className="border border-1 border-secondary-subtle rounded p-0"
        ref={dialogRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-between p-3 border-bottom">
              <h5>{title}</h5>
              <button className="btn-close" onClick={() => onClose()} />
            </div>
            <div className="modal-body p-3 border-bottom">{children}</div>
            <div className="modal-footer p-3">
              <button className="btn btn-primary" onClick={() => onClose()}>
                Accept
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>,
    document.querySelector('#modal-container') as HTMLElement
  );
}
