import { motion } from "motion/react";
import { Correct, Wrong } from "../CheckIcon";

export function AnswerFeedback({ result }: { result: "correct" | "wrong" }) {
  const isCorrect = result === "correct";
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      animate={{ scale: 1.1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        fixed inset-0 flex items-center justify-center
        z-50 pointer-events-none
      "
    >
      {/* Icon container */}
      <div
        className={`
          relative w-full h-full rounded-3xl
          flex items-center justify-center shadow-8xl
        `}
      >
        {isCorrect ? <Correct /> : <Wrong />}
      </div>
    </motion.div>
  );
}
