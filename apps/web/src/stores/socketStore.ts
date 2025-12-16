import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  tik_tik: number | null;
  gameStatus: "waiting" | "ready" | "start" | "end" | null;
  answerResult: null | "correct" | "wrong";
  notification: string | null;
  isConnected: boolean;
  setSocketInstance: (socket: WebSocket) => void;
  disconnectSocket: () => void;
  resetSession: () => void;
}

// zustand store to manage all states while hosting/playing quiz 
// it handle both events (admin and player)
const useSocketStore = create<SocketStore>()(
  persist(
    (set, get) => {
      return {
        socketRef: { current: null },  // store socket instance
        id: null,  // store id (player && host)
        role: "player", // store role (wheather he is admin or player)
        fullName: null, // store user fullName
        gameId: null, // store game Id
        themeId: null, //  store theme Id
        playerJoined: [], // store joined player list (fullName, score,id)
        question: null, // store current question data (when question is send by server)
        tik_tik: null, // store timer duration for question
        gameStatus: null, // store current game status (waiting, ready, start, end)
        answerResult: null, // store answer result (correct/wrong) after checking answer by server
        notification: null, // store notification message (player join,left and reconnect messages)
        isConnected: false, // store socket connection status (wheather socket is connected or not )

        setSocketInstance: (socket) => {
          get().socketRef.current = socket;
          set({ isConnected: true });

          socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);

            switch (parsedData.type) {
              case "game-pin":
                set({
                  gameId: parsedData.data.gamePin,
                  id: parsedData.data.userId,
                  gameStatus: parsedData.data.gameStatus,
                  tik_tik: parsedData.data.tik_tik,
                  role: parsedData.data.role,
                  fullName: parsedData.data.fullName,
                });
                console.log("after updating tik_tik : ", get().tik_tik);
                break;

              case "player-join":
                set({
                  id: parsedData.data.userId,
                  role: parsedData.data.role,
                  gameId: parsedData.data.gameId,
                  themeId: parsedData.data.themeId,
                  fullName: parsedData.data.fullName,
                  tik_tik: parsedData.data.duration,
                  gameStatus: parsedData.data.gameStatus,
                });
                break;

              case "joined-player":
                set({ playerJoined: parsedData.data.playerJoined });
                break;

              case "quiz-ready":
                set({ gameStatus: parsedData.data.gameStatus });
                break;

              case "send-question":
                set({
                  gameStatus: parsedData.data.gameStatus,
                  question: parsedData.data.question,
                  playerJoined: parsedData.data.players,
                  answerResult: null,
                });
                break;

              case "answer-checked":
                set({
                  answerResult: parsedData.data.selectedOption
                    ? "correct"
                    : "wrong",
                });
                break;

              case "players-score":
                set({ playerJoined: parsedData.data.players });
                break;

              case "quiz-completed":
                set({
                  playerJoined: parsedData.data.players,
                  gameStatus: parsedData.data.gameStatus,
                });
                break;

              case "player_left":
              case "host_left":
                set({ notification: parsedData.message });
                break;

              case "PLAYER_RECONNECT":
                set({
                  id: parsedData.data.id,
                  role: parsedData.data.role,
                  fullName: parsedData.data.fullName,
                  gameId: parsedData.data.gameId,
                  themeId: parsedData.data.themeId,
                  playerJoined: parsedData.data.playerJoined,
                  tik_tik: parsedData.data.tik_tik,
                  gameStatus: parsedData.data.gameStatus,
                  question: null,
                  answerResult: null,
                  notification: null,
                });
                get().socketRef.current?.send(
                  JSON.stringify({ type: "PLAYER_RECONNECT_SUCCESS" })
                );
                break;

              case "HOST_RECONNECT":
                set({
                  id: parsedData.data.id,
                  role: parsedData.data.role,
                  fullName: parsedData.data.fullName,
                  gameId: parsedData.data.gameId,
                  themeId: parsedData.data.themeId,
                  playerJoined: parsedData.data.player_joined,
                  tik_tik: parsedData.data.tik_tik,
                  gameStatus: parsedData.data.gameStatus,
                  question: null,
                  answerResult: null,
                  notification: null,
                });
                get().socketRef.current?.send(
                  JSON.stringify({ type: "HOST_RECONNECT_SUCCESS" })
                );
                break;

              case "reconnect-msg":
                set({ notification: parsedData.message });
                break;

              case "host_reconnect_failed":
                set({ gameStatus: null });
                break;
            }
          };

          socket.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
          };

          socket.onclose = (event) => {
            console.log("🔌 WebSocket closed");
          };
        },

        disconnectSocket: () => {
          const ws = get().socketRef.current;
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
          get().socketRef.current = null;
          set({ isConnected: false });
        },

        resetSession: () => {
          get().disconnectSocket();
          set({
            id: null,
            fullName: null,
            gameId: null,
            gameStatus: null,
            themeId: null,
            playerJoined: [],
            question: null,
            answerResult: null,
            notification: null,
            isConnected: false,
          });
          localStorage.removeItem("quiz-session");
        },
      };
    },
    {
      name: "quiz-session",
      partialize: (state) => ({
        id: state.id,
        gameId: state.gameId,
        role: state.role,
        fullName: state.fullName,
        gameStatus: state.gameStatus,
      }),
    }
  )
);

export default useSocketStore;
