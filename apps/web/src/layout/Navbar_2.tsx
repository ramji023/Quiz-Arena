import Logo_2 from "./Logo_2";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui/components/ui/Button";
import { Logo } from "@repo/ui/components/Logo";
export default function Navbar_2() {
  const navigate = useNavigate();
  const name = useAuthStore((s) => s.userName);
  console.log("user name is : ", name);
  return (
    <>
      <div className="bg-primary text-secondary py-1.5 px-3 flex justify-between items-center">
        <Logo_2 />
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                navigate("create-quiz");
              }}
            >
              Create Quiz
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                navigate("");
              }}
            >
              Play Quiz
            </Button>
          </div>
          <div className="w-7 h-7 mr-2 rounded-full text-md text-pink outline-2 outline-secondary flex items-center justify-center">
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
