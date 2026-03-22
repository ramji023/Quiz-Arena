import { useMutation } from "@tanstack/react-query";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  Ellipsis,
  LogOut,
  CirclePlus,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../utils/axiosInterceptor";
import { useAuthStore } from "../stores/authStore";
const SidebarIcons = [
  {
    item: "Home",
    icon: LayoutDashboard,
    route: "",
    end: true,
  },
  {
    item: "My Quizzes",
    icon: ListChecks,
    route: "your-quizzes",
  },
  {
    item: "Create Quiz",
    icon: CirclePlus,
    route: "create-quiz",
  },
  {
    item: "Saved Quizzes",
    icon: Package,
    route: "saved",
  },
  {
    item: "History",
    icon: Ellipsis,
    route: "history",
  },
];
export default function SidebarItems({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/api/v1/user/logout", {});
      return response.data;
    },
    onSuccess: (data) => {
      console.log("user successfully logged out");
      console.log(data);
      useAuthStore.setState({
        token: null,
        isAuthenticate: false,
        id: null,
        userName: null,
      });
      navigate("/");
    },
    onError: (error) => {
      console.log("something went wrong while logging out", error);
    },
  });

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          {!collapsed ? (
            <>
              {SidebarIcons.map((items, index) => (
                <div key={index}>
                  <NavLink
                    to={items.route}
                    end={items.end}
                    className={({ isActive }) =>
                      `${isActive ? "bg-[#3b142a] text-[#f3efda]" : "text-[#3b142a]/60 hover:bg-[#3b142a]/5"} 
     flex items-center gap-3 cursor-pointer py-3 px-4 rounded-3xl my-2 mx-2 hover:scale-[1.02] transition-all duration-200`
                    }
                  >
                    <items.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      {items.item}
                    </span>
                  </NavLink>
                </div>
              ))}
            </>
          ) : (
            <>
              {SidebarIcons.map((items, index) => (
                <div key={index}>
                  <NavLink
                    to={items.route}
                    end={items.end}
                    className={({ isActive }) =>
                      `${isActive ? "bg-[#3b142a] text-[#f3efda]" : "text-[#3b142a]/60 hover:bg-[#3b142a]/5"} 
     flex items-center justify-center cursor-pointer rounded-3xl p-3 my-2 mx-2 hover:scale-[1.02] transition-all duration-200`
                    }
                  >
                    <items.icon className="w-5 h-5" />
                  </NavLink>
                </div>
              ))}
            </>
          )}
        </div>
        {/* logout button  */}
        <div className="mb-4">
          {!collapsed ? (
            <div
              className="flex items-center justify-start px-4 py-3 cursor-pointer text-[#3b142a]/60 rounded-3xl hover:bg-[#3b142a]/5 my-2 mx-3 hover:scale-[1.02] transition-all duration-200"
              onClick={() => {
                logoutMutation.mutate();
              }}
            >
              <LogOut className="w-5 h-5 " />
              <span className="text-sm px-5 font-medium">Logout</span>
            </div>
          ) : (
            <div className="flex items-center justify-center cursor-pointer text-[#3b142a]/60 p-3 rounded-3xl hover:bg-[#3b142a]/5 my-2 mx-2 hover:scale-[1.02] transition-all duration-200">
              <LogOut className="w-5 h-5 " />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
