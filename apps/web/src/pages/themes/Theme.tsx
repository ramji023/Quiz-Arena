import { THEMES } from "./themesData";
import Themes from "./ThemeWrapper";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";

export default function Theme() {
  const players = [
    { name: "Aarav", score: 1200, rank: 1 },
    { name: "Meera", score: 950, rank: 2 },
    { name: "Ravi", score: 870, rank: 3 },
    { name: "Kiran", score: 760, rank: 4 },
    { name: "Tara", score: 640, rank: 235 },
  ];

  const jungle = THEMES.find((t) => t.id === "jungle-quest")!;
  const questionData = {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Elephant", "Lion", "Tiger", "Leopard"],
  };

  return (
    <Themes themeData={jungle} players={players}>
      <QuestionCard
        questionData={questionData}
        onAnswer={(option: string) => console.log("Selected:", option)}
        optionColors={jungle.optionColors}
      />
    </Themes>
  );
}
