import { useParams } from "react-router-dom";
import { THEMES } from "./themesData";
import ThemeWrapper from "./ThemeWrapper";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import useSocketStore from "../../stores/socketStore";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import { useEffect, useState } from "react";
import ThemeLoader from "../LoadingComponents/ThemeLoader";

// sample data for players and questionData and duration
const players = [
  { id: "1", fullName: "Aarav", score: 1200 },
  { id: "2", fullName: "Meera", score: 950 },
  { id: "3", fullName: "Ravi", score: 870 },
  { id: "4", fullName: "Kiran", score: 760 },
  { id: "5", fullName: "Tara", score: 640 },
];
const questionData = {
  questionId: "1",
  points: 10,
  question: "Which animal is known as the King of the Jungle?",
  options: [
    { text: "Elephant", isCorrect: true },
    { text: "Lion", isCorrect: false },
    { text: "Tiger", isCorrect: true },
    { text: "Leopord", isCorrect: true },
  ],
};
const duration = 10;
export default function Theme() {
  const setError = useErrorStore((s) => s.setError); // function to set the error
  const role = useSocketStore((s) => s.role); // got the current role of user
  const themeID = useParams().themeID; // get the theme id from params
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  if (!themeID) {
    setError("page", "User Error", "You did not select any theme");
    return <ErrorPage />;
  }
  // function to find theme
  const theme = THEMES.find((t) => t.id === themeID);

  if (!theme) {
    setError("page", "User Error", "Theme Id is invalid");
    return <ErrorPage />;
  }

  // <---------- wait for loading theme   ---------->
  // to show loader for 500ms so theme can easily render by browser
  useEffect(() => {
    const preloadThemeAssets = async () => {
      const promises: Promise<void>[] = [];

      // Preload background images
      if (theme.backgroundImage) {
        const img = new Image();
        const imgPromise = new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
        });
        img.src = theme.backgroundImage;
        promises.push(imgPromise);
      }
      // Add more assets as needed (fonts, icons, etc.)

      try {
        // Wait for all assets to load
        await Promise.all(promises);

        // Give browser time to apply styles (minimum 500ms total)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Extra frame for paint
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsThemeLoading(false);
          });
        });
      } catch (error) {
        console.error("Error loading theme assets:", error);
        // Still hide loader even if some assets fail
        setTimeout(() => setIsThemeLoading(false), 500);
      }
    };

    preloadThemeAssets();
  }, [theme]);

  return (
    <>
      {isThemeLoading ? (
        <ThemeLoader msg="Theme is loading..." />
      ) : (
        <ThemeWrapper
          themeData={theme}
          players={players}
          questionId={questionData.questionId}
          duration={duration}
        >
          <QuestionCard
            role={role}
            questionData={questionData}
            onAnswer={(
              option: { text: string; isCorrect: boolean },
              id: string
            ) => {
              console.log("Selected:", option);
              console.log(id);
            }}
            optionColors={theme.optionColor}
          />
        </ThemeWrapper>
      )}
    </>
  );
}
