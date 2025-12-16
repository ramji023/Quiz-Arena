import type { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProp {
  children: ReactNode;
  variant: string;
  type?: "button" | "submit";
  size?: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

type variantStyleType = Record<string, string>;
const variantStyle: variantStyleType = {
  primary: "bg-pink text-white hover:bg-pink/90",
  secondary: "bg-secondary text-primary hover:bg-secondary-shadow",
  outline:
    "bg-transparent outline outline-1 outline-primary text-primary hover:bg-primary hover:text-white",
};

const buttonSize: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-base",
};

const spinnerSize: Record<string, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-5 h-5 border-2",
  lg: "w-6 h-6 border-[3px]",
};

// Spinner color based on button variant
const spinnerColor: Record<string, string> = {
  primary: "border-white border-t-transparent",
  secondary: "border-primary border-t-transparent",
  outline: "border-primary border-t-transparent",
};

const defaultStyle =
  "text-base rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200";

export function Button({
  children,
  variant,
  type,
  onClick,
  size = "md",
  loading = false,
  disabled = false,
}: ButtonProp) {
  return (
    <motion.button
      type={type}
      whileHover={!loading && !disabled ? { scale: 1.05 } : {}}
      whileTap={!loading && !disabled ? { scale: 0.98 } : {}}
      className={`${defaultStyle} ${variantStyle[variant]} ${buttonSize[size]} ${
        loading || disabled
          ? "opacity-70 cursor-not-allowed "
          : " cusror-pointer "
      }`}
      onClick={() => {
        if (!loading && !disabled) {
          onClick();
        }
      }}
      disabled={loading || disabled}
    >
      {loading ? (
        <motion.div
          className={`rounded-full ${spinnerSize[size]} ${spinnerColor[variant]}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
      {children}
    </motion.button>
  );
}
