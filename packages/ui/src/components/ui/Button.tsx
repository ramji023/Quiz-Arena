import type { ReactNode } from "react";
import { motion } from "motion/react";
interface ButtonProp {
  children: ReactNode;
  variant: string;
  type?: "button" | "submit";
  onClick: () => void;
}

type variantStyleType = Record<string, string>;
const variantStyle: variantStyleType = {
  primary: "bg-pink text-white ",
  secondary: "hover:text-pink text-secondary ",
  other: "bg-secondary text-primary hover:bg-card",
};

const defaultStyle =
  "px-4 py-2 cursor-pointer rounded-md outline-none flex items-center gap-2";
export function Button({ children, variant, type, onClick }: ButtonProp) {
  return (
    <>
      <motion.button
        type={type}
        whileHover={{ scale: 1.1 }}
        className={`${defaultStyle} ${variantStyle[variant]}`}
        onClick={() => {
          onClick();
        }}
      >
        {children}
      </motion.button>
    </>
  );
}
