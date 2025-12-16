import { Bookmark } from "lucide-react";
import { motion } from "motion/react";
import { AllQuizzes, HostQuizzes } from "../../types/quizForm";
import { useGetAllHostedQuiz } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import { Button } from "@repo/ui/components/ui/Button";

export default function HostedQuizzes() {
  const navigate = useNavigate();
  const query = useGetAllHostedQuiz(); // get all your history
  const { data, isLoading, error } = useShowLoader(query, 500);
  function navigation(id: string) {
    navigate(`/home/hostQuiz/${id}`);
  }
  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
          {[...Array(8)].map((_, i) => (
            <QuizCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>Something went wrong while fetching quizzes</div>
      </>
    );
  }
  if (data) {
    return (
      <>
        <div className="text-primary ">
          {data.length === 0 ? (
            <>
              <div className=" text-2xl text-center">
                You haven't played any Quiz yet.
              </div>
            </>
          ) : (
            <>
              <h1 className="mt-5 px-6 flex items-center justify-start">
                Here are your history of past 7 days...
              </h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* if there is quiz available  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
                  {data.map((quiz, index) => (
                    <HostQuizCard
                      key={index}
                      quiz={quiz}
                      navigation={navigation}
                    />
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </>
    );
  }
}

function HostQuizCard({
  quiz,
  navigation,
}: {
  quiz: HostQuizzes;
  navigation: (id: string) => void;
}) {
  return (
    <>
      <div className="bg-card rounded-xl shadow overflow-hidden w-60 cursor-pointer">
        <img
          src="https://placehold.co/600x400/png"
          alt="Quiz Thumbnail"
          className="w-full h-25 object-cover"
        />

        <div className="p-4">
          <h3 className="text-md font-semibold mb-2 truncate">
            {quiz.quiz_id.title}
          </h3>

          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>{quiz.quiz_id._count.questions} Questions</span>
            <span
              className={`${
                quiz.quiz_id.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : ""
              } ${
                quiz.quiz_id.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : ""
              } ${
                quiz.quiz_id.difficulty === "hard"
                  ? "bg-red-100 text-red-800"
                  : ""
              }  px-2 py-0.5 rounded-full text-xs`}
            >
              {quiz.quiz_id.difficulty}
            </span>
          </div>

          {/* Date field */}
          <div className="text-xs text-gray-400 mb-3">
            Played on{" "}
            {new Date(quiz.start_date).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>

          <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
            <span>
              {quiz._count.players === 0 ? "No" : quiz._count.players} Players
            </span>
            <span className="flex gap-1 items-center ">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
              4.8
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                navigation(quiz.id);
              }}
            >
              See Results
            </Button>
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
