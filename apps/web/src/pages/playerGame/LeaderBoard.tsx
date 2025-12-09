import { motion } from "motion/react";
import useSocketStore from "../../stores/socketStore";
import { THEMES } from "../themes/themesData";
interface Player {
  id: string;
  fullName: string;
  score: number;
  rank: number;
}
// leaderboard component
export default function LeaderBoard({themeId}:{themeId:string}) {
  const theme = THEMES.find((t) => t.id === themeId);
  const userJoined = useSocketStore((s) => s.playerJoined);
//   console.log(userJoined)
  const gameStatus = useSocketStore((s) => s.gameStatus);
  if (!theme)
    return (
      <>
        <div>Something went wrong while joining quiz</div>
      </>
    );

  const playerArray: Player[] = userJoined
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, rank: index + 1 }));

  const playersScore = playerArray.filter(
    (player) => player.id !== useSocketStore.getState().id
  );
  const yourScoreData = playerArray.find(
    (player) => player.id === useSocketStore.getState().id
  );

  const leaderboardDisplay = [
    ...(yourScoreData ? [yourScoreData] : []),
    ...playersScore,
  ];

//   console.log(playersScore);
//   console.log(yourScoreData);
//   console.log(leaderboardDisplay);
  return (
    <>
      <div className="flex justify-center items-center">
        {gameStatus === "end" && userJoined && (
          <motion.div
            className={`className="flex flex-col items-center justify-center font-jungle px-6 py-10 text-center select-none w-[30%]`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            style={{
              backgroundImage: `linear-gradient(to bottom, 
      ${theme.background["from-leaderboard-900/70"]}, 
      ${theme.background["to-leaderboard-800/70"]}
    )`,
              border: `1px solid ${theme.borders["border-leaderboard-500/50"]}`,
            }}
          >
            <h2 className={`text-lg font-bold mb-3 text-center drop-shadow-md`}>
              🏆 Leaderboard
            </h2>
            <ul className="space-y-1">
              {leaderboardDisplay.map((player, index) => {
                const isTopPlayer = index === 0;
                const isYou = yourScoreData && player.id === yourScoreData.id;

                return (
                  <li
                    key={player.id}
                    className="flex justify-between items-center px-3 py-1 rounded border font-semibold transition-all duration-300"
                    style={{
                      borderColor: isYou
                        ? theme.borders["border-you-300"]
                        : isTopPlayer
                          ? theme.borders["border-li-300"]
                          : theme.borders["border-li-400/30"],

                      backgroundColor: isYou
                        ? theme.background["bg-you-400/50"]
                        : isTopPlayer
                          ? theme.background["bg-li-400/40"]
                          : theme.background["bg-li-100/10"],

                      color: theme.textColor["li-text-100"],
                    }}
                  >
                    <span
                      style={{
                        color: theme.textColor["primary-300"],
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
      </div>
    </>
  );
}

// quizComplete component
function QuizCompleteMessage() {
  return <></>;
}
