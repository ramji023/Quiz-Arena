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
  answerResult: null | "correct" | "wrong";
  notification: string | null;
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
  answerResult: null,
  notification: null,
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
          set({ gameStatus: "ready" as "ready" });
          useQuizStore.getState().resetQuiz();
          break;

        //  got current question data and current player score
        case "send-question":
          set({
            gameStatus: "start" as "start",
            question: parsedData.data.question,
            playerJoined: parsedData.data.players,
            answerResult: null,
          });
          break;

        // got status of selected option
        case "answer-checked":
          set({
            answerResult: parsedData.data.selectedOption ? "correct" : "wrong",
          });
          break;

        // get updated player score
        case "players-score":
          set({ playerJoined: parsedData.data.players });
          break;

        // when quiz has been completed
        case "quiz-completed":
          set({
            playerJoined: parsedData.data.players,
            gameStatus: "end" as "end",
          });
          break;

        // when any player left the game
        case "player_left":
          // console.log("notification json data : ",parsedData)
          set({ notification: parsedData.message });
          break;

        // when host left the game
        case "host_left":
          set({ notification: parsedData.message });
          break;
      }
    };
  },

  clearSocket: () => {
    if (get().socketRef.current) {
      get().socketRef.current?.close();
    }
    set({
      socketRef: { current: null },
      id: null,
      fullName: null,
      themeId: null,
      playerJoined: [],
      question: null,
      gameStatus: "waiting",
      answerResult: null,
      notification: null,
      gameId: null,
    });
    useQuizStore.setState({quiz:null,themeId:null})
  },
}));

export default useSocketStore;
