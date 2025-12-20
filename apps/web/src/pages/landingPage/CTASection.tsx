import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/Button";
import { Sparkles, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="relative py-10 md:py-10 bg-primary text-secondary overflow-hidden ">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-card/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-card/20 rounded-full blur-3xl"
        />

        {/* Floating icons */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] text-blue-500"
        >
          <Sparkles size={60} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-[15%] text-yellow-500"
        >
          <Zap size={50} />
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 left-[20%] text-green-500"
        >
          <Users size={55} />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <div className="inline-flex items-center gap-2 bg-box backdrop-blur-sm px-5 py-2.5 rounded-full border border-card/20 shadow-lg">
            <Sparkles size={16} className="text-pink" />
            <span className="text-sm font-semibold text-primary tracking-wide">
              Join 50,000+ Quiz Creators
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-5xl font-bold mb-6 leading-tight"
        >
          Ready to Challenge{" "}
          <span className="relative inline-block">
            <span className="text-box">Your Friends?</span>
            <motion.svg
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-2 left-0 w-full"
              height="12"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C60 3 120 2 298 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-box"
              />
            </motion.svg>
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-lg text-secondary/70 max-w-2xl mx-auto mb-10 font-poppins leading-relaxed"
        >
          Create a quiz, share it instantly, and see who tops the leaderboard.
          <span className="block mt-2 text-box font-semibold">
            It takes less than 2 minutes to get started! 🚀
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="primary"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              <span className="flex items-center gap-2">
                Start Your First Quiz
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Explore Public Quizzes
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-secondary/70"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>1,234 online now</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✓</span>
            <span>Free to start</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>No credit card required</span>
          </div>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-box backdrop-blur-sm px-6 py-3 rounded-full border border-card/20">
            <span className="text-2xl">🎉</span>
            <span className="text-sm font-medium text-primary">
              Limited time: Premium features free for first 100 users
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
