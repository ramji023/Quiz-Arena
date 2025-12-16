import { motion } from "motion/react";
import QuizCard from "@repo/ui/components/ui/QuizCard";
import { useGetAllYourQuizzes } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";

export default function YourQuizzes() {
  const navigate = useNavigate();
  const setError = useErrorStore((s) => s.setError);
  const query = useGetAllYourQuizzes(); // get all your quizzes
  const { isLoading, data, error } = useShowLoader(query, 500);

  // if query is in loading state then render skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
        {[...Array(8)].map((_, i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  // if there is something wrong while processing your quizzes
  if (error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing your Quizzes"
    );
    return <ErrorPage />;
  }
  // handle navigation when user click to button see details
  function navigation(id: string) {
    navigate(`/home/quiz/${id}`);
  }
  if (data) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-primary ">
            {data.length === 0 ? (
              <>
                <div className="h-screen text-2xl text-center">
                  You haven't created any Quiz yet.
                </div>
              </>
            ) : (
              <>
                {/* if there is quiz available  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
                  {data.map((quiz, index) => (
                    <QuizCard key={index} quiz={quiz} navigation={navigation} />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </>
    );
  }
}
