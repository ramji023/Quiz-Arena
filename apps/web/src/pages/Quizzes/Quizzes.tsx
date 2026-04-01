import QuizCard from "@repo/ui/components/ui/QuizCard";
import { motion } from "motion/react";
import { useAuthStore } from "../../stores/authStore";
import { useGetAllQuiz } from "../../queries/reactQueries";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useSocketStore from "../../stores/socketStore";
import useWebsocket from "../../hooks/useWebsocket";
import ReconnectBox from "../playerGame/ReconnectBox";
import useShowLoader from "../../hooks/useShowLoader";
import QuizCardSkeleton from "../LoadingComponents/CardSkeleton";
import ErrorPage from "../ErrorPages/ErrorPage";
import useErrorStore from "../../stores/errorStore";
import useSuccessStore from "../../stores/SuccessStore";
import { ArrowDownWideNarrow, MoveRight, Play } from "lucide-react";
export default function Quizzes() {
  const navigate = useNavigate();
  // function to set error from useErrorStore
  const setError = useErrorStore((s) => s.setError);
  // function to set the success message from useSuccessStore
  const setMessage = useSuccessStore((s) => s.setMessage);
  // call react query to get all the quizzes
  const rawQuery = useGetAllQuiz();
  const { data, isLoading, error } = useShowLoader(rawQuery, 500);

  // <--- game logic if host refresh the game page or click to back button by mistake --------->
  // get the states from useSocketStore
  const isConnected = useSocketStore((s) => s.isConnected);
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const [openReconnectBox, setOpenReconnectBox] = useState(false); // state to manage wheather reconnect box should open or not
  const [hasCheckedReconnect, setHasCheckedReconnect] = useState(false); // state to track the state of opening and closing of reconnect box
  const tik_tik = useSocketStore((s) => s.tik_tik);
  const [wsUrl, setWsUrl] = useState<string>(""); // state to manage the websocket url to connect to
  const { setShouldConnect } = useWebsocket(wsUrl); // custom hook for managing WebSocket connection status
  // effect to make setShouldConnect to true when websocket url is set
  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true); // initiate websocket connection
    }
  }, [wsUrl, setShouldConnect]);

  // effect to navigate to /game when isConnected,websocket url,tik_tik and gameStatus are all valid
  useEffect(() => {
    if (isConnected && wsUrl && gameStatus && tik_tik) {
      // console.log(" Connected and have game data, navigating to /game");
      navigate("/game");
      setMessage("You have successfully start the game");
    }
  }, [isConnected, wsUrl, gameStatus, tik_tik, navigate]);

  // effect run on mount, decide if the player should see a reconnect box
  useEffect(() => {
    if (hasCheckedReconnect) {
      return; // if already checked then do nothing
    }

    // get the latest states  from useSocketStore
    const storeState = useSocketStore.getState();
    const { id, gameId, fullName, isConnected: storeIsConnected } = storeState;

    /*
     * if isConnected is false and gameStatus is valid
     * AND user is on PlayerJoin page
     * it means that the game has not ended and user might be clicked to back button by mistake on themeWrapper component
     * so open the reconnect box to ask user to reconnect to the game
     */
    if (
      !storeIsConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "start" ||
        gameStatus === "ready") &&
      id &&
      gameId &&
      fullName
    ) {
      setOpenReconnectBox(true); // open reconnect box
    }

    /*
     * if gameStatus is end
     * AND user is on PlayerJoin page
     * it means that the game has ended and user click to back button on themeWrapper component
     * so reset all the states of useSocketStore
     */
    if (gameStatus === "end") {
      useSocketStore.getState().resetSession();
    }

    setHasCheckedReconnect(true); // mark the reconnect check to true
  }, []);

  // <----------------------    game logic   ------------------------------------------------>

  // handle navigation when user click to button see details
  function navigation(id: string) {
    navigate(`/home/quiz/${id}`);
  }
  // if quizzes are processing then show quiz card skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
        {[...Array(8)].map((_, i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  // if there is anything wrong then show error to user
  if (error) {
    setError(
      "page",
      "Server Error",
      "Something went wrong while processing Quizzes",
    );
    return <ErrorPage />;
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
            <FeaturedQuizzes />
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <h3 className="text-2xl font-logo-secondary italic font-bold text-primary">
                The Quizzes Library
              </h3>
              <div className="flex items-center gap-4 bg-[#f0eee5] p-1 rounded-2xl">
                <button className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold">
                  All
                </button>
                <button className="px-6 py-2  text-[#504448]/70 hover:text-primary rounded-xl text-sm font-bold transition-colors">
                  Easy
                </button>
                <button className="px-6 py-2  text-[#504448]/70 hover:text-primary rounded-xl text-sm font-bold transition-colors">
                  Medium
                </button>
                <button className="px-6 py-2  text-[#504448]/70 hover:text-primary rounded-xl text-sm font-bold transition-colors">
                  Hard
                </button>
              </div>
              <div className="flex items-center gap-2 text-[#504448] text-sm font-bold">
                <span>
                  <ArrowDownWideNarrow />
                </span>
                <span>Sort by:</span>
                <select
                  name=""
                  id=""
                  className="bg-transparent border-none focus:ring-0 text-primary font-black cursor-pointer p-0"
                >
                  <option value="">Most Played</option>
                  <option value="">Newest</option>
                  <option value="">Highest Rated</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((quiz, index) => (
                <QuizCard key={index} quiz={quiz} navigation={navigation} />
              ))}
            </div>
            {openReconnectBox && (
              <ReconnectBox
                closeBox={() => setOpenReconnectBox(false)}
                setwsURl={(url: string) => setWsUrl(url)}
              />
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
      <div className="mb-16 grid grid-col-1 lg:grid-cols-2 gap-8 items-center">
        <div className="lg:col-span-7">
          <h1 className="font-logo-secondary leading-tight text-primary mb-4">
            Ready to Host the{" "}
            <span className="italic font-light">Intellectual</span> Arena?
          </h1>
          <h1 className="max-w-xl mb-8 leading-relaxed">
            Create and manage quizzes that challenge every mind. From quantum
            physics to renaissance art, craft your niche and watch players climb
            the leagues.
          </h1>
          <div className="flex flex-wrap gap-4">
            <button className="bg-pink text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all active:scale-95">
              Start Quick Play
            </button>
            <button className="bg-primary text-[#e7e3ce] px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all active:scale-95">
              View Leagues
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FeaturedQuizzes() {
  return (
    <>
      <section className="mt-10 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-logo-secondary italic font-bold text-primary">
            Featured Arenas
          </h3>
          <Link
            to="#"
            className="text-sm font-bold text-text-body-variant hover:text-pink transition-colors flex items-center gap-1"
          >
            View All{" "}
            <span>
              <MoveRight />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FeaturedQuizCard />
          <FeaturedQuizCard_2 />
          <FeaturedQuizCard_3 />
        </div>
      </section>
    </>
  );
}

function FeaturedQuizCard() {
  return (
    <>
      <div className="group relative h-80 rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_BSNe160g8YJ4X5OAMg4E6B1lLtgn-3LyN88onrHVGn40TdAfkuZdaOuoNfLJruZRDW_bR_sglMzEBmm0kCEfqfFzLOTPGlwD8_tZmsfAI46WqsvS7OFoZpiaUxwWvL2CAe22ZfaEbimwowgxT7uS0gmeKF8PDMr1aESI1fpCvzdBgjTczE-EFPZWwnKLKIVqD9JgzYW4Po_htWma1d5ALzskQWinbEpjFjGoJd_2zfq5PboE9ylNTS9CiSP5QEkARYG5hKxCOwE"
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="px-3 py-1 bg-pink text-white text-[10px] font-bold uppercase rounded-full mb-3 inline-block tracking-widest">
            Premium elite
          </span>
          <h4 className="text-2xl font-bold text-[#e7e3c3] mb-2">
            History Of Digital Art
          </h4>
          <p className="text-[#e7e3c3]/70 text-sm mb-6 line-clamp-2">
            Explore the evolution of pixels to generative masterpieces in this
            deep dive.
          </p>
          <button className="bg-pink text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,49,159,0.4)]">
            Play Arena{" "}
            <span>
              <Play className="w-4 h-4 fill-white" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

function FeaturedQuizCard_2() {
  return (
    <>
      <div className="group relative h-80 rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_BSNe160g8YJ4X5OAMg4E6B1lLtgn-3LyN88onrHVGn40TdAfkuZdaOuoNfLJruZRDW_bR_sglMzEBmm0kCEfqfFzLOTPGlwD8_tZmsfAI46WqsvS7OFoZpiaUxwWvL2CAe22ZfaEbimwowgxT7uS0gmeKF8PDMr1aESI1fpCvzdBgjTczE-EFPZWwnKLKIVqD9JgzYW4Po_htWma1d5ALzskQWinbEpjFjGoJd_2zfq5PboE9ylNTS9CiSP5QEkARYG5hKxCOwE"
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="px-3 py-1 bg-secondary-container text-primary text-[10px] font-bold uppercase rounded-full mb-3 inline-block tracking-widest">
            Premium elite
          </span>
          <h4 className="text-2xl font-bold text-[#e7e3c3] mb-2">
            History Of Digital Art
          </h4>
          <p className="text-[#e7e3c3]/70 text-sm mb-6 line-clamp-2">
            Explore the evolution of pixels to generative masterpieces in this
            deep dive.
          </p>
          <button className="bg-secondary-container text-primary px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,49,159,0.4)]">
            Play Arena{" "}
            <span>
              <Play className="w-4 h-4 fill-primary" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

function FeaturedQuizCard_3() {
  return (
    <>
      <div className="group relative h-80 rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_BSNe160g8YJ4X5OAMg4E6B1lLtgn-3LyN88onrHVGn40TdAfkuZdaOuoNfLJruZRDW_bR_sglMzEBmm0kCEfqfFzLOTPGlwD8_tZmsfAI46WqsvS7OFoZpiaUxwWvL2CAe22ZfaEbimwowgxT7uS0gmeKF8PDMr1aESI1fpCvzdBgjTczE-EFPZWwnKLKIVqD9JgzYW4Po_htWma1d5ALzskQWinbEpjFjGoJd_2zfq5PboE9ylNTS9CiSP5QEkARYG5hKxCOwE"
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <span className="px-3 py-1 bg-pink text-white text-[10px] font-bold uppercase rounded-full mb-3 inline-block tracking-widest">
            Premium elite
          </span>
          <h4 className="text-2xl font-bold text-[#e7e3c3] mb-2">
            History Of Digital Art
          </h4>
          <p className="text-[#e7e3c3]/70 text-sm mb-6 line-clamp-2">
            Explore the evolution of pixels to generative masterpieces in this
            deep dive.
          </p>
          <button className="bg-pink text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,49,159,0.4)]">
            Play Arena{" "}
            <span>
              <Play className="w-4 h-4 fill-white" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
