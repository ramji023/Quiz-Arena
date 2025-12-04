
import { Button } from "@repo/ui/components/ui/Button";
import { Plus } from "lucide-react";
import { ThemeCard } from "./ThemeCard";
import { THEMES } from "./themesData";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quizStore";
import { useEffect, useState } from "react";
import Popup from "./Popup";
export default function ThemesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  //write navigateion function
  function navigation(id: string) {
    navigate(`/theme/${id}`, { state: true });
  }

  useEffect(() => {
    if (location.state !== undefined && location.state === true) {
      setOpen(true);
    }
  }, [location.state]); // befre linting []
  const setThemeId = useQuizStore((s) => s.setThemeId);

  const [open, setOpen] = useState(false);
  function setId(id: string) {
    setThemeId(id);
    setOpen(true);
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
              <ThemeCard
                theme={theme}
                navigation={navigation}
                setTheme={setId}
              />
            </div>
          ))}
        </div>
        {open && <Popup />}
      </div>
    </>
  );
}
