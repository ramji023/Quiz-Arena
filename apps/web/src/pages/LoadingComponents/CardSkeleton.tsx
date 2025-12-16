import { motion } from "motion/react";

export default function QuizCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden w-60">
      {/* Image Skeleton */}
      <div className="w-full h-25 bg-gray-200 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="p-4">
        {/* Title Skeleton */}
        <div className="mb-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>

        {/* Questions and Difficulty Skeleton */}
        <div className="flex justify-between mb-3">
          <div className="h-3 bg-gray-200 rounded w-20 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.1,
              }}
            />
          </div>
          <div className="h-5 bg-gray-200 rounded-full w-16 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.2,
              }}
            />
          </div>
        </div>

        {/* Players and Rating Skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-3 bg-gray-200 rounded w-16 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.3,
              }}
            />
          </div>
          <div className="h-3 bg-gray-200 rounded w-10 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.4,
              }}
            />
          </div>
        </div>

        {/* Button and Bookmark Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-24 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            />
          </div>
          <div className="h-5 w-5 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.6,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}