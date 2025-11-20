import ThemeWrapper from "../themes/ThemeWrapper";
import Lobby from "./Lobby";
import { THEMES } from "../themes/themesData";
import Countdown from "../clock/CountDown";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import { useEffect } from "react";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
export default function Game() {
  const themeId = useQuizStore((s) => s.themeId);
  const role = useSocketStore((s) => s.role);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const question = useSocketStore((s) => s.question);
  useEffect(() => {
    // just clear the socket instance if game component unmount
    return () => {
      useSocketStore.getState().clearSocket();
    };
  }, []);
  console.log("theme data after clicking to start button", theme);
  if (!theme)
    return (
      <>
        <div>
          Something went wrong while starting quiz {JSON.stringify(theme)}
        </div>
      </>
    );

  // when player click to any options
  const onAnswer = (option: string) => {
    console.log("Selected:", option);
  };
  return (
    <>
      <ThemeWrapper
        themeData={theme}
        players={gameStatus === "start" ? userJoined : null}
        questionId={question?.questionId ?? null}
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
      </ThemeWrapper>
    </>
  );
}
