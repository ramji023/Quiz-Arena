import QuizCard from "@repo/ui/components/ui/QuizCard";
import { motion } from "motion/react";
import { useAuthStore } from "../../stores/authStore";
import { useGetAllQuiz } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSocketStore from "../../stores/socketStore";
import useWebsocket from "../../hooks/useWebsocket";
import ReconnectBox from "../playerGame/ReconnectBox";
import useShowLoader from "../../hooks/useShowLoader";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
export default function Quizzes() {
  const navigate = useNavigate();
  // function to set error from useErrorStore
  const setError = useErrorStore((s) => s.setError);
  // call react query to get all the quizzes
  const rawQuery = useGetAllQuiz();
  const { data, isLoading, error } = useShowLoader(rawQuery, 500);

  /*
   *
   *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   *
   */
  // <----------------------    game logic   ------------------------------------------------>
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
  // <----------------------    game logic   ------------------------------------------------>
  /*
   *
   *
   * *
   * *
   * *
   * *
   * *
   * *
   * *
   *
   */

  // handle navigation when user click to button see details
  function navigation(id: string) {
    navigate(`/home/quiz/${id}`);
  }
  // if quizzes are processing then show quiz card skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
        {[...Array(8)].map((_, i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  // if there is anything wrong then show error to user
  if (error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Quizzes"
    );
    return <ErrorPage />;
  }

  if (data) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-primary ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
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
        </motion.div>
      </>
    );
  }
}
