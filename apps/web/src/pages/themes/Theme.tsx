import { useParams } from "react-router-dom";
import { THEMES } from "./themesData";
import ThemeWrapper from "./ThemeWrapper";
import QuestionCard from "@repo/ui/components/ui/themes/QuestionCard";
import useSocketStore from "../../stores/socketStore";
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
export default function Theme() {
  const role = useSocketStore((s) => s.role);
  const themeID = useParams().themeID;
  if (!themeID) return <div>something went wrong</div>;

  const jungle = THEMES.find((t) => t.id === themeID);
  if (!jungle) return <div>Theme id is not valid</div>;

  return (
    <ThemeWrapper themeData={jungle} players={players} questionId={questionData.questionId}>
      <QuestionCard
        role={role}
        questionData={questionData}
        onAnswer={(option: { text: string; isCorrect: boolean }, id: string) =>
          console.log("Selected:", option)
        }
        optionColors={jungle.optionColor}
      />
    </ThemeWrapper>
  );
}
