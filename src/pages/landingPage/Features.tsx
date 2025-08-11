import { motion } from "framer-motion";
import { Target, Link, Clock, Trophy } from "lucide-react";
import { Card } from "../../components/ui/Card";
const features = [
  {
    icon: <Target size={40} className="text-pink"/>,
    title: "Create Custom Quizzes",
    description:
      "Design quizzes tailored to your audience, with complete control over questions and answers.",
  },
  {
    icon: <Link size={40} className="text-blue-400"/>,
    title: "Share via Link",
    description: "Easily share your quiz with anyone using a single link.",
  },
  {
    icon: <Clock size={40} className="text-green-700" />,
    title: "Real-time Participation",
    description:
      "Host quizzes live and see participants’ answers in real time.",
  },
  {
    icon: <Trophy size={40} className="text-red-700"/>,
    title: "Leaderboard",
    description: "Display live rankings to keep competition exciting.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-5 bg-secondary py-20 text-primary">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl font-semibold mb-4"
        >
          Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          Powerful tools to create, share, and enjoy quizzes with your
          community.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card step={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
