import { motion } from "motion/react";
import { MoveLeft, Trophy } from "lucide-react";

export default function HostQuizSkeleton() {
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
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-6xl mx-auto">
        {/* First Section - Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
            <MoveLeft size={30} strokeWidth={1.5} className="text-gray-400" />
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-28 relative overflow-hidden">
            <Shimmer />
          </div>
        </div>

        {/* Quiz Summary Card */}
        <div className="bg-white overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Thumbnail Skeleton */}
            <div className="md:col-span-1">
              <div className="w-full h-full min-h-[250px] bg-gray-200 relative overflow-hidden">
                <Shimmer />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-2 p-8">
              {/* Title & Description */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-8 bg-gray-200 rounded w-2/3 relative overflow-hidden">
                    <Shimmer delay={0.1} />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-20 relative overflow-hidden">
                    <Shimmer delay={0.2} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                    <Shimmer delay={0.3} />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 relative overflow-hidden">
                    <Shimmer delay={0.4} />
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-secondary rounded-lg p-3 flex items-start gap-3"
                  >
                    <div className="bg-gray-200 p-2 rounded-lg w-10 h-10 relative overflow-hidden">
                      <Shimmer delay={0.5 + index * 0.1} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-20 relative overflow-hidden">
                        <Shimmer delay={0.5 + index * 0.1} />
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16 relative overflow-hidden">
                        <Shimmer delay={0.6 + index * 0.1} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-card p-4">
            <div className="flex items-center justify-center gap-3">
              <Trophy size={28} className="text-gray-300" />
              <div className="h-8 bg-gray-200 rounded w-40 relative overflow-hidden">
                <Shimmer delay={1.1} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="py-4 px-6 text-left">
                    <div className="h-4 bg-gray-200 rounded w-12 relative overflow-hidden">
                      <Shimmer delay={1.2} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left">
                    <div className="h-4 bg-gray-200 rounded w-16 relative overflow-hidden">
                      <Shimmer delay={1.3} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto relative overflow-hidden">
                      <Shimmer delay={1.4} />
                    </div>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto relative overflow-hidden">
                      <Shimmer delay={1.5} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4 px-6">
                      <div className="h-8 bg-gray-200 rounded w-8 relative overflow-hidden">
                        <Shimmer delay={1.6 + index * 0.1} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                          <Shimmer delay={1.6 + index * 0.1} />
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-32 relative overflow-hidden">
                          <Shimmer delay={1.7 + index * 0.1} />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-8 bg-gray-200 rounded-full w-16 mx-auto relative overflow-hidden">
                        <Shimmer delay={1.8 + index * 0.1} />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="h-4 bg-gray-200 rounded w-12 mx-auto relative overflow-hidden">
                        <Shimmer delay={1.9 + index * 0.1} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-9">
          <div className="h-10 bg-gray-200 rounded-md w-40 relative overflow-hidden">
            <Shimmer delay={2.4} />
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-36 relative overflow-hidden">
            <Shimmer delay={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}