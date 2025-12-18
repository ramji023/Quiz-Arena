import { motion } from "motion/react";
import { Pencil, Share2, Gamepad2, Trophy } from "lucide-react";

const steps = [
  {
    icon: <Pencil className="text-red-700 w-10 h-10" />,
    title: "Create Your Quiz",
    description: "Easily design quizzes with our intuitive quiz builder.",
    color: "red",
    step: "01",
  },
  {
    icon: <Share2 className="text-violet-600 w-10 h-10" />,
    title: "Share With Link",
    description: "Invite friends and participants with a single share link.",
    color: "violet",
    step: "02",
  },
  {
    icon: <Gamepad2 className="text-pink w-10 h-10" />,
    title: "Compete in Real-time",
    description: "Play live and see responses in real-time.",
    color: "pink",
    step: "03",
  },
  {
    icon: <Trophy className="text-blue-400 w-10 h-10" />,
    title: "Check Leaderboard",
    description: "Track scores and see the winners instantly.",
    color: "blue",
    step: "04",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-10 md:py-10 bg-secondary text-primary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-card/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block"
          >
            <span className="text-sm font-semibold tracking-wider uppercase text-pink bg-pink/10 px-4 py-2 rounded-full">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How It{" "}
            <span className="text-box relative">
              Works
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C25 2.5 50 1.5 99 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-primary/70 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A quick look at how Quiz Arena makes playing, creating, and sharing
            quizzes easy and fun.
          </motion.p>
        </div>

        {/* Steps Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-pink/30 to-box/30" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                {/* Step number circle */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-pink/60 border-4 border-secondary flex items-center justify-center text-2xl font-bold text-primary z-10 relative">
                      {step.step}
                    </div>
                    {/* Pulse effect */}
                    <div className="absolute inset-0 w-20 h-20 rounded-full bg-pink/20 animate-ping" />
                  </div>
                </div>

                {/* Card content */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-box/50 backdrop-blur-sm rounded-2xl p-6 border border-box/10 hover:border-card/30 transition-all duration-300 "
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-xl bg-card/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 ">
                    {step.title}
                  </h3>

                  <p className="text-primary/70 text-sm leading-relaxed font-poppins">
                    {step.description}
                  </p>
                </motion.div>

                {/* Arrow connector (except last item) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-50 -right-4 transform translate-x-1/2 text-primary/40">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps List - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="relative"
            >
              <div className="flex items-start gap-4">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-pink/60 border-4 border-secondary flex items-center justify-center text-xl font-bold text-primary">
                    {step.step}
                  </div>
                </div>

                {/* Card content */}
                <div className="flex-1 bg-box/50 backdrop-blur-sm rounded-2xl p-6 border border-box/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-card/10 flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-primary/70 text-sm leading-relaxed font-poppins">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting line for mobile (except last) */}
              {index < steps.length - 1 && (
                <div className="ml-8 h-6 w-0.5 bg-gradient-to-b from-primary/40 to-pink/20" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 bg-box/50 px-6 py-3 rounded-full">
            <span className="text-2xl">🚀</span>
            <span className="text-sm font-semibold text-primary">
              Get started in less than 2 minutes
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}