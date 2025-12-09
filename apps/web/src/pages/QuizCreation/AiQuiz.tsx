import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@repo/ui/components/Logo";
import { Button } from "@repo/ui/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInterceptor";
import { useNavigate } from "react-router-dom";

type AiQuizFormInputs = {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  note?: string;
  questions: number;
};

export default function AiQuiz() {
  const navigate = useNavigate();
  const quizBuilderMutation = useMutation({
    mutationFn: async (data: AiQuizFormInputs) => {
      const response = await api.post("/api/v1/quiz/createAiQuiz", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("quiz data from server : ", data);
      navigate("/home/create-quiz", { state: data.quiz });
    },
    onError: (err) => {
      console.log(
        "Something went wrong while generating Ai-powered quiz for you",
        err
      );
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiQuizFormInputs>({
    defaultValues: {
      topic: "",
      difficulty: "medium",
      note: "",
      questions: 5,
    },
  });

  const onSubmit: SubmitHandler<AiQuizFormInputs> = async (data) => {
    console.log("Form data:", data);
    quizBuilderMutation.mutate(data);
  };

  // const [loading, setLoading] = useState(true);
  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="fixed font-poppins text-secondary top-1/2 left-1/2 z-50 w-full max-w-md p-6 bg-primary-shadow rounded-xl shadow transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          {quizBuilderMutation.isPending ? (
            <>
              <div className="mt-6">
                <ProcessingLoader />
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-medium ">Topic</label>
                  <input
                    type="text"
                    {...register("topic", { required: "Topic is required" })}
                    placeholder="Enter quiz topic"
                    className="mt-1 block w-full px-3 py-2 outline-1 outline-secondary focus:outline-pink rounded-md shadow-sm  sm:text-sm"
                  />
                  {errors.topic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.topic.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Difficulty
                  </label>
                  <select
                    {...register("difficulty", { required: true })}
                    className="mt-1 block bg-primary-shadow w-full px-3 py-2 outline-1 outline-secondary focus:outline-pink rounded-md shadow-sm  sm:text-sm"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium ">
                    Number of Questions
                  </label>
                  <input
                    type="text"
                    {...register("questions", {
                      required: "Questions count is required",
                    })}
                    placeholder="Enter Number of Questions"
                    className="mt-1 block w-full px-3 py-2 outline-1 outline-secondary focus:outline-pink rounded-md shadow-sm  sm:text-sm"
                  />
                  {errors.topic && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.questions?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium ">
                    Note (optional)
                  </label>
                  <textarea
                    {...register("note")}
                    placeholder="Add a short note or instructions"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 outline-1 outline-secondary focus:outline-pink rounded-md shadow-sm  sm:text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button variant="primary" type="submit" onClick={() => {}}>
                    Create AI Quiz
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </>
    </AnimatePresence>
  );
}

import { Bot } from "lucide-react";

function ProcessingLoader() {
  return (
    <div className="flex flex-col items-center justify-center font-poppins">
      {/* Glowing Pulse Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      />

      <Bot className="relative text-green-400 w-30 h-30" />

      {/* Text Animation */}
      <motion.p
        className="mt-10 text-xl  text-green-300 tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        Your Quiz is generating...
      </motion.p>
    </div>
  );
}
