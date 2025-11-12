import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LavaFlowProps {
  count?: number;
  speed?: number;
  intensity?: number;
}

export default function LavaFlow({
  count = 30,
  speed = 1,
  intensity = 0.8,
}: LavaFlowProps) {
  const [embers, setEmbers] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  const [lavaStreams, setLavaStreams] = useState<
    Array<{
      id: number;
      x: number;
      height: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    // Generate floating embers
    const newEmbers = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2 / speed,
    }));

    // Generate lava streams
    const newStreams = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: i * 16.66,
      height: 60 + Math.random() * 40,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 2 / speed,
    }));

    setEmbers(newEmbers);
    setLavaStreams(newStreams);
  }, [count, speed]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Heat Wave Distortion */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-transparent to-transparent opacity-60" />

      {/* Lava Glow Base */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(251, 146, 60, 0.3) 0%, rgba(249, 115, 22, 0.2) 30%, rgba(234, 88, 12, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          opacity: [intensity * 0.4, intensity * 0.7, intensity * 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Lava Streams */}
      {lavaStreams.map((stream) => (
        <motion.div
          key={`stream-${stream.id}`}
          className="absolute bottom-0 w-1 rounded-full blur-sm"
          style={{
            left: `${stream.x}%`,
            height: `${stream.height}%`,
            background: "linear-gradient(to top, rgba(251, 146, 60, 0.8), rgba(249, 115, 22, 0.4), transparent)",
            boxShadow: "0 0 20px rgba(251, 146, 60, 0.6)",
          }}
          animate={{
            opacity: [0.3, intensity * 0.8, 0.3],
            height: [`${stream.height}%`, `${stream.height + 20}%`, `${stream.height}%`],
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Embers */}
      {embers.map((ember) => (
        <motion.div
          key={`ember-${ember.id}`}
          className="absolute rounded-full"
          style={{
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            background: ember.size > 4 
              ? "radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(251, 146, 60, 0.8) 50%, rgba(249, 115, 22, 0) 100%)"
              : "rgba(251, 146, 60, 1)",
            boxShadow: `0 0 ${ember.size * 3}px rgba(251, 146, 60, 0.8)`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(ember.id) * 30, Math.sin(ember.id) * 50],
            opacity: [0, intensity, intensity * 0.8, 0],
            scale: [0.5, 1, 0.8, 0],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Volcanic Ash Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`ash-${i}`}
          className="absolute w-1 h-1 rounded-full bg-stone-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 30}%`,
          }}
          animate={{
            y: [0, 100, 200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 5 + i * 0.3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Lava Bubbles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute bottom-0 rounded-full blur-md"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            left: `${10 + i * 12}%`,
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.6) 0%, rgba(194, 65, 12, 0.3) 50%, transparent 100%)",
          }}
          animate={{
            y: [0, -50, -100],
            scale: [0.8, 1.2, 0.5],
            opacity: [0, intensity * 0.6, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Heat Shimmer Lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`shimmer-${i}`}
          className="absolute h-px w-full"
          style={{
            top: `${20 + i * 15}%`,
            background: "linear-gradient(90deg, transparent, rgba(251, 146, 60, 0.2), transparent)",
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
