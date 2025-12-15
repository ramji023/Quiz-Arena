import { Bookmark, StarIcon } from "lucide-react";

interface QuizPropType {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  id: string;
  _count: {
    questions: number;
  };
  hostedQuizzes: {
    _count: {
      players: number;
    };
  }[];
}
export default function QuizCard({
  quiz,
  navigation,
}: {
  quiz: QuizPropType;
  navigation: (id: string) => void;
}) {
  // calculate number of players
  function calculatePlayers(
    allPlayer: {
      _count: {
        players: number;
      };
    }[]
  ) {
    let sum = 0;
    for (const p of allPlayer) {
      sum += p._count.players;
    }
    return sum;
  }
  const players = calculatePlayers(quiz.hostedQuizzes);
  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden w-60 cursor-pointer">
        <img
          src="https://placehold.co/600x400/png"
          alt="Quiz Thumbnail"
          className="w-full h-25 object-cover"
        />

        <div className="p-4">
          <h3 className="text-md font-semibold mb-2 truncate">{quiz.title}</h3>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{quiz._count.questions} Questions</span>
            {/* <span>{quiz.timePerQuestion}/Q</span> */}
            <span
              className={`${
                quiz.difficulty === "easy" ? "bg-green-100 text-green-800" : ""
              } ${
                quiz.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              } ${
                quiz.difficulty === "hard" ? "bg-red-100 text-red-800" : ""
              }  px-2 py-0.5 rounded-full text-xs`}
            >
              {quiz.difficulty}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <span>{players === 0 ? "No" : players} Players</span>
            <span className="flex gap-1 items-center ">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
              4.8
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                navigation(quiz.id);
              }}
              className="bg-pink text-white px-3 py-1 rounded-md hover:bg-pink-600 text-sm"
            >
              See details
            </button>
            <div className="flex gap-2">
              <button>
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
