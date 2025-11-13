import { Button } from "@repo/ui/components/ui/Button";
import { Plus } from "lucide-react";
import { ThemeCard } from "@repo/ui/components/ui/ThemeCard";
import { THEMES } from "./themesData";
import { useNavigate } from "react-router-dom";
export default function ThemesPage() {
  const navigate = useNavigate();

  function navigation(id: string) {
    navigate(`/theme/${id}`);
  }
  return (
    <>
      <div className="text-primary">
        {/* first section  */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Happy To See You! Zassica</h1>
          <Button variant="primary" onClick={() => {}}>
            Add Quiz <Plus />
          </Button>
        </div>
        {/* second section  */}
        <div className="p-6 flex gap-6 flex-wrap gap-y-6 gap-x-10">
          {THEMES.map((theme, index) => (
            <div key={index}>
              <ThemeCard theme={theme} navigation={navigation} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
