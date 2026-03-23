import { Bookmark, CircleQuestionMark, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { HostQuizzes } from "../../types/quizForm";
import { useGetAllHostedQuiz } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import { Button } from "@repo/ui/components/ui/Button";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";

export default function HostedQuizzes() {
  const navigate = useNavigate();
  const query = useGetAllHostedQuiz(); // get all your history
  const { data, isLoading, error } = useShowLoader(query, 500);
  const setError = useErrorStore((s) => s.setError);
  // navigate to HostQuiz component
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

  // if there is something wrong
  if (error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Hosted Quizzes",
    );
    return <ErrorPage />;
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div className="bg-[#ffffff] rounded-xl hover:shadow-[0_20px_50px_rgba(59,20,42,0.08)] overflow-hidden transition-all duration-300 group cursor-pointer">
        <div className="h-48 w-full overflow-hidden relative">
          <img
            src={quiz.quiz_id.thumbnails}
            alt="Quiz Thumbnail"
            className="w-full h-full object-cover group-hover:scale-[1.5] transition-transform duration-500"
          />
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg font-bold text-primary mb-2 truncate">
            {quiz.quiz_id.title}
          </h3>
          <p className="text-[#504448]/70 text-sm mb-6">
            Test your knowledge on 21st-century skyscrapers and sustainable
            design.
          </p>

          <div className="flex items-center justify-between text-[#3b142a]/60 text-sm font-medium mb-3">
            <div className="flex items-center gap-1">
              <UsersRound className="w-4 h-4 group-hover:text-pink" />
              <span>
                {quiz._count.players === 0 ? "No" : quiz._count.players} Players
              </span>
            </div>

            <span className="flex gap-1 items-center ">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
              4.8
            </span>
          </div>

          {/* Date field */}
          <div className="text-xs text-[#3b142a]/60 mb-3">
            Played on{" "}
            {new Date(quiz.start_date).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#3b142a]/60 text-sm font-medium">
              <CircleQuestionMark className="w-4 h-4 group-hover:text-pink" />
              <span> {quiz.quiz_id._count.questions} Qs</span>
            </div>
            <button
              onClick={() => {
                navigation(quiz.id);
              }}
              className="bg-pink shadow-lg hover:shadow-pink/30 text-white flex items-center gap-2 px-6 py-2.5 rounded-full font-label text-xs font-bold transition-all active:scale-95"
            >
              See Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
