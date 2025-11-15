import ThemeWrapper from "../themes/ThemeWrapper";
import Lobby from "./Lobby";
import { THEMES } from "../themes/themesData";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import { useEffect } from "react";
export default function Game() {
  const socketRef = useSocketStore((s) => s.socketRef); //store user web socket instance
  const quizData = useQuizStore((s) => s.quiz); // store quiz data
  const themeId = useQuizStore((s) => s.themeId);
  const theme = THEMES.find((t) => t.id === themeId);
  if (!theme)
    return (
      <>
        <div>Something went wrong while starting quiz</div>
      </>
    );

  useEffect(()=>{
    const socket = socketRef.current;
    if(socket){
      // do operation if server broadcast message
    }
  },[socketRef.current])



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
