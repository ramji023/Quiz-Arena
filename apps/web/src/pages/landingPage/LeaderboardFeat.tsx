import { motion } from "motion/react";
import leadboardImg from "../../../public/leaderboard.png";
// import { CheckIcon } from "@repo/ui/components/icons/ArrowsIcon";
import { CheckCheck } from "lucide-react";

export default function LeaderboardFeat() {
  const features = [
    "Track your progress live as you climb the ranks",
    "Experience instant score updates during quizzes",
    "Compete with friends and players worldwide",
    "See detailed stats and performance insights",
    "Share your achievements and challenge others easily",
  ];

  return (
    <div className="px-5 py-10 md:py-10 bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse justify-between items-center gap-12 lg:gap-16">
        {/* Right Section - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-secondary flex-1 flex flex-col gap-8 p-4 md:p-8"
        >
          {/* Heading */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-sm font-semibold tracking-wider uppercase text-card/80 bg-pink px-4 py-2 rounded-full">
                Live Rankings
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight font-playfair"
            >
              Stay Competitive with <span className="text-box">Real-Time</span>{" "}
              Leaderboards
            </motion.h1>
          </div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-5 mt-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-card/20 flex items-center justify-center group-hover:bg-card/30 transition-colors">
                  <CheckCheck className="w-4 h-4 text-card" />
                </div>
                <span className="text-secondary/90 text-base md:text-lg leading-relaxed font-poppins">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trophy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex items-center gap-2 bg-pink px-4 py-2 rounded-full">
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-semibold text-secondary">
                Top 100 Players Updated Daily
              </span>
            </div>
          </motion.div>
        </motion.div>

         {/* Right Section - Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center items-center relative"
        >
          {/* Decorative background blob */}
          <div className="absolute inset-0 bg-card/5 rounded-3xl blur-3xl" />

          {/* Polaroid stack */}
          <div className="relative w-full max-w-[400px] h-[450px]">
            {/* Polaroid 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -12 }}
              whileInView={{ opacity: 1, y: 0, rotate: -12 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, rotate: -8, zIndex: 30 }}
              className="absolute top-4 left-8 w-[400px] bg-box p-3 rounded-lg shadow-2xl cursor-pointer z-10"
            >
              <div className="w-full h-[280px] bg-box rounded overflow-hidden mb-3">
                <img
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1766065502/leaderboard_afpo4q.jpg"
                  alt="Create Quiz"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
               Leaderboard
              </p>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 5, zIndex: 30 }}
              className="absolute top-12 right-8 w-[400px] bg-box p-3 rounded-lg shadow-2xl cursor-pointer z-20"
            >
              <div className="w-full h-[280px] bg-box rounded overflow-hidden mb-3">
                <img
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1766065508/leader-2_bateoz.jpg"
                  alt="Play Quiz"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
                Leaderboard
              </p>
            </motion.div>

            {/* Polaroid 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, rotate: -2, zIndex: 30 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] bg-box p-3 rounded-lg shadow-2xl cursor-pointer z-30"
            >
              <div className="w-full h-[280px] bg-box rounded overflow-hidden mb-3">
                <img
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1766065502/leader-3_s4fvkf.jpg"
                  alt="Leaderboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
                Leaderboard
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
