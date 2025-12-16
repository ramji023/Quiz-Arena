import { RightArrow } from "@repo/ui/components/icons/ArrowsIcon";
import { Button } from "@repo/ui/components/ui/Button";
import { motion } from "motion/react";
import {
  TrophyIcon,
  StarIcon,
  UserIcon,
  HelpIcon,
} from "@repo/ui/components/icons/MotionIcon";
import { useState } from "react";

export function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const offsetX = (e.clientX - innerWidth / 2) / 20;
    const offsetY = (e.clientY - innerHeight / 2) / 20;
    setMouse({ x: offsetX, y: offsetY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-primary px-6 py-30 relative text-secondary flex flex-col justify-center items-center gap-4 md:px-60 overflow-hidden"
    >
      <motion.div
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        className="absolute top-10 left-10 opacity-60 pointer-events-none "
      >
        <TrophyIcon />
      </motion.div>

      <motion.div
        animate={{ x: -mouse.x, y: -mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        className="absolute top-20 right-16  opacity-60 pointer-events-none"
      >
        <HelpIcon />
      </motion.div>

      <motion.div
        animate={{ x: mouse.x, y: -mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        className="absolute bottom-20 left-20  opacity-60 pointer-events-none"
      >
        <UserIcon />
      </motion.div>

      <motion.div
        animate={{ x: -mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        className="absolute bottom-16 right-24 opacity-60 pointer-events-none"
      >
        <StarIcon />
      </motion.div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="font-playfair text-4xl md:text-6xl/tight break-words text-shadow-2xs flex text-center"
      >
        Create, Play, and Host Quizzes All in One Arena
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-poppins text-md flex text-center mt-5 max-w-2xl"
      >
        Create your own quizzes, play with friends in real-time, and climb the
        leaderboard to prove you’re the ultimate quiz champion.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-5"
      >
        <Button variant="primary" onClick={() => {}}>
          Create Quiz{" "}
          <span>
            <RightArrow />
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
