import { create } from "zustand";

interface SuccessStoreType {
  message: string | null;
  setMessage: (message: string) => void;
  clearMessage: () => void;
}

const useSuccessStore = create<SuccessStoreType>((set) => ({
  message: null,
  // set the message
  setMessage: (message) => {
    set({ message: null }); // first clear previous message

    //then set new message
    setTimeout(() => {
      set({ message });
      // start a timeout to make message null again after 5 seconds
      setTimeout(() => {
        set({ message: null });
      }, 5000);
    }, 10);
  },
  // make message null
  clearMessage: () => {
    set({ message: null });
  },
}));

export default useSuccessStore;
