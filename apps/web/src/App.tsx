import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Layout_2 from "./layout/Layout_2";
import LandingPage from "./pages/landingPage/LandingPage";
import Quizzes from "./pages/Quizzes/Quizzes";
import QuizCreation from "./pages/QuizCreation/QuizCreation";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./layout/ProtectedRoute";
import AiQuiz from "./pages/QuizCreation/AiQuiz";
import Quiz from "./pages/Quizzes/Quiz";
import Theme from "./pages/themes/Theme";
import ThemesPage from "./pages/themes/ThemesPage";
import Game from "./pages/hostGame/Game";
import PlayerJoin from "./pages/playerGame/PlayerJoin";
import PlayerGame from "./pages/playerGame/PlayerGame";
import SavedQuizzes from "./pages/Quizzes/SavedQuizzes";
import YourQuizzes from "./pages/Quizzes/YourQuizzes";
import HostedQuizzes from "./pages/hosted_quizzes/HostedQuizzes";
import QuizResults from "./pages/hosted_quizzes/HostQuiz";
import Leaderboard from "./pages/playerGame/LeaderBoard";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/auth" element={<LandingPage />}>
              {" "}
              // show landing page of QuizArena
              <Route path="signup" element={<Signup />} /> // show singnup
              component
              <Route path="login" element={<Login />} /> // show login component
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Layout_2 />}>
              <Route path="" element={<Quizzes />} /> // show application wide
              quizzes
              <Route path="saved" element={<SavedQuizzes />} /> // show all
              saved quizzes
              <Route path="your-quizzes" element={<YourQuizzes />} /> // show
              your quizzes
              <Route path="history" element={<HostedQuizzes />} /> // show all
              hosted quizzes
              <Route path="hostquiz/:quizId" element={<QuizResults />} /> //
              show whole data of any specific hosted quiz
              <Route path="create-quiz" element={<QuizCreation />} /> //
              create-quiz page
              <Route path="ai-quiz" element={<AiQuiz />} /> // create Ai-Quiz
              <Route path="quiz/:quizId" element={<Quiz />} /> // specific quiz
              page
              <Route path="themes" element={<ThemesPage />} /> // show all
              themes cards
            </Route>
            <Route path="theme/:themeID" element={<Theme />} /> // show full
            theme to user
            <Route path="game" element={<Game />} />
          </Route>
          <Route path="join" element={<PlayerJoin />} />
          <Route path="play" element={<PlayerGame />} />
          <Route
            path="leader"
            element={<Leaderboard themeId="jungle-quest" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
