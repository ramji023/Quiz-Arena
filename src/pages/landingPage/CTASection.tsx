import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Ready to Challenge Your Friends?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          Create a quiz, share it instantly, and see who tops the leaderboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition">
            Start Your First Quiz
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition">
            Explore Public Quizzes
          </button>
        </motion.div>
      </div>
    </section>
  );
}
