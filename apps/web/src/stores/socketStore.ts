import { create } from "zustand";
import { useQuizStore } from "./quizStore";

export interface PlayerType {
  id: string;
  fullName: string;
  score: number;
}

export interface QuestionType {
  questionId: string;
  question: string;
  points: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

interface SocketStore {
  socketRef: React.MutableRefObject<WebSocket | null>;
  id: string | null;
  role: "host" | "player";
  fullName: string | null;
  gameId: string | null;
  themeId: string | null;
  playerJoined: PlayerType[];
  question: QuestionType | null;
  gameStatus: "waiting" | "ready" | "start" | "end";
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
  playerJoined: [], // store all the players
  question: null,
  gameStatus: "waiting",
  setSocketInstance: (socket) => {
    get().socketRef.current = socket;

    // if server send message to client
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data); // parse the json data

      // console.log("server message : ", parsedData);
      switch (parsedData.type) {
        //when host start game
        case "game-pin":
          set({
            gameId: parsedData.data.gamePin,
            id: parsedData.data.userId,
            role: "host",
          });
          // console.log("gameID", parsedData.data.gamePin);
          break;

        // when player join quiz
        case "player-join":
          set({
            id: parsedData.data.userId,
            gameId: parsedData.data.gameId,
            themeId: parsedData.data.themeId,
            fullName: parsedData.data.fullName,
          });
          break;

        // get all the joined user data
        case "joined-player":
          set({ playerJoined: parsedData.data.playerJoined });
          break;

        // got messsage to start the quiz after 5 seconds
        case "quiz-ready":
          set({ gameStatus: "ready" });
          useQuizStore.getState().resetQuiz();
          break;

        //  got current question data and current player score
        case "send-question":
          set({
            gameStatus: "start",
            question: parsedData.data.question,
            playerJoined: parsedData.data.players,
          });
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
