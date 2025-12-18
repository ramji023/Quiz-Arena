import ThemeWrapper from "../themes/ThemeWrapper";
import Lobby from "./Lobby";
import { THEMES } from "../themes/themesData";
import Countdown from "../clock/CountDown";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import { useEffect } from "react";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import LeaderBoard from "../playerGame/LeaderBoard";
import { sounds } from "../../utils/sounds";
import audio from "../../utils/audioManager";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import Leaderboard from "../playerGame/LeaderBoard";

// the main game component for hosting the game
export default function Game() {
  const navigate = useNavigate();
  // store functions to set the error message or success message
  const setError = useErrorStore((s) => s.setError);
  // store states from the useSocketStore and useQuizStore
  const isConnected = useSocketStore((s) => s.isConnected);
  const duration = useSocketStore((s) => s.tik_tik);
  const themeId = useQuizStore((s) => s.themeId);
  const role = useSocketStore((s) => s.role);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const question = useSocketStore((s) => s.question);
  const notification = useSocketStore((s) => s.notification);

  // effect to handle component mount and unmount stated
  useEffect(() => {
    /***
     * if player is refreshed the page
     * then useSocketStore becomes null and isConnected become false
     * but gameStatus is still persist in the local storage
     * so navigate to /join page to ask user to reconnect to the game again
     */
    if (
      !isConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "ready" ||
        gameStatus === "start")
    ) {
      // console.log(" PlayerGame: Not connected but has game status, navigating to /join");
      navigate("/home");
      return;
    }

    // console.log(" PlayerGame: Preloading sounds");
    // preload all the sound effect
    Object.values(sounds).forEach((url) => audio.preload(url));

    // and when component unmount then disconnect from the websocket server
    return () => {
      // console.log(" PlayerGame: Main effect CLEANUP - disconnecting socket");
      useSocketStore.getState().disconnectSocket();
    };
  }, [navigate]);

  // if theme or themeID or duration is not present then show error page
  if (!theme || !themeId || !duration) {
    setError(
      "page",
      "Client Error",
      "Something went wrong. Please select quiz and theme"
    );
    return <ErrorPage />;
  }

  // when host click to any options
  const onAnswer = (
    option: { text: string; isCorrect: boolean },
    id: string
  ) => {
    console.log("Selected:", option);
    console.log(id);
  };

  return (
    <>
      <ThemeWrapper
        themeData={theme}
        players={gameStatus === "start" ? userJoined : null}
        questionId={question?.questionId ?? null}
        notification={notification}
        role={role}
        duration={duration}
      >
        {/* if game status is "waiting" then render Lobby component and pass joined players and role  */}
        {gameStatus === "waiting" && <Lobby players={userJoined} role={role} />}
        {/* if game Statuc become "ready" then show a 5 seconds of Countdown to user (host and player both ) */}
        {gameStatus === "ready" && <Countdown />}
        {/* if game status become "start" then render questionCard to user (host/player)  */}
        {gameStatus === "start" && question && (
          <QuestionCard
            role={role}
            questionData={question}
            onAnswer={onAnswer}
            optionColors={theme.optionColor}
          />
        )}
        {/* if game status is end then show the leaderboard */}
        {gameStatus === "end" && <Leaderboard themeId={themeId} />}
      </ThemeWrapper>
    </>
  );
}
