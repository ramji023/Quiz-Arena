import { create } from "zustand";

export interface PlayerType {
  id: string;
  fullName: string;
  score: number;
}

interface SocketStore {
  socketRef: React.MutableRefObject<WebSocket | null>;
  id: string | null;
  role: "host" | "player";
  fullName: string | null;
  gameId: string | null;
  themeId: string | null;
  usersJoined: PlayerType[];
  setSocketInstance: (socket: WebSocket) => void;
  clearSocket: () => void;
}

const socketRef = { current: null };

const useSocketStore = create<SocketStore>((set, get) => ({
  socketRef,
  id: null,
  role: "player",
  fullName: null, // store player name
  gameId: null,
  themeId: null,
  usersJoined: [], // store all the players
  setSocketInstance: (socket) => {
    get().socketRef.current = socket;

    // if server send message to client
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data); // parse the json data

      console.log("server message : ", parsedData);
      switch (parsedData.type) {
        //when host start game
        case "game-pin":
          set({
            gameId: parsedData.data.gamePin,
            id: parsedData.data.userId,
            role: "host",
          });
          console.log("gameID", parsedData.data.gamePin);
          break;

        // when player join join
        case "send-player":
          set({
            id: parsedData.data.userId,
            gameId: parsedData.data.gameId,
            themeId: parsedData.data.themeId,
            fullName: parsedData.data.fullName,
            usersJoined: [...parsedData.data.players],
          });
          console.log("joined user data : ", get().usersJoined);
          break;
      }
    };
  },

  clearSocket: () => {
    if (get().socketRef.current) {
      get().socketRef.current?.close();
    }
    set({ socketRef: { current: null }, gameId: null });
  },
}));

export default useSocketStore;
