import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar_2 from "./Navbar_2";
import Sidebar from "./Sidebar";
import { Menu, ChevronLeft } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { ErrorNote } from "../pages/ErrorPages/ErrorNote";
import { SuccessNote } from "../pages/LoadingComponents/SuccessNote";
import { LikeNote, ThankuNote } from "../pages/testimonials/ReviewForm";

export default function Layout_2() {
  const username = useAuthStore((s) => s.userName);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showThankYou, setShowThankYou] = useState(false);

  // shet showThankYou true if user click to love note
  const handleLikeClick = () => {
    setShowThankYou(true);
  };

  // hide thanku note after 5 seconds
  const handleCloseThankYou = () => {
    setShowThankYou(false);
  };
  return (
    <div className="flex bg-background-color h-screen overflow-hidden font-body text-text-body">
      {/* Sidebar */}
      <div
        className={`bg-[#f0eee5] px-2 transition-all duration-300 flex flex-col flex-shrink-0  ${
          sidebarOpen ? "w-62" : "w-20"
        }`}
      >
        <button
          className={`flex items-center my-2 mx-2 rounded-3xl text-[#3b142a]/60 hover:bg-[#3b142a]/5 transition-all duration-200 hover:scale-[1.02]
    ${sidebarOpen ? "py-3 px-4 gap-2" : "p-3 justify-center w-[calc(100%-16px)]"}`}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Menu</span>
            </>
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar fixed at top */}
        <Navbar_2 />

        {/* Scrollable content */}
        <main className="py-6 px-8 overflow-y-auto bg-background-color">
          {/* <div className="flex justify-between px-1 mb-2  text-text-body">
            <h1 className="text-2xl font-semibold ">Welcome, {username} </h1>
          </div> */}
          <Outlet />
        </main>
      </div>
      <ErrorNote />
      <SuccessNote />
      {/* love note always visible to user */}
      <LikeNote onLikeClick={handleLikeClick} />

      {/* thanku note when user click to likeNote */}
      {showThankYou && (
        <ThankuNote
          username={username as string}
          onClose={handleCloseThankYou}
        />
      )}
    </div>
  );
}
