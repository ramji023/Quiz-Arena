import { ReactNode } from "react";

interface ButtonProps {
  children?: string;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <>
      <button className="text-3xl bg-green-900 font-extrabold">Hello from developer side</button>
      <h1 className="text-4xl">Hello goodos</h1>
    </>
  );
};
