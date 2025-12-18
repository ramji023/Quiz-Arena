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
import useSuccessStore from "../../stores/SuccessStore";
export default function Quizzes() {
  const navigate = useNavigate();
  // function to set error from useErrorStore
  const setError = useErrorStore((s) => s.setError);
  // function to set the success message from useSuccessStore
  const setMessage = useSuccessStore((s)=>s.setMessage)
  // call react query to get all the quizzes
  const rawQuery = useGetAllQuiz();
  const { data, isLoading, error } = useShowLoader(rawQuery, 500);

  // <--- game logic if host refresh the game page or click to back button by mistake --------->
  // get the states from useSocketStore
  const isConnected = useSocketStore((s) => s.isConnected);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const [openReconnectBox, setOpenReconnectBox] = useState(false); // state to manage wheather reconnect box should open or not
  const [hasCheckedReconnect, setHasCheckedReconnect] = useState(false); // state to track the state of opening and closing of reconnect box                  
  const tik_tik = useSocketStore((s) => s.tik_tik);
  const [wsUrl, setWsUrl] = useState<string>("");  // state to manage the websocket url to connect to
  const { setShouldConnect } = useWebsocket(wsUrl); // custom hook for managing WebSocket connection status
  // effect to make setShouldConnect to true when websocket url is set
  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true); // initiate websocket connection
    }
  }, [wsUrl, setShouldConnect]);

  // effect to navigate to /game when isConnected,websocket url,tik_tik and gameStatus are all valid
  useEffect(() => {
    if (isConnected && wsUrl && gameStatus && tik_tik) {
      // console.log(" Connected and have game data, navigating to /game");
      navigate("/game");
      setMessage("You have successfully start the game");
    }
  }, [isConnected, wsUrl, gameStatus, tik_tik, navigate]);

  // effect run on mount, decide if the player should see a reconnect box
  useEffect(() => {
    if (hasCheckedReconnect) {
      return; // if already checked then do nothing
    }

    // get the latest states  from useSocketStore
    const storeState = useSocketStore.getState();
    const { id, gameId, fullName, isConnected: storeIsConnected } = storeState;

    /*
     * if isConnected is false and gameStatus is valid
     * AND user is on PlayerJoin page
     * it means that the game has not ended and user might be clicked to back button by mistake on themeWrapper component
     * so open the reconnect box to ask user to reconnect to the game
     */
    if (
      !storeIsConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "start" ||
        gameStatus === "ready") &&
      id &&
      gameId &&
      fullName
    ) {
      setOpenReconnectBox(true); // open reconnect box
    }

    /*
     * if gameStatus is end
     * AND user is on PlayerJoin page
     * it means that the game has ended and user click to back button on themeWrapper component
     * so reset all the states of useSocketStore
     */
    if (gameStatus === "end") {
      useSocketStore.getState().resetSession();
    }

    setHasCheckedReconnect(true); // mark the reconnect check to true
  }, []);

  // <----------------------    game logic   ------------------------------------------------>
  

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
