import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import { api } from "../utils/axiosInterceptor";

export default function ProtectedRoute() {
  const isAuthenticate = useAuthStore((s) => s.isAuthenticate);
  const [loading, setLoading] = useState(true);
  async function newToken() {
    try {
      const response = await api.post("/api/v1/user/refreshedToken");

      if (response.data) {
        useAuthStore.setState({
          isAuthenticate: true,
          token: response.data.token,
          id: response.data.id,
          userName: response.data.userName,
        });
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      useAuthStore.setState({ isAuthenticate: false, token: null });
      window.location.href = "/auth/login";
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    newToken();
  }, []);

  if (loading) return <div>QuizArena is loading</div>;
  return isAuthenticate ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
