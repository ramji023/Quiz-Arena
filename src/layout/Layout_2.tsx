import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar_2 from "./Navbar_2";
import Sidebar from "./Sidebar";
import { Menu, ChevronLeft } from "lucide-react";

export default function Layout_2() {
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
          className="flex justify-center py-2 mx-3 hover:bg-primary-shadow rounded-lg"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          {sidebarOpen ? (
            <>
              <ChevronLeft className="w-6 h-6" />{" "}
              <span className="px-5 text-lg">Menu</span>{" "}
            </>
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <Sidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar fixed at top */}
        <Navbar_2 />

        {/* Scrollable content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
