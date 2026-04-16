import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (
    message: string,
    type?: ToastType,
    durationInSeconds?: number,
  ) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const removeToast = useCallback((id: number) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', durationInSeconds = 3) => {
      const id = toastId.current++;
      setToasts((toasts) => [...toasts, {id, message, type}]);
      if (durationInSeconds > 0) {
        setTimeout(() => removeToast(id), durationInSeconds * 1000);
      }
    },
    [removeToast],
  );
  // TODO: Útfæra "animation" fyrir toasts, t.d. fade in/out eða slide in/out
  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow-lg flex items-center justify-center bg-(--container-bg-color) min-w-60 `}
          >
            <p>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
