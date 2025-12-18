import { motion } from "motion/react";
import type { ReactNode } from "react";
interface PropType {
  index: number;
  step: {
    title: string;
    description: string;
    icon: ReactNode;
  };
}

type PolygonShapeType = Record<number, string>;

const polygonShape: PolygonShapeType = {
  0: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)",
  1: "polygon(10% 0%, 80% 0%, 100% 100%, 0% 100%)",
  2: "polygon(10% 0%, 80% 0%, 100% 100%, 0% 100%)",
  3: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
};

export function Card({ index, step }: PropType) {
  return (
    <>
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        whileHover={{ scale: 1.1 }}
        className="bg-box cursor-pointer p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        style={{
          clipPath: polygonShape[index],
        }}
      >
        {step.icon}
        <h3 className="text-lg font-semibold mt-4">{step.title}</h3>
        <p className="text-sm mt-2">{step.description}</p>
      </motion.div>
    </>
  );
}

// clip-path: polygon(
//     10% 0%,   /* top-left corner inset */ 0% 0%
//     90% 0%,   /* top-right */
//     100% 80%, /* bottom-right */   100% 100%
//     0% 100%   /* bottom-left */
//   );

//  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" full container
