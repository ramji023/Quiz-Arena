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
    // add message listener here
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data); // parse the json data

      console.log("server message : ", message);
    };
  },
}));

export default useSocketStore;
