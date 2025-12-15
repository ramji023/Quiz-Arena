import { useMutation } from "@tanstack/react-query";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  Ellipsis,
  LogOut,
  CircleUser,
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
    item: "Your Quizzes",
    icon: ListChecks,
    route: "your-quizzes",
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
  {
    item: "Account",
    icon: CircleUser,
    route: "/profile",
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
                      `${isActive ? "bg-primary-shadow" : "text-secondary"} 
     flex items-center justify-start cursor-pointer py-2 px-2 rounded-lg hover:bg-primary-shadow my-2 mx-3`
                    }
                  >
                    <items.icon className="w-5 h-5" />
                    <span className="text-md px-5">{items.item}</span>
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
                      `${isActive ? "bg-primary-shadow" : "text-secondary"} 
     flex items-center justify-center cursor-pointer py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3`
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
              className="flex items-center justify-start px-2 cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3"
              onClick={() => {
                logoutMutation.mutate();
              }}
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-md text-red-500 px-5">Logout</span>
            </div>
          ) : (
            <div className="flex items-center  justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
