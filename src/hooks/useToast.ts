import { useCallback, useEffect, useRef, useState } from 'react';
import { ToastMessage, ToastVariant } from '../types/task';

const TOAST_DURATION_MS = 3200;

/**
 * Custom hook for showing and auto-dismissing toast notifications.
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    if (timersRef.current[id]) {
      window.clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const showToast = useCallback(
    (title: string, variant: ToastVariant = 'success', description?: string) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const nextToast: ToastMessage = { id, title, description, variant };

      setToasts((prev) => [...prev.slice(-3), nextToast]);

      timersRef.current[id] = window.setTimeout(() => {
        dismissToast(id);
      }, TOAST_DURATION_MS);
    },
    [dismissToast]
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      Object.values(timers).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  return {
    toasts,
    showToast,
    dismissToast,
  };
}
