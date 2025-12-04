import Logo_2 from "./Logo_2";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
export default function Navbar_2() {
  const navigate = useNavigate();
  const name = useAuthStore((s) => s.userName);
  console.log("user name is : ", name);
  return (
    <>
      <div className="bg-primary text-secondary py-2 px-3 flex justify-between items-center">
        <Logo_2 />
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                navigate("create-quiz");
              }}
              className="text-sm bg-secondary font-semibold text-primary hover:bg-card px-4 py-2 cursor-pointer rounded-md outline-none flex items-center gap-2"
            >
              Create Quiz
            </button>
            <button
              onClick={() => {
                navigate("ai-quiz");
              }}
              className="text-sm font-semibold text-secondary hover:bg-primary-shadow px-4 py-2 cursor-pointer rounded-md outline-none flex items-center gap-2"
            >
              Play Quiz
            </button>
          </div>
          <div className="w-8 h-8 mr-2 rounded-full text-lg text-pink outline-2 outline-secondary flex items-center justify-center">
            {name?.charAt(0).toUpperCase()}
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
