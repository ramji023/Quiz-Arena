import { motion } from 'motion/react';

export default function ThemeLoader({msg}:{msg:string}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-primary flex items-center justify-center z-[9999]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-5"
      >
        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-pink-400/20 border-t-pink-400 rounded-full"
        />

        {/* Loading text */}
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-secondary text-base font-medium tracking-wide"
        >
          {msg}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}