import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CarttonIcon from "@repo/ui/components/icons/CarttonIcon";
import { Button } from "@repo/ui/components/ui/Button";
import { CircleCheck } from "lucide-react";
import useSocketStore from "../../stores/socketStore";
import { PlayerType } from "../../stores/socketStore";
import { useQuizStore } from "../../stores/quizStore";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
export default function Lobby({
  players = [],
  role,
}: {
  players: PlayerType[];
  role: string;
}) {
  const setError = useErrorStore((s) => s.setError);
  const gameId = useSocketStore((s) => s.gameId); // store the gameID from useSocketStore
  const quizData = useQuizStore.getState().quiz; // store the quiz data
  const socket = useSocketStore.getState().socketRef.current; // store the socket instance

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  // write effect to manage player positions randomly
  useEffect(() => {
    const moveRandomly = (userId: string) => {
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setPositions((prev) => ({
        ...prev,
        [userId]: { x: randomX, y: randomY },
      }));
    };

    // Initialize positions for all users
    players.forEach((user: PlayerType) => moveRandomly(user.id));

    // Move each user every 3-5 seconds (random interval for variety)
    const intervals = players.map((user) => {
      const interval = 3000 + Math.random() * 2000; // 3-5 seconds
      return setInterval(() => moveRandomly(user.id), interval);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [players]);

  // state to manage wheather host copied the room id or not
  const [isCopied, setIsCopied] = useState(false);
  // function to copy game pin
  const copyPin = () => {
    navigator.clipboard
      .writeText(gameId as string)
      .then(() => setIsCopied(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  // effect to show message div to host that copied the gameid has been succeed
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  // if user click to start button then send quiz data to websocket server
  function sendQuizDataToServer() {
    // check if quizData is available
    if (!quizData) {
      setError("notification", "Quiz Error", "You have not selected any quiz");
      return;
    }
    // if quizData is available
    // format the quiz data
    const quizz = {
      id: quizData.id,
      title: quizData.title,
      questions: quizData.questions,
    };
    // console.log("QUizz data : ", quizz);

    // check if there is at least one player joined or not
    if (useSocketStore.getState().playerJoined.length < 1) {
      setError(
        "notification",
        "Quiz Error",
        "Before starting game, There should be minimum one player"
      );
      return;
    }
    // if user is not connected with websocket server
    if (socket === null) {
      setError("page", "Server Error", "Server Connection Failed");
      return <ErrorPage />;
    }
    // send the quiz data to websocket server
    socket.send(
      JSON.stringify({
        type: "send-quiz",
        data: {
          gameId: useSocketStore.getState().gameId,
          userId: useSocketStore.getState().id,
          quiz: quizz,
        },
        message: "Quiz data send to server successfully",
      })
    );
  }

  if (!gameId) {
    setError("page", "Server Error", "Game Id is not provided");
    return <ErrorPage />;
  }
  // console.log("game id on Lobby component : ", gameId);
  return (
    <>
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-10 p-6 select-none">
        {/* Room Pin */}
        {/* show Room pin box only if user is host  */}
        {role === "host" ? (
          <div
            onClick={copyPin}
            className="border-dashed border-black rounded border-2 bg-white px-2 py-1 cursor-pointer text-black text-start"
          >
            <div>
              <span className="text-sm text-gray-700">Room Pin</span>
            </div>
            <div>
              <span className="text-black text-4xl font-semibold">
                {gameId}
              </span>
            </div>
          </div>
        ) : (
          // hide the game pin if user is not host
          <div className="opacity-0">
            <div>
              <span className="text-sm text-gray-700">Room Pin</span>
            </div>
            <div>
              <span className="text-black text-4xl font-semibold">
                {gameId}
              </span>
            </div>
          </div>
        )}
        {/* Waiting */}
        <div className="border rounded border-gray-700 mt-3 px-3 py-2 bg-white text-base text-black font-semibold">
          {role === "host" ? "Waiting for players..." : "Waiting to start..."}
        </div>

        {/* Floating players */}
        {players.map((user) => {
          const position = positions[user.id] || { x: 0, y: 0 };

          return (
            <motion.div
              key={user.id}
              animate={{
                x: position.x,
                y: position.y,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              className="fixed top-0 left-0 z-10 max-w-full"
            >
              <div className="text-md font-medium text-foreground bg-primary text-secondary rounded px-2 py-1 flex justify-center items-center gap-2">
                <div className="text-secondary">
                  <CarttonIcon />
                </div>
                <h1 className="font-bold"> {user.fullName}</h1>
              </div>
            </motion.div>
          );
        })}

        {/* submit button  */}
        {/* show start button to user if he is host  */}
        {role === "host" && (
          <div className="shadow-4xl mb-0 mt-10">
            <Button
              variant="primary"
              onClick={() => {
                audio.play(sounds["gameStart"]!, 1000);
                sendQuizDataToServer();
              }}
            >
              <span className="font-bold">Start</span>
            </Button>
          </div>
        )}
      </div>

      <div className="absolute bottom-5 right-0 mr-5 select-none">
        {isCopied && (
          <div className="bg-white px-2 py-1 flex justify-center items-center rounded">
            <CircleCheck fill="green" />
            <h1 className="text-gray-700 ">
              You have copied room pin successfully
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
