import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

const players = [
  {
    id: 1,
    name: "Aarav",
    score: 1500,
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    id: 2,
    name: "Priya",
    score: 1450,
    avatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    id: 3,
    name: "Rahul",
    score: 1400,
    avatar: "https://i.pravatar.cc/50?img=3",
  },
  {
    id: 4,
    name: "Sneha",
    score: 1350,
    avatar: "https://i.pravatar.cc/50?img=4",
  },
  {
    id: 5,
    name: "Vikram",
    score: 1300,
    avatar: "https://i.pravatar.cc/50?img=5",
  },
];

export default function LiveLeaderboard() {
  const rankColors = ["text-yellow-500", "text-gray-400", "text-orange-400"];
  return (
    <section className="py-20 bg-primary text-primary">
      <div className="max-w-4xl mx-auto px-6" style={{ perspective: 1200 }}>
        <motion.div
          className="bg-secondary rounded-xl shadow-2xl overflow-hidden p-8"
          whileInView={{ rotateX: 30, rotateY: 0, rotateZ: -10 }}
          initial={{ rotateX: 0, rotateY: 0, rotateZ: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ once: false }}
        >
          {/* Counter rotate content to keep it normal */}
          <motion.div
            whileInView={{ rotateX: -15, rotateY: 10 }}
            initial={{ rotateX: 0, rotateY: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            viewport={{ once: false }}
          >
            {/* Heading and description */}
            <div className="text-center mb-10 select-none">
              <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" /> Live Leaderboard
              </h2>
              <p className="text-gray-300 max-w-xl mx-auto">
                Watch the rankings update in real-time as players compete!
              </p>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-hidden rounded-lg">
              {/* Table Header */}
              <div className="grid grid-cols-3 px-6 py-3 bg-gray-700 font-semibold text-gray-300 select-none">
                <span>Rank</span>
                <span>Player</span>
                <span className="text-right">Score</span>
              </div>

              {/* Leaderboard Rows */}
              <div>
                <AnimatePresence>
                  {players.map((player: any, index: number) => (
                    <motion.div
                      key={player.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-3 px-6 py-4 border-b border-gray-700 items-center"
                    >
                      {/* Rank */}
                      <span className={`font-bold ${rankColors[index] || ""}`}>
                        #{index + 1}
                      </span>

                      {/* Player Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-8 h-8 rounded-full border border-gray-500"
                        />
                        <span>{player.name}</span>
                      </div>

                      {/* Score */}
                      <motion.span
                        key={player.score} // re-trigger animation on score change
                        initial={{ scale: 1.3, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-right font-mono"
                      >
                        {player.score}
                      </motion.span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
