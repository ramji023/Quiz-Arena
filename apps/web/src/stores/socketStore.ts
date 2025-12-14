import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  tik_tik: number | null;
  gameStatus: "waiting" | "ready" | "start" | "end" | null;
  answerResult: null | "correct" | "wrong";
  notification: string | null;
  isConnected: boolean;
  setSocketInstance: (socket: WebSocket) => void;
  disconnectSocket: () => void;
  resetSession: () => void;
}

const useSocketStore = create<SocketStore>()(
  persist(
    (set, get) => {
      // Create a logged set function to track all state changes
      const loggedSet = (updates: any) => {
        console.log("📝 SET called with:", updates);

        // Special tracking for fullName changes
        if (updates.fullName !== undefined) {
          console.log("⚠️ fullName is being changed to:", updates.fullName);
          console.log("⚠️ Previous fullName was:", get().fullName);
          console.trace(); // Show call stack to see where this came from
        }

        // Track gameStatus changes
        if (updates.gameStatus !== undefined) {
          console.log("🎮 gameStatus changing to:", updates.gameStatus);
        }

        set(updates);
        console.log("📝 After SET, current state:", {
          fullName: get().fullName,
          gameId: get().gameId,
          id: get().id,
          gameStatus: get().gameStatus,
          isConnected: get().isConnected,
        });
      };

      return {
        socketRef: { current: null },
        id: null,
        role: "player",
        fullName: null,
        gameId: null,
        themeId: null,
        playerJoined: [],
        question: null,
        tik_tik: null,
        gameStatus: null,
        answerResult: null,
        notification: null,
        isConnected: false,

        setSocketInstance: (socket) => {
          console.log("🔌 setSocketInstance called");
          get().socketRef.current = socket;
          loggedSet({ isConnected: true });

          socket.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            console.log("📨 WebSocket message received:", parsedData.type);

            switch (parsedData.type) {
              case "game-pin":
                console.log("🎯 game-pin data:", parsedData.data);
                loggedSet({
                  gameId: parsedData.data.gamePin,
                  id: parsedData.data.userId,
                  gameStatus: parsedData.data.gameStatus,
                  tik_tik: parsedData.data.tik_tik,
                  role: parsedData.data.role,
                  fullName: parsedData.data.fullName,
                });
                break;

              case "player-join":
                console.log("👤 player-join data:", parsedData.data);
                console.log(
                  "👤 fullName from server:",
                  parsedData.data.fullName
                );
                loggedSet({
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
                loggedSet({ playerJoined: parsedData.data.playerJoined });
                break;

              case "quiz-ready":
                loggedSet({ gameStatus: parsedData.data.gameStatus });
                useQuizStore.getState().resetQuiz();
                break;

              case "send-question":
                loggedSet({
                  gameStatus: parsedData.data.gameStatus,
                  question: parsedData.data.question,
                  playerJoined: parsedData.data.players,
                  answerResult: null,
                });
                break;

              case "answer-checked":
                loggedSet({
                  answerResult: parsedData.data.selectedOption
                    ? "correct"
                    : "wrong",
                });
                break;

              case "players-score":
                loggedSet({ playerJoined: parsedData.data.players });
                break;

              case "quiz-completed":
                loggedSet({
                  playerJoined: parsedData.data.players,
                  gameStatus: parsedData.data.gameStatus,
                });
                break;

              case "player_left":
              case "host_left":
                loggedSet({ notification: parsedData.message });
                break;

              case "PLAYER_RECONNECT":
                console.log("🔄 PLAYER_RECONNECT data:", parsedData.data);
                console.log(
                  "🔄 fullName from server on reconnect:",
                  parsedData.data.fullName
                );
                loggedSet({
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
                console.log("after reconnecting : ", get().fullName);
                get().socketRef.current?.send(
                  JSON.stringify({ type: "PLAYER_RECONNECT_SUCCESS" })
                );
                break;

              case "reconnect-msg":
                loggedSet({ notification: parsedData.message });
                break;
            }
          };

          socket.onerror = (error) => {
            console.error("❌ WebSocket error:", error);
          };

          socket.onclose = (event) => {
            console.log(
              "🔌 WebSocket closed, code:",
              event.code,
              "reason:",
              event.reason
            );
          };
        },

        disconnectSocket: () => {
          console.log("🔴 disconnectSocket called");
          console.log("🔴 Current fullName before disconnect:", get().fullName);

          const ws = get().socketRef.current;
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
          get().socketRef.current = null;

          loggedSet({ isConnected: false });

          console.log("🔴 fullName after disconnect:", get().fullName);
        },

        resetSession: () => {
          console.log(
            "🗑️ resetSession called - THIS WILL SET fullName TO NULL"
          );
          console.trace(); // Show where resetSession is being called from

          get().disconnectSocket();

          loggedSet({
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
          console.log("🗑️ After reset session, fullName:", get().fullName);
        },
      };
    },
    {
      name: "quiz-session",
      partialize: (state) => {
        const persisted = {
          id: state.id,
          gameId: state.gameId,
          fullName: state.fullName,
          gameStatus: state.gameStatus,
        };

        // Warning if trying to persist null fullName with valid gameId
        if (state.fullName === null && state.gameId !== null) {
          console.warn(
            "⚠️⚠️⚠️ WARNING: Trying to persist fullName as null while gameId exists!"
          );
          console.warn("⚠️ This is likely a bug! Current state:", {
            id: state.id,
            gameId: state.gameId,
            fullName: state.fullName,
            gameStatus: state.gameStatus,
          });
          console.trace(); // Show call stack
        }

        console.log("💾 Persisting to localStorage:", persisted);
        return persisted;
      },
      onRehydrateStorage: () => {
        console.log("🔄 Starting rehydration");
        const stored = localStorage.getItem("quiz-session");
        console.log("📦 localStorage content:", stored);

        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            console.log("📦 Parsed localStorage:", parsed);
          } catch (e) {
            console.error("❌ Error parsing localStorage:", e);
          }
        }

        return (state, error) => {
          if (error) {
            console.error("❌ Rehydration error:", error);
          } else {
            console.log("✅ Rehydration complete!");
            console.log("✅ Rehydrated fullName:", state?.fullName);
            console.log("✅ Rehydrated gameId:", state?.gameId);
            console.log("✅ Rehydrated id:", state?.id);
            console.log("✅ Rehydrated gameStatus:", state?.gameStatus);
            console.log("✅ Full rehydrated state:", state);
          }
        };
      },
    }
  )
);

export default useSocketStore;
