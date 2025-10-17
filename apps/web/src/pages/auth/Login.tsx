import { Logo } from "@repo/ui/components/Logo";
import { Button } from "@repo/ui/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  console.log("login component rendered...");
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[2px] z-50 flex justify-center items-center">
        <div className="w-[400px] h-[470px] bg-primary-shadow rounded-xl  p-6 flex flex-col gap-3  font-poppins">
          <div className=" flex flex-col gap-5 items-center justify-center p-4">
            <div className="">
              <Logo />
            </div>
            <h1 className=" text-md text-gray-300">Login to continue</h1>
          </div>
          <form>
            <div className="">
              {/* <div>
              {signupMutation.isError && (
                <p className="text-red-500 text-xs flex justify-center items-center">
                  Error: {(signupMutation.error as Error).message}{" "}
                </p>
              )}
            </div> */}
              <div className="flex flex-col gap-1 py-1">
                <label className="text-lg">Email</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
                />
                <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                 **
                </span>
              </div>
              <div className="flex flex-col gap-1 py-1 ">
                <label className="text-lg">Password</label>
                <input
                  type="text"
                  placeholder="Enter Strong Password"
                  className="p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
                />
                <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  **
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button variant="primary" onClick={() => {}}>
                Login
              </Button>
            </div>
          </form>
          <div className="">
            <p className="text-sm text-gray-300 text-center">
              If you have already registered,{" "}
              <span
                onClick={() => {
                  navigate("/auth/signup");
                }}
                className="cursor-pointer text-pink hover:text-pink"
              >
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
