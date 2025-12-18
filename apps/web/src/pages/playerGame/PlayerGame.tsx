import { useEffect, useState } from "react";
import useSocketStore from "../../stores/socketStore";
import Lobby from "../hostGame/Lobby";
import { THEMES } from "../themes/themesData";
import ThemeWrapper from "../themes/ThemeWrapper";
import Countdown from "../clock/CountDown";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import Leaderboard from "./LeaderBoard";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";

export default function PlayerGame() {
  // console.log(" PlayerGame: RENDER");

  const navigate = useNavigate();
  // get the states from useSocketStore
  const isConnected = useSocketStore((s) => s.isConnected);
  const socketRef = useSocketStore((s) => s.socketRef);
  const themeId = useSocketStore((s) => s.themeId);
  const theme = THEMES.find((t) => t.id === themeId);
  const duration = useSocketStore((s) => s.tik_tik);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const role = useSocketStore((s) => s.role);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const question = useSocketStore((s) => s.question);
  const answerResult = useSocketStore((s) => s.answerResult);
  const notification = useSocketStore((s) => s.notification);
  const [answered, setAnswered] = useState(false); // state to manage wheather player select option or not
  const setError = useErrorStore((s) => s.setError); // get the function to set the error
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
      navigate("/join");
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

  // effect to reset the answered state when new question come from server
  useEffect(() => {
    if (question) {
      setAnswered(false); // reset the answered state to false
    }
  }, [question]);

  // effect Handle gameStatus changes (when host failed to reconnect)
  useEffect(() => {
    if (gameStatus === null) {
      navigate("/join");
      setError("notification", "Host Left", "Host left the game");
    }
  }, [gameStatus, navigate]);

  // if theme or themeID or duration is not present then show error page
  if (!theme || !themeId || !duration) {
    setError(
      "page",
      "Client Error",
      "Something went wrong. Please select quiz and theme"
    );
    return <ErrorPage />;
  }

  // play success sound
  function playSuccessSound() {
    audio.play(sounds["successTone"]!, 1000);
  }

  // play failure sound
  function playFailureSound() {
    audio.play(sounds["failureTone"]!, 1000);
  }

  // when player click to any options
  const onAnswer = (
    option: { text: string; isCorrect: boolean },
    id: string
  ) => {
    console.log("Selected:", option);
    audio.play(sounds["selectOption"]!, 100);
    setAnswered(true);
    // if user is not connected with websocket server
    if (socketRef.current === null) {
      setError("page", "Server Error", "Server Connection Failed");
      return <ErrorPage />;
    }
    // send the question response to websocket server
    socketRef.current.send(
      JSON.stringify({
        type: "send-response",
        data: {
          userId: useSocketStore.getState().id,
          gameId: useSocketStore.getState().gameId,
          questionId: id,
          selectOption: option.text,
        },
        message: "send question response to websocket server",
      })
    );
  };

  return (
    <>
      <ThemeWrapper
        themeData={theme}
        players={gameStatus === "start" ? userJoined : null}
        questionId={question?.questionId ?? null}
        answered={answered}
        notification={notification}
        role={role}
        duration={duration}
      >
        {/* if game status is waiting then show the lobby */}
        {gameStatus === "waiting" && <Lobby players={userJoined} role={role} />}
        {/* if game status is ready then show the countdown */}
        {gameStatus === "ready" && <Countdown />}
        {/* if game status is start then show the question card */}
        {gameStatus === "start" && question && (
          <QuestionCard
            role={role}
            questionData={question}
            onAnswer={onAnswer}
            optionColors={theme.optionColor}
            answerResult={answerResult}
            sounds={{ success: playSuccessSound, failure: playFailureSound }}
          />
        )}
        {/* if game status is end then show the leaderboard */}
        {gameStatus === "end" && <Leaderboard themeId={themeId} />}
      </ThemeWrapper>
    </>
  );
}
