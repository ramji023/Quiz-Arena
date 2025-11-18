import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/auth" element={<LandingPage />}>
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Layout_2 />}>
              <Route index element={<Quizzes />} />
              <Route path="create-quiz" element={<QuizCreation />} />
              <Route path="ai-quiz" element={<AiQuiz />} />
              <Route path="quiz/:quizId" element={<Quiz />} />
              <Route path="themes" element={<ThemesPage />} />
            </Route>
            <Route path="theme/:themeID" element={<Theme />} />
            <Route path="game" element={<Game />} />
          </Route>
          <Route path="join" element={<PlayerJoin />} />
          <Route path="play" element={<PlayerGame />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
