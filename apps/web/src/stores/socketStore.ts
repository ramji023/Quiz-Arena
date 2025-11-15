import { create } from "zustand";

interface SocketStore {
  socketRef: React.MutableRefObject<WebSocket | null>;
  setSocketInstance: (socket: WebSocket) => void;
}

const socketRef = { current: null };

const useSocketStore = create<SocketStore>((set, get) => ({
  socketRef,

  setSocketInstance: (socket) => {
    get().socketRef.current = socket;
  },
}));

export default useSocketStore;
