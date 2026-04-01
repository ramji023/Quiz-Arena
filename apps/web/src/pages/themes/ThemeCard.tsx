import { Button } from "@repo/ui/components/ui/Button";
import { Edit, Eye, Play } from "lucide-react";

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
      <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer p-2 hover:outline-3 hover:outline-pink">
        <div className="h-48 relative overflow-hidden">
          <img
            src={theme.preview}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="p-2 flex flex-col gap-4">
          <div>
            <h1 className="font-logo-secondary text-2xl font-bold text-primary">
              {" "}
              {theme.name}
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme(theme.id)}
              className="bg-primary flex-1 hover:opacity-90 text-[#e7e3ce] flex items-center justify-center  gap-2  py-2.5 rounded-lg font-label text-sm font-bold transition-colors active:scale-95 group-hover:bg-pink group-hover:text-white"
            >
              Select Theme
            </button>
            <button
              onClick={() => {
                navigation(theme.id);
              }}
              className="bg-[#f0eee5] flex-1 hover:bg-[#e4e3da] text-primary flex items-center justify-center gap-2  py-2.5 rounded-lg text-sm font-bold transition-colors active:scale-95"
            >
              Preview
            </button>
          </div>
        </div>
        {/* <div className="py-2">
          <h1 className="py-1 px-2 text-primary font-semibold text-md">
            {theme.name}
          </h1>
          <div className="py-1 px-2 flex justify-between items-center text-sm">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setTheme(theme.id)}
            >
              Select Theme
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigation(theme.id);
              }}
            >
              <Eye className="w-5 h-5" />
              <span className="px-2">Preview</span>
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
}
