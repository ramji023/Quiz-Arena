import { motion } from "motion/react";

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = "Loading QuizArena ..." }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        {/* Animated logo/rings */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-pink/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 rounded-full border-4 border-pink/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-pink/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-4 h-4 rounded-full bg-pink glow-magenta" />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.p
          className="text-lg font-medium text-secondary"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-pink"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
