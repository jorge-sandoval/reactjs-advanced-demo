import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import cssClass from '../utils/cssClass';

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);
  const prevIsOpen = useRef<boolean>();

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

  useLayoutEffect(() => {
    if (prevIsOpen.current && !isOpen) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cssClass(
        'modal modal-sheet position-fixed',
        'd-flex justify-content-center align-items-center',
        isClosing && 'closing'
      )}
    >
      <div className="modal-dialog w-100">
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.querySelector('#modal-container') as HTMLElement
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

function Header({ children }: { children: ReactNode }) {
  return <div className="modal-header">{children}</div>;
}

function Body({ children }: { children: ReactNode }) {
  return <div className="modal-body">{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="modal-footer">{children}</div>;
}
