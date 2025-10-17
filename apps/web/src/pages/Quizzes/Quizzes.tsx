import { Button } from "@repo/ui/components/ui/Button";
import QuizCard from "@repo/ui/components/ui/QuizCard";
export const quizzes = [
  {
    title: "Ultimate JavaScript Challenge",
    questions: 15,
    timePerQuestion: "15s",
    difficulty: "Medium",
    category: "Technology",
    playersAttempted: 1245,
    rating: 4.8,
    image: "https://picsum.photos/id/1015/400/250", // static image
  },
  {
    title: "World History Trivia",
    questions: 20,
    timePerQuestion: "20s",
    difficulty: "Hard",
    category: "History",
    playersAttempted: 980,
    rating: 4.6,
    image: "https://picsum.photos/id/1025/400/250",
  },
  {
    title: "General Knowledge Blitz",
    questions: 10,
    timePerQuestion: "10s",
    difficulty: "Easy",
    category: "General Knowledge",
    playersAttempted: 2150,
    rating: 4.7,
    image: "https://picsum.photos/id/1005/400/250",
  },
  {
    title: "Football Legends Quiz",
    questions: 12,
    timePerQuestion: "12s",
    difficulty: "Medium",
    category: "Sports",
    playersAttempted: 1750,
    rating: 4.5,
    image: "https://picsum.photos/id/1041/400/250",
  },
  {
    title: "Bollywood Blockbuster Challenge",
    questions: 18,
    timePerQuestion: "15s",
    difficulty: "Medium",
    category: "Entertainment",
    playersAttempted: 1340,
    rating: 4.4,
    image: "https://picsum.photos/id/1011/400/250",
  },
  {
    title: "Space & Astronomy Facts",
    questions: 14,
    timePerQuestion: "20s",
    difficulty: "Hard",
    category: "Science",
    playersAttempted: 890,
    rating: 4.9,
    image: "https://picsum.photos/id/1022/400/250",
  },
];
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Quizzes() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-primary ">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Happy To See You! Zassica</h1>
          <Button
            variant="primary"
            onClick={() => {
              navigate("create-quiz");
            }}
          >
            Add Quiz <Plus />
          </Button>
        </div>

        {/* if there is no Quiz Available  
        <div className="flex flex-col gap-4 justify-center items-center min-h-full p-50">
          <h1 className="text-3xl ">There is no Quiz Available</h1>
          <Button variant="primary">Create your first Quiz</Button>
        </div>
        */}

        {/* if there is quiz available  */}
        <div className="flex gap-8 justify-between items-center flex-wrap p-6">
          {quizzes.map((quiz, index) => (
            <>
              <QuizCard quiz={quiz} index={index} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
