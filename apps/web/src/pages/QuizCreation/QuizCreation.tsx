import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "./InputBox";
import { Copy, Plus, Save, Trash2, Zap } from "lucide-react";
import { QuestionBox, QuestionBoxVariant } from "./QuestionBox";
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
          "Something went wrong. Please try again.",
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
          points: 10,
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
              points: q.points ?? 10,
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
      <div className="text-text-body">
        <Intro />
        <form onSubmit={handleSubmit(onSubmit)}>
          <AutoSave control={control} />

          {/* general info box  */}
          <section className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-pink rounded-full"></div>
              <h4 className="text-xl font-bold font-logo-secondary text-primary">
                General Information
              </h4>
            </div>
            <div className="space-y-6">
              <InputBoxVariant
                label="Quiz Title"
                placeholder="e.g., The Renaissance Masterpieces"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
                error={errors.title?.message}
              />

              <InputBoxVariant
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
              <div className="mb-3 ml-1">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-semibold text-primary mb-2 ml-1"
                >
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  {...register("difficulty", { required: true })}
                  className="w-[50%] bg-[#f6f4eb] px-4 py-4 border-none outline-none rounded-xl focus:ring-2 focus:ring-[#ffd9e4] text-[#1b1c17]"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </section>

          {/* question box  */}
          <div className="space-y-8 mt-10">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-xl font-bold font-logo-secondary text-primary">
                Questions List
              </h4>
              <span className="text-xs font-bold text-[#504448] bg-[#f0eee5] px-3 py-1 rounded-full uppercase tracking-widest">
                2 Questions Added
              </span>
            </div>

            {fields.map((field, index) => (
              <QuestionBoxVariant
                key={field.id}
                index={index}
                register={register}
                control={control}
                remove={remove}
                errors={errors}
              />
            ))}
          </div>

          {/* add question button  */}
          <div className="flex items-center gap-4 py-4 mt-4 mb-20 pt-5 pb-5">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-[#d3c2c8]/30"></div>
            <button
              type="button"
              onClick={() =>
                append({
                  question: "",
                  options: Array(4)
                    .fill(null)
                    .map(() => ({ text: "", isCorrect: false })),
                  points: 10,
                })
              }
              className="flex items-center gap-2 bg-primary text-[#e7e3ce] px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>
                <Plus />
              </span>
              <span>Add Question</span>
            </button>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-[#d3c2c8]/30"></div>
          </div>

          {/* add action buttons  */}
          <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t-0 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] z-40">
            <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-[#504448] uppercase tracking-widest">
                  Auto saved 2 min ago
                </p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-8 py-3.5 rounded-3xl bg-primary text-[#e7e3ce] font-bold text-sm hover:bg-[#1f0113] transition-all">
                  <span>Save as Draft</span>
                </button>
                <button
                  type="submit"
                  // loading={quizCreation.isPending}
                  className="flex-1 sm:flex-none px-10 py-3.5 rounded-3xl bg-pink text-white font-bold text-sm shadow-lg shadow-[#fc2e9d]/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span>Create Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

import React from "react";

interface InputProp {
  label?: string;
  placeholder: string;
  type: string;
  error?: string;
}

// use forwardRef to integrate react hook form
const InputBoxVariant = React.forwardRef<HTMLInputElement, InputProp>(
  ({ label, placeholder, type, error, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-semibold text-primary mb-2 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full bg-[#f6f4eb] border-none outline-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#ffd9e4] text-[#1b1c17] placeholder:text-[#504448]/40 transition-all"
          {...rest}
        />
        {error && (
          <p className="text-xs text-red-500 flex flex-row-reverse">{error}</p>
        )}
      </div>
    );
  },
);

InputBox.displayName = "InputBox";

function Intro() {
  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-primary p-10 text-[#ece3ce] mb-12 mt-5">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-3xl font-logo-secondary font-bold mb-3">
            The Arena Awaits
          </h1>
          <p className="text-[#b07993] text-lg leading-relaxed">
            Craft your intellectual challenge. Balance rigor with curiosity to
            engage your challengers in the ultimate battle of wits.
          </p>
        </div>
      </section>
    </>
  );
}
