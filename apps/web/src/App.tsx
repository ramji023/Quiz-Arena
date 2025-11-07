import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Layout_2 from "./layout/Layout_2";
import LandingPage from "./pages/landingPage/LandingPage";
import Quizzes from "./pages/Quizzes/Quizzes";
import QuizCreation from "./pages/QuizCreation/QuizCreation";
import Themes from "./pages/themes/Theme";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { useEffect } from "react";
import { useAuthStore } from "./stores/authStore";
import { api } from "./utils/axiosInterceptor";
export default function App() {
  async function newToken() {
    const response = await api.post("/api/v1/user/refreshedToken");
    if (response.data) {
      useAuthStore.setState({
        isAuthenticate: true,
        token: response.data.token,
        id: response.data.id,
        userName: response.data.userName,
      });
    } else {
      console.log("application loading request failed");
    }
  }
  useEffect(() => {
    newToken();
  }, []);
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
          <Route path="/home" element={<Layout_2 />}>
            <Route index element={<Quizzes />} />
            <Route path="create-quiz" element={<QuizCreation />} />
            <Route path="themes" element={<Themes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
