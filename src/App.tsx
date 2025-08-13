import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Layout_2 from "./layout/Layout_2";
import LandingPage from "./pages/landingPage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Quizzes from "./pages/Quizzes/Quizzes";
import QuizCreation from "./pages/QuizCreation/QuizCreation";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/home" element={<Layout_2 />}>
            <Route index element={<Quizzes />} />
            <Route path="create-quiz" element={<QuizCreation/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
