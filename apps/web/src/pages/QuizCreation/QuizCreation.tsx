import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "./InputBox";
import { Plus, Save } from "lucide-react";
import { QuestionBox } from "./QuestionBox";
import { useEffect } from "react";
import { QuizFormState } from "../../types/quizForm";
import { useForm, useFieldArray } from "react-hook-form";
import AutoSave from "./AutoSave";
import { useAuthStore } from "../../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../utils/axiosInterceptor";
import { useLocation, useNavigate } from "react-router-dom";
export default function QuizCreation() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizData: QuizFormState = location.state;
  const username = useAuthStore((s) => s.userName);
  const quizCreation = useMutation({
    mutationFn: async (data: QuizFormState) => {
      const response = await api.post("/api/v1/quiz/createQuiz", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("response data from quiz creation : ", data);
      navigate("/home");
    },
    onError: (error) => {
      console.log("something went wrong while creating quiz : ", error);
    },
  });
  const { control, register, handleSubmit, reset } = useForm<QuizFormState>({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy",
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

  useEffect(() => {
    if (quizData) {
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  function onSubmit(data: QuizFormState) {
    console.log("quiz data : ", data);
    quizCreation.mutate(data);
  }

  return (
    <>
      <div className="text-primary">
        {/* first common heading  */}
        <div className="flex flex-row-reverse justify-between">
          <Button
            variant="primary"
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
                />
              ))}
            </div>

            <div className="flex justify-evenly items-center">
              <Button
                variant="primary"
                type="button"
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
              <Button variant="primary" type="submit" onClick={() => {}}>
                Save Quiz <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
