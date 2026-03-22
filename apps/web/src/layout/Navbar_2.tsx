import { useAuthStore } from "../stores/authStore";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@repo/ui/components/ui/Button";
import { Bell, Search } from "lucide-react";
export default function Navbar_2() {
  const name = useAuthStore((s) => s.userName);
  console.log("user name is : ", name);
  return (
    <>
      <div className="bg-background-color py-2 px-8 flex justify-between items-center w-full">
        <div className="flex items-center gap-8">
          <div className="font-logo-secondary tracking-widest text-primary italic">
            <span className="text-2xl">ARENA</span>
          </div>
          <div className="hidden lg:flex items-center gap-1 bg-background-color-secondary px-4 py-2 rounded-full w-96 text-text-body-variant">
            <span>
              <Search className="w-4 h-4" />
            </span>
            <input
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#504448]/50 py-2 px-2"
              type="text"
              placeholder="Search for quizzes, topics..."
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-primary/70 hover:text-pink transition-colors duration-300 relative">
            <span>
              <Bell className="w-6 h-6" />
            </span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-pink rounded-full border-2 border-white"></span>
          </button>
          <div className="flex gap-2">
            <div className="flex flex-col items-end">
              <span className="text-sm ">{name}</span>
              <span className="text-xs text-[#504448]/50">
                {name}@gmail.com
              </span>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 text-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp7s3OnVJ2escgQDPRl8S7TJc1kgYEVcTLCGVa0S5x-M-klNZeyXB-Apc0lU3J0JSXPNUZWRyofJv1qfjMkDswU6DRzdE4akVAbTZgtSBHBGxI3tFw1b_Pg4FJlE1c3Hnk8teOTDlTguhrPND0Pr0EbyaKjndP7i1YiQ9WVkH8ZfrYFhjsg01CCx-myoet1DuqwA8UCJhfMDJavpfkvN9MSx5BquKpDKcNU_r3FBft1CbvU_t9G5KfBuuIVKMz_Nn4qhOd-fvXq50"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//  <img
//             src="https://i.pravatar.cc/150?img=3"
//             alt=""
//             className="rounded-full w-10 h-10 mr-2"
//           />
