import { useMutation } from "@tanstack/react-query";
import {
  LayoutDashboard,
  ListChecks,
  Package,
  Ellipsis,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosInterceptor";
import { useAuthStore } from "../stores/authStore";
const SidebarIcons = [
  {
    item: "Home",
    icon: LayoutDashboard,
  },
  {
    item: "Quizzes",
    icon: ListChecks,
  },
  {
    item: "Saved",
    icon: Package,
  },
  {
    item: "History",
    icon: Ellipsis,
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
      console.log("something went wrong while logging out");
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
                  <div className="flex items-center  justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
                    <items.icon className="w-6 h-6" />
                    <span className="text-lg px-5">{items.item}</span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {SidebarIcons.map((items, index) => (
                <div key={index}>
                  <div className="flex items-center justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
                    <items.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* logout button  */}
        <div className="mb-4">
          {!collapsed ? (
            <div
              className="flex items-center justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3"
              onClick={() => {
                logoutMutation.mutate();
              }}
            >
              <LogOut className="w-6 h-6 text-red-500" />
              <span className="text-lg text-red-500 px-5">Logout</span>
            </div>
          ) : (
            <div className="flex items-center  justify-center cursor-pointer text-secondary py-2 rounded-lg hover:bg-primary-shadow my-2 mx-3">
              <LogOut className="w-6 h-6 text-red-500" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
