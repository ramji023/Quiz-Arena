import { motion } from "motion/react";
import { Pencil, Share2, Gamepad2, Trophy } from "lucide-react";
import { Card } from "@repo/ui/components/ui/Card";

const steps = [
  {
    icon: <Pencil className="text-red-700 w-10 h-10" />,
    title: "Create Your Quiz",
    description: "Easily design quizzes with our intuitive quiz builder.",
  },
  {
    icon: <Share2 className="text-violet-600 w-10 h-10" />,
    title: "Share With Link",
    description: "Invite friends and participants with a single share link.",
  },
  {
    icon: <Gamepad2 className="text-pink w-10 h-10" />,
    title: "Compete in Real-time",
    description: "Play live and see responses in real-time.",
  },
  {
    icon: <Trophy className="text-blue-400 w-10 h-10" />,
    title: "Check Leaderboard",
    description: "Track scores and see the winners instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 bg-secondary text-primary">
      <div className="container mx-auto px-6 text-center">
        {/* heading section */}
        <motion.h2
          className="text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          How It Works
        </motion.h2>

        {/* description section */}
        <motion.p
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          A quick look at how Quiz Arena makes playing, creating, and sharing
          quizzes easy and fun.
        </motion.p>

        {/* card section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
