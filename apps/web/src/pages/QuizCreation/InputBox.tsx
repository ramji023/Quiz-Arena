import React from "react";

interface InputProp {
  label?: string;
  placeholder: string;
  type: string;
  error?: string;
}

// use forwardRef to integrate react hook form
export const InputBox = React.forwardRef<HTMLInputElement, InputProp>(
  ({ label, placeholder, type, error, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1 p-2 min-w-[300px]">
        {label && <label className="text-sm font-semibold">{label}</label>}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="px-2 py-2 rounded outline-1 hover:bg-bg"
          {...rest}
        />
        {error && <p className="text-xs text-red-500 flex flex-row-reverse">{error}</p>}
      </div>
    );
  }
);

InputBox.displayName = "InputBox";
