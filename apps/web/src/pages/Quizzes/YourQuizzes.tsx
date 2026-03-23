import { motion } from "motion/react";
import QuizCard from "@repo/ui/components/ui/QuizCard";
import { useGetAllYourQuizzes } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import { Plus } from "lucide-react";

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
      "Something went wrong while processing your Quizzes",
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
          <div className="text-text-body py-3">
            <SubSection />
            {data.length === 0 ? (
              <>
                <div className="text-2xl text-center">
                  You haven't created any Quiz yet.
                </div>
              </>
            ) : (
              <>
                {/* if there is quiz available  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

function SubSection() {
  return (
    <>
      <div className="py-5">
        <div className="flex justify-between items-end mb-16 relative">
          <div className="absolute -left-8 top-0 w-1 h-28 bg-pink"></div>
          <div>
            <h2 className="font-logo-secondary font-bold text-5xl text-primary mb-4 tracking-tight">
              My Quizzes
            </h2>
            <p className="max-w-md leading-relaxed ">
              Manage and edit your original creations. Keep your arena sharp and
              your players challenged.
            </p>
          </div>

          <button className="bg-pink text-white px-8 py-4 rounded-3xl font-bold flex items-center gap-2 shadow-xl hover:translate-y-[-2px] transition-transform active:scale-95">
            <span>
              <Plus />
            </span>{" "}
            Create New Quiz{" "}
          </button>
        </div>
      </div>
    </>
  );
}
