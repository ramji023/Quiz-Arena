import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/Button";
import useSocketStore from "../../stores/socketStore";
import { useAuthStore } from "../../stores/authStore";
import { useQuizStore } from "../../stores/quizStore";

export default function ReconnectBox({
  closeBox,
  setwsURl,
}: {
  closeBox: () => void;
  setwsURl: (str: string) => void;
}) {
  console.log("rendering reconnect box");
  const token = useAuthStore((s) => s.token);
  const fullName = useSocketStore((s) => s.fullName);
  const gameId = useSocketStore((s) => s.gameId);
  const userId = useSocketStore((s) => s.id);
  const role = useSocketStore((s) => s.role);
  const themeId = useQuizStore((s) => s.themeId);
  const url =
    role === "player"
      ? `ws://localhost:3001?roomId=${gameId}&fullName=${fullName}&userId=${userId}&isReconnect=${true}`
      : `ws://localhost:3001?token=${token}&themeId=${themeId}&roomId=${gameId}&fullName=${fullName}&userId=${userId}&isReconnect=${true}`;
  // const { setShouldConnect } = useWebsocket(url);

  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft <= 0) {
      closeBox();
      useSocketStore.getState().resetSession(); // clear player socket data
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleQuit = () => {
    console.log("Quit game clicked");
    useSocketStore.getState().resetSession(); // clear the player's socket
    closeBox(); // close the reconnect box
  };

  const handleReconnect = () => {
    console.log("Reconnect clicked");
    setwsURl(url);
    closeBox();
  };

  return (
    <div className=" fixed inset-0 z-50  flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-primary-shadow relative w-[300px] rounded-xl p-8">
        <div className="flex flex-col items-center gap-6">
          {/* Title */}
          <h2 className="text-secondary font-game text-xl font-semibold tracking-wide text-game-text">
            Connection Lost
          </h2>

          {/* Timer Circle */}
          <div className="relative flex h-32 w-32 items-center justify-center ">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-game-border text-gray-900" />
            {/* Progress ring */}
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="58"
                fill="none"
                stroke="#ff319f"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(timeLeft / 10) * 364.42} 364.42`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            {/* Timer number */}
            <span
              className={`font-game text-pink text-5xl font-bold text-game-timer transition-transform duration-200 ${
                timeLeft <= 3 ? "animate-timer-pulse text-game-danger" : ""
              }`}
            >
              {timeLeft}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-secondary text-center text-sm text-game-muted">
            Attempting to reconnect...
          </p>

          {/* Buttons */}
          <div className="flex w-full gap-4">
            <Button variant="other" onClick={handleQuit}>
              Quit Game
            </Button>
            <Button variant="primary" onClick={handleReconnect}>
              Reconnect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
