import { create } from "zustand";

interface ErrorStoreType {
  message: string | null;
  type: string | null;
  variant: string | null;
  setError: (variant: string, type: string, message: string) => void;
  clearError: () => void;
}
const useErrorStore = create<ErrorStoreType>((set) => ({
  message: null,
  type: null,
  variant: null,
  setError: (variant, type, message) => {
    set({ variant: null, type: null, message: null }); // clear previous error

    // after clearing previous error then set new error
    setTimeout(() => {
      set({ variant, type, message });

      // clear the error after 5 second (if type is notification)
      if (variant === "notification") {
        setTimeout(() => {
          set({ variant: null, type: null, message: null });
        }, 5000);
      }
    }, 10);
  },
  clearError: () => {
    set({ variant: null, type: null, message: null });
  },
}));

export default useErrorStore;
