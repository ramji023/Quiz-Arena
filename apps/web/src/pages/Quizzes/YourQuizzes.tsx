import QuizCard from "@repo/ui/components/ui/QuizCard";
import { useGetAllYourQuizzes } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";

export default function YourQuizzes() {
  const navigate = useNavigate();
  const { isLoading, data, error } = useGetAllYourQuizzes(); // fetch all saved quizzes
  if (isLoading) {
    return (
      <>
        <div>saved Quizzes are processing</div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div>Something went wrong while fetching saved quizzes</div>
      </>
    );
  }
  function navigation(id: string) {
    navigate(`/home/quiz/${id}`);
  }
  if (data) {
    return (
      <>
        <div className="text-primary ">
          {data.length === 0 ? (
            <>
              <div className=" text-2xl text-center">
                You haven't created any Quiz yet.
              </div>
            </>
          ) : (
            <>
              {/* if there is quiz available  */}
              <div className="flex items-center flex-wrap p-6 gap-y-5 gap-x-10">
                {data.map((quiz, index) => (
                  <QuizCard key={index} quiz={quiz} navigation={navigation} />
                ))}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}
