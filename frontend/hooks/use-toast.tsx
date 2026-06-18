import { useCallback } from "react";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: string;
};

export function useToast() {
  const toast = useCallback((opts: ToastOptions) => {
    // Minimal implementation: log to console so callers work during build/runtime.
    // Replace this with a real toast system if desired.
    // eslint-disable-next-line no-console
    console.info("toast:", opts);
  }, []);

  return { toast };
}

export default useToast;
