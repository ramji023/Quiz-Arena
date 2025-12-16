import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";

export default function QuizSkeleton() {
  // Shimmer animation component
  const Shimmer = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );

  return (
    <div className="mx-20 animate-pulse">
      {/* Header with Back + Play buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
          <MoveLeft size={30} strokeWidth={2.5} className="text-gray-400" />
        </div>

        <div className="h-10 bg-gray-200 rounded-md w-24 relative overflow-hidden">
          <Shimmer />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center">
        {/* Title & Description */}
        <div className="mb-4 text-center w-full max-w-xl">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2 relative overflow-hidden">
            <Shimmer delay={0.1} />
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
              <Shimmer delay={0.2} />
            </div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto relative overflow-hidden">
              <Shimmer delay={0.3} />
            </div>
          </div>
        </div>

        {/* Quiz Metadata */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-5 bg-gray-200 rounded w-32 relative overflow-hidden"
            >
              <Shimmer delay={0.4 + i * 0.1} />
            </div>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-6 w-full max-w-2xl">
          {[...Array(5)].map((_, qIndex) => (
            <div key={qIndex} className="border-l-4 border-gray-200 pl-4">
              {/* Question Title */}
              <div className="flex justify-between items-center gap-2 mb-2">
                <div className="h-6 bg-gray-200 rounded flex-1 relative overflow-hidden">
                  <Shimmer delay={0.7 + qIndex * 0.1} />
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 relative overflow-hidden">
                  <Shimmer delay={0.7 + qIndex * 0.1} />
                </div>
              </div>

              {/* Options */}
              <ul className="space-y-1">
                {[...Array(4)].map((_, oIndex) => (
                  <li key={oIndex}>
                    <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                      <Shimmer delay={0.8 + qIndex * 0.1 + oIndex * 0.05} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}