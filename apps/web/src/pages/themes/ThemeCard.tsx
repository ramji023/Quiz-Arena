import { Button } from "@repo/ui/components/ui/Button";
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
      <div className="w-65 bg-bg shadow rounded-md ">
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
        </div>
      </div>
    </>
  );
}
