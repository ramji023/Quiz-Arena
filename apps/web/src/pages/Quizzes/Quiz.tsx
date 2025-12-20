import { useNavigate, useParams } from "react-router-dom";
import { MoveLeft, Triangle, Star, User, ListChecks } from "lucide-react";
import { useGetQuiz } from "../../queries/reactQueries";
import { useQuizStore } from "../../stores/quizStore";
import { type Quiz } from "../../types/quizForm";
import { Button } from "@repo/ui/components/ui/Button";
import useShowLoader from "../../hooks/useShowLoader";
import QuizSkeleton from "../LoadingComponents/QuizSkeleton";
import useErrorStore from "../../stores/errorStore";
import ErrorPage from "../ErrorPages/ErrorPage";

export default function Quiz() {
  const navigate = useNavigate();
  const setError = useErrorStore((s) => s.setError);
  const setQuiz = useQuizStore((s) => s.setQuiz);
  const quizId = useParams().quizId;
  console.log(quizId);
  const query = useGetQuiz(quizId);
  const { data, isLoading, error } = useShowLoader(query, 600);
  if (!quizId || error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Quizzes"
    );
    return <ErrorPage />;
  }

  if (isLoading) return <QuizSkeleton />;
  if (data) {
    function setSelectedQuiz(data: Quiz) {
      setQuiz(data);
      navigate("/home/themes");
    }
    return (
      <div className="mx-20">
        {/* Header with Back + Play buttons */}
        <div className="flex items-center justify-between mb-6">
          <div
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-bg transition"
          >
            <MoveLeft size={30} strokeWidth={1.5} />
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setSelectedQuiz(data);
            }}
          >
            Play
            <Triangle className="rotate-90" size={15} />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center">
          {/* Title & Description */}
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-bold mb-1">{data.title}</h1>
            <p className="text-gray-600 break-words text-sm max-w-xl">
              {data.description}
            </p>
          </div>

          {/* Quiz Metadata */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />{" "}
              <span>
                Created by: <strong>{data.createdBy.username}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ListChecks size={16} />{" "}
              <span>
                Questions: <strong>{data.questions.length}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span>4.8 / 5</span>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 w-full max-w-2xl">
            {data.questions.map((q, index) => (
              <div key={index} className="border-l-4 border-pink-300 pl-4">
                <h2 className="font-semibold text-lg mb-2 flex flex-wrap justify-between items-center gap-2">
                  <span className="flex-1 min-w-0 break-words">
                    {index + 1}. {q.question}
                  </span>
                  <span className="text-xs font-extralight text-gray-500 whitespace-nowrap">
                    (points: {q.points})
                  </span>
                </h2>

                <ul className="space-y-1">
                  {q.options.map((option, i) => {
                    return (
                      <li
                        key={i}
                        className={`flex items-center gap-2 ${
                          option.isCorrect
                            ? "text-pink-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{option.text}</span>
                        {option.isCorrect && (
                          <span className="text-pink-600">✔</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
