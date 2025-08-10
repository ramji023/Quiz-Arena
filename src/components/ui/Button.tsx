interface ButtonProp {
  children: string;
  variant: string;
}

type variantStyleType = Record<string, string>;
const variantStyle: variantStyleType = {
  primary: "bg-purple-600 text-white hover:bg-purple-700",
  secondary: "hover:text-purple-500 ",
};

const defaultStyle = "px-4 py-2 cursor-pointer rounded-md outline-none";
export function Button({ children, variant }: ButtonProp) {
  return (
    <>
      <button className={`${defaultStyle} ${variantStyle[variant]}`}>
        {children}
      </button>
    </>
  );
}
