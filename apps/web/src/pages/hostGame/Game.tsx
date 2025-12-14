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
export default function Game() {
  const navigate = useNavigate();
  const isConnected = useSocketStore((s) => s.isConnected);
  const duration = useSocketStore((s) => s.tik_tik);
  const themeId = useQuizStore((s) => s.themeId);
  const role = useSocketStore((s) => s.role);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const question = useSocketStore((s) => s.question);
  const notification = useSocketStore((s) => s.notification);
  useEffect(() => {
    // Check if there's an active game on mount (after refresh)
    if (
      !isConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "ready" ||
        gameStatus === "start")
    ) {
      console.log("isConnected status : ", isConnected);
      navigate("/home");
      return;
    }
    // preload all the sound effect
    Object.values(sounds).forEach((url) => audio.preload(url));
    // just clear the socket instance if game component unmount
    return () => {
      console.log("Host game component unmount");
      useSocketStore.getState().disconnectSocket();
    };
  }, [navigate]);

  console.log("theme data after clicking to start button", theme);
  if (!theme || !themeId || !duration) {
    console.error("if there is any error" ,theme, themeId, duration);
    return (
      <>
        <div>
          Something went wrong while starting quiz {JSON.stringify(theme)}
        </div>
      </>
    );
  }

  // when player click to any options
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
        {gameStatus === "waiting" && <Lobby players={userJoined} role={role} />}
        {gameStatus === "ready" && <Countdown />}
        {gameStatus === "start" && question && (
          <QuestionCard
            role={role}
            questionData={question}
            onAnswer={onAnswer}
            optionColors={theme.optionColor}
          />
        )}
        {gameStatus === "end" && <LeaderBoard themeId={themeId} />}
      </ThemeWrapper>
    </>
  );
}
