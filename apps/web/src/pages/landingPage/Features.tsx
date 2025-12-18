import { motion } from "motion/react";
import { Target, Link, Clock, Trophy } from "lucide-react";
import { Card } from "@repo/ui/components/ui/Card";

const features = [
  {
    icon: <Target size={40} className="text-pink" />,
    title: "Create Custom Quizzes",
    description:
      "Design quizzes tailored to your audience, with complete control.",
    color: "pink",
  },
  {
    icon: <Link size={40} className="text-blue-400" />,
    title: "Share via Link",
    description: "Easily share your quiz with anyone using a single link.",
    color: "blue",
  },
  {
    icon: <Clock size={40} className="text-green-700" />,
    title: "Real-time Participation",
    description:
      "Host quizzes live and see participants' answers in real time.",
    color: "green",
  },
  {
    icon: <Trophy size={40} className="text-red-700" />,
    title: "Leaderboard",
    description: "Display live rankings to keep competition exciting.",
    color: "red",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-5 bg-secondary py-10 md:py-10 text-primary relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-box/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-box/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block"
          >
            <span className="text-sm font-semibold tracking-wider uppercase text-pink/80 bg-pink/10 px-4 py-2 rounded-full">
              Why Choose Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Powerful{" "}
            <span className="text-box relative">
              Features
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C50 2.5 100 1.5 199 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-primary/70 font-poppins max-w-2xl mx-auto"
          >
            Powerful tools to create, share, and enjoy quizzes with your
            community. Everything you need in one place.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card step={feature} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA or Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 text-pink"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">
              99.9%
            </div>
            <div className="text-sm text-primary/60">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">
              &lt;100ms
            </div>
            <div className="text-sm text-primary/60">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold  mb-1">
              24/7
            </div>
            <div className="text-sm text-primary/60">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}