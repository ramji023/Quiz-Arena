import { useNavigate, useParams } from "react-router-dom";
import { Clock, Play, CircleCheck, ChevronDown } from "lucide-react";
import { useGetQuiz } from "../../queries/reactQueries";
import { useQuizStore } from "../../stores/quizStore";
import { type Quiz } from "../../types/quizForm";
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
      "Something went wrong while processing Quizzes",
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
      <div className="mx-15 my-10">
        {/* quiz general information  */}
        <section className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="w-full md:w-5/12 aspect-square rounded-2xl overflow-hidden bg-[#eae8df] shadow-xl rotate-[-1deg]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2kmXRChhCyWKl-fs-D3VfhsnRHA7Ml0E8_XZG5TWDVwbF5wfpFXurclrf-qVHG-Oj1rOH-JVc62RyROdEIBm7i-XKxVEculm_pYJrlahI01Az6x9ErsvUxYe-Hlgf1hN9IJiZ0amaL2k7jhuDCzyzt3Xh1at4bq5KBAs2dFKw5CnbjspEKm4f6cXwMam6TtGXcJ-GvTmcB147tw1pcAW7LBrGtxeX5n3z-1TZZbf9FSIT1Pgzby8uXUTGvdLenZ4aeW2ZPxIcR8g"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-8/12 flex flex-col pt-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-full bg-[#e7e3ce] text-[#676554] text-xs font-bold tracking-widest uppercase">
                {data.difficulty}
              </span>
              <span className="text-[#504448] text-sm flex items-center gap-1">
                <span>
                  <Clock className="w-4 h-4" />
                </span>
                15 Mins
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-logo-secondary font-bold text-primary leading-tight mb-6">
              {data.title}
            </h1>
            <p className="text-lg text-[#504448] font-body leading-relaxed mb-8 max-w-xl">
              {data.description}
            </p>
            <div className="mb-10">
              <p className="text-xs text-[#504448] uppercase tracking-wider font-bold">
                Created by
              </p>
              <p className="text-pink font-semibold">
                {data.createdBy.username}
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  setSelectedQuiz(data);
                }}
                className="px-10 py-4 rounded-full bg-[#ff319f] text-white font-bold text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#ff319f]/20 flex items-center gap-3"
              >
                <span>
                  <Play className="fill-white" />
                </span>
                Host Quiz
              </button>
            </div>
          </div>
        </section>
        {/* questions list */}
        <section className="space-y-12">
          <div className="flex justify-between items-end mb-8 border-b border-[#e4e3da] pb-6">
            <div>
              <h2 className="text-3xl font-logo-secondary font-bold text-primary">
                Question Breakdown
              </h2>
              <p className="text-[#504448]">
                {data.questions.length} Questions total •{" "}
                {data.questions.length * 10} Points possible
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* question box  */}
            {data.questions.map((q, index) => (
              <article
                key={index}
                className="group bg-[#f6f4eb] p-8 rounded-2xl hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-[#8c0053] tracking-widest uppercase">
                      {q.points} points
                    </span>
                  </div>
                </div>
                <h1 className="text-2xl font-headline font-semibold text-primary-container mb-8 leading-snug">
                  {q.question}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((option, i) => {
                    return (
                      <div
                        key={i}
                        className={`p-5 rounded-xl flex items-center justify-between transition-colors ${
                          option.isCorrect
                            ? "bg-white border-[#ff319f]/30 text-primary font-bold shadow-sm"
                            : "bg-[#eae8df] text-[#1b1c17] group-hover:bg-[#f0eee5]"
                        }`}
                      >
                        <span>{option.text}</span>
                        {option.isCorrect && (
                          <span className="text-pink">
                            <CircleCheck />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
        {/* footer button  */}
        <div className="pt-12 flex justify-center">
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            Show All 12 Questions
            <span>
              <ChevronDown />
            </span>
          </button>
        </div>
      </div>
    );
  }
}
