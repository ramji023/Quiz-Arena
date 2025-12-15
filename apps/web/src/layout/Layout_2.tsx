import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar_2 from "./Navbar_2";
import Sidebar from "./Sidebar";
import { Menu, ChevronLeft } from "lucide-react";
import { useAuthStore } from "../stores/authStore";

export default function Layout_2() {
  const username = useAuthStore((s) => s.userName);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden  font-poppins">
      {/* Sidebar */}
      <div
        className={`text-secondary bg-primary transition-all duration-300 flex flex-col flex-shrink-0  ${
          sidebarOpen ? "w-54" : "w-20"
        }`}
      >
        <button
          className="flex justify-start px-2 py-2 mx-3 my-2 hover:bg-primary-shadow rounded-lg"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-5 h-5" />{" "}
              <span className="px-5 text-md">Menu</span>{" "}
            </>
          ) : (
            <div className="px-2">
              <Menu className="w-5 h-5" />
            </div>
          )}
        </button>
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar fixed at top */}
        <Navbar_2 />

        {/* Scrollable content */}
        <main className="flex-1 p-6 overflow-y-auto bg-secondary">
          <div className="flex justify-between px-6 text-primary">
            <h1 className="text-2xl font-semibold ">Welcome, {username} </h1>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
