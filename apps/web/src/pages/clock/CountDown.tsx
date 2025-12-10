import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import useSocketStore from "../../stores/socketStore";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";
const Countdown = ({ start = 5 }: { start?: number }) => {
  const [count, setCount] = useState(start);
  const [hasSentStart, setHasSentStart] = useState(false);
  const socket = useSocketStore((state) => state.socketRef.current);

  useEffect(() => {
    if (count < 0 && !hasSentStart) {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "start-game",
            data: {
              userId: useSocketStore.getState().id,
              gameId: useSocketStore.getState().gameId,
            },
            message: "start the game",
          })
        );
      }
      audio.play(sounds["enterGame"]!, 1000);
      setHasSentStart(true);
    }

    if (count >= 0) {
      const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, hasSentStart, socket]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-pink z-50">
      <AnimatePresence>
        {count >= 0 && (
          <motion.span
            key={count}
            className="text-8xl font-extrabold"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {count === 0 ? "GO!" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;
