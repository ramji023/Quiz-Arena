import { Bookmark, StarIcon } from "lucide-react";

interface QuizPropType {
  quiz: {
    title: string;
    questions: number;
    timePerQuestion: string;
    difficulty: string;
    category: string;
    playersAttempted: number;
    rating: number;
    image: string;
  };
  index: number;
}
export default function QuizCard({ quiz, index }: QuizPropType) {
  return (
    <>
      <div
        key={index}
        className="bg-white rounded-xl shadow overflow-hidden w-72 cursor-pointer"
      >
        <img
          src="https://placehold.co/600x400/png"
          alt="Quiz Thumbnail"
          className="w-full h-40 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 truncate">{quiz.title}</h3>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{quiz.questions} Questions</span>
            <span>{quiz.timePerQuestion}/Q</span>
            <span
              className={`${
                quiz.difficulty === "Easy" ? "bg-green-100 text-green-800" : ""
              } ${
                quiz.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              } ${
                quiz.difficulty === "Hard" ? "bg-red-100 text-red-800" : ""
              }  px-2 py-0.5 rounded-full text-xs`}
            >
              {quiz.difficulty}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <span>{quiz.playersAttempted} Players</span>
            <span className="flex gap-1 items-center ">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
              {quiz.rating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-pink text-white px-4 py-2 rounded-md hover:bg-pink-600">
              Play Now
            </button>
            <div className="flex gap-2">
              <button>
                <Bookmark />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
