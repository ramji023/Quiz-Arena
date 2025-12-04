import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MatrixRainProps {
  count?: number;
  speed?: number;
  intensity?: number;
}

export default function MatrixRain({
  count = 20,
  speed = 1,
  intensity = 0.6,
}: MatrixRainProps) {
  const [columns, setColumns] = useState<
    Array<{
      id: number;
      left: string;
      delay: number;
      duration: number;
      chars: string[];
    }>
  >([]);

  useEffect(() => {
    const matrixChars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    const newColumns = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + (Math.random() * 4) / speed,
      chars: Array.from(
        { length: 15 },
        () => matrixChars[Math.floor(Math.random() * matrixChars.length)] ?? ""
      ),
    }));

    setColumns(newColumns);
  }, [count, speed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {columns.map((column) => (
        <motion.div
          key={column.id}
          className="absolute top-0 flex flex-col gap-1 text-xs md:text-sm font-mono"
          style={{
            left: column.left,
          }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: "100vh",
            opacity: [0, intensity, intensity, 0],
          }}
          transition={{
            duration: column.duration,
            delay: column.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {column.chars.map((char, idx) => (
            <motion.span
              key={idx}
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              style={{
                opacity: 1 - idx * 0.06,
              }}
              animate={{
                color: [
                  "rgb(34, 211, 238)",
                  "rgb(6, 182, 212)",
                  "rgb(34, 211, 238)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.1,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
