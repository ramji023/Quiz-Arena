import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

interface CountdownProps {
  duration?: number; // default in seconds
  id: string;
  answered: boolean;
}

export default function Timer({ duration = 10, id, answered }: CountdownProps) {
  const circleSize = 70;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;

  const [time, setTime] = useState(duration);
  const controls = useAnimationControls();

  console.log("timer component rendered..");
  useEffect(() => {
    setTime(duration);
    controls.set({ strokeDashoffset: circumference });

    let interval: NodeJS.Timeout;

    controls.start({
      strokeDashoffset: 0,
      transition: { duration, ease: "linear" },
    });

    interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    if (!answered) return;

    controls.stop();
    setTime((t) => t);
  }, [answered]);

  return (
    <div className=" flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        {/* Blob / Curvy Floating Shape */}
        <motion.div
          className="absolute w-[100px] h-[100px] rounded-full bg-primary-shadow blur-[30px] opacity-30 mix-blend-screen"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 60% 40% 50%",
              "30% 60% 60% 40% / 50% 40% 60% 70%",
              "70% 30% 50% 50% / 40% 70% 60% 60%",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />

        {/* Progress Circular Clock */}
        <svg width={circleSize} height={circleSize} className="rotate-[-90deg]">
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#2e2e2e"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <motion.circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#ff319f"
            strokeWidth="7"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={controls}
            strokeLinecap="round"
          />
        </svg>

        {/* Time Text */}
        <span className="absolute text-secondary font-bold text-4xl">
          {time}
        </span>
      </div>
    </div>
  );
}
