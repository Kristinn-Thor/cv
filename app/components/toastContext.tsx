import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import gsap from 'gsap';

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
  // Store refs for each toast for animation purposes
  const toastRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  // Animate out, then remove toast
  const removeToast = useCallback((id: number) => {
    const toastEl = toastRefs.current[id];
    if (toastEl) {
      gsap.to(toastEl, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        onComplete: () => {
          setToasts((toasts) => toasts.filter((t) => t.id !== id));
          delete toastRefs.current[id];
        },
      });
    } else {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
      delete toastRefs.current[id];
    }
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

  // Animate in when toast is added
  useEffect(() => {
    toasts.forEach((toast) => {
      const el = toastRefs.current[toast.id];
      if (el && el.style.opacity === '0') {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    });
  }, [toasts]);

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-2">
        {toasts.map((toast) => (
          <div
            key={`toast-${toast.id}`}
            ref={(el) => {
              toastRefs.current[toast.id] = el;
            }}
            className={`px-4 py-3 rounded shadow-lg flex items-center justify-center bg-(--container-bg-color) min-w-60 opacity-0`}
            style={{opacity: 0, transform: 'translateY(-30px)'}}
          >
            <p>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
