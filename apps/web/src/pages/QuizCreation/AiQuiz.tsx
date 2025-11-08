import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@repo/ui/components/Logo";

type AiQuizFormInputs = {
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  note?: string;
};

export default function AiQuiz() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AiQuizFormInputs>({
    defaultValues: {
      topic: "",
      difficulty: "medium",
      note: "",
    },
  });

  const onSubmit: SubmitHandler<AiQuizFormInputs> = async (data) => {
    console.log("Form data:", data);
  };

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
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-6 bg-white rounded-xl shadow-lg transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Topic Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                {...register("topic", { required: "Topic is required" })}
                placeholder="Enter quiz topic"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.topic && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.topic.message}
                </p>
              )}
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                {...register("difficulty", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Note Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Note (optional)
              </label>
              <textarea
                {...register("note")}
                placeholder="Add a short note or instructions"
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create AI Quiz"}
              </button>
            </div>
          </form>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
