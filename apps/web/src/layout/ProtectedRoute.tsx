import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { api } from "../utils/axiosInterceptor";
import PageLoader from "../pages/LoadingComponents/FullPageLoader";

const MIN_LOADING_TIME = 800;
export default function ProtectedRoute() {
  const isAuthenticate = useAuthStore((s) => s.isAuthenticate);
  const [loading, setLoading] = useState(true);
  async function newToken() {
    const startTime = Date.now(); // track start time
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
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Wait for remaining time if needed
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setLoading(false);
    }
  }
  useEffect(() => {
    newToken();
  }, []);

  if (loading) return <PageLoader />;
  return isAuthenticate ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Outlet />
    </motion.div>
  ) : (
    <Navigate to="/auth/login" replace />
  );
}
