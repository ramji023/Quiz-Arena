import { ThemeCard } from "./ThemeCard";
import { THEMES } from "./themesData";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quizStore";
import { useEffect, useState } from "react";
import StartQuiz from "./StartQuiz";
export default function ThemesPage() {
  const navigate = useNavigate();
  const location = useLocation(); // send some data through navigation

  
  //navigateion function to move to "/theme/themeId" route
  function navigation(id: string) {
    navigate(`/theme/${id}`, { state: true }); // set state to true so that when we go to theme page then it will know that we have to open quiz popup model to select or reject the theme
  }

  // when player click to right arrow to select the theme then it will come back to themesPage component
  // and if state is true then just open start-quiz model to start the quiz
  useEffect(() => {
    // if state is true then again open pop-up component to start Quiz
    if (location.state !== undefined && location.state === true) {
      setOpen(true);
    }
  }, [location.state]); // befre linting []

  const setThemeId = useQuizStore((s) => s.setThemeId); // set the themeId

  const [open, setOpen] = useState(false); // controller wheather pop-up open or close

  // function to set the themeId if user click to select theme button on ThemeCard component
  function setId(id: string) {
    setThemeId(id); // set theme id
    setOpen(true); // open pop-up model to start the game
  }

  return (
    <>
      <div className="text-primary">
        <div className="px-6 mt-6 mb-0">
          <h1 className="text-base text-primary">
            Here are some in-built themes.
          </h1>
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
        {open && <StartQuiz />}
      </div>
    </>
  );
}
