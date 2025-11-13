import { Eye } from "lucide-react";

export interface ThemeData {
  id: string;
  name: string;
  textColor: Record<string, string>;
  background: Record<string, string>;
  borders: Record<string, string>;
  backgroundImage: string;
  overlayEffect: string;
  optionColor: Record<number, { from?: string; to?: string; color?: string }>;
  preview: string;
}

export function ThemeCard({
  theme,
  navigation,
  setTheme,
}: {
  theme: ThemeData;
  navigation: (id: string) => void;
  setTheme: (id: string) => void;
}) {
  return (
    <>
      <div className="w-65 bg-white shadow rounded-md ">
        <img
          src={theme.preview}
          alt=""
          className="w-full h-full rounded-t-md"
        />
        <div className="py-2">
          <h1 className="py-1 px-2 text-primary font-semibold text-md">
            {theme.name}
          </h1>
          <div className="py-1 px-2 flex justify-between items-center text-sm">
            <button
              onClick={() => setTheme(theme.id)}
              className="bg-pink cursor-pointer text-white px-2 py-2 rounded-md outline-1 outline-pink hover:bg-pink-600"
            >
              Select Theme
            </button>
            <button
              onClick={() => {
                navigation(theme.id);
              }}
              className="cursor-pointer px-2 py-2 rounded-md outline-1 outline-primary flex items-center justify-center text-primary "
            >
              <Eye className="w-5 h-5" />
              <span className="px-2">Preview</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
