import { useEffect, useState } from "react";
// import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import Lobby from "../hostGame/Lobby";
import { THEMES } from "../themes/themesData";
import ThemeWrapper from "../themes/ThemeWrapper";
import Countdown from "../clock/CountDown";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import LeaderBoard from "./LeaderBoard";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";
import { useNavigate } from "react-router-dom";
export default function PlayerGame() {
  const navigate = useNavigate();
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
  const [answered, setAnswered] = useState(false); // set answered true when player select option so stop the timer
  console.log("rendering player game component");
  useEffect(() => {
    // Check if there's an active game on mount (after refresh)
    if (
      !isConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "ready" ||
        gameStatus === "start")
    ) {
      console.log("isConnected status : ", isConnected);
      navigate("/join");
      return;
    }

    // preload all the sound effect
    Object.values(sounds).forEach((url) => audio.preload(url));
    // just clear the socket instance if playerGame component unmount
    return () => {
      console.log("Player game component unmount")
      useSocketStore.getState().disconnectSocket();
    };
  }, [isConnected, gameStatus, navigate]);

  // when new question come from server just stop the timer state
  useEffect(() => {
    if (question) {
      setAnswered(false);
    }
  }, [question]);

  useEffect(() => {
    if (notification) {
      if (notification === "Game host left the game") {
        setTimeout(() => {
          navigate("/join");
        }, 3000);
      }
    }
  }, [notification]);

  if (!theme || !themeId || !duration)
    return (
      <>
        <div>Something went wrong while joining quiz</div>
      </>
    );

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
    console.log("option select play");
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
            answerResult={answerResult}
            sounds={{ success: playSuccessSound, failure: playFailureSound }}
          />
        )}
        {gameStatus === "end" && <LeaderBoard themeId={themeId} />}
      </ThemeWrapper>
    </>
  );
}
