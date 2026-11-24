import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { ToastMessage, ToastVariant } from '../types/task';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; iconClass: string }
> = {
  success: {
    icon: CheckCircle2,
    iconClass: 'text-emerald-600 dark:text-emerald-400',
  },
  info: {
    icon: Info,
    iconClass: 'text-indigo-600 dark:text-indigo-400',
  },
  warning: {
    icon: AlertCircle,
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    icon: AlertCircle,
    iconClass: 'text-rose-600 dark:text-rose-400',
  },
};

/**
 * Floating toast notification stack for task CRUD feedback.
 */
export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6"
    >
      {toasts.map((toast) => {
        const style = VARIANT_STYLES[toast.variant];
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg transition-all duration-200 dark:border-slate-700 dark:bg-slate-900"
          >
            <Icon
              className={`mt-0.5 h-5 w-5 shrink-0 ${style.iconClass}`}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {toast.title}
              </p>
              {toast.description && (
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
