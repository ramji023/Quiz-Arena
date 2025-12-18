import { motion } from "motion/react";
import quizImg from "../../../public/quiz.png";
// import { CheckIcon } from "@repo/ui/components/icons/ArrowsIcon";
import { CheckCheck } from "lucide-react";

export default function QuizFeat() {
  const features = [
    "Invite friends instantly with a shareable link",
    "Countdown timer for each question to keep the adrenaline high",
    "Bonus points for streaks and fastest responses",
    "Instant results screen with a detailed comparison of answers",
  ];

  return (
    <div className="px-5 py-10 md:py-10 bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
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
                Real-Time Gaming
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight "
            >
              Compete with friends <span className="text-box">worldwide</span>{" "}
              in real-time
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
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300"
              >
                <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-card/20 flex items-center justify-center group-hover:bg-card/30 transition-colors">
                  <CheckCheck className="w-4 h-4 text-box" />
                </div>
                <span className="text-secondary/90 text-base md:text-lg leading-relaxed font-poppins">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Optional CTA or Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-3 mt-2"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-card/30 border-2 border-primary flex items-center justify-center text-xs font-semibold text-secondary"
                >
                  {i}K+
                </div>
              ))}
            </div>
            <span className="text-sm text-secondary/70">
              Active players online now
            </span>
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
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006456/ca241832-5d84-46ac-be88-bfa997e54b13.png"
                  alt="Create Quiz"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
                Create Your Quiz ✨
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
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1763006176/9e317a7f-187a-4bb1-8b34-83c801e8ba8b.png"
                  alt="Play Quiz"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
                Desert theme
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
                  src="https://res.cloudinary.com/dqr7qcgch/image/upload/v1763005692/ee70a7e5-6544-48f3-93b6-11ebeefb64cc.png"
                  alt="Leaderboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-primary font-handwriting text-sm">
                Jungle Theme
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
