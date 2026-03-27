import {
  Bookmark,
  CalendarDays,
  CircleQuestionMark,
  ListFilter,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";
import { HostQuizzes } from "../../types/quizForm";
import { useGetAllHostedQuiz } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
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
        <div className="text-text-body py-3">
          <SubSection />
          <QuizMetricsSection />
          {data.length === 0 ? (
            <>
              <div className=" text-2xl text-center">
                You haven't played any Quiz yet.
              </div>
            </>
          ) : (
            <>
              {/* filter section  */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-[#eae8df] rounded-lg text-sm font-semibold text-primary flex items-center gap-2 border border-[#d3c2c8]/40 hover:bg-[#f0eee5 transition-colors] ">
                    <span>
                      <ListFilter />
                    </span>{" "}
                    All Sessions
                  </button>
                  <button className="px-4 py-2 bg-[#eae8df] rounded-lg text-sm font-semibold text-primary flex items-center gap-2 border border-[#d3c2c8]/40 hover:bg-[#f0eee5 transition-colors] ">
                    <span>
                      <CalendarDays />
                    </span>{" "}
                    Last 30 Days
                  </button>
                </div>
              </div>

              {/* sessions data  */}
              <div className="bg-[#f6f4eb] rounded-xl overflow-hidden border border-[#d3c2c8]/10 ">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#eae8df]">
                      <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                        Quiz Title
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                        Date Hosted
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                        Players
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                        Avg. Accuracy
                      </th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d3c2c8]/10">
                    {data.map((quiz, index) => (
                      <tr className="bg-white hover:bg-[#fbf9f0] transition-colors group">
                        <td className="px-8 py-6 ">
                          <div>
                            <p className="font-bold text-primary leading-tight">
                              {quiz.quiz_id.title}
                            </p>
                            <p className="text-xs text-[#504448] mt-1">
                              {" "}
                              Difficculty: {quiz.quiz_id.difficulty} .{" "}
                              {quiz.quiz_id._count.questions} Questions
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-6 text-sm text-[#504448] ">
                          {new Date(quiz.start_date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          <br />
                          <span className="text-[10px] opacity-60">
                            {new Date(quiz.start_date).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-6 ">
                          <span className="text-sm font-bold text-primary">
                            {quiz.quiz_id._count.questions}
                          </span>
                        </td>
                        <td className="px-6 py-6 ">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-sm font-bold text-primary">
                              68%
                            </span>
                            <div className="w-24 h-1.5 bg-[#e7e3ce] rounded-full overflow-hidden">
                              <div className="h-full bg-[#ffd9e4] w-[68%]"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 ">
                          <button
                            onClick={() => {
                              navigation(quiz.id);
                            }}
                            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-[#1f0113] transition-colors active:scale-95"
                          >
                            View Result
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div></div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

function SubSection() {
  return (
    <>
      <div className="py-5">
        <div className="mb-16 relative">
          <div className="absolute -left-8 top-0 w-1 h-28 bg-pink"></div>
          <h2 className="font-logo-secondary font-bold text-5xl text-primary mb-4 tracking-tight">
            Hosted Quizzes
          </h2>
          <p className="max-w-md leading-relaxed ">
            Track Performance and engagement from your live arenas. Review
            historical data to improve your next session.
          </p>
        </div>
      </div>
    </>
  );
}

function QuizMetricsSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 transition-colors duration-500">
        <div className="bg-white p-6 rounded-xl shadow-sm hover:border-l-4 hover:border-[#ffd9e4] transition-transform duration-500">
          <p className="text-sm font-bold text-[#504448] uppercase tracking-wider mb-1">
            Total Sessions
          </p>
          <p className="text-3xl font-headline font-bold text-primary">42</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm hover:border-l-4 hover:border-[#ffd9e4] ">
          <p className="text-sm font-bold text-[#504448] uppercase tracking-wider mb-1">
            Total Players
          </p>
          <p className="text-3xl font-headline font-bold text-primary">1,284</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm hover:border-l-4 hover:border-[#ffd9e4] ">
          <p className="text-sm font-bold text-[#504448] uppercase tracking-wider mb-1">
            Avg. Accuracy
          </p>
          <p className="text-3xl font-headline font-bold text-primary">76.4%</p>
        </div>
        <div className="bg-primary p-6 rounded-xl shadow-lg relative group overflow-hidden ">
          <p className="text-sm font-bold text-[#e7e3ce] uppercase tracking-wider mb-1">
            Live Now
          </p>
          <p className="text-3xl font-headline font-bold text-white">
            2 Arenas
          </p>
        </div>
      </div>
    </>
  );
}

// function HostQuizzesTable({
//   quiz,
//   navigation,
// }: {
//   quiz: HostQuizzes;
//   navigation: (id: string) => void;
// }) {
//   return (
//     <>
//       {/* filter section  */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex gap-4">
//           <button className="px-4 py-2 bg-[#eae8df] rounded-lg text-sm font-semibold text-primary flex items-center gap-2 border border-[#d3c2c8]/40 hover:bg-[#f0eee5 transition-colors] ">
//             <span>
//               <ListFilter />
//             </span>{" "}
//             All Sessions
//           </button>
//           <button className="px-4 py-2 bg-[#eae8df] rounded-lg text-sm font-semibold text-primary flex items-center gap-2 border border-[#d3c2c8]/40 hover:bg-[#f0eee5 transition-colors] ">
//             <span>
//               <CalendarDays />
//             </span>{" "}
//             Last 30 Days
//           </button>
//         </div>
//       </div>

//       {/* sessions data  */}
//       <div className="bg-[#f6f4eb] rounded-xl overflow-hidden border border-[#d3c2c8]/10 ">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-[#eae8df]">
//               <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
//                 Quiz Title
//               </th>
//               <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
//                 Date Hosted
//               </th>
//               <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
//                 Players
//               </th>
//               <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
//                 Avg. Accuracy
//               </th>
//               <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-[#d3c2c8]/10">
//             <tr className="bg-white hover:bg-[#fbf9f0] transition-colors group">
//               <td className="px-8 py-6 ">
//                 <div>
//                   <p className="font-bold text-primary leading-tight">
//                     Advance Quantum Theory
//                   </p>
//                   <p className="text-xs text-[#504448] mt-1">
//                     {" "}
//                     Difficculty: Hard . 20 Questions
//                   </p>
//                 </div>
//               </td>
//               <td className="px-6 py-6 text-sm text-[#504448] ">
//                 Oct 24, 2023
//                 <br />
//                 <span className="text-[10px] opacity-60">14:30 PM</span>
//               </td>
//               <td className="px-6 py-6 ">
//                 <span className="text-sm font-bold text-primary">124</span>
//               </td>
//               <td className="px-6 py-6 ">
//                 <div className="flex flex-col items-center gap-2">
//                   <span className="text-sm font-bold text-primary">68%</span>
//                   <div className="w-24 h-1.5 bg-[#e7e3ce] rounded-full overflow-hidden">
//                     <div className="h-full bg-[#ffd9e4] w-[68%]"></div>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-6 ">
//                 <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-[#1f0113] transition-colors active:scale-95">
//                   View Result
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div></div>
//       </div>
//     </>
//   );
// }

// function HostQuizCard({
//   quiz,
//   navigation,
// }: {
//   quiz: HostQuizzes;
//   navigation: (id: string) => void;
// }) {
//   return (
//     <>
//       <div className="bg-[#ffffff] rounded-xl hover:shadow-[0_20px_50px_rgba(59,20,42,0.08)] overflow-hidden transition-all duration-300 group cursor-pointer">
//         <div className="h-48 w-full overflow-hidden relative">
//           <img
//             src={quiz.quiz_id.thumbnails}
//             alt="Quiz Thumbnail"
//             className="w-full h-full object-cover group-hover:scale-[1.5] transition-transform duration-500"
//           />
//         </div>

//         <div className="px-6 py-4">
//           <h3 className="text-lg font-bold text-primary mb-2 truncate">
//             {quiz.quiz_id.title}
//           </h3>
//           <p className="text-[#504448]/70 text-sm mb-6">
//             Test your knowledge on 21st-century skyscrapers and sustainable
//             design.
//           </p>

//           <div className="flex items-center justify-between text-[#3b142a]/60 text-sm font-medium mb-3">
//             <div className="flex items-center gap-1">
//               <UsersRound className="w-4 h-4 group-hover:text-pink" />
//               <span>
//                 {quiz._count.players === 0 ? "No" : quiz._count.players} Players
//               </span>
//             </div>

//             <span className="flex gap-1 items-center ">
//               <StarIcon className="w-3.5 h-3.5 fill-yellow-500 stroke-yellow-500" />{" "}
//               4.8
//             </span>
//           </div>

//           {/* Date field */}
//           <div className="text-xs text-[#3b142a]/60 mb-3">
//             Played on{" "}
//             {new Date(quiz.start_date).toLocaleString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "numeric",
//               hour: "numeric",
//               minute: "2-digit",
//             })}
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1 text-[#3b142a]/60 text-sm font-medium">
//               <CircleQuestionMark className="w-4 h-4 group-hover:text-pink" />
//               <span> {quiz.quiz_id._count.questions} Qs</span>
//             </div>
//             <button
//               onClick={() => {
//                 navigation(quiz.id);
//               }}
//               className="bg-pink shadow-lg hover:shadow-pink/30 text-white flex items-center gap-2 px-6 py-2.5 rounded-full font-label text-xs font-bold transition-all active:scale-95"
//             >
//               See Results
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
