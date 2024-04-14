export default interface IToast {
  id: string;
  message: string;
  options?: ToastOptions;
}

export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastOptions {
  appearance?: 'success' | 'error' | 'warning' | 'info';
  autoDismiss?: boolean;
  autoDismissTimeout?: number;
  position?: ToastPosition;
}

export interface ToastContextProps {
  toasts: IToast[];
  addToast: (message: string, options?: ToastOptions) => void;
  removeToast: (toastId: string) => void;
}


export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  appearance: 'info',
  autoDismiss: true,
  autoDismissTimeout: 2500,
  position: 'top-right',
};
   