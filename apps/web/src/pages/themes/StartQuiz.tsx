import { Button } from "@repo/ui/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import useWebsocket from "../../hooks/useWebsocket";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { useQuizStore } from "../../stores/quizStore";
import { useEffect, useState } from "react";
import useSocketStore from "../../stores/socketStore";
import useSuccessStore from "../../stores/SuccessStore";
import { THEMES } from "./themesData";
import { Rocket } from "lucide-react";
//write popup for consent to  start quiz game
export default function StartQuiz() {
  const navigate = useNavigate();
  const setMessage = useSuccessStore((s) => s.setMessage);
  // store useSocketStore values in variables
  const isConnected = useSocketStore((s) => s.isConnected);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const tik_tik = useSocketStore((s) => s.tik_tik);
  const token = useAuthStore.getState().token;
  const themeId = useQuizStore((s) => s.themeId);
  const [wsUrl, setWsUrl] = useState<string>("");
  const { setShouldConnect } = useWebsocket(wsUrl);
  const [isLoading, setIsLoading] = useState(false);
  console.log("StartQuiz rendered"); // check that start quiz is rendered

  // function to set websocket url
  function sendWsRequest() {
    setIsLoading(true);
    setWsUrl(
      `${import.meta.env.VITE_WS_BASE_URL ?? `ws://localhost:3001`}?token=${token}&themeId=${themeId}`,
    );
  }

  // write effect to set shouldConnect to true when websocket url is set
  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true);
    }
  }, [wsUrl]);

  // effect to navigate to "/game" when isConnected, websocket url, gamestatus and tik_tik are all valid
  useEffect(() => {
    if (isConnected && wsUrl && gameStatus && tik_tik) {
      setIsLoading(false);
      // console.log(" Connected and have game data, navigating to /game");
      navigate("/game"); // then navigate to game page
      setMessage("You have successfully start the game");
    }
  }, [isConnected, wsUrl, gameStatus, tik_tik, navigate]);

  const theme = THEMES.find((theme) => theme.id === themeId);
  return (
    <>
      <AnimatePresence>
        <>
          {/* Modal container */}
          <motion.div
            className="fixed bottom-15 left-[55%] -translate-x-1/2 w-[90%] max-w-3xl z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="bg-[#fbf9f0b3] backdrop-blur-[12px] rounded-full p-3 px-8 flex items-center justify-between shadow-2xl border border-white/20">
              <div className="hidden md:block">
                <h1 className="text-sm font-semibold text-primary">
                  Selected Theme
                </h1>
                <p className="text-xs text-[#615f4f]">{theme?.name}</p>
              </div>
              <button
                onClick={() => {
                  sendWsRequest();
                }}
                className="bg-[#ff319f] text-white px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
              >
                Enter Arena
                <span>
                  <Rocket />
                </span>
              </button>
            </div>

            {/* previous design  */}
            {/* <div className="relative bg-primary-shadow rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(255,255,0,0.3)] max-w-sm w-full flex flex-col justify-center items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-pink mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  Do you want to play quiz now?
                </h2>
              </div>

              
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    sendWsRequest();
                  }}
                  loading={isLoading}
                >
                  Yes
                </Button>
              </div>
            </div> */}
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}
