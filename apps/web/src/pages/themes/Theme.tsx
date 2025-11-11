import { ReactNode, useState } from "react";
import { motion } from "motion/react";
import { THEMES } from "./themesData";
import { ArrowLeft } from "lucide-react";

const players = [
  { name: "Aarav", score: 1200, rank: 1 },
  { name: "Meera", score: 950, rank: 2 },
  { name: "Ravi", score: 870, rank: 3 },
  { name: "Kiran", score: 760, rank: 4 },
  { name: "Tara", score: 640, rank: 235 },
];

export function JungleTheme({ children }: { children: ReactNode }) {
  const jungle = THEMES.find((t) => t.id === "jungle-quest")!;

  return (
    <motion.div
      className="relative min-h-screen bg-cover bg-center text-center overflow-hidden"
      style={{
        backgroundImage: `url(${jungle.backgroundImage})`,
        backgroundColor: jungle.colors.background,
        color: jungle.colors.text,
      }}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Ambient Effect */}
      <Fireflies count={14} />

      {/* back button  */}
      <motion.button
        className="absolute top-3 left-3 flex items-center gap-2 px-4 py-2 
                 rounded-full border-2 border-green-400/60 
                 bg-green-900/40 text-yellow-200 
                 font-semibold text-sm shadow-md 
                 hover:bg-green-800/60 hover:scale-105 hover:border-yellow-400 
                 transition-all duration-300 backdrop-blur-sm"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      >
        <ArrowLeft size={20} className="text-yellow-300" />
        <span className="hidden md:inline-block">Back</span>
      </motion.button>

      {/* Leaderboard Floating Panel */}
      <motion.div
        className="absolute top-3 right-3 w-50 bg-gradient-to-b from-green-900/70 to-emerald-800/70 border border-green-500/50 rounded p-2 shadow backdrop-blur-md z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-lg font-bold text-yellow-300 mb-3 text-center drop-shadow-md">
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
              <span className="text-yellow-400 text-sm">{player.rank}</span>
              <span className="truncate text-base ">{player.name}</span>
              <span className="text-sm opacity-80">{player.score}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Main Layout */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center gap-8 min-h-screen bg-black/20 p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        {/* Theme Title */}
        <motion.h1
          className="text-5xl font-extrabold mt-5 text-yellow-300 drop-shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
        >
          🌿 {jungle.name}
        </motion.h1>

        {/* Question Content */}
        <motion.div
          className="mt-8 w-full text-white"
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





export function QuestionCard({
  questionData,
  onAnswer,
}: {
  questionData: { question: string; options: string[] };
  onAnswer: (option: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onAnswer(option);
  };

  // Option background palette (Kahoot-like but jungle-toned)
  const optionColors = [
    "from-green-700 to-green-500",
    "from-amber-500 to-yellow-400",
    "from-emerald-600 to-teal-500",
    "from-lime-500 to-green-400",
  ];

  return (
    <div className="flex flex-col items-center justify-center font-jungle text-[#FFFBEA] px-6 py-10 text-center select-none">
      {/* Question */}
      <div className="max-w-4xl mb-12">
        <h2 className="text-5xl md:text-4xl font-extrabold leading-snug tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          {questionData.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-2xl">
        {questionData.options.map((option, index) => {
          const isSelected = selected === option;
          const color = optionColors[index % optionColors.length];

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`relative py-3 rounded-2xl font-bold text-2xl tracking-wide transition-all duration-300 border-4 
                ${
                  isSelected
                    ? "scale-105 text-white border-yellow-300 shadow-[0_0_20px_rgba(255,255,100,0.6)]"
                    : "border-transparent hover:border-yellow-200"
                }
                ${
                  isSelected
                    ? `bg-gradient-to-br ${color}`
                    : `bg-gradient-to-br ${color} opacity-90 hover:opacity-100`
                }`}
            >
              <span className="drop-shadow-md">{option}</span>

              <div className="absolute inset-0 rounded-xl bg-white/10 pointer-events-none"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Theme() {
  const questionData = {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Elephant", "Lion", "Tiger", "Leopard"],
  };

  return (
    <JungleTheme>
      <QuestionCard
        questionData={questionData}
        onAnswer={(option: string) => console.log("Selected:", option)}
      />
    </JungleTheme>
  );
}

function Fireflies({ count = 12 }) {
  const flies = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {flies.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "6px",
            height: "6px",
            background:
              "radial-gradient(circle, rgba(255,255,150,1) 40%, transparent 70%)",
          }}
          animate={{
            x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
            y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
            opacity: [0.3, 1, 0.6],
            scale: [0.8, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
