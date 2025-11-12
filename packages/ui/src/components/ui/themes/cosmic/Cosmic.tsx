import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface CosmicStarsProps {
  count?: number;
  speed?: number;
  intensity?: number;
}

export default function CosmicStars({
  count = 50,
  speed = 1,
  intensity = 0.8,
}: CosmicStarsProps) {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
      color: string;
    }>
  >([]);

  const [nebulaClouds, setNebulaClouds] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate twinkling stars
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3 / speed,
      color: i % 3 === 0 ? "rgba(251, 191, 36, 1)" : i % 3 === 1 ? "rgba(6, 182, 212, 1)" : "rgba(255, 255, 255, 1)",
    }));

    // Generate nebula clouds
    const newClouds = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 100 + Math.random() * 200,
      delay: Math.random() * 4,
      duration: 15 + Math.random() * 10 / speed,
    }));

    setStars(newStars);
    setNebulaClouds(newClouds);
  }, [count, speed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Nebula Clouds */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size}px`,
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            background: cloud.id % 2 === 0 
              ? "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(14, 165, 233, 0.08) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(251, 146, 60, 0.12) 0%, rgba(249, 115, 22, 0.06) 40%, transparent 70%)",
          }}
          animate={{
            opacity: [0.3, intensity * 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            background: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{
            opacity: [0, intensity, intensity, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Stars */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute h-0.5 rounded-full"
          style={{
            width: "60px",
            background: "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent)",
            boxShadow: "0 0 10px rgba(6, 182, 212, 0.6)",
            left: `${30 + i * 20}%`,
          }}
          animate={{
            x: ["-100px", "1000px"],
            y: ["0px", "500px"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 / speed,
            delay: i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Orbital Rings */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="orbital-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 1)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>
        <ellipse
          cx="50%"
          cy="50%"
          rx="40%"
          ry="20%"
          fill="none"
          stroke="url(#orbital-gradient)"
          strokeWidth="1"
          opacity="0.3"
        />
        <ellipse
          cx="50%"
          cy="50%"
          rx="30%"
          ry="15%"
          fill="none"
          stroke="url(#orbital-gradient)"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>

      {/* Cosmic Dust Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-300/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
