import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Layout_2 from "./layout/Layout_2";
import LandingPage from "./pages/landingPage/LandingPage";
import Quizzes from "./pages/Quizzes/Quizzes";
import QuizCreation from "./pages/QuizCreation/QuizCreation";
import Themes from "./pages/themes/Theme";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./layout/ProtectedRoute";
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
              <Route path="themes" element={<Themes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
