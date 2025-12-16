import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";
import useSuccessStore from "../../stores/SuccessStore";


export const SuccessNote = () => {
  const message = useSuccessStore((s)=>s.message)
  const clearMessage = useSuccessStore((s)=>s.clearMessage)
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 z-[100] flex items-start gap-4 p-4 rounded-xl border backdrop-blur-xl bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)] min-w-[320px] max-w-[420px]"
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-50"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, rgba(239,68,68,0.15) 0%, transparent 50%)",
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Icon with pulse animation */}
          <motion.div
            className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              delay: 0.1,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-lg bg-emerald-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <CheckCircle2 className="w-5 h-5 relative z-10 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <motion.h4
              className="font-semibold text-sm text-emerald-400"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              Success
            </motion.h4>
            {message && (
              <motion.p
                className="text-sm text-muted-foreground mt-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.p>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={clearMessage}
            className="p-1.5 cursor-pointer z-100 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
