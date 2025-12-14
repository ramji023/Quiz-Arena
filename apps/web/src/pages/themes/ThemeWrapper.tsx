import { motion, AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { ThemeData } from "../../types/themeType";
import Fireflies from "@repo/ui/components/ui/themes/jungle/Fireflies";
import HeatWaves from "@repo/ui/components/ui/themes/desert/Heatwaves";
import Bioluminescence from "@repo/ui/components/ui/themes/ocean/WaveShimmer";
import MatrixRain from "@repo/ui/components/ui/themes/tech/TechEffect";
import CosmicStars from "@repo/ui/components/ui/themes/cosmic/Cosmic";
import LavaFlow from "@repo/ui/components/ui/themes/volcano/LavaFlow";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quizStore";
import useSocketStore from "../../stores/socketStore";
import Timer from "../clock/Timer";
import Notification from "./Notification";
interface Player {
  id: string;
  fullName: string;
  score: number;
  rank: number;
}
export default function ThemeWrapper({
  children,
  themeData,
  players,
  questionId,
  answered,
  notification,
  role,
  duration
}: {
  children: ReactNode;
  themeData: ThemeData;
  players: { id: string; fullName: string; score: number }[] | null;
  questionId: string | null;
  answered?: boolean;
  notification?: string | null;
  role?: "host" | "player";
  duration : number
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const [playerData, setPlayerData] = useState<Player[] | null>(null);
  const [yourScore, setYourScore] = useState<Player | null>(null);
  const [shouldOpen, setShouldOpen] = useState(location.state);
  const [isSelect, setIsSelect] = useState(false);
  useEffect(() => {
    if (shouldOpen) {
      const timer = setTimeout(() => {
        setIsSelect(true);
      }, 3000);
      return () => {
        return clearTimeout(timer);
      };
    }
  }, [shouldOpen]); // before linting []

  // when player data changes
  useEffect(() => {
    if (players) {
      const playerArray: Player[] = players
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({ ...player, rank: index + 1 }));
      const playersScore = playerArray.filter(
        (player) => player.id !== useSocketStore.getState().id
      );
      const yourScoreData = playerArray.find(
        (player) => player.id === useSocketStore.getState().id
      );
      setPlayerData(playersScore);
      if (yourScoreData) {
        setYourScore(yourScoreData);
      }
    }
  }, [players]);

  const topPlayers = playerData?.slice(0, 4) || [];
  const leaderboardDisplay = [...topPlayers, ...(yourScore ? [yourScore] : [])];

  // when player or host click to back button
  function handleBackButton() {
    console.log("Back button pressed : ", role);
    if (role === "player") {
      navigate("/join");
    }
    if (role === "host") {
      navigate("/home");
    }
  }
  return (
    <motion.div
      className="relative min-h-screen bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${themeData.backgroundImage})`,
        color: themeData.textColor["primary-300"],
        transformOrigin: "center center",
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, scale: 1.0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Ambient Effect */}
      {themeData.overlayEffect === "fireflies" && <Fireflies count={12} />}
      {themeData.overlayEffect === "heatwaves" && (
        <HeatWaves count={8} speed={2} intensity={0.5} />
      )}
      {themeData.overlayEffect === "waveShimmer" && <Bioluminescence />}
      {themeData.overlayEffect === "matrix-rain" && (
        <MatrixRain count={20} speed={1} intensity={0.6} />
      )}
      {themeData.overlayEffect === "cosmic-stars" && <CosmicStars />}
      {themeData.overlayEffect === "lava-flow" && (
        <LavaFlow count={100} speed={1} intensity={1} />
      )}

      {/* back button  */}
      <motion.button
        className={`absolute top-3 left-3 flex items-center gap-2 px-4 py-2 
                 rounded-full border-2   
                 font-semibold text-sm shadow-md 
                 hover:bg-[var(--hover-bg)] hover:border-[var(--hover-border)] hover:scale-105  
                 transition-all duration-300 backdrop-blur-sm cursor-pointer z-50`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        style={
          {
            color: themeData.textColor["button-text-200"],
            borderColor: themeData.borders["border-button-400/60"],
            backgroundColor: themeData.background["bg-button-900/40"],
            "--hover-bg": themeData.background["bg-button-800/60"],
            "--hover-border": themeData.borders["border-button-400"],
            pointerEvents: "auto",
          } as React.CSSProperties
        }
        onClick={handleBackButton}
      >
        <ArrowLeft size={20} />
        <span className="hidden md:inline-block">Back</span>
      </motion.button>

      {/* Leaderboard Floating Panel */}
      {gameStatus !== "end" && playerData && (
        <motion.div
          className={`absolute top-3 right-3 w-50 rounded p-2 shadow backdrop-blur-md z-20`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          style={{
            backgroundImage: `linear-gradient(to bottom, 
      ${themeData.background["from-leaderboard-900/70"]}, 
      ${themeData.background["to-leaderboard-800/70"]}
    )`,
            border: `1px solid ${themeData.borders["border-leaderboard-500/50"]}`,
          }}
        >
          <h2 className={`text-lg font-bold mb-3 text-center drop-shadow-md`}>
            🏆 Leaderboard
          </h2>
          <ul className="space-y-1">
            {leaderboardDisplay.map((player, index) => {
              const isTopPlayer = index === 0;
              const isYou = yourScore && player.id === yourScore.id;

              return (
                <li
                  key={player.id}
                  className="flex justify-between items-center px-3 py-1 rounded border font-semibold transition-all duration-300"
                  style={{
                    borderColor: isYou
                      ? themeData.borders["border-you-300"]
                      : isTopPlayer
                        ? themeData.borders["border-li-300"]
                        : themeData.borders["border-li-400/30"],

                    backgroundColor: isYou
                      ? themeData.background["bg-you-400/50"]
                      : isTopPlayer
                        ? themeData.background["bg-li-400/40"]
                        : themeData.background["bg-li-100/10"],

                    color: themeData.textColor["li-text-100"],
                  }}
                >
                  <span
                    style={{
                      color: themeData.textColor["primary-300"],
                      fontSize: "0.875rem",
                    }}
                  >
                    {player.rank}
                  </span>

                  <span className="truncate text-base">
                    {isYou ? "⭐You" : player.fullName}
                  </span>

                  <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                    {player.score}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
      {/* Main Layout */}
      <motion.div
        className={`relative z-10 flex flex-col items-center justify-center gap-8 min-h-screen p-6`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: themeData.background["bg-black/20"] }}
      >
        {/* Theme Title */}
        <motion.h1
          className={`text-5xl font-extrabold mt-5 drop-shadow-md`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          style={{ color: themeData.textColor["primary-300"] }}
        >
          {themeData.name}
        </motion.h1>

        {/* Question Content */}
        <motion.div
          className={`mt-8 w-full text-white`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {children}
        </motion.div>
      </motion.div>

      {/* pop up model  */}
      {isSelect && <PopUp id={themeData.id} />}

      {players && questionId && answered !== undefined && (
        <div className=" fixed bottom-6 right-6 z-50">
          <Timer id={questionId} answered={answered} duration={duration}/>
        </div>
      )}

      {/* notification div  */}
      {notification && <Notification msg={notification} />}
    </motion.div>
  );
}

// pop up model to select popup model
function PopUp({ id }: { id: string }) {
  const navigate = useNavigate();
  const setThemeId = useQuizStore((s) => s.setThemeId);
  return (
    <AnimatePresence>
      <>
        {/* Background overlay */}
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal container */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative bg-primary-shadow rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(255,255,0,0.3)] max-w-sm w-full">
            {/* Game-style title text */}
            <h2 className="text-2xl font-extrabold text-pink mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Do you want to select?
            </h2>

            {/* Options */}
            <div className="flex justify-center gap-10 mt-6">
              {/* YES button */}
              <motion.button
                onClick={() => {
                  setThemeId(id);
                  navigate("/home/themes", { state: true });
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center w-24 h-24 bg-green-600 hover:bg-green-500 rounded-full shadow-[0_0_25px_rgba(0,255,0,0.5)] text-white text-xl font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-14 h-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 16.2l-3.5-3.6L4 14.1l5 5L20 8.1 18.6 6.7z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              {/* NO button */}
              <motion.button
                onClick={() => navigate(-1)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center justify-center w-24 h-24 bg-red-600 hover:bg-red-500 rounded-full shadow-[0_0_25px_rgba(255,0,0,0.5)] text-white text-xl font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-14 h-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                >
                  <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
