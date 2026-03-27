import { useNavigate, useParams } from "react-router-dom";
import {
  MoveLeft,
  Calendar,
  Users,
  ListChecks,
  Trophy,
  Share2,
  Eye,
  Clock,
  Target,
  Triangle,
  Share,
  Earth,
  CircleQuestionMark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  FirstRank,
  SecondRank,
  ThirdRank,
} from "@repo/ui/components/icons/Badges";
import { useState } from "react";
import { useGetHostQuiz } from "../../queries/reactQueries";
import { Button } from "@repo/ui/components/ui/Button";
import HostQuizSkeleton from "../LoadingComponents/HostQuizSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";

export default function QuizResults() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // get the quiz id from params
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  // call react query to get hosted quiz data
  const query = useGetHostQuiz(quizId);
  const { data, isLoading, error } = useShowLoader(query, 600);
  const setError = useErrorStore((s) => s.setError);
  // const { quiz, gameStats, leaderboard } = mockResultsData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <FirstRank />;
    if (rank === 2) return <SecondRank />;
    if (rank === 3) return <ThirdRank />;
    return rank;
  };

  if (!quizId) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Hosted Quizzes",
    );
    return <ErrorPage />;
  }
  if (isLoading) {
    return (
      <>
        <HostQuizSkeleton />
      </>
    );
  }
  if (error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Hosted Quizzes",
    );
    return <ErrorPage />;
  }
  if (data) {
    const leaderboard = data.players
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
      }));
    const displayedLeaderboard = showAllPlayers
      ? leaderboard
      : leaderboard.slice(0, 5);
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* first Section */}
          <div
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#3b142a]/5 transitions-colors"
          >
            <MoveLeft size={30} strokeWidth={1.5} />
          </div>
          {/* header section  */}
          <div className="flex items-start justify-between mb-6 mt-6">
            <div className="flex flex-col">
              <div>
                <span className="text-primary font-logo-secondary font-bold text-4xl tracking-tight">
                  Performance Insights
                </span>
                <p className="text-[#504448] mt-2 font-body text-lg">
                  Detailed breakdown of your session with real-time participant
                  data.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary border border-[#d3c2c8]/20  hover:bg-[#f0eee5] transition-colors text-sm font-semibold">
                <span>
                  <Share2 />
                </span>
                Share Analytics
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#e7e3ce] border border-[#d3c2c8]/20  hover:opacity-90 transition-opacity text-sm font-semibold">
                <span>
                  <Share2 />
                </span>
                Re-Play
              </button>
            </div>
          </div>

          {/* Quiz overview card  */}
          <section className="mt-10 mb-10 bg-[#f0eee5]  rounded-xl p-8 shadow flex flex-col md:flex-row gap-8 items-center border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-[0.03] rounded-full -mr-20 -mt-20"></div>
            <div className="shrink-0 relative">
              <img
                src={data.thumbnails}
                alt={data.title}
                className="w-64 h-48 object-cover rounded-xl shadow-inner"
              />
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex items-center gap-4">
                <h2 className="font-logo-secondary text-3xl font-bold text-primary">
                  {data.title}
                </h2>
                <span className="px-3 py-1 bg-white text-[#504448] border border-[#d3c2c8]/30 rounded-full text-xs font-bold tracking-wide uppercase">
                  {data.difficulty}
                </span>
              </div>
              <p className="font-body text-[#504448] max-w-2xl leading-relaxed">
                {data.description}
              </p>
              <div className="flex gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-pink">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {" "}
                    {formatDate(data.start_date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {" "}
                    {data.totalQuestions * 10} Sec. Duration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink ">
                    <CircleQuestionMark className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-semibold text-primary">
                    {data.totalQuestions} Questions
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* stats overview section  */}
          <section className="mt-10 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow border-none hover:translate-y-[-4px] transition-transform duration-300">
              <p className="text-[#504448] text-sm font-medium tracking-wide mb-2 uppercase">
                Total Participants
              </p>
              <div className="flex items-end justify-between">
                <h1 className="font-logo-secondary text-4xl font-bold text-primary">
                  {data.stats.totalPlayers}
                </h1>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow border-none hover:translate-y-[-4px] transition-transform duration-300">
              <p className="text-[#504448] text-sm font-medium tracking-wide mb-2 uppercase">
                Average Accuracy
              </p>
              <div className="flex items-end justify-between">
                <h1 className="font-logo-secondary text-4xl font-bold text-primary">
                  {data.stats.averagePercentage}%
                </h1>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow border-none hover:translate-y-[-4px] transition-transform duration-300">
              <p className="text-[#504448] text-sm font-medium tracking-wide mb-2 uppercase">
                Completion Rate
              </p>
              <div className="flex items-end justify-between">
                <h1 className="font-logo-secondary text-4xl font-bold text-primary">
                  {data.stats.averageScore}%
                </h1>
              </div>
            </div>
          </section>

          {/* leaderboard section  */}

          <section className="mt-10 mb-10 space-y-6">
            <div className="font-logo-secondary text-2xl font-bold text-primary">
              Global Leaderboard
            </div>
            <div className="bg-[#f6f4eb] rounded-xl overflow-hidden border border-[#d3c2c8]/10 ">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eae8df]">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                      Rank
                    </th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                      Player name
                    </th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                      Score
                    </th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                      Correct answer
                    </th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-[#504448] ">
                      Accuracy%
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d3c2c8]/10">
                  {displayedLeaderboard.map((player, index) => (
                    <tr
                      key={index}
                      className="bg-[#e7e3ce]/5 hover:bg-[#fbf9f0] transition-colors group"
                    >
                      <td className="px-8 py-6 font-logo-secondary font-bold text-lg text-primary">
                        <div>
                          <span className="text-primary">
                            {" "}
                            {getRankBadge(player.rank)}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 ">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {player.fullName.charAt(0)}
                          </div>
                          <p className="font-bold text-primary">
                            {player.fullName}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-semibold text-primary">
                        {player.score} pts
                      </td>
                      <td className="px-8 py-6 font-medium text-[#504448]">
                        15/15
                      </td>
                      <td className="px-8 py-6 ">
                        <div className="flex items-center gap-2">
                          <div className="flex-grow w-24 h-1.5 bg-[#e7e3ce] rounded-full overflow-hidden">
                            <div
                              style={{ width: `${player.percentage}%` }}
                              className="h-full bg-pink"
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-primary">
                            {player.percentage}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-[#eae8df]/50 px-8 py-6 flex justify-between items-center">
                <p className="text-xs font-bold text-[#504448] uppercase tracking-wider">
                  Showing 4 of 42 sessions
                </p>
                <div className="flex gap-2 text-xs font-bold">
                  <button className="w-8 h-8 rounded bg-white border border-[#d3c2c8]/20 flex items-center justify-center text-primary disabled:opacity-30">
                    <span>
                      <ChevronLeft />
                    </span>
                  </button>
                  <button className="w-8 h-8 rounded bg-primary border flex items-center justify-center text-white ">
                    1
                  </button>
                  <button className="w-8 h-8 rounded bg-white border border-[#d3c2c8]/20 flex items-center justify-center text-primary transition-colors hover:bg-[#fbf9f0]">
                    2
                  </button>
                  <button className="w-8 h-8 rounded bg-white border border-[#d3c2c8]/20 flex items-center justify-center text-primary disabled:opacity-30">
                    <span>
                      <ChevronRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
