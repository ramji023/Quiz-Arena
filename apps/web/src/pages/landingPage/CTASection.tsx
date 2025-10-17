import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/Button";
export default function CTASection() {
  return (
    <section className="relative py-20 text-primary overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Ready to Challenge Your Friends?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          Create a quiz, share it instantly, and see who tops the leaderboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary"> Start Your First Quiz</Button>
          <Button variant="other"> Explore Public Quizzes</Button>
        </motion.div>
      </div>
    </section>
  );
}
