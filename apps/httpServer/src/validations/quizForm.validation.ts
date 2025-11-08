import { z } from "zod";

const optionValidation = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

const questionValidation = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(optionValidation),
  points: z.number("Option point is required"),
});

export const quizFormValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  quiz: z.array(questionValidation),
});

export type QuizFormState = z.infer<typeof quizFormValidation>;
