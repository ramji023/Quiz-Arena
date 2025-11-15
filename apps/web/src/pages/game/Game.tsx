import ThemeWrapper from "../themes/ThemeWrapper";
import Lobby from "./Lobby";
import { THEMES } from "../themes/themesData";
import { useQuizStore } from "../../stores/quizStore";
export default function Game() {
  const themeId = useQuizStore((s) => s.themeId);
  const theme = THEMES.find((t) => t.id === themeId);
  if (!theme)
    return (
      <>
        <div>Something went wrong while starting quiz</div>
      </>
    );
  const usersJoined = [
    { id: "XH7G02", name: "Ram" },
    { id: "J93KS5", name: "Player 2" },
  ];
  return (
    <>
      <ThemeWrapper themeData={theme}>
        <Lobby users={usersJoined} />
      </ThemeWrapper>
    </>
  );
}
