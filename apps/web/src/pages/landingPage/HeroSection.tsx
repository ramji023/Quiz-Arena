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
        className="absolute bottom-30 left-20  opacity-60 pointer-events-none"
      >
        <UserIcon />
      </motion.div>

      <motion.div
        animate={{ x: -mouse.x, y: mouse.y }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
        className="absolute bottom-25 right-28 opacity-60 pointer-events-none"
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
        className="font-poppins text-md flex text-center mt-2 max-w-2xl"
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
        <Button variant="primary" size="md" onClick={() => {}}>
          Create Quiz{" "}
          <span>
            <RightArrow />
          </span>
        </Button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-8 flex flex-nowrap gap-12 md:gap-12 text-center"
      >
        <div className="flex flex-col">
          <span className="font-playfair text-3xl md:text-4xl font-bold">
            50K+
          </span>
          <span className="font-poppins text-sm md:text-base opacity-80">
            Players
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-playfair text-3xl md:text-4xl font-bold">
            1M+
          </span>
          <span className="font-poppins text-sm md:text-base opacity-80">
            Quizzes
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-playfair text-3xl md:text-4xl font-bold">
            100+
          </span>
          <span className="font-poppins text-sm md:text-base opacity-80">
            Categories
          </span>
        </div>
      </motion.div>
    </div>
  );
}
