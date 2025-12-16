import { Logo } from "@repo/ui/components/Logo";
import { Button } from "@repo/ui/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthForm } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInterceptor";
import useErrorStore from "../../stores/errorStore";
import useSuccessStore from "../../stores/SuccessStore";
export default function Signup() {
  const navigate = useNavigate();
  const setError = useErrorStore((s) => s.setError);
  const setMessage = useSuccessStore((s)=>s.setMessage)
  const signupMutation = useMutation({
    mutationFn: async (data: AuthForm) => {
      const response = await api.post("/api/v1/user/auth/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      // console.log("response from signup endpoint ", data);
      navigate("/auth/login");
      setMessage("Your most welcome in QuizArena !!")
    },
    onError: (err: Error | any) => {
      // console.log("something went wrong while signed up : ", err);
      if (err.message === "Network Error") {
        // console.log("No internet connection");
        setError("notification", "Network Error", "No internet connection");
      } else if (err.response?.data?.message) {
        // console.log(err.response.data.errors);
        setError("notification", "Server Error", err.response.data.message);
      } else {
        // console.log("Something went wrong. Please try again.");
        setError(
          "notification",
          "Application Error",
          "Something went wrong. Please try again."
        );
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: AuthForm) {
    // console.log("signup form data : ", data);
    signupMutation.mutate(data);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-[2px] z-50 flex justify-center items-center">
        <div className="w-[400px] h-[470px] bg-secondary rounded-xl  p-6 flex flex-col gap-3  font-poppins">
          <div className=" flex flex-col gap-5 items-center justify-center p-4">
            <div>
              <Logo />
            </div>
            <h1 className=" text-base text-slate-600">Create Your Account</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-primary">
              <div className="flex flex-col gap-1 py-1">
                <label className="text-base">Email</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="p-2 rounded-lg outline-1 outline-secondary bg-white text-base"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "**Email is Required",
                    },
                  })}
                />
                <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.email?.message}
                </span>
              </div>
              <div className="flex flex-col gap-1 py-1 ">
                <label className="text-base">Password</label>
                <input
                  type="text"
                  placeholder="Enter Strong Password"
                  className="p-2 rounded-lg outline-1 outline-secondary bg-white text-base"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "**Password is Required",
                    },
                  })}
                />
                <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.password?.message}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="primary"
                type="submit"
                onClick={() => {}}
                loading={signupMutation.isPending}
              >
                Signup
              </Button>
            </div>
          </form>
          <div className="">
            <p className="text-sm text-slate-600 text-center">
              If you have already registered,{" "}
              <span
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="cursor-pointer text-pink hover:text-pink"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
