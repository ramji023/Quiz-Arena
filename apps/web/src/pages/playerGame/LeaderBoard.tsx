import {
  FirstRank,
  SecondRank,
  ThirdRank,
} from "@repo/ui/components/icons/Badges";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { THEMES } from "../themes/themesData";
import useSocketStore from "../../stores/socketStore";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";

// interface LeaderboardEntry {
//   rank: number;
//   name: string;
//   points: number;
// }

// const leaderboardData: LeaderboardEntry[] = [
//   { rank: 1, name: "Rise High School", points: 485 },
//   { rank: 2, name: "Little Valley College", points: 475 },
//   { rank: 3, name: "Elk Valley Institute", points: 433 },
//   { rank: 4, name: "Summit Academy", points: 402 },
//   { rank: 5, name: "Greenfield School", points: 398 },
//   { rank: 6, name: "Heritage Middle School", points: 387 },
//   { rank: 7, name: "Mountainview High", points: 354 },
//   { rank: 8, name: "Lone Oak Institute", points: 329 },
//   { rank: 9, name: "Oyster Harbour School", points: 298 },
//   { rank: 10, name: "Positivity High School", points: 276 },
//   { rank: 11, name: "Eastwood Middle School", points: 245 },
//   { rank: 12, name: "Garden Grove Secondary", points: 233 },
//   { rank: 13, name: "Golden Oak School", points: 231 },
//   { rank: 14, name: "Acadia Elementary", points: 228 },
//   { rank: 15, name: "Broad River High", points: 217 },
//   { rank: 16, name: "Bear River High", points: 204 },
// ];

interface Player {
  id: string;
  fullName: string;
  score: number;
  rank: number;
}
// function to get the badges for first,second and third rank
const getPlayerBadges: Record<number, React.ReactNode> = {
  1: <FirstRank />,
  2: <SecondRank />,
  3: <ThirdRank />,
};

const Leaderboard = ({ themeId }: { themeId: string }) => {
  const theme = THEMES.find((t) => t.id === themeId);
  // get all the players data
  const userJoined = useSocketStore((s) => s.playerJoined);
  // get current game status
  const gameStatus = useSocketStore((s) => s.gameStatus);
  // function to set the error
  const setError = useErrorStore((s) => s.setError);
  // if theme is not available then throw the error
  if (!theme) {
    setError("page", "Client Error", "Theme is not available");
    return <ErrorPage />;
  }
  // if userjoined is valid then sort the player data and add rank to every player
  const playerArray: Player[] = userJoined
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  // after creating playerArray filter out the rest of the players and store in playerScore
  const playersScore = playerArray.filter(
    (player) => player.id !== useSocketStore.getState().id
  );

  // and then filter out your score
  const yourScoreData = playerArray.find(
    (player) => player.id === useSocketStore.getState().id
  );

  // then create new array and add your score first then rest of the player
  const leaderboardDisplay = [
    ...(yourScoreData ? [yourScoreData] : []),
    ...playersScore,
  ];

  audio.play(sounds["gameComplete"]!, 3000);

  // <---------------   write logic to apply pagination  -------------->
  const ITEMS_PER_PAGE = 5; // by default only five user show on leaderboard
  const [currentPage, setCurrentPage] = useState(0); // track current page

  const totalPages = Math.ceil(leaderboardDisplay.length / ITEMS_PER_PAGE); // now calculate total pages divided all players/player_per_page
  const startIndex = currentPage * ITEMS_PER_PAGE; //set the start index on current page
  const endIndex = startIndex + ITEMS_PER_PAGE; // set the end index on current page
  const currentData = leaderboardDisplay.slice(startIndex, endIndex); // and then slice the data from leaderboard array from start to end index

  // when user click to next button then set next page
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // when user click previous button then  set previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // render leaderboard only when userJoined data is not null and gameStatus is end
  if (gameStatus === "end" && userJoined) {
  }
  return (
    <div className="flex justify-center items-center">
      {/* Main Content */}
      <div className="relative z-10 max-w-5xl min-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <div className="inline-block  px-5 py-2 rounded-md shadow-2xl">
            <h1
              className="text-2xl md:text-4xl font-black tracking-wider drop-shadow-lg"
              style={{ color: theme.textColor["primary-300"] }}
            >
              LEADERBOARD
            </h1>
          </div>
        </motion.div>

        {/* Leaderboard Entries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {currentData.map((entry, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  className="flex items-stretch mb-3 group"
                >
                  {/* Rank Badge */}
                  <div
                    className={`flex items-center justify-center w-20 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    style={{
                      backgroundColor: theme.background["dark-green"],
                      color: theme.textColor["primary-300"],
                    }}
                  >
                    <span className="text-3xl font-black  drop-shadow-md">
                      {entry.rank <= 3
                        ? getPlayerBadges[entry.rank]
                        : entry.rank}
                    </span>
                  </div>

                  {/* Name Section */}
                  <div
                    className="flex-1 flex items-center px-6  shadow-md group-hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: theme.background["light-green"],
                      color: theme.textColor["secondary"],
                    }}
                  >
                    <span className="text-xl font-bold tracking-wide truncate">
                      {entry.id === useSocketStore.getState().id ? (
                        <span
                          className="font-bold"
                          style={{ color: theme.textColor["primary-300"] }}
                        >
                          You
                        </span>
                      ) : (
                        entry.fullName
                      )}
                    </span>
                  </div>

                  {/* Points Badge */}
                  <div
                    className="flex items-center justify-center px-6  shadow-lg group-hover:shadow-xl transition-shadow duration-300 min-w-[140px]"
                    style={{
                      color: theme.textColor["primary-300"],
                      backgroundColor: theme.background["dark-green"],
                    }}
                  >
                    <span className="text-2xl font-black  drop-shadow-md">
                      {entry.score}
                    </span>
                    <span className="text-sm font-bold  ml-2">PTS</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="px-4 py-2 bg-gradient-to-r font-bold text-md rounded-md shadow-lg hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-200"
              style={
                {
                  color: theme.textColor["button-text-200"],
                  borderColor: theme.borders["border-button-400/60"],
                  backgroundColor: theme.background["bg-button-900/40"],
                  "--hover-bg": theme.background["bg-button-800/60"],
                  "--hover-border": theme.borders["border-button-400"],
                  pointerEvents: "auto",
                } as React.CSSProperties
              }
            >
              ← Previous
            </button>

            <div className="flex items-center gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-8 h-8 rounded-full font-bold text-lg transition-all duration-300 ${
                    i === currentPage
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-purple-900 scale-125 shadow-xl"
                      : "bg-purple-800/50 text-white hover:bg-purple-700 hover:scale-110"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 bg-gradient-to-r font-bold text-md rounded-md shadow-lg hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all duration-200"
              style={
                {
                  color: theme.textColor["button-text-200"],
                  borderColor: theme.borders["border-button-400/60"],
                  backgroundColor: theme.background["bg-button-900/40"],
                  "--hover-bg": theme.background["bg-button-800/60"],
                  "--hover-border": theme.borders["border-button-400"],
                  pointerEvents: "auto",
                } as React.CSSProperties
              }
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Page indicator text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <p className="text-white/70 text-sm font-semibold">
            Showing {startIndex + 1}-
            {Math.min(endIndex, leaderboardDisplay.length)} of{" "}
            {leaderboardDisplay.length} entries
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
