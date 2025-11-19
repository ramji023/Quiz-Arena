import { useEffect } from "react";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import Lobby from "../hostGame/Lobby";
import { THEMES } from "../themes/themesData";
import ThemeWrapper from "../themes/ThemeWrapper";
import Countdown from "../clock/CountDown";

export default function PlayerGame() {
  const themeId = useSocketStore((s) => s.themeId);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
  const role = useSocketStore((s) => s.role);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  useEffect(() => {
    // just clear the socket instance if playerGame component unmount
    return () => {
      useSocketStore.getState().clearSocket();
    };
  }, []);

  if (!theme)
    return (
      <>
        <div>Something went wrong while joining quiz</div>
      </>
    );

  return (
    <>
      <ThemeWrapper themeData={theme}>
        {gameStatus === "waiting" && <Lobby players={userJoined} role={role} />}
        {gameStatus === "ready" && (
          <Countdown/>
        )}
      </ThemeWrapper>
    </>
  );
}
