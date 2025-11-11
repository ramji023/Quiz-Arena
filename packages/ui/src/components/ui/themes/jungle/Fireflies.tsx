import {motion} from "motion/react"
export default function Fireflies({ count = 12 }) {
  const flies = Array.from({ length: count });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {flies.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "6px",
            height: "6px",
            background:
              "radial-gradient(circle, rgba(255,255,150,1) 40%, transparent 70%)",
          }}
          animate={{
            x: [Math.random() * 100 + "vw", Math.random() * 100 + "vw"],
            y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
            opacity: [0.3, 1, 0.6],
            scale: [0.8, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
