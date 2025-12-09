import { useEffect, useState } from "react";
// import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import Lobby from "../hostGame/Lobby";
import { THEMES } from "../themes/themesData";
import ThemeWrapper from "../themes/ThemeWrapper";
import Countdown from "../clock/CountDown";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import LeaderBoard from "./LeaderBoard";

export default function PlayerGame() {
  const socketRef = useSocketStore((s) => s.socketRef);
  const themeId = useSocketStore((s) => s.themeId);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const role = useSocketStore((s) => s.role);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const question = useSocketStore((s) => s.question);
  const answerResult = useSocketStore((s) => s.answerResult);
  const [answered, setAnswered] = useState(false); // set answered true when player select option so stop the timer
  useEffect(() => {
    // just clear the socket instance if playerGame component unmount
    return () => {
      useSocketStore.getState().clearSocket();
    };
  }, []);

  // when new question come from server just stop the timer state
  useEffect(() => {
    if (question) {
      setAnswered(false);
    }
  }, [question]);

  if (!theme || !themeId)
    return (
      <>
        <div>Something went wrong while joining quiz</div>
      </>
    );

  // when player click to any options
  const onAnswer = (
    option: { text: string; isCorrect: boolean },
    id: string
  ) => {
    console.log("Selected:", option);
    setAnswered(true);
    if (socketRef.current) {
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
    }
  };

  return (
    <>
      <ThemeWrapper
        themeData={theme}
        players={gameStatus === "start" ? userJoined : null}
        questionId={question?.questionId ?? null}
        answered={answered}
      >
        {gameStatus === "waiting" && <Lobby players={userJoined} role={role} />}
        {gameStatus === "ready" && <Countdown />}
        {gameStatus === "start" && question && (
          <QuestionCard
            role={role}
            questionData={question}
            onAnswer={onAnswer}
            optionColors={theme.optionColor}
            answerResult={answerResult}
          />
        )}
        {gameStatus === "end" && <LeaderBoard themeId={themeId}/>}
      </ThemeWrapper>
    </>
  );
}
