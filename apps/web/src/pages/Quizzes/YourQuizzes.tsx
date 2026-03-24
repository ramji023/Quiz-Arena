import { motion } from "motion/react";
import QuizCard from "@repo/ui/components/ui/QuizCard";
import { useGetAllYourQuizzes } from "../../queries/reactQueries";
import { useNavigate } from "react-router-dom";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import useShowLoader from "../../hooks/useShowLoader";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import {
  EllipsisVertical,
  Lectern,
  Pencil,
  Play,
  Plus,
  Share,
  Signature,
  Star,
  Zap,
} from "lucide-react";
import MyQuizCard from "../../../../../packages/ui/src/components/ui/MyQuizCard";

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
                <div className="mb-12 ">
                  <AccountStatus />
                </div>
                {/* if there is quiz available  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.map((quiz, index) => (
                    <MyQuizCard key={index} quiz={quiz} navigation={navigation} />
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

function AccountStatus() {
  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl overflow-hidden group hover:scale[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img
                src="xxxx"
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 ">
                <span className="bg-[#ffd9e4] text-[#8c0053] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Active
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between bg-[#f6f4eb]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#504448] text-xs font-bold tracking-widest uppercase">
                    Update 2h ago
                  </span>
                  <span>
                    <Star className="text-pink fill-pink " />
                  </span>
                </div>
                <h3 className="font-logo-secondary text-3xl font-bold text-primary mb-2">
                  Modern Architecture 101
                </h3>
                <p className="text-[#504448] text-sm line-clamp-2 mb-6">
                  A deep dive into mid-century modern movements and their impact
                  on urban planning.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#f0eee5] p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-[#504448] opacity-60">
                      Plays
                    </p>
                    <p className="text-lg font-bold text-primary">1284</p>
                  </div>
                  <div className="bg-[#f0eee5] p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-[#504448] opacity-60">
                      Questions
                    </p>
                    <p className="text-lg font-bold text-primary">25</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <span>
                    <Lectern />
                  </span>{" "}
                  Host Session
                </button>
                <button className="p-3 bg-[#f0eee5] text-primary rounded-lg hover:bg-[#e4e3da] transition-colors">
                  <span>
                    <Pencil />
                  </span>
                </button>
                <button className="p-3 bg-[#f0eee5] text-primary rounded-lg hover:bg-[#e4e3da] transition-colors">
                  <span>
                    <EllipsisVertical />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div
            style={{
              background: "linear-gradient(135deg, #3b142a 0%, #b07993 100%)",
            }}
            className="p-8 rounded-xl text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h4 className="font-bold text-sm uppercase tracking-widest opacity-80 mb-6">
                Account Overview
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-white/70">Total Quizzes</span>
                  <span className="text-2xl font-bold font-logo-secondary">
                    14
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-white/70">Unique Players</span>
                  <span className="text-2xl font-bold font-logo-secondary">
                    4.2k
                  </span>
                </div>
                <div className="flex justify-between items-center ">
                  <span className="text-white/70">Global Rank</span>
                  <span className="text-2xl font-bold font-logo-secondary">
                    #412
                  </span>
                </div>
              </div>
            </div>
            <span className="absolute -bottom-4 -right-4 text-9xl opacity-10">
              <Signature />
            </span>
          </div>
          <div className="bg-[#f0eee5] p-8 rounded-xl border-none flex-1">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-primary">Quick Actions</h4>
              <span className="text-[#504448] ">
                <Zap />{" "}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-white transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#e7e3ce] flex items-center justify-center text-primary">
                  <span>
                    <Share />
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary">
                    Public Profile
                  </p>
                  <p className="text-[10px] text-[#504448]">
                    Share your library
                  </p>
                </div>
              </button>
              <button className="flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-white transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#e7e3ce] flex items-center justify-center text-pink">
                  <span>
                    <Play />
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-primary">Quick Game</p>
                  <p className="text-[10px] text-[#504448]">Host Quick Game</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
