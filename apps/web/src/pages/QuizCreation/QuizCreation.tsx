import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "./InputBox";
import { Plus, Save } from "lucide-react";
import { QuestionBox } from "./QuestionBox";
import { useEffect } from "react";
import { QuizFormState } from "../../types/quizForm";
import { useForm, useFieldArray } from "react-hook-form";
import AutoSave from "./AutoSave";
import { useAuthStore } from "../../stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";
import useErrorStore from "../../stores/errorStore";
import useSuccessStore from "../../stores/SuccessStore";
export default function QuizCreation() {
  const reactQuery = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const quizData: QuizFormState = location.state; // check if we got the quiz data successfully from Ai-server
  const setError = useErrorStore((s) => s.setError); // function to set the error
  const setMessage = useSuccessStore((s) => s.setMessage); // function to set the success message
  // mutattion to send quiz data to server
  const quizCreation = useMutation({
    mutationFn: async (data: QuizFormState) => {
      const response = await api.post("/api/v1/quiz/createQuiz", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("response data from quiz creation : ", data);
      setMessage("You have created Quiz Successfully.");
      // navigate to that created quiz page
      navigate(`/home/quiz/${data.quizId}`);
      reactQuery.invalidateQueries({ queryKey: ["Quizzes"] }); // invalidate react query (fetch all quizzes)
      reset();
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

  // initialize quiz form using react-hook-form
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizFormState>({
    defaultValues: {
      title: "", // set the title
      description: "", // set the description
      difficulty: "easy", // set default value to difficulty
      // set default two questions in quiz
      quiz: Array(2)
        .fill(null)
        .map(() => ({
          question: "",
          options: Array(4)
            .fill(null)
            .map(() => ({ text: "", isCorrect: false })),
          points: 0,
        })),
    },
  });

  // if got the Ai Quiz data from this route "ai-quiz"
  useEffect(() => {
    // if quizData is not null
    if (quizData) {
      // reset the react quiz data
      reset({
        title: quizData.title ?? "",
        description: quizData.description ?? "",
        quiz: quizData.quiz?.length
          ? quizData.quiz.map((q) => ({
              question: q.question ?? "",
              options: q.options ?? [
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
              points: q.points ?? 0,
            }))
          : [],
      });
    }
  }, [quizData, reset]);

  // define useFieldArray to add/remove dynamic input field using react-hook-form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  // call the submit button
  function onSubmit(data: QuizFormState) {
    console.log("quiz data : ", data);
    quizCreation.mutate(data); //  call quizCreation mutation and send quiz data to server
  }

  return (
    <>
      <div className="text-primary">
        {/* first common heading  */}
        <div className="flex flex-row-reverse justify-between">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              navigate("/home/ai-quiz");
            }}
          >
            Use Ai-Quiz Builder <Plus className="w-4 h-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AutoSave control={control} />
          <div className="p-6">
            {/* enter quiz details  */}
            <div>
              <InputBox
                label="Quiz Title"
                placeholder="enter quiz title"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                error={errors.title?.message}
              />
              <InputBox
                label="Description"
                placeholder="write description..."
                type="text"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                error={errors.description?.message}
              />
              <div className="flex flex-col gap-1 p-2 min-w-[300px]">
                <label htmlFor="difficulty" className="text-sm font-semibold">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  {...register("difficulty", { required: true })}
                  className="px-2 py-2 rounded outline-1 hover:bg-secondary-shadow"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            {/* question card  */}
            <div className="px-2 py-5 flex flex-col gap-6">
              {fields.map((field, index) => (
                <QuestionBox
                  key={field.id}
                  index={index}
                  register={register}
                  control={control}
                  remove={remove}
                  errors={errors}
                />
              ))}
            </div>

            <div className="flex justify-evenly items-center">
              <Button
                variant="primary"
                type="button"
                size="sm"
                onClick={() =>
                  append({
                    question: "",
                    options: Array(4)
                      .fill(null)
                      .map(() => ({ text: "", isCorrect: false })),
                    points: 0,
                  })
                }
              >
                Add Question <Plus className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="primary"
                type="submit"
                onClick={() => {}}
                loading={quizCreation.isPending}
              >
                Save Quiz <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
