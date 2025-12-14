import QuizCard from "@repo/ui/components/ui/QuizCard";
export const quizzes = [
  {
    title: "Ultimate JavaScript Challenge",
    questions: 15,
    timePerQuestion: "15s",
    difficulty: "Medium",
    category: "Technology",
    playersAttempted: 1245,
    rating: 4.8,
    image: "https://picsum.photos/id/1015/400/250", // static image
  },
  {
    title: "World History Trivia",
    questions: 20,
    timePerQuestion: "20s",
    difficulty: "Hard",
    category: "History",
    playersAttempted: 980,
    rating: 4.6,
    image: "https://picsum.photos/id/1025/400/250",
  },
  {
    title: "General Knowledge Blitz",
    questions: 10,
    timePerQuestion: "10s",
    difficulty: "Easy",
    category: "General Knowledge",
    playersAttempted: 2150,
    rating: 4.7,
    image: "https://picsum.photos/id/1005/400/250",
  },
  {
    title: "Football Legends Quiz",
    questions: 12,
    timePerQuestion: "12s",
    difficulty: "Medium",
    category: "Sports",
    playersAttempted: 1750,
    rating: 4.5,
    image: "https://picsum.photos/id/1041/400/250",
  },
  {
    title: "Bollywood Blockbuster Challenge",
    questions: 18,
    timePerQuestion: "15s",
    difficulty: "Medium",
    category: "Entertainment",
    playersAttempted: 1340,
    rating: 4.4,
    image: "https://picsum.photos/id/1011/400/250",
  },
  {
    title: "Space & Astronomy Facts",
    questions: 14,
    timePerQuestion: "20s",
    difficulty: "Hard",
    category: "Science",
    playersAttempted: 890,
    rating: 4.9,
    image: "https://picsum.photos/id/1022/400/250",
  },
];

import { useAuthStore } from "../../stores/authStore";
import { useGetAllQuiz } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSocketStore from "../../stores/socketStore";
import useWebsocket from "../../hooks/useWebsocket";
import ReconnectBox from "../playerGame/ReconnectBox";
export default function Quizzes() {
  const navigate = useNavigate();
  const username = useAuthStore((s) => s.userName);
  const { data, isLoading, error } = useGetAllQuiz();
  // write logic to open and close reconnect box when it rendered first time
  const isConnected = useSocketStore((s) => s.isConnected);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const [openReconnectBox, setOpenReconnectBox] = useState(false);
  const [hasCheckedReconnect, setHasCheckedReconnect] = useState(false);
  const tik_tik = useSocketStore((s) => s.tik_tik);
  const [wsUrl, setWsUrl] = useState<string>("");
  const { setShouldConnect } = useWebsocket(wsUrl);

  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true);
    }
  }, [wsUrl]);

  useEffect(() => {
    if (isConnected && wsUrl && gameStatus && tik_tik) {
      // console.log(" Connected and have game data, navigating to /game");
      navigate("/game");
    }
  }, [isConnected, wsUrl, gameStatus, tik_tik, navigate]);

  useEffect(() => {
    if (hasCheckedReconnect) return;

    const { id, gameId, fullName, isConnected } = useSocketStore.getState();

    if (
      !isConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "ready" ||
        gameStatus === "start") &&
      id &&
      gameId &&
      fullName
    ) {
      // open reconnect box
      setOpenReconnectBox(true);
    }

    if (gameStatus === "end") {
      // reset the session
      useSocketStore.getState().resetSession();
    }
    setHasCheckedReconnect(true);
  }, []);

  function navigation(id: string) {
    navigate(`quiz/${id}`);
  }
  if (isLoading) {
    return (
      <>
        <div>Quizzes are processing</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>Something went wrong while fetching quizzes</div>
      </>
    );
  }
  if (data) {
    return (
      <>
        <div className="text-primary ">
          <div className="flex justify-between px-6">
            <h1 className="text-2xl font-semibold ">Welcome, {username} 👋</h1>
          </div>

          {/* if there is quiz available  */}
          <div className="flex items-center flex-wrap p-6 gap-y-5 gap-x-10">
            {data.map((quiz, index) => (
              <QuizCard key={index} quiz={quiz} navigation={navigation} />
            ))}
          </div>
          {openReconnectBox && (
            <ReconnectBox
              closeBox={() => setOpenReconnectBox(false)}
              setwsURl={(url: string) => setWsUrl(url)}
            />
          )}
        </div>
      </>
    );
  }
}
