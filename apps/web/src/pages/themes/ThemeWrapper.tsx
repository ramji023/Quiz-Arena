import { motion } from "motion/react";
import { ReactNode } from "react";
import { ThemeData } from "../../types/themeType";
import Fireflies from "@repo/ui/components/ui/themes/jungle/Fireflies";
import HeatWaves from "@repo/ui/components/ui/themes/desert/Heatwaves";
import Bioluminescence from "@repo/ui/components/ui/themes/ocean/WaveShimmer";
import { ArrowLeft } from "lucide-react";

export default function ThemeWrapper({
  children,
  themeData,
  players,
}: {
  children: ReactNode;
  themeData: any;
  players: { name: string; score: number; rank: number }[];
}) {
  return (
    <motion.div
      className="relative min-h-screen bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${themeData.backgroundImage})`,
        color: themeData.textColor["primary-300"],
      }}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Ambient Effect */}
      {themeData.overlayEffect === "fireflies" && <Fireflies count={12} />}
      {themeData.overlayEffect === "heatwaves" && (
        <HeatWaves count={8} speed={2} intensity={0.5} />
      )}
      {themeData.overlayEffect === "waveShimmer" && <Bioluminescence />}

      {/* back button  */}
      <motion.button
        className={`absolute top-3 left-3 flex items-center gap-2 px-4 py-2 
                 rounded-full border-2   
                 font-semibold text-sm shadow-md 
                 hover:bg-[var(--hover-bg)] hover:border-[var(--hover-border)] hover:scale-105  
                 transition-all duration-300 backdrop-blur-sm`}
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
          } as React.CSSProperties
        }
      >
        <ArrowLeft size={20} />
        <span className="hidden md:inline-block">Back</span>
      </motion.button>

      {/* Leaderboard Floating Panel */}
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
          {players.slice(0, 5).map((player, index) => {
            const isTopPlayer = index === 0;

            return (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-1 rounded border font-semibold transition-all duration-300"
                style={{
                  borderColor: isTopPlayer
                    ? themeData.borders["border-li-300"]
                    : themeData.borders["border-li-400/30"],

                  backgroundColor: isTopPlayer
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
                <span className="truncate text-base">{player.name}</span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    opacity: 0.8,
                  }}
                >
                  {player.score}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        className={`relative z-10 flex flex-col items-center justify-center gap-8 min-h-screen p-6`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: themeData.background["bg-black/20"]}}
      >
        {/* Theme Title */}
        <motion.h1
          className={`text-5xl font-extrabold mt-5 drop-shadow-md`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          style={{color:themeData.textColor["primary-300"] }}
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
    </motion.div>
  );
}
