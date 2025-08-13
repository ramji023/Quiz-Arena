interface InputProp {
  label?: string;
  placeholder: string;
  type: string;
}
export function InputBox(prop:InputProp) {
  return (
    <>
      <div className="flex flex-col gap-1 p-2 min-w-[400px]">
        <label className="text-sm font-semibold">{prop.label}</label>
        <input
          type={prop.type}
          placeholder={prop.placeholder}
          className="px-2 py-2 rounded outline-1 hover:bg-secondary-shadow"
        />
      </div>
    </>
  );
}
