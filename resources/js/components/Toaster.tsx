import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Toast as ToastData, useToastStore } from '../stores/useToastStore';

const TYPE_CONFIG: Record<ToastData['type'], { Icon: typeof CheckCircle2; box: string; icon: string }> = {
  success: { Icon: CheckCircle2, box: 'border-green-400 bg-green-50 text-green-800', icon: 'text-green-500' },
  error: { Icon: AlertCircle, box: 'border-red-400 bg-red-50 text-red-800', icon: 'text-red-500' },
  info: { Icon: Info, box: 'border-amber-400 bg-amber-50 text-amber-800', icon: 'text-amber-500' },
};

const ToastItem: React.FC<{ toast: ToastData }> = ({ toast }) => {
  const removeToast = useToastStore((s) => s.removeToast);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { Icon, box, icon } = TYPE_CONFIG[toast.type];

  const dismiss = (): void => {
    setLeaving(true);
    window.setTimeout(() => removeToast(toast.id), 200);
  };

  useEffect(() => {
    // Animation d'entrée puis auto-disparition après `duration`.
    const enter = window.requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(dismiss, toast.duration);
    return () => {
      window.cancelAnimationFrame(enter);
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-start gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg transition-all duration-200 ${box} ${
        visible && !leaving ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'
      }`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${icon}`} />
      <span className="flex-1 break-words">{toast.message}</span>
      <button onClick={dismiss} className="shrink-0 opacity-60 transition hover:opacity-100" aria-label="Fermer">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const Toaster: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[9999] flex w-[calc(100%-2rem)] max-w-xs flex-col-reverse gap-2 sm:max-w-sm">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
};

export default Toaster;
