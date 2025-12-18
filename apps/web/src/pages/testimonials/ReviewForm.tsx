import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { useEffect } from "react";

export function LikeNote({ onLikeClick }: { onLikeClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed z-[2000] bottom-6 right-6 bg-box text-primary rounded-lg shadow-2xl border border-card/20 backdrop-blur-sm"
    >
      <button
        onClick={onLikeClick}
        className="group flex items-center gap-3 px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <span className="text-xs font-medium">Send us love !</span>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Heart
            size={20}
            className="transition-all duration-300 text-pink-500 fill-pink group-hover:fill-pink-500"
          />
        </motion.div>
      </button>
    </motion.div>
  );
}

export function ThankuNote({
  username,
  onClose,
}: {
  username: string;
  onClose: () => void;
}) {
  // write effect to close the thanku note
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="fixed z-[2001] top-20 left-1/2 -translate-x-1/2 text-primary"
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-playfair text-md font-bold">
              Thank you, <span className="text-pink">{username}</span>! ❤️
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
