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
} from "lucide-react";
import {
  FirstRank,
  SecondRank,
  ThirdRank,
} from "@repo/ui/components/icons/Badges";
import { useState } from "react";
import { useGetHostQuiz } from "../../queries/reactQueries";

export default function QuizResults() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const { data, isLoading, error } = useGetHostQuiz(quizId);

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

  if (isLoading) {
    return (
      <>
        <div>Quizzes are processing</div>
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
      <div className="min-h-screen bg-secondary p-6">
        <div className="max-w-6xl mx-auto">
          {/* first Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-[#e8e2c7] transition">
              <MoveLeft size={30} strokeWidth={2.5} />
            </div>

            <button className="flex gap-2 items-center cursor-pointer justify-center bg-pink text-white px-4 py-2 rounded-md font-medium hover:bg-pink-600 transition">
              Re-Play
              <Triangle className="rotate-90" size={15} />
            </button>
          </div>

          {/* Quiz Summary Card */}
          <div className="bg-white overflow-hidden mb-8">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Thumbnail */}
              <div className="md:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop"
                  alt={data.title}
                  className="w-full h-full object-cover min-h-[250px]"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2 p-8">
                {/* Title & Description */}
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary mb-2">
                      {data.title}
                    </h1>
                    <span
                      className={`${
                        data.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : ""
                      } ${
                        data.difficulty === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      } ${
                        data.difficulty === "hard"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }  px-2 py-0.5 rounded-full text-sm`}
                    >
                      {data.difficulty}
                    </span>
                  </div>

                  <p className="text-primary-shadow text-sm leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Date Played */}
                  <div className="bg-secondary rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                    <div className="bg-pink/10 p-2 rounded-lg">
                      <Calendar size={18} className="text-pink" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-primary-shadow font-medium mb-1">
                        Date Played
                      </p>
                      <p className="text-sm font-semibold text-primary truncate">
                        {formatDate(data.start_date)}
                      </p>
                    </div>
                  </div>

                  {/* Total Players */}
                  <div className="bg-secondary-shadow rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                    <div className="bg-pink/10 p-2 rounded-lg">
                      <Users size={18} className="text-pink" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary-shadow font-medium mb-1">
                        Total Players
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {data.stats.totalPlayers}
                      </p>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="bg-secondary-shadow rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                    <div className="bg-pink/10 p-2 rounded-lg">
                      <ListChecks size={18} className="text-pink" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary-shadow font-medium mb-1">
                        Questions
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {data.totalQuestions}
                      </p>
                    </div>
                  </div>

                  {/* Average Score */}
                  <div className="bg-secondary-shadow rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                    <div className="bg-pink/10 p-2 rounded-lg">
                      <Target size={18} className="text-pink" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary-shadow font-medium mb-1">
                        Average Score
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {data.stats.averageScore}%
                      </p>
                    </div>
                  </div>

                  {/* Your Score (if player) */}
                  {data.stats.averagePercentage && (
                    <div className="bg-secondary-shadow rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                      <div className="bg-pink/20 p-2 rounded-lg">
                        <Trophy size={18} className="text-pink" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-primary-shadow  font-medium mb-1">
                          Average Percentage
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {data.stats.averagePercentage}%
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Total Time */}
                  <div className="bg-secondary-shadow rounded-lg p-3 flex items-start gap-3 hover:bg-pink/10 hover:outline-2 hover:outline-pink">
                    <div className="bg-pink/10 p-2 rounded-lg">
                      <Clock size={18} className="text-pink" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-primary-shadow font-medium mb-1">
                        Total Time
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {data.totalQuestions * 10} Sec.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-card p-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy size={28} className="text-primary" />
                <h2 className="text-2xl font-bold text-primary">Leaderboard</h2>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary text-primary text-sm font-semibold">
                    <th className="py-4 px-6 text-left">Rank</th>
                    <th className="py-4 px-6 text-left">Player</th>
                    <th className="py-4 px-6 text-center">Score</th>
                    <th className="py-4 px-6 text-center">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedLeaderboard.map((player, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-secondary-shadow/50 transition-colors ${
                        player.rank <= 3 ? "bg-secondary-shadow/60" : ""
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold`}>
                            {getRankBadge(player.rank)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink to-primary flex items-center justify-center text-white font-semibold">
                            {player.fullName.charAt(0)}
                          </div>
                          <span className="font-medium text-primary">
                            {player.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-block text-pink font-semibold px-4 py-1 rounded-full ${player.rank <= 3 ? "bg-pink/10" : ""}`}
                        >
                          {player.score}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-primary-shadow font-medium">
                          {player.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Show More Button */}
            {leaderboard.length > 5 && (
              <div className="p-4 bg-secondary-shadow/30 text-center">
                <button
                  onClick={() => setShowAllPlayers(!showAllPlayers)}
                  className="text-primary hover:text-pink font-medium text-sm transition-colors"
                >
                  {showAllPlayers
                    ? "Show Less"
                    : `Show All ${leaderboard.length} Players`}
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-9">
            <button
              onClick={() => navigate(`/home/quiz/${data.quizid}`)}
              className="flex gap-2 items-center cursor-pointer justify-center bg-pink text-white px-4 py-2 rounded-md font-medium hover:bg-pink-600 transition"
            >
              <Eye size={20} />
              View Full Quiz
            </button>

            <button className="flex gap-2 items-center cursor-pointer justify-center bg-pink text-white px-4 py-2 rounded-md font-medium hover:bg-pink-600 transition">
              <Share2 size={20} />
              Share Result
            </button>
          </div>
        </div>
      </div>
    );
  }
}
