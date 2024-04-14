import { ReactNode, useState } from 'react';
import ToastContext from './ToastContext';
import IToast, { DEFAULT_TOAST_OPTIONS, ToastOptions } from '../models/toast';
import { createPortal } from 'react-dom';
import Toast from '../components/Toast/Toast';

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  function addToast(message: string, options: ToastOptions = {}) {
    const id = crypto.randomUUID();
    const opt = { ...DEFAULT_TOAST_OPTIONS, ...options };

    setToasts((prevToasts) => [...prevToasts, { id, message, options: opt }]);
    if (opt.autoDismiss) {
      setTimeout(() => removeToast(id), opt.autoDismissTimeout);
    }

    return id;
  }

  function removeToast(toastId: string) {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId)
    );
  }

  const toastsByPosition = toasts.reduce((grouped, toast) => {
    const position =
      toast.options?.position || (DEFAULT_TOAST_OPTIONS.position as string);

    if (!grouped[position]) {
      grouped[position] = [];
    }
    grouped[position].push(toast);

    return grouped;
  }, {} as Record<string, IToast[]>);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {createPortal(
        <>
          {Object.entries(toastsByPosition).map(([position, toasts]) => (
            <div key={position} className={`toast-container ${position}`}>
              {toasts.map((t) => (
                <Toast
                  key={t.id}
                  message={t.message}
                  remove={() => removeToast(t.id)}
                />
              ))}
            </div>
          ))}
        </>,
        document.querySelector('#toast-root') as HTMLElement
      )}
    </ToastContext.Provider>
  );
}
