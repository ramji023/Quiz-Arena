import { motion } from "motion/react";
import { ReactNode } from "react";
import { ThemeData } from "../../types/themeType";
import Fireflies from "@repo/ui/components/ui/themes/jungle/Fireflies";
import { ArrowLeft } from "lucide-react";

export default function Themes({
  children,
  themeData,
  players,
}: {
  children: ReactNode;
  themeData: ThemeData;
  players: { name: string; score: number; rank: number }[];
}) {
  return (
    <motion.div
      className="relative min-h-screen bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${themeData.backgroundImage})`,
        color: themeData.colors.primaryText,
      }}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Ambient Effect */}
      <Fireflies count={14} />

      {/* back button  */}
      <motion.button
        className={`absolute top-3 left-3 flex items-center gap-2 px-4 py-2 
                 rounded-full border-2 border-${themeData.colors.primaryBackground}-400/60 
                 bg-${themeData.colors.primaryBackground}-900/40 text-${themeData.colors.primaryText}-200 
                 font-semibold text-sm shadow-md 
                 hover:bg-${themeData.colors.primaryBackground}-800/60 hover:scale-105 hover:border-${themeData.colors.primaryBackground}-400 
                 transition-all duration-300 backdrop-blur-sm`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      >
        <ArrowLeft
          size={20}
          className={`text-${themeData.colors.primaryText}-300`}
        />
        <span className="hidden md:inline-block">Back</span>
      </motion.button>

      {/* Leaderboard Floating Panel */}
      <motion.div
        className={`absolute top-3 right-3 w-50 bg-gradient-to-b from-${themeData.colors.primaryBackground}-900/70 to-${themeData.colors.secondaryBackground}-800/70 border border-${themeData.colors.primaryBackground}-500/50 rounded p-2 shadow backdrop-blur-md z-20`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <h2
          className={`text-lg font-bold text-${themeData.colors.primaryText}-300 mb-3 text-center drop-shadow-md`}
        >
          🏆 Leaderboard
        </h2>
        <ul className="space-y-1">
          {players.slice(0, 5).map((player, index) => (
            <li
              key={index}
              className={`flex justify-between items-center px-3 py-1 rounded border border-green-400/30 ${
                index === 0
                  ? "bg-yellow-400/40 border-yellow-300 font-bold text-yellow-100"
                  : "bg-green-100/10 text-green-100"
              }`}
            >
              <span
                className={`text-${themeData.colors.primaryText}-300 text-sm`}
              >
                {player.rank}
              </span>
              <span className="truncate text-base ">{player.name}</span>
              <span className="text-sm opacity-80">{player.score}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        className={`relative z-10 flex flex-col items-center justify-center gap-8 min-h-screen bg-${themeData.colors.bg}/20 p-6`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        {/* Theme Title */}
        <motion.h1
          className={`text-5xl font-extrabold mt-5 text-${themeData.colors.primaryText}-300 drop-shadow-md`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          {themeData.name}
        </motion.h1>

        {/* Question Content */}
        <motion.div
          className={`mt-8 w-full text-${themeData.colors.secondaryText}`}
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
