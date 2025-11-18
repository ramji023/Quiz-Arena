import ThemeWrapper from "../themes/ThemeWrapper";
import Lobby from "./Lobby";
import { THEMES } from "../themes/themesData";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import { useEffect } from "react";
export default function Game() {
  const themeId = useQuizStore((s) => s.themeId);
  const role = useSocketStore((s) => s.role);
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.usersJoined);
  if (!theme)
    return (
      <>
        <div>Something went wrong while starting quiz</div>
      </>
    );

  useEffect(() => {
    // just clear the socket instance if game component unmount
    return () => {
      useSocketStore.getState().clearSocket();
    };
  }, []);

  return (
    <>
      <ThemeWrapper themeData={theme}>
        <Lobby players={userJoined} role={role} />
      </ThemeWrapper>
    </>
  );
}
