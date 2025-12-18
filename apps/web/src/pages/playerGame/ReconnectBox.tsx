import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/Button";
import useSocketStore from "../../stores/socketStore";
import { useAuthStore } from "../../stores/authStore";
import { useQuizStore } from "../../stores/quizStore";
// component to show the reconnect box to user when connection lost
export default function ReconnectBox({
  closeBox,
  setwsURl,
}: {
  closeBox: () => void; // function to close the reconnect box
  setwsURl: (str: string) => void; // function to set the websocket url
}) {
  const token = useAuthStore((s) => s.token);
  const fullName = useSocketStore((s) => s.fullName); // get the full name of the user from useSocketStore
  const gameId = useSocketStore((s) => s.gameId); // get the game id from useSocketStore
  const userId = useSocketStore((s) => s.id); // get the user id from useSocketStore
  const role = useSocketStore((s) => s.role); // get the role of the user from useSocketStore
  const themeId = useQuizStore((s) => s.themeId); // get the theme id from useQuizStore
  // format the websocket url
  const url =
    role === "player"
      ? `ws://localhost:3001?roomId=${gameId}&fullName=${fullName}&userId=${userId}&isReconnect=${true}`
      : `ws://localhost:3001?token=${token}&themeId=${themeId}&roomId=${gameId}&fullName=${fullName}&userId=${userId}&isReconnect=${true}`;
  const [timeLeft, setTimeLeft] = useState(10); // state to manage the time left for reconnect

  // effect to manage the time left for reconnect
  useEffect(() => {
    if (timeLeft <= 0) {
      // if time left is 0 then close the reconnect box and reset the session
      closeBox();
      useSocketStore.getState().resetSession(); // clear player/host socket data
    }
    // set interval to decrement the time left
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // clear the interval when the component unmounts
  }, [timeLeft]);

  // function to handle the quit game button click
  const handleQuit = () => {
    useSocketStore.getState().resetSession(); // clear the player/host socket data
    closeBox(); // close the reconnect box
  };

  // function to handle the reconnect button click
  const handleReconnect = () => {
    setwsURl(url); // set the websocket url to connect to
    closeBox(); // close the reconnect box
  };

  return (
    <div className=" fixed inset-0 z-50  flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-secondary relative w-[300px] rounded-xl p-8">
        <div className="flex flex-col items-center gap-6">
          {/* Title */}
          <h2 className="text-primary font-game text-xl font-semibold tracking-wide text-game-text">
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
          <p className="text-primary text-center text-sm text-game-muted">
            Attempting to reconnect...
          </p>

          {/* Buttons */}
          <div className="flex w-full gap-4">
            <Button variant="outline" onClick={handleQuit}>
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
