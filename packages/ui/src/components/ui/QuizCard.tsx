import {
  Bookmark,
  CircleQuestionMark,
  Clock10,
  StarIcon,
  UsersRound,
} from "lucide-react";
import { Button } from "./Button";

interface QuizPropType {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  thumbnails: string;
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
    }[],
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
      <div className="bg-[#ffffff] rounded-xl hover:shadow-[0_20px_50px_rgba(59,20,42,0.08)] overflow-hidden cursor-pointer transition-all duration-300 group">
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={quiz.thumbnails}
            alt="Quiz Thumbnail"
            className="w-full h-full object-cover group-hover:scale-[1.5] transition-transform duration-500"
          />
          <div
            className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase  ${
              quiz.difficulty === "easy" ? "bg-white/90 text-primary" : ""
            } ${
              quiz.difficulty === "medium" ? "bg-primary text-white/90" : ""
            } ${quiz.difficulty === "hard" ? "bg-pink text-white/90" : ""}`}
          >
            Easy
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-lg font-bold text-primary mb-2 truncate">
            {quiz.title}
          </h3>
          <p className="text-[#504448]/70 text-sm mb-6">
            Test your knowledge on 21st-century skyscrapers and sustainable
            design.
          </p>
          <div className="flex justify-between text-[#3b142a]/60 text-sm font-medium mb-3">
            <div className="flex items-center gap-1">
              <CircleQuestionMark className="w-4 h-4 group-hover:text-pink" />
              <span> {quiz._count.questions} Qs</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock10 className="w-4 h-4 group-hover:text-pink" />
              <span>{quiz._count.questions * 10} Sec</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[#3b142a]/60 text-sm font-medium mb-3">
            <div className="flex items-center gap-1">
              <UsersRound className="w-4 h-4 group-hover:text-pink" />
              <span>{players === 0 ? "No" : players} Players</span>
            </div>

            <span className="flex gap-1 items-center ">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
              4.8
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button>
                <Bookmark className="w-6 h-6" />
              </button>
            </div>
            <button className="bg-pink shadow-lg hover:shadow-pink/30 text-white flex items-center gap-2 px-6 py-2.5 rounded-full font-label text-xs font-bold transition-all active:scale-95">
              See Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
