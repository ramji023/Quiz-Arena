import { motion } from "motion/react";

type HeatWavesProps = {
  count?: number;     // number of overlapping shimmer layers
  speed?: number;     // controls animation speed
  intensity?: number; // controls opacity strength
};

export default function HeatWaves({
  count = 12,
  speed = 1,
  intensity = 0.3,
}: HeatWavesProps) {
  const layers = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {layers.map((_, i) => {
        const delay = i * 0.3; // small phase shift for variety
        const opacity = intensity * (0.6 + Math.random() * 0.4);

        return (
          <motion.div
            key={i}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200/10 to-transparent mix-blend-overlay"
            animate={{
              y: ["0%", "-10%", "0%"],
              opacity: [0.1, opacity, 0.1],
            }}
            transition={{
              duration: 6 / speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}

      {/* Soft horizontal shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/10 to-transparent mix-blend-overlay"
        animate={{
          x: ["0%", "5%", "0%"],
          opacity: [intensity * 0.4, intensity * 0.8, intensity * 0.4],
        }}
        transition={{
          duration: 8 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle wave distortion */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0, rgba(255,255,255,0) 10px)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [intensity * 0.3, intensity * 0.6, intensity * 0.3],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 10 / speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
