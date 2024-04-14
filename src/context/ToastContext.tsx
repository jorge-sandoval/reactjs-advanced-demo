import { createContext } from 'react';
import { ToastContextProps } from '../models/toast';

const ToastContext = createContext<ToastContextProps | null>(null);

export default ToastContext;
